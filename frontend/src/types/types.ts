export type PartnerStatus = "active" | "inactive" 
export type OrderStatus = "pending" | "assigned" | "delivered" | "picked"
export type AssignmentStatus = "active" | "failed" 

export interface Partner {
  _id?: string
  name: string
  email: string
  phone: string
  status: PartnerStatus
  area: string
  rating?: number
  completedOrders?: number
  cancelledOrders?: number
  location?: string
  shift?: {
    start: string
    end: string
  }
  createdAt?: string
  updatedAt?: string
}

export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface Customer {
  name: string
  phone: string
  address: string
}

export interface Order {
  _id?: string
  orderNumber: string
  customer: Customer
  area: string
  items: OrderItem[]
  status: OrderStatus
  scheduledFor: string
  assignedTo?: string
  totalAmount: number
  createdAt: string
  updatedAt: string
  location?: string
}
export interface Assignment {
  _id?: string
  orderId: Order
  partnerId: Partner
  timestamp: string
  status: String
  reason?: string
}

export interface AssignmentMetrics {
  totalAssigned: number
  successRate: number
  averageTime: number
  failureReasons: {
    reason: string
    count: number
  }[]
}

