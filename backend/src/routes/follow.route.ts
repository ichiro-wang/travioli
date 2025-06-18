/**
 * follow routes
 * /api/follows/<route>
 */

import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getFollowListSchema } from "../schemas/users.schemas.js";
import { validateData } from "../middleware/validateData.js";
import { getFollowList } from "../controllers/follow.controller.js";

const router = express.Router();

router.get("/:id/followedBy", authenticateToken, validateData(getFollowListSchema), getFollowList);
router.get("/:id/following", authenticateToken, validateData(getFollowListSchema), getFollowList);

/**
 * TODO
 *
 * get following list: id
 * get followedBy list: id
 * follow: id
 * accept follow
 * reject follow
 * cancel follow
 * get pending follow requests
 * get follow status
 */

export default router;
