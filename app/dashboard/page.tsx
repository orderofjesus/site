"use client"

import { useAuth } from "@workos-inc/authkit-nextjs/components"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardRegistrationsTable } from "@/components/dashboard-registrations-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { AuthGuard } from "@/components/auth-guard"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

function DashboardContent() {
  const { user } = useAuth()

  const dashboardData = useQuery(
    api.dashboard.getDashboardOverview,
    user?.email ? { userEmail: user.email } : "skip"
  )

  const userRegistrations = useQuery(
    api.eventRegistrations.getUserRegistrations,
    user?.email ? { userEmail: user.email } : "skip"
  )

  // Filter for upcoming events (registered status)
  const upcomingRegistrations = userRegistrations?.filter(
    (reg) => reg.status === "registered"
  ) || []

  return (
    <SidebarProvider>
      <DashboardSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards
                totalEvents={userRegistrations?.length || 0}
                activeSchools={dashboardData?.activeSchools || 0}
                activeMentorships={dashboardData?.activeMentorships || 0}
                upcomingEventsCount={upcomingRegistrations.length}
              />
              <DashboardRegistrationsTable
                registrations={userRegistrations || []}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function Page() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
