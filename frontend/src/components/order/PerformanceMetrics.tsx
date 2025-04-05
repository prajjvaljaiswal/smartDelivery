import {
  ArrowUpIcon,
  BarChart3,
  Clock,
  PieChart,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssignmentMetrics } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { useEffect } from "react";
import { apiRequest } from "@/hooks/apiRequest";
import { addPartner, deletePartner } from "@/store/partnerSlice";
const baseURL = import.meta.env.VITE_API_URL

interface PerformanceMetricsProp {
  metrics: AssignmentMetrics;
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProp) {
  const partners = useSelector((store: RootState) => store.partner.partners);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiRequest(
        baseURL+"/api/partner/",
        "GET",
        null
      );
      dispatch(addPartner(data));
    };
    fetchData();

    return () => {
      dispatch(deletePartner());
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Performance Metrics
        </h1>
        <p className="text-muted-foreground">
          Analyze delivery performance and partner metrics
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="partners">Partner Performance</TabsTrigger>
            <TabsTrigger value="assignments">Assignment Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics.totalAssigned}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 flex items-center">
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                      12% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Success Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics.successRate}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 flex items-center">
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                      3% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Delivery Time
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics.averageTime / 60} min
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-500 flex items-center">
                      <ArrowUpIcon className="h-3 w-3 mr-1" />2 min from last
                      month
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Partners
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{partners.length}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 flex items-center">
                      <ArrowUpIcon className="h-3 w-3 mr-1" />4 new this month
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Success Rate</CardTitle>
                  <CardDescription>
                    Monthly success rate for the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full items-center justify-center">
                    <PieChart className="h-40 w-40 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Failure Reasons</CardTitle>
                  <CardDescription>
                    Top reasons for delivery failures
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metrics.failureReasons.map((reason) => (
                      <div key={reason.reason} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">
                            {reason.reason}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {reason.count}
                          </div>
                        </div>
                        <Progress
                          value={
                            (reason.count /
                              metrics.failureReasons.reduce(
                                (acc, r) => acc + r.count,
                                0
                              )) *
                            100
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Partner Performance</CardTitle>
                <CardDescription>
                  Detailed metrics for all delivery partners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Partner</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Cancelled</TableHead>
                      <TableHead>Success Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partners.map((partner) => {
                      const successRate =
                        (partner.metrics.completedOrders /
                          (partner.metrics.completedOrders +
                            partner.metrics.cancelledOrders)) *
                        100;

                      return (
                        <TableRow key={partner._id}>
                          <TableCell>
                            <div className="font-medium">{partner.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {partner.phone}
                            </div>
                          </TableCell>
                          <TableCell>{partner.area}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                partner.status === "active"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {partner.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span>{partner.metrics.rating.toFixed(1)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {partner.metrics.completedOrders}
                          </TableCell>
                          <TableCell>
                            {partner.metrics.cancelledOrders}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={successRate} className="w-20" />
                              <span className="text-xs">
                                {successRate.toFixed(1)}%
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Success Rate</CardTitle>
                  <CardDescription>
                    Percentage of successful assignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="text-5xl font-bold text-green-600">
                      {metrics.successRate.toFixed(1)}%
                    </div>
                    <Progress value={metrics.successRate} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      {metrics.totalAssigned} total assignments
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Assignment Time</CardTitle>
                  <CardDescription>
                    Time from assignment to delivery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-5xl font-bold">
                      {metrics.averageTime / 60}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      minutes on average
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assignment Failures</CardTitle>
                  <CardDescription>
                    Top reasons for assignment failures
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metrics.failureReasons.map((reason) => (
                      <div
                        key={reason.reason}
                        className="flex items-center justify-between"
                      >
                        <div className="text-sm">{reason.reason}</div>
                        <Badge variant="outline">{reason.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
