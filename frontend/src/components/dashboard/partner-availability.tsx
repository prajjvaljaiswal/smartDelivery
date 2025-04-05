import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Partner } from "@/types/types"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface PartnerAvailabilityProps {
  partners: Partner[]
}

export function PartnerAvailability({ partners }: PartnerAvailabilityProps) {
  // Sort partners by status: available first, then busy, then offline
  const sortedPartners = [...partners].sort((a, b) => {
    const statusOrder = { active: 0, inactive: 1 }
    return statusOrder[a.status] - statusOrder[b.status]
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partner Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedPartners.map((partner) => (
            <div key={partner?._id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback className="bg-primary/10">
                    {partner.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{partner.name}</p>
                  <p className="text-sm text-muted-foreground">{partner.area}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {partner.shift && (
                  <span className="text-xs text-muted-foreground">
                    {partner.shift.start} - {partner.shift.end}
                  </span>
                )}
                <Badge
                  variant="outline"
                  className={cn(
                    "capitalize",
                    partner.status === "active" && "border-green-500 text-green-500",
                    partner.status === "inactive" && "border-amber-500 text-amber-500",
                    // partner.status === "offline" && "border-gray-500 text-gray-500",
                  )}
                >
                  {partner.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

