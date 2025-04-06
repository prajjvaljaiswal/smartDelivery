import { Request, Response } from "express";
import Assignment from "../models/assignment.js";
import Partner from "../models/partner.js";
import Order from "../models/order.js";
import AssignmentMetrics from "../models/assignmentMetrics.js";

//TODO: add more assignment metrcis controller
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


export const assignOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
       res.status(404).json({ error: "Order not found" });
    }

    const partner = await Partner.findOne({
      status: "active",
      currentLoad: { $lt: 3 },
    });

    if (!partner) {
       res.status(400).json({ error: "No available partner" });
    }

    if(order){
      order.assignedTo = partner?._id;
      order.status = "assigned";
      await order.save();
    }
    
    const assignment = new Assignment({
      orderId: order?._id,
      partnerId: partner?._id,
      status: "success",
    });
    await assignment.save();
    
    if(partner){
      partner.currentLoad += 1;
      await partner.save();
    }

    //metric update
    const metrics = await AssignmentMetrics.findOne();
    if(metrics){
      metrics.totalAssigned += 1
      
      await metrics.save()
    }

    res.status(200).json({ assignment, updatedOrder: order });
  } catch (error) {
    console.error("Assign Order Error:", error);
    res.status(500).json({ error: "Failed to assign order" });
  }
};

export const showAssignment = async (req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find()
      .populate("orderId")
      .populate("partnerId");
    if (!assignments) throw new Error("Failed");
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Failed to get assign order" });
  }
};
