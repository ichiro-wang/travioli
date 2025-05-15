import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
import internalServerError from "../utils/internalServerError.js";
import { DecodedToken } from "../types/global.js";

const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.jwt;

    // check if token was given
    if (!token) {
      res.status(401).json({ message: "Unauthorized - No token provided" });
      return;
    }

    // check if token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized - Invalid token" });
      return;
    }

    // find user and select useful fields
    const user = await prisma.user.findFirst({
      where: { id: decoded.userId, isDeleted: false },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // add user to Request
    req.user = user;

    next();
  } catch (error: unknown) {
    internalServerError("protectRoute middleware", error, res);
  }
};

export default protectRoute;
