import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all events
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").collect();
  },
});

// Get single event by ID
export const get = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get events by category
export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("events")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

// Seed events (call this once to populate your database)
export const seedEvents = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if events already exist
    const existingEvents = await ctx.db.query("events").first();
    if (existingEvents) {
      throw new Error(
        "Events already seeded. Delete existing events first if you want to re-seed.",
      );
    }

    const events = [
      {
        title: "Healing Service",
        subtitle: "Experience God's Healing Power",
        date: "April 15, 2024",
        time: "6:00 PM - 9:00 PM",
        location: "Main Sanctuary",
        address: "123 Kingdom Way, City Center, ST 12345",
        category: "Healing",
        attendees: "200+ Expected",
        pricing: {
          type: "Free",
          general: "Free",
          regular: null,
          discounted: null,
        },
        description:
          "Join us for a powerful evening of worship, prayer, and divine healing. Witness testimonies of miraculous healings and experience God's transformative touch in your life.",
        fullDescription:
          "This special healing service brings together believers from across the region for an evening dedicated to experiencing God's healing power. Through worship, corporate prayer, and individual ministry, we create an atmosphere where the Holy Spirit moves freely. Past services have seen countless testimonies of physical healing, emotional restoration, and spiritual breakthroughs.",
        image:
          "https://images.unsplash.com/photo-1530688957198-8570b1819eeb?q=80&w=2114&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        schedule: [
          { time: "6:00 PM", activity: "Doors Open & Welcome" },
          { time: "6:30 PM", activity: "Worship & Praise" },
          { time: "7:15 PM", activity: "Testimonies of Healing" },
          { time: "7:45 PM", activity: "Message & Teaching" },
          { time: "8:15 PM", activity: "Prayer Ministry & Healing" },
          { time: "9:00 PM", activity: "Closing & Benediction" },
        ],
        whatToExpect: [
          "Powerful worship and praise",
          "Testimonies from previous healing services",
          "Biblical teaching on divine healing",
          "Personal prayer ministry",
          "Atmosphere of faith and expectation",
          "Fellowship with other believers",
        ],
        whatToBring: [
          "Your faith and expectation",
          "Bible (optional)",
          "Notebook for personal notes",
          "Contact info for follow-up",
        ],
        pricingDetails: null,
        registrationCount: 0,
        maxCapacity: 250,
      },
      {
        title: "Elijah Conference 2024",
        subtitle: "Raising Up a Generation of Prophets",
        date: "May 20-22, 2024",
        time: "9:00 AM - 9:00 PM Daily",
        location: "Conference Center",
        address: "456 Prophetic Boulevard, Downtown, ST 12345",
        category: "Conference",
        attendees: "500+ Expected",
        pricing: {
          type: "Paid",
          general: "$99",
          regular: "$99",
          discounted: "$79",
        },
        description:
          "A three-day intensive conference focused on developing the prophetic gift and understanding the Elijah mandate for this generation.",
        fullDescription:
          "The Elijah Conference is our premier annual gathering that brings together prophetic voices and those hungry to grow in prophetic ministry. Over three transformative days, you'll receive impartation, training, and activation in the prophetic. Learn from seasoned ministers, engage in prophetic workshops, and experience corporate prophetic worship like never before.",
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1400&auto=format&fit=crop",
        schedule: [
          { time: "9:00 AM", activity: "Morning Worship & Devotion" },
          { time: "10:00 AM", activity: "Main Session - Prophetic Teaching" },
          { time: "12:00 PM", activity: "Lunch Break" },
          { time: "2:00 PM", activity: "Workshop Sessions (Choose 1 of 4)" },
          { time: "4:00 PM", activity: "Break & Fellowship" },
          { time: "5:00 PM", activity: "Evening Worship" },
          { time: "6:00 PM", activity: "Main Session - Prophetic Activation" },
          { time: "8:00 PM", activity: "Ministry & Impartation Time" },
        ],
        whatToExpect: [
          "In-depth prophetic teaching from multiple speakers",
          "Hands-on prophetic activation exercises",
          "Personal prophetic ministry",
          "Workshops on hearing God's voice",
          "Networking with prophetic community",
          "Conference materials and resources",
          "Meals included (lunch & dinner)",
        ],
        whatToBring: [
          "Bible and journal",
          "Expectant heart",
          "Business casual attire",
          "Questions for Q&A sessions",
        ],
        pricingDetails: {
          regular: {
            price: "$99",
            includes: [
              "All main sessions",
              "One workshop per day",
              "Conference materials",
              "Lunch",
            ],
          },
          discounted: {
            price: "$79",
            includes: [
              "All benefits of regular ticket",
              "Special discounted rate for married couples",
            ],
            note: "Save $20 with the couple discount!",
          },
        },
        registrationCount: 0,
        maxCapacity: 500,
      },
      {
        title: "Healing Revival Night",
        subtitle: "Miracles, Signs & Wonders",
        date: "April 28, 2024",
        time: "7:00 PM - 10:00 PM",
        location: "Main Sanctuary",
        address: "123 Kingdom Way, City Center, ST 12345",
        category: "Healing",
        attendees: "300+ Expected",
        pricing: {
          type: "Free",
          general: "Free",
          regular: null,
          discounted: null,
        },
        description:
          "An extended evening of supernatural ministry where we press in for breakthrough healings and miraculous signs from heaven.",
        fullDescription:
          "Building on the momentum of our regular healing services, Revival Nights are extended gatherings where we create space for the Holy Spirit to move in extraordinary ways. These evenings feature extended worship, testimonies of God's faithfulness, and focused ministry time for those seeking physical, emotional, or spiritual healing.",
        image:
          "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=1400&auto=format&fit=crop",
        schedule: [
          { time: "7:00 PM", activity: "Worship & Intercession" },
          { time: "7:45 PM", activity: "Testimonies & Stories" },
          { time: "8:15 PM", activity: "Teaching on Faith" },
          { time: "8:45 PM", activity: "Extended Prayer Ministry" },
          { time: "10:00 PM", activity: "Closing" },
        ],
        whatToExpect: [
          "Extended worship time",
          "Testimonies of breakthrough",
          "Faith-building teaching",
          "Personal ministry time",
          "Atmosphere of miracles",
        ],
        whatToBring: [
          "Expectant heart",
          "Prayer requests",
          "Faith for breakthrough",
        ],
        pricingDetails: null,
        registrationCount: 0,
        maxCapacity: 300,
      },
      {
        title: "Prophetic Encounter",
        subtitle: "Hear the Voice of God",
        date: "June 5, 2024",
        time: "6:30 PM - 9:00 PM",
        location: "Prayer Chapel",
        address: "789 Revelation Street, Northside, ST 12345",
        category: "Conference",
        attendees: "150+ Expected",
        pricing: {
          type: "Paid",
          general: "$25",
          regular: "$25",
          discounted: null,
        },
        description:
          "An intimate gathering focused on hearing God's voice and receiving prophetic words for your life and calling.",
        fullDescription:
          "In this smaller, more intimate setting, we focus on personal encounters with God's prophetic voice. Through soaking prayer, activation exercises, and one-on-one ministry, participants learn to discern God's voice more clearly and receive specific prophetic direction for their lives.",
        image:
          "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1400&auto=format&fit=crop",
        schedule: [
          { time: "6:30 PM", activity: "Welcome & Worship" },
          { time: "7:00 PM", activity: "Teaching on Hearing God" },
          { time: "7:45 PM", activity: "Prophetic Activation" },
          { time: "8:15 PM", activity: "Personal Ministry" },
          { time: "9:00 PM", activity: "Closing" },
        ],
        whatToExpect: [
          "Intimate worship environment",
          "Teaching on discerning God's voice",
          "Prophetic activation exercises",
          "Personal prophetic words",
          "Small group ministry",
        ],
        whatToBring: [
          "Bible and journal",
          "Open heart to hear",
          "Questions about your calling",
        ],
        pricingDetails: {
          regular: {
            price: "$25",
            includes: [
              "All sessions",
              "Prophetic activation",
              "Personal ministry time",
              "Workshop materials",
            ],
          },
        },
        registrationCount: 0,
        maxCapacity: 150,
      },
      {
        title: "Summer Healing Crusade",
        subtitle: "City-Wide Outreach",
        date: "July 10-12, 2024",
        time: "5:00 PM - 10:00 PM Daily",
        location: "City Park Arena",
        address: "101 Park Drive, Central Park, ST 12345",
        category: "Healing",
        attendees: "1000+ Expected",
        pricing: {
          type: "Free",
          general: "Free",
          regular: null,
          discounted: null,
        },
        description:
          "Our largest healing event of the year - a three-day outdoor crusade bringing the message of Jesus and His healing power to our entire city.",
        fullDescription:
          "The Summer Healing Crusade is our biggest outreach event, taking the message of salvation and healing beyond our church walls. With live worship, powerful preaching, and mass prayer for the sick, we've seen thousands come to Christ and countless healings over the years. This is a family-friendly event with activities for all ages.",
        image:
          "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1400&auto=format&fit=crop",
        schedule: [
          { time: "5:00 PM", activity: "Gates Open & Family Activities" },
          { time: "6:00 PM", activity: "Pre-Service Worship" },
          { time: "6:30 PM", activity: "Main Service Begins" },
          { time: "7:00 PM", activity: "Gospel Message" },
          { time: "7:45 PM", activity: "Altar Call" },
          { time: "8:15 PM", activity: "Mass Healing Prayer" },
          { time: "9:30 PM", activity: "Closing & Follow-up" },
        ],
        whatToExpect: [
          "Large-scale outdoor event",
          "Family-friendly atmosphere",
          "Food vendors and activities",
          "Powerful worship and preaching",
          "Mass healing prayer",
          "Salvation altar calls",
        ],
        whatToBring: [
          "Friends and family",
          "Lawn chairs or blankets",
          "Weather-appropriate clothing",
          "Heart to see God move",
        ],
        pricingDetails: null,
        registrationCount: 0,
        maxCapacity: 1000,
      },
      {
        title: "Prophetic Worship Night",
        subtitle: "Songs from Heaven",
        date: "June 18, 2024",
        time: "7:00 PM - 9:30 PM",
        location: "Worship Center",
        address: "321 Melody Lane, Arts District, ST 12345",
        category: "Conference",
        attendees: "250+ Expected",
        pricing: {
          type: "Paid",
          general: "$15",
          regular: "$15",
          discounted: null,
        },
        description:
          "Experience the power of prophetic worship as spontaneous songs flow from the throne room, bringing breakthrough and transformation.",
        fullDescription:
          "Prophetic Worship Nights blend musical excellence with spiritual sensitivity as our worship team creates space for spontaneous songs birthed in the presence of God. These aren't rehearsed performances but organic expressions of worship that carry prophetic weight and bring breakthrough to participants.",
        image:
          "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1400&auto=format&fit=crop",
        schedule: [
          { time: "7:00 PM", activity: "Gathering & Worship" },
          { time: "7:30 PM", activity: "Spontaneous Worship Flow" },
          { time: "8:15 PM", activity: "Prophetic Songs & Ministry" },
          { time: "9:00 PM", activity: "Extended Worship" },
          { time: "9:30 PM", activity: "Closing" },
        ],
        whatToExpect: [
          "Spontaneous prophetic worship",
          "Musical excellence",
          "Prophetic ministry through song",
          "Atmosphere of breakthrough",
          "Extended worship time",
        ],
        whatToBring: [
          "Expectant heart",
          "Worship posture",
          "Journal for prophetic words",
        ],
        pricingDetails: {
          regular: {
            price: "$15",
            includes: [
              "Extended worship experience",
              "Prophetic ministry",
              "Refreshments provided",
            ],
          },
        },
        registrationCount: 0,
        maxCapacity: 250,
      },
    ];

    const insertedIds = [];
    for (const event of events) {
      const id = await ctx.db.insert("events", event);
      insertedIds.push(id);
    }

    return {
      success: true,
      count: events.length,
      message: `Successfully seeded ${events.length} events into the database`,
      eventIds: insertedIds,
    };
  },
});

// Delete all events (use with caution!)
export const deleteAllEvents = mutation({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();

    for (const event of events) {
      await ctx.db.delete(event._id);
    }

    return {
      success: true,
      deletedCount: events.length,
      message: `Successfully deleted ${events.length} events`,
    };
  },
});
