"use client"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Event {
  _id: string
  title: string
  date: string
  time: string
  location: string
  category: string
}

interface RegistrationWithEvent {
  _id: string
  eventId: string
  status: "registered" | "cancelled" | "attended" | "no-show"
  registeredAt: number
  ticketType?: string
  event: Event | null
}

interface DashboardRegistrationsTableProps {
  registrations: RegistrationWithEvent[]
}

export function DashboardRegistrationsTable({ 
  registrations
}: DashboardRegistrationsTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "registered":
        return <Badge variant="default">Registered</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      case "attended":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Attended</Badge>
      case "no-show":
        return <Badge variant="secondary">No Show</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Card className="mx-4 lg:mx-6">
      <CardHeader>
        <CardTitle>Your Event Registrations</CardTitle>
        <CardDescription>
          View and manage your registered events
        </CardDescription>
      </CardHeader>
      <CardContent>
        {registrations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No event registrations yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Register for an event to see it here
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((registration) => {
                  if (!registration.event) return null

                  return (
                    <TableRow key={registration._id}>
                      <TableCell className="font-medium">{registration.event.title}</TableCell>
                      <TableCell>{registration.event.date}</TableCell>
                      <TableCell>{registration.event.location}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{registration.event.category}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(registration.status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(registration.registeredAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
