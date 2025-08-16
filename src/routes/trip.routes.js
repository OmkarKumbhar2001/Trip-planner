import express from "express";
import { createTrip, getTrips, getTripById, updateTrip, deleteTrip } from "../controllers/trip.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyAccessToken); // All routes require authentication

router.post("/", createTrip);
router.get("/", getTrips);
router.get("/:id", getTripById);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);

export default router;
