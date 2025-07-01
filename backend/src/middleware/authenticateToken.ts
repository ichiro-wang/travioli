import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { internalServerError } from "../utils/internalServerError.js";
import { DecodedToken } from "../types/global.js";
import { userNotFoundResponse } from "../utils/responseHelpers.js";
import { authService } from "../services/index.js";

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
    req.tokenType = decodedToken.tokenType; // ignore for now

    next();
  } catch (error: unknown) {
    internalServerError(error, res, "authenticateToken middleware");
  }
};
