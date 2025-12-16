"use client";

import React from "react";
import { DM_Sans, EB_Garamond } from "next/font/google";
import { motion } from "framer-motion";
import { ChevronRight, Play, Calendar } from "lucide-react";

const dmSans = DM_Sans({ subsets: ["latin"] });
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  series: string;
  image: string;
}

interface SermonsGridProps {
  sermons: Sermon[];
}

export function SermonsGrid({ sermons }: SermonsGridProps) {
  return (
    <section id="sermons" className="py-32 bg-neutral-50 dark:bg-neutral-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-black/60 dark:text-white/60 mb-4">
              Teaching Archive
            </p>
            <h2 className={`${garamond.className} text-5xl md:text-6xl font-bold`}>
              Recent Sermons
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all">
            View All Sermons
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((sermon, index) => (
            <motion.article
              key={sermon.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 overflow-hidden hover:shadow-2xl hover:border-black dark:hover:border-white transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={sermon.image}
                  alt={sermon.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-5 h-5 ml-1" fill="currentColor" />
                </button>
                <div className="absolute top-4 right-4 px-3 py-1 bg-white text-black text-xs font-semibold">
                  {sermon.series}
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs tracking-[0.2em] uppercase text-black/60 dark:text-white/60 mb-2">
                  {sermon.speaker}
                </p>
                <h3
                  className={`${garamond.className} text-2xl font-bold mb-3 group-hover:underline`}
                >
                  {sermon.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-black/60 dark:text-white/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {sermon.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
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
          <button className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 transition-all">
            View All Sermons
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
