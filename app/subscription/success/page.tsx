"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  ArrowRight,
  Calendar,
  Crown,
  BookOpen,
  Star,
  Sparkles,
  Play,
} from "lucide-react";
import { larken } from "@/lib/fonts";
import { motion } from "framer-motion";

export default function SubscriptionSuccessPage() {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // const plan = searchParams.get("plan");
  // const cycle = searchParams.get("cycle");

  // Get user's subscription to confirm success
  const subscription = useQuery(
    api.subscriptions.getUserActiveSubscription,
    user?.email ? { userEmail: user.email } : "skip",
  );

  useEffect(() => {
    // Add a small delay to ensure the webhook has processed
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case "all-access":
        return <Crown className="text-primary h-8 w-8" />;
      case "mystical-masterclass":
        return <BookOpen className="text-primary h-8 w-8" />;
      case "open-scroll":
        return <Star className="text-primary h-8 w-8" />;
      default:
        return <CheckCircle className="text-primary h-8 w-8" />;
    }
  };

  const getPlanName = (planType: string) => {
    switch (planType) {
      case "all-access":
        return "All-Access Pass";
      case "mystical-masterclass":
        return "Mystical Masterclass";
      case "open-scroll":
        return "Open Scroll";
      default:
        return "Subscription";
    }
  };

  const getPlanFeatures = (planType: string) => {
    const commonFeatures = [
      "7-day free trial activated",
      "Download content for offline viewing",
      "Community forum access",
      "Monthly new releases",
    ];

    switch (planType) {
      case "all-access":
        return [
          ...commonFeatures,
          "Access to ALL content libraries",
          "Exclusive subscriber-only content",
          "Monthly live Q&A sessions",
          "Priority email support",
        ];
      case "mystical-masterclass":
        return [
          ...commonFeatures,
          "Complete Mystical Masterclass library",
          "Deep spiritual teachings",
          "Mystical practice guides",
        ];
      case "open-scroll":
        return [
          ...commonFeatures,
          "Complete Open Scroll library",
          "Prophetic insights and revelations",
          "Spiritual discernment training",
        ];
      default:
        return commonFeatures;
    }
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
        {/* Decorative Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-green-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"></div>
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Animated Loader */}
            <div className="mb-6 flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="h-16 w-16 rounded-full border-4 border-green-500/20 border-t-green-600"
              />
            </div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${larken.className} mb-2 text-2xl font-bold`}
            >
              Confirming your subscription...
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-black/60 dark:text-white/60"
            >
              This will just take a moment
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-green-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"></div>
        {/* Floating sparkles */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-40 left-20"
        >
          <Sparkles className="h-6 w-6 text-green-500/40" />
        </motion.div>
        <motion.div
          animate={{
            y: [20, -20, 20],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-40 right-20"
        >
          <Sparkles className="h-8 w-8 text-emerald-500/40" />
        </motion.div>
      </div>

      <div className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          {/* Success Header - Hero Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            {/* Success Icon with Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
              className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full border-4 border-green-500/20 bg-green-500/10"
            >
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-500" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`${larken.className} mb-4 text-5xl font-bold md:text-6xl`}
            >
              Welcome to Your Spiritual Journey!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-black/70 dark:text-white/70"
            >
              Your subscription has been successfully activated
            </motion.p>

            {subscription?.trialEndsAt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-6 inline-block rounded-full border-2 border-blue-500/20 bg-blue-500/10 px-6 py-3"
              >
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                  🎉 7-Day Free Trial Active • No charge until{" "}
                  {new Date(subscription.trialEndsAt).toLocaleDateString()}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Subscription Details */}
          {subscription && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mb-12 overflow-hidden border-2 border-black/10 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900"
            >
              <div className="border-b border-black/10 bg-white p-6 dark:border-white/10 dark:bg-black">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/5 dark:bg-white/5">
                    {getPlanIcon(subscription.planType)}
                  </div>
                  <div className="flex-1">
                    <h3 className={`${larken.className} mb-1 flex items-center gap-3 text-2xl font-bold`}>
                      {getPlanName(subscription.planType)}
                      <Badge className="rounded-full bg-green-600 text-white">
                        {subscription.status}
                      </Badge>
                    </h3>
                    <p className="text-black/60 dark:text-white/60">
                      ${(subscription.price / 100).toFixed(2)} /{" "}
                      {subscription.billingCycle}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-6 p-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">
                    What's Included
                  </h4>
                  <ul className="space-y-3">
                    {getPlanFeatures(subscription.planType).map(
                      (feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">
                    Subscription Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-5 w-5 text-black/40 dark:text-white/40" />
                      <span>
                        Started on{" "}
                        {new Date(subscription.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className={`${larken.className} mb-6 text-center text-3xl font-bold`}>
              Ready to Begin?
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {/* Start Learning Card */}
              <div className="group relative overflow-hidden border-2 border-black/10 bg-white transition-all duration-300 hover:border-black hover:shadow-xl dark:border-white/10 dark:bg-black dark:hover:border-white">
                <div className="p-8 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-black/5 transition-colors group-hover:bg-black/10 dark:bg-white/5 dark:group-hover:bg-white/10">
                    <Play className="h-8 w-8 text-black/60 dark:text-white/60" />
                  </div>
                  <h3 className={`${larken.className} mb-2 text-2xl font-bold`}>
                    Start Learning
                  </h3>
                  <p className="mb-6 text-sm text-black/60 dark:text-white/60">
                    Dive into your content library and begin your transformation
                  </p>
                  <Button
                    onClick={() => router.push("/content")}
                    className="group/btn cursor-pointer gap-x-2 rounded-none bg-black px-8 py-6 text-base font-semibold text-white transition-all duration-300 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    Browse Content
                    <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>

              {/* Manage Subscription Card */}
              <div className="group relative overflow-hidden border-2 border-black/10 bg-white transition-all duration-300 hover:border-black hover:shadow-xl dark:border-white/10 dark:bg-black dark:hover:border-white">
                <div className="p-8 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-black/5 transition-colors group-hover:bg-black/10 dark:bg-white/5 dark:group-hover:bg-white/10">
                    <Crown className="h-8 w-8 text-black/60 dark:text-white/60" />
                  </div>
                  <h3 className={`${larken.className} mb-2 text-2xl font-bold`}>
                    Manage Subscription
                  </h3>
                  <p className="mb-6 text-sm text-black/60 dark:text-white/60">
                    View billing details and manage your account settings
                  </p>
                  <Button
                    onClick={() => router.push("/dashboard?tab=subscription")}
                    variant="ghost"
                    className="group/btn cursor-pointer gap-x-2 rounded-none border-2 border-black/10 px-8 py-6 text-base font-semibold transition-all duration-300 hover:border-black hover:bg-black/5 dark:border-white/10 dark:hover:border-white dark:hover:bg-white/5"
                  >
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mb-12 border-2 border-black/10 bg-neutral-50 p-8 dark:border-white/10 dark:bg-neutral-900"
          >
            <h2 className={`${larken.className} mb-2 text-center text-3xl font-bold`}>
              Your Next Steps
            </h2>
            <p className="mb-8 text-center text-black/60 dark:text-white/60">
              Here's how to get the most out of your subscription
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                  <span className="text-lg font-bold">1</span>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">
                    Explore Your Content Library
                  </h4>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    Browse through hours of transformative spiritual content
                    tailored to your subscription level.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                  <span className="text-lg font-bold">2</span>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Join the Community</h4>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    Connect with fellow seekers in our community forums and
                    share your spiritual journey.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                  <span className="text-lg font-bold">3</span>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Download for Offline Access</h4>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    Download your favorite content to continue your spiritual
                    growth anywhere, anytime.
                  </p>
                </div>
              </div>

              {subscription?.planType === "all-access" && (
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                    <span className="text-lg font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold">Attend Live Q&A Sessions</h4>
                    <p className="text-sm text-black/60 dark:text-white/60">
                      Join monthly live sessions to deepen your understanding
                      and get answers to your spiritual questions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="border-t border-black/10 pt-8 text-center dark:border-white/10"
          >
            <p className="text-sm text-black/60 dark:text-white/60">
              Need help? Contact our support team at{" "}
              <a
                href="mailto:support@melchizedekorder.com"
                className="font-semibold text-black underline decoration-black/30 underline-offset-4 transition-colors hover:text-black/80 dark:text-white dark:decoration-white/30 dark:hover:text-white/80"
              >
                support@melchizedekorder.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
