/**
 * authentication routes
 * /api/auth/<route>
 */

import express from "express";
import { getMe, login, logout, pingPong, signup } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/ping", pingPong);
router.post("/signup", signup);
router.post("/login", login);
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
