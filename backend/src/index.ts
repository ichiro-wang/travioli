import dotenv from "dotenv";
dotenv.config();

import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/users.route.js";
import followRoutes from "./routes/follows.route.js";
import itineraryRoutes from "./routes/itineraries.route.js";
import { redisService } from "./services/index.js";

const app = express();

app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined")); // for logging requests
app.use(cookieParser());
app.use(express.json()); // for parsing json data

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

await redisService.connect();

const server: http.Server = http.createServer(app);

export { app, server };
