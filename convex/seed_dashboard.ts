/**
 * Seed script for dashboard data (schools and mentorship enrollments)
 * 
 * This is a helper script to populate test data for the dashboard.
 * You can call these mutations manually from the Convex dashboard or create a script to run them.
 * 
 * Example usage in Convex dashboard:
 * 1. Go to your Convex dashboard
 * 2. Navigate to the Functions tab
 * 3. Call these mutations with appropriate data
 */

import { v } from "convex/values";
import { mutation } from "./_generated/server";

/**
 * Enroll a user in a school
 */
export const enrollInSchool = mutation({
  args: {
    userEmail: v.string(),
    schoolName: v.string(), // "Mystical Masterclass" or "Open Scroll"
    progress: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if already enrolled
    const existing = await ctx.db
      .query("schoolEnrollments")
      .withIndex("by_user_and_school", (q) =>
        q.eq("userEmail", args.userEmail).eq("schoolName", args.schoolName)
      )
      .first();

    if (existing) {
      throw new Error(`User is already enrolled in ${args.schoolName}`);
    }

    const enrollmentId = await ctx.db.insert("schoolEnrollments", {
      userEmail: args.userEmail,
      schoolName: args.schoolName,
      enrolledAt: Date.now(),
      status: "active",
      progress: args.progress || 0,
      notes: args.notes,
    });

    return {
      success: true,
      enrollmentId,
      message: `Successfully enrolled in ${args.schoolName}`,
    };
  },
});

/**
 * Enroll a user in a mentorship program
 */
export const enrollInMentorship = mutation({
  args: {
    userEmail: v.string(),
    programType: v.string(), // "one-on-one" or "elijah-network"
    mentorEmail: v.optional(v.string()),
    startDate: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if already enrolled
    const existing = await ctx.db
      .query("mentorshipEnrollments")
      .withIndex("by_user", (q) => q.eq("userEmail", args.userEmail))
      .filter((q) => q.eq(q.field("programType"), args.programType))
      .filter((q) => q.eq(q.field("status"), "active"))
      .first();

    if (existing) {
      throw new Error(`User is already enrolled in ${args.programType} mentorship`);
    }

    const enrollmentId = await ctx.db.insert("mentorshipEnrollments", {
      userEmail: args.userEmail,
      programType: args.programType,
      enrolledAt: Date.now(),
      status: "active",
      mentorEmail: args.mentorEmail,
      startDate: args.startDate,
      notes: args.notes,
    });

    return {
      success: true,
      enrollmentId,
      message: `Successfully enrolled in ${args.programType} mentorship`,
    };
  },
});

/**
 * Update school enrollment progress
 */
export const updateSchoolProgress = mutation({
  args: {
    enrollmentId: v.id("schoolEnrollments"),
    progress: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.enrollmentId, {
      progress: Math.min(100, Math.max(0, args.progress)),
    });

    return { success: true };
  },
});

/**
 * Update school enrollment status
 */
export const updateSchoolStatus = mutation({
  args: {
    enrollmentId: v.id("schoolEnrollments"),
    status: v.union(
      v.literal("active"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.enrollmentId, {
      status: args.status,
    });

    return { success: true };
  },
});

/**
 * Update mentorship enrollment status
 */
export const updateMentorshipStatus = mutation({
  args: {
    enrollmentId: v.id("mentorshipEnrollments"),
    status: v.union(
      v.literal("active"),
      v.literal("completed"),
      v.literal("on-hold"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.enrollmentId, {
      status: args.status,
    });

    return { success: true };
  },
});
