import jwt from "jsonwebtoken";
import { Response } from "express";
import { DecodedToken, TokenType } from "../types/global.js";

/**
 * generate a JWT token
 * @param userId to include in the payload
 * @param isRefreshToken for checking whether JWT token was generated via a refresh token or thru authenticating user credentials. used for flagging sensitive operations
 * @param res Response object from controller
 * @returns JWT token
 */
const generateToken = (userId: string, isRefreshToken: boolean, res: Response): string => {
  const DAYS = 7;

  const tokenType: TokenType = isRefreshToken ? "refresh" : "access";
  const payload: DecodedToken = { userId, tokenType };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
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

export default generateToken;
