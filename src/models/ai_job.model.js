import mongoose from "mongoose";

const aiJobSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
    prompt: String,
    responseSummary: String,
    fullResponse: Object,
    usage: {
      tokens: Number,
      cost: Number,
    },
    status: { type: String, enum: ["success", "failed", "retried"], default: "success" },
  },
  { timestamps: true }
);

aiJobSchema.index({ userId: 1, tripId: 1, createdAt: -1 });

export default mongoose.model("AIJob", aiJobSchema);
