/**
 * authentication routes
 * /api/auth/<route>
 */

import express from "express";
import {
  getMe,
  login,
  logout,
  pingPong,
  refresh,
  resendVerificationEmail,
  signup,
  verifyEmail,
} from "../controllers/auth.controller.js";
import {
  authenticateAccessToken,
  authenticateRefreshToken,
} from "../middleware/authenticateToken.js";
import { validateData } from "../middleware/validateData.js";
import {
  loginSchema,
  resendVerificationEmailSchema,
  signupSchema,
  verifyEmailSchema,
} from "../schemas/auth.schemas.js";

const router = express.Router();

router.get("/ping", pingPong);
router.post("/signup", validateData(signupSchema), signup);
router.get("/verify-email", validateData(verifyEmailSchema), verifyEmail);
router.post(
  "/resend-verification-email",
  validateData(resendVerificationEmailSchema),
  resendVerificationEmail
);
router.post("/login", validateData(loginSchema), login);
router.post("/logout", logout);
router.get("/me", authenticateAccessToken, getMe);
router.post("/refresh", authenticateRefreshToken, refresh);

/**
 * Possible features
 *
 * change password
 * reset password
 */

export default router;
