import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    targetType: { type: String, enum: ["task", "packing_item", "trip"], required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    remindAt: { type: Date, required: true },
    channel: [{ type: String, enum: ["email", "push"] }],
    isSent: { type: Boolean, default: false },
    sentAt: Date,
  },
  { timestamps: true }
);

reminderSchema.index({ isSent: 1, remindAt: 1 }, { partialFilterExpression: { isSent: false } });

export default mongoose.model("Reminder", reminderSchema);
