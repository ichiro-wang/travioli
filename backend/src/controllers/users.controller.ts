import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { internalServerError } from "../utils/internalServerError.js";
import { $Enums } from "../generated/client/index.js";
import {
  CheckUsernameParams,
  DeleteAccountBody,
  UpdateProfileBody,
} from "../schemas/users.schemas.js";
import { CuidParams } from "../schemas/common.schema.js";

/**
 * check if a username is taken or available
 */
export const checkUsername = async (
  req: Request<CheckUsernameParams>,
  res: Response
): Promise<void> => {
  try {
    // ensure data is validated first. check validateData middleware
    const { username: usernameReceived } = req.params;
    const username = usernameReceived.toLowerCase();

    // check if the username is same as current user's
    if (username === req.user?.username) {
      res.status(409).json({ message: `The username @${username} is already your username` });
      return;
    }

    // find a user with the given username
    const user = await prisma.user.findUnique({ where: { username } });

    // if a user is found
    if (user) {
      res.status(409).json({ message: `The username @${username} is already taken` });
      return;
    }

    // if a user with that username is not found
    res.status(200).json({ message: `The username @${username} is available` });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "checkUsername controller");
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

    // find the user with requested ID
    const user = await prisma.user.findUnique({ where: { id: userId } });

    // if the user not exists (or account soft deleted)
    if (!user || user.isDeleted) {
      res.status(404).json({ message: "User with given ID not found" });
      return;
    }

    // check if user is requesting own profile
    const currentUserId = req.user.id;
    const isSelf = user.id === currentUserId;
    const filteredUser = sanitizeUser(user);

    // get followedBy and following counts to include in profile details
    // fetch in parallel
    const [followedByCount, followingCount] = await Promise.all([
      prisma.follows.count({ where: { followingId: userId, status: "accepted" } }),
      prisma.follows.count({ where: { followedById: userId, status: "accepted" } }),
    ]);

    // default values for if user is following another. not following
    let followStatus: $Enums.FollowStatus = "notFollowing";

    if (!isSelf && req.user) {
      // check if the requestING user is following the requestED user
      const follow = await prisma.follows.findUnique({
        where: {
          followedById_followingId: {
            followedById: currentUserId,
            followingId: user.id,
          },
        },
        select: {
          status: true,
        },
      });

      followStatus = follow?.status ?? "notFollowing";
    }

    // return the user profile with additional details
    res.status(200).json({
      user: {
        ...filteredUser,
        isSelf,
        followedByCount,
        followingCount,
        followStatus,
      },
    });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "getProfile controller");
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
    const currentUserId = req.user.id;

    // don't allow update if the request is not for self
    if (userId !== currentUserId) {
      res.status(403).json({ message: "Cannot update profile of another user" });
      return;
    }

    // find the user with requested ID, and not deleted
    const user = await prisma.user.findUnique({ where: { id: userId } });

    // if the user exists (or account not soft deleted)
    if (!user || user.isDeleted) {
      res.status(404).json({ message: "User with given ID not found" });
      return;
    }

    // update the fields only if they were included in the request body
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name: name }),
        ...(username !== undefined && { username: username.toLowerCase() }),
        ...(bio !== undefined && { bio: bio }),
        ...(isPrivate !== undefined && { isPrivate: isPrivate }),
      },
    });

    const filteredUser = sanitizeUser(updatedUser);
    res.status(200).json({ user: filteredUser });
    return;
  } catch (error: any) {
    if (error.code === "P2002") {
      // P2002 is a prisma error code: "Unique constraint failed on the {constraint}". see prisma documentation for more
      // we use this to make sure the user updates fields such that they satisfy unique constraints in the database
      res.status(409).json({ message: "Username already taken. Please select a unique username" });
    } else {
      internalServerError(error as unknown, res, "updateProfile controller");
    }
  }
};

export const deleteAccount = async (
  req: Request<CuidParams, {}, DeleteAccountBody>,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.params;
    const { password } = req.body;

    if (userId !== req.user?.id) {
      res.status(403).json({ message: "Cannot update profile of another user" });
      return;
    }

    const user = await prisma.user.findFirst({ where: { id: userId, isDeleted: false } });

    if (!user) {
      res.status(404).json({ message: "User with given ID not found" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Password does not match" });
      return;
    }

    // doing a soft delete
    const deletedUser = await prisma.user.update({
      where: { id: userId },
      data: { isDeleted: true },
    });

    res.status(204).json({ message: `User @${deletedUser.username}'s account deleted` });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "deleteAccount controller");
  }
};
