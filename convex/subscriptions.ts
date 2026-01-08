import { v } from "convex/values";
import { mutation, query, MutationCtx } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { Id } from "./_generated/dataModel";

// Stripe Integration Functions for Subscription Management

/**
 * Get user's active subscription
 */
export const getUserActiveSubscription = query({
  args: { userEmail: v.string() },
  handler: async (ctx, { userEmail }) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_email", (q) => q.eq("userEmail", userEmail))
      .filter((q) => q.eq(q.field("status"), "active"))
      .first();

    return subscription;
  },
});

/**
 * Get all user subscriptions (for billing history)
 */
export const getUserSubscriptions = query({
  args: { userEmail: v.string() },
  handler: async (ctx, { userEmail }) => {
    const subscriptions = await ctx.db
      .query("subscriptions")
      .withIndex("by_email", (q) => q.eq("userEmail", userEmail))
      .collect();

    return subscriptions.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  },
});

/**
 * Create a new subscription (called from Stripe webhook)
 */
export const createSubscription = mutation({
  args: {
    userId: v.string(),
    userEmail: v.string(),
    planType: v.union(
      v.literal("all-access"),
      v.literal("mystical-masterclass"),
      v.literal("open-scroll"),
    ),
    billingCycle: v.union(v.literal("monthly"), v.literal("yearly")),
    price: v.number(),
    stripeSubscriptionId: v.string(),
    stripeCustomerId: v.string(),
    startDate: v.string(),
    trialEndsAt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();

    // Cancel any existing active subscriptions for this user
    const existingSubscriptions = await ctx.db
      .query("subscriptions")
      .withIndex("by_email", (q) => q.eq("userEmail", args.userEmail))
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();

    for (const sub of existingSubscriptions) {
      await ctx.db.patch(sub._id, {
        status: "cancelled",
        updatedAt: now,
        cancelAtPeriodEnd: true,
      });
    }

    // Create new subscription
    const subscriptionId = await ctx.db.insert("subscriptions", {
      ...args,
      status: args.trialEndsAt ? "trial" : "active",
      createdAt: now,
      updatedAt: now,
    });

    // Grant content access based on subscription type
    await grantSubscriptionAccess(
      ctx,
      args.userId,
      args.userEmail,
      args.planType,
    );

    return subscriptionId;
  },
});

/**
 * Update subscription status (called from Stripe webhooks)
 */
type UpdateSubscriptionStatusArgs = {
  stripeSubscriptionId: string;
  status: "active" | "cancelled" | "expired" | "trial" | "past_due";
  endDate?: string;
  cancelAtPeriodEnd?: boolean;
};

async function updateSubscriptionStatusImpl(
  ctx: MutationCtx,
  {
    stripeSubscriptionId,
    status,
    endDate,
    cancelAtPeriodEnd,
  }: UpdateSubscriptionStatusArgs,
) {
  const subscription = await ctx.db
    .query("subscriptions")
    .withIndex("by_stripe_subscription", (q) =>
      q.eq("stripeSubscriptionId", stripeSubscriptionId),
    )
    .first();

  if (!subscription) {
    throw new Error(`Subscription not found: ${stripeSubscriptionId}`);
  }

  const now = new Date().toISOString();
  await ctx.db.patch(subscription._id, {
    status,
    endDate,
    cancelAtPeriodEnd,
    updatedAt: now,
  });

  // Handle access changes based on status
  if (status === "cancelled" || status === "expired") {
    await revokeSubscriptionAccess(ctx, subscription.userId);
  } else if (status === "active") {
    await grantSubscriptionAccess(
      ctx,
      subscription.userId,
      subscription.userEmail,
      subscription.planType,
    );
  }

  return subscription._id;
}

export const updateSubscriptionStatus = mutation({
  args: {
    stripeSubscriptionId: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("cancelled"),
      v.literal("expired"),
      v.literal("trial"),
      v.literal("past_due"),
    ),
    endDate: v.optional(v.string()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
  },
  handler: async (ctx, args) =>
    updateSubscriptionStatusImpl(ctx as MutationCtx, args),
});

/**
 * Check if user can access specific content
 */
