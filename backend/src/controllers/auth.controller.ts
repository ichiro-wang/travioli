import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  generateToken,
  generateTokens,
  getTokenOptions,
} from "../utils/generateToken.js";
import { filterUser } from "../utils/filterUser.js";
import { internalServerError } from "../utils/internalServerError.js";
import {
  LoginBody,
  loginResponseSchema,
  ResendVerificationEmailBody,
  SignupBody,
  VerifyEmailQuery,
} from "../schemas/auth.schemas.js";
import { authService, redisService } from "../services/index.js";
import {
  invalidCredentialsResponse,
  userNotFoundResponse,
} from "../utils/responseHelpers.js";
import {
  EmailAlreadyExistsError,
  EmailNotVerifiedError,
  InvalidCredentialsError,
  UsernameAlreadyExistsError,
  UserNotFoundError,
} from "../errors/auth.errors.js";
import { NoSecretKeyError } from "../errors/jwt.errors.js";
import { DecodedToken } from "../types/global.js";
import { USER_CACHE_EXPIRATION } from "../types/types.js";
import { EmailSendError } from "../errors/email.errors.js";

/**
 * - request body should include: email, username, password, confirmPassword
 * - confirmPassword is handled in Zod schema. check schemas folder
 */
export const signup = async (
  req: Request<{}, {}, SignupBody>,
  res: Response
): Promise<void> => {
  try {
    const { email, username, password } = req.body;

    const newUser = await authService.createUser({ email, username, password });

    await authService.handleVerificationEmail(email);

    res.status(201).json({ message: "Check email to complete signup" });
  } catch (error: unknown) {
    if (
      error instanceof EmailAlreadyExistsError ||
      error instanceof UsernameAlreadyExistsError ||
      error instanceof NoSecretKeyError ||
      error instanceof EmailSendError
    ) {
      res.status(400).json({ message: error.message });
      return;
    }

    internalServerError(error, res, "signup controller");
  }
};

export const verifyEmail = async (
  req: Request<{}, {}, {}, VerifyEmailQuery>,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.query;

    const tokenCacheKey = `await_email_verification:${token}`;

    const email = await redisService.get<string>(tokenCacheKey);

    if (!email) {
      res.status(404).json({ message: "Invalid verification token" });
      return;
    }

    await redisService.del(tokenCacheKey);

    await authService.verifyEmail(email);

    res.status(200).json({ message: "Email successfully verified" });
  } catch (error: unknown) {
    if (error instanceof UserNotFoundError) {
      userNotFoundResponse(res);
      return;
    }
    internalServerError(error, res, "verifyEmail controller");
  }
};

export const resendVerificationEmail = async (
  req: Request<{}, {}, ResendVerificationEmailBody>,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    const existingUser = await authService.findUserByEmail(email);

    const genericMessage = `An email will be sent if ${email} is found and not yet verified`;

    if (!existingUser || existingUser.verifiedAt !== null) {
      res.status(200).json({ message: genericMessage });
      return;
    }

    await authService.handleVerificationEmail(email);

    res.status(200).json({ message: genericMessage });
  } catch (error: unknown) {
    if (error instanceof EmailSendError) {
      res.status(400).json({ message: error.message });
      return;
    }
    internalServerError(error, res, "resendVerificationEmail controller");
  }
};

/**
 * - request body should include: email, password
 */
export const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await authService.authenticateUser({ email, password });

    generateTokens(res, user.id);

    const userCacheKey = `user:${user.id}`;
    await redisService.setEx(userCacheKey, user, USER_CACHE_EXPIRATION);

    const filteredUser = filterUser(user, true);

    const validatedResponse = loginResponseSchema.parse({ user: filteredUser });

    res.status(200).json(validatedResponse);
  } catch (error: unknown) {
    if (error instanceof UserNotFoundError) {
      // dont tell if user is not found, just return a generic message
      invalidCredentialsResponse(res);
      return;
    }

    if (error instanceof EmailNotVerifiedError) {
      res.status(400).json({ message: error.message });
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

    if (secretKey === undefined) {
      res.status(400).json({ message: "No refresh token secret key" });
      return;
    }

    const decodedToken = jwt.verify(
      refreshToken,
      secretKey
    ) as unknown as DecodedToken;

    if (decodedToken.type !== "refresh") {
      res.status(401).json({ message: "Invalid token type" });
      return;
    }

    await redisService.blacklistToken(decodedToken.jti, decodedToken.exp);

    const options: CookieOptions = {
      maxAge: 0, // set to expire immediately
      httpOnly: true, // not accessible via javascript
      sameSite: "strict", // prevent cross-site requests
      secure: process.env.NODE_ENV !== "development", // https when not in development
    };

    res.cookie("accessToken", "", options);
    res.cookie("refreshToken", "", options);

    res.status(200).json({ message: "Logged out successfully" });
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

    const filteredUser = filterUser(loggedInUser, true);

    const response = { user: filteredUser };

    const validatedResponse = loginResponseSchema.parse(response);

    res.status(200).json(validatedResponse);
  } catch (error: unknown) {
    internalServerError(error, res, "getMe controller");
  }
};

/**
 * refresh the access token.
 * make sure the refresh token is verified before calling this
 */
export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      userNotFoundResponse(res);
      return;
    }

    const secretKey = process.env.REFRESH_TOKEN_SECRET;

    if (!secretKey) {
      res.status(400).json({ message: `No refresh token secret key provided` });
      return;
    }

    const accessToken = generateToken(user.id, "refresh", "refresh");
    res.cookie("accessToken", accessToken, getTokenOptions("access"));

    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error: unknown) {
    internalServerError(error, res, "refresh controller");
  }
};
