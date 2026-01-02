"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { larken } from "@/lib/fonts";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Healing Service",
    subtitle: "Experience God's Healing Power",
    date: "April 15, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Main Sanctuary",
    category: "Healing",
    attendees: "200+ Expected",
    description:
      "Join us for a powerful evening of worship, prayer, and divine healing. Witness testimonies of miraculous healings and experience God's transformative touch in your life.",
    fullDescription:
      "This special healing service brings together believers from across the region for an evening dedicated to experiencing God's healing power. Through worship, corporate prayer, and individual ministry, we create an atmosphere where the Holy Spirit moves freely. Past services have seen countless testimonies of physical healing, emotional restoration, and spiritual breakthroughs.",
    image:
      "https://images.unsplash.com/photo-1530688957198-8570b1819eeb?q=80&w=2114&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Elijah Conference 2024",
    subtitle: "Raising Up a Generation of Prophets",
    date: "May 20-22, 2024",
    time: "9:00 AM - 9:00 PM",
    location: "Conference Center",
    category: "Conference",
    attendees: "500+ Expected",
    description:
      "A three-day intensive conference focused on developing the prophetic gift and understanding the Elijah mandate for this generation.",
    fullDescription:
      "The Elijah Conference is our premier annual gathering that brings together prophetic voices and those hungry to grow in prophetic ministry. Over three transformative days, you'll receive impartation, training, and activation in the prophetic. Learn from seasoned ministers, engage in prophetic workshops, and experience corporate prophetic worship like never before.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Healing Revival Night",
    subtitle: "Miracles, Signs & Wonders",
    date: "April 28, 2024",
    time: "7:00 PM - 10:00 PM",
    location: "Main Sanctuary",
    category: "Healing",
    attendees: "300+ Expected",
    description:
      "An extended evening of supernatural ministry where we press in for breakthrough healings and miraculous signs from heaven.",
    fullDescription:
      "Building on the momentum of our regular healing services, Revival Nights are extended gatherings where we create space for the Holy Spirit to move in extraordinary ways. These evenings feature extended worship, testimonies of God's faithfulness, and focused ministry time for those seeking physical, emotional, or spiritual healing.",
    image:
      "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Prophetic Encounter",
    subtitle: "Hear the Voice of God",
    date: "June 5, 2024",
    time: "6:30 PM - 9:00 PM",
    location: "Prayer Chapel",
    category: "Conference",
    attendees: "150+ Expected",
    description:
      "An intimate gathering focused on hearing God's voice and receiving prophetic words for your life and calling.",
    fullDescription:
      "In this smaller, more intimate setting, we focus on personal encounters with God's prophetic voice. Through soaking prayer, activation exercises, and one-on-one ministry, participants learn to discern God's voice more clearly and receive specific prophetic direction for their lives.",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Summer Healing Crusade",
    subtitle: "City-Wide Outreach",
    date: "July 10-12, 2024",
    time: "5:00 PM - 10:00 PM",
    location: "City Park Arena",
    category: "Healing",
    attendees: "1000+ Expected",
    description:
      "Our largest healing event of the year - a three-day outdoor crusade bringing the message of Jesus and His healing power to our entire city.",
    fullDescription:
      "The Summer Healing Crusade is our biggest outreach event, taking the message of salvation and healing beyond our church walls. With live worship, powerful preaching, and mass prayer for the sick, we've seen thousands come to Christ and countless healings over the years. This is a family-friendly event with activities for all ages.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Prophetic Worship Night",
    subtitle: "Songs from Heaven",
    date: "June 18, 2024",
    time: "7:00 PM - 9:30 PM",
    location: "Worship Center",
    category: "Conference",
    attendees: "250+ Expected",
    description:
      "Experience the power of prophetic worship as spontaneous songs flow from the throne room, bringing breakthrough and transformation.",
    fullDescription:
      "Prophetic Worship Nights blend musical excellence with spiritual sensitivity as our worship team creates space for spontaneous songs birthed in the presence of God. These aren't rehearsed performances but organic expressions of worship that carry prophetic weight and bring breakthrough to participants.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function EventsPage() {
  const [upcomingEvent, ...otherEvents] = events;

  return (
    <PageWrapper>
      {/* Hero Section with Distinctive Visual */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 lg:px-8">
        {/* Decorative Background Element */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16 mb-24 text-center"
          >
            <p className="mb-4 text-xs tracking-[0.4em] text-black/60 uppercase dark:text-white/60">
              Explore
            </p>
            <h1
              className={`${larken.className} mb-6 text-5xl font-bold md:text-7xl`}
            >
              Events
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-black/70 dark:text-white/70">
              Join us for powerful gatherings where heaven touches earth. From
              healing services to prophetic conferences, each event is designed
              to encounter God&apos;s presence.
            </p>
          </motion.div>

          {/* Featured Upcoming Event */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-24"
          >
            <h2 className={`${larken.className} mb-8 text-3xl font-bold`}>
              Latest Event
            </h2>

            <div className="group relative overflow-hidden border-2 border-black/10 bg-neutral-50 transition-all duration-500 hover:border-black hover:shadow-2xl dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white">
              <div className="grid gap-0 lg:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-80 overflow-hidden lg:h-auto">
                  <img
                    src={upcomingEvent.image}
                    alt={upcomingEvent.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent lg:bg-linear-to-r"></div>
                  <div className="absolute top-6 left-6">
                    <div className="bg-white px-4 py-2 text-sm font-semibold text-black">
                      {upcomingEvent.category}
                    </div>
                  </div>
                  <div className="absolute right-6 bottom-6 left-6 lg:hidden">
                    <p className="text-sm font-semibold text-white">
                      {upcomingEvent.date}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center bg-white p-8 lg:p-12 dark:bg-neutral-900">
                  <p className="mb-2 text-xs tracking-[0.3em] text-black/60 uppercase dark:text-white/60">
                    {upcomingEvent.subtitle}
                  </p>
                  <h3
                    className={`${larken.className} mb-4 text-4xl font-bold lg:text-5xl`}
                  >
                    {upcomingEvent.title}
                  </h3>
                  <p className="mb-6 text-lg text-black/70 dark:text-white/70">
                    {upcomingEvent.description}
                  </p>

                  <div className="mb-8 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-black/70 dark:text-white/70">
                      <Calendar className="h-4 w-4 shrink-0" />
                      <span>
                        {upcomingEvent.date} • {upcomingEvent.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-black/70 dark:text-white/70">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span>{upcomingEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-black/70 dark:text-white/70">
                      <Users className="h-4 w-4 shrink-0" />
                      <span>{upcomingEvent.attendees}</span>
                    </div>
                  </div>

                  <Link
                    href={`/events/${upcomingEvent.id}`}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      size="lg"
                      className="w-full cursor-pointer bg-black px-8 py-6 text-base font-semibold text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* All Events Grid */}
          <div className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10"></div>
              <h2 className={`${larken.className} text-3xl font-bold`}>
                All Events
              </h2>
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherEvents.map((event, index) => (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group overflow-hidden border border-black/10 bg-neutral-50 transition-all duration-500 hover:border-black hover:shadow-xl dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40"></div>
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 text-xs font-semibold text-black">
                      {event.category}
                    </div>
                  </div>
                  <div className="bg-white p-6 dark:bg-neutral-900">
                    <p className="mb-2 text-xs tracking-[0.2em] text-black/60 uppercase dark:text-white/60">
                      {event.subtitle}
                    </p>
                    <h3
                      className={`${larken.className} mb-3 text-2xl font-bold`}
                    >
                      {event.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-black/70 dark:text-white/70">
                      {event.description}
                    </p>

                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <Link href={`/events/${event.id}`} className="block">
                      <Button className="group/btn w-full cursor-pointer bg-black font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