export const canUserAccessContent = query({
  args: {
    userEmail: v.string(),
    contentId: v.string(),
  },
  handler: async (ctx, { userEmail, contentId }) => {
    // 1. Check if user has active subscription covering this content
    const activeSubscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_email", (q) => q.eq("userEmail", userEmail))
      .filter((q) => q.eq(q.field("status"), "active"))
      .first();

    if (activeSubscription) {
      const content = await ctx.db.get(contentId as Id<"contentLibrary">);
      if (
        content &&
        subscriptionCoversContent(activeSubscription.planType, content.school)
      ) {
        return { canAccess: true, accessType: "subscription" as const };
      }
    }

    // 2. Check if user purchased this specific content
    const purchase = await ctx.db
      .query("individualPurchases")
      .withIndex("by_email", (q) => q.eq("userEmail", userEmail))
      .filter((q) => q.eq(q.field("contentId"), contentId))
      .filter((q) => q.neq(q.field("isRefunded"), true))
      .first();

    if (purchase) {
      const isExpired =
        purchase.accessExpirationDate &&
        new Date(purchase.accessExpirationDate) < new Date();

      if (!isExpired) {
        return { canAccess: true, accessType: "purchase" as const };
      }
    }

    // 3. Check if content is free
    const content = await ctx.db.get(contentId as Id<"contentLibrary">);
    if (content && !content.isSubscriberOnly) {
      return { canAccess: true, accessType: "free" as const };
    }

    return { canAccess: false, accessType: null };
  },
});

/**
 * Check if content is accessible (works without authentication for free content)
 */
export const checkContentAccess = query({
  args: {
    userEmail: v.optional(v.string()),
    contentId: v.string(),
  },
  handler: async (ctx, { userEmail, contentId }) => {
    // Get the content first
    const content = await ctx.db.get(contentId as Id<"contentLibrary">);
    
    if (!content || !content.isPublished) {
      return { canAccess: false, accessType: null, reason: "not_found" };
    }

    // If content is free, anyone can access it
    if (!content.isSubscriberOnly) {
      return { canAccess: true, accessType: "free" as const };
    }

    // If no user email provided and content requires subscription
    if (!userEmail) {
      return { canAccess: false, accessType: null, reason: "authentication_required" };
    }

    // Check if user has active subscription covering this content
    const activeSubscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_email", (q) => q.eq("userEmail", userEmail))
      .filter((q) => q.eq(q.field("status"), "active"))
      .first();

    if (activeSubscription && subscriptionCoversContent(activeSubscription.planType, content.school)) {
      return { canAccess: true, accessType: "subscription" as const };
    }

    // Check if user purchased this specific content
    const purchase = await ctx.db
      .query("individualPurchases")
      .withIndex("by_email", (q) => q.eq("userEmail", userEmail))
      .filter((q) => q.eq(q.field("contentId"), contentId))
      .filter((q) => q.neq(q.field("isRefunded"), true))
      .first();

    if (purchase) {
      const isExpired =
        purchase.accessExpirationDate &&
        new Date(purchase.accessExpirationDate) < new Date();

      if (!isExpired) {
        return { canAccess: true, accessType: "purchase" as const };
      }
    }

    return { canAccess: false, accessType: null, reason: "no_access" };
  },
});

/**
 * Record individual content purchase
 */
export const recordContentPurchase = mutation({
  args: {
    userId: v.string(),
    userEmail: v.string(),
    contentId: v.string(),
    contentTitle: v.string(),
    contentType: v.union(
      v.literal("video"),
      v.literal("course"),
      v.literal("bundle"),
    ),
    price: v.number(),
    stripePaymentIntentId: v.string(),
    accessExpirationDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();

    const purchaseId = await ctx.db.insert("individualPurchases", {
      ...args,
      purchaseDate: now,
      createdAt: now,
    });

    // Grant access to the purchased content
    await ctx.db.insert("userContentAccess", {
      userId: args.userId,
      userEmail: args.userEmail,
      contentId: args.contentId as Id<"contentLibrary">,
      accessType: "purchase",
      grantedAt: now,
      expiresAt: args.accessExpirationDate,
    });

    return purchaseId;
  },
});

/**
 * Get user's content library with access status (paginated)
 */
