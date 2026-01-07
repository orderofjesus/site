"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Star, Crown, BookOpen } from "lucide-react";

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
    id: "mystical-masterclass",
    name: "Mystical Masterclass",
    description: "Deep spiritual teachings and mystical practices",
    icon: <BookOpen className="h-6 w-6" />,
    features: [
      { text: "Access to all Mystical Masterclass content", included: true },
      { text: "Monthly new releases", included: true },
      { text: "Downloadable resources", included: true },
      { text: "Community forum access", included: true },
      { text: "Open Scroll content", included: false },
      { text: "Live Q&A sessions", included: false },
      { text: "Priority support", included: false },
    ],
    monthly: {
      price: 7500, // $75 in cents
      displayPrice: "$75",
    },
    yearly: {
      price: 72000, // $720 in cents
      displayPrice: "$720",
      savings: "Save $180",
    },
    cta: "Start Mystical Journey",
  },
  {
    id: "open-scroll",
    name: "Open Scroll",
    description: "Prophetic insights and revelations",
    icon: <Star className="h-6 w-6" />,
    features: [
      { text: "Access to all Open Scroll content", included: true },
      { text: "Monthly new releases", included: true },
      { text: "Downloadable resources", included: true },
      { text: "Community forum access", included: true },
      { text: "Mystical Masterclass content", included: false },
      { text: "Live Q&A sessions", included: false },
      { text: "Priority support", included: false },
    ],
    monthly: {
      price: 7500, // $75 in cents
      displayPrice: "$75",
    },
    yearly: {
      price: 72000, // $720 in cents
      displayPrice: "$720",
      savings: "Save $180",
    },
    cta: "Unlock Prophecies",
  },
  {
    id: "all-access",
    name: "All-Access Pass",
    description: "Complete access to all spiritual content",
    icon: <Crown className="h-6 w-6" />,
    features: [
      { text: "Access to ALL content", included: true },
      { text: "Monthly new releases", included: true },
      { text: "Downloadable resources", included: true },
      { text: "Community forum access", included: true },
      { text: "Exclusive subscriber content", included: true },
      { text: "Monthly live Q&A sessions", included: true },
      { text: "Priority email support", included: true },
    ],
    monthly: {
      price: 15000, // $150 in cents
      displayPrice: "$150",
    },
    yearly: {
      price: 144000, // $1440 in cents
      displayPrice: "$1,440",
      savings: "Save $360",
    },
    popular: true,
    cta: "Get Full Access",
  },
];

interface SubscriptionPlansProps {
  onSelectPlan: (planId: string, billingCycle: "monthly" | "yearly") => void;
  currentPlan?: string;
  isLoading?: boolean;
}

export function SubscriptionPlans({ onSelectPlan, currentPlan, isLoading }: SubscriptionPlansProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Spiritual Journey</h2>
        <p className="text-muted-foreground text-lg mb-6">
          Access transformative content and deepen your spiritual understanding
        </p>
        
        {/* Billing Toggle */}
        <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly")}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly" className="relative">
              Yearly
              <Badge variant="secondary" className="ml-2 text-xs">Save 20%</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${
              plan.popular 
                ? "border-primary ring-2 ring-primary/20 shadow-lg scale-105" 
                : "border-border"
            }`}
          >
            {plan.popular && (
              <Badge 
                variant="default" 
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary"
              >
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  {plan.icon}
                </div>
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              
              {/* Pricing */}
              <div className="mt-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold">
                    {billingCycle === "monthly" ? plan.monthly.displayPrice : plan.yearly.displayPrice}
                  </span>
                  <span className="text-muted-foreground">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {billingCycle === "yearly" && (
                  <p className="text-sm text-green-600 font-medium mt-1">
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
                      className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                        feature.included 
                          ? "text-green-500" 
                          : "text-muted-foreground opacity-30"
                      }`}
                    />
                    <span 
                      className={`text-sm ${
                        feature.included 
                          ? "text-foreground" 
                          : "text-muted-foreground opacity-60 line-through"
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
                className="w-full" 
                variant={plan.popular ? "default" : "outline"}
                onClick={() => onSelectPlan(plan.id, billingCycle)}
                disabled={isLoading || currentPlan === plan.id}
              >
                {isLoading ? (
                  "Processing..."
                ) : currentPlan === plan.id ? (
                  "Current Plan"
                ) : (
                  plan.cta
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Free Trial Notice */}
      <div className="text-center text-sm text-muted-foreground">
        <p>✨ Start with a 7-day free trial • Cancel anytime • No hidden fees</p>
      </div>
    </div>
  );
}