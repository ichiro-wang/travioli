import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "../../index.js";
import { afterEach } from "node:test";
import prisma from "../../db/prisma.js";

describe("signup", () => {
  const SIGNUP_URL = "/api/auth/signup";

  // signup data to be passed into post request body
  const validSignupData = {
    email: "lebronjames@gmail.com",
    username: "lebronjames",
    password: "password123",
    confirmPassword: "password123",
  };

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it("should signup a user successfully", async () => {
    const res = await request(app).post(SIGNUP_URL).send(validSignupData);

    expect(res.statusCode).toBe(201);
    expect(res.body.user.username).toBe("lebronjames");
  });
});
