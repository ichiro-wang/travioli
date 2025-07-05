import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { Response } from "express";
import { generateTokens } from "../../utils/generateToken.js";
import jwt from "jsonwebtoken";
import * as crypto from "crypto";

vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn(),
  },
}));

vi.mock("crypto", () => ({
  randomUUID: vi.fn(),
}));

describe("generateToken unit tests", () => {
  const mockSign = jwt.sign as Mock;
  const mockRandomUUID = crypto.randomUUID as Mock;

  let mockResponseCookie = vi.fn();
  let mockResponse = {} as Response;

  beforeEach(() => {
    vi.clearAllMocks();

    process.env.NODE_ENV = "test";
    process.env.ACCESS_TOKEN_SECRET = "access_secret";
    process.env.REFRESH_TOKEN_SECRET = "refresh_secret";

    mockRandomUUID.mockReturnValue("mocked_uuid");
    mockSign.mockReturnValueOnce("access_token").mockReturnValueOnce("refresh_token");

    mockResponseCookie = vi.fn();

    mockResponse = {
      cookie: mockResponseCookie,
    } as unknown as Response;
  });

  it("should generate access and refresh token and set cookie", () => {
    const result = generateTokens(mockResponse, "some_user_id");

    expect(result.accessToken).toBe("access_token");
    expect(result.refreshToken).toBe("refresh_token");

    expect(mockSign).toHaveBeenCalledWith(
      {
        userId: "some_user_id",
        type: "access",
        source: "credentials",
        jti: "mocked_uuid",
      },
      "access_secret",
      { expiresIn: "15m" }
    );

    expect(mockSign).toHaveBeenCalledWith(
      {
        userId: "some_user_id",
        type: "refresh",
        source: "credentials",
        jti: "mocked_uuid",
      },
      "refresh_secret",
      { expiresIn: "7d" }
    );

    expect(mockResponseCookie).toHaveBeenCalledWith("accessToken", "access_token", {
      maxAge: 15 * 60 * 1000, // 15 minutes
      httpOnly: true,
      sameSite: "strict",
      secure: true, // assuming NODE_ENV is not 'development'
    });

    expect(mockResponseCookie).toHaveBeenCalledWith("refreshToken", "refresh_token", {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    expect(mockSign).toHaveBeenCalledTimes(2);
    expect(mockResponseCookie).toHaveBeenCalledTimes(2);
  });

  it("should throw error when ACCESS_TOKEN_SECRET is missing", () => {
    delete process.env.ACCESS_TOKEN_SECRET;

    expect(() => {
      generateTokens(mockResponse, "some_user_id");
    }).toThrow("No access token secret key provided");
  });

  it("should throw error when REFRESH_TOKEN_SECRET is missing", () => {
    delete process.env.REFRESH_TOKEN_SECRET;

    expect(() => {
      generateTokens(mockResponse, "some_user_id");
    }).toThrow("No refresh token secret key provided");
  });

  it("should use correct cookie options for development environment", () => {
    process.env.NODE_ENV = "development";
    mockSign.mockReset();
    mockSign.mockReturnValueOnce("access_token").mockReturnValueOnce("refresh_token");

    const result = generateTokens(mockResponse, "some_user_id");

    expect(mockResponseCookie).toHaveBeenCalledWith("accessToken", "access_token", {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: false, // should be false in development
    });

    expect(mockResponseCookie).toHaveBeenCalledWith("refreshToken", "refresh_token", {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: false, // should be false in development
    });
  });
});
