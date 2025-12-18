"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Play, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hellix, larken } from "@/lib/fonts";

const sermons = [
  {
    id: 1,
    title: "The Heart of Worship",
    speaker: "Pastor John Mitchell",
    date: "March 10, 2024",
    duration: "42 min",
    series: "Living Faith",
    description:
      "Discover what it truly means to worship God with all your heart, soul, and mind. Join us as we explore the depths of authentic worship.",
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
    description:
      "Experience the overwhelming abundance of God's grace in your life.",
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
    description:
      "Learn how to live a Spirit-filled life and walk in divine power.",
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
    description:
      "Discover how God's transformative love can change everything.",
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
    description:
      "Put your faith into practice and see God move in powerful ways.",
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
    description:
      "Unlock the incredible power of prayer in your daily walk with God.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Kingdom Principles",
    speaker: "Pastor John Mitchell",
    date: "January 28, 2024",
    duration: "41 min",
    series: "Kingdom Living",
    description: "Understanding and applying the principles of God's Kingdom.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Unshakeable Hope",
    speaker: "Pastor Emily Chen",
    date: "January 21, 2024",
    duration: "39 min",
    series: "Kingdom Living",
    description: "Build your life on the foundation of hope that never fails.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function SermonsPage() {
  const [latestSermon, ...otherSermons] = sermons;

  return (
    <div
      className={`${hellix.className} min-h-screen bg-neutral-50 text-black transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-white`}
    >
      <Header />

      {/* Hero Section */}
      <section className="px-6 pt-32 pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-xs tracking-[0.4em] text-black/60 uppercase dark:text-white/60">
              Teaching Archive
            </p>
            <h1
              className={`${larken.className} mb-6 text-5xl font-bold md:text-7xl`}
            >
              Sermons
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-black/70 dark:text-white/70">
              Listen to powerful messages that will inspire, challenge, and
              encourage you in your faith journey.
            </p>
          </motion.div>

          {/* Featured Latest Sermon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className={`${larken.className} mb-8 text-3xl font-bold`}>
              Latest Sermon
            </h2>
            <div className="group relative overflow-hidden border border-black/10 bg-white transition-all duration-500 hover:border-black hover:shadow-2xl dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white">
              <div className="grid gap-0 lg:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-80 overflow-hidden lg:h-auto">
                  <img
                    src={latestSermon.image}
                    alt={latestSermon.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent lg:bg-linear-to-r"></div>
                  <div className="absolute top-6 left-6 bg-white px-4 py-2 text-sm font-semibold text-black">
                    {latestSermon.series}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <p className="mb-3 text-xs tracking-[0.3em] text-black/60 uppercase dark:text-white/60">
                    {latestSermon.speaker}
                  </p>
                  <h3
                    className={`${larken.className} mb-4 text-4xl font-bold lg:text-5xl`}
                  >
                    {latestSermon.title}
                  </h3>
                  <p className="mb-6 text-lg text-black/70 dark:text-white/70">
                    {latestSermon.description}
                  </p>
                  <div className="mb-8 flex flex-wrap items-center gap-6 text-sm text-black/60 dark:text-white/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {latestSermon.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {latestSermon.duration}
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-black px-8 py-6 text-base font-semibold text-white hover:bg-black/90 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    <Play className="mr-2 h-5 w-5" fill="currentColor" />
                    Watch Sermon
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Previous Sermons Grid */}
          <div className="mb-16">
            <h2 className={`${larken.className} mb-8 text-3xl font-bold`}>
              Previous Sermons
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherSermons.map((sermon, index) => (
                <motion.article
                  key={sermon.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group overflow-hidden border border-black/10 bg-white transition-all duration-500 hover:border-black hover:shadow-2xl dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={sermon.image}
                      alt={sermon.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40"></div>
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 text-xs font-semibold text-black">
                      {sermon.series}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-xs tracking-[0.2em] text-black/60 uppercase dark:text-white/60">
                      {sermon.speaker}
                    </p>
                    <h3
                      className={`${larken.className} mb-3 text-2xl font-bold`}
                    >
                      {sermon.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-black/70 dark:text-white/70">
                      {sermon.description}
                    </p>
                    <div className="mb-4 flex items-center gap-4 text-sm text-black/60 dark:text-white/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {sermon.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {sermon.duration}
                      </div>
                    </div>
                    <Button className="w-full bg-black font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                      <Play className="mr-2 h-4 w-4" fill="currentColor" />
                      Watch
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
