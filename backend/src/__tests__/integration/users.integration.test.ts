import bcrypt from "bcryptjs";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import prisma from "../../db/prisma.js";
import request from "supertest";
import { app } from "../../index.js";

describe("check-username integration tests", () => {
  const CHECK_URL = "/api/users/check-username"; // username goes in after
  const LOGIN_URL = "/api/auth/login";

  const email = "lebronjames@gmail.com";
  const username = "lebronjames";
  const password = "password";

  let jwtCookie: string;

  beforeAll(async () => {
    await prisma.user.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    await prisma.user.create({
      data: {
        email: "bronnyjames@gmail.com",
        username: "bronnyjames",
        password: hashedPassword,
      },
    });

    // login so we can get the JWT cookie to include in all our requests
    const loginRes = await request(app).post(LOGIN_URL).send({ email, password });
    jwtCookie = loginRes.headers["set-cookie"];
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  it("should return success if username available", async () => {
    const res = await request(app).get(`${CHECK_URL}/random_username`).set("Cookie", jwtCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/username.*is available/i);
  });

  it("should return fail if username taken", async () => {
    const res = await request(app).get(`${CHECK_URL}/bronnyjames`).set("Cookie", jwtCookie);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/username.*already taken/i);
  });

  it("should return fail if username is same as requesting user", async () => {
    const res = await request(app).get(`${CHECK_URL}/lebronjames`).set("Cookie", jwtCookie);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/username.*already your username/i);
  });

  it("should return fail if username taken, case-insensitive", async () => {
    const res = await request(app).get(`${CHECK_URL}/BronnyJames`).set("Cookie", jwtCookie);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/username.*already taken/i);
  });
});
