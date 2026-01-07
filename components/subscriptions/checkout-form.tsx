"use client";

import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Shield, CreditCard } from "lucide-react";
import { stripePromise } from "@/lib/stripe";

interface CheckoutFormProps {
  planType: "all-access" | "mystical-masterclass" | "open-scroll";
  billingCycle: "monthly" | "yearly";
  userEmail: string;
  onSuccess?: () => void;
}

interface CheckoutFormInnerProps extends CheckoutFormProps {
  clientSecret: string;
}

function CheckoutFormInner({ 
  planType, 
  billingCycle, 
  userEmail, 
  onSuccess,
  clientSecret 
}: CheckoutFormInnerProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const planDetails = {
    "all-access": {
      name: "All-Access Pass",
      monthly: { price: "$150", description: "Complete access to all content" },
      yearly: { price: "$1,440", description: "Complete access + 20% savings" },
    },
    "mystical-masterclass": {
      name: "Mystical Masterclass",
      monthly: { price: "$75", description: "Deep spiritual teachings" },
      yearly: { price: "$720", description: "Yearly access + 20% savings" },
    },
    "open-scroll": {
      name: "Open Scroll",
      monthly: { price: "$75", description: "Prophetic insights" },
      yearly: { price: "$720", description: "Yearly access + 20% savings" },
    },
  };

  const currentPlan = planDetails[planType];
  const currentPricing = currentPlan[billingCycle];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/subscription/success?plan=${planType}&cycle=${billingCycle}`,
        receipt_email: userEmail,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setErrorMessage(error.message || "Payment failed");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } else {
      // Payment succeeded, user will be redirected
      onSuccess?.();
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{currentPlan.name}</h4>
              <p className="text-sm text-muted-foreground">{currentPricing.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{billingCycle} billing</Badge>
                {billingCycle === "yearly" && (
                  <Badge variant="default" className="bg-green-600">Save 20%</Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">{currentPricing.price}</div>
              <div className="text-sm text-muted-foreground">per {billingCycle.slice(0, -2)}</div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currentPricing.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Free Trial</span>
              <span className="text-green-600">7 days free</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{currentPricing.price}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              * You won't be charged until your 7-day free trial ends.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>
            Your payment information is securely processed by Stripe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement
              options={{
                layout: "tabs",
              }}
            />

            {errorMessage && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              disabled={!stripe || !elements || isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Start 7-Day Free Trial`
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secured by Stripe • Cancel anytime</span>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Trial Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What's Included in Your Trial</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-primary rounded-full" />
              Full access to {planType === "all-access" ? "all content" : currentPlan.name}
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-primary rounded-full" />
              Download resources for offline access
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-primary rounded-full" />
              Community forum participation
            </li>
            {planType === "all-access" && (
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                Monthly live Q&A sessions
              </li>
            )}
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-primary rounded-full" />
              Cancel anytime during trial - no charges
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export function CheckoutForm({ planType, billingCycle, userEmail, onSuccess }: CheckoutFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create subscription intent
    const createSubscriptionIntent = async () => {
      try {
        const response = await fetch("/api/stripe/create-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planType,
            billingCycle,
            userEmail,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to initialize checkout");
      } finally {
        setIsLoading(false);
      }
    };

    createSubscriptionIntent();
  }, [planType, billingCycle, userEmail]);

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="text-muted-foreground">Preparing your checkout...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !clientSecret) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="py-8 text-center">
          <div className="space-y-4">
            <p className="text-destructive">{error || "Failed to load checkout"}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const appearance = {
    theme: "stripe" as const,
    variables: {
      colorPrimary: "hsl(var(--primary))",
    },
  };

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance,
      }}
    >
      <CheckoutFormInner
        planType={planType}
        billingCycle={billingCycle}
        userEmail={userEmail}
        onSuccess={onSuccess}
        clientSecret={clientSecret}
      />
    </Elements>
  );
}