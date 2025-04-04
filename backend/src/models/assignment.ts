import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
    {
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
      partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner", required: true },
      timestamp: { type: Date, default: Date.now },
      status: { type: String, enum: ["success", "failed"], required: true },
      reason: { type: String },
    },
    { timestamps: true }
  );

const Assignment = mongoose.model("Assignment", AssignmentSchema)

export default Assignment;