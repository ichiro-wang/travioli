import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { generateToken } from "../../utils/generateToken.js";

vi.mock("jsonwebtoken");

describe("generateToken middleware", () => {
  const mockSign = vi.mocked(
    jwt.sign as unknown as typeof jwt.sign & { mockReturnValue: (v: string) => void }
  );
  let mockResponseCookie = vi.fn();
  let mockResponse = {} as Response;

  beforeEach(() => {
    process.env.JWT_SECRET = "lebronthegoat";

    mockSign.mockReturnValue("mocked_jwt_token");

    mockResponseCookie = vi.fn();

    mockResponse = {
      cookie: mockResponseCookie,
    } as unknown as Response;
  });

  it("should generate access token and set cookie", () => {
    const token = generateToken("some_user_id", "access", mockResponse);

    expect(token).toStrictEqual("mocked_jwt_token");

    expect(mockSign).toHaveBeenCalledWith(
      { userId: "some_user_id", tokenType: "access" },
      "lebronthegoat",
      { expiresIn: "7d" }
    );

    expect(mockResponseCookie).toHaveBeenCalledWith("jwt", "mocked_jwt_token", {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  });

  it("should generate a refresh token", () => {
    const token = generateToken("some_user_id", "refresh", mockResponse);

    expect(token).toStrictEqual("mocked_jwt_token");

    expect(mockSign).toHaveBeenCalledWith(
      {
        userId: "some_user_id",
        tokenType: "refresh",
      },
      "lebronthegoat",
      { expiresIn: "7d" }
    );
  });
});
