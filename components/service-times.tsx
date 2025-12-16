"use client";

import React from "react";
import { DM_Sans, EB_Garamond } from "next/font/google";
import { motion } from "framer-motion";

const dmSans = DM_Sans({ subsets: ["latin"] });
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const services = [
  {
    num: "01",
    time: "9:00 AM",
    title: "Traditional Service",
    subtitle: "Sunday Morning",
    desc: "Classic hymns, liturgy, and timeless worship",
    featured: false,
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
    featured: false,
  },
];

export function ServiceTimes() {
  return (
    <section className="py-24 bg-white dark:bg-neutral-900 border-b border-black/10 dark:border-white/10 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative border-2 p-10 transition-all duration-500 ${
                service.featured
                  ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                  : "bg-white dark:bg-neutral-900 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
              }`}
            >
              <div
                className={`absolute top-10 right-10 text-8xl font-bold transition-colors ${
                  service.featured
                    ? "text-white/10 dark:text-black/10"
                    : "text-black/5 dark:text-white/5 group-hover:text-white/10 dark:group-hover:text-black/10"
                }`}
              >
                {service.num}
              </div>
              <div className="relative">
                <p
                  className={`text-xs tracking-[0.3em] uppercase mb-4 transition-colors ${
                    service.featured
                      ? "text-white/70 dark:text-black/70"
                      : "text-black/60 dark:text-white/60 group-hover:text-white/70 dark:group-hover:text-black/70"
                  }`}
                >
                  {service.subtitle}
                </p>
                <h3 className={`${garamond.className} text-3xl font-bold mb-2`}>
                  {service.time}
                </h3>
                <p className="text-lg mb-4">{service.title}</p>
                <p
                  className={`text-sm transition-colors ${
                    service.featured
                      ? "text-white/70 dark:text-black/70"
                      : "text-black/60 dark:text-white/60 group-hover:text-white/70 dark:group-hover:text-black/70"
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
  );
}
