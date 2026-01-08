"use client";

import { useState } from "react";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { useRouter, usePathname } from "next/navigation";
import { SubscriptionPlans } from "@/components/subscriptions/subscription-plans";
import { CheckoutForm } from "@/components/subscriptions/checkout-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { larken } from "@/lib/fonts";
import { motion } from "framer-motion";
import { Loading } from "@/components/ui/loading";

type PlanType = "all-access" | "mystical-masterclass" | "open-scroll";
type BillingCycle = "monthly" | "yearly";

export default function SubscribePage() {
  const { user, loading: isLoading } = useAuth();
  const pathName = usePathname();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<{
    planType: PlanType;
    billingCycle: BillingCycle;
  } | null>(null);

  const handlePlanSelection = (
    planType: string,
    billingCycle: BillingCycle,
  ) => {
    setSelectedPlan({
      planType: planType as PlanType,
      billingCycle,
    });
  };

  const handleBackToPlans = () => {
    setSelectedPlan(null);
  };

  const handleCheckoutSuccess = () => {
    router.push("/subscription/success");
  };

  if (isLoading) {
    return <Loading message="Loading..." submessage="Preparing subscription plans" />;
  }

  if (!user) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
        {/* Decorative Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5"
            >
              <Lock className="h-10 w-10 text-black/60 dark:text-white/60" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`${larken.className} mb-6 text-5xl font-bold md:text-6xl`}
            >
              Log In Required
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-4 text-lg text-black/70 dark:text-white/70"
            >
              Access transformative spiritual content and unlock your journey
              with the divine
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-12 text-base text-black/60 dark:text-white/60"
            >
              Please sign in to view our subscription plans and begin your
              spiritual transformation
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href={`/auth/login?returnTo=/${pathName}`}>
                <Button className="group cursor-pointer gap-x-2 rounded-none bg-black px-8 py-6 text-base font-semibold text-white transition-all duration-300 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                  Log In to Continue
                </Button>
              </Link>

              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="cursor-pointer gap-x-2 rounded-none border-2 border-black/10 px-8 py-6 text-base font-semibold transition-all duration-300 hover:border-black hover:bg-black/5 dark:border-white/10 dark:hover:border-white dark:hover:bg-white/5"
              >
                Go back
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          {selectedPlan && (
            <Button
              variant="ghost"
              onClick={handleBackToPlans}
              className="mt-24 mb-6 cursor-pointer gap-x-2 rounded-none bg-black px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plans
            </Button>
          )}

          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">
              {selectedPlan
                ? "Complete Your Subscription"
                : "Choose Your Spiritual Journey"}
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              {selectedPlan
                ? "You're just one step away from unlocking transformative spiritual content"
                : "Access deep spiritual teachings and transform your relationship with the divine"}
            </p>
          </div>
        </div>

        {/* Content */}
        {selectedPlan ? (
          <CheckoutForm
            planType={selectedPlan.planType}
            billingCycle={selectedPlan.billingCycle}
            userEmail={user.email}
            onSuccess={handleCheckoutSuccess}
          />
        ) : (
          <SubscriptionPlans
            onSelectPlan={handlePlanSelection}
            isLoading={false}
          />
        )}
      </div>
    </div>
  );
}
