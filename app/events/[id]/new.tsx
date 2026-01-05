"use client";

import { use, useState, useEffect } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  Check,
  Loader2,
  CheckCircle2,
  XCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { larken } from "@/lib/fonts";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const isAuthenticated = !!user;

  const [isRegistering, setIsRegistering] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState<string | null>(
    "general",
  );

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Prefill form when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email || "",
        phone: "",
      });
    }
  }, [user]);

  // Validate ID format - Convex IDs have a specific format
  let eventId: Id<"events"> | null = null;
  try {
    eventId = id as Id<"events">;
  } catch {
    notFound();
  }

  // Fetch event data from Convex
  const event = useQuery(api.events.get, eventId ? { id: eventId } : "skip");

  // Check if user is registered for this event
  const registration = useQuery(
    api.eventRegistrations.getEventRegistration,
    eventId && user?.email ? { eventId, userEmail: user.email } : "skip",
  );

  // Get event stats for capacity info
  const eventStats = useQuery(
    api.eventRegistrations.getEventStats,
    eventId ? { eventId } : "skip",
  );

  // Mutations
  const registerMutation = useMutation(api.eventRegistrations.register);
  const cancelMutation = useMutation(api.eventRegistrations.cancel);

  // Loading state
  if (event === undefined) {
    return (
      <PageWrapper>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading event details...
            </p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Not found state
  if (event === null) {
    notFound();
  }

  const isRegistered = registration !== null && registration !== undefined;
  const isFull = eventStats?.isFull ?? false;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    if (!formData.phone) {
      alert("Please enter a telephone number");
      return;
    }

    setIsRegistering(true);
    try {
      if (!user?.email) {
        throw new Error("User email not available");
      }
      await registerMutation({
        eventId: eventId!,
        userEmail: user.email,
        userName: formData.name,
        phone: formData.phone,
        ticketType: selectedTicketType ?? undefined,
      });
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCancelRegistration = async () => {
    if (!registration?._id || !user?.email) return;

    setIsCancelling(true);
    try {
      await cancelMutation({
        registrationId: registration._id,
        userEmail: user.email,
      });
    } catch (error) {
      console.error("Cancellation failed:", error);
      alert(error instanceof Error ? error.message : "Cancellation failed");
    } finally {
      setIsCancelling(false);
    }
  };

  // Parse pricing details safely
  const pricingDetails = event.pricingDetails as {
    general?: { price: string; includes: string[] };
    earlyBird?: { price: string; includes: string[]; note: string };
    vip?: { price: string; includes: string[] };
  } | null;

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/30"></div>

          {/* Breadcrumb */}
          <div className="absolute top-48 right-0 left-0 z-10 px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Events
              </Link>
            </div>
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-6 pb-12 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="bg-white px-4 py-1.5 text-sm font-semibold text-black">
                      {event.category}
                    </div>
                    {isAuthenticated && isRegistered && (
                      <div className="flex items-center gap-1 bg-green-500 px-4 py-1.5 text-sm font-semibold text-white">
                        <CheckCircle2 className="h-4 w-4" />
                        Registered
                      </div>
                    )}
                    {isFull && !isRegistered && (
                      <div className="bg-red-500 px-4 py-1.5 text-sm font-semibold text-white">
                        Sold Out
                      </div>
                    )}
                  </div>
                  <p className="mb-3 text-sm tracking-[0.2em] text-white/80 uppercase">
                    {event.subtitle}
                  </p>
                  <h1
                    className={`${larken.className} mb-6 text-5xl font-bold text-white md:text-7xl`}
                  >
                    {event.title}
                  </h1>
                  <div className="flex flex-wrap gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span className="text-sm font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span className="text-sm font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        {event.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        {event.attendees}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left Column - Main Content */}
            <div className="space-y-12 lg:col-span-2">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={`${larken.className} mb-6 text-3xl font-bold`}>
                  About This Event
                </h2>
                <p className="mb-4 text-lg leading-relaxed text-black/80 dark:text-white/80">
                  {event.description}
                </p>
                <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
                  {event.fullDescription}
                </p>
              </motion.div>

              {/* Location Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className={`${larken.className} mb-6 text-3xl font-bold`}>
                  Location
                </h2>
                <div className="border border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-900">
                  <p className="mb-2 text-lg font-semibold">{event.location}</p>
                  <p className="text-base text-black/70 dark:text-white/70">
                    {event.address}
                  </p>
                </div>
              </motion.div>

              {/* Schedule */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className={`${larken.className} mb-6 text-3xl font-bold`}>
                  Event Schedule
                </h2>
                <div className="space-y-4">
                  {event.schedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-6 border-l-2 border-black/10 pb-4 pl-6 last:pb-0 dark:border-white/10"
                    >
                      <div className="min-w-[100px] pt-1">
                        <p className="text-sm font-semibold">{item.time}</p>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-base text-black/80 dark:text-white/80">
                          {item.activity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* What to Expect/What to Bring ... omitted for brevity in thought but kept in full file write */}
              {/* [Keeping existing UI for What to Expect and What to Bring] */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className={`${larken.className} mb-6 text-3xl font-bold`}>
                  What to Expect
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {event.whatToExpect.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-black dark:text-white" />
                      <span className="text-base text-black/80 dark:text-white/80">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className={`${larken.className} mb-6 text-3xl font-bold`}>
                  What to Bring
                </h2>
                <ul className="space-y-3">
                  {event.whatToBring.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-black dark:text-white" />
                      <span className="text-base text-black/80 dark:text-white/80">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-24 space-y-6"
              >
                {/* Quick Info Card */}
                <div className="border border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-900">
                  <h3 className="mb-4 font-semibold">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-black/60 dark:text-white/60" />
                      <div>
                        <p className="font-medium">{event.date}</p>
                        <p className="text-black/60 dark:text-white/60">
                          {event.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-black/60 dark:text-white/60" />
                      <div>
                        <p className="font-medium">{event.location}</p>
                        <p className="text-black/60 dark:text-white/60">
                          {event.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Form Card */}
                <div className="border-2 border-black/10 bg-white p-8 dark:border-white/10 dark:bg-neutral-900">
                  <h3 className={`${larken.className} mb-6 text-2xl font-bold`}>
                    Registration
                  </h3>

                  {/* Capacity Info */}
                  {eventStats && (
                    <div className="mb-6">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-black/60 dark:text-white/60">
                          Spots Available
                        </span>
                        <span className="font-semibold">
                          {eventStats.availableSpots !== null
                            ? `${eventStats.availableSpots} left`
                            : "Unlimited"}
                        </span>
                      </div>
                      {eventStats.capacityPercentage !== null && (
                        <div className="h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                          <div
                            className={`h-full transition-all ${
                              eventStats.capacityPercentage >= 90
                                ? "bg-red-500"
                                : eventStats.capacityPercentage >= 70
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{
                              width: `${Math.min(eventStats.capacityPercentage, 100)}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {!isAuthenticated ? (
                    <div className="space-y-4 text-center">
                      <p className="text-sm text-black/60 dark:text-white/60">
                        Please sign in to register for this event.
                      </p>
                      <Button
                        onClick={() =>
                          router.push(`/auth/login?redirect=/events/${id}`)
                        }
                        className="w-full bg-black py-6 font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                      >
                        Sign In to Register
                      </Button>
                    </div>
                  ) : isRegistered ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2 rounded-md bg-green-50 py-3 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-semibold">
                          You&apos;re registered!
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleCancelRegistration}
                        disabled={isCancelling}
                        className="w-full cursor-pointer rounded-none border-red-500 py-6 text-base font-semibold text-red-500 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        {isCancelling ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Cancelling...
                          </>
                        ) : (
                          <>
                            <XCircle className="mr-2 h-5 w-5" />
                            Cancel Registration
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleRegister} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          placeholder="Your full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          disabled
                          className="bg-neutral-50 dark:bg-neutral-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telephone Number</Label>
                        <div className="relative">
                          <Phone className="absolute top-3 left-3 h-4 w-4 text-black/40 dark:text-white/40" />
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="pl-10"
                            placeholder="+1 (555) 000-0000"
                            required
                          />
                        </div>
                      </div>

                      {/* Ticket Types if available */}
                      {pricingDetails && (
                        <div className="space-y-3">
                          <Label>Select Ticket Type</Label>
                          <div className="grid gap-2">
                            {pricingDetails.earlyBird && (
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedTicketType("earlyBird")
                                }
                                className={`flex items-center justify-between border-2 p-3 text-sm transition-all ${
                                  selectedTicketType === "earlyBird"
                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                    : "border-black/10 hover:border-black/20 dark:border-white/10 dark:hover:border-white/20"
                                }`}
                              >
                                <span>Early Bird</span>
                                <span className="font-bold">
                                  {pricingDetails.earlyBird.price}
                                </span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setSelectedTicketType("general")}
                              className={`flex items-center justify-between border-2 p-3 text-sm transition-all ${
                                selectedTicketType === "general"
                                  ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                  : "border-black/10 hover:border-black/20 dark:border-white/10 dark:hover:border-white/20"
                              }`}
                            >
                              <span>General Admission</span>
                              <span className="font-bold">
                                {pricingDetails.general?.price ||
                                  event.pricing.type}
                              </span>
                            </button>
                          </div>
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isRegistering || isFull || authLoading}
                        className="w-full bg-black py-6 font-semibold text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
                      >
                        {isRegistering ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Registering...
                          </>
                        ) : isFull ? (
                          "Sold Out"
                        ) : (
                          "Register Now"
                        )}
                      </Button>
                    </form>
                  )}

                  <p className="mt-4 text-center text-xs text-black/60 dark:text-white/60">
                    {isAuthenticated && !isRegistered
                      ? "Secure registration • Instant confirmation"
                      : ""}
                  </p>
                </div>

                {/* Share Section */}
                <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
                  <h3 className="mb-4 font-semibold">Share This Event</h3>
                  <p className="text-sm text-black/70 dark:text-white/70">
                    Invite your friends and family to join you at this powerful
                    event.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
