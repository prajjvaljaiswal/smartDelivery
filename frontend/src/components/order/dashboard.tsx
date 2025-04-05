
import {
  CheckCircle2,
  Clock,
  Package,
  Truck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Order } from "@/types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import OrdersTable from "../orders/OrdersTable";

interface OrdersOverviewProps {
  orders: Order[];
}

export function OrdersOverview({ orders }: OrdersOverviewProps) {
 

  const pendingCount = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const assignedCount = orders.filter(
    (order) => order.status === "assigned"
  ).length;
  const deliveredCount = orders.filter(
    (order) => order.status === "delivered"
  ).length;
  const pickedCount = orders.filter(
    (order) => order.status === "picked"
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and track all delivery orders
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting assignment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Assigned Orders
            </CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedCount}</div>
            <p className="text-xs text-muted-foreground">
              In progress with partners
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Delivered Orders
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveredCount}</div>
            <p className="text-xs text-muted-foreground">
              Successfully completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Picked Orders</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pickedCount}</div>
            <p className="text-xs text-muted-foreground">Ready for delivery</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-[500px] grid-cols-3 bg-gray-300">
                <TabsTrigger value="orders" className="flex-1 sm:flex-none">
                  Orders
                </TabsTrigger>
                <TabsTrigger value="status" className="flex-1 sm:flex-none">
                  Status Tracking
                </TabsTrigger>
                {/* <TabsTrigger value="assignments" className="flex-1 sm:flex-none">
                  Assignment History
                </TabsTrigger> */}
                <TabsTrigger value="performance" className="flex-1 sm:flex-none">
                  Performance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>Manage and track all your orders in one place.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OrdersTable orders={orders} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="status" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Status Tracking</CardTitle>
                    <CardDescription>Track and update the status of your orders.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* <StatusTracker orders={filteredOrders} /> */}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* <TabsContent value="assignments" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Assignment History</CardTitle>
                    <CardDescription>View the history of all assignments related to orders.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AssignmentHistory assignments={mockAssignments} />
                  </CardContent>
                </Card>
              </TabsContent> */}

              <TabsContent value="performance" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Analyze key performance indicators for order fulfillment.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* <PerformanceMetrics metrics={mockMetrics} /> */}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

      
    </div>
  );
}
