import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Assignment } from "@/types/types"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

interface RecentAssignmentsProps {
  assignments: Assignment[]
}

export function AssignmentHistory({ assignments }: RecentAssignmentsProps) {
  // Sort assignments by timestamp, most recent first
  const sortedAssignments = [...assignments].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )

  return (
    <Card>
    <CardHeader>
      <CardTitle>Recent Assignments</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {sortedAssignments.map((assignment) => {
          const order = assignment.orderId
          const partner = assignment.partnerId
          return (
            <div
              key={assignment?._id}
              className="flex flex-col space-y-2 rounded-lg border p-4 shadow-sm bg-muted/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-base">
                    {order?.orderNumber ?? `Order #${order?.orderNumber}`}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      assignment.status === "success" && "border-green-500 text-green-500",
                      assignment.status === "failed" && "border-red-500 text-red-500"
                    )}
                  >
                    {assignment.status}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(assignment.timestamp), { addSuffix: true })}
                </span>
              </div>
  
              {/* Partner Info */}
              <div className="text-sm">
                <span className="text-muted-foreground">Assigned to: </span>
                <span>{partner?.name ?? `Partner #${partner?._id}`}</span>
              </div>
  
              {/* Customer Info */}
              {order?.customer && (
                <>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Customer: </span>
                    <span className="font-medium">{order.customer.name}</span> &nbsp;
                    <span className="text-muted-foreground">({order.customer.phone})</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Address: {order.customer.address}
                  </div>
                </>
              )}
  
              {/* Order Details */}
              <div className="text-sm">
                <div>
                  <span className="text-muted-foreground">Area: </span>
                  <span>{order?.area}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Scheduled For: </span>
                  <span>{new Date(order?.scheduledFor).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Amount: </span>
                  ₹{order?.totalAmount}
                </div>
              </div>
  
              {/* Items List */}
              {order?.items?.length > 0 && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Items:</span>
                  <ul className="list-disc list-inside pl-2 mt-1">
                    {order.items.map((item: any, index: number) => (
                      <li key={index}>
                        {item.name} - {item.quantity} x ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
  
              {/* Failure Reason */}
              {assignment.reason && (
                <div className="text-sm text-red-500">Reason: {assignment.reason}</div>
              )}
            </div>
          )
        })}
      </div>
    </CardContent>
  </Card>
  
  )
}

