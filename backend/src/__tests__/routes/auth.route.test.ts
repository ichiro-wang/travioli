import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../index.js";
import { afterEach } from "node:test";
import prisma from "../../db/prisma.js";

describe("Sugnup integration tests", () => {
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
    expect(res.body.user.id).toBeDefined();
    expect(res.body.user.username).toBe("lebronjames");
    expect(res.body.user.email).toBe("lebronjames@gmail.com");
    expect(res.headers["set-cookie"]?.length).toBeGreaterThan(0);
  });

  it("should fail if email already exists", async () => {
    // create a user. this user will have the email that is the duplicate
    await prisma.user.create({
      data: {
        email: "lebronjames@gmail.com",
        username: "random_username",
        password: "password",
      },
    });

    // try to create a user with the same email
    const res = await request(app).post(SIGNUP_URL).send(validSignupData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/email.*already exists/i);
  });

  it("should fail if username already exists", async () => {
    // create a user. this user will have the email that is the duplicate
    await prisma.user.create({
      data: {
        email: "random_email@gmail.com",
        username: "lebronjames",
        password: "password",
      },
    });

    // try to create a user with the same username
    const res = await request(app).post(SIGNUP_URL).send(validSignupData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/username.*already exists/i);
  });

  it("should fail if password and confirmPassword do not match", async () => {
    const res = await request(app)
      .post(SIGNUP_URL)
      .send({ ...validSignupData, confirmPassword: "password456" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Passwords do not match");
  });

  it("should fail if email is bad format", async () => {
    const res = await request(app)
      .post(SIGNUP_URL)
      .send({ ...validSignupData, email: "bad email" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid email format");
  });

  it("should fail if username is bad format", async () => {
    // check auth.schemas.ts to see valid username format
    const res = await request(app)
      .post(SIGNUP_URL)
      .send({ ...validSignupData, username: "bad username" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch("Username can only contain ");
  });

  it("should fail if username is too short", async () => {
    // check auth.schemas.ts to see valid username format
    const res = await request(app)
      .post(SIGNUP_URL)
      .send({ ...validSignupData, username: "12" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch("minimum 3");
  });

  it("should succeed if username is long enough", async () => {
    // check auth.schemas.ts to see valid username format
    const res = await request(app)
      .post(SIGNUP_URL)
      .send({ ...validSignupData, username: "123" });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.id).toBeDefined();
  });

  it("should fail if username is too long", async () => {
    // check auth.schemas.ts to see valid username format
    const res = await request(app)
      .post(SIGNUP_URL)
      .send({ ...validSignupData, username: "1234567890123456789012345678901" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch("maximum 30");
  });

  it("should succeed if username is not too long", async () => {
    // check auth.schemas.ts to see valid username format
    const res = await request(app)
      .post(SIGNUP_URL)
      .send({ ...validSignupData, username: "123456789012345678901234567890" });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.id).toBeDefined();
  });
});
