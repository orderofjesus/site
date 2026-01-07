import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@workos-inc/authkit-nextjs";
import Stripe from "stripe";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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

    const { subscriptionId, cancelImmediately = false } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json(
        { error: "Subscription ID is required" },
        { status: 400 },
      );
    }

    // Verify the subscription belongs to the authenticated user
    const userSubscription = await convex.query(
      api.subscriptions.getUserActiveSubscription,
      {
        userEmail: user.email,
      },
    );

    if (
      !userSubscription ||
      userSubscription.stripeSubscriptionId !== subscriptionId
    ) {
      return NextResponse.json(
        { error: "Subscription not found or access denied" },
        { status: 404 },
      );
    }

    // Cancel the subscription in Stripe
    if (cancelImmediately) {
      // Cancel immediately
      await stripe.subscriptions.cancel(subscriptionId, {
        prorate: true,
      });
    } else {
      // Cancel at the end of the billing period
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
    }

    // Update subscription status in Convex
    await convex.mutation(api.subscriptions.updateSubscriptionStatus, {
      stripeSubscriptionId: subscriptionId,
      status: cancelImmediately ? "cancelled" : "active",
      cancelAtPeriodEnd: !cancelImmediately,
      endDate: cancelImmediately ? new Date().toISOString() : undefined,
    });

    return NextResponse.json({
      success: true,
      message: cancelImmediately
        ? "Subscription cancelled immediately"
        : "Subscription will cancel at the end of the billing period",
    });
  } catch (error) {
    console.error("Error cancelling subscription:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
