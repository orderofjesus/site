"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { larken } from "@/lib/fonts";

interface Project {
  id: number;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
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
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="min-w-0 flex-[0_0_100%] lg:flex-[0_0_calc(33.333%-1.333rem)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="group relative overflow-hidden border-2 border-black/10 bg-white transition-all duration-500 hover:border-black hover:shadow-2xl dark:border-white/10 dark:bg-neutral-800 dark:hover:border-white">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                </div>
                <div className="p-8">
                  <p className="mb-3 text-xs tracking-[0.3em] text-black/60 uppercase dark:text-white/60">
                    {project.eyebrow}
                  </p>
                  <h3 className={`${larken.className} mb-3 text-2xl font-bold`}>
                    {project.title}
                  </h3>
                  <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
                    {project.description}
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
            className={`group relative flex h-14 w-14 items-center justify-center overflow-hidden border-2 transition-all duration-300 ${
              canScrollPrev
                ? "cursor-pointer border-black/30 hover:border-black dark:border-white/30 dark:hover:border-white"
                : "cursor-not-allowed border-black/10 opacity-30 dark:border-white/10"
            }`}
            aria-label="Previous slide"
            whileHover={canScrollPrev ? { scale: 1.05 } : {}}
            whileTap={canScrollPrev ? { scale: 0.95 } : {}}
          >
            {/* Hover background effect */}
            {canScrollPrev && (
              <motion.div
                className="absolute inset-0 bg-black dark:bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            )}
            <ChevronLeft
              className={`relative z-10 h-6 w-6 transition-colors duration-300 ${canScrollPrev ? "group-hover:text-white dark:group-hover:text-black" : ""}`}
              strokeWidth={2.5}
            />
          </motion.button>

          {/* Dots */}
          <div className="flex items-center gap-3">
            {scrollSnaps.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => scrollTo(index)}
                className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "h-2.5 w-10 bg-black dark:bg-white"
                    : "h-2.5 w-2.5 bg-black/30 hover:bg-black/60 dark:bg-white/30 dark:hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: index === selectedIndex ? 1 : 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {index === selectedIndex && (
                  <motion.div
                    className="absolute inset-0 bg-black dark:bg-white"
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
            className={`group relative flex h-14 w-14 items-center justify-center overflow-hidden border-2 transition-all duration-300 ${
              canScrollNext
                ? "cursor-pointer border-black/30 hover:border-black dark:border-white/30 dark:hover:border-white"
                : "cursor-not-allowed border-black/10 opacity-30 dark:border-white/10"
            }`}
            aria-label="Next slide"
            whileHover={canScrollNext ? { scale: 1.05 } : {}}
            whileTap={canScrollNext ? { scale: 0.95 } : {}}
          >
            {/* Hover background effect */}
            {canScrollNext && (
              <motion.div
                className="absolute inset-0 bg-black dark:bg-white"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            )}
            <ChevronRight
              className={`relative z-10 h-6 w-6 transition-colors duration-300 ${canScrollNext ? "group-hover:text-white dark:group-hover:text-black" : ""}`}
              strokeWidth={2.5}
            />
          </motion.button>
        </div>
      )}
    </div>
  );
}
