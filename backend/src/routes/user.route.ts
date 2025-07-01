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

router.use(authenticateToken);

router.get("/check-username", validateData(checkUsernameSchema), checkUsername);
router.get("/:id", validateData(getProfileSchema), getUserProfile);
router.patch("/me", validateData(updateProfileSchema), updateProfile);
router.delete("/me", validateData(deleteAccountSchema), softDeleteAccount);

export default router;
