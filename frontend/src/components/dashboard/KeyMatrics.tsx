import type { DashboardMetrics } from "@/types/types"
import { MetricsCard } from "./MetricsCard"
import { Package, Truck, CheckCircle, Users, Clock } from "lucide-react"

interface KeyMetricsProps {
  metrics: DashboardMetrics
}

export function KeyMetrics({ metrics }: KeyMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MetricsCard
        title="Total Orders"
        value={metrics.totalOrders}
        description="All orders in the system"
        icon={<Package className="h-4 w-4" />}
        trend={{ value: 12, isPositive: true }}
      />
      <MetricsCard
        title="Pending Orders"
        value={metrics.pendingOrders}
        description="Orders waiting for assignment"
        icon={<Clock className="h-4 w-4" />}
        trend={{ value: 5, isPositive: false }}
      />
      <MetricsCard
        title="Delivered Orders"
        value={metrics.deliveredOrders}
        description="Successfully completed orders"
        icon={<CheckCircle className="h-4 w-4" />}
        trend={{ value: 18, isPositive: true }}
      />
      <MetricsCard
        title="Available Partners"
        value={`${metrics.availablePartners}/${metrics.totalPartners}`}
        description="Partners ready for assignments"
        icon={<Users className="h-4 w-4" />}
        trend={{ value: 2, isPositive: true }}
      />
      <MetricsCard
        title="Assignment Success Rate"
        value={`${metrics.assignmentMetrics.successRate}%`}
        description="Successful assignments"
        icon={<Truck className="h-4 w-4" />}
        trend={{ value: 3, isPositive: true }}
      />
      <MetricsCard
        title="Average Assignment Time"
        value={`${metrics.assignmentMetrics.averageTime} min`}
        description="Time to complete assignments"
        icon={<Clock className="h-4 w-4" />}
        trend={{ value: 8, isPositive: false }}
      />
    </div>
  )
}

