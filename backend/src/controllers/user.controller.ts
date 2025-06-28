import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { internalServerError } from "../utils/internalServerError.js";
import {
  CheckUsernameQuery,
  DeleteAccountBody,
  GetProfileParams,
  UpdateProfileBody,
} from "../schemas/user.schemas.js";
import { invalidCredentialsResponse, userNotFoundResponse } from "../utils/responseHelpers.js";
import { authService, userService } from "../services/index.js";

/**
 * check if a username is taken or available
 */
export const checkUsername = async (
  req: Request<{}, {}, {}, CheckUsernameQuery>,
  res: Response
): Promise<void> => {
  try {
    // ensure data is validated first. check validateData middleware
    const { username } = req.query;
    const { username: currentUserUsername } = req.user;

    // let UserService handle database interaction
    const { available, reason } = await userService.checkUsernameAvailability(
      username,
      currentUserUsername
    );

    if (!available) {
      const message =
        reason === "current"
          ? `@${username} is already your username`
          : `@${username} is already taken`;
      res.status(409).json({ available, message });
      return;
    }

    res.status(200).json({ available, message: `@${username} is available` });
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

    // let UserService handle database interaction
    const profileData = await userService.getUserProfileData(userId, currentUser);

    // return the user profile with additional details
    res.status(200).json(profileData);
    return;
  } catch (error: any) {
    if ((error.message as string).match(/user not found/i)) {
      userNotFoundResponse(res);
      return;
    }

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

    // let UserService handle database interaction
    const updatedUser = await userService.updateUserProfile(currentUser, { name, username, bio });

    res.status(200).json({ user: updatedUser });
    return;
  } catch (error: any) {
    if (error.code === "P2002") {
      // P2002 is a prisma error code: "Unique constraint failed on the {constraint}". see prisma documentation for more
      res.status(409).json({ message: "Username already taken. Please select a unique username" });
    } else {
      internalServerError(error, res, "updateProfile controller");
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

    // let UserService handle database interaction
    const deletedUser = await userService.softDeleteUser(
      currentUser.id,
      password,
      currentUser.password
    );

    // include isDeleted field for caller reference
    res.status(200).json({ user: { ...deletedUser, isDeleted: true } });
    return;
  } catch (error: any) {
    if ((error.message as string).match(/invalid credentials/i)) {
      invalidCredentialsResponse(res);
      return;
    }

    internalServerError(error, res, "deleteAccount controller");
  }
};
