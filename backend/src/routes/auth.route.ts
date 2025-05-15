/**
 * authentication routes
 * /api/auth/<route>
 */

import express from "express";
import { getMe, login, logout, pingPong, signup } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import validateData from "../middleware/validateData.js";
import { loginSchema, signupSchema } from "../schemas/auth.schemas.js";

const router = express.Router();

router.get("/ping", pingPong);
router.post("/signup", validateData(signupSchema), signup);
router.post("/login", validateData(loginSchema), login);
router.post("/logout", logout);
router.get("/me", protectRoute, getMe);

/**
 * Possible features
 *
 * change password
 * verify email
 * reset password
 */

export default router;
