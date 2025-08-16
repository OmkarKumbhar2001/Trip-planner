import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
    channel: { type: String, enum: ["email", "push"], required: true },
    message: { type: String, required: true },
    meta: Object,
    sentAt: Date,
    delivered: { type: Boolean, default: false },
    deliveredAt: Date,
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, sentAt: -1 });

export default mongoose.model("Notification", notificationSchema);
