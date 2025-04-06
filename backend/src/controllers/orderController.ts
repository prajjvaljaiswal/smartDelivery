import { Request, Response } from "express";
import Order from "../models/order.js";
import Partner from "../models/partner.js";
import AssignmentMetrics from "../models/assignmentMetrics.js";

// TODO: input validation
// Get all orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    if (orders.length === 0)
      res.status(404).json({ error: "Orders not found" });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};


// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};


export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const newStatus = req.body.status;

    const order = await Order.findById(orderId);

    if (!order) {
      res.status(404).json({ error: "Order not found" });
    }
    if(!["pending", "assigned", "picked", "delivered"].includes(newStatus))
        res.status(400).json({ error: "Invalid status value" });

    const previousStatus = order?.status;
    const partnerId = order?.assignedTo;
    const metrics = await AssignmentMetrics.findOne();
    if (partnerId) {
      const partner = await Partner.findById(partnerId);
      if (partner) {

        if (previousStatus === "assigned" && newStatus === "delivered") {
          order.status = newStatus
          partner.currentLoad = Math.max(partner.currentLoad - 1, 0);
          if (partner.metrics) {
            partner.metrics.completedOrders += 1;
          }
          if(metrics){
            metrics.successRate  += 1
          }
        }

        if (previousStatus === "assigned" && newStatus === "cancelled") {
          order.status = newStatus
          partner.currentLoad = Math.max(partner.currentLoad - 1, 0);
          if (partner.metrics)
            partner.metrics.cancelledOrders += 1;
          if(metrics){
            const count = metrics.failureReasons.length
            metrics.failureReasons.push({reason: req.body?.reason || "Failed", count: count+1})
          }
        }
        metrics?.save()
        await partner.save();
      }
    }
    const updatedOrder = await order?.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
}


