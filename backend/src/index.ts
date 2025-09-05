import dotenv from "dotenv";
dotenv.config();

import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/users.route.js";
import followRoutes from "./routes/follows.route.js";
import itineraryRoutes from "./routes/itineraries.route.js";
import { cwd } from "process";

const app = express();

app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined")); // for logging requests
app.use(cookieParser());
app.use(express.json()); // for parsing application/json type

app.use(
  cors({
    origin: process.env.REQUEST_ORIGIN,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/follows", followRoutes);
app.use("/api/itineraries", itineraryRoutes);

app.get("/api/ping", (_, res) => {
  res.status(200).json({ message: "pong" });
});

const spec = path.join(cwd(), "openapi-docs.yml");
app.use("/api/spec", express.static(spec));

const server: http.Server = http.createServer(app);

export { app, server };
