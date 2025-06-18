import prisma from "../db/prisma.js";
import { Request, Response } from "express";
import { CuidParams } from "../schemas/common.schema.js";
import { GetFollowListSchema, getFollowListSchema } from "../schemas/follow.schema.js";
import { $Enums } from "../generated/client/index.js";
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

    // first find the requested user
    const user = await prisma.user.findFirst({ where: { id: userId, isDeleted: false } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isSelf = user.id === req.user?.id; // is the requested user the same as the requesting user
    let followStatus: $Enums.FollowStatus = "rejected"; // the following status of the requesting user to the requested user

    if (!isSelf && req.user) {
      // check if the requesting user is following this user
      const follow = await prisma.follows.findUnique({
        where: {
          followedById_followingId: {
            followedById: req.user.id,
            followingId: user.id,
          },
        },
      });

      followStatus = follow?.status ?? "rejected";
    }

    // if the requested user is private and requesting user is not following them
    if (!isSelf && user.isPrivate && followStatus === "rejected") {
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
  } catch (error: unknown) {
    internalServerError(error, res);
  }
};

export const followUser = async (req: Request<CuidParams>, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.params;
  } catch (error: unknown) {
    internalServerError(error, res);
  }
};
