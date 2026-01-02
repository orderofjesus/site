"use client";

import { use } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { larken } from "@/lib/fonts";
import Link from "next/link";
import { notFound } from "next/navigation";

// Event data - in a real app, this would come from a database/API
interface EventData {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  address: string;
  category: string;
  attendees: string;
  pricing: {
    general: string;
    earlyBird?: string;
    vip: string | null;
  };
  description: string;
  fullDescription: string;
  image: string;
  schedule: Array<{ time: string; activity: string }>;
  whatToExpect: string[];
  whatToBring: string[];
  pricingDetails: {
    general: {
      price: string;
      includes: string[];
    };
    earlyBird?: {
      price: string;
      includes: string[];
      note: string;
    };
    vip?: {
      price: string;
      includes: string[];
    };
  } | null;
}

const eventsData: Record<string, EventData> = {
  "1": {
    id: 1,
    title: "Healing Service",
    subtitle: "Experience God's Healing Power",
    date: "April 15, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Main Sanctuary",
    address: "123 Kingdom Way, City Center, ST 12345",
    category: "Healing",
    attendees: "200+ Expected",
    pricing: {
      general: "Free",
      vip: null,
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
  },
  "2": {
    id: 2,
    title: "Elijah Conference 2024",
    subtitle: "Raising Up a Generation of Prophets",
    date: "May 20-22, 2024",
    time: "9:00 AM - 9:00 PM Daily",
    location: "Conference Center",
    address: "456 Prophetic Boulevard, Downtown, ST 12345",
    category: "Conference",
    attendees: "500+ Expected",
    pricing: {
      general: "$99",
      earlyBird: "$79",
      vip: "$199",
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
      general: {
        price: "$99",
        includes: [
          "All main sessions",
          "One workshop per day",
          "Conference materials",
          "Lunch",
        ],
      },
      earlyBird: {
        price: "$79",
        includes: [
          "All general benefits",
          "Early bird discount (valid until April 30)",
        ],
        note: "Save $20 when you register early!",
      },
      vip: {
        price: "$199",
        includes: [
          "All main sessions",
          "All workshops (unlimited access)",
          "VIP seating",
          "Conference materials",
          "Lunch & dinner",
          "Meet & greet with speakers",
          "Exclusive VIP reception",
        ],
      },
    },
  },
  "3": {
    id: 3,
    title: "Healing Revival Night",
    subtitle: "Miracles, Signs & Wonders",
    date: "April 28, 2024",
    time: "7:00 PM - 10:00 PM",
    location: "Main Sanctuary",
    address: "123 Kingdom Way, City Center, ST 12345",
    category: "Healing",
    attendees: "300+ Expected",
    pricing: {
      general: "Free",
      vip: null,
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
  },
  "4": {
    id: 4,
    title: "Prophetic Encounter",
    subtitle: "Hear the Voice of God",
    date: "June 5, 2024",
    time: "6:30 PM - 9:00 PM",
    location: "Prayer Chapel",
    address: "789 Revelation Street, Northside, ST 12345",
    category: "Conference",
    attendees: "150+ Expected",
    pricing: {
      general: "$25",
      vip: null,
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
      general: {
        price: "$25",
        includes: [
          "All sessions",
          "Prophetic activation",
          "Personal ministry time",
          "Workshop materials",
        ],
      },
    },
  },
  "5": {
    id: 5,
    title: "Summer Healing Crusade",
    subtitle: "City-Wide Outreach",
    date: "July 10-12, 2024",
    time: "5:00 PM - 10:00 PM Daily",
    location: "City Park Arena",
    address: "101 Park Drive, Central Park, ST 12345",
    category: "Healing",
    attendees: "1000+ Expected",
    pricing: {
      general: "Free",
      vip: null,
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
  },
  "6": {
    id: 6,
    title: "Prophetic Worship Night",
    subtitle: "Songs from Heaven",
    date: "June 18, 2024",
    time: "7:00 PM - 9:30 PM",
    location: "Worship Center",
    address: "321 Melody Lane, Arts District, ST 12345",
    category: "Conference",
    attendees: "250+ Expected",
    pricing: {
      general: "$15",
      vip: null,
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
      general: {
        price: "$15",
        includes: [
          "Extended worship experience",
          "Prophetic ministry",
          "Refreshments provided",
        ],
      },
    },
  },
};

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const event = eventsData[id as keyof typeof eventsData];
  if (!event) {
    notFound();
  }

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/30"></div>

          {/* Breadcrumb */}
          <div className="absolute top-48 right-0 left-0 z-10 px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Events
              </Link>
            </div>
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-6 pb-12 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-4 inline-block bg-white px-4 py-1.5 text-sm font-semibold text-black">
                    {event.category}
                  </div>
                  <p className="mb-3 text-sm tracking-[0.2em] text-white/80 uppercase">
                    {event.subtitle}
                  </p>
                  <h1
                    className={`${larken.className} mb-6 text-5xl font-bold text-white md:text-7xl`}
                  >
                    {event.title}
                  </h1>
                  <div className="flex flex-wrap gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span className="text-sm font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span className="text-sm font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        {event.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        {event.attendees}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left Column - Main Content */}
            <div className="space-y-12 lg:col-span-2">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={`${larken.className} mb-6 text-3xl font-bold`}>
                  About This Event
                </h2>
                <p className="mb-4 text-lg leading-relaxed text-black/80 dark:text-white/80">
                  {event.description}
                </p>
                <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
                  {event.fullDescription}
                </p>
              </motion.div>

              {/* Location Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className={`${larken.className} mb-6 text-3xl font-bold`}>
                  Location
                </h2>
                <div className="border border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-900">
                  <p className="mb-2 text-lg font-semibold">{event.location}</p>
                  <p className="text-base text-black/70 dark:text-white/70">
                    {event.address}
                  </p>
                </div>
              </motion.div>

              {/* Schedule */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className={`${larken.className} mb-6 text-3xl font-bold`}>
                  Event Schedule
                </h2>
                <div className="space-y-4">
                  {event.schedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-6 border-l-2 border-black/10 pb-4 pl-6 last:pb-0 dark:border-white/10"
                    >
                      <div className="min-w-[100px] pt-1">
                        <p className="text-sm font-semibold">{item.time}</p>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-base text-black/80 dark:text-white/80">
                          {item.activity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* What to Expect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className={`${larken.className} mb-6 text-3xl font-bold`}>
                  What to Expect
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {event.whatToExpect.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-black dark:text-white" />
                      <span className="text-base text-black/80 dark:text-white/80">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* What to Bring */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className={`${larken.className} mb-6 text-3xl font-bold`}>
                  What to Bring
                </h2>
                <ul className="space-y-3">
                  {event.whatToBring.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-black dark:text-white" />
                      <span className="text-base text-black/80 dark:text-white/80">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-24 space-y-6"
              >
                {/* Pricing Card */}
                <div className="border-2 border-black/10 bg-white p-8 dark:border-white/10 dark:bg-neutral-900">
                  <h3 className={`${larken.className} mb-6 text-2xl font-bold`}>
                    Registration
                  </h3>

                  {/* Pricing Options */}
                  <div className="mb-8 space-y-4">
                    {event.pricingDetails ? (
                      // Multiple pricing tiers
                      <>
                        {event.pricingDetails.earlyBird && (
                          <div className="border border-black/20 bg-neutral-50 p-4 dark:border-white/20 dark:bg-neutral-800">
                            <div className="mb-2 flex items-center justify-between">
                              <h4 className="font-semibold">Early Bird</h4>
                              <p className="text-2xl font-bold">
                                {event.pricingDetails.earlyBird.price}
                              </p>
                            </div>
                            <p className="mb-3 text-xs text-black/60 dark:text-white/60">
                              {event.pricingDetails.earlyBird.note}
                            </p>
                            <ul className="space-y-1.5 text-sm">
                              {event.pricingDetails.earlyBird.includes.map(
                                (item, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2"
                                  >
                                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span className="text-black/70 dark:text-white/70">
                                      {item}
                                    </span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}

                        <div className="border border-black/20 p-4 dark:border-white/20">
                          <div className="mb-2 flex items-center justify-between">
                            <h4 className="font-semibold">General Admission</h4>
                            <p className="text-2xl font-bold">
                              {event.pricingDetails.general.price}
                            </p>
                          </div>
                          <ul className="space-y-1.5 text-sm">
                            {event.pricingDetails.general.includes.map(
                              (item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0" />
                                  <span className="text-black/70 dark:text-white/70">
                                    {item}
                                  </span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>

                        {event.pricingDetails.vip && (
                          <div className="border-2 border-black bg-neutral-50 p-4 dark:border-white dark:bg-neutral-800">
                            <div className="mb-3 flex items-center justify-between">
                              <h4 className="font-semibold">VIP Experience</h4>
                              <p className="text-2xl font-bold">
                                {event.pricingDetails.vip.price}
                              </p>
                            </div>
                            <ul className="space-y-1.5 text-sm">
                              {event.pricingDetails.vip.includes.map(
                                (item, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2"
                                  >
                                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0" />
                                    <span className="text-black/70 dark:text-white/70">
                                      {item}
                                    </span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                      </>
                    ) : (
                      // Single pricing
                      <div className="py-4 text-center">
                        <p className="mb-2 text-sm tracking-wider text-black/60 uppercase dark:text-white/60">
                          Admission
                        </p>
                        <p className="text-4xl font-bold">
                          {event.pricing.general}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Registration Button */}
                  <Button
                    size="lg"
                    className="w-full bg-black py-6 text-base font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    Register Now
                  </Button>

                  <p className="mt-4 text-center text-xs text-black/60 dark:text-white/60">
                    Secure registration • Instant confirmation
                  </p>
                </div>

                {/* Quick Info Card */}
                <div className="border border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-900">
                  <h3 className="mb-4 font-semibold">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-black/60 dark:text-white/60" />
                      <div>
                        <p className="font-medium">{event.date}</p>
                        <p className="text-black/60 dark:text-white/60">
                          {event.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-black/60 dark:text-white/60" />
                      <div>
                        <p className="font-medium">{event.location}</p>
                        <p className="text-black/60 dark:text-white/60">
                          {event.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="mt-0.5 h-4 w-4 flex-shrink-0 text-black/60 dark:text-white/60" />
                      <div>
                        <p className="font-medium">{event.attendees}</p>
                        <p className="text-black/60 dark:text-white/60">
                          {event.pricing.general === "Free"
                            ? "Free event"
                            : "Paid event"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share Section */}
                <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
                  <h3 className="mb-4 font-semibold">Share This Event</h3>
                  <p className="text-sm text-black/70 dark:text-white/70">
                    Invite your friends and family to join you at this powerful
                    event.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
