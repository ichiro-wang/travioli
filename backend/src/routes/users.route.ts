/**
 * user routes
 * /api/users/<route>
 */

import express from "express";
import {
  checkUsername,
  deleteAccount,
  getProfile,
  updateProfile,
} from "../controllers/users.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { validateData } from "../middleware/validateData.js";
import {
  checkUsernameSchema,
  deleteAccountSchema,
  updateProfileSchema,
} from "../schemas/users.schemas.js";
import { cuidParamsSchema } from "../schemas/common.schema.js";

const router = express.Router();

router.get(
  "/check-username/:username",
  authenticateToken,
  validateData(checkUsernameSchema),
  checkUsername
);
router.get("/:id", authenticateToken, validateData(cuidParamsSchema), getProfile);
router.patch("/:id", authenticateToken, validateData(updateProfileSchema), updateProfile);
router.delete("/:id", authenticateToken, validateData(deleteAccountSchema), deleteAccount);

/**
 * features
 *
 * view profile: id
 * update profile: id
 * check if username available (for updating profile): username
 * delete account: id
 */

export default router;
