import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Register a user for an event
 *
 * Validates:
 * - User is authenticated
 * - User isn't already registered
 * - Event has capacity available
 */
export const register = mutation({
  args: {
    eventId: v.id("events"),
    userEmail: v.string(),
    userName: v.optional(v.string()),
    phone: v.optional(v.string()),
    ticketType: v.optional(v.string()),
    notes: v.optional(v.string()),
    numberOfPeople: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    if (!args.userEmail) {
      throw new Error("You must be signed in to register for events");
    }

    // Check if already registered
    const existingRegistration = await ctx.db
      .query("eventRegistrations")
      .withIndex("by_user_and_event", (q) =>
        q.eq("userEmail", args.userEmail).eq("eventId", args.eventId),
      )
      .filter((q) => q.neq(q.field("status"), "cancelled"))
      .first();

    if (existingRegistration) {
      throw new Error("You are already registered for this event");
    }

    // Get event and check capacity
    const event = await ctx.db.get(args.eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    if (event.maxCapacity && event.registrationCount >= event.maxCapacity) {
      throw new Error("Sorry, this event is at full capacity");
    }

    // Validate numberOfPeople if provided
    if (
      args.numberOfPeople !== undefined &&
      (args.numberOfPeople < 1 || args.numberOfPeople > 5)
    ) {
      throw new Error("Number of people must be between 1 and 5");
    }

    // Determine payment status based on event pricing
    const isPaidEvent = event.pricing.type !== "Free";
    const paymentStatus = isPaidEvent ? "pending" : undefined;

    // Create registration
    const registrationId = await ctx.db.insert("eventRegistrations", {
      eventId: args.eventId,
      userEmail: args.userEmail,
      userName: args.userName,
      phone: args.phone,
      registeredAt: Date.now(),
      status: "registered",
      ticketType: args.ticketType,
      notes: args.notes,
      numberOfPeople: args.numberOfPeople || 1,
      paymentStatus: paymentStatus,
    });

    // Increment registration count
    await ctx.db.patch(args.eventId, {
      registrationCount: event.registrationCount + 1,
    });

    return {
      success: true,
      registrationId,
      message: "Successfully registered for event!",
    };
  },
});

/**
 * Cancel a user's event registration
 *
 * Only the user who registered can cancel their own registration
 */
export const cancel = mutation({
  args: {
    registrationId: v.id("eventRegistrations"),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.userEmail) {
      throw new Error("You must be signed in to cancel registrations");
    }

    // Get registration
    const registration = await ctx.db.get(args.registrationId);
    if (!registration) {
      throw new Error("Registration not found");
    }

    // Verify ownership
    if (registration.userEmail !== args.userEmail) {
      throw new Error("You can only cancel your own registrations");
    }

    // Check if already cancelled
    if (registration.status === "cancelled") {
      throw new Error("This registration is already cancelled");
    }

    // Update registration status
    await ctx.db.patch(args.registrationId, {
      status: "cancelled",
    });

    // Decrement registration count
    const event = await ctx.db.get(registration.eventId);
    if (event && event.registrationCount > 0) {
      await ctx.db.patch(registration.eventId, {
        registrationCount: event.registrationCount - 1,
      });
    }

    return {
      success: true,
      message: "Registration cancelled successfully",
    };
  },
});

/**
 * Get all registrations for the current user
 *
 * Returns registrations with full event details
 */
export const getUserRegistrations = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.userEmail) {
      return [];
    }

    const registrations = await ctx.db
      .query("eventRegistrations")
      .withIndex("by_user", (q) => q.eq("userEmail", args.userEmail))
      .order("desc") // Most recent first
      .collect();

    // Get event details for each registration
    const registrationsWithEvents = await Promise.all(
      registrations.map(async (reg) => {
        const event = await ctx.db.get(reg.eventId);
        return {
          ...reg,
          event,
        };
      }),
    );

    return registrationsWithEvents;
  },
});

/**
 * Get active (non-cancelled) registrations for current user
 */
export const getActiveRegistrations = query({
  args: {
    userEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.userEmail) {
      return [];
    }

    const registrations = await ctx.db
      .query("eventRegistrations")
      .withIndex("by_user", (q) => q.eq("userEmail", args.userEmail as string))
      .filter((q) => q.neq(q.field("status"), "cancelled"))
      .order("desc")
      .collect();

    // Get event details
    const registrationsWithEvents = await Promise.all(
      registrations.map(async (reg) => {
        const event = await ctx.db.get(reg.eventId);
        return { ...reg, event };
      }),
    );

    return registrationsWithEvents;
  },
});

