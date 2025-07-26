/**
 * itinerary routes
 * /api/itineraries/<route>
 */

import express from "express";
import { authenticateAccessToken } from "../middleware/authenticateToken.js";
import { validateData } from "../middleware/validateData.js";
import {
  createItinerarySchema,
  deleteItinerarySchema,
  getItinerarySchema,
  updateItinerarySchema,
} from "../schemas/itineraries.schema.js";
import {
  createItinerary,
  deleteItinerary,
  getItinerary,
  updateItinerary,
} from "../controllers/itinerary.controller.js";

const router = express.Router();

router.use(authenticateAccessToken);

// use base route, nothing extra
router.post("", validateData(createItinerarySchema), createItinerary);

router.get("/:id", validateData(getItinerarySchema), getItinerary);

router.patch("/:id", validateData(updateItinerarySchema), updateItinerary);

router.delete("/:id", validateData(deleteItinerarySchema), deleteItinerary);

export default router;
