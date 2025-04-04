export type PartnerStatus = "active" | "busy" | "offline"
export type OrderStatus = "pending" | "assigned" | "in_progress" | "completed" | "cancelled"
export type AssignmentStatus = "active" | "completed" | "cancelled"

export interface Partner {
  id: string
  name: string
  email: string
  phone: string
  status: PartnerStatus
  areas: string[] // Array of area IDs
  rating: number
  completedOrders: number
  cancelledOrders: number
  location?: {
    lat: number
    lng: number
  }
  shifts?: {
    day: string
    startTime: string
    endTime: string
  }[]
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerPhone: string
  pickupAddress: string
  deliveryAddress: string
  items: {
    name: string
    quantity: number
    price: number
  }[]
  totalAmount: number
  status: OrderStatus
  areaId: string
  pickupLocation: {
    lat: number
    lng: number
  }
  deliveryLocation: {
    lat: number
    lng: number
  }
  createdAt: string
  updatedAt: string
}

export interface Assignment {
  id: string
  orderId: string
  partnerId: string
  status: AssignmentStatus
  createdAt: string
  updatedAt: string
  orderDetails?: {
    id: string
    pickupAddress: string
    deliveryAddress: string
    status: OrderStatus
  }
  partnerDetails?: {
    id: string
    name: string
    status: PartnerStatus
  }
}

export interface Area {
  id: string
  name: string
  description?: string
  bounds?: {
    northeast: {
      lat: number
      lng: number
    }
    southwest: {
      lat: number
      lng: number
    }
  }
}

