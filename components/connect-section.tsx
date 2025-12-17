"use client";

import React from "react";
import { motion } from "framer-motion";
import { hellix, larken } from "@/lib/fonts";

export function ConnectSection() {
  return (
    <section id="connect" className="py-32 bg-black dark:bg-neutral-950 text-white transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/60 mb-6">
            Take the Next Step
          </p>
          <h2 className={`${larken.className} text-5xl md:text-7xl font-bold mb-8`}>
            Join Our Community
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you're new to faith or have been walking with Jesus for years, there's a
            place for you here. Connect with us today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 text-base font-semibold bg-white text-black hover:bg-white/90 transition-all duration-300">
              Plan Your First Visit
            </button>
            <button className="px-8 py-4 text-base font-semibold text-white border border-white hover:bg-white hover:text-black transition-all duration-300">
              Join a Small Group
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
