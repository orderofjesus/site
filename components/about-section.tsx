"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Users,
  MapPin,
  Book,
  Globe,
  Sparkles,
  Play,
  ArrowRight,
  Quote,
} from "lucide-react";
import { hellix, larken } from "@/lib/fonts";

const features = [
  {
    icon: Heart,
    title: "Authentic Worship",
    desc: "Experience genuine, spirit-filled worship that honors God and transforms hearts.",
    detail:
      "Join us every Sunday as we lift our voices in contemporary and traditional worship, guided by the Holy Spirit.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Build meaningful relationships in small groups and serve together in ministry.",
    detail:
      "Over 50 small groups meet weekly across the city, fostering deep connections and spiritual growth.",
  },
  {
    icon: MapPin,
    title: "Local Impact",
    desc: "Serve our city with compassion, meeting practical needs and sharing the gospel.",
    detail:
      "Our outreach programs touch over 2,500 families annually through food banks, shelters, and community events.",
  },
  {
    icon: Book,
    title: "Biblical Teaching",
    desc: "Grow in your faith through verse-by-verse expository preaching rooted in Scripture.",
    detail:
      "Our pastors are committed to rightly dividing the Word of Truth, equipping saints for ministry.",
  },
  {
    icon: Globe,
    title: "Global Missions",
    desc: "Partner with missionaries worldwide to spread the gospel to the ends of the earth.",
    detail:
      "Supporting 15 mission families across 4 continents, planting churches and serving the unreached.",
  },
  {
    icon: Sparkles,
    title: "Spirit-Led Ministry",
    desc: "Empowered by the Holy Spirit to live out our faith with boldness and grace.",
    detail:
      "We believe in the active work of the Spirit, gifting believers for effective kingdom service.",
  },
];

const coreValues = [
  {
    title: "Scripture",
    description: "The Bible is our final authority for faith and practice.",
  },
  {
    title: "Prayer",
    description: "We depend on God through consistent, fervent prayer.",
  },
  {
    title: "Unity",
    description: "We pursue unity in Christ across all barriers.",
  },
  {
    title: "Excellence",
    description: "We do all things with excellence for God's glory.",
  },
];

const stats = [
  { number: "25+", label: "Years Serving", sublabel: "Since 1999" },
  { number: "2,500+", label: "Active Members", sublabel: "Growing Family" },
  { number: "50+", label: "Small Groups", sublabel: "Across the City" },
  { number: "15", label: "Mission Partners", sublabel: "Worldwide" },
];

const leadership = [
  {
    name: "Rev. John Mitchell",
    role: "Lead Pastor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    quote:
      "My passion is to see people encounter Jesus and be transformed by His love.",
  },
  {
    name: "Pastor Sarah Johnson",
    role: "Worship & Arts",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    quote:
      "Worship is not just music, it's a lifestyle of surrender to Christ.",
  },
  {
    name: "Pastor Michael Brown",
    role: "Community Outreach",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    quote:
      "The gospel compels us to serve the least, the lost, and the broken.",
  },
];

const timeline = [
  {
    year: "1999",
    event: "Church Founded",
    detail: "Started with 30 believers in a home",
  },
  {
    year: "2005",
    event: "First Building",
    detail: "Moved into our first worship facility",
  },
  {
    year: "2012",
    event: "Global Missions",
    detail: "Sent our first missionary family overseas",
  },
  {
    year: "2018",
    event: "Community Center",
    detail: "Opened outreach center serving 1,000+ monthly",
  },
  {
    year: "2024",
    event: "Multi-Site Launch",
    detail: "Expanding to serve more communities",
  },
];

