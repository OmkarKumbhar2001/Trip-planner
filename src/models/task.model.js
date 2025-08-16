import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["booking", "todo", "reminder", "purchase"], required: true },
    title: { type: String, required: true },
    description: String,
    dueAt: Date,
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    priority: String,
    linkedItemId: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

taskSchema.index({ userId: 1, status: 1, dueAt: 1 });
taskSchema.index({ tripId: 1, dueAt: 1 });

export default mongoose.model("Task", taskSchema);
