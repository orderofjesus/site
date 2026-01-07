"use client";

import { useState } from "react";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { useRouter } from "next/navigation";
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
import { ArrowLeft } from "lucide-react";

type PlanType = "all-access" | "mystical-masterclass" | "open-scroll";
type BillingCycle = "monthly" | "yearly";

export default function SubscribePage() {
  const { user, loading: isLoading } = useAuth();
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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-2 text-center">
          <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to access subscription plans
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push("/auth/login")}>Sign In</Button>
          </CardContent>
        </Card>
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
              className="mb-4"
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
