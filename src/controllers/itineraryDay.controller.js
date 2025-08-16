import ItineraryDay from "../models/itinerary_day.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createItineraryDay = asyncHandler(async (req, res) => {
  const { tripId, dayIndex, date, title, locations, activities, transportHints } = req.body;

  if (!tripId || dayIndex === undefined) {
    throw new ApiError(400, "tripId and dayIndex are required");
  }

  const itineraryDay = await ItineraryDay.create({
    tripId,
    dayIndex,
    date,
    title,
    locations,
    activities,
    transportHints
  });

  res.status(201).json(new ApiResponse(201, itineraryDay, "Itinerary day created successfully"));
});

export const getItineraryDaysByTrip = asyncHandler(async (req, res) => {
  const itineraryDays = await ItineraryDay.find({ tripId: req.params.tripId })
    .sort({ dayIndex: 1 });

  res.status(200).json(new ApiResponse(200, itineraryDays));
});

export const getItineraryDayById = asyncHandler(async (req, res) => {
  const itineraryDay = await ItineraryDay.findById(req.params.id);

  if (!itineraryDay) throw new ApiError(404, "Itinerary day not found");

  res.status(200).json(new ApiResponse(200, itineraryDay));
});

export const updateItineraryDay = asyncHandler(async (req, res) => {
  const updatedDay = await ItineraryDay.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedDay) throw new ApiError(404, "Itinerary day not found");

  res.status(200).json(new ApiResponse(200, updatedDay, "Itinerary day updated successfully"));
});

export const deleteItineraryDay = asyncHandler(async (req, res) => {
  const deletedDay = await ItineraryDay.findByIdAndDelete(req.params.id);

  if (!deletedDay) throw new ApiError(404, "Itinerary day not found");

  res.status(200).json(new ApiResponse(200, deletedDay, "Itinerary day deleted successfully"));
});
