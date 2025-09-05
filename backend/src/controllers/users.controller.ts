import { Request, Response } from "express";
import { internalServerError } from "../utils/internalServerError.js";
import {
  CheckUsernameQuery,
  checkUsernameResponseSchema,
  DeleteAccountBody,
  deleteAccountResponseSchema,
  GetProfileParams,
  getProfileResponseSchema,
  GetUserItinerariesParams,
  GetUserItinerariesQuery,
  getUserItinerariesResponseSchema,
  UpdateProfileBody,
  updateProfileResponseSchema,
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
  const { username } = req.query;
  const { username: currentUserUsername } = req.user;

  try {
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

    const validatedResponse = checkUsernameResponseSchema.parse({
      available,
      message: `@${username} is available`,
    });

    res.status(200).json(validatedResponse);
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
  const { id: userId } = req.params;
  const currentUser = req.user;

  try {
    const profileData = await userService.getUserProfileData(
      userId,
      currentUser
    );

    const validatedResponse = getProfileResponseSchema.parse(profileData);

    res.status(200).json(validatedResponse);
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
  const { name, username, bio } = req.body;
  const currentUser = req.user;

  try {
    const updatedUser = await userService.updateUserProfile(currentUser, {
      name,
      username,
      bio,
    });

    const validatedResponse = updateProfileResponseSchema.parse({
      user: updatedUser,
    });

    res.status(200).json(validatedResponse);
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
  const { password } = req.body;
  const currentUser = req.user;

  try {
    const deletedUser = await userService.softDeleteUser(
      currentUser.id,
      password,
      currentUser.password
    );

    const validatedResponse = deleteAccountResponseSchema.parse({
      user: { ...deletedUser, isDeleted: true },
    });

    // including isDeleted field for caller reference
    res.status(200).json(validatedResponse);
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
  const { id: userId } = req.params;
  const currentUserId = req.user.id;
  const loadIndex = Math.max(0, parseInt(req.query.loadIndex || "0"));

  try {
    const permissionCheck = await permissionService.checkUserViewingPermission(
      currentUserId,
      userId
    );

    if (!permissionCheck.hasPermission) {
      res.status(403).json({ message: "This account is private" });
      return;
    }

    const result = await itineraryService.getItinerariesByUserId(
      userId,
      loadIndex
    );

    const validatedResponse = getUserItinerariesResponseSchema.parse(result);

    res.status(200).json(validatedResponse);
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
