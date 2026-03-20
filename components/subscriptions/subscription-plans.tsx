"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Star, Crown, BookOpen, Wand2 } from "lucide-react";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  features: PlanFeature[];
  monthly: {
    price: number;
    displayPrice: string;
  };
  yearly: {
    price: number;
    displayPrice: string;
    savings: string;
  };
  popular?: boolean;
  cta: string;
}

const plans: SubscriptionPlan[] = [
  {
    id: "brass",
    name: "BRASS — Foundations",
    description: "Enter the world. Learn the language. Awaken curiosity.",
    icon: <BookOpen className="h-6 w-6" />,
    features: [
      { text: "Mystical Masterclass Archive", included: true },
      { text: "Open Scroll Library Access", included: true },
      { text: "Bonus Podcast Content", included: true },
      { text: "Monthly New Content", included: true },
      { text: "Downloadable Study Guides", included: true },
      { text: "Weekly Live Q&A Calls", included: false },
      { text: "Guided Meditations", included: false },
      { text: "Exclusive Series", included: false },
    ],
    monthly: {
      price: 7500,
      displayPrice: "$75",
    },
    yearly: {
      price: 72000,
      displayPrice: "$720",
      savings: "Save $180",
    },
    cta: "Start Mystical Journey",
  },
  {
    id: "gold",
    name: "GOLD — Inner Circle",
    description:
      "Step beyond learning. Enter practice, guidance, and communion.",
    icon: <Wand2 className="h-6 w-6" />,
    features: [
      { text: "Everything in Brass", included: true },
      { text: "Weekly Live Q&A Calls", included: true },
      { text: "Guided Meditations", included: true },
      { text: "Live Interactive Workshops", included: true },
      { text: "Exclusive Series", included: true },
      { text: "Early Content Access", included: true },
      { text: "One-Time Sessions", included: false },
      { text: "Uncut Depth", included: false },
    ],
    monthly: {
      price: 15000,
      displayPrice: "$150",
    },
    yearly: {
      price: 144000,
      displayPrice: "$1,440",
      savings: "Save $360",
    },
    popular: true,
    cta: "Enter the Circle",
  },
  {
    id: "platinum",
    name: "PLATINUM",
    description: "The ultimate spiritual depth and direct engagement.",
    icon: <Crown className="h-6 w-6" />,
    features: [
      { text: "Everything in Gold", included: true },
      { text: "One-Time Private Sessions", included: true },
      { text: "Locked Access Content", included: true },
      { text: "Uncut Depth Archives", included: true },
      { text: "Priority Support", included: true },
      { text: "Direct Mentor Access", included: true },
      { text: "Bespoke Spiritual Path", included: true },
      { text: "VIP Event Access", included: true },
    ],
    monthly: {
      price: 25000,
      displayPrice: "$250",
    },
    yearly: {
      price: 240000,
      displayPrice: "$2,400",
      savings: "Save $600",
    },
    cta: "Claim Infinite Depth",
  },
];

interface SubscriptionPlansProps {
  onSelectPlan: (planId: string, billingCycle: "monthly" | "yearly") => void;
  currentPlan?: string;
  isLoading?: boolean;
}

export function SubscriptionPlans({
  onSelectPlan,
  currentPlan,
  isLoading,
}: SubscriptionPlansProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      {/* Header */}
      <div className="mb-8 md:text-center">
        <h2 className="mb-4 text-3xl font-bold">
          Choose Your Spiritual Journey
        </h2>
        <p className="text-muted-foreground mb-6 text-lg">
          Access transformative content and deepen your spiritual understanding
        </p>

        {/* Billing Toggle */}
        <Tabs
          value={billingCycle}
          onValueChange={(value) =>
            setBillingCycle(value as "monthly" | "yearly")
          }
        >
          <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly" className="relative">
              Yearly
              <Badge variant="secondary" className="ml-2 text-xs">
                Save 20%
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Plans Grid */}
      <div className="mb-28 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${
              plan.popular
                ? "border-primary ring-primary/20 scale-105 shadow-lg ring-2"
                : "border-border"
            }`}
          >
            {plan.popular && (
              <Badge
                variant="default"
                className="bg-primary absolute -top-3 left-1/2 -translate-x-1/2 transform"
              >
                Most Popular
              </Badge>
            )}

            <CardHeader className="pb-4 text-center">
              <div className="mb-3 flex items-center justify-center">
                <div className="bg-primary/10 text-primary rounded-full p-3">
                  {plan.icon}
                </div>
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>

              {/* Pricing */}
              <div className="mt-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold">
                    {billingCycle === "monthly"
                      ? plan.monthly.displayPrice
                      : plan.yearly.displayPrice}
                  </span>
                  <span className="text-muted-foreground">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {billingCycle === "yearly" && (
                  <p className="mt-1 text-sm font-medium text-green-600">
                    {plan.yearly.savings}
                  </p>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check
                      className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                        feature.included
                          ? "text-green-500"
                          : "text-muted-foreground opacity-30"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground line-through opacity-60"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className={`w-full cursor-pointer rounded-none ${plan.popular ? "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90" : ""}`}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => onSelectPlan(plan.id, billingCycle)}
                disabled={isLoading || currentPlan === plan.id}
              >
                {isLoading
                  ? "Processing..."
                  : currentPlan === plan.id
                    ? "Current Plan"
                    : plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Free Trial Notice */}
      <div className="text-muted-foreground flex items-center justify-center text-center text-sm font-semibold">
        <Wand2 className="mr-2" />
        <p>Start with a 2-day free trial • Cancel anytime • No hidden fees</p>
      </div>
    </div>
  );
}
