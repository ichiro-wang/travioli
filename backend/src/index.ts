import http from "http";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import usersRoutes from "./routes/users.route.js";
import followRoutes from "./routes/follow.route.js";

const app = express();

app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined")); // for logging requests
app.use(cookieParser()); // for parsing cookies
app.use(express.json()); // for parsing json data

// allow REQUEST_ORIGIN to access backend
app.use(
  cors({
    origin: process.env.REQUEST_ORIGIN,
    credentials: true,
  })
);

// register routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/follow", followRoutes);

const server: http.Server = http.createServer(app);

export { app, server };
