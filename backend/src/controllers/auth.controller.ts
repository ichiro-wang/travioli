import { CookieOptions, Request, Response } from "express";
import { generateToken } from "../utils/generateToken.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { internalServerError } from "../utils/internalServerError.js";
import { LoginBody, SignupBody } from "../schemas/auth.schemas.js";
import { authService } from "../services/index.js";
import { invalidCredentialsResponse, userNotFoundResponse } from "../utils/responseHelpers.js";

/**
 * method simply for testing backend connection
 */
export const pingPong = (req: Request, res: Response): void => {
  res.status(200).json({ message: "pong" });
  return;
};

/**
 * - signup
 * - request body should include: email, username, password, confirmPassword
 */
export const signup = async (req: Request<{}, {}, SignupBody>, res: Response): Promise<void> => {
  try {
    // ensure data is validated first. check validateData middleware
    // password === confirmPassword handled in zod schema
    const { email, username, password } = req.body;

    // call AuthService to handle user creation in database
    const newUser = await authService.createUser({ email, username, password });

    // generate jwt token
    generateToken(res, newUser.id, "access");

    res.status(201).json({ user: newUser });
    return;
  } catch (error: any) {
    if ((error.message as string).match(/.*already exists/i)) {
      res.status(400).json({ message: error.message });
      return;
    }

    internalServerError(error, res, "signup controller");
  }
};

/**
 * - login
 * - request body should include: email, password
 */
export const login = async (req: Request<{}, {}, LoginBody>, res: Response): Promise<void> => {
  try {
    // ensure data is validated first. check validateData middleware
    const { email, password } = req.body;

    // let AuthService handle database interaction with logging in
    const user = await authService.authenticateUser({ email, password });

    // after validating user, generate jwt token
    generateToken(res, user.id, "access");

    // return user with sanitized data, includeEmail=true
    const filteredUser = sanitizeUser(user, true);
    res.status(200).json({ user: filteredUser });
    return;
  } catch (error: any) {
    if ((error.message as string).match(/user not found/i)) {
      userNotFoundResponse(res);
      return;
    } else if ((error.message as string).match(/invalid credentials/i)) {
      invalidCredentialsResponse(res);
      return;
    }

    internalServerError(error, res, "login controller");
  }
};

/**
 * - logout
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // set jwt cookie to be empty string with max age of 0
    const options: CookieOptions = {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
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

    // if user is not logged in
    // this should be caught by authenticateToken.ts middleware, not here
    if (!loggedInUser) {
      res.status(401).json({ message: "User not authorized. Please log in" });
      return;
    }

    // return user with sanitized data, includeEmail=true
    const filteredUser = sanitizeUser(loggedInUser, true);
    res.status(200).json({ user: filteredUser });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "getMe controller");
  }
};
