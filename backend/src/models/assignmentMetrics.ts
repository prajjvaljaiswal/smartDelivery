import mongoose from "mongoose";

const AssignmentMetricsSchema = new mongoose.Schema({
    totalAssigned: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 },
    averageTime: { type: Number, default: 0 },
    failureReasons: [
      {
        reason: { type: String, default: ""},
        count: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true })

const AssignmentMetrics = mongoose.model("AssignmentMetrics", AssignmentMetricsSchema)

export default AssignmentMetrics