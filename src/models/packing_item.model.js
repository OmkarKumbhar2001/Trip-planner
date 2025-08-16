import mongoose from "mongoose";

const packingItemSchema = new mongoose.Schema(
  {
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    item: { type: String, required: true },
    category: String,
    isBuyBefore: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "completed", "bought"], default: "pending" },
    quantity: { type: Number, default: 1 },
    priority: String,
    suggestedByAI: { type: Boolean, default: false },
  },
  { timestamps: true }
);

packingItemSchema.index({ tripId: 1 });
packingItemSchema.index({ userId: 1, isBuyBefore: 1, status: 1 });

export default mongoose.model("PackingItem", packingItemSchema);
