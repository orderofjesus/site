import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Restore membership content markers (for demo purposes)
 */
export const restoreTieredMarkers = mutation({
  handler: async (ctx) => {
    const content = await ctx.db.query("contentLibrary").collect();
    let updatedCount = 0;

    for (const item of content) {
      // Mark mystical-masterclass and open-scroll content as subscriber-only
      if (
        item.school === "mystical-masterclass" ||
        item.school === "open-scroll"
      ) {
        await ctx.db.patch(item._id, {
          isSubscriberOnly: true,
          price: 4500, // $45.00 for individual purchase (demo)
        });
        updatedCount++;
      } else {
        // General content is free
        await ctx.db.patch(item._id, {
          isSubscriberOnly: false,
          price: 0,
        });
      }
    }

    // Also mark some events as paid for demonstration
    const events = await ctx.db.query("events").collect();
    let updatedEvents = 0;
    for (const event of events) {
      if (event.category === "Conference" || event.category === "Workshop") {
        await ctx.db.patch(event._id, {
          pricing: {
            type: "Paid",
            general: "$99",
            regular: "$120",
            discounted: "$79",
          },
        });
        updatedEvents++;
      }
    }

    return { updatedCount, updatedEvents };
  },
});
