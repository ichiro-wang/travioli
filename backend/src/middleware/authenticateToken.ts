import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { internalServerError } from "../utils/internalServerError.js";
import { DecodedToken, TokenType } from "../types/global.js";
import { userNotFoundResponse } from "../utils/responseHelpers.js";
import { authService } from "../services/index.js";

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

    req.tokenSource = decodedToken.source;

    const userCacheKey = `user:${decodedToken.userId}`;

    // we check the cache only for access tokens because access tokens are stateless in our app
    // refresh tokens are stateful and verified using redis, allowing us to revoke them
    // we don't want to allow an invalid/revoked refresh token to be able to fetch a cached user
    // if (isAccessToken) {
    //   const cachedUser = await redisService.get(userCacheKey);

    //   if (cachedUser) {
    //     req.user = JSON.parse(cachedUser);
    //     return next();
    //   }
    // }

    const user = await authService.findUserById(decodedToken.userId);

    if (!user) {
      userNotFoundResponse(res);
      return;
    }

    // const { password, ...userNoPassword } = user;

    // if (isAccessToken) {}

    // add user to Request, this way we can access the logged in user from the controllers with req.user
    // req.user only exists within the scope of the current request
    req.user = user;
    req.tokenSource = decodedToken.source;

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
