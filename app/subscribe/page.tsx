"use client";

import { useState } from "react";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { useRouter, usePathname } from "next/navigation";
import { SubscriptionPlans } from "@/components/subscriptions/subscription-plans";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Lock,
  Loader2,
  CreditCard,
  Shield,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { larken } from "@/lib/fonts";
import { motion } from "framer-motion";
import { Loading } from "@/components/ui/loading";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

type PlanType = "brass" | "gold" | "platinum";
type BillingCycle = "monthly" | "yearly";

// Mock Checkout Form for Demo purposes
function DemoCheckoutForm({
  planType,
  billingCycle,
  user,
  onSuccess,
}: {
  planType: PlanType;
  billingCycle: BillingCycle;
  user: any;
  onSuccess: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createDemoSubscription = useMutation(
    api.subscriptions.createDemoSubscription,
  );

  const handleSimulatedPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await createDemoSubscription({
        userId: user.id || user.id, // WorkOS user id
        userEmail: user.email,
        planType,
        billingCycle,
      });
      onSuccess();
    } catch (error) {
      console.error("Failed to create demo subscription:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const planNames = {
    brass: "Brass — Foundations",
    gold: "Gold — Inner Circle",
    platinum: "Platinum",
  };

  const prices = {
    brass: billingCycle === "monthly" ? "$75" : "$720",
    gold: billingCycle === "monthly" ? "$150" : "$1,440",
    platinum: billingCycle === "monthly" ? "$250" : "$2,400",
  };

  return (
    <div className="mx-auto max-w-md space-y-8 rounded-none border-2 border-black/10 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-black">
      <div className="space-y-2 text-center">
        <h2 className={`${larken.className} text-3xl font-bold`}>
          Complete Your Subscription
        </h2>
        <p className="text-black/60 dark:text-white/60">
          You are subscribing to{" "}
          <strong className="text-black dark:text-white">
            {planNames[planType]}
          </strong>{" "}
          ({billingCycle} billing)
        </p>
      </div>

      <div className="space-y-3 border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5">
        <div className="flex justify-between text-lg font-bold">
          <span>{planNames[planType]}</span>
          <span>{prices[planType]}</span>
        </div>
        <div className="text-sm text-black/60 dark:text-white/60">
          {billingCycle === "monthly"
            ? "Billed monthly"
            : "Billed yearly (Saved 20%)"}
        </div>
      </div>

      <form onSubmit={handleSimulatedPayment} className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-bold tracking-wider text-black/50 uppercase dark:text-white/50">
            Payment Details (Demo)
          </label>
          <div className="relative">
            <input
              readOnly
              value="**** **** **** 4242"
              className="w-full border-2 border-black/10 bg-black/5 p-4 font-mono dark:border-white/10 dark:bg-white/5"
            />
            <CreditCard className="absolute top-4 right-4 h-5 w-5 text-black/30 dark:text-white/30" />
          </div>
          <p className="text-xs text-black/40 italic dark:text-white/40">
            This checkout is simulated for demonstration purposes. No real
            payment will be processed.
          </p>
        </div>

        <Button
          type="submit"
          className="group relative w-full overflow-hidden rounded-none bg-black py-8 text-lg font-bold text-white transition-all hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Verifying and granting access...</span>
            </div>
          ) : (
            <span>Start My Journey</span>
          )}
        </Button>
      </form>

      <div className="flex items-center justify-center gap-3 text-xs font-medium tracking-widest text-black/40 uppercase dark:text-white/40">
        <Shield className="h-4 w-4" />
        <span>Secure Demo Environment</span>
      </div>
    </div>
  );
}

export default function SubscribePage() {
  const { user, loading: authLoading } = useAuth();
  const pathName = usePathname();
  const router = useRouter();
  const [step, setStep] = useState<"plans" | "checkout" | "success">("plans");
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  if (authLoading) {
    return (
      <Loading message="Loading..." submessage="Preparing subscription plans" />
    );
  }

  if (!user) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5"
            >
              <Lock className="h-10 w-10 text-black/60 dark:text-white/60" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`${larken.className} mb-6 text-5xl font-bold md:text-6xl`}
            >
              Access Restricted
            </motion.h1>

            <p className="mb-12 text-lg text-black/70 dark:text-white/70">
              Please sign in to view our membership tiers and begin your
              journey.
            </p>

            <Link href={`/auth/login?returnTo=/${pathName}`}>
              <Button className="transform rounded-none bg-black px-12 py-8 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-black/90 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-white/90">
                Login to Continue
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const handlePlanSelection = (plan: string, cycle: "monthly" | "yearly") => {
    setSelectedPlan(plan as PlanType);
    setBillingCycle(cycle);
    setStep("checkout");
  };

  const handleBackToPlans = () => {
    setStep("plans");
    setSelectedPlan(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 right-0 h-[600px] w-[600px] rounded-full bg-black/2 blur-3xl dark:bg-white/2"></div>
        <div className="absolute -bottom-20 -left-20 h-[500px] w-[500px] rounded-full bg-black/2 blur-3xl dark:bg-white/2"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h1
              className={`${larken.className} text-5xl leading-none font-bold tracking-tight md:text-7xl`}
            >
              {step === "plans" && "Join the Inner Circle"}
              {step === "checkout" && "Initialize Access"}
              {step === "success" && "Access Granted"}
            </h1>
            <p className="text-xl leading-relaxed font-medium text-black/60 md:text-2xl dark:text-white/60">
              {step === "plans" &&
                "Select a membership tier to unlock deep spiritual teachings, prophetic insights, and exclusive content."}
              {step === "checkout" &&
                "Your transformation begins here. Confirm your membership to finalize setup."}
              {step === "success" &&
                "Welcome to the family. Your membership is now active and all tiered content is unlocked."}
            </p>
          </div>

          <div className="relative min-h-[400px]">
            {step === "plans" && (
              <SubscriptionPlans onSelectPlan={handlePlanSelection} />
            )}

            {step === "checkout" && selectedPlan && user && (
              <div className="space-y-8">
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    onClick={handleBackToPlans}
                    className="group gap-2 rounded-none p-4 text-xs font-bold tracking-widest uppercase hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Selection
                  </Button>
                </div>
                <DemoCheckoutForm
                  planType={selectedPlan}
                  billingCycle={billingCycle}
                  user={user}
                  onSuccess={() => setStep("success")}
                />
              </div>
            )}

            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto max-w-xl space-y-12 border-2 border-black bg-white p-16 text-center shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] dark:border-white dark:bg-black dark:shadow-[20px_20px_0px_0px_rgba(255,255,255,0.05)]"
              >
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, delay: 0.2 }}
                    className="flex h-32 w-32 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black"
                  >
                    <CheckCircle2 className="h-16 w-16" />
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <h2 className={`${larken.className} text-4xl font-bold`}>
                    Membership Active
                  </h2>
                  <p className="text-xl text-black/70 dark:text-white/70">
                    Your{" "}
                    <span className="font-bold underline decoration-black/20 underline-offset-8 dark:decoration-white/20">
                      {selectedPlan === "brass"
                        ? "BRASS"
                        : selectedPlan === "gold"
                          ? "GOLD"
                          : "PLATINUM"}
                    </span>{" "}
                    journey has officially begun.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
                  <Button
                    asChild
                    className="rounded-none bg-black py-8 text-lg font-bold text-white shadow-lg hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    <Link href="/dashboard">Portal Access</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-none border-2 border-black py-8 text-lg font-bold transition-all hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                  >
                    <Link href="/content">Explore Library</Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
