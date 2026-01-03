"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { motion } from "framer-motion";
import { larken } from "@/lib/fonts";
import {
  ArrowRight,
  Users,
  Mountain,
  Calendar,
  Clock,
  MapPin,
  Check,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const mentorshipOptions = [
  {
    num: "01",
    icon: "👥",
    title: "One-on-One Mentorship",
    subtitle: "Personal Guidance",
    desc: "Receive personalized spiritual direction and mentoring tailored to your unique calling and season of life.",
    featured: false,
  },
  {
    num: "02",
    icon: "⛰️",
    title: "Elijah Network",
    subtitle: "Retreat Experience",
    desc: "Join an intensive retreat community where prophetic voices gather for immersive learning and impartation.",
    featured: true,
  },
];

export default function MentorshipPage() {
  return (
    <PageWrapper>
      {/* Hero Section - Split Decision */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16 mb-16 text-center"
          >
            <p className="mb-4 text-xs tracking-[0.4em] text-black/60 uppercase dark:text-white/60">
              Grow with Us
            </p>
            <h1
              className={`${larken.className} mb-6 text-5xl font-bold md:text-7xl`}
            >
              Two Paths, One Purpose
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-black/70 dark:text-white/70">
              Whether you&apos;re seeking personal guidance or intensive
              community learning, we offer distinct mentorship experiences
              designed for your spiritual growth.
            </p>
          </motion.div>

          {/* Split Options */}
          <div className="mb-32 grid gap-8 md:grid-cols-2">
            {mentorshipOptions.map((option, index) => (
              <Link
                key={option.num}
                href={`/mentorship/${option.num === "01" ? "#one-on-one" : "#elijah-network"}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative cursor-pointer border-2 p-10 transition-all duration-500 ${
                    option.featured
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                      : "border-black bg-white hover:bg-black hover:text-white dark:border-white dark:bg-neutral-900 dark:hover:bg-white dark:hover:text-black"
                  }`}
                >
                  <div
                    className={`absolute top-10 right-10 text-8xl font-bold transition-colors ${
                      option.featured
                        ? "text-white/10 dark:text-black/10"
                        : "text-black/5 group-hover:text-white/10 dark:text-white/5 dark:group-hover:text-black/10"
                    }`}
                  >
                    {option.num}
                  </div>
                  <div className="relative">
                    <div className="mb-6 text-5xl">{option.icon}</div>
                    <p
                      className={`mb-4 text-xs tracking-[0.3em] uppercase transition-colors ${
                        option.featured
                          ? "text-white/70 dark:text-black/70"
                          : "text-black/60 group-hover:text-white/70 dark:text-white/60 dark:group-hover:text-black/70"
                      }`}
                    >
                      {option.subtitle}
                    </p>
                    <h3
                      className={`${larken.className} mb-4 text-3xl font-bold`}
                    >
                      {option.title}
                    </h3>
                    <p
                      className={`mb-8 text-sm transition-colors ${
                        option.featured
                          ? "text-white/70 dark:text-black/70"
                          : "text-black/60 group-hover:text-white/70 dark:text-white/60 dark:group-hover:text-black/70"
                      }`}
                    >
                      {option.desc}
                    </p>
                    <Link
                      href={`/mentorship/${option.num === "01" ? "#one-on-one" : "#elijah-network"}`}
                      className={`block w-full py-3 text-center font-semibold transition-all duration-300 ${
                        option.featured
                          ? "bg-white text-black hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90"
                          : "bg-black text-white group-hover:bg-white group-hover:text-black dark:bg-white dark:text-black dark:group-hover:bg-black dark:group-hover:text-white"
                      }`}
                    >
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* One-on-One Mentorship Section */}
      <section
        id="one-on-one"
        className="relative overflow-hidden bg-white py-32 transition-colors duration-300 dark:bg-neutral-900"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                  <Users className="h-4 w-4" />
                  One-on-One Mentorship
                </div>
              </div>

              <h2 className={`${larken.className} mb-6 text-5xl font-bold`}>
                Personal Guidance for Your Journey
              </h2>

              <p className="mb-8 text-xl leading-relaxed text-black/70 dark:text-white/70">
                Walk alongside an experienced spiritual mentor who will provide
                personalized guidance, accountability, and wisdom tailored to
                your unique calling and season of life.
              </p>

              <div className="mb-10 space-y-6">
                <h3 className={`${larken.className} mb-4 text-2xl font-bold`}>
                  What You&apos;ll Experience
                </h3>

                <div className="space-y-4">
                  {[
                    "Regular one-on-one meetings with your assigned mentor",
                    "Personalized spiritual direction and prayer support",
                    "Accountability and guidance in your calling",
                    "Access to resources and teachings curated for your growth",
                    "Confidential space to process life and ministry challenges",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                      <span className="text-black/80 dark:text-white/80">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className={`${larken.className} mb-4 text-2xl font-bold`}>
                  Who It&apos;s For
                </h3>
                <p className="leading-relaxed text-black/70 dark:text-white/70">
                  This program is ideal for individuals seeking personalized
                  spiritual guidance, those navigating a season of transition,
                  emerging leaders looking to develop their calling, or anyone
                  desiring deeper accountability in their walk with God.
                </p>
              </div>

              <div className="mt-10">
                <button className="group inline-flex cursor-pointer items-center justify-center gap-2 bg-black px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                  Apply for Mentorship
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="sticky top-32">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1400&auto=format&fit=crop"
                    alt="One-on-one mentorship"
                    className="h-[600px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Stats Card */}
                <div className="absolute -bottom-8 -left-8 bg-white p-6 shadow-2xl dark:bg-neutral-800">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div
                        className={`${larken.className} text-4xl font-bold text-blue-600 dark:text-blue-400`}
                      >
                        6-12
                      </div>
                      <div className="text-sm text-black/60 dark:text-white/60">
                        Months
                      </div>
                    </div>
                    <div className="h-12 w-px bg-black/10 dark:bg-white/10"></div>
                    <div className="text-center">
                      <div
                        className={`${larken.className} text-4xl font-bold text-blue-600 dark:text-blue-400`}
                      >
                        1:1
                      </div>
                      <div className="text-sm text-black/60 dark:text-white/60">
                        Format
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual Divider */}
      <section className="bg-neutral-100 py-20 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <div className="h-px flex-1 bg-black/10 dark:bg-white/10"></div>
            <div className="text-center">
              <p className="text-xs tracking-[0.3em] text-black/40 uppercase dark:text-white/40">
                Or explore our retreat experience
              </p>
            </div>
            <div className="h-px flex-1 bg-black/10 dark:bg-white/10"></div>
          </div>
        </div>
      </section>

      {/* Elijah Network (Retreat) Section */}
      <section
        id="elijah-network"
        className="relative overflow-hidden bg-neutral-900 py-32 text-white transition-colors duration-300 dark:bg-black"
      >
        {/* Background with mountain/fire theme */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(255, 165, 0, 0.1) 100%)`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Image - Left side this time for variety */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="sticky top-32">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1400&auto=format&fit=crop"
                    alt="Elijah Network Retreat"
                    className="h-[600px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

                  {/* Overlay badge */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-amber-500 px-4 py-2 text-sm font-semibold text-black">
                      ⛰️ Intensive Retreat
                    </div>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="absolute -right-8 -bottom-8 bg-amber-500 p-6 text-black shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className={`${larken.className} text-4xl font-bold`}>
                        3-7
                      </div>
                      <div className="text-sm opacity-80">Days</div>
                    </div>
                    <div className="h-12 w-px bg-black/20"></div>
                    <div className="text-center">
                      <div className={`${larken.className} text-4xl font-bold`}>
                        12 people
                      </div>
                      <div className="text-sm opacity-80">Maximum</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/20 px-4 py-2 text-sm font-semibold text-amber-400">
                  <Mountain className="h-4 w-4" />
                  Elijah Network Retreat
                </div>
              </div>

              <h2 className={`${larken.className} mb-6 text-5xl font-bold`}>
                Intensive Community Learning
              </h2>

              <p className="mb-8 text-xl leading-relaxed text-white/80">
                Step away from the everyday and immerse yourself in an intensive
                retreat where prophetic voices gather for deep teaching,
                impartation, and community learning in the spirit of Elijah.
              </p>

              <div className="mb-10 space-y-6">
                <h3 className={`${larken.className} mb-4 text-2xl font-bold`}>
                  What You&apos;ll Experience
                </h3>

                <div className="space-y-4">
                  {[
                    "Intensive multi-day retreat in a focused environment",
                    "Deep teaching on prophetic ministry and the Elijah mandate",
                    "Corporate worship and soaking in God's presence",
                    "Prophetic activation and impartation sessions",
                    "Community building with like-minded believers",
                    "Guest speakers and seasoned prophetic ministers",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                      <span className="text-white/90">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mb-10 space-y-6">
                <h3 className={`${larken.className} mb-4 text-2xl font-bold`}>
                  Who It&apos;s For
                </h3>
                <p className="leading-relaxed text-white/80">
                  This retreat is designed for those called to prophetic
                  ministry, worship leaders seeking prophetic activation,
                  pastors and ministry leaders wanting to grow in prophetic
                  gifting, and anyone hungry for intensive spiritual impartation
                  in a community setting.
                </p>
              </div>

              <div className="mb-10 rounded-xl border border-white/20 bg-white/5 p-6">
                <h4
                  className={`${larken.className} mb-4 flex items-center gap-2 text-lg font-bold`}
                >
                  <Calendar className="h-5 w-5 text-amber-400" />
                  Upcoming Retreat Details
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                    <div>
                      <div className="font-semibold text-white/90">
                        Duration
                      </div>
                      <div className="text-white/70">
                        3-7 days depending on program level
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                    <div>
                      <div className="font-semibold text-white/90">
                        Location
                      </div>
                      <div className="text-white/70">
                        Retreat centers and conference venues (varies by event)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                    <div>
                      <div className="font-semibold text-white/90">
                        Next Retreat
                      </div>
                      <div className="text-white/70">
                        Dates announced quarterly - check events page
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="group inline-flex cursor-pointer items-center gap-2 bg-amber-500 px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-amber-400">
                  Register for Next Retreat
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="inline-flex cursor-pointer items-center gap-2 border border-white px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black">
                  View Schedule
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Section - Help Users Choose */}
      <section className="bg-white py-32 transition-colors duration-300 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-xs tracking-[0.4em] text-black/60 uppercase dark:text-white/60">
              Not Sure Which to Choose?
            </p>
            <h2 className={`${larken.className} mb-6 text-5xl font-bold`}>
              Compare Your Options
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-black/70 dark:text-white/70">
              Both paths lead to spiritual growth, but they offer different
              experiences. Here&apos;s a side-by-side comparison to help you
              decide.
            </p>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden border-2 border-black/10 dark:border-white/10"
          >
            <div className="grid lg:grid-cols-3">
              {/* Header Row */}
              <div className="bg-neutral-100 p-6 dark:bg-neutral-950">
                <h3 className={`${larken.className} text-xl font-bold`}>
                  Features
                </h3>
              </div>
              <div className="border-l-2 border-black/10 bg-blue-50 p-6 dark:border-white/10 dark:bg-blue-950/30">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className={`${larken.className} text-xl font-bold`}>
                    One-on-One
                  </h3>
                </div>
              </div>
              <div className="border-l-2 border-black/10 bg-amber-50 p-6 dark:border-white/10 dark:bg-amber-950/30">
                <div className="flex items-center gap-2">
                  <Mountain className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <h3 className={`${larken.className} text-xl font-bold`}>
                    Elijah Network
                  </h3>
                </div>
              </div>

              {/* Format */}
              <div className="border-t-2 border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-900">
                <p className="font-semibold text-black/80 dark:text-white/80">
                  Format
                </p>
              </div>
              <div className="border-t-2 border-l-2 border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-800">
                <p className="text-black/70 dark:text-white/70">
                  Individual meetings
                </p>
              </div>
              <div className="border-t-2 border-l-2 border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-800">
                <p className="text-black/70 dark:text-white/70">
                  Group retreat
                </p>
              </div>

              {/* Duration */}
              <div className="border-t-2 border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-900">
                <p className="font-semibold text-black/80 dark:text-white/80">
                  Duration
                </p>
              </div>
              <div className="border-t-2 border-l-2 border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-800">
                <p className="text-black/70 dark:text-white/70">6-12 months</p>
              </div>
              <div className="border-t-2 border-l-2 border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-800">
                <p className="text-black/70 dark:text-white/70">3-7 days</p>
              </div>

              {/* Time Commitment */}
              <div className="border-t-2 border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-900">
                <p className="font-semibold text-black/80 dark:text-white/80">
                  Time Commitment
                </p>
              </div>
              <div className="border-t-2 border-l-2 border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-800">
                <p className="text-black/70 dark:text-white/70">
                  Regular scheduled meetings
                </p>
              </div>
              <div className="border-t-2 border-l-2 border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-800">
                <p className="text-black/70 dark:text-white/70">
                  Intensive immersion
                </p>
              </div>

              {/* Focus */}
              <div className="border-t-2 border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-900">
                <p className="font-semibold text-black/80 dark:text-white/80">
                  Primary Focus
                </p>
              </div>
              <div className="border-t-2 border-l-2 border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-800">
                <p className="text-black/70 dark:text-white/70">
                  Personalized spiritual direction
                </p>
              </div>
              <div className="border-t-2 border-l-2 border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-800">
                <p className="text-black/70 dark:text-white/70">
                  Prophetic training & impartation
                </p>
              </div>

              {/* Best For */}
              <div className="border-t-2 border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-900">
                <p className="font-semibold text-black/80 dark:text-white/80">
                  Best For
                </p>
              </div>
              <div className="border-t-2 border-l-2 border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-800">
                <p className="text-black/70 dark:text-white/70">
                  Deep personal accountability & guidance
                </p>
              </div>
              <div className="border-t-2 border-l-2 border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-800">
                <p className="text-black/70 dark:text-white/70">
                  Prophetic activation & networking
                </p>
              </div>

              {/* Setting */}
              <div className="border-t-2 border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-900">
                <p className="font-semibold text-black/80 dark:text-white/80">
                  Setting
                </p>
              </div>
              <div className="border-t-2 border-l-2 border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-800">
                <p className="text-black/70 dark:text-white/70">
                  In-person or virtual
                </p>
              </div>
              <div className="border-t-2 border-l-2 border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-800">
                <p className="text-black/70 dark:text-white/70">
                  Retreat location
                </p>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24"
          >
            <h3
              className={`${larken.className} mb-12 text-center text-4xl font-bold`}
            >
              Frequently Asked Questions
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  question: "Can I do both programs?",
                  answer:
                    "Absolutely! Many people start with one-on-one mentorship for foundational guidance, then attend Elijah Network retreats for prophetic activation and community.",
                },
                {
                  question: "How do I apply for one-on-one mentorship?",
                  answer:
                    "Click the 'Apply for Mentorship' button and fill out our application form. We'll review your application and match you with a mentor suited to your needs and calling.",
                },
                {
                  question: "When is the next Elijah Network retreat?",
                  answer:
                    "Retreat dates are announced quarterly. Check our events page or sign up for notifications to be the first to know when registration opens.",
                },
                {
                  question: "What's the cost for each program?",
                  answer:
                    "Contact us for specific pricing information. We offer various payment options and limited scholarships for those with financial need.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-xl border-2 border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-800"
                >
                  <h4 className={`${larken.className} mb-3 text-xl font-bold`}>
                    {faq.question}
                  </h4>
                  <p className="text-black/70 dark:text-white/70">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <p className="mb-8 text-xl text-black/70 dark:text-white/70">
              Still have questions? We&apos;re here to help you find the right
              path.
            </p>
            <button className="inline-flex cursor-pointer items-center justify-center gap-2 bg-black px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
              Contact Us for Guidance
            </button>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
