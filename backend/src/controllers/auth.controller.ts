import { CookieOptions, Request, Response } from "express";
import { generateToken } from "../utils/generateToken.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { internalServerError } from "../utils/internalServerError.js";
import { LoginBody, SignupBody } from "../schemas/auth.schemas.js";
import { authService } from "../services/index.js";
import { invalidCredentialsResponse, userNotFoundResponse } from "../utils/responseHelpers.js";
import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  UsernameAlreadyExistsError,
  UserNotFoundError,
} from "../errors/auth.errors.js";

/**
 * method simply for testing backend connection
 */
export const pingPong = (req: Request, res: Response): void => {
  res.status(200).json({ message: "pong" });
  return;
};

/**
 * - request body should include: email, username, password, confirmPassword
 * - confirmPassword is handled in Zod schema. check schemas folder
 */
export const signup = async (req: Request<{}, {}, SignupBody>, res: Response): Promise<void> => {
  try {
    const { email, username, password } = req.body;

    const newUser = await authService.createUser({ email, username, password });

    generateToken(res, newUser.id, "access");

    res.status(201).json({ user: newUser });
    return;
  } catch (error: unknown) {
    if (error instanceof EmailAlreadyExistsError || error instanceof UsernameAlreadyExistsError) {
      res.status(400).json({ message: error.message });
      return;
    }

    internalServerError(error, res, "signup controller");
  }
};

/**
 * - request body should include: email, password
 */
export const login = async (req: Request<{}, {}, LoginBody>, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await authService.authenticateUser({ email, password });

    generateToken(res, user.id, "access");

    const filteredUser = sanitizeUser(user, true);
    res.status(200).json({ user: filteredUser });
    return;
  } catch (error: unknown) {
    if (error instanceof UserNotFoundError) {
      userNotFoundResponse(res);
      return;
    }
    if (error instanceof InvalidCredentialsError) {
      invalidCredentialsResponse(res);
      return;
    }

    internalServerError(error, res, "login controller");
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const options: CookieOptions = {
      maxAge: 0, // set to expire immediately
      httpOnly: true, // not accessible via javascript
      sameSite: "strict", // prevent cross-site requests
      secure: process.env.NODE_ENV !== "development", // https when not in development
    };
    res.cookie("jwt", "", options);

    res.status(200).json({ message: "Logged out successfully" });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "logout controller");
  }
};

/**
 * - this method is for checking if a user is logged in
 */
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const loggedInUser = req.user;

    // this should be caught by authenticateToken.ts middleware, but using this as another line of defense
    if (!loggedInUser) {
      res.status(401).json({ message: "User not authorized. Please log in" });
      return;
    }

    const filteredUser = sanitizeUser(loggedInUser, true);
    res.status(200).json({ user: filteredUser });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "getMe controller");
  }
};
