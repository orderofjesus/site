import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Stripe } from "stripe";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    console.error("Missing stripe-signature header");
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 },
    );
  }

  console.log(`Received webhook: ${event.type}`);

  try {
    switch (event.type) {
      case "customer.subscription.created":
        await handleSubscriptionCreated(
          event.data.object as Stripe.Subscription,
        );
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        );
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription,
        );
        break;

      case "customer.subscription.trial_will_end":
        await handleTrialWillEnd(event.data.object as Stripe.Subscription);
        break;

      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case "checkout.session.completed":
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;

      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(
          event.data.object as Stripe.PaymentIntent,
        );
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log("Subscription created:", subscription.id);

  const metadata = subscription.metadata;
  if (!metadata.userEmail || !metadata.planType) {
    console.error("Missing required metadata in subscription");
    return;
  }

  // The subscription should already be created in the create-subscription endpoint
  // This webhook serves as a confirmation
  await convex.mutation(api.subscriptions.updateSubscriptionStatus, {
    stripeSubscriptionId: subscription.id,
    status: subscription.status === "trialing" ? "trial" : "active",
  });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log("Subscription updated:", subscription.id);

  let status: "active" | "cancelled" | "expired" | "trial" | "past_due";

  switch (subscription.status) {
    case "active":
      status = "active";
      break;
    case "canceled":
      status = "cancelled";
      break;
    case "incomplete_expired":
    case "unpaid":
      status = "expired";
      break;
    case "trialing":
      status = "trial";
      break;
    case "past_due":
      status = "past_due";
      break;
    default:
      status = "expired";
  }

  await convex.mutation(api.subscriptions.updateSubscriptionStatus, {
    stripeSubscriptionId: subscription.id,
    status,
    endDate: subscription.canceled_at
      ? new Date(subscription.canceled_at * 1000).toISOString()
      : undefined,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log("Subscription deleted:", subscription.id);

  await convex.mutation(api.subscriptions.updateSubscriptionStatus, {
    stripeSubscriptionId: subscription.id,
    status: "cancelled",
    endDate: new Date().toISOString(),
  });
}

async function handleTrialWillEnd(subscription: Stripe.Subscription) {
  console.log("Trial will end:", subscription.id);

  // Here you would typically send an email notification
  // For now, we'll just log it
  const trialEnd = subscription.trial_end
    ? new Date(subscription.trial_end * 1000)
    : null;

  console.log(`Trial ends on: ${trialEnd?.toISOString()}`);

  // You could add email notification logic here
  // await sendTrialEndingEmail(subscription.metadata.userEmail, trialEnd);
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log("Payment succeeded:", invoice.id);

  // Access subscription property safely (Stripe types can be strict)
  const subscription = (
    invoice as Stripe.Invoice & { subscription?: string | Stripe.Subscription }
  ).subscription;

  const subscriptionId =
    typeof subscription === "string" ? subscription : subscription?.id;

  if (subscriptionId) {
    // This is a subscription payment
    await convex.mutation(api.subscriptions.updateSubscriptionStatus, {
      stripeSubscriptionId: subscriptionId,
      status: "active",
    });
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log("Payment failed:", invoice.id);

  // Access subscription property safely (Stripe types can be strict)
  const subscription = (
    invoice as Stripe.Invoice & { subscription?: string | Stripe.Subscription }
  ).subscription;

  const subscriptionId =
    typeof subscription === "string" ? subscription : subscription?.id;

  if (subscriptionId) {
    // This is a subscription payment failure
    await convex.mutation(api.subscriptions.updateSubscriptionStatus, {
      stripeSubscriptionId: subscriptionId,
      status: "past_due",
    });

    // Here you would typically send a payment failed email
    // await sendPaymentFailedEmail(customerEmail);
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log("Checkout completed:", session.id);

  const metadata = session.metadata;
  if (!metadata || metadata.purchaseType !== "individual_content") {
    return;
  }

  if (!metadata.userId || !metadata.userEmail || !metadata.contentId) {
    console.error("Missing required metadata in checkout session");
    return;
  }

  // Record the individual content purchase
  await convex.mutation(api.subscriptions.recordContentPurchase, {
    userId: metadata.userId,
    userEmail: metadata.userEmail,
    contentId: metadata.contentId,
    contentTitle: metadata.contentTitle || "Unknown Content",
    contentType:
      (metadata.contentType as "video" | "course" | "bundle") || "video",
    price: session.amount_total || 0,
    stripePaymentIntentId: session.payment_intent as string,
  });
}

async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent,
) {
  console.log("Payment intent succeeded:", paymentIntent.id);

  // This handles successful one-time payments
  // Additional logic can be added here for tracking successful payments
}
