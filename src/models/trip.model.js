import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    startDate: Date,
    endDate: Date,
    approxDays: Number,
    travelStyle: String,
    aiGenerated: { type: Boolean, default: false },
    status: { type: String, enum: ["planned", "completed", "cancelled"], default: "planned" },
    defaultLocale: String,
  },
  { timestamps: true }
);

tripSchema.index({ userId: 1, startDate: 1 });
tripSchema.index({ userId: 1, status: 1 });

export default mongoose.model("Trip", tripSchema);
