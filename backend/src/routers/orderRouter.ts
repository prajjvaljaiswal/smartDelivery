import express from "express";
import { getOrders, createOrder, updateOrderStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/", getOrders)
orderRouter.post("/assign", createOrder)
orderRouter.put("/:id/status", updateOrderStatus)

export default orderRouter;