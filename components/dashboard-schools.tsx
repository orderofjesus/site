"use client";

import { GraduationCap, BookOpen, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

interface DashboardSchoolsProps {
  userEmail: string | undefined;
}

export function DashboardSchools({ userEmail }: DashboardSchoolsProps) {
  const schools = useQuery(
    api.dashboard.getUserSchools,
    userEmail ? { userEmail } : "skip"
  );

  const schoolInfo: Record<string, { name: string; description: string; link: string }> = {
    "Mystical Masterclass": {
      name: "Mystical Masterclass",
      description: "A 3-month transformative journey into prophetic wisdom and divine encounters.",
      link: "/mentorship",
    },
    "Open Scroll": {
      name: "Open Scroll",
      description: "Advanced biblical hermeneutics and prophetic interpretation.",
      link: "/mentorship",
    },
  };

  if (!schools || schools.length === 0) {
    return (
      <div className="py-12 text-center">
        <GraduationCap className="mx-auto h-12 w-12 text-neutral-400" />
        <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
          No school enrollments yet
        </h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          You haven&apos;t enrolled in any schools. Explore our programs to begin your learning journey.
        </p>
        <Link href="/mentorship">
          <Button className="mt-4">Explore Schools</Button>
        </Link>
      </div>
    );
  }

  const activeSchools = schools.filter((s: any) => s.status === "active");
  const completedSchools = schools.filter((s: any) => s.status === "completed");

  return (
    <div className="space-y-6">
      {/* Active Schools */}
      {activeSchools.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
            Active Schools ({activeSchools.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {activeSchools.map((enrollment: any) => {
              const info = schoolInfo[enrollment.schoolName] || {
                name: enrollment.schoolName,
                description: "Spiritual growth and learning program",
                link: "/mentorship",
              };

              return (
                <Card key={enrollment._id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{info.name}</CardTitle>
                        <Badge className="mt-2" variant="secondary">
                          Active
                        </Badge>
                      </div>
                      <div className="rounded-lg bg-white p-2 dark:bg-neutral-900">
                        <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {info.description}
                    </p>

                    {/* Progress Bar */}
                    {enrollment.progress !== undefined && (
                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-neutral-600 dark:text-neutral-400">
                            Progress
                          </span>
                          <span className="font-semibold text-neutral-900 dark:text-white">
                            {enrollment.progress}%
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                          <div
                            className="h-full rounded-full bg-purple-600 transition-all dark:bg-purple-400"
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                      <span>
                        Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </span>
                    </div>

                    <Link href={info.link}>
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Continue Learning
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Schools */}
      {completedSchools.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
            Completed Schools ({completedSchools.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {completedSchools.map((enrollment: any) => {
              const info = schoolInfo[enrollment.schoolName] || {
                name: enrollment.schoolName,
                description: "Spiritual growth and learning program",
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
                          Completed on {new Date(enrollment.enrolledAt).toLocaleDateString()}
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
          <CardTitle>Explore More Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            Continue your spiritual journey with our other programs and courses.
          </p>
          <Link href="/mentorship">
            <Button variant="outline" className="w-full">
              <TrendingUp className="mr-2 h-4 w-4" />
              Browse All Programs
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