/**
 * Check if current user is registered for a specific event
 */
export const isRegistered = query({
  args: {
    eventId: v.id("events"),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.userEmail) {
      return false;
    }

    const registration = await ctx.db
      .query("eventRegistrations")
      .withIndex("by_user_and_event", (q) =>
        q.eq("userEmail", args.userEmail).eq("eventId", args.eventId),
      )
      .filter((q) => q.neq(q.field("status"), "cancelled"))
      .first();

    return registration !== null;
  },
});

/**
 * Get registration details for current user and specific event
 */
export const getEventRegistration = query({
  args: {
    eventId: v.id("events"),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.userEmail) {
      return null;
    }

    const registration = await ctx.db
      .query("eventRegistrations")
      .withIndex("by_user_and_event", (q) =>
        q.eq("userEmail", args.userEmail).eq("eventId", args.eventId),
      )
      .filter((q) => q.neq(q.field("status"), "cancelled"))
      .first();

    return registration;
  },
});

/**
 * Get all registrations for a specific event (for admin/analytics)
 */
export const getEventRegistrations = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    const registrations = await ctx.db
      .query("eventRegistrations")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect();

    // Return registrations with userEmail
    const registrationsWithUsers = registrations.map((reg) => ({
      ...reg,
      user: {
        email: reg.userEmail,
      },
    }));

    return registrationsWithUsers;
  },
});

/**
 * Get registration statistics for an event
 */
export const getEventStats = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    if (!event) {
      return null;
    }

    const allRegistrations = await ctx.db
      .query("eventRegistrations")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect();

    const activeRegistrations = allRegistrations.filter(
      (reg) => reg.status === "registered",
    );

    const cancelledCount = allRegistrations.filter(
      (reg) => reg.status === "cancelled",
    ).length;

    const attendedCount = allRegistrations.filter(
      (reg) => reg.status === "attended",
    ).length;

    const capacityPercentage = event.maxCapacity
      ? Math.round((activeRegistrations.length / event.maxCapacity) * 100)
      : null;

    return {
      totalRegistrations: activeRegistrations.length,
      cancelledRegistrations: cancelledCount,
      attended: attendedCount,
      maxCapacity: event.maxCapacity,
      availableSpots: event.maxCapacity
        ? event.maxCapacity - activeRegistrations.length
        : null,
      capacityPercentage,
      isFull: event.maxCapacity
        ? activeRegistrations.length >= event.maxCapacity
        : false,
    };
  },
});

/**
 * Update registration status (for admin/check-in purposes)
 */
export const updateStatus = mutation({
  args: {
    registrationId: v.id("eventRegistrations"),
    userEmail: v.string(),
    status: v.union(
      v.literal("registered"),
      v.literal("cancelled"),
      v.literal("attended"),
      v.literal("no-show"),
    ),
  },
  handler: async (ctx, args) => {
    if (!args.userEmail) {
      throw new Error("You must be signed in");
    }

    const registration = await ctx.db.get(args.registrationId);
    if (!registration) {
      throw new Error("Registration not found");
    }

    // Only allow user to update their own registration
    // (In production, you'd want admin role checking here)
    if (registration.userEmail !== args.userEmail) {
      throw new Error("You can only update your own registrations");
    }

    const oldStatus = registration.status;
    await ctx.db.patch(args.registrationId, {
      status: args.status,
    });

    // Adjust event registration count if status changes affect it
    const event = await ctx.db.get(registration.eventId);
    if (event) {
      let countChange = 0;

      // If cancelling or marking no-show, decrease count
      if (
        (oldStatus === "registered" || oldStatus === "attended") &&
        (args.status === "cancelled" || args.status === "no-show")
      ) {
        countChange = -1;
      }

      // If reactivating from cancelled, increase count
      if (oldStatus === "cancelled" && args.status === "registered") {
        countChange = 1;
      }

      if (countChange !== 0) {
        await ctx.db.patch(registration.eventId, {
          registrationCount: Math.max(0, event.registrationCount + countChange),
        });
      }
    }

    return { success: true };
  },
});
