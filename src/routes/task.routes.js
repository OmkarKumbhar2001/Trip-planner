import express from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import {
  createTask,
  getTasksByTrip,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(verifyAccessToken);

router.post("/", createTask);
router.get("/trip/:tripId", getTasksByTrip);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
