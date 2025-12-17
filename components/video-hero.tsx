"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { larken } from "@/lib/fonts";

const heroSlides = [
  {
    id: 1,
    tagline: "Welcome Home",
    title: "You Belong Here",
    description:
      "Experience authentic worship, genuine community, and life-changing encounters with Jesus Christ.",
    video: "https://www.pexels.com/download/video/2014792/",
  },
  {
    id: 2,
    tagline: "Join Our Family",
    title: "Grow Together",
    description:
      "Connect with a community that cares. Find your place in our family of believers.",
    video: "https://www.pexels.com/download/video/2014791/",
  },
];

export function VideoHero() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Duplicate slides for seamless infinite loop
  // const duplicatedSlides = [...heroSlides, ...heroSlides];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    duration: 20, // faster, smoother snap
    dragFree: false,
  });

  // Auto-play slides with seamless infinite loop
  // useEffect(() => {
  //   if (!emblaApi) return;

  //   const autoplayInterval = setInterval(() => {
  //     const currentIndex = emblaApi.selectedScrollSnap();
  //     const totalSlides = duplicatedSlides.length;

  //     // If we're at the last duplicated slide, jump to the original last slide
  //     if (currentIndex === totalSlides - 1) {
  //       emblaApi.scrollNext();
  //       setTimeout(() => {
  //         emblaApi.scrollTo(heroSlides.length, false); // Jump to first duplicate without animation
  //       }, 600); // Wait for transition to complete
  //     } else if (
  //       currentIndex >= heroSlides.length - 1 &&
  //       currentIndex < totalSlides - 1
  //     ) {
  //       // We're in the duplicated section, continue normally
  //       emblaApi.scrollNext();
  //     } else {
  //       // Normal progression
  //       emblaApi.scrollNext();
  //     }
  //   }, 8000);

  //   return () => clearInterval(autoplayInterval);
  // }, [emblaApi, duplicatedSlides.length]);

  // Track selected slide
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const currentIndex = emblaApi.selectedScrollSnap();
    // Map to actual slide index (handle duplicated slides)
    setSelectedIndex(currentIndex % heroSlides.length);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // Defer initial state update to avoid cascading renders
    queueMicrotask(() => {
      setSelectedIndex(emblaApi.selectedScrollSnap() % heroSlides.length);
    });

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Scroll to specific slide
  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <section className="w-full">
      <section className="relative mx-auto min-h-screen max-w-440 bg-black">
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full min-h-screen transition-transform duration-500 ease-out will-change-transform">
            {heroSlides.map((slide, index) => (
              <div
                key={`${slide.id}-${index}`}
                className="relative flex-[0_0_100%] items-center justify-center overflow-hidden"
              >
                {/* Background Container - Moves with the slide */}
                <div className="absolute inset-0 z-0">
                  {/* Video */}
                  <video
                    className="h-full w-full object-cover opacity-60"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1600&auto=format&fit=crop"
                  >
                    <source src={slide.video} type="video/mp4" />
                  </video>
                </div>

                {/* Content Container - Centered */}
                <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-32 lg:px-8">
                  {/* Max-width wrapper to prevent infinite stretch */}
                  <div className="mx-auto w-full max-w-[1920px]">
                    <div className="max-w-4xl px-4">
                      {/* Using AnimatePresence here is optional since the whole slide moves, 
                          but keeping local transitions adds a nice 'settling' effect */}
                      <AnimatePresence mode="wait">
                        {selectedIndex === index % heroSlides.length && (
                          <>
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              className="mb-6 text-xs tracking-[0.4em] text-white/90 uppercase"
                            >
                              {slide.tagline}
                            </motion.p>

                            <motion.h1
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.3 }}
                              className={`${larken.className} mb-8 text-6xl leading-[1.05] font-bold text-white md:text-7xl lg:text-8xl`}
                            >
                              {slide.title.split(" ")[0]}
                              <br />
                              {slide.title.split(" ").slice(1).join(" ")}
                            </motion.h1>

                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.4 }}
                              className="mb-12 max-w-2xl text-xl leading-relaxed text-white/90 md:text-2xl"
                            >
                              {slide.description}
                            </motion.p>

                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.5 }}
                              className="flex flex-wrap gap-4"
                            >
                              <button className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-white/90">
                                Join Us This Sunday
                                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                              </button>
                              <button className="flex items-center gap-2 rounded-full border border-white px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black">
                                <Play className="h-5 w-5" />
                                Watch Live
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls (Absolute over the slider) */}
        <div className="absolute right-0 bottom-12 left-0 z-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center gap-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    selectedIndex === index
                      ? "w-8 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2"
        >
          <div className="flex animate-bounce flex-col items-center gap-2">
            <p className="text-xs tracking-[0.3em] text-white/60 uppercase">
              Scroll to Explore
            </p>
            <ChevronRight className="h-4 w-4 rotate-90 text-white/60" />
          </div>
        </motion.div>
      </section>
    </section>
  );
}
