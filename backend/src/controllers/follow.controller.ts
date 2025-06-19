import prisma from "../db/prisma.js";
import { Request, Response } from "express";
import { CuidParams } from "../schemas/common.schema.js";
import { GetFollowListSchema, UpdateFollowStatusSchema } from "../schemas/follow.schema.js";
import { $Enums, Follows } from "../generated/client/index.js";
import { FollowedBy, Following, SanitizedUser } from "../types/global.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { internalServerError } from "../utils/internalServerError.js";

/**
 * get the followedBy or following list of a user
 * in request body, specify if type is "followedBy" or "following"
 * check if the user is private first
 */
export const getFollowList = async (
  req: Request<GetFollowListSchema>,
  res: Response
): Promise<void> => {
  try {
    // ensure data is validated first. check validateData middleware
    const { id: userId, type } = req.params;
    const currentUserId = req.user.id;

    // first find the requested user
    const user = await prisma.user.findFirst({ where: { id: userId, isDeleted: false } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isSelf = user.id === currentUserId; // is the requested user the same as the requesting user
    let followStatus: $Enums.FollowStatus = "rejected"; // the following status of the requesting user to the requested user

    if (!isSelf && req.user) {
      // check if the requesting user is following this user
      const follow = await prisma.follows.findUnique({
        where: {
          followedById_followingId: {
            followedById: currentUserId,
            followingId: user.id,
          },
        },
      });

      followStatus = follow?.status ?? "rejected";
    }

    // if the requested user is private and requesting user is not following them
    if (!isSelf && user.isPrivate && followStatus !== "accepted") {
      res.status(403).json({ message: "This account is private" });
      return;
    }

    let followList: FollowedBy[] | Following[];
    let sanitizedList: SanitizedUser[];

    if (type === "followedBy") {
      // if retrieving followedBy list
      followList = await prisma.follows.findMany({
        where: { followingId: user.id, status: "accepted" },
        include: { followedBy: true },
      });

      sanitizedList = followList.map((follow) => sanitizeUser(follow.followedBy));
    } else {
      // if retrieving following list
      followList = await prisma.follows.findMany({
        where: { followedById: user.id, status: "accepted" },
        include: { following: true },
      });

      sanitizedList = followList.map((follow) => sanitizeUser(follow.following));
    }

    // return followedBy or following list as the sanitized user list
    res.status(200).json({ [type]: sanitizedList });
    return;
  } catch (error: unknown) {
    internalServerError(error, res);
  }
};

export const followUser = async (req: Request<CuidParams>, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.params;
    const currentUserId = req.user.id;

    // make sure user isn't trying to follow self
    if (userId === req.user.id) {
      res.status(400).json({ message: "Cannot follow self" });
      return;
    }

    // find requested user
    const user = await prisma.user.findFirst({ where: { id: userId, isDeleted: false } });

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

    // if a follows relationship exists, update accordingly
    if (existingFollow) {
      if (existingFollow.status === "accepted") {
        // if already accepted, nothing to update
        res.status(400).json({ message: "You already follow this user" });
        return;
      } else if (existingFollow.status === "pending") {
        // if pending, can't do anything
        res.status(400).json({ message: "You have already requested to follow this user" });
        return;
      } else {
        // if not following, update accordingly based on user private status
        const updatedFollow = await prisma.follows.update({
          where: {
            followedById_followingId: {
              followedById: currentUserId,
              followingId: userId,
            },
          },
          data: {
            status: user.isPrivate ? "pending" : "accepted",
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
        status: user.isPrivate ? "pending" : "accepted",
      },
    });

    const message = user.isPrivate ? "Follow request sent" : "Successfully followed user";
    res.status(201).json({ message, follow: newFollow });
    return;
  } catch (error: unknown) {
    internalServerError(error, res);
  }
};

export const updateFollowStatus = async (
  req: Request<UpdateFollowStatusSchema>,
  res: Response
): Promise<void> => {
  try {
    const { id: userId, type: actionType } = req.params;
    const currentUserId = req.user.id;

    // the direction of the relationship depends on the type of action type
    let followedById: string;
    let followingId: string;

    if (actionType === "accept" || actionType === "reject") {
      // the follow target (followingId) is the current user
      followedById = userId;
      followingId = currentUserId;
    } else {
      // type === "cancel" or "unfollow"
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
      res.status(404).json({ message: "No follows relationship with this user found" });
      return;
    }

    let updatedFollow: Follows;
    let message: string;

    if (actionType === "accept") {
      if (existingFollow.status !== "pending") {
        // if status not pending, doesn't make sense to accept
        res.status(400).json({ message: "Failed to accept follow request" });
        return;
      }

      message = "Successfully accepted follow request";

      // otherwise, update the follow status
      updatedFollow = await prisma.follows.update({
        where: {
          followedById_followingId: {
            followedById,
            followingId,
          },
        },
        data: {
          status: "accepted",
        },
      });
    } else if (actionType === "cancel") {
      if (existingFollow.status !== "pending") {
        // if status not pending, doesn't make sense to accept
        res.status(400).json({ message: "Failed to cancel follow request" });
        return;
      }

      message = "Successfully cancelled follow request";

      // otherwise, update the follow status
      updatedFollow = await prisma.follows.update({
        where: {
          followedById_followingId: {
            followedById,
            followingId,
          },
        },
        data: {
          status: "rejected",
        },
      });
    } else if (actionType === "reject") {
      if (existingFollow.status !== "pending") {
        // if status not pending, doesn't make sense to reject
        res.status(400).json({ message: "Failed to reject follow request" });
        return;
      }

      message = "Successfully rejected follow request";

      // otherwise, update the follow status
      updatedFollow = await prisma.follows.update({
        where: {
          followedById_followingId: {
            followedById,
            followingId,
          },
        },
        data: {
          status: "rejected",
        },
      });
    } else {
      // type === "unfollow"
      if (existingFollow.status !== "accepted") {
        // if status not accepted, doesn't make sense to unfollow
        res.status(400).json({ message: "Failed to unfollow user" });
        return;
      }

      message = "Successfully unfollowed user";

      // otherwise, update the follow status
      updatedFollow = await prisma.follows.update({
        where: {
          followedById_followingId: {
            followedById,
            followingId,
          },
        },
        data: {
          status: "unfollowed",
        },
      });
    }

    res.status(200).json({ message, follow: updatedFollow });
    return;
  } catch (error: unknown) {
    internalServerError(error, res);
  }
};
