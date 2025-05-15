/**
 * user routes
 * /api/users/<route>
 */

import express from "express";
import { getProfile, updateProfile } from "../controllers/users.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import validateData from "../middleware/validateData.js";
import { getProfileSchema, updateProfileSchema } from "../schemas/users.schemas.js";

const router = express.Router();

router.get("/:id", validateData(getProfileSchema), getProfile);
router.patch("/:id", protectRoute, validateData(updateProfileSchema), updateProfile);

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

export default router;
