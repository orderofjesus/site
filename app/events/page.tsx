"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { larken } from "@/lib/fonts";
import Link from "next/link";
import { useQuery } from "convex/react";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { api } from "@/convex/_generated/api";
import { EventCardSkeleton } from "@/components/event-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentImage } from "@/components/content-image";

export default function EventsPage() {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  // Fetch events from Convex
  const events = useQuery(api.events.list);

  // Fetch user's registrations to show registration status
  const myRegistrations = useQuery(
    api.eventRegistrations.getActiveRegistrations,
    {
      userEmail: user?.email as string,
    },
  );

  // Create a Set of registered event IDs for quick lookup
  const registeredEventIds = new Set(
    myRegistrations?.map((r) => r.eventId) || [],
  );

  const isLoading = !events;
  const [upcomingEvent, ...otherEvents] = events || [];

  return (
    <PageWrapper>
      {/* Hero Section with Distinctive Visual */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 lg:px-8">
        {/* Decorative Background Element */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16 mb-24 text-center"
          >
            <p className="mb-4 text-xs tracking-[0.4em] text-black/60 uppercase dark:text-white/60">
              Explore
            </p>
            <h1
              className={`${larken.className} mb-6 text-5xl font-bold md:text-7xl`}
            >
              Events
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-black/70 dark:text-white/70">
              Join us for powerful gatherings where heaven touches earth. From
              healing services to prophetic conferences, each event is designed
              to encounter God&apos;s presence.
            </p>
          </motion.div>

          {/* Featured Upcoming Event */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-24"
          >
            <h2 className={`${larken.className} mb-8 text-3xl font-bold`}>
              Latest Event
            </h2>

            {isLoading ? (
              <div className="border-2 border-black/10 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900">
                <div className="grid gap-0 lg:grid-cols-2">
                  <Skeleton className="h-80 lg:h-auto" />
                  <div className="flex flex-col justify-center bg-white p-8 lg:p-12 dark:bg-neutral-900">
                    <Skeleton className="mb-2 h-3 w-32" />
                    <Skeleton className="mb-4 h-12 w-full" />
                    <Skeleton className="mb-6 h-6 w-full" />
                    <Skeleton className="mb-6 h-6 w-5/6" />

                    <div className="mb-8 space-y-3">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-56" />
                      <Skeleton className="h-4 w-40" />
                    </div>

                    <Skeleton className="h-12 w-64" />
                  </div>
                </div>
              </div>
            ) : upcomingEvent ? (
              <div className="group relative overflow-hidden border-2 border-black/10 bg-neutral-50 transition-all duration-500 hover:border-black hover:shadow-2xl dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white">
                <div className="grid gap-0 lg:grid-cols-2">
                  {/* Image Section */}
                  <div className="relative h-80 overflow-hidden lg:h-auto">
                    <img
                      src={upcomingEvent.image}
                      alt={upcomingEvent.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent lg:bg-linear-to-r"></div>
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                      <div className="bg-white px-4 py-2 text-sm font-semibold text-black">
                        {upcomingEvent.category}
                      </div>
                      {isAuthenticated &&
                        registeredEventIds.has(upcomingEvent._id) && (
                          <div className="flex items-center gap-1 bg-green-500 px-4 py-2 text-sm font-semibold text-white">
                            <CheckCircle2 className="h-4 w-4" />
                            Registered
                          </div>
                        )}
                    </div>
                    <div className="absolute right-6 bottom-6 left-6 lg:hidden">
                      <p className="text-sm font-semibold text-white">
                        {upcomingEvent.date}
                      </p>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col justify-center bg-white p-8 lg:p-12 dark:bg-neutral-900">
                    <p className="mb-2 text-xs tracking-[0.3em] text-black/60 uppercase dark:text-white/60">
                      {upcomingEvent.subtitle}
                    </p>
                    <h3
                      className={`${larken.className} mb-4 text-4xl font-bold lg:text-5xl`}
                    >
                      {upcomingEvent.title}
                    </h3>
                    <p className="mb-6 text-lg text-black/70 dark:text-white/70">
                      {upcomingEvent.description}
                    </p>

                    <div className="mb-8 space-y-3">
                      <div className="flex items-center gap-3 text-sm text-black/70 dark:text-white/70">
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>
                          {upcomingEvent.date} • {upcomingEvent.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-black/70 dark:text-white/70">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span>{upcomingEvent.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-black/70 dark:text-white/70">
                        <Users className="h-4 w-4 shrink-0" />
                        <span>{upcomingEvent.attendees}</span>
                      </div>
                    </div>

                    <Link
                      href={`/events/${upcomingEvent._id}`}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        size="lg"
                        className="w-full cursor-pointer rounded-none bg-black px-8 py-6 text-base font-semibold text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
                      >
                        {isAuthenticated &&
                        registeredEventIds.has(upcomingEvent._id)
                          ? "View Registration"
                          : "Learn More & Register"}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </motion.div>

          {/* All Events Grid */}
          <div className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10"></div>
              <h2 className={`${larken.className} text-3xl font-bold`}>
                All Events
              </h2>
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <>
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                </>
              ) : (
                otherEvents.map((event, index) => (
                  <motion.article
                    key={event._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="group overflow-hidden border border-black/10 bg-neutral-50 transition-all duration-500 hover:border-black hover:shadow-xl dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white"
                  >
                    <div className="relative h-56 overflow-hidden">
                      {/* <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      /> */}
                      <ContentImage
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover group-hover:scale-102"
                        width={403}
                        height={256}
                        priority
                      />
                      <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40"></div>
                      <div className="absolute top-4 right-4 left-4 flex items-center justify-between gap-2">
                        <div className="bg-white px-3 py-1 text-xs font-semibold text-black">
                          {event.category}
                        </div>
                        {isAuthenticated &&
                          registeredEventIds.has(event._id) && (
                            <div className="flex items-center gap-1 bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                              <CheckCircle2 className="h-3 w-3" />
                              Registered
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="bg-white p-6 dark:bg-neutral-900">
                      <p className="mb-2 text-xs tracking-[0.2em] text-black/60 uppercase dark:text-white/60">
                        {event.subtitle}
                      </p>
                      <h3
                        className={`${larken.className} mb-3 text-2xl font-bold`}
                      >
                        {event.title}
                      </h3>
                      <p className="mb-4 line-clamp-2 text-sm text-black/70 dark:text-white/70">
                        {event.description}
                      </p>

                      <div className="mb-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <Link href={`/events/${event._id}`} className="block">
                        <Button className="group/btn w-full cursor-pointer rounded-none bg-black font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                          {isAuthenticated && registeredEventIds.has(event._id)
                            ? "View Registration"
                            : "Learn More"}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </motion.article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
