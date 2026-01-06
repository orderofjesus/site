"use client";

import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthGuard } from "@/components/auth-guard";
import { motion } from "framer-motion";
import * as React from "react";
import { useMutation } from "convex/react";
import { larken, hellix } from "@/lib/fonts";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Calendar,
  School,
  Users,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  AlertCircle,
  Loader2,
  GraduationCap,
  User,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserDashboardSidebar } from "@/components/user-dashboard-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PaymentOptions } from "@/components/payments/payment-options";
import { PaidTicketCard } from "@/components/tickets/paid-ticket-card";
import { Id } from "@/convex/_generated/dataModel";

// Type definitions
interface Event {
  _id: Id<"events">;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  pricing?: {
    type: string;
    regular?: string | null;
    discounted?: string | null;
  };
}

interface Registration {
  _id: Id<"eventRegistrations">;
  eventId: Id<"events">;
  status: "registered" | "cancelled" | "attended" | "no-show";
  registeredAt: number;
  paymentStatus?: "pending" | "completed" | "failed";
  userName?: string;
  userEmail?: string;
  numberOfPeople?: number;
  ticketType?: string;
  event: Event | null;
}

interface DashboardData {
  activeSchools?: number;
  activeMentorships?: number;
}

// Overview Section
function OverviewSection({
  upcomingRegistrations,
  userRegistrations,
  dashboardData,
}: {
  upcomingRegistrations: Registration[];
  userRegistrations: Registration[] | undefined;
  dashboardData: DashboardData | undefined;
}) {
  const stats = [
    {
      label: "My Events",
      value: upcomingRegistrations.length,
      icon: Calendar,
      description: "Events you're registered for",
      color: "text-blue-600 dark:text-blue-400",
      href: "/dashboard?view=events",
    },
    // {
    //   label: "Total Registrations",
    //   value: userRegistrations?.length || 0,
    //   icon: CheckCircle2,
    //   description: "All-time event participation",
    //   color: "text-green-600 dark:text-green-400",
    //   href: "/dashboard?view=events",
    // },
    {
      label: "Active Schools",
      value: dashboardData?.activeSchools || 0,
      icon: School,
      description: "Schools you're enrolled in",
      color: "text-purple-600 dark:text-purple-400",
      href: "/dashboard?view=schools",
    },
    {
      label: "Active Mentorships",
      value: dashboardData?.activeMentorships || 0,
      icon: Users,
      description: "Mentorship programs active",
      color: "text-orange-600 dark:text-orange-400",
      href: "/dashboard?view=mentorships",
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className={`${larken.className} mb-2 text-4xl font-bold`}>
          Overview
        </h2>
        <p className="text-black/70 dark:text-white/70">
          Your spiritual journey at a glance
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group relative h-full overflow-hidden border border-black/10 bg-white p-6 transition-all duration-500 hover:border-black hover:shadow-xl dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg bg-black/5 p-3 dark:bg-white/5">
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <TrendingUp className="h-4 w-4 text-black/40 dark:text-white/40" />
                </div>
                <p className="mb-1 text-xs tracking-[0.2em] text-black/60 uppercase dark:text-white/60">
                  {stat.label}
                </p>
                <p className={`${larken.className} mb-2 text-4xl font-bold`}>
                  {stat.value}
                </p>
                <p className="text-sm text-black/60 dark:text-white/60">
                  {stat.description}
                </p>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}

// Events Section
function EventsSection({
  userRegistrations,
}: {
  userRegistrations: Registration[] | undefined;
}) {
  const getStatusBadge = (status: string, paymentStatus?: string) => {
    if (paymentStatus === "pending") {
      return (
        <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
          Payment Pending
        </Badge>
      );
    }

    switch (status) {
      case "registered":
        return (
          <Badge className="bg-blue-500 text-white hover:bg-blue-600">
            Registered
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "attended":
        return (
          <Badge className="bg-green-500 text-white hover:bg-green-600">
            Attended
          </Badge>
        );
      case "no-show":
        return <Badge variant="secondary">No Show</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <Button variant="outline" className="mb-16 rounded-none" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Overview
          </Link>
        </Button>
        <h2 className={`${larken.className} mb-2 text-4xl font-bold`}>
          My Events
        </h2>
        <p className="text-black/70 dark:text-white/70">
          View and manage your event registrations
        </p>
      </motion.div>

      {!userRegistrations ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white"></div>
        </div>
      ) : userRegistrations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-black/10 bg-white p-12 text-center dark:border-white/10 dark:bg-neutral-900"
        >
          <Calendar className="mx-auto mb-4 h-12 w-12 text-black/20 dark:text-white/20" />
          <p className={`${larken.className} mb-2 text-xl font-bold`}>
            No Event Registrations Yet
          </p>
          <p className="mb-6 text-sm text-black/60 dark:text-white/60">
            Register for an event to see it here
          </p>
          <Link href="/events">
            <Button className="cursor-pointer rounded-none bg-black px-8 py-6 text-base font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
              Browse Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {userRegistrations.map((registration, index: number) => {
            if (!registration.event) return null;

            return (
              <Link
                key={registration._id}
                href={`/dashboard?view=event:${registration.eventId}`}
              >
                <motion.div
                  key={registration._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group overflow-hidden border border-black/10 bg-white transition-all duration-500 hover:border-black hover:shadow-xl dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white"
                >
                  <div className="grid gap-0 md:grid-cols-[auto_1fr_auto]">
                    <div
                      className={`w-2 ${
                        registration.status === "registered"
                          ? registration.paymentStatus === "pending"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                          : registration.status === "attended"
                            ? "bg-green-500"
                            : registration.status === "cancelled"
                              ? "bg-red-500"
                              : "bg-gray-500"
                      }`}
                    ></div>

                    <div className="p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {registration.event.category}
                        </Badge>
                        {getStatusBadge(
                          registration.status,
                          registration.paymentStatus,
                        )}
                      </div>
                      <h3
                        className={`${larken.className} mb-2 text-2xl font-bold`}
                      >
                        {registration.event.title}
                      </h3>
                      <div className="mb-2 flex flex-wrap gap-4 text-sm text-black/60 dark:text-white/60">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {registration.event.date} •{" "}
                            {registration.event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{registration.event.location}</span>
                        </div>
                      </div>
                      <p className="text-xs text-black/50 dark:text-white/50">
                        Registered on{" "}
                        {new Date(registration.registeredAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Schools Section
function SchoolsSection() {
  const { user } = useAuth();
  const schools = useQuery(
    api.dashboard.getUserSchools,
    user?.email ? { userEmail: user.email } : "skip",
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <Button variant="outline" className="mb-16 rounded-none" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Overview
          </Link>
        </Button>
        <h2 className={`${larken.className} mb-2 text-4xl font-bold`}>
          My Schools
        </h2>
        <p className="text-black/70 dark:text-white/70">
          Your enrolled courses and progress
        </p>
      </motion.div>

      {!schools ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white"></div>
        </div>
      ) : schools.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-black/10 bg-white p-12 text-center dark:border-white/10 dark:bg-neutral-900"
        >
          <School className="mx-auto mb-4 h-12 w-12 text-black/20 dark:text-white/20" />
          <p className={`${larken.className} mb-2 text-xl font-bold`}>
            No Schools Enrolled
          </p>
          <p className="mb-6 text-sm text-black/60 dark:text-white/60">
            Enroll in a school to start your learning journey
          </p>
          <Link href="/schools">
            <Button className="cursor-pointer rounded-none bg-black px-8 py-6 text-base font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
              Browse Schools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((school, index) => (
            <motion.div
              key={school._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/dashboard?view=school:${school._id}`}>
                <div className="group h-full cursor-pointer overflow-hidden border border-black/10 bg-white transition-all duration-300 hover:border-black hover:shadow-xl dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white">
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      <Badge variant="outline" className="capitalize">
                        {school.status}
                      </Badge>
                    </div>
                    <h3
                      className={`${larken.className} mb-2 line-clamp-1 text-xl font-bold`}
                    >
                      {school.schoolName}
                    </h3>
                    {typeof school.progress === "number" && (
                      <div className="mt-4">
                        <div className="mb-1 flex justify-between text-xs text-black/60 dark:text-white/60">
                          <span>Progress</span>
                          <span>{school.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
                          <div
                            className="h-full bg-purple-600 transition-all duration-500"
                            style={{ width: `${school.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between border-t border-black/10 p-4 transition-colors group-hover:bg-black/5 dark:border-white/10 dark:group-hover:bg-white/5">
                    <span className="text-sm font-medium">View Details</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// Mentorships Section
function MentorshipsSection() {
  const { user } = useAuth();
  const mentorships = useQuery(
    api.dashboard.getUserMentorships,
    user?.email ? { userEmail: user.email } : "skip",
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <Button variant="outline" className="mb-16 rounded-none" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Overview
          </Link>
        </Button>
        <h2 className={`${larken.className} mb-2 text-4xl font-bold`}>
          My Mentorships
        </h2>
        <p className="text-black/70 dark:text-white/70">
          Your active mentorship programs
        </p>
      </motion.div>

      {!mentorships ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white"></div>
        </div>
      ) : mentorships.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-black/10 bg-white p-12 text-center dark:border-white/10 dark:bg-neutral-900"
        >
          <Users className="mx-auto mb-4 h-12 w-12 text-black/20 dark:text-white/20" />
          <p className={`${larken.className} mb-2 text-xl font-bold`}>
            No Active Mentorships
          </p>
          <p className="mb-6 text-sm text-black/60 dark:text-white/60">
            Join a mentorship program to grow spiritually
          </p>
          <Link href="/mentorship">
            <Button className="cursor-pointer rounded-none bg-black px-8 py-6 text-base font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
              Browse Mentorships
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mentorships.map((mentorship, index) => (
            <motion.div
              key={mentorship._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/dashboard?view=mentorship:${mentorship._id}`}>
                <div className="group h-full cursor-pointer overflow-hidden border border-black/10 bg-white transition-all duration-300 hover:border-black hover:shadow-xl dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white">
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      <Badge variant="outline" className="capitalize">
                        {mentorship.status}
                      </Badge>
                    </div>
                    <h3
                      className={`${larken.className} mb-2 text-xl font-bold capitalize`}
                    >
                      {mentorship.programType.replaceAll("-", " ")}
                    </h3>
                    {mentorship.startDate && (
                      <p className="mb-4 text-sm text-black/60 dark:text-white/60">
                        Started: {mentorship.startDate}
                      </p>
                    )}
                    {mentorship.mentorEmail && (
                      <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                        <User className="h-4 w-4" />
                        <span className="truncate">
                          {mentorship.mentorEmail}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between border-t border-black/10 p-4 transition-colors group-hover:bg-black/5 dark:border-white/10 dark:group-hover:bg-white/5">
                    <span className="text-sm font-medium">View Details</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function EventDetail({
  registration,
  onCancelSuccess,
}: {
  registration: Registration | undefined;
  onCancelSuccess?: () => void;
}) {
  const { user } = useAuth();
  const router = useRouter();

  if (!registration) {
    return (
      <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
        <p className="text-muted-foreground text-sm">Registration not found.</p>
      </div>
    );
  }

  const event = registration.event;
  if (!event) {
    return (
      <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
        <p className="text-muted-foreground text-sm">Event not found.</p>
      </div>
    );
  }

  const canCancel = registration.status === "registered";
  const isPaymentPending = registration.paymentStatus === "pending";
  const isPaidEvent = event.pricing?.type !== "Free";
  const isPaymentComplete = registration.paymentStatus === "completed";

  // Compute total amount for paid events
  const computeAmount = () => {
    if (!event.pricing) return undefined;
    const priceString =
      registration.ticketType === "couple"
        ? event.pricing.discounted || event.pricing.regular
        : event.pricing.regular;
    if (!priceString) return undefined;
    const match = String(priceString).match(/[\d,]+/);
    if (!match) return priceString;
    const base = parseFloat(match[0].replace(/,/g, ""));
    const total = base * (registration.numberOfPeople || 1);
    return `$ ${total.toLocaleString()}`;
  };

  const totalAmount = computeAmount();

  return (
    <div className="space-y-6">
      {/* Event Header */}
      <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {event.category}
          </Badge>
          {isPaymentPending && (
            <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
              Payment Pending
            </Badge>
          )}
          {isPaymentComplete && (
            <Badge className="bg-green-500 text-white hover:bg-green-600">
              Paid
            </Badge>
          )}
          {registration.status === "registered" && !isPaidEvent && (
            <Badge className="bg-blue-500 text-white hover:bg-blue-600">
              Registered
            </Badge>
          )}
        </div>

        <h3 className={`${larken.className} mb-4 text-3xl font-bold`}>
          {event.title}
        </h3>

        <div className="mb-4 flex flex-wrap gap-6 text-sm text-black/70 dark:text-white/70">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="space-y-2 border-t border-black/10 pt-4 dark:border-white/10">
          <div className="flex justify-between text-sm">
            <span className="text-black/60 dark:text-white/60">
              Registration Status
            </span>
            <span className="font-medium capitalize">
              {registration.status}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-black/60 dark:text-white/60">
              Registered On
            </span>
            <span className="font-medium">
              {new Date(registration.registeredAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          {registration.numberOfPeople && (
            <div className="flex justify-between text-sm">
              <span className="text-black/60 dark:text-white/60">
                Number of People
              </span>
              <span className="font-medium">{registration.numberOfPeople}</span>
            </div>
          )}
          {totalAmount && (
            <div className="flex justify-between text-sm">
              <span className="text-black/60 dark:text-white/60">
                Total Amount
              </span>
              <span className="font-medium">{totalAmount}</span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Pending Section */}
      {isPaymentPending && isPaidEvent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-2 border-yellow-500 bg-yellow-50 p-6 dark:bg-yellow-900/20"
        >
          <div className="mb-4 flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-700 dark:text-yellow-400" />
            <div className="flex-1">
              <h4 className="mb-1 font-semibold text-yellow-900 dark:text-yellow-200">
                Payment Required
              </h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                Your registration is pending. Please complete payment to confirm
                your spot.
              </p>
            </div>
          </div>

          <PaymentOptions
            event={event}
            registrationId={registration._id}
            selectedTicketType={registration.ticketType || "adult"}
            numberOfPeople={registration.numberOfPeople || 1}
            sectionId="payment-section"
          />
        </motion.div>
      )}

      {/* Paid Ticket Display */}
      {isPaymentComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <PaidTicketCard
            registration={registration}
            event={event}
            titleClassName={`${larken.className} text-xl`}
          />
        </motion.div>
      )}

      {/* Free Event Confirmation */}
      {!isPaidEvent && registration.status === "registered" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-green-500 bg-green-50 p-6 dark:bg-green-900/20"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-700 dark:text-green-400" />
            <div className="flex-1">
              <h4 className="mb-1 font-semibold text-green-900 dark:text-green-200">
                Registration Confirmed
              </h4>
              <p className="text-sm text-green-800 dark:text-green-300">
                You&apos;re all set! We look forward to seeing you at the event.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {canCancel && (
          <CancelRegistrationButton
            registrationId={registration._id}
            userEmail={user?.email}
            onSuccess={() => {
              router.replace("/dashboard?view=events");
              onCancelSuccess?.();
            }}
          />
        )}
        <Link href={`/events/${registration.eventId}`}>
          <Button variant="outline" className="rounded-none">
            View Event Page
          </Button>
        </Link>
      </div>
    </div>
  );
}

function CancelRegistrationButton({
  registrationId,
  userEmail,
  onSuccess,
}: {
  registrationId: Id<"eventRegistrations">;
  userEmail?: string;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const cancel = useMutation(api.eventRegistrations.cancel);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const confirmCancel = async () => {
    if (!userEmail) {
      toast.error("Error", {
        description: "You must be signed in to cancel registrations",
      });
      return;
    }

    try {
      setLoading(true);
      await cancel({ registrationId, userEmail });
      toast.success("Registration cancelled", {
        description: "Your registration has been cancelled successfully.",
      });
      router.replace("/dashboard");
      setOpen(false);
      onSuccess?.();
    } catch (e) {
      console.error(e);
      const msg =
        e instanceof Error ? e.message : "Failed to cancel registration";
      toast.error("Cancellation failed", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="destructive"
          className="rounded-none"
          disabled={loading}
        >
          Cancel Registration
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Cancel registration?</SheetTitle>
        </SheetHeader>
        <div className="text-muted-foreground px-4 pb-2 text-sm">
          This action cannot be undone. If you cancel now, your spot may be
          given to someone else.
        </div>
        <SheetFooter>
          <div className="flex w-full justify-end gap-2">
            <SheetClose asChild>
              <Button variant="outline">Keep Registration</Button>
            </SheetClose>
            <Button
              variant="destructive"
              onClick={confirmCancel}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Confirm Cancel"
              )}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function SchoolDetail({ id }: { id: string }) {
  const { user } = useAuth();
  const schools = useQuery(
    api.dashboard.getUserSchools,
    user?.email ? { userEmail: user.email } : "skip",
  );
  const school = schools?.find((s) => String(s._id) === String(id));
  if (!school)
    return (
      <div className="text-muted-foreground text-sm">School not found.</div>
    );
  return (
    <div className="space-y-2 border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
      <h3 className={`${larken.className} text-2xl font-bold`}>
        {school.schoolName}
      </h3>
      <p className="text-muted-foreground text-sm">Status: {school.status}</p>
      {typeof school.progress === "number" && (
        <p className="text-muted-foreground text-sm">
          Progress: {school.progress}%
        </p>
      )}
    </div>
  );
}

function MentorshipDetail({ id }: { id: string }) {
  const { user } = useAuth();
  const mentorships = useQuery(
    api.dashboard.getUserMentorships,
    user?.email ? { userEmail: user.email } : "skip",
  );
  const ment = mentorships?.find((m) => String(m._id) === String(id));
  if (!ment)
    return (
      <div className="text-muted-foreground text-sm">Mentorship not found.</div>
    );
  return (
    <div className="space-y-2 border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
      <h3 className={`${larken.className} text-2xl font-bold capitalize`}>
        {ment.programType.replaceAll("-", " ")}
      </h3>
      <p className="text-muted-foreground text-sm">Status: {ment.status}</p>
      {ment.startDate && (
        <p className="text-muted-foreground text-sm">
          Start date: {ment.startDate}
        </p>
      )}
      {ment.mentorEmail && (
        <p className="text-muted-foreground text-sm">
          Mentor: {ment.mentorEmail}
        </p>
      )}
    </div>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view");
  const [, viewId] = React.useMemo(() => {
    if (!currentView) return [null, null] as const;
    const [kind, id] = currentView.split(":");
    return [kind, id] as const;
  }, [currentView]);

  const dashboardData = useQuery(
    api.dashboard.getDashboardOverview,
    user?.email ? { userEmail: user.email } : "skip",
  );

  const userRegistrations = useQuery(
    api.eventRegistrations.getUserRegistrations,
    user?.email ? { userEmail: user.email } : "skip",
  ) as Registration[] | undefined;

  // Only show non-cancelled registrations on the dashboard
  const activeRegistrations =
    userRegistrations?.filter((reg) => reg.status !== "cancelled") || [];

  const upcomingRegistrations = activeRegistrations.filter(
    (reg) => reg.status === "registered",
  );

  return (
    <SidebarProvider>
      <UserDashboardSidebar />
      <SidebarInset className={`${hellix.className}`}>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-black/10 bg-white px-4 dark:border-white/10 dark:bg-[#0a0a0a]">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden text-sm font-medium md:block">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium">
                  Dashboard
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex-1 bg-white dark:bg-[#0a0a0a]">
          <div className="relative overflow-hidden px-6 pt-12 pb-16 lg:px-12">
            <div className="relative z-10 mx-auto max-w-7xl">
              {!currentView && (
                <OverviewSection
                  upcomingRegistrations={upcomingRegistrations}
                  userRegistrations={userRegistrations}
                  dashboardData={dashboardData || undefined}
                />
              )}

              {currentView === "events" && (
                <EventsSection userRegistrations={activeRegistrations} />
              )}

              {currentView?.startsWith("event:") && (
                <EventDetail
                  registration={activeRegistrations?.find(
                    (r) => String(r.eventId) === String(viewId),
                  )}
                  onCancelSuccess={() => {}}
                />
              )}

              {currentView === "schools" && <SchoolsSection />}

              {currentView?.startsWith("school:") && (
                <SchoolDetail id={viewId as string} />
              )}

              {currentView === "mentorships" && <MentorshipsSection />}

              {currentView?.startsWith("mentorship:") && (
                <MentorshipDetail id={viewId as string} />
              )}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function Page() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
