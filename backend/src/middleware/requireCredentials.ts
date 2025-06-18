import { NextFunction, Request, Response } from "express";

/**
 * middleware for requiring user to enter credentials before performing sensitive actions
 */
export const requireCredentials = (req: Request, res: Response, next: NextFunction) => {
  // if user not logged in
  if (!req.user) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  // TODO
};
