"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { DM_Sans, EB_Garamond } from "next/font/google";
import { motion } from "framer-motion";

const dmSans = DM_Sans({ subsets: ["latin"] });
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Sermon {
  id: number;
  title: string;
  subtitle: string;
  speaker: string;
  image: string;
}

interface SermonCarouselProps {
  sermons: Sermon[];
}

export function SermonCarousel({ sermons }: SermonCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // Defer initial state updates to avoid cascading renders
    queueMicrotask(() => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    });

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8">
          {sermons.map((sermon, index) => (
            <motion.div
              key={sermon.id}
              className="min-w-0 flex-[0_0_100%] lg:flex-[0_0_calc(33.333%-1.333rem)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="group relative overflow-hidden border border-white/10 bg-white/5 transition-all duration-500 hover:border-white dark:border-white/10 dark:bg-white/5 dark:hover:border-white">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={sermon.image}
                    alt={sermon.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <button className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white text-black transition-transform duration-300 group-hover:scale-110 dark:bg-white dark:text-black">
                    <Play className="ml-1 h-6 w-6" fill="currentColor" />
                  </button>
                </div>
                <div className="p-8">
                  <p className="mb-3 text-xs tracking-[0.3em] text-white/60 uppercase dark:text-white/60">
                    {sermon.speaker}
                  </p>
                  <h3
                    className={`${garamond.className} mb-2 text-2xl font-bold text-white dark:text-white`}
                  >
                    {sermon.title}
                  </h3>
                  <p className="text-white/70 dark:text-white/70">
                    {sermon.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={scrollPrev}
          className="flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-all duration-300 hover:bg-white hover:text-black dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 transition-all duration-300 ${
                index === selectedIndex
                  ? "w-8 bg-white dark:bg-white"
                  : "w-2 bg-white/30 hover:bg-white/50 dark:bg-white/30 dark:hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          className="flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-all duration-300 hover:bg-white hover:text-black dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
