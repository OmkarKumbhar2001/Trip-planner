import express from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import {
  createReminder,
  getRemindersByTrip,
  getReminderById,
  updateReminder,
  deleteReminder
} from "../controllers/reminder.controller.js";

const router = express.Router();

router.use(verifyAccessToken);

router.post("/", createReminder);
router.get("/trip/:tripId", getRemindersByTrip);
router.get("/:id", getReminderById);
router.put("/:id", updateReminder);
router.delete("/:id", deleteReminder);

export default router;
