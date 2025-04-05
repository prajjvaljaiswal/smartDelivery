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
  id: string
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
  id?: string
  orderId: Order
  partnerId: Partner
  timestamp: string
  status: String
  reason?: string
  order?: Order
  partner?: Partner
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



export interface DashboardMetrics {
  totalOrders: number
  pendingOrders: number
  assignedOrders: number
  deliveredOrders: number
  totalPartners: number
  availablePartners: number
  assignmentMetrics: AssignmentMetrics
}
