import express, { Request, Response } from "express";
import {
  getOrders,
  createOrder,
  updateOrderStatus
} from "../controllers/orderController.js";
import Order from "../models/order.js";

const orderRouter = express.Router();

orderRouter.get("/", getOrders);
orderRouter.post("/assign", createOrder);
orderRouter.put("/:id/status", updateOrderStatus)

orderRouter.get("/count", async (req: Request, res: Response) => {
  // /api/orders/heatmap.ts
  try {
    const ordersByArea = await Order.aggregate([
        { $group: { _id: "$area", count: { $sum: 1 } } },
      ]);
      res.status(200).json(ordersByArea);
  } catch (error) {
    res.status(500).json("aggregate error")
  }
});

export default orderRouter;
