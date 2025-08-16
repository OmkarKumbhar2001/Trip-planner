import Task from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createTask = asyncHandler(async (req, res) => {
  const { tripId, type, title, description, dueAt, priority, linkedItemId } = req.body;

  if (!tripId || !type || !title) {
    throw new ApiError(400, "Trip ID, type, and title are required");
  }

  const task = await Task.create({
    tripId,
    userId: req.user._id,
    type,
    title,
    description,
    dueAt,
    priority,
    linkedItemId
  });

  res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
});

export const getTasksByTrip = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    tripId: req.params.tripId,
    userId: req.user._id
  });

  res.status(200).json(new ApiResponse(200, tasks));
});

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!task) throw new ApiError(404, "Task not found");

  res.status(200).json(new ApiResponse(200, task));
});

export const updateTask = asyncHandler(async (req, res) => {
  const updatedTask = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );

  if (!updatedTask) throw new ApiError(404, "Task not found");

  res.status(200).json(new ApiResponse(200, updatedTask, "Task updated successfully"));
});

export const deleteTask = asyncHandler(async (req, res) => {
  const deletedTask = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!deletedTask) throw new ApiError(404, "Task not found");

  res.status(200).json(new ApiResponse(200, deletedTask, "Task deleted successfully"));
});
