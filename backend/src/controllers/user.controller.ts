import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import sanitizeUser from "../utils/sanitizeUser.js";
import internalServerError from "../utils/internalServerError.js";
import { $Enums } from "../generated/client/index.js";
import { idParamSchema } from "../schemas/common.schema.js";
import validateData from "../utils/validateData.js";
import { updateProfileSchema } from "../schemas/user.schemas.js";

/**
 * - gets a user profile based on user ID
 * - their posted itineraries should be retrieved using the itinerary controller
 */
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // using Zod to validate request body data
    const data = validateData(idParamSchema, req.params, res);
    if (!data) return;

    const { id: userId } = data;

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
    let isFollowing: boolean = false;
    let followStatus: $Enums.FollowStatus = "rejected";

    if (!isSelf && req.user) {
      // check if the requestING user is following the requestED user
      const follow = await prisma.follows.findUnique({
        where: {
          followedById_followingId: {
            followedById: req.user.id || "",
            followingId: user.id,
          },
        },
        select: {
          status: true,
        },
      });

      isFollowing = follow?.status === "accepted";
      followStatus = follow?.status ?? "rejected";
    }

    // return the user profile with additional details
    res.status(200).json({
      user: {
        ...filteredUser,
        isSelf,
        isPrivate: user.isPrivate,
        followerCount,
        followingCount,
        isFollowing,
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
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // using Zod to validate request body data
    const paramsData = validateData(idParamSchema, req.params, res);
    if (!paramsData) return;

    const { id: userId } = paramsData;

    // extract optional values from request body
    const bodyData = validateData(updateProfileSchema, req.body, res);
    if (!bodyData) return;

    const { name, username, bio, isPrivate } = bodyData;

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
