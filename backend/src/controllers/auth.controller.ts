import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AccessTokenOptions, generateAccessToken, generateTokens } from "../utils/generateToken.js";
import { filterUser } from "../utils/filterUser.js";
import { internalServerError } from "../utils/internalServerError.js";
import { LoginBody, SignupBody } from "../schemas/auth.schemas.js";
import { authService, redisService } from "../services/index.js";
import { invalidCredentialsResponse, userNotFoundResponse } from "../utils/responseHelpers.js";
import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  UsernameAlreadyExistsError,
  UserNotAuthorizedError,
  UserNotFoundError,
} from "../errors/auth.errors.js";
import {
  InvalidRefreshTokenError,
  InvalidTokenTypeError,
  NoSecretKeyError,
} from "../errors/jwt.errors.js";
import { DecodedToken } from "../types/global.js";
import { getJwtTtl } from "../utils/getJwtTtl.js";

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

    // generateToken(res, newUser.id, "access");
    generateTokens(res, newUser.id);

    res.status(201).json({ user: newUser });
    return;
  } catch (error: unknown) {
    if (
      error instanceof EmailAlreadyExistsError ||
      error instanceof UsernameAlreadyExistsError ||
      error instanceof NoSecretKeyError
    ) {
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

    // generateToken(res, user.id, "access");
    generateTokens(res, user.id);

    const filteredUser = filterUser(user, true);
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

    if (error instanceof NoSecretKeyError) {
      res.status(400).json({ message: error.message });
      return;
    }

    internalServerError(error, res, "login controller");
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken: string = req.cookies.refreshToken;
    const secretKey = process.env.REFRESH_TOKEN_SECRET;

    if (!secretKey) {
      throw new NoSecretKeyError("refresh");
    }

    const decodedToken = jwt.verify(refreshToken, secretKey) as DecodedToken;

    if (decodedToken.type !== "refresh") {
      throw new InvalidTokenTypeError();
    }

    const tokenTtl = getJwtTtl(decodedToken);

    if (tokenTtl !== null && tokenTtl > 0) {
      await redisService.blackListToken(decodedToken.jti, tokenTtl);
    }

    const options: CookieOptions = {
      maxAge: 0, // set to expire immediately
      httpOnly: true, // not accessible via javascript
      sameSite: "strict", // prevent cross-site requests
      secure: process.env.NODE_ENV !== "development", // https when not in development
    };

    res.cookie("accessToken", "", options);
    res.cookie("refreshToken", "", options);

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
      throw new UserNotAuthorizedError();
    }

    const filteredUser = filterUser(loggedInUser, true);
    res.status(200).json({ user: filteredUser });
    return;
  } catch (error: unknown) {
    if (error instanceof UserNotAuthorizedError) {
      res.status(401).json({ message: error.message });
      return;
    }

    internalServerError(error, res, "getMe controller");
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      throw new UserNotFoundError();
    }

    const refreshToken: string = req.cookies.refreshToken;
    const secretKey = process.env.REFRESH_TOKEN_SECRET;

    if (!secretKey) {
      throw new NoSecretKeyError("refresh");
    }

    const decodedToken = jwt.verify(refreshToken, secretKey) as DecodedToken;

    const isBlacklisted = await redisService.checkIfTokenBlacklisted(decodedToken.jti);

    if (isBlacklisted) {
      throw new InvalidRefreshTokenError();
    }

    const accessToken = generateAccessToken(user.id, "refresh");

    res.cookie("accessToken", accessToken, AccessTokenOptions);

    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error: unknown) {
    if (error instanceof UserNotFoundError) {
      userNotFoundResponse(res);
      return;
    }

    if (error instanceof NoSecretKeyError) {
      res.status(400).json({ message: error.message });
      return;
    }

    if (error instanceof InvalidRefreshTokenError) {
      res.status(401).json({ message: error.message });
      return;
    }

    internalServerError(error, res, "refresh controller");
  }
};
