"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { larken } from "@/lib/fonts";
import { ProjectCarousel } from "@/components/projects-carousel";

const featuredProjects = [
  {
    id: 1,
    title: "Feeding Our Neighbors",
    eyebrow: "Community Outreach",
    description:
      "You're helping us serve weekly meals, provide groceries, and share practical care with families right here in our city.",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
  },
  {
    id: 2,
    title: "Building the Next Generation",
    eyebrow: "Kids & Youth",
    description:
      "You're investing in safe, faith-building spaces—training leaders, creating curriculum, and mentoring the next generation.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
  },
  {
    id: 3,
    title: "Planting Churches Worldwide",
    eyebrow: "Global Missions",
    description:
      "You're partnering with missionaries to train leaders, provide resources, and plant churches in unreached communities.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
  },
  // {
  //   id: 4,
  //   title: "Supporting Families in Crisis",
  //   eyebrow: "Local Care",
  //   description:
  //     "You're providing emergency assistance, counseling, and resources to families facing unexpected hardships.",
  //   image:
  //     "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
  // },
  // {
  //   id: 5,
  //   title: "Equipping Church Leaders",
  //   eyebrow: "Leadership Development",
  //   description:
  //     "You're investing in training, mentorship, and resources that empower pastors and leaders to serve more effectively.",
  //   image:
  //     "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
  // },
];

export function PartnerSection() {
  return (
    <section
      id="partner"
      className="relative overflow-hidden bg-white py-32 transition-colors duration-300 dark:bg-neutral-900"
    >
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="mb-4 text-xs tracking-[0.4em] text-black/60 uppercase dark:text-white/60">
            Partnership
          </p>
          <h2
            className={`${larken.className} mb-6 text-5xl font-bold md:text-6xl`}
          >
            You&apos;re Not Just Giving.
            <br />
            You&apos;re Building.
          </h2>
          <p className="max-w-3xl text-xl leading-relaxed text-black/70 dark:text-white/70">
            Every gift you give puts you right in the middle of the work—feeding
            families, raising up leaders, and bringing the gospel to those
            who&apos;ve never heard. This isn&apos;t our mission alone.{" "}
            <strong>It&apos;s ours together.</strong>
          </p>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          {/* <h3 className={`${larken.className} mb-3 text-3xl font-bold`}>
            See What You&apos;re Building
          </h3>
          <p className="mb-12 max-w-2xl text-base leading-relaxed text-black/70 dark:text-white/70">
            Here are just a few of the ways{" "}
            <strong>you&apos;re making an impact</strong>—right now, through
            your generosity and partnership.
          </p> */}

          <ProjectCarousel projects={featuredProjects} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="sm:justify- flex flex-col items-center gap-4 sm:flex-row"
        >
          <button className="group inline-flex cursor-pointer items-center justify-center gap-2 bg-black px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
            {/* <button className="border border-black px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"> */}
            Join as a Partner
          </button>
          <button className="inline-flex cursor-pointer items-center gap-x-2 border border-black px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
            View all projects
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
