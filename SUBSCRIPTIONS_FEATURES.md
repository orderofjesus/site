# Subscription Features for Schools & Learning Platform

## 🎯 Overview
Transform the schools (Mystical Masterclass, Open Scroll) from one-time purchases to a subscription-based learning platform with hybrid purchasing options.

## 💰 Pricing Strategy

### Subscription Tiers
1. **All-Access Pass** - $150/month
   - Full access to all schools and content
   - New releases included
   - Priority support
   - Live Q&A sessions
   - Downloadable resources
   - Exclusive subscriber-only content

2. **Individual School** - $75/month per school
   - Access to one specific school (Mystical Masterclass OR Open Scroll)
   - All content within that school
   - Updates and new lessons included
   - School-specific resources

3. **Annual Plans** (20% discount)
   - All-Access: $1,440/year ($120/month effective)
   - Single School: $720/year ($60/month effective)

### Individual Purchases
1. **Single Videos** - $25-50 per video
   - Permanent access to specific lessons
   - Good for trying before subscribing
   - Can upgrade to subscription later (credit applied)
   - Includes video notes and resources

2. **Course Bundles** - $200-300 per complete course
   - Access to full course series
   - Includes worksheets and resources
   - No monthly commitment
   - Lifetime access guarantee

## 🏗️ Technical Implementation

### Database Schema Changes

#### New Tables for Convex Schema

```typescript
// convex/schema.ts additions

export const subscriptions = defineTable({
  userId: v.string(),
  userEmail: v.string(), // For easy lookup
  planType: v.union(
    v.literal("all-access"),
    v.literal("mystical-masterclass"), 
    v.literal("open-scroll")
  ),
  status: v.union(
    v.literal("active"),
    v.literal("cancelled"),
    v.literal("expired"),
    v.literal("trial"),
    v.literal("past_due")
  ),
  startDate: v.string(), // ISO date string
  endDate: v.optional(v.string()), // ISO date string, null for ongoing
  billingCycle: v.union(v.literal("monthly"), v.literal("yearly")),
  price: v.number(), // Price in cents
  stripeSubscriptionId: v.string(), // Stripe subscription ID
  stripeCustomerId: v.string(), // Stripe customer ID
  trialEndsAt: v.optional(v.string()), // For free trials
  cancelAtPeriodEnd: v.optional(v.boolean()),
  createdAt: v.string(),
  updatedAt: v.string(),
})
.index("by_user", ["userId"])
.index("by_email", ["userEmail"])
.index("by_stripe_subscription", ["stripeSubscriptionId"])
.index("by_status", ["status"]);

export const individualPurchases = defineTable({
  userId: v.string(),
  userEmail: v.string(),
  contentId: v.string(), // ID of video/course purchased
  contentType: v.union(
    v.literal("video"),
    v.literal("course"),
    v.literal("bundle")
  ),
  contentTitle: v.string(),
  purchaseDate: v.string(),
  price: v.number(), // Price in cents
  stripePaymentIntentId: v.string(),
  accessExpirationDate: v.optional(v.string()), // null for permanent
  isRefunded: v.optional(v.boolean()),
  createdAt: v.string(),
})
.index("by_user", ["userId"])
.index("by_content", ["contentId"])
.index("by_email", ["userEmail"]);

export const contentLibrary = defineTable({
  title: v.string(),
  description: v.string(),
  contentType: v.union(
    v.literal("video"),
    v.literal("course"),
    v.literal("bundle")
  ),
  school: v.union(
    v.literal("mystical-masterclass"),
    v.literal("open-scroll"),
    v.literal("general")
  ),
  videoUrl: v.optional(v.string()),
  thumbnailUrl: v.optional(v.string()),
  duration: v.optional(v.number()), // Duration in seconds
  previewDuration: v.optional(v.number()), // Free preview duration
  price: v.number(), // Individual purchase price in cents
  isSubscriberOnly: v.boolean(), // Requires subscription
  orderIndex: v.optional(v.number()), // For course ordering
  parentCourseId: v.optional(v.id("contentLibrary")), // For videos in courses
  resources: v.optional(v.array(v.object({
    name: v.string(),
    url: v.string(),
    type: v.string() // "pdf", "audio", "worksheet", etc.
  }))),
  tags: v.optional(v.array(v.string())),
  isPublished: v.boolean(),
  publishedAt: v.optional(v.string()),
  createdAt: v.string(),
  updatedAt: v.string(),
})
.index("by_school", ["school"])
.index("by_type", ["contentType"])
.index("by_published", ["isPublished"]);

export const userContentAccess = defineTable({
  userId: v.string(),
  userEmail: v.string(),
  contentId: v.id("contentLibrary"),
  accessType: v.union(
    v.literal("subscription"),
    v.literal("purchase"),
    v.literal("trial")
  ),
  grantedAt: v.string(),
  expiresAt: v.optional(v.string()), // null for permanent access
  lastAccessedAt: v.optional(v.string()),
  progressPercentage: v.optional(v.number()), // 0-100
  completedAt: v.optional(v.string()),
})
.index("by_user", ["userId"])
.index("by_content", ["contentId"])
.index("by_access_type", ["accessType"]);

export const subscriptionUsage = defineTable({
  subscriptionId: v.id("subscriptions"),
  userId: v.string(),
  month: v.string(), // "2024-01" format
  contentViewsCount: v.number(),
  totalWatchTime: v.number(), // Total minutes watched
  uniqueContentAccessed: v.number(),
  downloadCount: v.number(),
  createdAt: v.string(),
})
.index("by_subscription", ["subscriptionId"])
.index("by_month", ["month"]);
```

