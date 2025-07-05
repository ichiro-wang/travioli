import jwt from "jsonwebtoken";
import { CookieOptions, Response } from "express";
import { DecodedToken, TokenSource, TokenType } from "../types/global.js";
import { NoSecretKeyError } from "../errors/jwt.errors.js";
import { randomUUID } from "crypto";

export const generateAccessToken = (userId: string, source: TokenSource = "credentials") => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  if (!secretKey) {
    throw new NoSecretKeyError("access");
  }

  const payload: DecodedToken = { userId, type: "access", source, jti: randomUUID() };

  return jwt.sign(payload, secretKey, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string, source: TokenSource = "credentials") => {
  const secretKey = process.env.REFRESH_TOKEN_SECRET;
  if (!secretKey) {
    throw new NoSecretKeyError("refresh");
  }

  const payload: DecodedToken = { userId, type: "refresh", source, jti: randomUUID() };

  return jwt.sign(payload, secretKey, { expiresIn: "7d" });
};

interface GenerateTokensReturn {
  accessToken: string;
  refreshToken: string;
}

export const AccessTokenOptions: CookieOptions = {
  maxAge: 15 * 60 * 1000, // 15 minutes expiry
  httpOnly: true, // not accessible via JS
  sameSite: "strict", // prevent xss
  secure: process.env.NODE_ENV !== "development", // https if not development env
};

const RefreshTokenOptions: CookieOptions = {
  ...AccessTokenOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry
};

/**
 * generate both refresh and access tokens
 */
export const generateTokens = (res: Response, userId: string): GenerateTokensReturn => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  res.cookie("accessToken", accessToken, AccessTokenOptions);
  res.cookie("refreshToken", refreshToken, RefreshTokenOptions);

  return { accessToken, refreshToken };
};

/**
 * deprecated
 */
export const generateToken = (
  res: Response,
  userId: string,
  tokenType: TokenType = "access"
): string => {
  const DAYS = 7;

  // the JWT payload consists of the user ID and type: access|refresh
  const payload: DecodedToken = {
    userId,
    type: tokenType,
    source: "credentials",
    jti: randomUUID(),
  };

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

// TODO: adjust based on access or refresh token
