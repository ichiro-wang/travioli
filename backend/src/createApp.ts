import dotenv from "dotenv";
dotenv.config();

import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import usersRoutes from "./routes/users.route.js";

const createApp = (): Express => {
  const app = express();

  app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined")); // for logging requests
  app.use(cookieParser()); // for parsing cookies
  app.use(express.json()); // for parsing json data

  // allow REQUEST_ORIGIN (eg - frontend) to access backend
  app.use(
    cors({
      origin: process.env.REQUEST_ORIGIN,
      credentials: true,
    })
  );

  // register routes
  app.use("/api/auth", authRoutes);
  app.use("/api/users", usersRoutes);

  return app;
};

export default createApp;
