import prisma from "../db/prisma.js";
import { FollowStatus, User } from "../generated/client/index.js";
import { SanitizedUser } from "../types/global.js";
import { invalidCredentialsResponse } from "../utils/responseHelpers.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { AuthService } from "./auth.service.js";

export class UserService {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async checkUsernameAvailability(
    username: string,
    currentUserUsername: string
  ): Promise<{ available: boolean; reason: "current" | "taken" | null }> {
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
    user: SanitizedUser;
    isSelf: boolean;
    followedByCount: number;
    followingCount: number;
    followStatus?: FollowStatus;
  }> {
    // check if requesting own profile
    const isSelf = targetUserId === currentUser.id;

    // fetch target user from database
    let targetUser: User | null;
    if (isSelf) {
      targetUser = currentUser;
    } else {
      targetUser = await this.authService.findUserById(targetUserId);
    }

    // if user not found
    if (!targetUser) {
      throw new Error("User not found");
    }

    // fetch these promises in parallel. check private helper methods for implementation
    const [followedByCount, followingCount, followStatus] = await Promise.all([
      this.getFollowedByCount(targetUserId),
      this.getFollowingCount(targetUserId),
      this.getFollowStatus(currentUser.id, targetUserId),
    ]);

    return {
      user: sanitizeUser(targetUser, isSelf),
      isSelf,
      followedByCount,
      followingCount,
      ...(followStatus !== null ? { followStatus } : {}), // include followStatus only if not null
    };
  }

  async updateUserProfile(
    currentUser: User,
    updatedFields: { name?: string; username?: string; bio?: string }
  ): Promise<SanitizedUser> {
    const { name, username, bio } = updatedFields;
    const normalizedUsername = username?.toLowerCase();

    // keep track of fields that are submitted for updating. ignore empty fields
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

    // check if there is anything in the filtered updates
    if (Object.keys(filteredUpdates).length === 0) {
      return sanitizeUser(currentUser, true);
    }

    // only update if we have changes
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: filteredUpdates,
    });

    return sanitizeUser(updatedUser, true);
  }

  async softDeleteUser(currentUserId: string, inputPassword: string, currentUserPassword: string) {
    // verify password before allowing soft delete
    const isPasswordCorrect = await this.authService.verifyPassword(
      inputPassword,
      currentUserPassword
    );
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    // mark account as deleted
    const deletedUser = await prisma.user.update({
      where: { id: currentUserId },
      data: { isDeleted: true },
    });

    return sanitizeUser(deletedUser, true);
  }

  private async getFollowedByCount(userId: string): Promise<number> {
    return await prisma.follows.count({
      where: { followedById: userId, status: FollowStatus.accepted },
    });
  }

  private async getFollowingCount(userId: string): Promise<number> {
    return await prisma.follows.count({
      where: { followingId: userId, status: FollowStatus.accepted },
    });
  }

  private async getFollowStatus(
    currentUserId: string,
    targetUserId: string
  ): Promise<FollowStatus | null> {
    // if checking self, then there should not be a follow relationship
    if (currentUserId === targetUserId) {
      return null;
    }

    const follow = await prisma.follows.findUnique({
      where: {
        followedById_followingId: { followedById: currentUserId, followingId: targetUserId },
      },
      select: { status: true },
    });

    return follow ? follow.status : FollowStatus.notFollowing;
  }
}
