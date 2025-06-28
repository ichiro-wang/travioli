import prisma from "../db/prisma.js";
import { Request, Response } from "express";
import {
  FollowUserParams,
  GetFollowListParams,
  GetFollowListQuery,
  UpdateFollowStatusParams,
} from "../schemas/follow.schema.js";
import { FollowStatus } from "../generated/client/index.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { internalServerError } from "../utils/internalServerError.js";
import { FollowAction, FollowActionType, FollowRelation } from "../types/types.js";
import { SanitizedUser } from "../types/global.js";
import { authService } from "../services/index.js";

/**
 * get the followedBy or following list of a user
 * in request body, specify if type is "followedBy" or "following"
 * check if the user is private first
 */
export const getFollowList = async (
  req: Request<GetFollowListParams, {}, {}, GetFollowListQuery>,
  res: Response
): Promise<void> => {
  try {
    // ensure data is validated first. check validateData middleware
    const { id: userId, type: relationType } = req.params;
    const currentUserId = req.user.id;

    // first find the requested user
    const user = await authService.findUserById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isSelf = userId === currentUserId; // is the requested user the same as the requesting user
    let followStatus: FollowStatus = FollowStatus.accepted; // the following status of the requesting user to the requested user

    // if the requested user is not self and is private, then check follow status
    if (!isSelf && user.isPrivate) {
      const follow = await prisma.follows.findUnique({
        where: {
          followedById_followingId: {
            followedById: currentUserId,
            followingId: userId,
          },
        },
      });

      followStatus = follow?.status ?? FollowStatus.notFollowing;
    }

    // if requesting user doesn't have permission to view list
    if (followStatus !== FollowStatus.accepted) {
      res.status(403).json({ message: "This account is private" });
      return;
    }

    // pagination options
    // doing infinite scroll pagination, so loadIndex is basically page number
    const loadIndex = Math.max(0, parseInt(req.query.page) || 0);
    const take = 20; // how many rows to take
    const offset = loadIndex * take; // pagination offset

    // list of users to be returned depending on requested type
    let sanitizedList: SanitizedUser[];

    if (relationType === FollowRelation.followedBy) {
      // if retrieving followedBy list
      const followList = await prisma.follows.findMany({
        where: { followingId: userId, status: FollowStatus.accepted },
        include: { followedBy: true },
        orderBy: { updatedAt: "desc" },
        skip: offset,
        take,
      });

      sanitizedList = followList.map((follow) => sanitizeUser(follow.followedBy));
    } else {
      // if retrieving following list
      const followList = await prisma.follows.findMany({
        where: { followedById: userId, status: FollowStatus.accepted },
        include: { following: true },
        orderBy: { updatedAt: "desc" },
        skip: offset,
        take,
      });

      sanitizedList = followList.map((follow) => sanitizeUser(follow.following));
    }

    // return followedBy or following list as the sanitized user list
    res.status(200).json({ [relationType]: sanitizedList });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "getFollowList controller");
  }
};

/**
 * follow a user if profile is public
 * send a follow request if profile is private
 */
export const followUser = async (req: Request<FollowUserParams>, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.params;
    const currentUserId = req.user.id;

    // make sure user isn't trying to follow self
    if (userId === req.user.id) {
      res.status(400).json({ message: "Cannot follow self" });
      return;
    }

    // find requested user
    const user = await authService.findUserById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // check if follows relationship already exists before creating a new one
    const existingFollow = await prisma.follows.findUnique({
      where: {
        followedById_followingId: {
          followedById: currentUserId,
          followingId: userId,
        },
      },
    });

    // if a follows relationship exists, update status accordingly
    if (existingFollow) {
      if (existingFollow.status === FollowStatus.accepted) {
        // if already accepted, nothing to update
        res.status(400).json({ message: "You already follow this user" });
        return;
      } else if (existingFollow.status === FollowStatus.pending) {
        // if pending, can't do anything
        res.status(400).json({ message: "You have already requested to follow this user" });
        return;
      } else {
        // if notFollowing, update accordingly based on user private status
        const updatedFollow = await prisma.follows.update({
          where: {
            followedById_followingId: {
              followedById: currentUserId,
              followingId: userId,
            },
          },
          data: {
            status: user.isPrivate ? FollowStatus.pending : FollowStatus.accepted,
          },
        });

        const message = user.isPrivate ? "Follow request sent" : "Successfully followed user";
        res.status(200).json({ message, follow: updatedFollow });
        return;
      }
    }

    // if follows relationship doesn't exist yet, create one
    const newFollow = await prisma.follows.create({
      data: {
        followedById: currentUserId,
        followingId: user.id,
        status: user.isPrivate ? FollowStatus.pending : FollowStatus.accepted,
      },
    });

    const message = user.isPrivate ? "Follow request sent" : "Successfully followed user";
    res.status(201).json({ message, follow: newFollow });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "followUser controller");
  }
};

/**
 * - update a follow status to accepted or notFollowing
 * - types of actions: accept, reject, remove - target (current user); cancel, unfollow - target (other user)
 */
export const updateFollowStatus = async (
  req: Request<UpdateFollowStatusParams>,
  res: Response
): Promise<void> => {
  try {
    const { id: userId, type: actionType } = req.params;
    const currentUserId = req.user.id;

    // the direction of the relationship depends on the type of action type
    // type === "accept" or "reject" or "remove"
    // the follow target (followingId) is the current user
    let followedById = userId;
    let followingId = currentUserId;

    if (actionType === FollowAction.cancel || actionType === FollowAction.unfollow) {
      // the follow target (followingId) is the other user (not current user)
      followedById = currentUserId;
      followingId = userId;
    }

    // verify the follows relationship with the requested user exists
    const existingFollow = await prisma.follows.findUnique({
      where: {
        followedById_followingId: {
          followedById,
          followingId,
        },
      },
    });

    if (!existingFollow) {
      res
        .status(404)
        .json({ message: "No follows relationship with this user found, could not update status" });
      return;
    }

    const statusTransitionMap: Record<
      FollowActionType,
      { from: FollowStatus; to: FollowStatus; message: string }
    > = {
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

    const transition = statusTransitionMap[actionType];

    if (transition.from !== existingFollow.status) {
      res.status(400).json({
        message: `Failed to update follow status. Expected existing status to be ${transition.from}, but got ${existingFollow.status}`,
      });
      return;
    }

    const updatedFollow = await prisma.follows.update({
      where: { followedById_followingId: { followedById, followingId } },
      data: { status: transition.to },
    });

    res.status(200).json({ message: transition.message, follow: updatedFollow });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "updateFollowStatus controller");
  }
};

/**
 * get list of pending follow requests of requesting user
 */
export const getPendingRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const currentUserId = req.user.id;

    // get list of users who have pending requests
    const pendingRequests = await prisma.follows.findMany({
      where: { followingId: currentUserId, status: FollowStatus.pending },
      orderBy: { updatedAt: "desc" },
    });

    res.status(200).json({ pendingRequests });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "getPendingRequests controller");
  }
};

/**
 * get follow relationship status of requesting user and requested user
 */
export const getFollowStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.params;
    const currentUserId = req.user.id;

    const follow = await prisma.follows.findUnique({
      where: { followedById_followingId: { followedById: currentUserId, followingId: userId } },
      select: { status: true },
    });

    const followStatus: FollowStatus = follow?.status ?? FollowStatus.notFollowing;

    res.status(200).json({ followStatus });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "getFollowStatus controller");
  }
};
