import { EB_Garamond } from "next/font/google";
import React from "react";

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function Hero() {
  return (
    <section
      id="gatherings"
      className="relative mx-auto flex h-full w-full max-w-400 flex-col justify-center overflow-hidden rounded-3xl bg-neutral-900 text-white shadow-2xl shadow-blue-200/30 md:min-h-[80vh] md:px-10"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-linear-to-r from-neutral-950/80 via-neutral-900/75 to-transparent" />
      <div className="relative flex flex-col items-center gap-8 px-8 py-14 md:flex-row md:items-end md:justify-between md:px-12">
        <div className="max-w-xl space-y-6">
          <p className="text-xs tracking-[0.32em] text-[#8fd9ff] uppercase">
            Welcome home
          </p>
          <h1
            className={`${garamond.className} text-4xl leading-[1.1] font-semibold md:text-5xl lg:text-6xl`}
          >
            You belong here. Find Jesus, find family.
          </h1>
          <p className="max-w-lg text-lg text-zinc-200">
            Melchizedek Order of Jesus is a Christ-centered community in the
            heart of the city. Join us this Sunday to worship, connect, and step
            into your next chapter of faith.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              className="rounded-full bg-[#0f92ff] px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-400/40 transition hover:-translate-y-[1px]"
              href="#plan"
            >
              Plan your visit
            </a>
            <a
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              href="#events"
            >
              See what&apos;s happening
            </a>
          </div>
        </div>
        <div className="w-full max-w-sm rounded-2xl bg-white/10 p-5 backdrop-blur-md md:w-auto">
          <div className="flex items-center justify-between text-sm font-semibold">
            <p>Sunday Gatherings</p>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
              This week
            </span>
          </div>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs tracking-[0.2em] text-[#8fd9ff] uppercase">
                9:00 AM
              </p>
              <p className="text-lg font-semibold">City Campus</p>
              <p className="text-sm text-zinc-200">
                Teaching, worship, kids check-in opens 8:40
              </p>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs tracking-[0.2em] text-[#8fd9ff] uppercase">
                11:30 AM
              </p>
              <p className="text-lg font-semibold">Online + In-Person</p>
              <p className="text-sm text-zinc-200">
                Live stream &amp; prayer rooms after service
              </p>
            </div>
          </div>
          <a
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:-translate-y-px"
            href="#connect"
          >
            I&apos;m new — show me next steps
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
