import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
import { internalServerError } from "../utils/internalServerError.js";
import { DecodedToken } from "../types/global.js";
import { userNotFoundResponse } from "../utils/responseHelpers.js";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: string = req.cookies.jwt;

    // check if token was given
    if (!token) {
      res.status(401).json({ message: "Unauthorized - No token provided" });
      return;
    }

    // check if token is valid
    const secretKey = process.env.ACCESS_TOKEN_SECRET;

    if (!secretKey) {
      throw new Error("No secret key provided for JWT");
    }

    const decoded = jwt.verify(token, secretKey) as DecodedToken;
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized - Invalid token" });
      return;
    }

    // find user and select useful fields
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.isDeleted) {
      userNotFoundResponse(res);
      return;
    }

    // add user to Request
    req.user = user;
    // req.tokenType = decoded.tokenType; // ignore for now

    next();
  } catch (error: unknown) {
    internalServerError(error, res, "authenticateToken middleware");
  }
};
