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

router.post("/:id/follow-user", authenticateToken, validateData(followUserSchema), followUser);

router.get(
  "/:id/follow-status",
  authenticateToken,
  validateData(getFollowStatusSchema),
  getFollowStatus
);

// type: accept|reject|remove|cancel|unfollow
router.patch(
  "/:id/update-status/:type",
  authenticateToken,
  validateData(updateFollowStatusSchema),
  updateFollowStatus
);

// type: followedBy|following
router.get(
  "/:id/follow-list/:type",
  authenticateToken,
  validateData(getFollowListSchema),
  getFollowList
);

// no data to validate here
router.get("/pending-requests", authenticateToken, getPendingRequests);

/**
 * features
 *
 * get followedBy|following list: id
 * follow: id
 * accept|reject|cancel|unfollow a follow
 * get pending follow requests
 * get follow status
 */

export default router;
