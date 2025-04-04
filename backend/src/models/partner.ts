import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    currentLoad: {
      type: Number,
      default: 0,
      max: 3,
    },
    area: {
      type: String,
      required: true,
    },
    shift: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
    metrics: {
      rating: { type: Number, default: 5 },
      completedOrders: { type: Number, default: 0 },
      cancelledOrders: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const Partner = mongoose.model("Partner", partnerSchema);
export default Partner;