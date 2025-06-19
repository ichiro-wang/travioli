/**
 * follow routes
 * /api/follows/<route>
 */

import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { followUserSchema, getFollowListSchema } from "../schemas/follow.schema.js";
import { validateData } from "../middleware/validateData.js";
import { followUser, getFollowList } from "../controllers/follow.controller.js";

const router = express.Router();

router.post("/:id/follow", authenticateToken, validateData(followUserSchema), followUser);
router.patch(
  "/:id/follow/:type(accept|reject|cancel|unfollow)",
  authenticateToken,
  validateData(followUserSchema),
  followUser
);
router.get(
  "/:id/:type(followedBy|following)",
  authenticateToken,
  validateData(getFollowListSchema),
  getFollowList
);

/**
 * TODO
 *
 * get followedBy|following list: id
 * follow: id
 * accept|reject|cancel|unfollow a follow
 * get pending follow requests
 * get follow status
 */

export default router;
