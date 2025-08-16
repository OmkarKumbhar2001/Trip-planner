import Trip from "../models/trip.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/APIResponse.js";

// Create Trip
export const createTrip = asyncHandler(async (req, res) => {
  const { title, description, startDate, endDate, approxDays, travelStyle, defaultLocale } = req.body;

  if (!title) {
    throw new ApiError(400, "Trip title is required");
  }

  const trip = await Trip.create({
    userId: req.user.userId,
    title,
    description,
    startDate,
    endDate,
    approxDays,
    travelStyle,
    defaultLocale
  });

  res.status(201).json(new ApiResponse(201, trip, "Trip created successfully"));
});

// Get all trips for logged-in user
export const getTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({ userId: req.user._id }).sort({ startDate: 1 });
  res.status(200).json(new ApiResponse(200, trips, "Trips fetched successfully"));
});

// Get single trip
export const getTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findOne({ _id: req.params.id, userId: req.user._id });

  if (!trip) {
    throw new ApiError(404, "Trip not found");
  }

  res.status(200).json(new ApiResponse(200, trip, "Trip fetched successfully"));
});

// Update trip
export const updateTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!trip) {
    throw new ApiError(404, "Trip not found or unauthorized");
  }

  res.status(200).json(new ApiResponse(200, trip, "Trip updated successfully"));
});

// Delete trip
export const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

  if (!trip) {
    throw new ApiError(404, "Trip not found or unauthorized");
  }

  res.status(200).json(new ApiResponse(200, null, "Trip deleted successfully"));
});
