import Reminder from "../models/reminder.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createReminder = asyncHandler(async (req, res) => {
  const { tripId, targetType, targetId, message, remindAt, channel } = req.body;

  if (!tripId || !targetType || !targetId || !message || !remindAt) {
    throw new ApiError(400, "tripId, targetType, targetId, message, and remindAt are required");
  }

  const reminder = await Reminder.create({
    tripId,
    userId: req.user._id,
    targetType,
    targetId,
    message,
    remindAt,
    channel
  });

  res.status(201).json(new ApiResponse(201, reminder, "Reminder created successfully"));
});

export const getRemindersByTrip = asyncHandler(async (req, res) => {
  const reminders = await Reminder.find({
    tripId: req.params.tripId,
    userId: req.user._id
  });

  res.status(200).json(new ApiResponse(200, reminders));
});

export const getReminderById = asyncHandler(async (req, res) => {
  const reminder = await Reminder.findOne({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!reminder) throw new ApiError(404, "Reminder not found");

  res.status(200).json(new ApiResponse(200, reminder));
});

export const updateReminder = asyncHandler(async (req, res) => {
  const updatedReminder = await Reminder.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );

  if (!updatedReminder) throw new ApiError(404, "Reminder not found");

  res.status(200).json(new ApiResponse(200, updatedReminder, "Reminder updated successfully"));
});

export const deleteReminder = asyncHandler(async (req, res) => {
  const deletedReminder = await Reminder.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!deletedReminder) throw new ApiError(404, "Reminder not found");

  res.status(200).json(new ApiResponse(200, deletedReminder, "Reminder deleted successfully"));
});
