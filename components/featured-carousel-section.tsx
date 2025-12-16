"use client";

import React from "react";
import { DM_Sans, EB_Garamond } from "next/font/google";
import { motion } from "framer-motion";
import { SermonCarousel } from "@/components/sermon-carousel";

const dmSans = DM_Sans({ subsets: ["latin"] });
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface FeaturedSermon {
  id: number;
  title: string;
  subtitle: string;
  speaker: string;
  image: string;
}

interface FeaturedCarouselSectionProps {
  sermons: FeaturedSermon[];
}

export function FeaturedCarouselSection({ sermons }: FeaturedCarouselSectionProps) {
  return (
    <section className="py-32 bg-black dark:bg-neutral-950 text-white transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/60 mb-4">
            Featured Messages
          </p>
          <h2 className={`${garamond.className} text-5xl md:text-6xl font-bold`}>
            Transforming Messages
          </h2>
        </motion.div>

        <SermonCarousel sermons={sermons} />
      </div>
    </section>
  );
}
