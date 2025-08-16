import express from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import {
  createPackingItem,
  getPackingItemsByTrip,
  getPackingItemById,
  updatePackingItem,
  deletePackingItem
} from "../controllers/packingItem.controller.js";

const router = express.Router();

router.use(verifyAccessToken);

router.post("/", createPackingItem);
router.get("/trip/:tripId", getPackingItemsByTrip);
router.get("/:id", getPackingItemById);
router.put("/:id", updatePackingItem);
router.delete("/:id", deletePackingItem);

export default router;
