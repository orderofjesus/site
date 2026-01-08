"use client";

import React from "react";
import { motion } from "framer-motion";
import { hellix, larken } from "@/lib/fonts";
import Link from "next/link";

const watchOptions = [
  {
    num: "01",
    icon: "🔴",
    title: "Live Stream",
    subtitle: "Join us live",
    desc: "Watch our services live every Sunday and experience worship in real-time with our community",
    featured: false,
    link: "https://youtube.com/@yourchurch/live",
  },
  {
    num: "02",
    icon: "📺",
    title: "On-Demand",
    subtitle: "Watch anytime",
    desc: "Access our complete library of teachings, past sermons and services whenever it fits your schedule",
    featured: true,
    link: "/content",
  },
  {
    num: "03",
    icon: "🎧",
    title: "Podcast",
    subtitle: "Listen on the go",
    desc: "Subscribe to our podcast on your favorite platform and take the message with you",
    featured: false,
    link: "https://podcasts.apple.com/podcast/yourchurch",
  },
];

export function ConnectOptions() {
  return (
    <section className="border-b border-black/10 bg-white py-24 transition-colors duration-300 dark:border-white/10 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xs tracking-[0.3em] text-black/60 uppercase dark:text-white/60"
          >
            Watch & Listen
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`${larken.className} text-4xl font-bold md:text-5xl`}
          >
            Connect From Anywhere
          </motion.h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {watchOptions.map((option, index) => (
            <Link key={option.num} href={option.link}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                  <h3 className={`${larken.className} mb-4 text-3xl font-bold`}>
                    {option.title}
                  </h3>
                  <p
                    className={`text-sm transition-colors ${
                      option.featured
                        ? "text-white/70 dark:text-black/70"
                        : "text-black/60 group-hover:text-white/70 dark:text-white/60 dark:group-hover:text-black/70"
                    }`}
                  >
                    {option.desc}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
