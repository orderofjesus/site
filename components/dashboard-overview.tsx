/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Calendar, GraduationCap, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Doc } from "@/convex/_generated/dataModel";

interface DashboardOverviewProps {
  dashboardData: {
    upcomingEvents: Doc<"events">[];
    activeSchools: number;
    activeMentorships: number;
  };
  onViewChange: (view: "events" | "schools" | "mentorship") => void;
}

export function DashboardOverview({
  dashboardData,
  onViewChange,
}: DashboardOverviewProps) {
  const stats = [
    {
      label: "Upcoming Events",
      value: dashboardData?.upcomingEvents?.length || 0,
      icon: Calendar,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      view: "events" as const,
    },
    {
      label: "Active Schools",
      value: dashboardData?.activeSchools || 0,
      icon: GraduationCap,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      view: "schools" as const,
    },
    {
      label: "Mentorship Programs",
      value: dashboardData?.activeMentorships || 0,
      icon: Users,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      view: "mentorship" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="cursor-pointer transition-all hover:shadow-md"
            onClick={() => onViewChange(stat.view)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-muted-foreground mt-1 text-xs">
                Click to view details
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Events */}
      {dashboardData?.upcomingEvents &&
        dashboardData.upcomingEvents.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Events</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewChange("events")}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.upcomingEvents
                  .slice(0, 3)
                  .map((event: Doc<"events">) => (
                    <Link
                      key={event._id}
                      href={`/events/${event._id}`}
                      className="block rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white">
                            {event.title}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {event.date} • {event.time}
                          </p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-500">
                            {event.location}
                          </p>
                        </div>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          Registered
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <Link href="/events">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Browse Events
              </Button>
            </Link>
            <Link href="/mentorship">
              <Button variant="outline" className="w-full justify-start">
                <GraduationCap className="mr-2 h-4 w-4" />
                Explore Schools
              </Button>
            </Link>
            <Link href="/mentorship/one-on-one">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Join Mentorship
              </Button>
            </Link>
            <Link href="/sermons">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                Watch Sermons
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
