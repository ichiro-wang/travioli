import request from "supertest";
import prisma from "../../db/prisma.js";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { setUpTestData, takeDownTest, TestData } from "./helpers.js";
import { app } from "../../index.js";
import { FollowStatus } from "../../generated/client/index.js";
import { FollowAction } from "../../types/types.js";

describe("follow user integration tests", () => {
  const FOLLOW_URL = (id: string) => `/api/follows/${id}`;
  let testData: TestData;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  beforeEach(async () => {
    // delete follows relationships before each test
    await prisma.follows.deleteMany({});
  });

  it(`should successfully follow a non-private user. 
    creates a follows relationship with status: accepted`, async () => {
    const res = await request(app)
      .post(FOLLOW_URL(testData.otherUser.id))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/successfully followed user/i);
    expect(res.body.follow).toHaveProperty("status", FollowStatus.accepted);
    expect(res.body.follow).toHaveProperty("followedById", testData.user.id);
    expect(res.body.follow).toHaveProperty(
      "followingId",
      testData.otherUser.id
    );
  });

  it(`should send a follow request to a private user.
    creates a follows relationship with status: pending`, async () => {
    const res = await request(app)
      .post(FOLLOW_URL(testData.privateUser.id))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/follow request sent/i);
    expect(res.body.follow).toHaveProperty("status", FollowStatus.pending);
    expect(res.body.follow).toHaveProperty("followedById", testData.user.id);
    expect(res.body.follow).toHaveProperty(
      "followingId",
      testData.privateUser.id
    );
  });

  it(`should fail when a user tries to follow self`, async () => {
    const res = await request(app)
      .post(FOLLOW_URL(testData.user.id))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/cannot follow self/i);
  });

  it(`should fail when trying to follow non-existent user`, async () => {
    const res = await request(app)
      .post(FOLLOW_URL("csomerandomusercuid777777"))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/user not found/i);
  });

  it(`should fail when trying to follow deleted user`, async () => {
    const res = await request(app)
      .post(FOLLOW_URL(testData.deletedUser.id))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/user not found/i);
  });

  it(`should fail when trying to follow a user you already follow`, async () => {
    // first, follow the user
    await prisma.follows.create({
      data: {
        followedById: testData.user.id,
        followingId: testData.otherUser.id,
        status: FollowStatus.accepted,
      },
    });

    const res = await request(app)
      .post(FOLLOW_URL(testData.otherUser.id))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/you already follow/i);
  });

  it(`should fail when trying to follow a user you already requested`, async () => {
    // first, follow the user
    await prisma.follows.create({
      data: {
        followedById: testData.user.id,
        followingId: testData.privateUser.id,
        status: FollowStatus.pending,
      },
    });

    const res = await request(app)
      .post(FOLLOW_URL(testData.privateUser.id))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/you have already requested/i);
  });

  it(`should succeed when trying to follow a public user you already have a 
    follows relationship with but not following`, async () => {
    // first, follow the user
    await prisma.follows.create({
      data: {
        followedById: testData.user.id,
        followingId: testData.otherUser.id,
        status: FollowStatus.notFollowing,
      },
    });

    const res = await request(app)
      .post(FOLLOW_URL(testData.otherUser.id))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/successfully followed user/i);
    expect(res.body.follow).toHaveProperty("status", FollowStatus.accepted);
  });

  it(`should send a follow request when trying to follow a private user you already have a 
    follows relationship with but not following`, async () => {
    // first, follow the user
    await prisma.follows.create({
      data: {
        followedById: testData.user.id,
        followingId: testData.privateUser.id,
        status: FollowStatus.notFollowing,
      },
    });

    const res = await request(app)
      .post(FOLLOW_URL(testData.privateUser.id))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/follow request sent/i);
    expect(res.body.follow).toHaveProperty("status", FollowStatus.pending);
  });
});

