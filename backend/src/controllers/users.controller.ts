import { Request, Response } from "express";
import { internalServerError } from "../utils/internalServerError.js";
import {
  CheckUsernameQuery,
  DeleteAccountBody,
  GetProfileParams,
  GetUserItinerariesParams,
  GetUserItinerariesQuery,
  UpdateProfileBody,
} from "../schemas/users.schemas.js";
import {
  invalidCredentialsResponse,
  userNotFoundResponse,
} from "../utils/responseHelpers.js";
import {
  itineraryService,
  permissionService,
  userService,
} from "../services/index.js";
import {
  InvalidCredentialsError,
  UsernameAlreadyExistsError,
  UserNotFoundError,
} from "../errors/auth.errors.js";

/**
 * check if a username is taken or available
 */
export const checkUsername = async (
  req: Request<{}, {}, {}, CheckUsernameQuery>,
  res: Response
): Promise<void> => {
  try {
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
    const { id: userId } = req.params;

    const currentUser = req.user;

    const profileData = await userService.getUserProfileData(
      userId,
      currentUser
    );

    res.status(200).json(profileData);
    return;
  } catch (error: unknown) {
    if (error instanceof UserNotFoundError) {
      userNotFoundResponse(res);
      return;
    }

    internalServerError(error, res, "getUserProfile controller");
  }
};

/**
 * - a user can only update their own profile
 * - any fields the user wishes to update shall be included in the request body: **name, username, bio, isPrivate**
 */
export const updateProfile = async (
  req: Request<{}, {}, UpdateProfileBody>,
  res: Response
): Promise<void> => {
  try {
    const { name, username, bio } = req.body;
    const currentUser = req.user;

    const updatedUser = await userService.updateUserProfile(currentUser, {
      name,
      username,
      bio,
    });

    res.status(200).json({ user: updatedUser });
    return;
  } catch (error: unknown) {
    if (error instanceof UsernameAlreadyExistsError) {
      res.status(409).json({ message: error.message });
      return;
    }

    internalServerError(error, res, "updateProfile controller");
  }
};

/**
 * mark account as deleted
 */
export const softDeleteUser = async (
  req: Request<{}, {}, DeleteAccountBody>,
  res: Response
): Promise<void> => {
  try {
    const { password } = req.body;
    const currentUser = req.user;

    const deletedUser = await userService.softDeleteUser(
      currentUser.id,
      password,
      currentUser.password
    );

    // including isDeleted field for caller reference
    res.status(200).json({ user: { ...deletedUser, isDeleted: true } });
    return;
  } catch (error: unknown) {
    if (error instanceof InvalidCredentialsError) {
      invalidCredentialsResponse(res);
      return;
    }

    internalServerError(error, res, "deleteAccount controller");
  }
};

export const getUserItineraries = async (
  req: Request<GetUserItinerariesParams, {}, {}, GetUserItinerariesQuery>,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.params;
    const currentUserId = req.user.id;

    const permissionCheck = await permissionService.checkUserViewingPermission(
      currentUserId,
      userId
    );

    if (!permissionCheck.hasPermission) {
      res.status(403).json({ message: "This account is private" });
      return;
    }

    const loadIndex = Math.max(0, parseInt(req.query.loadIndex || "0"));

    const result = await itineraryService.getItinerariesByUserId(
      userId,
      loadIndex
    );

    res.status(200).json(result);
    return;
  } catch (error: unknown) {
    if (error instanceof UserNotFoundError) {
      userNotFoundResponse(res);
      return;
    }

    internalServerError(error, res, "getUserItineraries");
  }
};

// TODO
export const updatePrivacy = async (
  req: Request,
  res: Response
): Promise<void> => {};
