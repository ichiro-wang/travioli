import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { internalServerError } from "../utils/internalServerError.js";
import { DecodedToken, TokenType } from "../types/global.js";
import { userNotFoundResponse } from "../utils/responseHelpers.js";
import { authService } from "../services/index.js";
import { NoSecretKeyError, NoTokenProvidedError } from "../errors/jwt.errors.js";
import { UserNotFoundError } from "../errors/auth.errors.js";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
  tokenType: TokenType
): Promise<void> => {
  try {
    const isAccessToken = tokenType === "access";
    const tokenName = isAccessToken ? "accessToken" : "refreshToken";
    const token: string = req.cookies[tokenName];

    if (!token) {
      throw new NoTokenProvidedError(tokenType);
    }

    const secretKeyType = isAccessToken ? "ACCESS_TOKEN_SECRET" : "REFRESH_TOKEN_SECRET";
    const secretKey = process.env[secretKeyType];

    if (!secretKey) {
      throw new NoSecretKeyError(tokenType);
    }

    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;

    const user = await authService.findUserById(decodedToken.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    // add user to Request, this way we can access the logged in user from the controllers with req.user
    // req.user only exists within the scope of the current request
    req.user = user;
    req.tokenSource = decodedToken.source;

    next();
  } catch (error: unknown) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Access token expired" });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid access token" });
      return;
    }

    if (error instanceof NoTokenProvidedError) {
      res.status(401).json({ message: error.message });
      return;
    }

    if (error instanceof NoSecretKeyError) {
      res.status(400).json({ message: error.message });
      return;
    }

    if (error instanceof UserNotFoundError) {
      userNotFoundResponse(res);
      return;
    }

    internalServerError(error, res);
  }
};

export const authenticateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  return authenticateToken(req, res, next, "access");
};

export const authenticateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  return authenticateToken(req, res, next, "refresh");
};

// below function deprecated
/*
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: string = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: "Unauthorized - No token provided" });
      return;
    }

    const secretKey = process.env.ACCESS_TOKEN_SECRET;

    if (!secretKey) {
      throw new Error("No secret key provided for JWT");
    }

    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;

    if (!decodedToken) {
      res.status(401).json({ message: "Unauthorized - Invalid token" });
      return;
    }

    const user = await authService.findUserById(decodedToken.userId);

    if (!user) {
      userNotFoundResponse(res);
      return;
    }

    // add user to Request, this way we can access the logged in user from the controllers with req.user
    // req.user only exists within the scope of the current request
    req.user = user;
    req.tokenSource = decodedToken.source;

    next();
  } catch (error: unknown) {
    internalServerError(error, res, "authenticateToken middleware");
  }
};
*/
