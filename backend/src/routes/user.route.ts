/**
 * user routes
 * /api/users/<route>
 */

import express from "express";
import {
  checkUsername,
  getUserProfile,
  softDeleteAccount,
  updateProfile,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { validateData } from "../middleware/validateData.js";
import {
  checkUsernameSchema,
  deleteAccountSchema,
  getProfileSchema,
  updateProfileSchema,
} from "../schemas/user.schemas.js";

const router = express.Router();

router.get("/check-username", authenticateToken, validateData(checkUsernameSchema), checkUsername);
router.get("/:id", authenticateToken, validateData(getProfileSchema), getUserProfile);
router.patch("/me", authenticateToken, validateData(updateProfileSchema), updateProfile);
router.delete("/me", authenticateToken, validateData(deleteAccountSchema), softDeleteAccount);

/**
 * features
 *
 * view profile: id
 * update profile: id
 * check if username available (for updating profile): username
 * delete account: id
 */

export default router;
