/**
 * follow routes
 * /api/follow/<route>
 */

import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
  followUserSchema,
  getFollowListSchema,
  getFollowStatusSchema,
  updateFollowStatusSchema,
} from "../schemas/follow.schema.js";
import { validateData } from "../middleware/validateData.js";
import {
  followUser,
  getFollowList,
  getFollowStatus,
  getPendingRequests,
  updateFollowStatus,
} from "../controllers/follow.controller.js";

const router = express.Router();

router.use(authenticateToken);

// follow a user
router.post("/:id", validateData(followUserSchema), followUser);

// follow status between current and target user
router.get("/:id/status", validateData(getFollowStatusSchema), getFollowStatus);

// update follow status
// type: accept|reject|remove|cancel|unfollow
router.patch("/:id/status/:type", validateData(updateFollowStatusSchema), updateFollowStatus);

// pending follow requests
router.get("/pending-requests", authenticateToken, getPendingRequests);

// type: followedBy|following
router.get("/:id/follow-list/:type", validateData(getFollowListSchema), getFollowList);

export default router;
