import { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  CheckCircle2,
  Clock,
  Package,
  Search,
  Truck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { Order } from "@/types/types";
import { addAssignment, deleteAssignment } from "@/store/assignmentSlice";
import { apiRequest } from "@/hooks/apiRequest";

interface StatusTrackingProp {
  orders: Order[];
}

export function StatusTracking({ orders }: StatusTrackingProp) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const assignments = useSelector(
    (store: RootState) => store.assignment.assignments
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAssignment = async () => {
      const data = await apiRequest(
        "http://localhost:3000/api/assignment",
        "GET",
        null
      );
      dispatch(addAssignment(data));
    };
    // if(!assignments)
    fetchAssignment();

    return () => {
      dispatch(deleteAssignment());
    };
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === "all" || order.status === selectedTab;

    return matchesSearch && matchesTab;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "assigned":
        return <Truck className="h-5 w-5 text-blue-600" />;
      case "delivered":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "picked":
        return <Package className="h-5 w-5 text-purple-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "assigned":
        return "bg-blue-100 border-blue-300 text-blue-800";
      case "delivered":
        return "bg-green-100 border-green-300 text-green-800";
      case "picked":
        return "bg-purple-100 border-purple-300 text-purple-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const getAssignmentForOrder = (orderId: string) => {
    return assignments.find((assignment) => assignment.orderId._id === orderId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Status Tracking</h1>
        <p className="text-muted-foreground">
          Monitor order status and delivery progress
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search order number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            type="search"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={selectedTab}
        onValueChange={setSelectedTab}
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="assigned">Assigned</TabsTrigger>
          <TabsTrigger value="picked">Picked</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        <TabsContent value={selectedTab} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOrders.map((order) => {
              const assignment = getAssignmentForOrder(order._id);

              return (
                <Card key={order._id} className="overflow-hidden">
                  <CardHeader
                    className={`flex flex-row items-center gap-2 ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    <div>
                      <CardTitle className="text-lg">
                        {order.orderNumber}
                      </CardTitle>
                      <CardDescription className="text-xs font-medium text-current opacity-80">
                        {new Date(order.scheduledFor).toLocaleString()}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold">Customer</h4>
                        <p className="text-sm">{order.customer.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.customer.address}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.customer.phone}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Order Details</h4>
                        <p className="text-sm">
                          {order.items.length} items · $
                          {order.totalAmount.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Area: {order.area}
                        </p>
                      </div>

                      {assignment && (
                        <div>
                          <h4 className="text-sm font-semibold">
                            Assigned Partner
                          </h4>
                          <p className="text-sm">{assignment.partnerId.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {assignment.partnerId.phone}
                          </p>
                          <div className="mt-1">
                            <Badge
                              variant="outline"
                              className={
                                assignment.partnerId.status === "active"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {assignment.partnerId.status}
                            </Badge>
                          </div>
                        </div>
                      )}

                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                          <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
