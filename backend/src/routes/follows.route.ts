/**
 * follow routes
 * /api/follows/<route>
 */

import express from "express";
import { authenticateAccessToken } from "../middleware/authenticateToken.js";
import {
  followUserSchema,
  getFollowListSchema,
  getFollowStatusSchema,
  updateFollowStatusSchema,
} from "../schemas/follows.schema.js";
import { validateData } from "../middleware/validateData.js";
import {
  followUser,
  getFollowList,
  getFollowStatus,
  getPendingRequests,
  updateFollowStatus,
} from "../controllers/follows.controller.js";

const router = express.Router();

router.use(authenticateAccessToken);

router.post("/:id", validateData(followUserSchema), followUser);
router.get("/requests", getPendingRequests);

// follow status between current and target user
router.get("/:id/status", validateData(getFollowStatusSchema), getFollowStatus);
router.patch("/:id/status", validateData(updateFollowStatusSchema), updateFollowStatus);

// type: followedBy|following
router.get("/:id/:type", validateData(getFollowListSchema), getFollowList);

export default router;
