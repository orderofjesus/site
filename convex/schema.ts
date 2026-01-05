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
});

export default schema;
