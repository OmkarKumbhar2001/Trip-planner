import mongoose from "mongoose";

const itineraryDaySchema = new mongoose.Schema(
  {
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    dayIndex: { type: Number, required: true },
    date: Date,
    title: String,
    locations: [
      {
        name: String,
        lat: Number,
        lng: Number,
        placeId: String,
      }
    ],
    activities: [String],
    transportHints: String,
  },
  { timestamps: true }
);

itineraryDaySchema.index({ tripId: 1, dayIndex: 1 }, { unique: true });
itineraryDaySchema.index({ tripId: 1, date: 1 });

export default mongoose.model("ItineraryDay", itineraryDaySchema);
