"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { hellix, larken } from "@/lib/fonts";

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
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // Defer initial state updates to avoid cascading renders
    queueMicrotask(() => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
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
                    className={`${larken.className} mb-2 text-2xl font-bold text-white dark:text-white`}
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

      {/* Navigation Arrows - Only show if there are multiple slides */}
      {scrollSnaps.length > 1 && (
        <div className="mt-12 flex items-center justify-center gap-6">
          <motion.button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`group relative flex h-14 w-14 items-center justify-center overflow-hidden border-2 text-white transition-all duration-300 ${
              canScrollPrev
                ? "border-white/30 hover:border-white cursor-pointer"
                : "border-white/10 opacity-30 cursor-not-allowed"
            }`}
            aria-label="Previous slide"
            whileHover={canScrollPrev ? { scale: 1.05 } : {}}
            whileTap={canScrollPrev ? { scale: 0.95 } : {}}
          >
            {/* Hover background effect */}
            {canScrollPrev && (
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            )}
            <ChevronLeft className={`relative z-10 h-6 w-6 transition-colors duration-300 ${canScrollPrev ? "group-hover:text-black" : ""}`} strokeWidth={2.5} />
          </motion.button>

          {/* Dots */}
          <div className="flex items-center gap-3">
            {scrollSnaps.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => scrollTo(index)}
                className={`relative overflow-hidden transition-all duration-300 ${
                  index === selectedIndex
                    ? "h-2.5 w-10 bg-white"
                    : "h-2.5 w-2.5 rounded-full bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: index === selectedIndex ? 1 : 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {index === selectedIndex && (
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`group relative flex h-14 w-14 items-center justify-center overflow-hidden border-2 text-white transition-all duration-300 ${
              canScrollNext
                ? "border-white/30 hover:border-white cursor-pointer"
                : "border-white/10 opacity-30 cursor-not-allowed"
            }`}
            aria-label="Next slide"
            whileHover={canScrollNext ? { scale: 1.05 } : {}}
            whileTap={canScrollNext ? { scale: 0.95 } : {}}
          >
            {/* Hover background effect */}
            {canScrollNext && (
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            )}
            <ChevronRight className={`relative z-10 h-6 w-6 transition-colors duration-300 ${canScrollNext ? "group-hover:text-black" : ""}`} strokeWidth={2.5} />
          </motion.button>
        </div>
      )}
    
    </div>
  );
}
