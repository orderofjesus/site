import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@workos-inc/authkit-nextjs";
import Stripe from "stripe";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Price ID mappings
const PRICE_IDS = {
  "all-access": {
    monthly: process.env.NEXT_PUBLIC_STRIPE_ALL_ACCESS_MONTHLY_PRICE_ID!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_ALL_ACCESS_YEARLY_PRICE_ID!,
  },
  "mystical-masterclass": {
    monthly: process.env.NEXT_PUBLIC_STRIPE_MYSTICAL_MONTHLY_PRICE_ID!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_MYSTICAL_YEARLY_PRICE_ID!,
  },
  "open-scroll": {
    monthly: process.env.NEXT_PUBLIC_STRIPE_OPEN_SCROLL_MONTHLY_PRICE_ID!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_OPEN_SCROLL_YEARLY_PRICE_ID!,
  },
} as const;

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const { user } = await withAuth();
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const { planType, billingCycle, userEmail } = await request.json();

    // Validate input
    if (!planType || !billingCycle || !userEmail) {
      return NextResponse.json(
        { error: "Missing required fields: planType, billingCycle, userEmail" },
        { status: 400 },
      );
    }

    if (!PRICE_IDS[planType as keyof typeof PRICE_IDS]) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
    }

    if (!["monthly", "yearly"].includes(billingCycle)) {
      return NextResponse.json(
        { error: "Invalid billing cycle" },
        { status: 400 },
      );
    }

    // Ensure the user email matches the authenticated user
    if (user.email !== userEmail) {
      return NextResponse.json({ error: "Email mismatch" }, { status: 403 });
    }

    // Check if user already has an active subscription
    const existingSubscription = await convex.query(
      api.subscriptions.getUserActiveSubscription,
      {
        userEmail: user.email,
      },
    );

    if (existingSubscription) {
      return NextResponse.json(
        { error: "User already has an active subscription" },
        { status: 400 },
      );
    }

    // Get the price ID for the selected plan and billing cycle
    const priceId =
      PRICE_IDS[planType as keyof typeof PRICE_IDS][
        billingCycle as keyof (typeof PRICE_IDS)[keyof typeof PRICE_IDS]
      ];

    // Create or retrieve Stripe customer
    let customer: Stripe.Customer;
    const existingCustomers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: user.email,
        name:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : undefined,
        metadata: {
          userId: user.id,
          source: "melchizedek-order",
        },
      });
    }

    // Create the subscription with trial period
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
      trial_period_days: 7,
      metadata: {
        userId: user.id,
        userEmail: user.email,
        planType,
        billingCycle,
      },
    });

    // Access invoice and payment_intent safely (Stripe types can be strict)
    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const invoiceWithExtras = invoice as Stripe.Invoice & {
      payment_intent?: string | Stripe.PaymentIntent;
      amount_total?: number | null;
    };
    const paymentIntent = invoiceWithExtras.payment_intent as
      | Stripe.PaymentIntent
      | undefined;

    // Store subscription in Convex
    await convex.mutation(api.subscriptions.createSubscription, {
      userId: user.id,
      userEmail: user.email,
      planType: planType as
        | "all-access"
        | "mystical-masterclass"
        | "open-scroll",
      billingCycle: billingCycle as "monthly" | "yearly",
      price: invoice.amount_paid || 0,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: customer.id,
      startDate: new Date().toISOString(),
      trialEndsAt: subscription.trial_end
        ? new Date(subscription.trial_end * 1000).toISOString()
        : undefined,
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent?.client_secret,
      trialEnd: subscription.trial_end,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