describe("update follow status integration tests", () => {
  const UPDATE_URL = (id: string): string => `/api/follows/${id}/status`;
  let testData: TestData;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  beforeEach(async () => {
    await prisma.follows.deleteMany({});
    // set up follow relationships to test
    await Promise.all([
      prisma.follows.create({
        data: {
          followedById: testData.otherUser.id,
          followingId: testData.user.id,
          status: FollowStatus.pending,
        },
      }),
    ]);
  });

  it("should successfully accept a follow request", async () => {
    const res = await request(app)
      .patch(UPDATE_URL(testData.otherUser.id))
      .send({ type: FollowAction.accept })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.follow).toHaveProperty("status", FollowStatus.accepted);
    expect(res.body.message).toMatch(/accepted follow request/i);
  });

  it("should successfully reject a follow request", async () => {
    const res = await request(app)
      .patch(UPDATE_URL(testData.otherUser.id))
      .send({ type: FollowAction.reject })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.follow).toHaveProperty("status", FollowStatus.notFollowing);
    expect(res.body.message).toMatch(/rejected follow request/i);
  });

  it("should successfully remove a follower", async () => {
    const res = await request(app)
      .patch(UPDATE_URL(testData.otherUser.id))
      .send({ type: FollowAction.remove })
      .set("Cookie", testData.accessTokenCookie);
  });

  it("should successfully cancel a follow request", async () => {
    // create a pending follow request
    await prisma.follows.create({
      data: {
        followedById: testData.user.id,
        followingId: testData.otherUser.id,
        status: FollowStatus.pending,
      },
    });

    const res = await request(app)
      .patch(UPDATE_URL(testData.otherUser.id))
      .send({ type: FollowAction.cancel })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.follow).toHaveProperty("status", FollowStatus.notFollowing);
    expect(res.body.message).toMatch(/cancelled follow request/i);
  });

  it("should successfully unfollow a user", async () => {
    // create accepted follow relationship
    await prisma.follows.create({
      data: {
        followedById: testData.user.id,
        followingId: testData.otherUser.id,
        status: FollowStatus.accepted,
      },
    });

    const res = await request(app)
      .patch(UPDATE_URL(testData.otherUser.id))
      .send({ type: FollowAction.unfollow })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.follow).toHaveProperty("status", FollowStatus.notFollowing);
    expect(res.body.message).toMatch(/unfollowed user/i);
  });

  it("should fail to update when no follows relationship exists between 2 users", async () => {
    const res = await request(app)
      .patch(UPDATE_URL(testData.otherUser.id))
      .send({ type: FollowAction.unfollow })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/no.*relationship.*could not update/i);
  });

  it("should fail to remove a follower when no accepted relationship exists", async () => {
    // no accepted relationship set up
    // relationship status is currently pending
    const res = await request(app)
      .patch(UPDATE_URL(testData.otherUser.id))
      .send({ type: FollowAction.remove })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(
      /failed to update follow status. expected.*accepted.*got pending/i
    );
  });

  it("should fail to cancel a follow request if status is not pending", async () => {
    // set up accepted relationship
    await prisma.follows.create({
      data: {
        followedById: testData.user.id,
        followingId: testData.otherUser.id,
        status: FollowStatus.accepted,
      },
    });

    const res = await request(app)
      .patch(UPDATE_URL(testData.otherUser.id))
      .send({ type: FollowAction.cancel })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(
      /failed to update follow status. expected.*pending.*got accepted/i
    );
  });

  it("should fail to unfollow a user if status is not accepted", async () => {
    // set up notFollowing relationship
    await prisma.follows.create({
      data: {
        followedById: testData.user.id,
        followingId: testData.otherUser.id,
        status: FollowStatus.notFollowing,
      },
    });

    const res = await request(app)
      .patch(UPDATE_URL(testData.otherUser.id))
      .send({ type: FollowAction.unfollow })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(
      /failed to update follow status. expected.*accepted.*got notFollowing/i
    );
  });

  it("should fail with invalid action type", async () => {
    // set up pending relationship
    await prisma.follows.create({
      data: {
        followedById: testData.privateUser.id,
        followingId: testData.user.id,
        status: FollowStatus.pending,
      },
    });

    // this should be caught by zod schema
    const res = await request(app)
      .patch(UPDATE_URL(testData.otherUser.id))
      .send({ type: "invalid_action" })
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid input data/i);
  });
});

