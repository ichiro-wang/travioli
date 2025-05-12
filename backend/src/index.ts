import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

const allowedOrigins = process.env.REQUEST_ORIGINS?.split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins?.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

const server: http.Server = http.createServer(app);

export { app, server };
