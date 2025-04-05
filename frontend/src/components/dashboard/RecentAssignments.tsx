import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Assignment } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface RecentAssignmentsProps {
  assignments: Assignment[];
}

export function RecentAssignments({ assignments }: RecentAssignmentsProps) {
  // Sort assignments by timestamp, most recent first
  const sortedAssignments = [...assignments].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedAssignments.map((assignment) => (
            <div
              key={assignment._id}
              className="flex flex-col space-y-2 rounded-lg border p-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{`Order #${assignment.orderId.orderNumber}`}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      assignment.status === "success" &&
                        "border-green-500 text-green-500",
                      assignment.status === "failed" &&
                        "border-red-500 text-red-500"
                    )}
                  >
                    {assignment.status}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(assignment.timestamp), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Assigned to: </span>
                <span>
                  {assignment.partnerId?.name ||
                    `Partner #${assignment.partnerId.name}`}
                </span>
              </div>
              {assignment?.orderId && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Customer: </span>
                  <span>{assignment.orderId.customer.name}</span>
                </div>
              )}
              {assignment.reason && (
                <div className="text-sm text-red-500">
                  Reason: {assignment.reason}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
