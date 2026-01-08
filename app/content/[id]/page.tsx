"use client";

import { use, useState, useEffect } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { ContentDetailSkeleton } from "@/components/content-detail-skeleton";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  BookOpen,
  Star,
  Crown,
  Clock,
  CheckCircle,
  Lock,
  ShoppingCart,
  Download,
  Share2,
  CreditCard,
  Smartphone,
  Building2,
  Copy,
  DollarSign,
  Users,
  Target,
  Award,
  Lightbulb,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { larken } from "@/lib/fonts";
import Link from "next/link";
import { ContentImage } from "@/components/content-image";
import { notFound, useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Helper functions
function getSchoolName(school: string): string {
  switch (school) {
    case "mystical-masterclass":
      return "Mystical Masterclass";
    case "open-scroll":
      return "Open Scroll";
    case "general":
      return "General";
    default:
      return school;
  }
}

function getSchoolIcon(school: string) {
  switch (school) {
    case "mystical-masterclass":
      return <BookOpen className="h-8 w-8" />;
    case "open-scroll":
      return <Star className="h-8 w-8" />;
    case "general":
      return <Crown className="h-8 w-8" />;
    default:
      return <BookOpen className="h-8 w-8" />;
  }
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  return `${remainingMinutes}m`;
}

export default function ContentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [expandedPaymentMethod, setExpandedPaymentMethod] = useState<
    string | null
  >(null);

  // Handle purchase status from URL params
  useEffect(() => {
    const purchaseStatus = searchParams.get("purchase");
    if (purchaseStatus === "success") {
      toast.success(
        "Purchase successful! You now have access to this content.",
      );
      // Remove the query param from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    } else if (purchaseStatus === "cancelled") {
      toast.error("Purchase was cancelled. You can try again anytime.");
      // Remove the query param from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [searchParams]);

  // Validate ID format
  let contentId: Id<"contentLibrary"> | null = null;
  try {
    contentId = id as Id<"contentLibrary">;
  } catch {
    notFound();
  }

  // Get content item with user access status
  const contentItem = useQuery(
    api.subscriptions.getContentItem,
    contentId
      ? {
          contentId,
          userEmail: user?.email,
        }
      : "skip",
  );

  if (contentItem === null) {
    notFound();
  }

  if (contentItem === undefined) {
    return <ContentDetailSkeleton />;
  }

  const handlePurchase = async () => {
    if (!user) {
      router.push(`/auth/login?returnTo=/content/${id}`);
      return;
    }

    try {
      const response = await fetch("/api/stripe/purchase-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentId: contentId,
          successUrl: `${window.location.origin}/content/${contentId}?purchase=success`,
          cancelUrl: `${window.location.origin}/content/${contentId}?purchase=cancelled`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to start purchase process",
      );
    }
  };

  const handlePlayContent = () => {
    if (contentItem.hasAccess) {
      // Navigate to content player or show content
      router.push(`/content/${contentId}/watch`);
    } else {
      // Show purchase options
      handlePurchase();
    }
  };

  return (
    <PageWrapper className="bg-neutral-50 dark:bg-[#0a0a0a]">
      {/* Header Navigation */}
      <section className="relative overflow-hidden px-6 pt-24 pb-8 lg:px-8">
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/content">
              <Button className="mt-24 mb-6 cursor-pointer gap-x-2 rounded-none bg-black px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Content Library</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative px-6 pb-20 lg:px-8">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image/Video */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative mb-8 aspect-video overflow-hidden rounded-lg border border-black/10 bg-gradient-to-br from-black/5 to-black/10 dark:border-white/10 dark:from-white/5 dark:to-white/10"
              >
                <ContentImage
                  src={contentItem.thumbnailUrl}
                  alt={contentItem.title}
                  school={contentItem.school}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  priority
                />

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Button
                    size="lg"
                    onClick={handlePlayContent}
                    className="h-16 w-16 rounded-full bg-white/90 p-0 text-black transition-all duration-300 hover:scale-105 hover:bg-white"
                  >
                    <Play className="ml-1 h-8 w-8" fill="currentColor" />
                  </Button>
                </div>

                {/* Duration badge */}
                {contentItem.duration && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/70 text-white">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatDuration(contentItem.duration)}
                    </Badge>
                  </div>
                )}

                {/* Access status */}
                <div className="absolute top-4 left-4">
                  {contentItem.hasAccess ? (
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      You have access
                    </Badge>
                  ) : (
                    <Badge className="bg-black/70 text-white">
                      <Lock className="mr-1 h-3 w-3" />
                      Premium Content
                    </Badge>
                  )}
                </div>
              </motion.div>

              {/* Content Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                {/* School and Type */}
                <div className="mb-4 flex items-center gap-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getSchoolIcon(contentItem.school)}
                    <span className="ml-1">
                      {getSchoolName(contentItem.school)}
                    </span>
                  </Badge>
                  <Badge variant="secondary">{contentItem.contentType}</Badge>
                </div>

                {/* Title */}
                <h1
                  className={`${larken.className} mb-4 text-4xl font-bold md:text-5xl`}
                >
                  {contentItem.title}
                </h1>

                {/* Description */}
                <p className="text-lg leading-relaxed text-black/80 dark:text-white/80">
                  {contentItem.description}
                </p>
              </motion.div>

              {/* What You'll Learn */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className={`${larken.className} mb-6 text-3xl font-bold`}>
                  What You&apos;ll Learn
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      icon: <Lightbulb className="h-5 w-5" />,
                      title: "Deep Spiritual Insights",
                      description:
                        "Uncover profound revelations and mysteries that transform your understanding",
                    },
                    {
                      icon: <Target className="h-5 w-5" />,
                      title: "Practical Application",
                      description:
                        "Learn how to apply mystical principles in your daily spiritual journey",
                    },
                    {
                      icon: <Star className="h-5 w-5" />,
                      title: "Prophetic Understanding",
                      description:
                        "Develop advanced prophetic gifts and discernment abilities",
                    },
                    {
                      icon: <Award className="h-5 w-5" />,
                      title: "Personal Transformation",
                      description:
                        "Experience breakthrough techniques for spiritual growth and development",
                    },
                    {
                      icon: <BookOpen className="h-5 w-5" />,
                      title: "Biblical Mysteries",
                      description:
                        "Unlock hidden truths and deeper meanings within sacred texts",
                    },
                    {
                      icon: <Crown className="h-5 w-5" />,
                      title: "Spiritual Authority",
                      description:
                        "Gain understanding of spiritual authority and kingdom principles",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-lg border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-neutral-900/50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 font-semibold">{item.title}</h3>
                        <p className="text-sm text-black/70 dark:text-white/70">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Content Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mb-8"
              >
                <h2 className={`${larken.className} mb-6 text-3xl font-bold`}>
                  Content Preview
                </h2>
                <div className="rounded-lg border border-black/10 bg-gradient-to-r from-black/5 to-black/10 p-6 dark:border-white/10 dark:from-white/5 dark:to-white/10">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10 dark:bg-white/10">
                      <Play className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Free Preview Available</h3>
                      <p className="text-sm text-black/60 dark:text-white/60">
                        Get a taste of what&apos;s inside before you purchase
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      // Handle preview functionality
                      toast.info("Preview feature coming soon!");
                    }}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Preview (5 min)
                  </Button>
                </div>
              </motion.div>

              {/* Course Content */}
              {contentItem.contentType === "course" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-8"
                >
                  <h2 className={`${larken.className} mb-6 text-3xl font-bold`}>
                    Course Content
                  </h2>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Introduction to Spiritual Principles",
                        duration: 15,
                      },
                      { title: "Understanding Divine Mysteries", duration: 25 },
                      { title: "Practical Application", duration: 20 },
                      { title: "Advanced Techniques", duration: 30 },
                      { title: "Final Thoughts & Next Steps", duration: 10 },
                    ].map((lesson, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-black/10 p-4 dark:border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-sm font-semibold dark:bg-white/10">
                            {index + 1}
                          </div>
                          <span className="font-medium">{lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                          <Clock className="h-4 w-4" />
                          {lesson.duration}m
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-24 space-y-6"
              >
                {/* Quick Info Card */}
                <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
                  <h3 className="mb-4 font-semibold">Content Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-black/60 dark:text-white/60" />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-black/60 dark:text-white/60">
                          {contentItem.duration
                            ? formatDuration(contentItem.duration)
                            : "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-black/60 dark:text-white/60" />
                      <div>
                        <p className="font-medium">Difficulty Level</p>
                        <p className="text-black/60 dark:text-white/60">
                          Intermediate
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="mt-0.5 h-4 w-4 flex-shrink-0 text-black/60 dark:text-white/60" />
                      <div>
                        <p className="font-medium">School</p>
                        <p className="text-black/60 dark:text-white/60">
                          {getSchoolName(contentItem.school)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Access Card */}
                <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
                  {contentItem.hasAccess ? (
                    // User has access
                    <div className="text-center">
                      <div className="mb-4">
                        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">
                        You have access!
                      </h3>
                      <p className="mb-4 text-sm text-black/60 dark:text-white/60">
                        {contentItem.accessType === "subscription"
                          ? "Included in your subscription"
                          : "Purchased content"}
                      </p>
                      {contentItem.progress > 0 && (
                        <div className="mb-4">
                          <div className="mb-1 flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{contentItem.progress}%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10">
                            <div
                              className="h-2 rounded-full bg-black transition-all dark:bg-white"
                              style={{ width: `${contentItem.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      <Button
                        className="w-full cursor-pointer gap-x-2 rounded-none bg-black px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
                        onClick={handlePlayContent}
                      >
                        <Play className="mr-2 h-4 w-4" fill="currentColor" />
                        {contentItem.completed
                          ? "Watch Again"
                          : contentItem.progress > 0
                            ? "Continue Watching"
                            : "Start Watching"}
                      </Button>
                    </div>
                  ) : (
                    // User needs to purchase
                    <div>
                      <div className="mb-6 text-center">
                        <div className="mb-4 flex items-center justify-center gap-2">
                          <DollarSign className="h-8 w-8" />
                          <span className="text-3xl font-bold">
                            {(contentItem.price / 100).toFixed(0)}
                          </span>
                        </div>
                        <p className="text-sm text-black/60 dark:text-white/60">
                          One-time purchase • Lifetime access
                        </p>
                      </div>

                      <div className="space-y-4">
                        <Button
                          className="w-full cursor-pointer rounded-none bg-black py-6 font-semibold text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
                          onClick={handlePurchase}
                        >
                          {user ? (
                            <>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Purchase Now
                            </>
                          ) : (
                            <>
                              <Lock className="mr-2 h-4 w-4" />
                              Login to Purchase
                            </>
                          )}
                        </Button>

                        {/* Payment Methods / Login Message */}
                        {user ? (
                          <>
                            <div className="space-y-3">
                              <p className="text-center text-sm font-medium text-black/60 dark:text-white/60">
                                Payment Methods
                              </p>

                              {/* Stripe Payment */}
                              <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
                                <button
                                  onClick={() =>
                                    setExpandedPaymentMethod(
                                      expandedPaymentMethod === "stripe"
                                        ? null
                                        : "stripe",
                                    )
                                  }
                                  className="flex w-full items-center justify-between"
                                >
                                  <div className="flex items-center gap-3">
                                    <CreditCard className="h-5 w-5" />
                                    <span className="font-medium">
                                      Credit/Debit Card
                                    </span>
                                  </div>
                                  <Badge variant="outline">Recommended</Badge>
                                </button>
                                {expandedPaymentMethod === "stripe" && (
                                  <div className="mt-3 space-y-2 text-sm text-black/60 dark:text-white/60">
                                    <p>• Secure payment via Stripe</p>
                                    <p>• Instant access after payment</p>
                                    <p>• Supports all major cards</p>
                                  </div>
                                )}
                              </div>

                              {/* Bank Transfer */}
                              <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
                                <button
                                  onClick={() =>
                                    setExpandedPaymentMethod(
                                      expandedPaymentMethod === "bank"
                                        ? null
                                        : "bank",
                                    )
                                  }
                                  className="flex w-full items-center justify-between"
                                >
                                  <div className="flex items-center gap-3">
                                    <Building2 className="h-5 w-5" />
                                    <span className="font-medium">
                                      Bank Transfer
                                    </span>
                                  </div>
                                </button>
                                {expandedPaymentMethod === "bank" && (
                                  <div className="mt-3 space-y-2 text-sm text-black/60 dark:text-white/60">
                                    <div className="space-y-1">
                                      <p className="font-medium">
                                        Bank Details:
                                      </p>
                                      <div className="rounded bg-black/5 p-3 dark:bg-white/5">
                                        <p>Account: 1234567890</p>
                                        <p>Routing: 987654321</p>
                                        <p>Bank: First National Bank</p>
                                      </div>
                                    </div>
                                    <p>• Include your email in transfer memo</p>
                                    <p>• Access granted within 24 hours</p>
                                  </div>
                                )}
                              </div>

                              {/* Mobile Money */}
                              <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
                                <button
                                  onClick={() =>
                                    setExpandedPaymentMethod(
                                      expandedPaymentMethod === "mobile"
                                        ? null
                                        : "mobile",
                                    )
                                  }
                                  className="flex w-full items-center justify-between"
                                >
                                  <div className="flex items-center gap-3">
                                    <Smartphone className="h-5 w-5" />
                                    <span className="font-medium">
                                      Mobile Money
                                    </span>
                                  </div>
                                </button>
                                {expandedPaymentMethod === "mobile" && (
                                  <div className="mt-3 space-y-2 text-sm text-black/60 dark:text-white/60">
                                    <div className="space-y-1">
                                      <p className="font-medium">
                                        MTN Mobile Money:
                                      </p>
                                      <div className="flex items-center justify-between rounded bg-black/5 p-3 dark:bg-white/5">
                                        <span>+256 700 123 456</span>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => {
                                            navigator.clipboard.writeText(
                                              "+256700123456",
                                            );
                                            toast.success(
                                              "Phone number copied!",
                                            );
                                          }}
                                        >
                                          <Copy className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                    <p>
                                      • Send $
                                      {(contentItem.price / 100).toFixed(0)} to
                                      the number above
                                    </p>
                                    <p>
                                      • Include your email in transaction note
                                    </p>
                                    <p>• Access granted within 2 hours</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="text-center">
                              <p className="text-xs text-black/40 dark:text-white/40">
                                Need help? Contact support@yoursite.com
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="rounded-lg border border-black/10 bg-black/5 p-4 text-center dark:border-white/10 dark:bg-white/5">
                            <AlertCircle className="mx-auto mb-2 h-5 w-5 text-black/60 dark:text-white/60" />
                            <p className="text-sm text-black/70 dark:text-white/70">
                              Please log in to view payment options and complete
                              your purchase.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Share & Actions */}
                <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Link copied to clipboard!");
                      }}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Content
                    </Button>
                    {contentItem.hasAccess && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          // Handle download functionality
                          toast.info("Download feature coming soon!");
                        }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download for Offline
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
