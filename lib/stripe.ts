import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the Stripe object on every render.
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Stripe price IDs for different subscription plans
export const STRIPE_PRICE_IDS = {
  allAccess: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_ALL_ACCESS_MONTHLY_PRICE_ID!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_ALL_ACCESS_YEARLY_PRICE_ID!,
  },
  mysticalMasterclass: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_MYSTICAL_MONTHLY_PRICE_ID!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_MYSTICAL_YEARLY_PRICE_ID!,
  },
  openScroll: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_OPEN_SCROLL_MONTHLY_PRICE_ID!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_OPEN_SCROLL_YEARLY_PRICE_ID!,
  },
} as const;

// Plan configuration for UI display
export const SUBSCRIPTION_PLANS = {
  'mystical-masterclass': {
    name: 'Mystical Masterclass',
    description: 'Deep spiritual teachings and mystical practices',
    monthly: { price: 7500, display: '$75' }, // prices in cents
    yearly: { price: 72000, display: '$720' },
  },
  'open-scroll': {
    name: 'Open Scroll',
    description: 'Prophetic insights and revelations',
    monthly: { price: 7500, display: '$75' },
    yearly: { price: 72000, display: '$720' },
  },
  'all-access': {
    name: 'All-Access Pass',
    description: 'Complete access to all spiritual content',
    monthly: { price: 15000, display: '$150' },
    yearly: { price: 144000, display: '$1,440' },
  },
} as const;

export type PlanType = keyof typeof SUBSCRIPTION_PLANS;
export type BillingCycle = 'monthly' | 'yearly';