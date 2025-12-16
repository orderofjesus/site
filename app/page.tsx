"use client";

import { DM_Sans, EB_Garamond } from "next/font/google";
import {
  ChevronRight,
  Play,
  Calendar,
  MapPin,
  Users,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { VideoHero } from "@/components/video-hero";
import { SermonCarousel } from "@/components/sermon-carousel";
import { ThemeToggle } from "@/components/theme-toggle";

const dmSans = DM_Sans({ subsets: ["latin"] });
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sermons = [
  {
    id: 1,
    title: "The Heart of Worship",
    speaker: "Pastor John Mitchell",
    date: "March 10, 2024",
    duration: "42 min",
    series: "Living Faith",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Grace Upon Grace",
    speaker: "Pastor Sarah Johnson",
    date: "March 3, 2024",
    duration: "38 min",
    series: "Living Faith",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Walking in the Spirit",
    speaker: "Pastor John Mitchell",
    date: "February 25, 2024",
    duration: "45 min",
    series: "Spirit Led",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Love That Transforms",
    speaker: "Pastor Emily Chen",
    date: "February 18, 2024",
    duration: "40 min",
    series: "Spirit Led",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Faith in Action",
    speaker: "Pastor Michael Brown",
    date: "February 11, 2024",
    duration: "36 min",
    series: "Active Faith",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "The Power of Prayer",
    speaker: "Pastor Sarah Johnson",
    date: "February 4, 2024",
    duration: "44 min",
    series: "Active Faith",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400&auto=format&fit=crop",
  },
];

const featuredSermons = [
  {
    id: 1,
    title: "The Heart of Worship",
    subtitle: "Discovering True Devotion",
    speaker: "Pastor John Mitchell",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Grace Upon Grace",
    subtitle: "Living in God's Abundant Love",
    speaker: "Pastor Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Walking in the Spirit",
    subtitle: "A Journey of Faith and Power",
    speaker: "Pastor John Mitchell",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function Home() {
  return (
    <div
      className={`${dmSans.className} min-h-screen bg-white text-black transition-colors duration-300 dark:bg-neutral-900 dark:text-white`}
    >
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-black/10 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-black text-white transition-colors duration-300 dark:bg-white dark:text-black">
                <span className={`${garamond.className} text-2xl font-bold`}>
                  M
                </span>
              </div>
              <div>
                <p
                  className={`${garamond.className} text-xl leading-none font-bold`}
                >
                  Melchizedek
                </p>
                <p className="text-[10px] tracking-[0.3em] text-black/60 uppercase dark:text-white/60">
                  Order of Jesus
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-8 lg:flex">
              <a
                href="#about"
                className="text-sm font-medium text-black/70 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
              >
                About
              </a>
              <a
                href="#sermons"
                className="text-sm font-medium text-black/70 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
              >
                Sermons
              </a>
              <a
                href="#ministries"
                className="text-sm font-medium text-black/70 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
              >
                Ministries
              </a>
              <a
                href="#events"
                className="text-sm font-medium text-black/70 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
              >
                Events
              </a>
              <a
                href="#connect"
                className="text-sm font-medium text-black/70 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
              >
                Connect
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button className="hidden border border-black px-6 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white md:block dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
                Plan a Visit
              </button>
              <button className="bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                Give
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Video Hero Section */}
      <VideoHero />

      {/* Service Times */}
      <section className="border-b border-black/10 bg-white py-24 transition-colors duration-300 dark:border-white/10 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                num: "01",
                time: "9:00 AM",
                title: "Traditional Service",
                subtitle: "Sunday Morning",
                desc: "Classic hymns, liturgy, and timeless worship",
              },
              {
                num: "02",
                time: "11:00 AM",
                title: "Contemporary Service",
                subtitle: "Sunday Morning",
                desc: "Modern worship, live band, and dynamic teaching",
                featured: true,
              },
              {
                num: "03",
                time: "7:00 PM",
                title: "Midweek Prayer",
                subtitle: "Wednesday Evening",
                desc: "Community prayer, worship, and Bible study",
              },
            ].map((service, index) => (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative border-2 p-10 transition-all duration-500 ${
                  service.featured
                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                    : "border-black bg-white hover:bg-black hover:text-white dark:border-white dark:bg-neutral-900 dark:hover:bg-white dark:hover:text-black"
                }`}
              >
                <div
                  className={`absolute top-10 right-10 text-8xl font-bold transition-colors ${
                    service.featured
                      ? "text-white/10 dark:text-black/10"
                      : "text-black/5 group-hover:text-white/10 dark:text-white/5 dark:group-hover:text-black/10"
                  }`}
                >
                  {service.num}
                </div>
                <div className="relative">
                  <p
                    className={`mb-4 text-xs tracking-[0.3em] uppercase transition-colors ${
                      service.featured
                        ? "text-white/70 dark:text-black/70"
                        : "text-black/60 group-hover:text-white/70 dark:text-white/60 dark:group-hover:text-black/70"
                    }`}
                  >
                    {service.subtitle}
                  </p>
                  <h3
                    className={`${garamond.className} mb-2 text-3xl font-bold`}
                  >
                    {service.time}
                  </h3>
                  <p className="mb-4 text-lg">{service.title}</p>
                  <p
                    className={`text-sm transition-colors ${
                      service.featured
                        ? "text-white/70 dark:text-black/70"
                        : "text-black/60 group-hover:text-white/70 dark:text-white/60 dark:group-hover:text-black/70"
                    }`}
                  >
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sermon Carousel */}
      <section className="bg-black py-32 text-white transition-colors duration-300 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="mb-4 text-xs tracking-[0.4em] text-white/60 uppercase">
              Featured Messages
            </p>
            <h2
              className={`${garamond.className} text-5xl font-bold md:text-6xl`}
            >
              Transforming Messages
            </h2>
          </motion.div>

          <SermonCarousel sermons={featuredSermons} />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="bg-white py-32 transition-colors duration-300 dark:bg-neutral-900"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-4 text-xs tracking-[0.4em] text-black/60 uppercase dark:text-white/60">
                Our Mission
              </p>
              <h2
                className={`${garamond.className} mb-8 text-5xl font-bold md:text-6xl`}
              >
                Know Jesus,
                <br />
                Make Him Known
              </h2>
              <p className="mb-8 text-xl leading-relaxed text-black/80 dark:text-white/80">
                We are a Christ-centered community dedicated to worship,
                discipleship, and service. Our mission is to glorify God by
                making disciples who love Jesus and transform the world.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: Heart,
                    title: "Authentic Worship",
                    desc: "Experience genuine, spirit-filled worship that honors God and transforms hearts.",
                  },
                  {
                    icon: Users,
                    title: "Community",
                    desc: "Build meaningful relationships in small groups and serve together in ministry.",
                  },
                  {
                    icon: MapPin,
                    title: "Local Impact",
                    desc: "Serve our city with compassion, meeting practical needs and sharing the gospel.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-black text-white transition-colors duration-300 dark:bg-white dark:text-black">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3
                        className={`${garamond.className} mb-2 text-xl font-bold`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-black/70 dark:text-white/70">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1400&auto=format&fit=crop"
                  alt="Community worship"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 flex h-48 w-48 items-center justify-center bg-black text-white transition-colors duration-300 dark:bg-white dark:text-black">
                <div className="text-center">
                  <p
                    className={`${garamond.className} mb-2 text-5xl font-bold`}
                  >
                    25+
                  </p>
                  <p className="text-xs tracking-[0.3em] uppercase">
                    Years Serving
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sermon Grid */}
      <section
        id="sermons"
        className="bg-neutral-50 py-32 transition-colors duration-300 dark:bg-neutral-800"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 flex items-end justify-between"
          >
            <div>
              <p className="mb-4 text-xs tracking-[0.4em] text-black/60 uppercase dark:text-white/60">
                Teaching Archive
              </p>
              <h2
                className={`${garamond.className} text-5xl font-bold md:text-6xl`}
              >
                Recent Sermons
              </h2>
            </div>
            <button className="hidden items-center gap-2 text-sm font-semibold transition-all hover:gap-3 md:flex">
              View All Sermons
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon, index) => (
              <motion.article
                key={sermon.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group overflow-hidden border border-black/10 bg-white transition-all duration-500 hover:border-black hover:shadow-2xl dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={sermon.image}
                    alt={sermon.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40"></div>
                  <button className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Play className="ml-1 h-5 w-5" fill="currentColor" />
                  </button>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 text-xs font-semibold text-black">
                    {sermon.series}
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-2 text-xs tracking-[0.2em] text-black/60 uppercase dark:text-white/60">
                    {sermon.speaker}
                  </p>
                  <h3
                    className={`${garamond.className} mb-3 text-2xl font-bold group-hover:underline`}
                  >
                    {sermon.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-black/60 dark:text-white/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {sermon.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Play className="h-4 w-4" />
                      {sermon.duration}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center md:hidden"
          >
            <button className="inline-flex items-center gap-2 bg-black px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
              View All Sermons
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Connect Section */}
      <section
        id="connect"
        className="bg-black py-32 text-white transition-colors duration-300 dark:bg-neutral-950"
      >
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-6 text-xs tracking-[0.4em] text-white/60 uppercase">
              Take the Next Step
            </p>
            <h2
              className={`${garamond.className} mb-8 text-5xl font-bold md:text-7xl`}
            >
              Join Our Community
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-white/80">
              Whether you&apos;re new to faith or have been walking with Jesus
              for years, there&apos;s a place for you here. Connect with us
              today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-white/90">
                Plan Your First Visit
              </button>
              <button className="border border-white px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black">
                Join a Small Group
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-white py-16 transition-colors duration-300 dark:border-white/10 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-black text-white transition-colors duration-300 dark:bg-white dark:text-black">
                  <span className={`${garamond.className} text-2xl font-bold`}>
                    M
                  </span>
                </div>
                <div>
                  <p
                    className={`${garamond.className} text-xl leading-none font-bold`}
                  >
                    Melchizedek
                  </p>
                  <p className="text-[10px] tracking-[0.3em] text-black/60 uppercase dark:text-white/60">
                    Order of Jesus
                  </p>
                </div>
              </div>
              <p className="mb-6 max-w-sm text-black/70 dark:text-white/70">
                A Christ-centered community dedicated to knowing Jesus and
                making Him known in our city and beyond.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">Connect</h3>
              <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-black dark:hover:text-white"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-black dark:hover:text-white"
                  >
                    Beliefs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-black dark:hover:text-white"
                  >
                    Leadership
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-black dark:hover:text-white"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold">Ministries</h3>
              <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-black dark:hover:text-white"
                  >
                    Kids Ministry
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-black dark:hover:text-white"
                  >
                    Youth Ministry
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-black dark:hover:text-white"
                  >
                    Small Groups
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-black dark:hover:text-white"
                  >
                    Outreach
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 text-sm text-black/60 md:flex-row dark:border-white/10 dark:text-white/60">
            <p>
              © {new Date().getFullYear()} Melchizedek Order of Jesus. All
              rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
