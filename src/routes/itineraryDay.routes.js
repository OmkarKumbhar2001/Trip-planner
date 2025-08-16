import express from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import {
  createItineraryDay,
  getItineraryDaysByTrip,
  getItineraryDayById,
  updateItineraryDay,
  deleteItineraryDay
} from "../controllers/itineraryDay.controller.js";

const router = express.Router();

router.use(verifyAccessToken);

router.post("/", createItineraryDay);
router.get("/trip/:tripId", getItineraryDaysByTrip);
router.get("/:id", getItineraryDayById);
router.put("/:id", updateItineraryDay);
router.delete("/:id", deleteItineraryDay);

export default router;
