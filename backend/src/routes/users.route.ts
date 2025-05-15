/**
 * user routes
 * /api/users/<route>
 */

import express from "express";
import {
  checkUsername,
  deleteAccount,
  getFollowList,
  getProfile,
  updateProfile,
} from "../controllers/users.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import validateData from "../middleware/validateData.js";
import {
  checkUsernameSchema,
  deleteAccountSchema,
  getFollowListSchema,
  updateProfileSchema,
} from "../schemas/users.schemas.js";
import { cuidParamsSchema } from "../schemas/common.schema.js";

const router = express.Router();

router.get(
  "/check-username/:username",
  protectRoute,
  validateData(checkUsernameSchema),
  checkUsername
);
router.get("/:id/followers", protectRoute, validateData(getFollowListSchema), getFollowList);
router.get("/:id/following", protectRoute, validateData(getFollowListSchema), getFollowList);
router.get("/:id", protectRoute, validateData(cuidParamsSchema), getProfile);
router.patch("/:id", protectRoute, validateData(updateProfileSchema), updateProfile);
router.delete("/:id", protectRoute, validateData(deleteAccountSchema), deleteAccount);

/**
 * features
 *
 * view profile: id
 * update profile: id
 * check if username available (for updating profile): username
 * delete account: id
 * get followers: id
 * get following: id
 */

export default router;
