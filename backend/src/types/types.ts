import { Document } from "mongoose";

export interface DeliveryPartner extends Document {
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  currentLoad: number;
  areas: string[];
  shift: {
    start: string;
    end: string;
  };
  metrics: {
    rating: number;
    completedOrders: number;
    cancelledOrders: number;
  };
}

export interface Order extends Document {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  area: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  status: "pending" | "assigned" | "picked" | "delivered";
  scheduledFor: string; // HH:mm
  assignedTo?: string; // partner ID
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Assignment extends Document {
  orderId: string;
  partnerId: string;
  timestamp: Date;
  status: "success" | "failed";
  reason?: string;
}
export interface AssignmentMetrics extends Document {
  totalAssigned: number;
  successRate: number;
  averageTime: number;
  failureReasons: {
    reason: string;
    count: number;
  }[];
}
