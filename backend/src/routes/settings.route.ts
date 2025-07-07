/**
 * settings routes
 * /api/settings
 */

import express from "express";
import { authenticateAccessToken } from "../middleware/authenticateToken.js";
import { validateData } from "../middleware/validateData.js";
import { updatePrivacySchema } from "../schemas/settings.schema.js";
import { updatePrivacy } from "../controllers/settings.controller.js";

const router = express.Router();

router.use(authenticateAccessToken);

router.patch("/update-privacy", validateData(updatePrivacySchema), updatePrivacy);

export default router;
