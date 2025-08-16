import PackingItem from "../models/packing_item.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createPackingItem = asyncHandler(async (req, res) => {
  const { tripId, item, category, isBuyBefore, status, quantity, priority, suggestedByAI } = req.body;

  if (!tripId || !item) {
    throw new ApiError(400, "Trip ID and item name are required");
  }

  const packingItem = await PackingItem.create({
    tripId,
    userId: req.user._id,
    item,
    category,
    isBuyBefore,
    status,
    quantity,
    priority,
    suggestedByAI
  });

  res.status(201).json(new ApiResponse(201, packingItem, "Packing item created successfully"));
});

export const getPackingItemsByTrip = asyncHandler(async (req, res) => {
  const packingItems = await PackingItem.find({
    tripId: req.params.tripId,
    userId: req.user._id
  });

  res.status(200).json(new ApiResponse(200, packingItems));
});

export const getPackingItemById = asyncHandler(async (req, res) => {
  const packingItem = await PackingItem.findOne({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!packingItem) throw new ApiError(404, "Packing item not found");

  res.status(200).json(new ApiResponse(200, packingItem));
});

export const updatePackingItem = asyncHandler(async (req, res) => {
  const updatedPackingItem = await PackingItem.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );

  if (!updatedPackingItem) throw new ApiError(404, "Packing item not found");

  res.status(200).json(new ApiResponse(200, updatedPackingItem, "Packing item updated successfully"));
});

export const deletePackingItem = asyncHandler(async (req, res) => {
  const deletedPackingItem = await PackingItem.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!deletedPackingItem) throw new ApiError(404, "Packing item not found");

  res.status(200).json(new ApiResponse(200, deletedPackingItem, "Packing item deleted successfully"));
});
