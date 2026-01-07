/**
 * Content Library Seeding Script
 * Seeds the contentLibrary table with sample spiritual content
 *
 * Usage: npx tsx scripts/seed-content-library.ts
 */

import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface ContentItem {
  title: string;
  description: string;
  contentType: "video" | "course" | "bundle";
  school: "mystical-masterclass" | "open-scroll" | "general";
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number; // in seconds
  previewDuration?: number; // in seconds
  price: number; // in cents
  isSubscriberOnly: boolean;
  orderIndex?: number;
  parentCourseId?: string; // Will be set for videos in courses
  resources?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  tags?: string[];
  isPublished: boolean;
}

const sampleContent: ContentItem[] = [
  // Mystical Masterclass Content
  {
    title: "Introduction to Mystical Prayer",
    description:
      "Discover the foundational principles of mystical prayer and how to enter into deeper communion with the divine. This comprehensive introduction covers the historical roots of mystical traditions and practical steps for beginning your journey into contemplative prayer.",
    contentType: "video",
    school: "mystical-masterclass",
    duration: 2400, // 40 minutes
    previewDuration: 300, // 5 minutes
    price: 4500, // $45
    isSubscriberOnly: true,
    orderIndex: 1,
    resources: [
      {
        name: "Prayer Guide PDF",
        url: "/resources/mystical-prayer-guide.pdf",
        type: "pdf",
      },
      {
        name: "Meditation Audio",
        url: "/resources/guided-meditation.mp3",
        type: "audio",
      },
    ],
    tags: ["prayer", "mystical", "beginner", "contemplative"],
    isPublished: true,
  },
  {
    title: "The Dark Night of the Soul",
    description:
      "Understanding the spiritual purification process known as the 'dark night of the soul.' Learn how to navigate periods of spiritual dryness and discover the transformative power hidden within these challenging seasons of faith.",
    contentType: "video",
    school: "mystical-masterclass",
    duration: 3600, // 60 minutes
    previewDuration: 300,
    price: 6000, // $60
    isSubscriberOnly: true,
    orderIndex: 2,
    resources: [
      {
        name: "St. John of the Cross Study Guide",
        url: "/resources/dark-night-study-guide.pdf",
        type: "pdf",
      },
    ],
    tags: ["purification", "mystical", "advanced", "st-john-of-the-cross"],
    isPublished: true,
  },
  {
    title: "Mystical Union: The Goal of Spiritual Life",
    description:
      "Explore the ultimate goal of the mystical journey - union with God. This advanced teaching delves into the stages of mystical union and the characteristics of those who have achieved this sublime state.",
    contentType: "video",
    school: "mystical-masterclass",
    duration: 4200, // 70 minutes
    previewDuration: 300,
    price: 7500, // $75
    isSubscriberOnly: true,
    orderIndex: 3,
    tags: ["union", "mystical", "advanced", "transformation"],
    isPublished: true,
  },
  {
    title: "Complete Mystical Foundations Course",
    description:
      "A comprehensive 8-week course covering all foundational aspects of mystical spirituality. Includes video lessons, guided meditations, reading materials, and practical exercises for spiritual growth.",
    contentType: "course",
    school: "mystical-masterclass",
    duration: 14400, // 4 hours total
    price: 25000, // $250
    isSubscriberOnly: true,
    resources: [
      {
        name: "Course Workbook",
        url: "/resources/mystical-foundations-workbook.pdf",
        type: "pdf",
      },
      {
        name: "Reading List",
        url: "/resources/mystical-reading-list.pdf",
        type: "pdf",
      },
    ],
    tags: ["course", "foundations", "comprehensive", "mystical"],
    isPublished: true,
  },

  // Open Scroll Content
  {
    title: "Understanding Prophetic Dreams",
    description:
      "Learn to discern and interpret prophetic dreams according to biblical principles. This teaching covers the different types of prophetic dreams, interpretation methods, and how to steward these divine communications.",
    contentType: "video",
    school: "open-scroll",
    duration: 2700, // 45 minutes
    previewDuration: 300,
    price: 5000, // $50
    isSubscriberOnly: true,
    orderIndex: 1,
    resources: [
      {
        name: "Dream Journal Template",
        url: "/resources/dream-journal-template.pdf",
        type: "pdf",
      },
      {
        name: "Symbol Dictionary",
        url: "/resources/prophetic-symbols-dictionary.pdf",
        type: "pdf",
      },
    ],
    tags: ["dreams", "prophetic", "interpretation", "symbols"],
    isPublished: true,
  },
  {
    title: "The Gift of Prophecy in the Modern Church",
    description:
      "Explore how the gift of prophecy operates in today's church context. This comprehensive teaching addresses common questions, biblical guidelines, and practical applications for prophetic ministry.",
    contentType: "video",
    school: "open-scroll",
    duration: 3300, // 55 minutes
    previewDuration: 300,
    price: 5500, // $55
    isSubscriberOnly: true,
    orderIndex: 2,
    tags: ["prophecy", "church", "ministry", "spiritual-gifts"],
    isPublished: true,
  },
  {
    title: "Discerning the Voice of God",
    description:
      "Master the art of hearing God's voice clearly. This essential teaching covers the different ways God speaks, how to test what you're hearing, and developing sensitivity to the Holy Spirit's leading.",
    contentType: "video",
    school: "open-scroll",
    duration: 2100, // 35 minutes
    previewDuration: 300,
    price: 4000, // $40
    isSubscriberOnly: true,
    orderIndex: 3,
    tags: ["hearing-god", "discernment", "holy-spirit", "voice"],
    isPublished: true,
  },
  {
    title: "Prophetic Intercession Masterclass",
    description:
      "Advanced training in prophetic intercession - praying God's heart for nations, regions, and individuals. Learn to partner with God in His redemptive purposes through strategic spiritual warfare.",
    contentType: "video",
    school: "open-scroll",
    duration: 3900, // 65 minutes
    previewDuration: 300,
    price: 6500, // $65
    isSubscriberOnly: true,
    orderIndex: 4,
    tags: ["intercession", "prophetic", "spiritual-warfare", "advanced"],
    isPublished: true,
  },

  // General Content (available to all subscribers)
  {
    title: "Biblical Foundations of Spiritual Authority",
    description:
      "Understanding spiritual authority according to Scripture. This foundational teaching covers the source of spiritual authority, how to walk in it responsibly, and the dangers of misusing authority.",
    contentType: "video",
    school: "general",
    duration: 1800, // 30 minutes
    previewDuration: 300,
    price: 3000, // $30
    isSubscriberOnly: false, // Free content
    tags: ["authority", "biblical", "foundations", "leadership"],
    isPublished: true,
  },
  {
    title: "The Power of Fasting and Prayer",
    description:
      "Discover the spiritual discipline of fasting as a tool for breakthrough and intimacy with God. Learn different types of fasting, how to fast safely, and what to expect during your fasting journey.",
    contentType: "video",
    school: "general",
    duration: 2700, // 45 minutes
    previewDuration: 300,
    price: 4000, // $40
    isSubscriberOnly: true,
    resources: [
      {
        name: "Fasting Guide",
        url: "/resources/fasting-guide.pdf",
        type: "pdf",
      },
    ],
    tags: ["fasting", "prayer", "discipline", "breakthrough"],
    isPublished: true,
  },
  {
    title: "Walking in Divine Health",
    description:
      "Biblical principles for divine health and healing. Learn about God's will for health, how to pray for healing, and maintaining wellness through spiritual practices and faith.",
    contentType: "video",
    school: "general",
    duration: 3000, // 50 minutes
    previewDuration: 300,
    price: 5000, // $50
    isSubscriberOnly: true,
    tags: ["healing", "health", "divine", "wellness"],
    isPublished: true,
  },

  // Bundle Content
  {
    title: "Complete Spiritual Foundations Bundle",
    description:
      "Everything you need to build a strong spiritual foundation. Includes courses on prayer, fasting, hearing God's voice, spiritual authority, and divine health. Perfect for new believers or those wanting to strengthen their basics.",
    contentType: "bundle",
    school: "general",
    price: 15000, // $150 (significant discount)
    isSubscriberOnly: true,
    resources: [
      {
        name: "Complete Study Guide",
        url: "/resources/foundations-complete-guide.pdf",
        type: "pdf",
      },
      {
        name: "Audio Companions",
        url: "/resources/foundations-audio.zip",
        type: "audio",
      },
    ],
    tags: ["bundle", "foundations", "complete", "beginner"],
    isPublished: true,
  },
  {
    title: "Advanced Prophetic Training Bundle",
    description:
      "Master-level training in prophetic ministry. Includes all Open Scroll courses plus exclusive advanced materials on prophetic intercession, corporate prophecy, and training others in the prophetic.",
    contentType: "bundle",
    school: "open-scroll",
    price: 30000, // $300
    isSubscriberOnly: true,
    resources: [
      {
        name: "Advanced Training Manual",
        url: "/resources/advanced-prophetic-manual.pdf",
        type: "pdf",
      },
      {
        name: "Certification Materials",
        url: "/resources/prophetic-certification.pdf",
        type: "pdf",
      },
    ],
    tags: ["bundle", "advanced", "prophetic", "training"],
    isPublished: true,
  },
];

