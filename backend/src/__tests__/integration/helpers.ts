import bcrypt from "bcryptjs";
import prisma from "../../db/prisma.js";
import request from "supertest";
import { app } from "../../index.js";

const LOGIN_URL = "/api/auth/login";

const testUsers = {
  user: {
    email: "lebronjames@gmail.com",
    username: "lebronjames",
    password: "password",
  },
  otherUser: {
    email: "bronnyjames@gmail.com",
    username: "bronnyjames",
    password: "password",
  },
  privateUser: {
    email: "brycejames@gmail.com",
    username: "brycejames",
    password: "password",
  },
  deletedUser: {
    email: "deleted@gmail.com",
    username: "deleted",
    password: "password",
  },
};

export const setUpTestData = async () => {
  const [_, hashedPassword] = await Promise.all([
    await prisma.user.deleteMany({}),
    (async () => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(testUsers.user.password, salt);
    })(),
  ]);

  const [user, otherUser, privateUser, deletedUser] = await Promise.all([
    prisma.user.create({
      data: {
        ...testUsers.user,
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        ...testUsers.otherUser,
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        ...testUsers.privateUser,
        password: hashedPassword,
        isPrivate: true,
      },
    }),
    prisma.user.create({
      data: {
        ...testUsers.deletedUser,
        password: hashedPassword,
        isDeleted: true,
      },
    }),
  ]);

  // login so we can get the JWT cookie to include in all our requests
  const loginRes = await request(app)
    .post(LOGIN_URL)
    .send({ email: testUsers.user.email, password: testUsers.user.password });

  return {
    user: { ...testUsers.user, id: user.id },
    otherUser: { ...testUsers.otherUser, id: otherUser.id },
    privateUser: { ...testUsers.privateUser, id: privateUser.id },
    deletedUser: { ...testUsers.deletedUser, id: deletedUser.id },
    accessTokenCookie: loginRes.headers["set-cookie"][0],
    refreshTokenCookie: loginRes.headers["set-cookie"][1],
  };
};

export type TestData = Awaited<ReturnType<typeof setUpTestData>>;

export const takeDownTest = async () => {
  await prisma.user.deleteMany();
  await prisma.follows.deleteMany();
};