### Access Control Logic

```typescript
// Pseudocode for content access checking
async function userCanAccessContent(userId: string, contentId: string): Promise<boolean> {
  // 1. Check if user has active subscription covering this content
  const activeSubscription = await getActiveSubscription(userId);
  if (activeSubscription && subscriptionCoversContent(activeSubscription, contentId)) {
    return true;
  }
  
  // 2. Check if user purchased this specific content
  const purchase = await getContentPurchase(userId, contentId);
  if (purchase && !purchase.isRefunded && !isExpired(purchase)) {
    return true;
  }
  
  // 3. Check if content is free or in trial period
  const content = await getContent(contentId);
  if (!content.isSubscriberOnly) {
    return true;
  }
  
  return false;
}
```

## 🎨 User Experience Features

### Subscription Management Dashboard
- **Current Plan Overview** - Active subscription details and billing info
- **Usage Statistics** - Content consumed, watch time, progress tracking
- **Billing History** - Download invoices and payment history
- **Plan Management** - Upgrade/downgrade with prorated billing
- **Auto-renewal Settings** - Control subscription renewal
- **Cancel/Pause Options** - Self-service subscription management

### Content Discovery & Access
- **Smart Paywall** - Show preview with clear upgrade options
- **Learning Paths** - Curated content journeys for subscribers
- **Progress Tracking** - Cross-content completion tracking
- **Bookmark System** - Save favorite moments and content
- **Download Manager** - Offline content for subscribers
- **Watch History** - Resume where you left off across devices

### Purchase Flow Optimization
```
User encounters premium content:
├── Free Preview Available → Watch first 5 minutes
├── Already Has Access → Enter content immediately
└── Needs Purchase → Smart recommendation:
    ├── "Subscribe for $150/month - Access everything!"
    ├── "Buy this course for $250 - Own forever"
    └── "Try this video for $35 - Good for testing"
```

## 🔄 Migration Strategy

### Existing Paid Users
- **Grandfathered Access** - Permanent access to previously purchased content
- **Loyalty Credits** - Previous purchases count toward first subscription month
- **VIP Upgrade Path** - Special pricing for early adopters
- **Content Transfer** - Ensure all existing access is maintained

### New User Onboarding
- **7-Day Free Trial** - Full access to All-Access tier
- **Onboarding Journey** - Guided tour of available schools and content
- **Personalization** - Setup interests and learning goals
- **First Success** - Ensure users complete at least one piece of content

## 📊 Business Benefits

### Revenue Model Advantages
- **Predictable Income** - Monthly recurring revenue vs sporadic purchases
- **Higher Lifetime Value** - Subscribers typically spend 3-5x more
- **Reduced Sales Friction** - Once subscribed, no purchase barriers
- **Upselling Opportunities** - Easy to promote new content and tiers

### Content Strategy Benefits
- **Sustainable Creation** - Predictable revenue justifies ongoing production
- **Series Development** - Multi-part courses work perfectly with subscriptions
- **Community Building** - Subscriber-only features increase retention
- **Data-Driven Content** - Usage analytics guide content creation

## 🛠️ Stripe Integration Plan

### Stripe Products Setup
```typescript
// Stripe product configuration
const stripeProducts = {
  allAccess: {
    monthly: { priceId: "price_xxx", amount: 15000 }, // $150.00
    yearly: { priceId: "price_yyy", amount: 144000 }   // $1,440.00
  },
  mysticalMasterclass: {
    monthly: { priceId: "price_zzz", amount: 7500 },  // $75.00
    yearly: { priceId: "price_aaa", amount: 72000 }   // $720.00
  },
  openScroll: {
    monthly: { priceId: "price_bbb", amount: 7500 },  // $75.00
    yearly: { priceId: "price_ccc", amount: 72000 }   // $720.00
  }
};
```

