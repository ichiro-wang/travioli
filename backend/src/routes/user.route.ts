/**
 * user routes
 * /api/users/<route>
 */

import express from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", getProfile);
router.patch(":/id", protectRoute, updateProfile);
router.get("/:id");
router.get("/:id");

/**
 * TODO
 *
 * view profile: id
 * update profile: id
 * check if username available (for updating profile): username
 * delete account: id
 * get followers: id
 * get following: id
 */