type TabType = "mission" | "values" | "leadership" | "history";

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<TabType>("mission");
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const tabs: { id: TabType; label: string }[] = [
    { id: "mission", label: "Our Mission" },
    { id: "values", label: "Core Values" },
    { id: "leadership", label: "Leadership" },
    // { id: "history", label: "Our Story" },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-neutral-50 py-32 transition-colors duration-300 dark:bg-neutral-800"
    >
      {/* Decorative Element */}
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] bg-black/5 blur-[100px] dark:bg-white/5" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="mb-4 text-xs tracking-[0.4em] text-black/60 uppercase dark:text-white/60">
            About Us
          </p>
          <h2
            className={`${larken.className} mb-6 text-5xl font-bold md:text-6xl`}
          >
            Know Jesus,
            <br />
            Make Him Known
          </h2>
          <p className="max-w-2xl text-xl leading-relaxed text-black/70 dark:text-white/70">
            We are a Christ-centered community dedicated to worship,
            discipleship, and service. Our mission is to glorify God by making
            disciples who love Jesus and transform the world.
          </p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Column - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1400&auto=format&fit=crop"
                alt="Community worship"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Play Button Overlay for Video */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const videoUrl =
                    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
                  const modal = document.createElement("div");
                  modal.className =
                    "fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4";
                  modal.innerHTML = `
                    <div class="relative w-full max-w-5xl aspect-video">
                      <button class="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 transition-colors">&times;</button>
                      <iframe 
                        src="${videoUrl}" 
                        class="w-full h-full" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media" 
                        allowfullscreen
                      ></iframe>
                    </div>
                  `;
                  document.body.appendChild(modal);
                  document.body.style.overflow = "hidden";

                  modal.addEventListener("click", (e) => {
                    if (
                      e.target === modal ||
                      (e.target as HTMLElement).tagName === "BUTTON"
                    ) {
                      document.body.removeChild(modal);
                      document.body.style.overflow = "";
                    }
                  });
                }}
                className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300 hover:bg-black/30"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-white/20 backdrop-blur-sm">
                  <Play className="h-8 w-8 text-white" fill="white" />
                </div>
              </motion.button>
            </div>

            {/* Secondary Images */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop"
                  alt="Community serving"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop"
                  alt="Worship team"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Testimonial Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 border-l-4 border-black bg-white p-6 dark:border-white dark:bg-neutral-900"
            >
              <Quote className="mb-3 h-6 w-6 text-black/40 dark:text-white/40" />
              <p
                className={`${larken.className} mb-3 text-lg leading-relaxed italic`}
              >
                &quot;This church changed my life. I found not just a place to
                worship, but a family that truly lives out the love of
                Christ.&quot;
              </p>
              <p className="text-sm font-semibold">
                — Sarah M., Member since 2018
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Tabbed Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Tab Navigation */}
            <div className="mb-8 flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "border border-black/20 hover:border-black dark:border-white/20 dark:hover:border-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "mission" && (
                <motion.div
                  key="mission"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <p className="text-xl leading-relaxed text-black/80 dark:text-white/80">
                      We exist to glorify God by making disciples who love Jesus
                      and transform the world. Through authentic worship,
                      biblical teaching, and Spirit-led ministry, we create a
                      community where people experience genuine encounters with
                      Christ. We&apos;re committed to serving our city with
                      compassion, partnering with missionaries worldwide, and
                      empowering believers to live out their faith with boldness
                      and grace. Our vision is simple: know Jesus, make Him
                      known.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "values" && (
                <motion.div
                  key="values"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <p className="text-lg leading-relaxed text-black/70 dark:text-white/70">
                    Our core values guide everything we do as a church
                    community. These principles shape our worship, ministry, and
                    mission.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {coreValues.map((value, index) => (
                      <motion.div
                        key={value.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="border-2 border-black bg-white p-6 transition-all duration-300 hover:shadow-lg dark:border-white dark:bg-neutral-900"
                      >
                        <h4
                          className={`${larken.className} mb-2 text-2xl font-bold`}
                        >
                          {value.title}
                        </h4>
                        <p className="text-sm text-black/70 dark:text-white/70">
                          {value.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "leadership" && (
                <motion.div
                  key="leadership"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <p className="text-lg leading-relaxed text-black/70 dark:text-white/70">
                    Our pastoral team is committed to serving Christ and
                    shepherding our congregation with wisdom, compassion, and
                    biblical integrity.
                  </p>
                  <div className="space-y-4">
                    {leadership.map((leader, index) => (
                      <motion.div
                        key={leader.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex gap-6 border border-black/10 bg-white p-6 transition-all duration-300 hover:border-black hover:shadow-lg dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white"
                      >
                        <div className="h-24 w-24 shrink-0 overflow-hidden">
                          <img
                            src={leader.image}
                            alt={leader.name}
                            className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
                          />
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`${larken.className} mb-1 text-xl font-bold`}
                          >
                            {leader.name}
                          </h4>
                          <p className="mb-3 text-sm font-semibold text-black/60 dark:text-white/60">
                            {leader.role}
                          </p>
                          <p className="text-sm text-black/70 italic dark:text-white/70">
                            &quot;{leader.quote}&quot;
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "history" && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <p className="text-lg leading-relaxed text-black/70 dark:text-white/70">
                    From humble beginnings to a thriving community, God has been
                    faithful through every season of our church&apos;s journey.
                  </p>
                  <div className="relative space-y-8 border-l-2 border-black/20 pl-8 dark:border-white/20">
                    {timeline.map((item, index) => (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="relative"
                      >
                        <div className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white dark:border-white dark:bg-neutral-900">
                          <div className="h-3 w-3 rounded-full bg-black dark:bg-white" />
                        </div>
                        <div className="border border-black/10 bg-white p-6 transition-all duration-300 hover:border-black hover:shadow-lg dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white">
                          <p
                            className={`${larken.className} mb-2 text-3xl font-bold`}
                          >
                            {item.year}
                          </p>
                          <h4
                            className={`${larken.className} mb-2 text-xl font-bold`}
                          >
                            {item.event}
                          </h4>
                          <p className="text-sm text-black/70 dark:text-white/70">
                            {item.detail}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <button className="group flex w-full items-center justify-center gap-2 bg-black px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                Plan Your Visit
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
