/**
 * user routes
 * /api/users/<route>
 */

import express from "express";
import {
  checkUsername,
  getUserItineraries,
  getUserProfile,
  softDeleteUser,
  updatePrivacy,
  updateProfile,
} from "../controllers/users.controller.js";
import { authenticateAccessToken } from "../middleware/authenticateToken.js";
import { validateData } from "../middleware/validateData.js";
import {
  checkUsernameSchema,
  deleteAccountSchema,
  getProfileSchema,
  getUserItinerariesSchema,
  updatePrivacySchema,
  updateProfileSchema,
} from "../schemas/users.schemas.js";

const router = express.Router();

router.use(authenticateAccessToken);

router.get("/check-username", validateData(checkUsernameSchema), checkUsername);
router.get("/:id/itineraries", validateData(getUserItinerariesSchema), getUserItineraries);
router.get("/:id", validateData(getProfileSchema), getUserProfile);
router.patch("/me", validateData(updateProfileSchema), updateProfile);
router.delete("/me", validateData(deleteAccountSchema), softDeleteUser);

// TODO
router.patch("/privacy", validateData(updatePrivacySchema), updatePrivacy);
// get user itineraries

export default router;