export const getUserContentLibrary = query({
  args: {
    userEmail: v.string(),
    paginationOpts: paginationOptsValidator,
    filters: v.optional(
      v.object({
        school: v.optional(v.string()),
        searchQuery: v.optional(v.string()),
      }),
    ),
  },
  handler: async (ctx, { userEmail, paginationOpts, filters }) => {
    // Set default pagination - provided by usePaginatedQuery via paginationOpts
    const { numItems, cursor } = paginationOpts;

    // Build base query
    let query = ctx.db
      .query("contentLibrary")
      .filter((q) => q.eq(q.field("isPublished"), true));

    // Apply school filter
    if (filters?.school && filters.school !== "all") {
      query = query.filter((q) => q.eq(q.field("school"), filters.school));
    }

    // Get paginated results
    const result = await query.paginate({
      numItems,
      cursor,
    });

    // Get user access data
    const userAccess = await ctx.db
      .query("userContentAccess")
      .filter((q) => q.eq(q.field("userEmail"), userEmail))
      .collect();

    const activeSubscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_email", (q) => q.eq("userEmail", userEmail))
      .filter((q) => q.eq(q.field("status"), "active"))
      .first();

    // Process content items
    let processedContent = result.page.map((content) => {
      // Check if user has access through subscription or purchase
      const directAccess = userAccess.find(
        (access) =>
          access.contentId === content._id &&
          (!access.expiresAt || new Date(access.expiresAt) > new Date()),
      );

      const subscriptionAccess =
        activeSubscription &&
        subscriptionCoversContent(activeSubscription.planType, content.school);

      return {
        ...content,
        hasAccess: !!(
          directAccess ||
          subscriptionAccess ||
          !content.isSubscriberOnly
        ),
        accessType:
          directAccess?.accessType ||
          (subscriptionAccess ? "subscription" : null),
        progress: directAccess?.progressPercentage || 0,
        lastAccessed: directAccess?.lastAccessedAt,
        completed: !!directAccess?.completedAt,
      };
    });

    // Apply search filter (client-side for now, can be optimized with search index later)
    if (filters?.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      processedContent = processedContent.filter(
        (content) =>
          content.title.toLowerCase().includes(searchLower) ||
          content.description.toLowerCase().includes(searchLower),
      );
    }

    return {
      page: processedContent,
      isDone: result.isDone,
      continueCursor: result.continueCursor,
    };
  },
});

/**
 * Get public content library (no authentication required)
 */
export const getPublicContentLibrary = query({
  args: {
    paginationOpts: paginationOptsValidator,
    filters: v.optional(
      v.object({
        school: v.optional(v.string()),
        searchQuery: v.optional(v.string()),
      }),
    ),
  },
  handler: async (ctx, { paginationOpts, filters }) => {
    // Set default pagination - provided by usePaginatedQuery via paginationOpts
    const { numItems, cursor } = paginationOpts;

    // Build base query
    let query = ctx.db
      .query("contentLibrary")
      .filter((q) => q.eq(q.field("isPublished"), true));

    // Apply school filter
    if (filters?.school && filters.school !== "all") {
      query = query.filter((q) => q.eq(q.field("school"), filters.school));
    }

    // Get paginated results
    const result = await query.paginate({
      numItems,
      cursor,
    });

    // Process content items (no user access info since this is public)
    let processedContent = result.page.map((content) => ({
      ...content,
      hasAccess: false, // Will be determined on individual pages with authentication
      accessType: null,
      progress: 0,
      lastAccessed: null,
      completed: false,
    }));

    // Apply search filter (client-side for now, can be optimized with search index later)
    if (filters?.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      processedContent = processedContent.filter(
        (content) =>
          content.title.toLowerCase().includes(searchLower) ||
          content.description.toLowerCase().includes(searchLower),
      );
    }

    return {
      page: processedContent,
      isDone: result.isDone,
      continueCursor: result.continueCursor,
    };
  },
});

/**
 * Track content usage for analytics
 */
