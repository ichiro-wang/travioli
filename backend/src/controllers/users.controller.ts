import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import sanitizeUser from "../utils/sanitizeUser.js";
import internalServerError from "../utils/internalServerError.js";
import { $Enums } from "../generated/client/index.js";
import {
  CheckUsernameParams,
  GetFollowListBody,
  UpdateProfileBody,
} from "../schemas/users.schemas.js";
import { CuidParams } from "../schemas/common.schema.js";
import { SanitizedUser } from "../types/global.js";

/**
 * check if a username is taken or available
 */
export const checkUsername = async (
  req: Request<CheckUsernameParams>,
  res: Response
): Promise<void> => {
  try {
    // ensure data is validated first. check validateData middleware
    const { username } = req.params;

    if (username === req.user?.username) {
      res.status(409).json({ message: `The username ${username} is already taken` });
      return;
    }

    // find a user with the given username
    const user = await prisma.user.findUnique({ where: { username } });

    // if a user is not found
    if (!user) {
      res.status(200).json({ message: `The username ${username} is available` });
      return;
    }

    // if a user with that username is found
    res.status(409).json({ message: `The username ${username} is already taken` });
  } catch (error: unknown) {
    internalServerError("checkUsername controller", error, res);
  }
};

/**
 * get the follower or following list of a user
 * in request body, specify if type is "followers" or "following"
 * check if the user is private first
 */
export const getFollowList = async (
  req: Request<CuidParams, {}, GetFollowListBody>,
  res: Response
): Promise<void> => {
  try {
    // ensure data is validated first. check validateData middleware
    const { id: userId } = req.params;
    const { type } = req.body;

    // first find the requested user
    const user = await prisma.user.findUnique({ where: { id: userId } });

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

    let followList;
    let sanitizedList: SanitizedUser[];
    if (type === "followers") {
      followList = await prisma.follows.findMany({
        where: { followingId: user.id, status: "accepted" },
        include: { followedBy: true },
      });

      sanitizedList = followList.map((follow) => sanitizeUser(follow.followedBy));
    } else {
      followList = await prisma.follows.findMany({
        where: { followedById: user.id, status: "accepted" },
        include: { following: true },
      });

      sanitizedList = followList.map((follow) => sanitizeUser(follow.following));
    }

    // return followers or following list as the sanitized user list
    res.status(200).json({ [type]: sanitizedList });
  } catch (error: unknown) {
    internalServerError("getFollowersList controller", error, res);
  }
};

/**
 * - gets a user profile based on user ID
 * - their posted itineraries should be retrieved using the itinerary controller
 */
export const getProfile = async (req: Request<CuidParams>, res: Response): Promise<void> => {
  try {
    // ensure data is validated first. check validateData middleware
    const { id: userId } = req.params;

    // find the user with requested ID, and not deleted
    const user = await prisma.user.findFirst({ where: { id: userId, isDeleted: false } });

    // if the user exists (or account not soft deleted)
    if (!user) {
      res.status(404).json({ message: "User with given ID not found" });
      return;
    }

    // check if user is requesting own profile
    const isSelf = user.id === req.user?.id;
    const filteredUser = sanitizeUser(user);

    // get follower and following counts to include in profile details
    // fetch in parallel
    const [followerCount, followingCount] = await Promise.all([
      prisma.follows.count({ where: { followingId: userId, status: "accepted" } }),
      prisma.follows.count({ where: { followedById: userId, status: "accepted" } }),
    ]);

    // default values for if user is following another. not following is functionally same as rejected
    let followStatus: $Enums.FollowStatus = "rejected";

    if (!isSelf && req.user) {
      // check if the requestING user is following the requestED user
      const follow = await prisma.follows.findUnique({
        where: {
          followedById_followingId: {
            followedById: req.user.id,
            followingId: user.id,
          },
        },
        select: {
          status: true,
        },
      });

      followStatus = follow?.status ?? "rejected";
    }

    // return the user profile with additional details
    res.status(200).json({
      user: {
        ...filteredUser,
        isSelf,
        followerCount,
        followingCount,
        followStatus,
      },
    });
  } catch (error: unknown) {
    internalServerError("getProfile controller", error, res);
  }
};

/**
 * - update a user profile
 * - a user can only update their own profile
 * - any fields the user wishes to update shall be included in the request body: **name, username, bio, isPrivate**
 */
export const updateProfile = async (
  req: Request<CuidParams, {}, UpdateProfileBody>,
  res: Response
): Promise<void> => {
  try {
    // ensure data is validated first. check validateData middleware
    const { id: userId } = req.params;
    const { name, username, bio, isPrivate } = req.body;

    // don't allow update if the request is not for self
    if (userId !== req.user?.id) {
      res.status(403).json({ message: "Cannot update profile of another user" });
      return;
    }

    // find the user with requested ID, and not deleted
    const user = await prisma.user.findFirst({ where: { id: userId, isDeleted: false } });

    // if the user exists (or account not soft deleted)
    if (!user) {
      res.status(404).json({ message: "User with given ID not found" });
      return;
    }

    // update the fields only if they were included in the request body
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name: name }),
        ...(username !== undefined && { username: username }),
        ...(bio !== undefined && { bio: bio }),
        ...(isPrivate !== undefined && { isPrivate: isPrivate }),
      },
    });

    const filteredUser = sanitizeUser(updatedUser);
    res.status(200).json({ user: filteredUser });
  } catch (error: any) {
    if (error.code === "P2002") {
      // P2002 is a prisma error code: "Unique constraint failed on the {constraint}". see prisma documentation for more
      res.status(409).json({ message: "Username already taken. Please select a unique username" });
    } else {
      internalServerError("updateProfile controller", error as unknown, res);
    }
  }
};

export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  return;
};
