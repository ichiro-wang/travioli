import jwt from "jsonwebtoken";
import { CookieOptions, Response } from "express";
import { DecodedToken, TokenSource, TokenType } from "../types/global.js";
import { NoSecretKeyError } from "../errors/jwt.errors.js";
import { randomUUID } from "crypto";

const ACCESS_TIME_MINUTES = 15;
const REFRESH_TIME_DAYS = 7;

interface GenerateTokensReturn {
  accessToken: string;
  refreshToken: string;
}

export const generateToken = (
  userId: string,
  tokenType: TokenType,
  source: TokenSource = "credentials"
): string => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  if (!secretKey) {
    throw new NoSecretKeyError(tokenType);
  }

  const payload: DecodedToken = {
    userId,
    type: tokenType,
    source,
    jti: randomUUID(),
  };

  const expiresIn =
    tokenType === "access"
      ? `${ACCESS_TIME_MINUTES}m`
      : `${REFRESH_TIME_DAYS}d`;

  return jwt.sign(payload, secretKey, { expiresIn });
};

export const getTokenOptions = (tokenType: TokenType): CookieOptions => {
  // 15 min for access tokens. 7 days for refresh tokens.
  const maxAge =
    tokenType === "access"
      ? ACCESS_TIME_MINUTES * 60 * 1000
      : REFRESH_TIME_DAYS * 24 * 60 * 60 * 1000;

  const inDevelopment = process.env.NODE_ENV === "development";
  return {
    maxAge,
    httpOnly: true, // not accessible via JS
    sameSite: inDevelopment ? "lax" : "strict", // prevent xss
    secure: !inDevelopment, // https if not development env
  };
};

/**
 * generate both refresh and access tokens
 */
export const generateTokens = (
  res: Response,
  userId: string
): GenerateTokensReturn => {
  const accessToken = generateToken(userId, "access");
  const refreshToken = generateToken(userId, "refresh");

  res.cookie("accessToken", accessToken, getTokenOptions("access"));
  res.cookie("refreshToken", refreshToken, getTokenOptions("refresh"));

  return { accessToken, refreshToken };
};
