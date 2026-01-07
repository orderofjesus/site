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

    const { contentId, successUrl, cancelUrl } = await request.json();

    if (!contentId) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 },
      );
    }

    // Get content details from Convex
    const content = await convex.query(api.subscriptions.getContentById, {
      contentId,
    });

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    // Check if user already has access to this content
    const accessCheck = await convex.query(
      api.subscriptions.canUserAccessContent,
      {
        userEmail: user.email,
        contentId,
      },
    );

    if (accessCheck.canAccess) {
      return NextResponse.json(
        { error: "You already have access to this content" },
        { status: 400 },
      );
    }

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

    // Create Stripe Checkout Session for one-time payment
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: content.title,
              description: content.description,
              metadata: {
                contentId: content._id,
                contentType: content.contentType,
                school: content.school,
              },
            },
            unit_amount: content.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:
        successUrl ||
        `${process.env.NEXT_PUBLIC_SITE_URL}/content/${contentId}?purchase=success`,
      cancel_url:
        cancelUrl ||
        `${process.env.NEXT_PUBLIC_SITE_URL}/content/${contentId}?purchase=cancelled`,
      metadata: {
        userId: user.id,
        userEmail: user.email,
        contentId: content._id,
        contentType: content.contentType,
        contentTitle: content.title,
        purchaseType: "individual_content",
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Error creating content purchase:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
