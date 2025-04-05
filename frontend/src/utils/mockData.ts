import type {  DashboardMetrics, Order } from "@/types/types"



export const mockOrders: Order[] = [
  {
    id: "o1",
    orderNumber: "ORD-001",
    customer: {
      name: "Alice Cooper",
      phone: "555-1111",
      address: "123 Main St, Downtown",
    },
    area: "Downtown",
    items: [
      { name: "Product A", quantity: 2, price: 25.99 },
      { name: "Product B", quantity: 1, price: 34.5 },
    ],
    status: "pending",
    scheduledFor: "2023-06-15T14:00:00Z",
    totalAmount: 86.48,
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-15T10:30:00Z",
    location: "thane",
  },
  {
    id: "o2",
    orderNumber: "ORD-002",
    customer: {
      name: "Bob Marley",
      phone: "555-2222",
      address: "456 Oak Ave, Midtown",
    },
    area: "Midtown",
    items: [{ name: "Product C", quantity: 3, price: 19.99 }],
    status: "assigned",
    assignedTo: "p2",
    scheduledFor: "2023-06-15T15:30:00Z",
    totalAmount: 59.97,
    createdAt: "2023-06-15T11:15:00Z",
    updatedAt: "2023-06-15T11:45:00Z",
    location: "sion",
  },
  {
    id: "o3",
    orderNumber: "ORD-003",
    customer: {
      name: "Charlie Brown",
      phone: "555-3333",
      address: "789 Pine Rd, Uptown",
    },
    area: "Uptown",
    items: [
      { name: "Product D", quantity: 1, price: 99.99 },
      { name: "Product E", quantity: 2, price: 45.0 },
    ],
    status: "delivered",
    assignedTo: "p1",
    scheduledFor: "2023-06-15T16:00:00Z",
    totalAmount: 189.99,
    createdAt: "2023-06-15T12:00:00Z",
    updatedAt: "2023-06-15T13:30:00Z",
    location: "kalyan",
  },
  {
    id: "o4",
    orderNumber: "ORD-004",
    customer: {
      name: "Diana Ross",
      phone: "555-4444",
      address: "101 Elm Blvd, Downtown",
    },
    area: "Downtown",
    items: [{ name: "Product F", quantity: 4, price: 12.5 }],
    status: "delivered",
    assignedTo: "p4",
    scheduledFor: "2023-06-15T13:00:00Z",
    totalAmount: 50.0,
    createdAt: "2023-06-15T09:45:00Z",
    updatedAt: "2023-06-15T13:15:00Z",
    location: "dombevli",
  },
  {
    id: "o5",
    orderNumber: "ORD-005",
    customer: {
      name: "Edward Norton",
      phone: "555-5555",
      address: "202 Cedar St, Midtown",
    },
    area: "Midtown",
    items: [
      { name: "Product G", quantity: 1, price: 149.99 },
      { name: "Product H", quantity: 1, price: 29.99 },
    ],
    status: "pending",
    scheduledFor: "2023-06-15T17:30:00Z",
    totalAmount: 179.98,
    createdAt: "2023-06-15T13:00:00Z",
    updatedAt: "2023-06-15T13:00:00Z",
    location: "thane",
  },
]

export const mockDashboardMetrics: DashboardMetrics = {
  totalOrders: 5,
  pendingOrders: 2,
  assignedOrders: 1,
  deliveredOrders: 1,
  totalPartners: 5,
  availablePartners: 2,
  assignmentMetrics: {
    totalAssigned: 5,
    successRate: 60,
    averageTime: 45, // minutes
    failureReasons: [
      { reason: "Partner unavailable", count: 1 },
      { reason: "Partner rejected", count: 1 },
    ],
  },
}

