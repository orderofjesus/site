# Stripe Integration Plan for Subscription System

## 🎯 Overview
This document outlines the complete Stripe integration strategy for implementing subscription-based access to Mystical Masterclass and Open Scroll content.

## 🔧 Stripe Setup Requirements

### 1. Stripe Account Configuration
```bash
# Install Stripe dependencies
npm install stripe @stripe/stripe-js

# Environment variables needed
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 2. Stripe Products & Prices Setup
```javascript
// Create products in Stripe Dashboard or via API
const products = {
  allAccess: {
    name: "All-Access Spiritual Learning",
    description: "Access to all courses and content",
    prices: {
      monthly: "$150/month",
      yearly: "$1440/year"
    }
  },
  mysticalMasterclass: {
    name: "Mystical Masterclass",
    description: "Deep spiritual teachings and practices", 
    prices: {
      monthly: "$75/month",
      yearly: "$720/year"
    }
  },
  openScroll: {
    name: "Open Scroll",
    description: "Prophetic insights and revelations",
    prices: {
      monthly: "$75/month", 
      yearly: "$720/year"
    }
  }
};
```

## 🌐 API Endpoints Structure

### 1. Subscription Management Endpoints
```typescript
// app/api/stripe/create-subscription/route.ts
export async function POST(request: Request) {
  // Create Stripe customer and subscription
  // Return client secret for payment confirmation
}

// app/api/stripe/cancel-subscription/route.ts  
export async function POST(request: Request) {
  // Cancel subscription at period end
  // Update Convex database
}

// app/api/stripe/update-subscription/route.ts
export async function POST(request: Request) {
  // Upgrade/downgrade subscription
  // Handle proration
}
```

### 2. Individual Purchase Endpoints
```typescript
// app/api/stripe/purchase-content/route.ts
export async function POST(request: Request) {
  // Create one-time payment for content
  // Grant immediate access upon success
}

// app/api/stripe/webhooks/route.ts
export async function POST(request: Request) {
  // Handle all Stripe webhook events
  // Update Convex database accordingly
}
```

## 🔄 Webhook Event Handling

### Critical Webhook Events
1. **customer.subscription.created** - New subscription
2. **customer.subscription.updated** - Plan changes
3. **customer.subscription.deleted** - Cancellation
4. **invoice.payment_succeeded** - Successful billing
5. **invoice.payment_failed** - Failed payment
6. **customer.subscription.trial_will_end** - Trial ending soon

### Webhook Security
```typescript
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature')!;
  
  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response('Webhook signature verification failed', { status: 400 });
  }
  
  // Handle event
  await handleWebhookEvent(event);
  
  return new Response('OK');
}
```

## 💳 Payment Flow Implementation

### Subscription Creation Flow
1. **User selects plan** → Frontend shows pricing options
2. **Collect payment method** → Stripe Elements integration
3. **Create customer & subscription** → Backend API call
4. **Handle 3D Secure** → Frontend payment confirmation
5. **Grant access** → Convex database update
6. **Redirect to dashboard** → Success page with access

### Individual Purchase Flow  
1. **User clicks "Buy Now"** → Content purchase button
2. **Create payment intent** → Backend API call
3. **Collect payment** → Stripe Elements checkout
4. **Confirm payment** → Frontend confirmation
5. **Grant immediate access** → Convex update
6. **Redirect to content** → Direct access granted

## 🎨 Frontend Integration

### Stripe Elements Setup
```typescript
// lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
```

### Payment Component Structure
```tsx
// components/subscription/SubscriptionCheckout.tsx
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';

export function SubscriptionCheckout({ planType, billingCycle }) {
  const [clientSecret, setClientSecret] = useState('');
  
  // Create subscription on component mount
  useEffect(() => {
    createSubscription(planType, billingCycle)
      .then(({ clientSecret }) => setClientSecret(clientSecret));
  }, [planType, billingCycle]);
  
  if (!clientSecret) return <LoadingSpinner />;
  
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
```

## 📊 Billing & Usage Tracking

### Subscription Analytics
```typescript
// Track key metrics in Convex
export const getSubscriptionAnalytics = query({
  handler: async (ctx) => {
    const activeSubscriptions = await ctx.db
      .query("subscriptions")
      .filter(q => q.eq(q.field("status"), "active"))
      .collect();
      
    const monthlyRevenue = activeSubscriptions
      .filter(sub => sub.billingCycle === "monthly")
      .reduce((sum, sub) => sum + sub.price, 0);
      
    const yearlyRevenue = activeSubscriptions
      .filter(sub => sub.billingCycle === "yearly") 
      .reduce((sum, sub) => sum + (sub.price / 12), 0);
      
    return {
      totalActiveSubscriptions: activeSubscriptions.length,
      monthlyRecurringRevenue: monthlyRevenue + yearlyRevenue,
      churnRate: await calculateChurnRate(ctx),
      averageLifetimeValue: await calculateLTV(ctx),
    };
  },
});
```

## 🔒 Security Considerations

### Data Protection
- **PCI Compliance** - Never store card details (Stripe handles this)
- **Webhook Verification** - Always verify webhook signatures
- **User Authentication** - Protect subscription management endpoints
- **Rate Limiting** - Prevent abuse of payment endpoints

### Error Handling
```typescript
// Comprehensive error handling for payments
try {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    trial_period_days: 7,
  });
} catch (error) {
  if (error.type === 'StripeCardError') {
    // Card was declined
    return { error: 'Your card was declined.' };
  } else if (error.type === 'StripeInvalidRequestError') {
    // Invalid parameters
    return { error: 'Invalid request. Please try again.' };
  } else {
    // Other errors
    return { error: 'Something went wrong. Please contact support.' };
  }
}
```

## 🚀 Deployment Checklist

### Pre-Launch
- ✅ Stripe account verified and activated
- ✅ Products and prices configured
- ✅ Webhook endpoints set up and tested
- ✅ Payment flows tested in test mode
- ✅ Database schema deployed
- ✅ Error handling implemented

### Go-Live
- ✅ Switch to live Stripe keys
- ✅ Update webhook endpoints to production URLs
- ✅ Test real payment flows
- ✅ Monitor webhook delivery
- ✅ Set up subscription analytics dashboard

### Post-Launch Monitoring
- ✅ Failed payment alerts
- ✅ Webhook failure notifications  
- ✅ Subscription churn tracking
- ✅ Revenue monitoring
- ✅ Customer success metrics

## 📈 Future Enhancements

### Advanced Features
- **Dunning Management** - Smart failed payment retry
- **Proration Logic** - Mid-cycle plan changes
- **Usage-Based Billing** - Pay per content consumed
- **Subscription Pausing** - Temporary account holds
- **Family Plans** - Multiple users per subscription
- **Corporate Accounts** - Bulk subscriptions

### Integration Opportunities
- **Customer Support** - Intercom/Zendesk integration
- **Email Marketing** - Mailchimp/ConvertKit for retention
- **Analytics** - Mixpanel/Amplitude for user behavior
- **Accounting** - QuickBooks/Xero for financial reporting

This integration plan provides a solid foundation for launching subscription-based content access while maintaining security, user experience, and business intelligence capabilities.