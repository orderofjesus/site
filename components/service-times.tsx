"use client";

import React from "react";
import { motion } from "framer-motion";
import { hellix, larken } from "@/lib/fonts";

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
    desc: "Access our complete library of past sermons and services whenever it fits your schedule",
    featured: true,
    link: "/sermons",
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

export function ServiceTimes() {
  return (
    <section className="py-24 bg-white dark:bg-neutral-900 border-b border-black/10 dark:border-white/10 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase mb-4 text-black/60 dark:text-white/60"
          >
            Watch & Listen
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`${larken.className} text-4xl md:text-5xl font-bold`}
          >
            Connect From Anywhere
          </motion.h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {watchOptions.map((option, index) => (
            <motion.a
              key={option.num}
              href={option.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative border-2 p-10 transition-all duration-500 cursor-pointer ${
                option.featured
                  ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                  : "bg-white dark:bg-neutral-900 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
              }`}
            >
              <div
                className={`absolute top-10 right-10 text-8xl font-bold transition-colors ${
                  option.featured
                    ? "text-white/10 dark:text-black/10"
                    : "text-black/5 dark:text-white/5 group-hover:text-white/10 dark:group-hover:text-black/10"
                }`}
              >
                {option.num}
              </div>
              <div className="relative">
                <div className="text-5xl mb-6">{option.icon}</div>
                <p
                  className={`text-xs tracking-[0.3em] uppercase mb-4 transition-colors ${
                    option.featured
                      ? "text-white/70 dark:text-black/70"
                      : "text-black/60 dark:text-white/60 group-hover:text-white/70 dark:group-hover:text-black/70"
                  }`}
                >
                  {option.subtitle}
                </p>
                <h3 className={`${larken.className} text-3xl font-bold mb-4`}>
                  {option.title}
                </h3>
                <p
                  className={`text-sm transition-colors ${
                    option.featured
                      ? "text-white/70 dark:text-black/70"
                      : "text-black/60 dark:text-white/60 group-hover:text-white/70 dark:group-hover:text-black/70"
                  }`}
                >
                  {option.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
