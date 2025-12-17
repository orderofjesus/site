"use client";

import { DM_Sans, EB_Garamond } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Play, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    description: "Discover what it truly means to worship God with all your heart, soul, and mind. Join us as we explore the depths of authentic worship.",
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
    description: "Experience the overwhelming abundance of God's grace in your life.",
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
    description: "Learn how to live a Spirit-filled life and walk in divine power.",
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
    description: "Discover how God's transformative love can change everything.",
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
    description: "Put your faith into practice and see God move in powerful ways.",
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
    description: "Unlock the incredible power of prayer in your daily walk with God.",
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
      className={`${dmSans.className} min-h-screen bg-neutral-50 text-black transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-white`}
    >
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-black/60 dark:text-white/60 mb-4">
              Teaching Archive
            </p>
            <h1 className={`${garamond.className} text-5xl md:text-7xl font-bold mb-6`}>
              Sermons
            </h1>
            <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
              Listen to powerful messages that will inspire, challenge, and encourage you in your faith journey.
            </p>
          </motion.div>

          {/* Featured Latest Sermon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className={`${garamond.className} text-3xl font-bold mb-8`}>
              Latest Sermon
            </h2>
            <div className="group relative bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 overflow-hidden hover:shadow-2xl hover:border-black dark:hover:border-white transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-80 lg:h-auto overflow-hidden">
                  <img
                    src={latestSermon.image}
                    alt={latestSermon.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white text-black text-sm font-semibold">
                    {latestSermon.series}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <p className="text-xs tracking-[0.3em] uppercase text-black/60 dark:text-white/60 mb-3">
                    {latestSermon.speaker}
                  </p>
                  <h3
                    className={`${garamond.className} text-4xl lg:text-5xl font-bold mb-4`}
                  >
                    {latestSermon.title}
                  </h3>
                  <p className="text-lg text-black/70 dark:text-white/70 mb-6">
                    {latestSermon.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-black/60 dark:text-white/60 mb-8">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {latestSermon.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {latestSermon.duration}
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 text-base font-semibold px-8 py-6"
                  >
                    <Play className="w-5 h-5 mr-2" fill="currentColor" />
                    Watch Sermon
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Previous Sermons Grid */}
          <div className="mb-16">
            <h2 className={`${garamond.className} text-3xl font-bold mb-8`}>
              Previous Sermons
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherSermons.map((sermon, index) => (
                <motion.article
                  key={sermon.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 overflow-hidden hover:shadow-2xl hover:border-black dark:hover:border-white transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={sermon.image}
                      alt={sermon.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white text-black text-xs font-semibold">
                      {sermon.series}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs tracking-[0.2em] uppercase text-black/60 dark:text-white/60 mb-2">
                      {sermon.speaker}
                    </p>
                    <h3
                      className={`${garamond.className} text-2xl font-bold mb-3`}
                    >
                      {sermon.title}
                    </h3>
                    <p className="text-sm text-black/70 dark:text-white/70 mb-4 line-clamp-2">
                      {sermon.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-black/60 dark:text-white/60 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {sermon.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {sermon.duration}
                      </div>
                    </div>
                    <Button
                      className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 font-semibold"
                    >
                      <Play className="w-4 h-4 mr-2" fill="currentColor" />
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
