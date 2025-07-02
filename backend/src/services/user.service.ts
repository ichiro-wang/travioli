import prisma from "../db/prisma.js";
import {
  InvalidCredentialsError,
  UsernameAlreadyExistsError,
  UserNotFoundError,
} from "../errors/auth.errors.js";
import { FollowStatus, User } from "../generated/client/index.js";
import { FilteredUser } from "../types/global.js";
import { FollowRelation } from "../types/types.js";
import { filterUser } from "../utils/filterUser.js";
import { AuthService } from "./auth.service.js";
import { FollowService } from "./follow.service.js";

export class UserService {
  // dependency injection
  private authService: AuthService;
  private followService: FollowService;

  constructor(authService: AuthService, followService: FollowService) {
    this.authService = authService;
    this.followService = followService;
  }

  /**
   * check if a username is available in the database
   */
  async checkUsernameAvailability(
    username: string,
    currentUserUsername: string
  ): Promise<{ available: boolean; reason: "current" | "taken" | null }> {
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
  ): Promise<{
    user: FilteredUser;
    isSelf: boolean;
    followedByCount: number;
    followingCount: number;
    followStatus?: FollowStatus;
  }> {
    const isSelf = targetUserId === currentUser.id;

    let targetUser: User | null;
    if (isSelf) {
      targetUser = currentUser;
    } else {
      targetUser = await this.authService.findUserById(targetUserId);
    }

    if (!targetUser) {
      throw new UserNotFoundError();
    }

    // fetch these promises in parallel for efficiency
    const [followedByCount, followingCount, followStatus] = await Promise.all([
      this.followService.getFollowCount(targetUserId, FollowRelation.followedBy),
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

    if (normalizedUsername !== undefined && normalizedUsername !== currentUser.username) {
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
  async softDeleteUser(currentUserId: string, inputPassword: string, currentUserPassword: string) {
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

    return filterUser(deletedUser, true);
  }
}