async function seedContentLibrary() {
  console.log("🌱 Seeding content library...\n");

  try {
    const courseIds: Record<string, string> = {};
    let createdCount = 0;

    for (const content of sampleContent) {
      console.log(`Creating: ${content.title}...`);

      const now = new Date().toISOString();

      const parentCourseIdString =
        content.contentType === "video" && content.school !== "general"
          ? courseIds[`${content.school}-course`]
          : undefined;

      const contentData = {
        ...content,
        videoUrl:
          content.videoUrl ||
          `https://example.com/videos/${content.title.toLowerCase().replace(/\s+/g, "-")}.mp4`,
        thumbnailUrl:
          content.thumbnailUrl ||
          `https://example.com/thumbnails/${content.title.toLowerCase().replace(/\s+/g, "-")}.jpg`,
        parentCourseId: parentCourseIdString
          ? (parentCourseIdString as Id<"contentLibrary">)
          : undefined,
        publishedAt: content.isPublished ? now : undefined,
        createdAt: now,
        updatedAt: now,
      };

      const contentId = await convex.mutation(
        api.subscriptions.createContent,
        contentData,
      );

      // Store course IDs for linking videos
      if (content.contentType === "course") {
        courseIds[`${content.school}-course`] = contentId;
      }

      createdCount++;
      console.log(`✅ Created: ${content.title} (${contentId})`);
    }

    console.log(`\n🎉 Successfully seeded ${createdCount} content items!`);
    console.log("\nContent breakdown:");

    const breakdown = sampleContent.reduce(
      (acc, item) => {
        const key = `${item.school}-${item.contentType}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    Object.entries(breakdown).forEach(([key, count]) => {
      console.log(`  ${key}: ${count} items`);
    });

    console.log("\nNext steps:");
    console.log("1. Visit /content to see the content library");
    console.log("2. Test subscription flows with the seeded content");
    console.log("3. Set up actual video URLs and thumbnails");
    console.log("4. Configure payment processing for individual purchases");
  } catch (error) {
    console.error("❌ Error seeding content library:", error);
    throw error;
  }
}

// Verify environment setup
if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  console.error("❌ NEXT_PUBLIC_CONVEX_URL environment variable is required");
  process.exit(1);
}

// Run the seeding
seedContentLibrary()
  .then(() => {
    console.log("\n✨ Content library seeding complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Seeding failed:", error);
    process.exit(1);
  });
