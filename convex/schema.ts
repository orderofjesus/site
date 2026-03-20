import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  events: defineTable({
    title: v.string(),
    subtitle: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    address: v.string(),
    category: v.string(),
    attendees: v.string(),
    pricing: v.object({
      type: v.string(), // "Free" or "Paid"
      general: v.string(), // Display price (e.g., "$99" or "Free")
      regular: v.union(v.string(), v.null()),
      discounted: v.union(v.string(), v.null()),
    }),
    description: v.string(),
    fullDescription: v.string(),
    image: v.string(),
    schedule: v.array(
      v.object({
        time: v.string(),
        activity: v.string(),
      }),
    ),
    whatToExpect: v.array(v.string()),
    whatToBring: v.array(v.string()),
    pricingDetails: v.any(),
    registrationCount: v.number(),
    maxCapacity: v.optional(v.number()),
  })
    .index("by_category", ["category"])
    .index("by_date", ["date"]),

  eventRegistrations: defineTable({
    eventId: v.id("events"),
    userEmail: v.string(),
    userName: v.optional(v.string()),
    phone: v.optional(v.string()),
    registeredAt: v.number(),
    status: v.union(
      v.literal("registered"),
      v.literal("cancelled"),
      v.literal("attended"),
      v.literal("no-show"),
    ),
    ticketType: v.optional(v.string()),
    notes: v.optional(v.string()),
    numberOfPeople: v.optional(v.number()),
    paymentStatus: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("completed"),
        v.literal("failed"),
      ),
    ),
  })
    .index("by_user", ["userEmail"])
    .index("by_event", ["eventId"])
    .index("by_user_and_event", ["userEmail", "eventId"])
    .index("by_status", ["status"]),

  userProfiles: defineTable({
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phone: v.optional(v.string()),
    profilePictureUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  schoolEnrollments: defineTable({
    userEmail: v.string(),
    schoolName: v.string(), // "Mystical Masterclass" or "Open Scroll"
    enrolledAt: v.number(),
    status: v.union(
      v.literal("active"),
      v.literal("completed"),
      v.literal("cancelled"),
    ),
    progress: v.optional(v.number()), // 0-100
    notes: v.optional(v.string()),
  })
    .index("by_user", ["userEmail"])
    .index("by_school", ["schoolName"])
    .index("by_user_and_school", ["userEmail", "schoolName"]),

  mentorshipEnrollments: defineTable({
    userEmail: v.string(),
    programType: v.string(), // "one-on-one" or "elijah-network"
    enrolledAt: v.number(),
    status: v.union(
      v.literal("active"),
      v.literal("completed"),
      v.literal("on-hold"),
      v.literal("cancelled"),
    ),
    mentorEmail: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    notes: v.optional(v.string()),
    completedSessions: v.optional(v.number()),
    totalSessions: v.optional(v.number()),
    graceTokensRemaining: v.optional(v.number()),
    graceTokensUsed: v.optional(
      v.object({
        month1: v.number(),
        month2: v.number(),
      }),
    ),
    paymentStatus: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("completed"),
        v.literal("refunded"),
      ),
    ),
    stripePaymentIntentId: v.optional(v.string()),
    eventId: v.optional(v.id("events")),
    eventRegistrationId: v.optional(v.id("eventRegistrations")),
  })
    .index("by_user", ["userEmail"])
    .index("by_program", ["programType"])
    .index("by_mentor", ["mentorEmail"]),

  // Subscription Management Tables
  subscriptions: defineTable({
    userId: v.string(),
    userEmail: v.string(), // For easy lookup
    planType: v.union(
      v.literal("brass"),
      v.literal("gold"),
      v.literal("platinum"),
    ),
    status: v.union(
      v.literal("active"),
      v.literal("cancelled"),
      v.literal("expired"),
      v.literal("trial"),
      v.literal("past_due"),
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
    .index("by_status", ["status"])
    .index("by_plan_type", ["planType"]),

  individualPurchases: defineTable({
    userId: v.string(),
    userEmail: v.string(),
    contentId: v.string(), // ID of video/course purchased
    contentType: v.union(
      v.literal("video"),
      v.literal("course"),
      v.literal("bundle"),
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
    .index("by_email", ["userEmail"])
    .index("by_purchase_date", ["purchaseDate"]),

  contentLibrary: defineTable({
    title: v.string(),
    description: v.string(),
    contentType: v.union(
      v.literal("video"),
      v.literal("course"),
      v.literal("bundle"),
    ),
    school: v.union(
      v.literal("mystical-masterclass"),
      v.literal("open-scroll"),
      v.literal("general"),
    ),
    videoUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    duration: v.optional(v.number()), // Duration in seconds
    previewDuration: v.optional(v.number()), // Free preview duration
    price: v.number(), // Individual purchase price in cents
    isSubscriberOnly: v.boolean(), // Requires subscription
    orderIndex: v.optional(v.number()), // For course ordering
    parentCourseId: v.optional(v.id("contentLibrary")), // For videos in courses
    resources: v.optional(
      v.array(
        v.object({
          name: v.string(),
          url: v.string(),
          type: v.string(), // "pdf", "audio", "worksheet", etc.
        }),
      ),
    ),
    tags: v.optional(v.array(v.string())),
    isPublished: v.boolean(),
    publishedAt: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_school", ["school"])
    .index("by_type", ["contentType"])
    .index("by_published", ["isPublished"])
    .index("by_parent_course", ["parentCourseId"]),

  userContentAccess: defineTable({
    userId: v.string(),
    userEmail: v.string(),
    contentId: v.id("contentLibrary"),
    accessType: v.union(
      v.literal("subscription"),
      v.literal("purchase"),
      v.literal("trial"),
      v.literal("free"),
    ),
    grantedAt: v.string(),
    expiresAt: v.optional(v.string()), // null for permanent access
    lastAccessedAt: v.optional(v.string()),
    progressPercentage: v.optional(v.number()), // 0-100
    completedAt: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_content", ["contentId"])
    .index("by_email", ["userEmail"])
    .index("by_access_type", ["accessType"])
    .index("by_user_and_content", ["userId", "contentId"]),

  subscriptionUsage: defineTable({
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
    .index("by_month", ["month"])
    .index("by_user", ["userId"]),
});

export default schema;
