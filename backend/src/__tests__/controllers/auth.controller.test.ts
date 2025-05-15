import { type Express } from "express";
import request from "supertest";
import createApp from "../../createApp.js";

describe("signup route tests", () => {
  let app: Express = createApp();
  const SIGNUP_URL = "/api/auth/signup";

  beforeAll(() => {
    app = createApp();
  });

  it("should signup successfully", async () => {
    const body = {
      email: "lebron@gmail.com",
      username: "lebronjames",
      password: "password",
      confirmPassword: "password",
    };

    const res = await request(app).post(SIGNUP_URL).send(body);
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });
});
