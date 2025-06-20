import jwt from "jsonwebtoken";
import { Response } from "express";
import { DecodedToken, TokenType } from "../types/global.js";

/**
 * generate a JWT token
 * @param res Response object from controller
 * @param userId to include in the payload
 * @param tokenType for checking whether JWT token was generated via a refresh token or thru authenticating user credentials. used for flagging sensitive operations
 * @returns JWT token
 */
export const generateToken = (
  res: Response,
  userId: string,
  tokenType: TokenType = "access"
): string => {
  const DAYS = 7;

  // the JWT payload consists of the user ID and type: access|refresh
  const payload: DecodedToken = { userId, tokenType };

  const secretKey = process.env.ACCESS_TOKEN_SECRET;

  if (!secretKey) {
    throw new Error("No secret key provided for JWT");
  }

  const token = jwt.sign(payload, secretKey, {
    expiresIn: `${DAYS}d`,
  });

  res.cookie("jwt", token, {
    maxAge: DAYS * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
