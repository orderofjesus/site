/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Calendar, MapPin, Clock, Users, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";

interface DashboardEventsProps {
  registrations: any;
}

export function DashboardEvents({ registrations }: DashboardEventsProps) {
  const cancelRegistration = useMutation(api.eventRegistrations.cancel);

  const handleCancel = async (registrationId: string, userEmail: string) => {
    const regId = registrationId as Id<"eventRegistrations">;
    try {
      await cancelRegistration({ registrationId: regId, userEmail });
      toast.success("Registration cancelled successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel registration");
    }
  };

  const activeRegistrations = registrations?.filter(
    (reg: any) => reg.status === "registered",
  );
  const pastRegistrations = registrations?.filter(
    (reg: any) => reg.status !== "registered",
  );

  if (!registrations || registrations.length === 0) {
    return (
      <div className="py-12 text-center">
        <Calendar className="mx-auto h-12 w-12 text-neutral-400" />
        <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
          No events yet
        </h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          You haven&apos;t registered for any events. Browse available events to
          get started.
        </p>
        <Link href="/events">
          <Button className="mt-4">Browse Events</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Events */}
      {activeRegistrations && activeRegistrations.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
            Upcoming Events ({activeRegistrations.length})
          </h2>
          <div className="grid gap-4">
            {activeRegistrations.map((registration: any) => (
              <Card key={registration._id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Event Image */}
                    <div className="relative h-48 w-full md:h-auto md:w-48">
                      <Image
                        src={registration.event?.image || "/placeholder.jpg"}
                        alt={registration.event?.title || "Event"}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Link
                            href={`/events/${registration.eventId}`}
                            className="text-xl font-bold text-neutral-900 hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300"
                          >
                            {registration.event?.title}
                          </Link>
                          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                            {registration.event?.subtitle}
                          </p>

                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                              <Calendar className="h-4 w-4" />
                              <span>{registration.event?.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                              <Clock className="h-4 w-4" />
                              <span>{registration.event?.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                              <MapPin className="h-4 w-4" />
                              <span>{registration.event?.location}</span>
                            </div>
                            {registration.numberOfPeople &&
                              registration.numberOfPeople > 1 && (
                                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                  <Users className="h-4 w-4" />
                                  <span>
                                    {registration.numberOfPeople} people
                                  </span>
                                </div>
                              )}
                          </div>

                          <div className="mt-4 flex items-center gap-2">
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-400">
                              Registered
                            </span>
                            {registration.ticketType && (
                              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                                {registration.ticketType}
                              </span>
                            )}
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleCancel(
                              registration._id,
                              registration.userEmail,
                            )
                          }
                          className="text-red-600 hover:text-red-700 dark:text-red-400"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      {pastRegistrations && pastRegistrations.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
            Past Events ({pastRegistrations.length})
          </h2>
          <div className="grid gap-4">
            {pastRegistrations.map((registration: any) => (
              <Card key={registration._id} className="opacity-75">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white">
                        {registration.event?.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {registration.event?.date} •{" "}
                        {registration.event?.location}
                      </p>
                    </div>
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                      {registration.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
