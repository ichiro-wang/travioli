import prisma from "../db/prisma.js";
import { UserNotFoundError } from "../errors/auth.errors.js";
import {
  FollowSelfError,
  FollowUserError,
  InvalidUpdateStatusActionError,
  NoFollowRelationshipError,
} from "../errors/follow.errors.js";
import { Follows, FollowStatus } from "../generated/client/index.js";
import { FilteredUser } from "../types/global.js";
import { FollowAction, FollowActionType, FollowRelation, FollowRelationType } from "../types/types.js";
import { filterUser } from "../utils/filterUser.js";
import { AuthService } from "./auth.service.js";

const statusTransitionMap: Record<FollowActionType, { from: FollowStatus; to: FollowStatus; message: string }> = {
  [FollowAction.accept]: {
    from: FollowStatus.pending,
    to: FollowStatus.accepted,
    message: "Successfully accepted follow request",
  },
  [FollowAction.reject]: {
    from: FollowStatus.pending,
    to: FollowStatus.notFollowing,
    message: "Successfully rejected follow request",
  },
  [FollowAction.remove]: {
    from: FollowStatus.accepted,
    to: FollowStatus.notFollowing,
    message: "Successfully removed follower",
  },
  [FollowAction.cancel]: {
    from: FollowStatus.pending,
    to: FollowStatus.notFollowing,
    message: "Successfully cancelled follow request",
  },
  [FollowAction.unfollow]: {
    from: FollowStatus.accepted,
    to: FollowStatus.notFollowing,
    message: "Successfully unfollowed user",
  },
};

interface FollowListResult {
  users: FilteredUser[];
  hasMore: boolean;
}

interface FollowUserResult {
  follow: Follows;
  isNewRelationship: boolean;
}

interface UpdateFollowResult {
  follow: Follows;
  message: string;
}

interface FollowUserResult {
  follow: Follows;
  isNewRelationship: boolean;
}

export class FollowService {
  private authService: AuthService;
  private static readonly PAGINATION_TAKE_SIZE = 20; // how many results to take from DB query for pagination

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   *
   * @param targetUserId the user we want to check
   * @param relationType followedBy | following
   * @param loadIndex same as page, but planning on using infinite scroll pagination on frontend so thought this would be a better name
   * @returns followedBy | following list as a list of sanitized users
   */
  async getFollowList(
    targetUserId: string,
    relationType: FollowRelationType,
    loadIndex: number
  ): Promise<FollowListResult> {
    // pagination options
    const offset = loadIndex * FollowService.PAGINATION_TAKE_SIZE; // pagination offset

    const whereKey = relationType === FollowRelation.followedBy ? "followingId" : "followedById";
    const includeKey = relationType === FollowRelation.followedBy ? "followedBy" : "following";

    const followList = await prisma.follows.findMany({
      where: { [whereKey]: targetUserId, status: FollowStatus.accepted },
      include: { [includeKey]: true },
      orderBy: { updatedAt: "desc" },
      skip: offset,
      take: FollowService.PAGINATION_TAKE_SIZE + 1, // we take an extra result to check if there are any more results
    });

    const users = followList.map((follow) => filterUser(follow[relationType]));
    // inform the user if there are still more results that can be fetched so they know if they can continue fetching or not
    const hasMore = followList.length > FollowService.PAGINATION_TAKE_SIZE;

    return { users, hasMore };
  }

  async followUser(currentUserId: string, targetUserId: string): Promise<FollowUserResult> {
    const isSelf = currentUserId === targetUserId;
    if (isSelf) {
      throw new FollowSelfError();
    }

    const targetUser = await this.authService.findUserById(targetUserId);

    if (!targetUser) {
      throw new UserNotFoundError();
    }

    const existingFollow = await this.getFollowRelationship(currentUserId, targetUserId);
    const newStatus = targetUser.isPrivate ? FollowStatus.pending : FollowStatus.accepted;

    if (existingFollow) {
      if (existingFollow.status === FollowStatus.accepted) {
        throw new FollowUserError("You already follow this user");
      }

      if (existingFollow.status === FollowStatus.pending) {
        throw new FollowUserError("You have already requested to follow this user");
      }

      // if notFollowing, simply update the existing relationship
      const updatedFollow = await prisma.follows.update({
        where: {
          followedById_followingId: {
            followedById: currentUserId,
            followingId: targetUserId,
          },
        },
        data: {
          status: newStatus,
        },
      });

      return { follow: updatedFollow, isNewRelationship: false };
    }

    // create new follow relationship only if none exists
    const newFollow = await prisma.follows.create({
      data: {
        followedById: currentUserId,
        followingId: targetUserId,
        status: newStatus,
      },
    });

    return { follow: newFollow, isNewRelationship: true };
  }

  async updateFollowStatus(
    currentUserId: string,
    targetUserId: string,
    actionType: FollowActionType
  ): Promise<UpdateFollowResult> {
    // the direction of the relationship depends on the type of action type
    // type === "accept" or "reject" or "remove"
    // the followed user (followingId) is the current user, who is followedBy the target user
    let followedById = targetUserId;
    let followingId = currentUserId;

    if (actionType === FollowAction.cancel || actionType === FollowAction.unfollow) {
      // the followed user (followingId) is the target user, who is followedBy the current user
      followedById = currentUserId;
      followingId = targetUserId;
    }

    const existingFollow = await this.getFollowRelationship(followedById, followingId);

    if (!existingFollow) {
      throw new NoFollowRelationshipError();
    }

    const transition = statusTransitionMap[actionType];

    if (transition.from !== existingFollow.status) {
      throw new InvalidUpdateStatusActionError(transition.from, existingFollow.status);
    }

    const updatedFollow = await prisma.follows.update({
      where: { followedById_followingId: { followedById, followingId } },
      data: { status: transition.to },
    });

    return { message: transition.message, follow: updatedFollow };
  }

  async getPendingFollowRequests(currentUserId: string): Promise<Follows[]> {
    const pendingRequests = await prisma.follows.findMany({
      where: { followingId: currentUserId, status: FollowStatus.pending },
      orderBy: { updatedAt: "desc" },
    });

    return pendingRequests;
  }

  async getFollowStatus(followedById: string, followingId: string): Promise<FollowStatus | null> {
    // don't return a follow status if checking self to avoid confusion
    if (followedById === followingId) {
      return null;
    }

    const targetUser = await this.authService.findUserById(followingId);
    if (!targetUser) {
      throw new UserNotFoundError();
    }

    const follow = await this.getFollowRelationship(followedById, followingId);

    return follow ? follow.status : FollowStatus.notFollowing;
  }

  /**
   * check database if there exists a Follows relationship between the 2 users
   * @returns the relationship if found
   */
  private async getFollowRelationship(followedById: string, followingId: string): Promise<Follows | null> {
    // there should not be a follow relationship between self
    if (followedById === followingId) {
      return null;
    }

    return await prisma.follows.findUnique({
      where: { followedById_followingId: { followedById, followingId } },
    });
  }

  /**
   * counting how many followers | following a user has
   * @param targetUserId
   * @param relationType followedBy | following
   * @returns integer value of how many followers | following
   */
  async getFollowCount(targetUserId: string, relationType: FollowRelationType): Promise<number> {
    const idKey = relationType === FollowRelation.followedBy ? "followedById" : "followingId";

    return await prisma.follows.count({
      where: { [idKey]: targetUserId, status: FollowStatus.accepted },
    });
  }
}
