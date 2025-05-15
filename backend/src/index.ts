import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import authRoutes from "./routes/auth.route.js";
import usersRoutes from "./routes/users.route.js";

const app = express();

app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined")); // for logging requests
app.use(cookieParser());
app.use(express.json()); // for reading json data

// allow frontend to access backend
app.use(
  cors({
    origin: process.env.REQUEST_ORIGIN,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

const server: http.Server = http.createServer(app);

export { app, server };