export const trackContentUsage = mutation({
  args: {
    userId: v.id("users"),
    userEmail: v.string(),
    contentId: v.string(),
    watchTimeMinutes: v.number(),
    progressPercentage: v.optional(v.number()),
    completed: v.optional(v.boolean()),
  },
  handler: async (
    ctx,
    {
      userId,
      userEmail,
      contentId,
      watchTimeMinutes,
      progressPercentage,
      completed,
    },
  ) => {
    const now = new Date().toISOString();

    // Update user content access record
    const existingAccess = await ctx.db
      .query("userContentAccess")
      .withIndex("by_user_and_content", (q) =>
        q
          .eq("userId", userId)
          .eq("contentId", contentId as Id<"contentLibrary">),
      )
      .first();

    if (existingAccess) {
      const updateData: {
        lastAccessedAt: string;
        progressPercentage?: number;
        completedAt?: string;
      } = {
        lastAccessedAt: now,
      };

      if (progressPercentage !== undefined) {
        updateData.progressPercentage = Math.max(
          existingAccess.progressPercentage || 0,
          progressPercentage,
        );
      }

      if (completed) {
        updateData.completedAt = now;
        updateData.progressPercentage = 100;
      }

      await ctx.db.patch(existingAccess._id, updateData);
    }

    // Update subscription usage statistics
    const activeSubscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_email", (q) => q.eq("userEmail", userEmail))
      .filter((q) => q.eq(q.field("status"), "active"))
      .first();

    if (activeSubscription) {
      const currentMonth = new Date().toISOString().substring(0, 7); // "YYYY-MM"

      const existingUsage = await ctx.db
        .query("subscriptionUsage")
        .withIndex("by_subscription", (q) =>
          q.eq("subscriptionId", activeSubscription._id),
        )
        .filter((q) => q.eq(q.field("month"), currentMonth))
        .first();

      if (existingUsage) {
        await ctx.db.patch(existingUsage._id, {
          contentViewsCount: existingUsage.contentViewsCount + 1,
          totalWatchTime: existingUsage.totalWatchTime + watchTimeMinutes,
        });
      } else {
        await ctx.db.insert("subscriptionUsage", {
          subscriptionId: activeSubscription._id,
          userId: activeSubscription.userId,
          month: currentMonth,
          contentViewsCount: 1,
          totalWatchTime: watchTimeMinutes,
          uniqueContentAccessed: 1,
          downloadCount: 0,
          createdAt: now,
        });
      }
    }
  },
});

// Helper Functions

/**
 * Grant content access based on subscription type
 */
async function grantSubscriptionAccess(
  ctx: MutationCtx,
  userId: string,
  userEmail: string,
  planType: "all-access" | "mystical-masterclass" | "open-scroll",
) {
  const now = new Date().toISOString();

  // Get content that should be accessible with this subscription
  let schoolFilter: string[];
  if (planType === "all-access") {
    schoolFilter = ["mystical-masterclass", "open-scroll", "general"];
  } else {
    schoolFilter = [planType, "general"];
  }

  const accessibleContent = await ctx.db
    .query("contentLibrary")
    .filter((q) => q.eq(q.field("isPublished"), true))
    .collect();

  const relevantContent = accessibleContent.filter((content) =>
    schoolFilter.includes(content.school),
  );

  // Grant access to all relevant content
  for (const content of relevantContent) {
    const existingAccess = await ctx.db
      .query("userContentAccess")
      .withIndex("by_user_and_content", (q) =>
        q.eq("userId", userId).eq("contentId", content._id),
      )
      .first();

    if (!existingAccess) {
      await ctx.db.insert("userContentAccess", {
        userId,
        userEmail,
        contentId: content._id,
        accessType: "subscription",
        grantedAt: now,
        // No expiration for subscription access
      });
    }
  }
}

/**
 * Revoke subscription-based access (keep purchased access)
 */
async function revokeSubscriptionAccess(ctx: MutationCtx, userId: string) {
  const subscriptionAccess = await ctx.db
    .query("userContentAccess")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .filter((q) => q.eq(q.field("accessType"), "subscription"))
    .collect();

  // Remove subscription-based access (but keep purchase-based access)
  for (const access of subscriptionAccess) {
    await ctx.db.delete(access._id);
  }
}

/**
 * Check if subscription plan covers specific school content
 */
function subscriptionCoversContent(
  planType: "all-access" | "mystical-masterclass" | "open-scroll",
  contentSchool: "mystical-masterclass" | "open-scroll" | "general",
): boolean {
  if (planType === "all-access") return true;
  if (contentSchool === "general") return true;
  return planType === contentSchool;
}

// Stripe Webhook Handler Types (for reference)
export interface StripeWebhookEvent {
  type: string;
  data: {
    object: unknown;
  };
}

/**
 * Handle Stripe webhook events
 * This would be called from your webhook endpoint
 */
