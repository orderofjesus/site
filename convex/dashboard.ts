import { v } from "convex/values";
import { query } from "./_generated/server";

/**
 * Get dashboard overview for a user
 */
export const getDashboardOverview = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.userEmail) {
      return null;
    }

    // Get active event registrations
    const eventRegistrations = await ctx.db
      .query("eventRegistrations")
      .withIndex("by_user", (q) => q.eq("userEmail", args.userEmail))
      .filter((q) => q.eq(q.field("status"), "registered"))
      .collect();

    // Get events with future dates
    const upcomingEvents = await Promise.all(
      eventRegistrations.map(async (reg) => {
        const event = await ctx.db.get(reg.eventId);
        return event;
      })
    );

    // Get school enrollments
    const schoolEnrollments = await ctx.db
      .query("schoolEnrollments")
      .withIndex("by_user", (q) => q.eq("userEmail", args.userEmail))
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();

    // Get mentorship enrollments
    const mentorshipEnrollments = await ctx.db
      .query("mentorshipEnrollments")
      .withIndex("by_user", (q) => q.eq("userEmail", args.userEmail))
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();

    return {
      upcomingEvents: upcomingEvents.filter(Boolean),
      totalEventRegistrations: eventRegistrations.length,
      activeSchools: schoolEnrollments.length,
      activeMentorships: mentorshipEnrollments.length,
      schoolEnrollments,
      mentorshipEnrollments,
    };
  },
});

/**
 * Get user's school enrollments with details
 */
export const getUserSchools = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.userEmail) {
      return [];
    }

    return await ctx.db
      .query("schoolEnrollments")
      .withIndex("by_user", (q) => q.eq("userEmail", args.userEmail))
      .order("desc")
      .collect();
  },
});

/**
 * Get user's mentorship enrollments
 */
export const getUserMentorships = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.userEmail) {
      return [];
    }

    return await ctx.db
      .query("mentorshipEnrollments")
      .withIndex("by_user", (q) => q.eq("userEmail", args.userEmail))
      .order("desc")
      .collect();
  },
});
