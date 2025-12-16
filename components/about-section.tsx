"use client";

import React from "react";
import { DM_Sans, EB_Garamond } from "next/font/google";
import { motion } from "framer-motion";
import { Heart, Users, MapPin } from "lucide-react";

const dmSans = DM_Sans({ subsets: ["latin"] });
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const features = [
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
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-neutral-50 py-32 transition-colors duration-300 dark:bg-neutral-800"
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
              discipleship, and service. Our mission is to glorify God by making
              disciples who love Jesus and transform the world.
            </p>
            <div className="space-y-6">
              {features.map((item, index) => (
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
                <p className={`${garamond.className} mb-2 text-5xl font-bold`}>
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
  );
}
