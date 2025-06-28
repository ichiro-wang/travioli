import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { internalServerError } from "../utils/internalServerError.js";
import { FollowStatus } from "../generated/client/index.js";
import {
  CheckUsernameQuery,
  DeleteAccountBody,
  GetProfileParams,
  UpdateProfileBody,
} from "../schemas/user.schemas.js";
import { findUserById } from "../utils/userService.js";
import { verifyPassword } from "../utils/authService.js";
import { invalidCredentialsResponse } from "../utils/responseHelpers.js";

/**
 * check if a username is taken or available
 */
export const checkUsername = async (
  req: Request<{}, {}, {}, CheckUsernameQuery>,
  res: Response
): Promise<void> => {
  try {
    // ensure data is validated first. check validateData middleware
    const { username: usernameReceived } = req.query;
    const username = usernameReceived.toLowerCase();

    // check if the username is same as current user's
    if (username === req.user.username) {
      res
        .status(409)
        .json({ available: false, message: `The username @${username} is already your username` });
      return;
    }

    // find a user with the given username
    const user = await prisma.user.findUnique({ where: { username } });

    // if a user is found
    if (user) {
      res
        .status(409)
        .json({ available: false, message: `The username @${username} is already taken` });
      return;
    }

    // if a user with that username is not found
    res.status(200).json({ available: true, message: `The username @${username} is available` });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "checkUsername controller");
  }
};

/**
 * - gets a user profile based on user ID
 * - their posted itineraries should be retrieved using the itinerary controller
 */
export const getUserProfile = async (
  req: Request<GetProfileParams>,
  res: Response
): Promise<void> => {
  try {
    // ensure data is validated first. check validateData middleware
    const { id: userId } = req.params;

    // check if user is requesting own profile
    const currentUser = req.user;
    const isSelf = userId === currentUser.id;

    // find the user with requested ID
    const user = isSelf ? currentUser : await findUserById(userId);

    // if the user not exists (or account soft deleted)
    if (!user) {
      res.status(404).json({ message: "User with given ID not found" });
      return;
    }

    const filteredUser = sanitizeUser(user, isSelf); // include email if getting own profile

    // nested function to be called in parallel promise
    const checkFollowStatus = async () => {
      let followStatus: FollowStatus = FollowStatus.notFollowing;

      if (!isSelf && req.user) {
        // check if the requestING user is following the requestED user
        const follow = await prisma.follows.findUnique({
          where: {
            followedById_followingId: {
              followedById: currentUser.id,
              followingId: user.id,
            },
          },
          select: {
            status: true,
          },
        });
        followStatus = follow?.status ?? FollowStatus.notFollowing;
      }

      return followStatus;
    };

    // get followedBy and following counts to include in profile details
    // fetch in parallel
    const [followedByCount, followingCount, followStatus] = await Promise.all([
      prisma.follows.count({ where: { followingId: userId, status: FollowStatus.accepted } }),
      prisma.follows.count({ where: { followedById: userId, status: FollowStatus.accepted } }),
      checkFollowStatus(),
    ]);

    // return the user profile with additional details
    res.status(200).json({
      user: {
        ...filteredUser,
        isSelf,
        followedByCount,
        followingCount,
        ...(isSelf ? {} : { followStatus }),
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
  req: Request<{}, {}, UpdateProfileBody>,
  res: Response
): Promise<void> => {
  try {
    // ensure data is validated first. check validateData middleware
    const { name, username, bio } = req.body;
    const currentUser = req.user; // see authenticateToken for req.user

    // update the fields only if they are included in the update, and different from current fields
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        ...(name !== undefined && name !== currentUser.name && { name }),
        ...(username !== undefined &&
          username.toLowerCase() !== currentUser.username.toLowerCase() && {
            username: username.toLowerCase(),
          }),
        ...(bio !== undefined && bio !== currentUser.bio && { bio }),
      },
    });

    const filteredUser = sanitizeUser(updatedUser, true);
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

/**
 * delete your account
 */
export const softDeleteAccount = async (
  req: Request<{}, {}, DeleteAccountBody>,
  res: Response
): Promise<void> => {
  try {
    const { password } = req.body;
    const currentUser = req.user;

    const isPasswordCorrect = await verifyPassword(password, currentUser.password);
    if (!isPasswordCorrect) {
      invalidCredentialsResponse(res);
      return;
    }

    // doing a soft delete
    const deletedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { isDeleted: true },
    });

    const filteredUser = sanitizeUser(deletedUser, true);

    // include isDeleted field so the caller knows if the deletion went thru
    res.status(200).json({ user: { ...filteredUser, isDeleted: deletedUser.isDeleted } });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "deleteAccount controller");
  }
};
