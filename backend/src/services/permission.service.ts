import prisma from "../db/prisma.js";
import { UserNotFoundError } from "../errors/auth.errors.js";
import { FollowStatus } from "../generated/client/index.js";
import { AuthService } from "./auth.service.js";

export class PermissionService {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   * check if a user can view another user's account details such as profile, followers, etc
   */
  async checkUserViewingPermission(
    currentUserId: string,
    targetUserId: string
  ): Promise<{ hasPermission: boolean; reason: "private" | null }> {
    const isSelf = targetUserId === currentUserId;

    // requesting user has permission in the following scenarios: checking self, target user is public, requesting user is following target user

    if (isSelf) {
      return { hasPermission: true, reason: null };
    }

    const user = await this.authService.findUserById(targetUserId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (!user.isPrivate) {
      return { hasPermission: true, reason: null };
    }

    const follow = await prisma.follows.findUnique({
      where: {
        followedById_followingId: { followedById: currentUserId, followingId: targetUserId },
      },
      select: { status: true },
    });

    if (follow?.status === FollowStatus.accepted) {
      return { hasPermission: true, reason: null };
    }

    // if none of the above conditions satisfied, no permission
    return { hasPermission: false, reason: "private" };
  }
}
