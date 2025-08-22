import z from "zod";
import prisma from "../db/prisma.js";
import {
  InvalidCredentialsError,
  UsernameAlreadyExistsError,
  UserNotFoundError,
} from "../errors/auth.errors.js";
import { FollowStatus, User } from "../generated/client/index.js";
import { FilteredUser } from "../types/global.js";
import { FollowRelation, USER_CACHE_EXPIRATION } from "../types/types.js";
import { filterUser } from "../utils/filterUser.js";
import { AuthService } from "./auth.service.js";
import { FollowService } from "./follows.service.js";
import { RedisService } from "./redis.service.js";
import { getProfileResponseSchema } from "../schemas/users.schemas.js";

interface CheckUsernameAvailabilityResult {
  available: boolean;
  reason: "current" | "taken" | null;
}

interface GetUserProfileDataResult {
  user: FilteredUser;
  isSelf: boolean;
  followedByCount: number;
  followingCount: number;
  followStatus?: FollowStatus;
}

export class UserService {
  // dependency injection
  private authService: AuthService;
  private followService: FollowService;
  private redisService: RedisService;

  constructor(
    authService: AuthService,
    followService: FollowService,
    redisService: RedisService
  ) {
    this.authService = authService;
    this.followService = followService;
    this.redisService = redisService;
  }

  /**
   * check if a username is available in the database
   */
  async checkUsernameAvailability(
    username: string,
    currentUserUsername: string
  ): Promise<CheckUsernameAvailabilityResult> {
    // normalize to lowercase to ensure uniqueness checks are case insensitive
    const normalizedUsername = username.toLowerCase();

    if (normalizedUsername === currentUserUsername) {
      return { available: false, reason: "current" };
    }

    const user = await this.authService.findUserByUsername(normalizedUsername);

    return { available: !user, reason: user ? "taken" : null };
  }

  async getUserProfileData(
    targetUserId: string,
    currentUser: User
  ): Promise<z.infer<typeof getProfileResponseSchema>> {
    const isSelf = targetUserId === currentUser.id;

    let targetUser: User | null;
    if (isSelf) {
      targetUser = currentUser;
    } else {
      const userCacheKey = `user:${targetUserId}`;
      // hit redis cache
      targetUser = await this.redisService.get<User>(userCacheKey);

      if (!targetUser) {
        // hit db
        targetUser = await this.authService.findUserById(targetUserId);

        if (targetUser) {
          // we only need to set cache here since if (isSelf) is true,
          // authenticateToken middleware should already handle the cache storage
          await this.redisService.setEx(
            userCacheKey,
            targetUser,
            USER_CACHE_EXPIRATION
          );
        }
      }
    }

    if (!targetUser) {
      throw new UserNotFoundError();
    }

    // fetch these promises in parallel for efficiency
    const [followedByCount, followingCount, followStatus] = await Promise.all([
      this.followService.getFollowCount(
        targetUserId,
        FollowRelation.followedBy
      ),
      this.followService.getFollowCount(targetUserId, FollowRelation.following),
      this.followService.getFollowStatus(currentUser.id, targetUserId),
    ]);

    return {
      user: filterUser(targetUser, isSelf),
      isSelf,
      followedByCount,
      followingCount,
      ...(followStatus !== null ? { followStatus } : {}), // include followStatus only if not null
    };
  }

  async updateUserProfile(
    currentUser: User,
    updatedFields: { name?: string; username?: string; bio?: string }
  ): Promise<FilteredUser> {
    const { name, username, bio } = updatedFields;

    // normalize to lowercase to ensure uniqueness checks are case insensitive
    const normalizedUsername = username?.toLowerCase();

    // we only need to track which fields get updated, as the request doesn't need to include all fields
    const filteredUpdates: typeof updatedFields = {};

    if (name !== undefined && name !== currentUser.name) {
      filteredUpdates.name = name;
    }

    if (
      normalizedUsername !== undefined &&
      normalizedUsername !== currentUser.username
    ) {
      filteredUpdates.username = normalizedUsername;
    }

    if (bio !== undefined && bio !== currentUser.bio) {
      filteredUpdates.bio = bio;
    }

    // we should avoid sending an update request if no fields were included, thus the user remains the same
    if (Object.keys(filteredUpdates).length === 0) {
      return filterUser(currentUser, true);
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: currentUser.id },
        data: filteredUpdates,
      });

      await this.redisService.setEx(
        `user:${updatedUser.id}`,
        updatedUser,
        USER_CACHE_EXPIRATION
      );

      return filterUser(updatedUser, true);
    } catch (error: any) {
      if (error.code === "P2002") {
        // P2002 is a prisma error code: "Unique constraint failed on the {constraint}". see prisma documentation for more
        throw new UsernameAlreadyExistsError(normalizedUsername as string);
      }

      throw error;
    }
  }

  /**
   * we want to prevent the user object from being completely deleted from the databse, so just mark as deleted without actually deleting
   */
  async softDeleteUser(
    currentUserId: string,
    inputPassword: string,
    currentUserPassword: string
  ): Promise<FilteredUser> {
    const isPasswordCorrect = await this.authService.verifyPassword(
      inputPassword,
      currentUserPassword
    );
    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError();
    }

    const deletedUser = await prisma.user.update({
      where: { id: currentUserId },
      data: { isDeleted: true },
    });

    await this.redisService.del(`user:${deletedUser.id}`);

    return filterUser(deletedUser, true);
  }
}
