import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../../index.js";
import { setUpTestData, takeDownTest, TestData } from "./helpers.js";
import prisma from "../../db/prisma.js";

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
    expect(res.body.user).toHaveProperty("email", testData.user.email);
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

  it("should fail to find a user marked as deleted", async () => {
    const res = await request(app)
      .get(`${GET_PROFILE_URL}/${testData.deletedUser.id}`)
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

  beforeEach(async () => {
    // reset anything that was updated
    await prisma.user.update({
      where: { id: testData.user.id },
      data: { name: null, username: testData.user.username, bio: null, isPrivate: false },
    });
  });

  it("should successfully update name, username, bio, isPrivate", async () => {
    const res = await request(app)
      .patch(`${UPDATE_URL}/${testData.user.id}`)
      .send({
        name: "Bryce James",
        username: "brycejames",
        bio: "I love to travel",
        isPrivate: true,
      })
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("email", testData.user.email); // email unchanged
    expect(res.body.user).toHaveProperty("name", "Bryce James");
    expect(res.body.user).toHaveProperty("username", "brycejames");
    expect(res.body.user).toHaveProperty("bio", "I love to travel");
    expect(res.body.user).toHaveProperty("isPrivate", true);
  });

  it("should successfully update some fields", async () => {
    const res = await request(app)
      .patch(`${UPDATE_URL}/${testData.user.id}`)
      .send({ name: "LeBron James", bio: "Los Angeles" })
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("name", "LeBron James");
    expect(res.body.user).toHaveProperty("username", "lebronjames");
    expect(res.body.user).toHaveProperty("bio", "Los Angeles");
    expect(res.body.user).toHaveProperty("isPrivate", false);
  });

  it("should fail if new username is already taken", async () => {
    const res = await request(app)
      .patch(`${UPDATE_URL}/${testData.user.id}`)
      .send({ username: testData.otherUser.username })
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/username already taken/i);
  });

  it("should fail if no fields are submitted for updating", async () => {
    const res = await request(app)
      .patch(`${UPDATE_URL}/${testData.user.id}`)
      .send({})
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid input data/i);
    expect(res.body.errors.join(",")).toMatch(/update at least one field/i);
  });

  it("should fail trying to update another user's profile", async () => {
    const res = await request(app)
      .patch(`${UPDATE_URL}/${testData.otherUser.id}`)
      .send({ name: "Other User" })
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/cannot update.*another user/i);
  });

  it("should fail to update a user marked as deleted", async () => {
    // updating profile only works if the given id is equal to the requesting user
    // so any id other than own will return 403

    const res = await request(app)
      .patch(`${UPDATE_URL}/${testData.deletedUser.id}`)
      .send({ name: "Random Name" })
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/cannot update.*another user/i);
  });
});

describe("delete account integration tests", () => {
  const DELETE_URL = "/api/users"; // add user id to the end
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
      .delete(`${DELETE_URL}/${testData.user.id}`)
      .send({ password: testData.user.password })
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("email", testData.user.email);
    expect(res.body.user).toHaveProperty("isDeleted", true);
  });

  it("should fail to delete account if already marked as deleted", async () => {
    // mark as deleted first
    await prisma.user.update({ where: { id: testData.user.id }, data: { isDeleted: true } });

    const res = await request(app)
      .delete(`${DELETE_URL}/${testData.user.id}`)
      .send({ password: testData.user.password })
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/user.*not found/i);
  });

  it("should fail to delete account if password incorrect", async () => {
    const res = await request(app)
      .delete(`${DELETE_URL}/${testData.user.id}`)
      .send({ password: "wrong password" })
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid cred/i);
  });

  it("should fail to delete another user's account", async () => {
    const res = await request(app)
      .delete(`${DELETE_URL}/${testData.otherUser.id}`)
      .send({ password: testData.otherUser.password })
      .set("Cookie", testData.jwtCookie);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/cannot delete.*another user/i);
  });
});
