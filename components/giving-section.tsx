"use client";

import React from "react";
import { DM_Sans, EB_Garamond } from "next/font/google";
import { motion } from "framer-motion";
import { Heart, HandHeart, Church, Users } from "lucide-react";

const dmSans = DM_Sans({ subsets: ["latin"] });
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const givingImpacts = [
  {
    icon: Church,
    title: "Worship & Ministry",
    description:
      "Support our Sunday services, worship teams, and pastoral care that nurture spiritual growth.",
  },
  {
    icon: Users,
    title: "Community Outreach",
    description:
      "Fund programs that serve the homeless, feed the hungry, and share Christ's love with our city.",
  },
  {
    icon: HandHeart,
    title: "Global Missions",
    description:
      "Partner with missionaries worldwide, spreading the gospel and planting churches in unreached areas.",
  },
];

export function GivingSection() {
  return (
    <section
      id="give"
      className="bg-white py-32 transition-colors duration-300 dark:bg-neutral-900"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-xs tracking-[0.4em] text-black/60 uppercase dark:text-white/60">
              Partner With Us
            </p>
            <h2
              className={`${garamond.className} mb-8 text-5xl font-bold md:text-6xl`}
            >
              Give to Advance
              <br />
              God&apos;s Kingdom
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-black/80 dark:text-white/80">
              Your generous giving enables us to proclaim the gospel, disciple
              believers, and serve our community. Every gift, large or small,
              makes an eternal impact.
            </p>

            <div className="mb-10 space-y-6">
              {givingImpacts.map((impact, index) => (
                <motion.div
                  key={impact.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 border border-black/10 p-6 transition-all duration-300 hover:border-black dark:border-white/10 dark:hover:border-white"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-black text-white transition-colors duration-300 dark:bg-white dark:text-black">
                    <impact.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3
                      className={`${garamond.className} mb-2 text-xl font-bold`}
                    >
                      {impact.title}
                    </h3>
                    <p className="text-sm text-black/70 dark:text-white/70">
                      {impact.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-black px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                Give Online Now
              </button>
              <button className="border border-black px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
                Other Ways to Give
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1400&auto=format&fit=crop"
                alt="Community serving together"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Floating Stats Card */}
              <div className="absolute right-8 bottom-8 left-8 border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
                <p className="mb-4 text-xs tracking-[0.3em] text-black/60 uppercase dark:text-white/60">
                  2024 Impact
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p
                      className={`${garamond.className} mb-1 text-3xl font-bold`}
                    >
                      2,500+
                    </p>
                    <p className="text-xs text-black/70 dark:text-white/70">
                      Families Served
                    </p>
                  </div>
                  <div>
                    <p
                      className={`${garamond.className} mb-1 text-3xl font-bold`}
                    >
                      15
                    </p>
                    <p className="text-xs text-black/70 dark:text-white/70">
                      Mission Partners
                    </p>
                  </div>
                  <div>
                    <p
                      className={`${garamond.className} mb-1 text-3xl font-bold`}
                    >
                      $1.2M
                    </p>
                    <p className="text-xs text-black/70 dark:text-white/70">
                      Given in 2023
                    </p>
                  </div>
                  <div>
                    <p
                      className={`${garamond.className} mb-1 text-3xl font-bold`}
                    >
                      100%
                    </p>
                    <p className="text-xs text-black/70 dark:text-white/70">
                      Transparency
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bible Verse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 border-l-4 border-black bg-neutral-50 p-6 dark:border-white dark:bg-neutral-800"
            >
              <p
                className={`${garamond.className} mb-2 text-lg text-black/90 italic dark:text-white/90`}
              >
                &quot;Each of you should give what you have decided in your
                heart to give, not reluctantly or under compulsion, for God
                loves a cheerful giver.&quot;
              </p>
              <p className="text-sm font-semibold text-black/60 dark:text-white/60">
                2 Corinthians 9:7
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
