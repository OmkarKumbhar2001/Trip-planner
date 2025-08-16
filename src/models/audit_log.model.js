import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    collection: { type: String, required: true },
    documentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    before: Object,
    after: Object,
    actorIp: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

auditLogSchema.index({ createdAt: 1 });

export default mongoose.model("AuditLog", auditLogSchema);
