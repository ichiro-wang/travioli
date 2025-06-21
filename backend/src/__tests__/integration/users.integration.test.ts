import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../../index.js";
import { setUpTestData, takeDownTest, TestData } from "./helpers.js";

describe("check username integration tests", () => {
  const CHECK_URL = "/api/users/check-username"; // username goes in after
  let testData: TestData;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  it("should return success if username available", async () => {
    const res = await request(app)
      .get(`${CHECK_URL}/random_username`)
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/username.*is available/i);
  });

  it("should return fail if username taken", async () => {
    const res = await request(app)
      .get(`${CHECK_URL}/bronnyjames`)
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/username.*already taken/i);
  });

  it("should return fail if username is same as requesting user", async () => {
    const res = await request(app)
      .get(`${CHECK_URL}/lebronjames`)
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/username.*already your username/i);
  });

  it("should return fail if username taken, case-insensitive", async () => {
    const res = await request(app)
      .get(`${CHECK_URL}/BronnyJames`)
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/username.*already taken/i);
  });

  it("should return fail if username is invalid format", async () => {
    const res = await request(app)
      .get(`${CHECK_URL}/bad username`)
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.errors.join(",")).toMatch(/username can only contain/i);
  });

  it("should return fail if username is too short", async () => {
    const res = await request(app).get(`${CHECK_URL}/12`).set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.errors.join(",")).toMatch(/minimum 3/i);
  });

  it("should return fail if username is too long", async () => {
    const res = await request(app)
      .get(`${CHECK_URL}/1234567890123456789012345678901`)
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.errors.join(",")).toMatch(/maximum 30/i);
  });
});

describe("get profile integration tests", () => {
  const GET_PROFILE_URL = "/api/users"; // add user id to the end
  let testData: TestData;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  it("should successfully retrieve own profile", async () => {
    const res = await request(app)
      .get(`${GET_PROFILE_URL}/${testData.user.id}`)
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("email", null);
    expect(res.body.user).toHaveProperty("username", testData.user.username);
    expect(res.body.user).toHaveProperty("followingCount");
    expect(res.body.user).toHaveProperty("followStatus");
  });

  it("should successfully retrieve another user's profile", async () => {
    const res = await request(app)
      .get(`${GET_PROFILE_URL}/${testData.otherUser.id}`)
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("email", null);
    expect(res.body.user).toHaveProperty("username", testData.otherUser.username);
    expect(res.body.user).toHaveProperty("followingCount");
    expect(res.body.user).toHaveProperty("followStatus");
  });

  it("should fail to find a user with id that is not a valid cuid", async () => {
    const res = await request(app)
      .get(`${GET_PROFILE_URL}/not_a_valid_cuid`)
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.errors.join(",")).toMatch(/invalid cuid/i);
  });

  it("should fail to find a user with non-existent id", async () => {
    const res = await request(app)
      .get(`${GET_PROFILE_URL}/csomerandomusercuid777777`)
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/user.*not found/i);
  });
});

describe("update profile integration tests", () => {
  const UPDATE_URL = "/api/users"; // add user id to the end
  let testData: TestData;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  it("temp", () => {
    expect(10).toBe(10);
  });
});