### Webhook Handling
- **subscription.created** - Create subscription record in Convex
- **subscription.updated** - Update subscription status/plan
- **subscription.deleted** - Handle cancellations
- **invoice.payment_succeeded** - Confirm successful billing
- **invoice.payment_failed** - Handle failed payments
- **customer.subscription.trial_will_end** - Send trial ending notifications

### Payment Processing Flow
1. **Customer Creation** - Create Stripe customer on first purchase/subscription
2. **Payment Method** - Securely collect and store payment methods
3. **Subscription Creation** - Initialize subscription with trial period
4. **Immediate Access** - Grant content access upon successful setup
5. **Billing Cycle** - Automatic recurring charges
6. **Failed Payment Handling** - Retry logic and grace periods

## 🚀 Implementation Phases

### Phase 1: Core Subscription System (3-4 weeks)
- ✅ Stripe integration setup
- ✅ Basic subscription management
- ✅ Content access control
- ✅ Simple billing dashboard
- ✅ Free trial implementation

### Phase 2: Enhanced User Experience (2-3 weeks)
- ✅ Advanced subscription management UI
- ✅ Content preview system
- ✅ Progress tracking across content
- ✅ Mobile-optimized subscription flows
- ✅ Download functionality for subscribers

### Phase 3: Business Intelligence (3-4 weeks)
- ✅ Analytics and reporting dashboard
- ✅ Content recommendation engine
- ✅ Churn prediction and prevention
- ✅ Advanced billing features (prorating, credits)
- ✅ Customer success automation

### Phase 4: Growth & Optimization (Ongoing)
- ✅ A/B testing for pricing and flows
- ✅ Advanced retention campaigns
- ✅ Referral and affiliate programs
- ✅ Enterprise/bulk subscription options
- ✅ Advanced content personalization

## 📈 Success Metrics & KPIs

### Revenue Metrics
- **Monthly Recurring Revenue (MRR)** - Primary growth indicator
- **Annual Recurring Revenue (ARR)** - Year-over-year growth
- **Average Revenue Per User (ARPU)** - Revenue efficiency
- **Customer Lifetime Value (CLV)** - Long-term value prediction
- **Monthly Growth Rate** - Subscription growth velocity

### Engagement Metrics
- **Churn Rate** - Monthly subscription cancellations (target: <5%)
- **Content Engagement** - Hours watched per subscriber per month
- **Completion Rates** - Percentage of content finished
- **Feature Adoption** - Usage of downloads, bookmarks, etc.
- **Trial Conversion** - Free trial to paid conversion (target: >15%)

### Content Performance
- **Most Popular Content** - What drives subscription renewals
- **Content Drop-off Points** - Where users stop engaging
- **Search and Discovery** - How users find content
- **Subscriber vs Purchase Preference** - Content consumption patterns

## 🔒 Business & Legal Considerations

### Subscription Terms
- **Clear Cancellation Policy** - Easy cancellation with appropriate notice
- **Transparent Billing** - No hidden fees or surprise charges
- **Prorated Refunds** - Fair refund policy for mid-cycle cancellations
- **Content Access Rights** - What happens to content after cancellation

### Data Protection & Privacy
- **Payment Data Security** - PCI compliance for stored payment methods
- **Usage Analytics** - Anonymized data collection with opt-out options
- **GDPR/CCPA Compliance** - Right to deletion and data portability
- **Content Protection** - DRM and access control measures

### Risk Management
- **Churn Prevention** - Early warning systems and retention campaigns
- **Payment Fraud** - Fraud detection and prevention measures
- **Content Piracy** - Digital rights management and access controls
- **Service Continuity** - Backup systems and disaster recovery plans

## 💡 Advanced Features (Future Considerations)

### Community Features for Subscribers
- **Subscriber Forums** - Exclusive discussion areas
- **Live Q&A Sessions** - Monthly subscriber-only calls
- **Study Groups** - Collaborative learning experiences
- **Mentorship Matching** - Connect subscribers with mentors

### Enterprise/Group Options
- **Family Plans** - Multiple users under one subscription
- **Church Group Subscriptions** - Bulk pricing for congregations
- **Student Discounts** - Reduced pricing for students/seniors
- **Gift Subscriptions** - Purchase subscriptions for others

### Content Expansion
- **Interactive Content** - Quizzes, assessments, and certificates
- **Live Streaming** - Real-time content for subscribers
- **Offline Mobile App** - Download content for offline viewing
- **Multi-language Support** - Content in multiple languages

---

This comprehensive subscription model transforms your ministry platform into a sustainable, engaging learning ecosystem that serves both casual learners and committed students while providing predictable revenue for continued content creation and ministry growth.