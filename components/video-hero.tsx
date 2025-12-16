"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronRight, Play } from "lucide-react";
import { DM_Sans, EB_Garamond } from "next/font/google";
import { motion } from "framer-motion";

const dmSans = DM_Sans({ subsets: ["latin"] });
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoaded(true);
    };

    video.addEventListener("canplay", handleCanPlay);
    
    // Attempt to play the video
    video.play().catch((error) => {
      console.log("Video autoplay failed:", error);
    });

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white pt-20">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Fallback image while video loads */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
        
        {/* Video element with optimized settings */}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-40" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1600&auto=format&fit=crop"
        >
          {/* Multiple sources for better compatibility and faster loading */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-people-praying-in-a-church-41487-large.mp4"
            type="video/mp4"
          />
          {/* Fallback message */}
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.4em] uppercase text-white/80 mb-6"
          >
            Welcome Home
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${garamond.className} text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8`}
          >
            You Belong
            <br />
            Here
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed"
          >
            Experience authentic worship, genuine community, and life-changing encounters with Jesus Christ.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button className="group px-8 py-4 text-base font-semibold bg-white text-black hover:bg-white/90 transition-all duration-300 flex items-center gap-2">
              Join Us This Sunday
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 text-base font-semibold text-white border border-white hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Live
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <p className="text-xs tracking-[0.3em] uppercase text-white/60">Scroll to Explore</p>
          <ChevronRight className="w-4 h-4 rotate-90 text-white/60" />
        </div>
      </motion.div>
    </section>
  );
}
