import request from "supertest";
import prisma from "../../db/prisma.js";
import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { setUpTestData, takeDownTest, TestData } from "./helpers.js";
import { app } from "../../index.js";

describe("check username integration tests", () => {
  const CHECK_URL = (username: string) => `/api/user/check-username?username=${username}`;
  let testData: TestData;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  it("should return success if username available", async () => {
    const res = await request(app).get(CHECK_URL("random_username")).set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/@.*is available/i);
  });

  it("should return fail if username taken", async () => {
    const res = await request(app)
      .get(CHECK_URL(testData.otherUser.username))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/@.*already taken/i);
  });

  it("should return fail if username is same as requesting user", async () => {
    const res = await request(app).get(CHECK_URL(testData.user.username)).set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/@.*already your username/i);
  });

  it("should return fail if username taken, case-insensitive", async () => {
    const res = await request(app)
      .get(CHECK_URL(testData.otherUser.username.toUpperCase()))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/@.*already taken/i);
  });

  it("should return fail if username is invalid format", async () => {
    const res = await request(app).get(CHECK_URL("bad username")).set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.errors.join(",")).toMatch(/username can only contain/i);
  });

  it("should return fail if username is too short", async () => {
    const res = await request(app).get(CHECK_URL("12")).set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.errors.join(",")).toMatch(/minimum 3/i);
  });

  it("should return fail if username is too long", async () => {
    const res = await request(app)
      .get(CHECK_URL("1234567890123456789012345678901"))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.errors.join(",")).toMatch(/maximum 30/i);
  });
});

describe("get profile integration tests", () => {
  const GET_PROFILE_URL = (id: string) => `/api/user/${id}`;
  let testData: TestData;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  it("should successfully retrieve own profile", async () => {
    const res = await request(app).get(GET_PROFILE_URL(testData.user.id)).set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("email", testData.user.email);
    expect(res.body.user).toHaveProperty("username", testData.user.username);
    expect(res.body).toHaveProperty("followedByCount");
    expect(res.body).toHaveProperty("followingCount");
    expect(res.body).not.toHaveProperty("followStatus");
  });

  it("should successfully retrieve another user's profile", async () => {
    const res = await request(app)
      .get(GET_PROFILE_URL(testData.otherUser.id))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("email", null);
    expect(res.body.user).toHaveProperty("username", testData.otherUser.username);
    expect(res.body).toHaveProperty("followedByCount");
    expect(res.body).toHaveProperty("followingCount");
    expect(res.body).toHaveProperty("followStatus");
  });

  it("should fail to find a user with id that is not a valid cuid", async () => {
    const res = await request(app).get(GET_PROFILE_URL("not_a_valid_cuid")).set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.errors.join(",")).toMatch(/invalid cuid/i);
  });

  it("should fail to find a user with non-existent id", async () => {
    const res = await request(app)
      .get(GET_PROFILE_URL("csomerandomusercuid777777"))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/user.*not found/i);
  });

  it("should fail to find a user marked as deleted", async () => {
    const res = await request(app)
      .get(GET_PROFILE_URL(testData.deletedUser.id))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/user.*not found/i);
  });
});

describe("update profile integration tests", () => {
  const UPDATE_URL = "/api/user/me";
  let testData: TestData;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  beforeEach(async () => {
    // reset anything that was updated
    await prisma.user.update({
      where: { id: testData.user.id },
      data: { name: null, username: testData.user.username, bio: null },
    });
  });

  it("should successfully update name, username, bio", async () => {
    const res = await request(app)
      .patch(UPDATE_URL)
      .send({
        name: "Michael Jordan",
        username: "michaeljordan",
        bio: "I love to travel",
      })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("email", testData.user.email); // email unchanged
    expect(res.body.user).toHaveProperty("name", "Michael Jordan");
    expect(res.body.user).toHaveProperty("username", "michaeljordan");
    expect(res.body.user).toHaveProperty("bio", "I love to travel");
  });

  it("should successfully update some fields", async () => {
    const res = await request(app)
      .patch(UPDATE_URL)
      .send({ name: "LeBron James", bio: "Los Angeles" })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("name", "LeBron James");
    expect(res.body.user).toHaveProperty("username", "lebronjames");
    expect(res.body.user).toHaveProperty("bio", "Los Angeles");
  });

  it("should accept empty string fields", async () => {
    const res = await request(app)
      .patch(UPDATE_URL)
      .send({ name: "", bio: "" })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("name", "");
    expect(res.body.user).toHaveProperty("bio", "");
  });

  it("should not update username if it's the same as current (case insensitive)", async () => {
    const res = await request(app)
      .patch(UPDATE_URL)
      .send({ username: testData.user.username.toUpperCase() })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("username", testData.user.username);
  });

  it("should fail if new username is already taken", async () => {
    const res = await request(app)
      .patch(UPDATE_URL)
      .send({ username: testData.otherUser.username })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/@.*already exists/i);
  });

  it("should fail if new username is already taken (case insensitive", async () => {
    const res = await request(app)
      .patch(UPDATE_URL)
      .send({ username: testData.otherUser.username.toUpperCase() })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/@.*already exists/i);
  });

  it("should fail if no fields are submitted for updating", async () => {
    const res = await request(app).patch(UPDATE_URL).send({}).set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid input data/i);
    expect(res.body.errors.join(",")).toMatch(/update at least one field/i);
  });

  it("should fail if username contains invalid characters", async () => {
    const res = await request(app)
      .patch(UPDATE_URL)
      .send({ username: "😂😂😂😂" })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid input data/i);
    expect(res.body.errors.join(",")).toMatch(/username can only contain/i);
  });

  it("should fail to update if user's account is marked as deleted", async () => {
    // mark account as deleted first
    await prisma.user.update({ where: { id: testData.user.id }, data: { isDeleted: true } });

    const res = await request(app)
      .patch(UPDATE_URL)
      .send({ name: "Random Name" })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/user not found/i);
  });
});

describe("delete account integration tests", () => {
  const DELETE_URL = "/api/user/me";
  let testData: TestData;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  beforeEach(async () => {
    await prisma.user.update({ where: { id: testData.user.id }, data: { isDeleted: false } });
  });

  it("should successfully mark requesting user's account as deleted", async () => {
    const res = await request(app)
      .delete(DELETE_URL)
      .send({ password: testData.user.password })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("email", testData.user.email);
    expect(res.body.user).toHaveProperty("isDeleted", true);
  });

  it("should fail to delete account if already marked as deleted", async () => {
    // mark as deleted first
    await prisma.user.update({ where: { id: testData.user.id }, data: { isDeleted: true } });

    const res = await request(app)
      .delete(DELETE_URL)
      .send({ password: testData.user.password })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/user not found/i);
  });

  it("should fail to delete account if password incorrect", async () => {
    const res = await request(app)
      .delete(DELETE_URL)
      .send({ password: "wrong password" })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid credentials/i);
  });
});