// ...existing code...

describe("get pending follow requests integration tests", () => {
  let testData: TestData;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  beforeEach(async () => {
    await prisma.follows.deleteMany({});
    // otherUser sends a follow request to user
    await prisma.follows.create({
      data: {
        followedById: testData.otherUser.id,
        followingId: testData.user.id,
        status: FollowStatus.pending,
      },
    });
  });

  it("should return pending follow requests for current user", async () => {
    const res = await request(app)
      .get("/api/follows/requests")
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.pendingRequests).toHaveLength(1);
    expect(res.body.pendingRequests[0]).toHaveProperty(
      "followedById",
      testData.otherUser.id
    );
    expect(res.body.pendingRequests[0]).toHaveProperty(
      "followingId",
      testData.user.id
    );
    expect(res.body.pendingRequests[0]).toHaveProperty(
      "status",
      FollowStatus.pending
    );
  });
});

describe("get follow status integration tests", () => {
  let testData: TestData;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  beforeEach(async () => {
    await prisma.follows.deleteMany({});
  });

  it("should return notFollowing if no relationship exists", async () => {
    const res = await request(app)
      .get(`/api/follows/${testData.otherUser.id}/status`)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.followStatus).toBe(FollowStatus.notFollowing);
  });

  it("should return accepted if relationship exists", async () => {
    await prisma.follows.create({
      data: {
        followedById: testData.user.id,
        followingId: testData.otherUser.id,
        status: FollowStatus.accepted,
      },
    });

    const res = await request(app)
      .get(`/api/follows/${testData.otherUser.id}/status`)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.followStatus).toBe(FollowStatus.accepted);
  });

  it("should return 400 if checking self", async () => {
    const res = await request(app)
      .get(`/api/follows/${testData.user.id}/status`)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(
      /do not have a follow relationship with yourself/i
    );
  });

  it("should return 404 if user does not exist", async () => {
    const res = await request(app)
      .get(`/api/follows/csomerandomusercuid777777/status`)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/user not found/i);
  });
});

describe("get follow list integration tests", () => {
  let testData: TestData;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  beforeEach(async () => {
    await prisma.follows.deleteMany({});
    // Add some followers and following
    await prisma.follows.create({
      data: {
        followedById: testData.otherUser.id,
        followingId: testData.user.id,
        status: FollowStatus.accepted,
      },
    });
    await prisma.follows.create({
      data: {
        followedById: testData.user.id,
        followingId: testData.otherUser.id,
        status: FollowStatus.accepted,
      },
    });
  });

  it("should return followedBy list for user", async () => {
    const res = await request(app)
      .get(`/api/follows/${testData.user.id}/followedBy?loadIndex=0`)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.followedBy).toBeInstanceOf(Array);
    expect(res.body.followedBy.length).toBeGreaterThanOrEqual(1);
    expect(res.body.pagination).toHaveProperty("hasMore");
  });

  it("should return following list for user", async () => {
    const res = await request(app)
      .get(`/api/follows/${testData.user.id}/following?loadIndex=0`)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.following).toBeInstanceOf(Array);
    expect(res.body.following.length).toBeGreaterThanOrEqual(1);
    expect(res.body.pagination).toHaveProperty("hasMore");
  });

  it("should return 403 for private user if no permission", async () => {
    // Make privateUser private and not followed by current user
    const res = await request(app)
      .get(`/api/follows/${testData.privateUser.id}/followedBy?loadIndex=0`)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/account is private/i);
  });

  //
});
