import { Request, Response } from "express";
import Assignment from "../models/assignment.js";
import Partner from "../models/partner.js";
import Order from "../models/order.js";
import AssignmentMetrics from "../models/assignmentMetrics.js";

// Get assignment metrics
export const getAssignmentMetrics = async (req: Request, res: Response) => {
  try {
    const metrics = await AssignmentMetrics.findOne();

    if (!metrics) {
      res.status(200).json({
        totalAssigned: 0,
        successRate: 0,
        averageTime: 0,
        failureReasons: [],
      });
    }

    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignment metrics" });
  }
};

// Assign an order
export const assignOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, partnerId } = req.body;

    // Check if the partner exists and is available
    const partner = await Partner.findById(partnerId);
    if (!partner || partner.currentLoad >= 3) {
      res.status(400).json({ error: "Partner not available" });
    }

    // Update the order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { assignedTo: partnerId, status: "assigned" },
      { new: true }
    );

    const assignment = new Assignment({
      orderId,
      partnerId,
      status: "success",
    });
    await assignment.save();

    // Increase partner load
    await Partner.findByIdAndUpdate(partnerId, { $inc: { currentLoad: 1 } });

    res.status(200).json({ assignment, updatedOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to assign order" });
  }
};
