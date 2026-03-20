import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the Stripe object on every render.
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

// Stripe price IDs for different subscription plans
export const STRIPE_PRICE_IDS = {
  brass: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_BRASS_MONTHLY_PRICE_ID!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_BRASS_YEARLY_PRICE_ID!,
  },
  gold: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_GOLD_MONTHLY_PRICE_ID!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_GOLD_YEARLY_PRICE_ID!,
  },
  platinum: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PLATINUM_MONTHLY_PRICE_ID!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_PLATINUM_YEARLY_PRICE_ID!,
  },
} as const;

// Plan configuration for UI display
export const SUBSCRIPTION_PLANS = {
  brass: {
    name: "Brass",
    subtitle: "Foundations",
    description: "Enter the world. Learn the language. Awaken curiosity.",
    features: [
      "Mystical Masterclass Archive",
      "Open Scroll Library Access",
      "Bonus Podcast Content",
      "Monthly New Content",
      "Downloadable Study Guides",
    ],
    trialDays: 7,
    monthly: { price: 7500, display: "$75" },
    yearly: { price: 72000, display: "$720" },
  },
  gold: {
    name: "Gold",
    subtitle: "Inner Circle",
    description:
      "Step beyond learning. Enter practice, guidance, and communion.",
    features: [
      "Everything in Brass",
      "Weekly Live Q&A Calls",
      "Guided Meditations",
      "Live Interactive Workshops",
      "Exclusive Series",
      "Early Content Access",
    ],
    trialDays: 7,
    monthly: { price: 15000, display: "$150" },
    yearly: { price: 144000, display: "$1,440" },
  },
  platinum: {
    name: "Platinum",
    subtitle: "Infinite Depth",
    description: "The ultimate spiritual depth and direct engagement.",
    features: [
      "Everything in Gold",
      "One-Time Private Sessions",
      "Locked Access Content",
      "Uncut Depth Archives",
      "Priority Support",
      "Direct Mentor Access",
    ],
    trialDays: 7,
    monthly: { price: 25000, display: "$250" },
    yearly: { price: 240000, display: "$2,400" },
  },
} as const;

export type PlanType = keyof typeof SUBSCRIPTION_PLANS;
export type BillingCycle = "monthly" | "yearly";
