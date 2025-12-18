"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  HandHeart,
  Church,
  Users,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { hellix, larken } from "@/lib/fonts";

const givingImpacts = [
  {
    icon: Church,
    title: "Worship & Ministry",
    description:
      "Support our Sunday services, worship teams, and pastoral care that nurture spiritual growth.",
    percentage: 40,
  },
  {
    icon: Users,
    title: "Community Outreach",
    description:
      "Fund programs that serve the homeless, feed the hungry, and share Christ's love with our city.",
    percentage: 35,
  },
  {
    icon: HandHeart,
    title: "Global Missions",
    description:
      "Partner with missionaries worldwide, spreading the gospel and planting churches in unreached areas.",
    percentage: 25,
  },
];

const quickAmounts = [25, 50, 100, 250];

export function GivingSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [hoveredImpact, setHoveredImpact] = useState<number | null>(null);

  return (
    <section
      id="give"
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
            Partner With Us
          </p>
          <h2
            className={`${larken.className} mb-6 text-5xl font-bold md:text-6xl`}
          >
            Give to Advance
            <br />
            God&apos;s Kingdom
          </h2>
          <p className="max-w-2xl text-xl leading-relaxed text-black/70 dark:text-white/70">
            Your generous giving enables us to proclaim the gospel, disciple
            believers, and serve our community. Every gift makes an eternal
            impact.
          </p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Column - Giving Options & Stats */}
          <div className="space-y-8">
            {/* Quick Give Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-2 border-black bg-white p-8 dark:border-white dark:bg-neutral-800"
            >
              <h3 className={`${larken.className} mb-6 text-2xl font-bold`}>
                Give Online Now
              </h3>

              {/* Quick Amount Selector */}
              <div className="mb-6">
                <p className="mb-3 text-sm font-semibold text-black/70 dark:text-white/70">
                  Select an amount or enter your own:
                </p>
                <div className="mb-4 grid grid-cols-4 gap-3">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`${larken.className} border-2 py-4 text-xl font-bold transition-all duration-300 ${
                        selectedAmount === amount
                          ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                          : "border-black/20 hover:border-black dark:border-white/20 dark:hover:border-white"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Or enter custom amount"
                  className="w-full border-2 border-black/20 bg-transparent px-4 py-3 text-center text-lg font-semibold transition-colors focus:border-black focus:outline-none dark:border-white/20 dark:focus:border-white"
                  onChange={(e) => setSelectedAmount(Number(e.target.value))}
                />
              </div>

              {/* Giving Frequency */}
              <div className="mb-6">
                <p className="mb-3 text-sm font-semibold text-black/70 dark:text-white/70">
                  Frequency:
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {["One-Time", "Monthly", "Weekly"].map((freq) => (
                    <button
                      key={freq}
                      className="border border-black/20 py-3 text-sm font-semibold transition-all duration-300 hover:border-black hover:bg-black hover:text-white dark:border-white/20 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button className="group w-full bg-black py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                <span className="flex items-center justify-center gap-2">
                  Continue to Give
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              <p className="mt-4 text-center text-xs text-black/50 dark:text-white/50">
                Secure, encrypted processing • Tax-deductible
              </p>
            </motion.div>

            {/* Impact Stats */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-neutral-50 p-8 dark:bg-neutral-800"
            >
              <div className="mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <h4 className={`${larken.className} text-xl font-bold`}>
                  2024 Impact
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className={`${larken.className} mb-1 text-4xl font-bold`}>
                    2,500+
                  </p>
                  <p className="text-sm text-black/70 dark:text-white/70">
                    Families Served
                  </p>
                </div>
                <div>
                  <p className={`${larken.className} mb-1 text-4xl font-bold`}>
                    15
                  </p>
                  <p className="text-sm text-black/70 dark:text-white/70">
                    Mission Partners
                  </p>
                </div>
                <div>
                  <p className={`${larken.className} mb-1 text-4xl font-bold`}>
                    $1.2M
                  </p>
                  <p className="text-sm text-black/70 dark:text-white/70">
                    Given in 2023
                  </p>
                </div>
                <div>
                  <p className={`${larken.className} mb-1 text-4xl font-bold`}>
                    100%
                  </p>
                  <p className="text-sm text-black/70 dark:text-white/70">
                    Transparency
                  </p>
                </div>
              </div>
            </motion.div> */}

            {/* Other Ways to Give */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button className="w-full border-2 border-black px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
                View Other Ways to Give
              </button>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-black/60 dark:text-white/60">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Check
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Bank Transfer
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Stock/Crypto
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Legacy Giving
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Impact Areas */}
          <div className="space-y-8">
            {/* <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className={`${larken.className} mb-6 text-3xl font-bold`}>
                Where Your Gift Goes
              </h3>

              <div className="space-y-4">
                {givingImpacts.map((impact, index) => (
                  <motion.div
                    key={impact.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onHoverStart={() => setHoveredImpact(index)}
                    onHoverEnd={() => setHoveredImpact(null)}
                    className="group relative overflow-hidden border border-black/10 bg-white p-6 transition-all duration-300 hover:border-black hover:shadow-xl dark:border-white/10 dark:bg-neutral-800 dark:hover:border-white"
                  >
                    <div
                      className="absolute inset-0 bg-black/5 transition-all duration-500 dark:bg-white/5"
                      style={{
                        width:
                          hoveredImpact === index
                            ? `${impact.percentage}%`
                            : "0%",
                      }}
                    />

                    <div className="relative flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-black text-white transition-all duration-300 group-hover:scale-110 dark:bg-white dark:text-black">
                        <impact.icon className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center justify-between">
                          <h4
                            className={`${larken.className} text-xl font-bold`}
                          >
                            {impact.title}
                          </h4>
                          <span
                            className={`${larken.className} text-2xl font-bold text-black/40 dark:text-white/40`}
                          >
                            {impact.percentage}%
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
                          {impact.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div> */}

            {/* Bible Verse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border-l-4 border-black bg-neutral-50 p-6 dark:border-white dark:bg-neutral-800"
            >
              <p
                className={`${larken.className} mb-3 text-lg leading-relaxed text-black/90 italic dark:text-white/90`}
              >
                &quot;Each of you should give what you have decided in your
                heart to give, not reluctantly or under compulsion, for God
                loves a cheerful giver.&quot;
              </p>
              <p className="text-sm font-semibold text-black/60 dark:text-white/60">
                — 2 Corinthians 9:7
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
