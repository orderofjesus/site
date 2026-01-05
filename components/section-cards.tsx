import { IconCalendar, IconSchool, IconUsers, IconCheck } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SectionCardsProps {
  totalEvents?: number
  activeSchools?: number
  activeMentorships?: number
  upcomingEventsCount?: number
}

export function SectionCards({ 
  totalEvents = 0, 
  activeSchools = 0, 
  activeMentorships = 0,
  upcomingEventsCount = 0 
}: SectionCardsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Upcoming Events</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {upcomingEventsCount}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCalendar className="size-4" />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Events you're registered for
          </div>
          <div className="text-muted-foreground">
            View all your upcoming events
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Registrations</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalEvents}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCheck className="size-4" />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Events registered all-time
          </div>
          <div className="text-muted-foreground">
            Your total event participation
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Schools</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {activeSchools}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconSchool className="size-4" />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Schools you're enrolled in
          </div>
          <div className="text-muted-foreground">Continue your learning journey</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Mentorships</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {activeMentorships}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUsers className="size-4" />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Mentorship programs active
          </div>
          <div className="text-muted-foreground">Your spiritual growth path</div>
        </CardFooter>
      </Card>
    </div>
  )
}
