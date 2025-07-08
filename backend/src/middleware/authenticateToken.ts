import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { internalServerError } from "../utils/internalServerError.js";
import { DecodedToken, TokenType } from "../types/global.js";
import { userNotFoundResponse } from "../utils/responseHelpers.js";
import { authService, redisService } from "../services/index.js";
import { User } from "../generated/client/index.js";
import { USER_CACHE_EXPIRATION } from "../types/types.js";

/**
 * verify the request and add the user object to the request object
 */
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
      res.status(401).json({ message: `Unauthorized - No ${tokenType} token provided` });
      return;
    }

    const secretKeyType = isAccessToken ? "ACCESS_TOKEN_SECRET" : "REFRESH_TOKEN_SECRET";
    const secretKey = process.env[secretKeyType];

    if (!secretKey) {
      res.status(400).json({ message: `No ${tokenType} token secret key provided` });
      return;
    }

    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;

    if (decodedToken.type !== tokenType) {
      res.status(401).json({ message: `Invalid token type` });
      return;
    }

    const userCacheKey = `user:${decodedToken.userId}`;

    // we check the cache only for access tokens because access tokens are stateless in our app
    // refresh tokens are stateful and verified using redis, allowing us to revoke them
    // we don't want to allow an invalid/revoked refresh token to make requests
    if (!isAccessToken) {
      const isBlacklisted = await redisService.checkIfTokenBlacklisted(decodedToken.jti);

      if (isBlacklisted) {
        res.status(401).json({ message: "Invalid refresh token provided" });
        return;
      }
    }

    const cachedUser = await redisService.get<User>(userCacheKey);

    if (cachedUser) {
      req.user = cachedUser;
      // each time a user makes a request, we slide back their cache expiry
      await redisService.expire(userCacheKey, USER_CACHE_EXPIRATION);
      return next();
    }

    // only hit db if user not found in cache
    const user = await authService.findUserById(decodedToken.userId);

    if (!user) {
      userNotFoundResponse(res);
      return;
    }

    await redisService.setEx<User>(userCacheKey, user, USER_CACHE_EXPIRATION);

    // add user to Request, this way we can access the logged in user from the controllers with req.user
    // req.user only exists within the scope of the current request
    req.user = user;

    next();
  } catch (error: unknown) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    internalServerError(error, res);
  }
};

export const authenticateAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  return authenticateToken(req, res, next, "access");
};

export const authenticateRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  return authenticateToken(req, res, next, "refresh");
};