export const handleStripeWebhook = mutation({
  args: {
    eventType: v.string(),
    subscriptionData: v.any(),
  },
  handler: async (ctx, { eventType, subscriptionData }) => {
    const now = new Date().toISOString();

    switch (eventType) {
      case "customer.subscription.created":
        // Handle new subscription
        break;

      case "customer.subscription.updated":
        // Handle subscription changes
        break;

      case "customer.subscription.deleted":
        // Handle subscription cancellation
        await updateSubscriptionStatusImpl(ctx as MutationCtx, {
          stripeSubscriptionId: subscriptionData.id,
          status: "cancelled",
          endDate: now,
        });
        break;

      case "invoice.payment_succeeded":
        // Handle successful payment
        await updateSubscriptionStatusImpl(ctx as MutationCtx, {
          stripeSubscriptionId: subscriptionData.subscription,
          status: "active",
        });
        break;

      case "invoice.payment_failed":
        // Handle failed payment
        await updateSubscriptionStatusImpl(ctx as MutationCtx, {
          stripeSubscriptionId: subscriptionData.subscription,
          status: "past_due",
        });
        break;

      default:
        console.log(`Unhandled webhook event: ${eventType}`);
    }
  },
});

/**
 * Create content item (for seeding and admin use)
 */
export const createContent = mutation({
  args: {
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
    duration: v.optional(v.number()),
    previewDuration: v.optional(v.number()),
    price: v.number(),
    isSubscriberOnly: v.boolean(),
    orderIndex: v.optional(v.number()),
    parentCourseId: v.optional(v.id("contentLibrary")),
    resources: v.optional(
      v.array(
        v.object({
          name: v.string(),
          url: v.string(),
          type: v.string(),
        }),
      ),
    ),
    tags: v.optional(v.array(v.string())),
    isPublished: v.boolean(),
    publishedAt: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contentLibrary", args);
  },
});

/**
 * Get content by ID
 */
export const getContentById = query({
  args: { contentId: v.string() },
  handler: async (ctx, { contentId }) => {
    return await ctx.db.get(contentId as Id<"contentLibrary">);
  },
});

/**
 * Delete all content (for re-seeding)
 */
export const deleteAllContent = mutation({
  handler: async (ctx) => {
    const allContent = await ctx.db.query("contentLibrary").collect();
    for (const content of allContent) {
      await ctx.db.delete(content._id);
    }
    return { deletedCount: allContent.length };
  },
});

/**
 * Get all subscriptions (for admin dashboard)
 */
export const getAllSubscriptions = query({
  handler: async (ctx) => {
    return await ctx.db.query("subscriptions").collect();
  },
});

/**
 * Get all content (for admin dashboard)
 */
export const getAllContent = query({
  handler: async (ctx) => {
    return await ctx.db.query("contentLibrary").collect();
  },
});

/**
 * Get individual content item with user access status
 */
export const getContentItem = query({
  args: {
    contentId: v.id("contentLibrary"),
    userEmail: v.optional(v.string()),
  },
  handler: async (ctx, { contentId, userEmail }) => {
    const content = await ctx.db.get(contentId);

    if (!content || !content.isPublished) {
      return null;
    }

    let userAccess = null;
    let activeSubscription = null;

    if (userEmail) {
      // Get user access
      userAccess = await ctx.db
        .query("userContentAccess")
        .filter((q) =>
          q.and(
            q.eq(q.field("userEmail"), userEmail),
            q.eq(q.field("contentId"), contentId),
          ),
        )
        .first();

      // Get active subscription
      activeSubscription = await ctx.db
        .query("subscriptions")
        .withIndex("by_email", (q) => q.eq("userEmail", userEmail))
        .filter((q) => q.eq(q.field("status"), "active"))
        .first();
    }

    // Check access
    const subscriptionAccess =
      activeSubscription &&
      subscriptionCoversContent(activeSubscription.planType, content.school);

    const hasAccess = !!(
      (userAccess &&
        (!userAccess.expiresAt ||
          new Date(userAccess.expiresAt) > new Date())) ||
      subscriptionAccess ||
      !content.isSubscriberOnly
    );

    return {
      ...content,
      hasAccess,
      accessType:
        userAccess?.accessType || (subscriptionAccess ? "subscription" : null),
      progress: userAccess?.progressPercentage || 0,
      lastAccessed: userAccess?.lastAccessedAt,
      completed: !!userAccess?.completedAt,
      subscription: activeSubscription,
    };
  },
});
