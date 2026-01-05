"use client";

import { Users, User, Calendar, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

interface DashboardMentorshipsProps {
  userEmail: string | undefined;
}

export function DashboardMentorships({ userEmail }: DashboardMentorshipsProps) {
  const mentorships = useQuery(
    api.dashboard.getUserMentorships,
    userEmail ? { userEmail } : "skip"
  );

  const programInfo: Record<string, { name: string; description: string; icon: any; link: string }> = {
    "one-on-one": {
      name: "One-on-One Mentorship",
      description: "Personalized spiritual guidance and prophetic training with dedicated mentors.",
      icon: User,
      link: "/mentorship/one-on-one",
    },
    "elijah-network": {
      name: "Elijah Network",
      description: "Join a community of prophetic voices for collective growth and accountability.",
      icon: Users,
      link: "/mentorship/elijah-network",
    },
  };

  if (!mentorships || mentorships.length === 0) {
    return (
      <div className="py-12 text-center">
        <Users className="mx-auto h-12 w-12 text-neutral-400" />
        <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
          No mentorship enrollments yet
        </h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          You haven&apos;t joined any mentorship programs. Connect with mentors to accelerate
          your spiritual growth.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link href="/mentorship/one-on-one">
            <Button>One-on-One</Button>
          </Link>
          <Link href="/mentorship/elijah-network">
            <Button variant="outline">Elijah Network</Button>
          </Link>
        </div>
      </div>
    );
  }

  const activeMentorships = mentorships.filter((m: any) => m.status === "active");
  const completedMentorships = mentorships.filter((m: any) => m.status === "completed");
  const onHoldMentorships = mentorships.filter((m: any) => m.status === "on-hold");

  return (
    <div className="space-y-6">
      {/* Active Mentorships */}
      {activeMentorships.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
            Active Mentorships ({activeMentorships.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {activeMentorships.map((enrollment: any) => {
              const info = programInfo[enrollment.programType] || {
                name: enrollment.programType,
                description: "Mentorship program",
                icon: Users,
                link: "/mentorship",
              };
              const IconComponent = info.icon;

              return (
                <Card key={enrollment._id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{info.name}</CardTitle>
                        <Badge className="mt-2" variant="secondary">
                          Active
                        </Badge>
                      </div>
                      <div className="rounded-lg bg-white p-2 dark:bg-neutral-900">
                        <IconComponent className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {info.description}
                    </p>

                    {/* Mentor Info */}
                    {enrollment.mentorEmail && (
                      <div className="mt-4 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-900">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                          <span className="text-sm font-medium text-neutral-900 dark:text-white">
                            Mentor
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                          {enrollment.mentorEmail}
                        </p>
                      </div>
                    )}

                    {/* Start Date */}
                    {enrollment.startDate && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <Calendar className="h-4 w-4" />
                        <span>Started: {enrollment.startDate}</span>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                      <span>
                        Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </span>
                    </div>

                    <Link href={info.link}>
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        <Users className="mr-2 h-4 w-4" />
                        View Program Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* On Hold Mentorships */}
      {onHoldMentorships.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
            On Hold ({onHoldMentorships.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {onHoldMentorships.map((enrollment: any) => {
              const info = programInfo[enrollment.programType] || {
                name: enrollment.programType,
                description: "Mentorship program",
                icon: Users,
                link: "/mentorship",
              };

              return (
                <Card key={enrollment._id} className="opacity-75">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white">
                          {info.name}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                          Paused temporarily
                        </p>
                      </div>
                      <Badge variant="outline">On Hold</Badge>
                    </div>
                    {enrollment.notes && (
                      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                        {enrollment.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Mentorships */}
      {completedMentorships.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
            Completed Mentorships ({completedMentorships.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {completedMentorships.map((enrollment: any) => {
              const info = programInfo[enrollment.programType] || {
                name: enrollment.programType,
                description: "Mentorship program",
                icon: Users,
                link: "/mentorship",
              };

              return (
                <Card key={enrollment._id} className="opacity-75">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-neutral-900 dark:text-white">
                            {info.name}
                          </h3>
                          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                          Completed successfully
                        </p>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Explore More */}
      <Card>
        <CardHeader>
          <CardTitle>Explore More Mentorship Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            Connect with experienced mentors to deepen your spiritual journey and prophetic calling.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <Link href="/mentorship/one-on-one">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                One-on-One Mentorship
              </Button>
            </Link>
            <Link href="/mentorship/elijah-network">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Elijah Network
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
