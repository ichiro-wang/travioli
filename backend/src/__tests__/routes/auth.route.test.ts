import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../index.js";
import prisma from "../../db/prisma.js";
import bcrypt from "bcryptjs";

describe("Signup integration tests", () => {
  const SIGNUP_URL = "/api/auth/signup";

  // signup data to be passed into post request body
  const validSignupData = {
    email: "lebronjames@gmail.com",
    username: "lebronjames",
    password: "password",
    confirmPassword: "password",
  };

  beforeEach(async () => {
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should signup a user successfully", async () => {
    const res = await request(app).post(SIGNUP_URL).send(validSignupData);

    expect(res.statusCode).toBe(201);
    expect(res.body.user.id).toBeDefined();
    expect(res.body.user).toHaveProperty("username", "lebronjames");
    expect(res.body.user).toHaveProperty("email", "lebronjames@gmail.com");
    
    const setCookieHeader = res.headers["set-cookie"]
    expect(setCookieHeader?.length).toBeGreaterThan(0);
    expect(setCookieHeader[0]).toMatch(/jwt=/i)
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
    expect(res.body.message).toMatch(/passwords do not match/i);
  });

  it("should fail if email is bad format", async () => {
    const res = await request(app)
      .post(SIGNUP_URL)
      .send({ ...validSignupData, email: "bad email" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid email format/i);
  });

  it("should fail if username is bad format", async () => {
    // check auth.schemas.ts to see valid username format
    const res = await request(app)
      .post(SIGNUP_URL)
      .send({ ...validSignupData, username: "bad username" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/username can only contain/i);
  });

  it("should fail if username is too short", async () => {
    // check auth.schemas.ts to see valid username format
    const res = await request(app)
      .post(SIGNUP_URL)
      .send({ ...validSignupData, username: "12" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/minimum 3/i);
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
    expect(res.body.message).toMatch(/maximum 30/i);
  });

  it("should succeed if username is not too long", async () => {
    // check auth.schemas.ts to see valid username format
    const res = await request(app)
      .post(SIGNUP_URL)
      .send({ ...validSignupData, username: "123456789012345678901234567890" });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.id).toBeDefined();
  });

  it("should fail if password is too short", async () => {
    // password must be min length 8
    const res = await request(app)
      .post(SIGNUP_URL)
      .send({ ...validSignupData, password: "1234567", confirmPassword: "1234567" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/password must be at least 8/i);
  });
});

describe("Login integration tests", () => {
  const LOGIN_URL = "/api/auth/login";

  const email = "lebronjames@gmail.com";
  const password = "password123";
  let hashedPassword: string;

  beforeAll(async () => {
    // create a user before we run the tests so we can log into this account
    await prisma.user.deleteMany({});

    hashedPassword = await bcrypt.hash(password, "salt");

    await prisma.user.create({
      data: {
        email,
        username: "lebronjames",
        password: hashedPassword,
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  it("should login a user successfully", async () => {
    const res = await request(app).post(LOGIN_URL).send({ email, password });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.id).toBeDefined();
    expect(res.body.user).toHaveProperty("email", "lebronjames@gmail.com");
    expect(res.headers["set-cookie"]?.length).toBeGreaterThan(0);
  });

  it("should fail if email not found", async () => {
    const res = await request(app)
      .post(LOGIN_URL)
      .send({ email: "random_email@gmail.com", password });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/user not found/i);
  });

  it("should fail if password incorrect", async () => {
    const res = await request(app).post(LOGIN_URL).send({ email, password: "bad_password" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid credentials/i);
  });

  it("should fail if the account is marked as deleted", async () => {
    // create a user and mark their account as deleted
    await prisma.user.create({
      data: {
        email: "deleted@gmail.com",
        username: "deleted",
        password: hashedPassword,
        isDeleted: true,
      },
    });

    const res = await request(app).post(LOGIN_URL).send({
      email: "deleted@gmail.com",
      password,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/user not found/i);
  });

  it("should fail if email bad format", async () => {
    const res = await request(app).post(LOGIN_URL).send({ email: "bad email", password });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid email format/i);
  });
});

describe("Logout integration tests", () => {
  const LOGIN_URL = "/api/auth/login";
  const LOGOUT_URL = "/api/auth/logout";

  const email = "lebronjames@gmail.com";
  const password = "password123";
  let hashedPassword: string;

  beforeAll(async () => {
    hashedPassword = await bcrypt.hash(password, "salt");

    await prisma.user.create({
      data: { email, username: "lebronjames", password: hashedPassword },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  it("should successfully logout a user and clear the JWT cookie", async () => {
    let res = await request(app).post(LOGIN_URL).send({ email, password });

    expect(res.statusCode).toBe(200);
    expect(res.)
  });
});
