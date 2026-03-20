"use client";

import { use, useEffect, useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { motion } from "framer-motion";
import Image from "next/image";
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
  AlertCircle,
  CreditCard,
  Smartphone,
  Building2,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { larken } from "@/lib/fonts";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  useQuery,
  useMutation,
  Authenticated,
  Unauthenticated,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@workos-inc/authkit-nextjs/components";

import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { EventDetailSkeleton } from "@/components/event-skeleton";

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
    "adult",
  );
  const [userEmail, setUserEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [expandedPaymentMethod, setExpandedPaymentMethod] = useState<
    string | null
  >(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: 1,
  });

  // Prefill form when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email || "",
        phone: "",
        numberOfPeople: 1,
      });
      // Set userEmail to enable registration query
      setUserEmail(user.email || "");
    }
  }, [user]);

  // Reset number of people if it exceeds the new maximum when switching ticket types
  useEffect(() => {
    const maxPeople = selectedTicketType === "couple" ? 8 : 5;
    if (formData.numberOfPeople > maxPeople) {
      setFormData({
        ...formData,
        numberOfPeople: maxPeople,
      });
    }
  }, [selectedTicketType]);

  // Validate ID format - Convex IDs have a specific format
  let eventId: Id<"events"> | null = null;
  try {
    eventId = id as Id<"events">;
  } catch {
    notFound();
  }

  // Fetch event data from Convex
  const event = useQuery(api.events.get, eventId ? { id: eventId } : "skip");

  // Check if user is registered for this event (only when email is provided)
  const registration = useQuery(
    api.eventRegistrations.getEventRegistration,
    eventId && userEmail ? { eventId, userEmail } : "skip",
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
    return <EventDetailSkeleton />;
  }

  // Not found state
  if (event === null) {
    notFound();
  }

  const isRegistered = registration !== null && registration !== undefined;
  const isFull = eventStats?.isFull ?? false;
  const isPaidEvent = event.pricing.type !== "Free";
  const hasPaymentPending =
    isRegistered && registration?.paymentStatus === "pending";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    if (!formData.phone) {
      toast.error("Phone number required", {
        description: "Please enter a telephone number to continue.",
      });
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
        numberOfPeople: formData.numberOfPeople,
      });

      toast.success("Successfully registered!", {
        description: isPaidEvent
          ? `You're registered for ${formData.numberOfPeople} ${formData.numberOfPeople > 1 ? "people" : "person"}. Please complete payment to confirm your spot.`
          : `You're all set for ${event.title}!`,
      });
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";

      if (errorMessage.includes("already registered")) {
        toast.info("Already registered", {
          description: "You're already registered for this event.",
        });
      } else {
        toast.error("Registration failed", {
          description: errorMessage,
        });
      }
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

      toast.success("Registration cancelled", {
        description: "Your registration has been cancelled successfully.",
      });
      router.push("/events");
    } catch (error) {
      console.error("Cancellation failed:", error);
      toast.error("Cancellation failed", {
        description:
          error instanceof Error
            ? error.message
            : "Unable to cancel registration",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  // Parse pricing details safely
  const pricingDetails = event.pricingDetails as {
    regular?: { price: string; includes: string[] };
    discounted?: { price: string; includes: string[]; note: string };
  } | null;

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
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
                    {isRegistered && (
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

              {/* What to Expect */}
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
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-black dark:text-white" />
                      <span className="text-base text-black/80 dark:text-white/80">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* What to Bring */}
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
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-black dark:text-white" />
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
                      <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-black/60 dark:text-white/60" />
                      <div>
                        <p className="font-medium">{event.date}</p>
                        <p className="text-black/60 dark:text-white/60">
                          {event.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-black/60 dark:text-white/60" />
                      <div>
                        <p className="font-medium">{event.location}</p>
                        <p className="text-black/60 dark:text-white/60">
                          {event.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="mt-0.5 h-4 w-4 shrink-0 text-black/60 dark:text-white/60" />
                      <div>
                        <p className="font-medium">{event.attendees}</p>
                        <p className="text-black/60 dark:text-white/60">
                          {event.pricing.type === "Free"
                            ? "Free event"
                            : "Paid event"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Card */}
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

                  {/* Pricing Options */}
                  <div className="mb-8 space-y-4">
                    {event.pricing.type !== "Free" ? (
                      // Paid event - Adult and Couple pricing
                      <>
                        <div
                          className={`cursor-pointer border-2 p-4 font-medium transition-all ${
                            selectedTicketType === "adult"
                              ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                              : "border-black/20 bg-neutral-50 hover:border-black/40 dark:border-white/20 dark:bg-neutral-900 dark:hover:border-white/40"
                          }`}
                          onClick={() => setSelectedTicketType("adult")}
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <h4 className="font-semibold">Adult</h4>
                            <p className="text-2xl font-bold">
                              {event.pricing.regular}
                            </p>
                          </div>
                          <p
                            className={`text-sm ${selectedTicketType === "adult" ? "text-white/80 dark:text-black/80" : ""}`}
                          >
                            Maximum 5 people
                          </p>
                          <p className="mt-2 text-xs">Base price per person</p>
                        </div>

                        <div
                          className={`cursor-pointer border-2 p-4 font-medium transition-all ${
                            selectedTicketType === "couple"
                              ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                              : "border-black/20 bg-neutral-50 hover:border-black/40 dark:border-white/20 dark:bg-neutral-900 dark:hover:border-white/40"
                          }`}
                          onClick={() => setSelectedTicketType("couple")}
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <h4 className="font-semibold">
                              Married Couple (Discounted)
                            </h4>
                            <p className="text-2xl font-bold">
                              {event.pricing.discounted}
                            </p>
                          </div>
                          <p
                            className={`text-sm ${selectedTicketType === "couple" ? "text-white/80 dark:text-black/80" : ""}`}
                          >
                            Maximum 8 people
                          </p>
                          <p
                            className={`mt-2 text-xs ${selectedTicketType === "couple" ? "text-white/80 dark:text-black/80" : ""}`}
                          >
                            Discounted rate per couple
                          </p>
                        </div>
                      </>
                    ) : (
                      // Free event
                      <div className="py-4 text-center">
                        <p className="mb-2 text-sm tracking-wider text-black/60 uppercase dark:text-white/60">
                          Admission
                        </p>
                        <p className="text-4xl font-bold">
                          {event.pricing.type}
                        </p>
                      </div>
                    )}
                  </div>

                  <Authenticated>
                    {/* Registration/Cancel Button */}
                    {isRegistered ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-2 rounded-md bg-green-50 py-3 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          <CheckCircle2 className="h-5 w-5" />
                          <span className="font-semibold">
                            You&apos;re registered!
                          </span>
                        </div>

                        {/* Number of People Input - After Registration */}
                        <div className="space-y-2">
                          <Label htmlFor="numberOfPeople">
                            Number of People
                          </Label>
                          <div className="relative">
                            <Users className="absolute top-3 left-3 h-4 w-4 text-black/40 dark:text-white/40" />
                            <Input
                              id="numberOfPeople"
                              type="number"
                              min="1"
                              max={selectedTicketType === "couple" ? 8 : 5}
                              value={formData.numberOfPeople}
                              onChange={(e) => {
                                const maxPeople =
                                  selectedTicketType === "couple" ? 8 : 5;
                                setFormData({
                                  ...formData,
                                  numberOfPeople: Math.min(
                                    maxPeople,
                                    Math.max(1, parseInt(e.target.value) || 1),
                                  ),
                                });
                              }}
                              className="pl-10"
                              placeholder="1"
                            />
                          </div>
                          <p className="text-xs text-black/60 dark:text-white/60">
                            Including yourself (max{" "}
                            {selectedTicketType === "couple" ? 8 : 5} people)
                          </p>
                        </div>

                        {/* Estimated Total - After Registration */}
                        {isPaidEvent && (
                          <div className="rounded-md border-2 border-black/10 bg-neutral-50 p-4 dark:border-white/10 dark:bg-neutral-800">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-black/70 dark:text-white/70">
                                Estimated Total
                              </span>
                              <span className="text-2xl font-bold">
                                {(() => {
                                  const priceString =
                                    selectedTicketType === "couple"
                                      ? event.pricing.discounted ||
                                        event.pricing.regular
                                      : event.pricing.regular;
                                  if (!priceString) return "N/A";

                                  const match = priceString.match(/[\d,]+/);
                                  if (!match) return priceString;

                                  const basePrice = parseFloat(
                                    match[0].replace(/,/g, ""),
                                  );
                                  const total =
                                    basePrice * formData.numberOfPeople;

                                  return priceString.replace(
                                    /[\d,]+/,
                                    total.toLocaleString(),
                                  );
                                })()}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                              {formData.numberOfPeople}{" "}
                              {formData.numberOfPeople > 1
                                ? "people"
                                : "person"}{" "}
                              ×{" "}
                              {selectedTicketType === "couple"
                                ? event.pricing.discounted ||
                                  event.pricing.regular
                                : event.pricing.regular}
                            </p>
                          </div>
                        )}

                        {/* Payment Status Indicator */}
                        {hasPaymentPending && (
                          <div className="rounded-md border-2 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-700 dark:text-yellow-400" />
                              <div className="flex-1">
                                <h4 className="mb-1 font-semibold text-yellow-900 dark:text-yellow-200">
                                  Payment Required
                                </h4>
                                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                                  Your registration is pending. Please complete
                                  payment to confirm your spot.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Payment Methods */}
                        {hasPaymentPending && (
                          <div id="payment-section" className="space-y-3">
                            <h4 className="text-sm font-semibold text-black/70 dark:text-white/70">
                              Choose Payment Method
                            </h4>

                            {/* Credit Card */}
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full cursor-pointer justify-start gap-3 rounded-none border-2 border-black/10 py-6 text-left hover:border-black hover:bg-black hover:text-white dark:border-white/10 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                              onClick={() => {
                                toast.info("Credit Card Payment", {
                                  description:
                                    "Credit card payment integration will be available here.",
                                });
                              }}
                            >
                              <CreditCard className="h-5 w-5 shrink-0" />
                              <div className="group flex-1">
                                <div className="font-semibold">Credit Card</div>
                                <div className="text-xs opacity-70">
                                  Pay securely with Visa, Mastercard, or Amex
                                </div>
                              </div>
                            </Button>

                            {/* Mobile Money */}
                            <div className="overflow-hidden rounded-none border-2 border-black/10 dark:border-white/10">
                              <Button
                                variant="outline"
                                size="lg"
                                className={`w-full cursor-pointer justify-start gap-3 rounded-none border-0 py-6 text-left transition-colors ${
                                  expandedPaymentMethod === "mobile"
                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                    : "hover:border-black hover:bg-black hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                                }`}
                                onClick={() => {
                                  setExpandedPaymentMethod(
                                    expandedPaymentMethod === "mobile"
                                      ? null
                                      : "mobile",
                                  );
                                }}
                              >
                                <Smartphone className="h-5 w-5 shrink-0 group-hover:text-white dark:group-hover:text-black" />
                                <div className="group flex-1">
                                  <div className="font-semibold group-hover:text-black dark:group-hover:text-white">
                                    Mobile Money
                                  </div>
                                  <div className="text-xs opacity-70 group-hover:text-black dark:group-hover:text-white">
                                    Pay with MTN, Airtel, or other mobile
                                    wallets
                                  </div>
                                </div>
                              </Button>

                              {expandedPaymentMethod === "mobile" && (
                                <div className="border-t-2 border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-800">
                                  <h5 className="mb-4 font-semibold">
                                    Mobile Money Payment Instructions
                                  </h5>

                                  <div className="mb-4 space-y-3 text-sm">
                                    <div>
                                      <p className="mb-1 font-medium">
                                        MTN Mobile Money:
                                      </p>
                                      <ul className="ml-4 list-disc space-y-1 text-black/70 dark:text-white/70">
                                        <li>Dial *165#</li>
                                        <li>Select option 4 (Send Money)</li>
                                        <li className="flex items-center gap-2">
                                          <span>
                                            Enter:{" "}
                                            <strong className="font-mono text-xs">
                                              0772 123 456
                                            </strong>
                                          </span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 w-5 p-0 hover:bg-black/10 dark:hover:bg-white/10"
                                            onClick={() => {
                                              navigator.clipboard.writeText(
                                                "0772123456",
                                              );
                                              toast.success(
                                                "Copied to clipboard",
                                                {
                                                  description:
                                                    "MTN number copied successfully",
                                                },
                                              );
                                            }}
                                          >
                                            <Copy className="h-3 w-3" />
                                          </Button>
                                        </li>
                                        <li>
                                          Enter amount:{" "}
                                          <strong>
                                            {(() => {
                                              const priceString =
                                                selectedTicketType === "couple"
                                                  ? event.pricing.discounted ||
                                                    event.pricing.regular
                                                  : event.pricing.regular;
                                              if (!priceString) return "N/A";
                                              const match =
                                                priceString.match(/[\d,]+/);
                                              if (!match) return priceString;
                                              const basePrice = parseFloat(
                                                match[0].replace(/,/g, ""),
                                              );
                                              const total =
                                                basePrice *
                                                formData.numberOfPeople;
                                              return `$ ${total.toLocaleString()}`;
                                            })()}
                                          </strong>
                                        </li>
                                        <li>
                                          Reference:{" "}
                                          <strong>Event Registration</strong>
                                        </li>
                                      </ul>
                                    </div>

                                    <div>
                                      <p className="mb-1 font-medium">
                                        Airtel Money:
                                      </p>
                                      <ul className="ml-4 list-disc space-y-1 text-black/70 dark:text-white/70">
                                        <li>Dial *185#</li>
                                        <li>Select option 1 (Send Money)</li>
                                        <li className="flex items-center gap-2">
                                          <span>
                                            Enter:{" "}
                                            <strong className="font-mono text-xs">
                                              0752 123 456
                                            </strong>
                                          </span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 w-5 p-0 hover:bg-black/10 dark:hover:bg-white/10"
                                            onClick={() => {
                                              navigator.clipboard.writeText(
                                                "0752123456",
                                              );
                                              toast.success(
                                                "Copied to clipboard",
                                                {
                                                  description:
                                                    "Airtel number copied successfully",
                                                },
                                              );
                                            }}
                                          >
                                            <Copy className="h-3 w-3" />
                                          </Button>
                                        </li>
                                        <li>Enter amount and confirm</li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="rounded-md bg-yellow-50 p-3 dark:bg-yellow-900/20">
                                    <p className="text-xs text-yellow-800 dark:text-yellow-300">
                                      <strong>Important:</strong> After payment,
                                      please send a screenshot of the
                                      transaction to our WhatsApp:{" "}
                                      <strong>+256 772 123 456</strong>
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Bank Transfer */}
                            <div className="overflow-hidden rounded-none border-2 border-black/10 dark:border-white/10">
                              <Button
                                variant="outline"
                                size="lg"
                                className={`w-full cursor-pointer justify-start gap-3 rounded-none border-0 py-6 text-left transition-colors ${
                                  expandedPaymentMethod === "bank"
                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                    : "hover:border-black hover:bg-black hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                                }`}
                                onClick={() => {
                                  setExpandedPaymentMethod(
                                    expandedPaymentMethod === "bank"
                                      ? null
                                      : "bank",
                                  );
                                }}
                              >
                                <Building2 className="h-5 w-5 shrink-0 group-hover:fill-white dark:group-hover:fill-black" />
                                <div className="group flex-1">
                                  <div className="font-semibold group-hover:text-black dark:group-hover:text-white">
                                    Bank Transfer
                                  </div>
                                  <div className="text-xs opacity-70 group-hover:text-black dark:group-hover:text-white">
                                    Transfer to our bank account (details
                                    provided)
                                  </div>
                                </div>
                              </Button>

                              {expandedPaymentMethod === "bank" && (
                                <div className="border-t-2 border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-800">
                                  <h5 className="mb-4 font-semibold">
                                    Bank Transfer Details
                                  </h5>

                                  <div className="mb-4 space-y-3 text-sm">
                                    <div className="flex justify-between border-b border-black/10 pb-2 dark:border-white/10">
                                      <span className="text-black/70 dark:text-white/70">
                                        Bank Name:
                                      </span>
                                      <span className="font-medium">
                                        Stanbic Bank Uganda
                                      </span>
                                    </div>
                                    <div className="flex justify-between border-b border-black/10 pb-2 dark:border-white/10">
                                      <span className="text-black/70 dark:text-white/70">
                                        Account Name:
                                      </span>
                                      <span className="font-medium">
                                        Victory Church
                                      </span>
                                    </div>
                                    <div className="flex justify-between border-b border-black/10 pb-2 dark:border-white/10">
                                      <span className="text-black/70 dark:text-white/70">
                                        Account Number:
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs font-medium">
                                          9030012345678
                                        </span>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 cursor-pointer p-0 hover:bg-black/10 dark:hover:bg-white/10"
                                          onClick={() => {
                                            navigator.clipboard.writeText(
                                              "9030012345678",
                                            );
                                            toast.success(
                                              "Copied to clipboard",
                                              {
                                                description:
                                                  "Account number copied successfully",
                                              },
                                            );
                                          }}
                                        >
                                          <Copy className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="flex justify-between border-b border-black/10 pb-2 dark:border-white/10">
                                      <span className="text-black/70 dark:text-white/70">
                                        Swift Code:
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs font-medium">
                                          SBICUGKX
                                        </span>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 cursor-pointer p-0 hover:bg-black/10 dark:hover:bg-white/10"
                                          onClick={() => {
                                            navigator.clipboard.writeText(
                                              "SBICUGKX",
                                            );
                                            toast.success(
                                              "Copied to clipboard",
                                              {
                                                description:
                                                  "Swift code copied successfully",
                                              },
                                            );
                                          }}
                                        >
                                          <Copy className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="flex justify-between border-b border-black/10 pb-2 dark:border-white/10">
                                      <span className="text-black/70 dark:text-white/70">
                                        Amount:
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">
                                          {(() => {
                                            const priceString =
                                              selectedTicketType === "couple"
                                                ? event.pricing.discounted ||
                                                  event.pricing.regular
                                                : event.pricing.regular;
                                            if (!priceString) return "N/A";
                                            const match =
                                              priceString.match(/[\d,]+/);
                                            if (!match) return priceString;
                                            const basePrice = parseFloat(
                                              match[0].replace(/,/g, ""),
                                            );
                                            const total =
                                              basePrice *
                                              formData.numberOfPeople;
                                            return `$ ${total.toLocaleString()}`;
                                          })()}
                                        </span>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 p-0 hover:bg-black/10 dark:hover:bg-white/10"
                                          onClick={() => {
                                            const priceString =
                                              selectedTicketType === "couple"
                                                ? event.pricing.discounted ||
                                                  event.pricing.regular
                                                : event.pricing.regular;
                                            if (!priceString) return;
                                            const match =
                                              priceString.match(/[\d,]+/);
                                            if (!match) return;
                                            const basePrice = parseFloat(
                                              match[0].replace(/,/g, ""),
                                            );
                                            const total =
                                              basePrice *
                                              formData.numberOfPeople;
                                            navigator.clipboard.writeText(
                                              total.toString(),
                                            );
                                            toast.success(
                                              "Copied to clipboard",
                                              {
                                                description:
                                                  "Amount copied successfully",
                                              },
                                            );
                                          }}
                                        >
                                          <Copy className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                      <span className="text-black/70 dark:text-white/70">
                                        Reference:
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs font-medium">
                                          {registration?._id ||
                                            "Event Registration"}
                                        </span>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 cursor-pointer p-0 hover:bg-black/10 dark:hover:bg-white/10"
                                          onClick={() => {
                                            navigator.clipboard.writeText(
                                              registration?._id ||
                                                "Event Registration",
                                            );
                                            toast.success(
                                              "Copied to clipboard",
                                              {
                                                description:
                                                  "Reference ID copied successfully",
                                              },
                                            );
                                          }}
                                        >
                                          <Copy className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
                                    <p className="text-xs text-blue-800 dark:text-blue-300">
                                      <strong>Note:</strong> Please use your
                                      registration ID as the payment reference.
                                      Send proof of payment to
                                      finance@victorychurch.org
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-3">
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
                            defaultValue={formData.email}
                            disabled
                            placeholder="Your email address"
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

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isRegistering || isFull || authLoading}
                          className="w-full cursor-pointer rounded-none bg-black py-6 font-semibold text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
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
                  </Authenticated>

                  <Unauthenticated>
                    <Link href={`/auth/login?returnTo=/events/${id}`}>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isRegistering || isFull || authLoading}
                        className="w-full cursor-pointer rounded-none bg-black py-6 font-semibold text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
                      >
                        Login and register
                      </Button>
                    </Link>
                  </Unauthenticated>

                  <p className="mt-4 text-center text-xs text-black/60 dark:text-white/60">
                    {isRegistered
                      ? "You can cancel your registration at any time"
                      : "Secure registration • Instant confirmation"}
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
