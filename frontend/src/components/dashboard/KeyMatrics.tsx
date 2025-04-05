import type { AssignmentMetrics } from "@/types/types";
import { MetricsCard } from "./MetricsCard";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

interface KeyMetricsProps {
  metrics: AssignmentMetrics;
}

export function KeyMetrics({ metrics }: KeyMetricsProps) {
  const successCount = Math.round(
    (metrics.successRate / 100) * metrics.totalAssigned
  );
  const pendingOrders = metrics.totalAssigned - successCount;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MetricsCard
        title="Total Orders"
        value={metrics.totalAssigned}
        description="All orders in the system"
        icon={<Package className="h-4 w-4" />}
        trend={{ value: 12, isPositive: true }}
      />
      <MetricsCard
        title="Pending Orders"
        value={pendingOrders}
        description="Orders waiting for assignment"
        icon={<Clock className="h-4 w-4" />}
        trend={{ value: 5, isPositive: false }}
      />
      <MetricsCard
        title="Delivered Orders"
        value={successCount}
        description="Successfully completed orders"
        icon={<CheckCircle className="h-4 w-4" />}
        trend={{ value: 18, isPositive: true }}
      />
      <MetricsCard
        title="Assignment Success Rate"
        value={`${metrics.successRate.toFixed(1)}%`}
        description="Successful assignments"
        icon={<Truck className="h-4 w-4" />}
        trend={{ value: 3, isPositive: true }}
      />
      <MetricsCard
        title="Average Assignment Time"
        value={`${metrics.averageTime/60} min`}
        description="Time to complete assignments"
        icon={<Clock className="h-4 w-4" />}
        trend={{ value: 8, isPositive: false }}
      />
    </div>
  );
}
