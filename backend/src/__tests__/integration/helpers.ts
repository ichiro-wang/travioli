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
};

export const setUpTestData = async () => {
  await prisma.user.deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(testUsers.user.password, salt);

  const user = await prisma.user.create({
    data: {
      ...testUsers.user,
      password: hashedPassword,
    },
  });

  const otherUser = await prisma.user.create({
    data: {
      ...testUsers.otherUser,
      password: hashedPassword,
    },
  });

  // login so we can get the JWT cookie to include in all our requests
  const loginRes = await request(app)
    .post(LOGIN_URL)
    .send({ email: testUsers.user.email, password: testUsers.user.password });

  return {
    user: { ...testUsers.user, id: user.id },
    otherUser: { ...testUsers.otherUser, id: otherUser.id },
    jwtCookie: loginRes.headers["set-cookie"],
  };
};

export type TestData = Awaited<ReturnType<typeof setUpTestData>>;

export const takeDownTest = async () => {
  await prisma.user.deleteMany();
};
