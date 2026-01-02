"use client";

import React from "react";
import { motion } from "framer-motion";
import { SermonCarousel } from "@/components/sermon-carousel";
import { hellix, larken } from "@/lib/fonts";

interface FeaturedSermon {
  id: number;
  title: string;
  subtitle: string;
  speaker: string;
  image: string;
}

export interface FeaturedCarouselSectionProps {
  sermons: FeaturedSermon[];
}

export function FeaturedCarouselSection({
  sermons,
}: FeaturedCarouselSectionProps) {
  return (
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
          <h2 className={`${larken.className} text-5xl font-bold md:text-6xl`}>
            Transforming Messages
          </h2>
        </motion.div>

        <SermonCarousel sermons={sermons} />
      </div>
    </section>
  );
}
