"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, Play, Calendar } from "lucide-react";
import Link from "next/link";
import { hellix, larken } from "@/lib/fonts";

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
              className={`${larken.className} text-5xl font-bold md:text-6xl`}
            >
              Recent Sermons
            </h2>
          </div>
          <Link
            href="/sermons"
            className="hidden items-center gap-2 text-sm font-semibold transition-all hover:gap-3 md:flex"
          >
            View All Sermons
            <ChevronRight className="h-4 w-4" />
          </Link>
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
                <Image
                  src={sermon.image}
                  alt={sermon.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
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
                  className={`${larken.className} mb-3 text-2xl font-bold group-hover:underline`}
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
          <Link
            href="/sermons"
            className="inline-flex items-center gap-2 bg-black px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            View All Sermons
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
