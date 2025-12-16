import React from "react";

import { Manrope, EB_Garamond } from "next/font/google";
import Image from "next/image";
import ImageCarousel from "@/components/carousel";
import Hero from "@/components/hero";
import Header from "@/components/header";
const manrope = Manrope({ subsets: ["latin"] });
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function Us() {
  return (
    <section className="">
      <section
        id="gatherings"
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-6 md:min-h-11/12 md:px-10"
      >
        <div className="absolute inset-0" />
        <div className="relative flex flex-col items-center gap-8 rounded-2xl px-8 py-14 md:flex-row md:items-start md:justify-between md:px-12">
          <div className="max-w-xl space-y-6">
            <p className="text-xs tracking-[0.32em] text-zinc-700 uppercase">
              Welcome home
            </p>
            <h1
              className={`${garamond.className} text-4xl leading-[1.1] font-semibold md:text-5xl`}
            >
              You belong here. Find Jesus, find family.
            </h1>
            <p className="max-w-lg text-lg">
              Melchizedek Order of Jesus is a Christ-centered community in the
              heart of the city. Join us this Sunday to worship, connect, and
              step into your next chapter of faith.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                className="rounded-full bg-[#0f92ff] px-6 py-3 text-sm font-semibold shadow-xl shadow-blue-400/40 transition hover:-translate-y-[1px]"
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
          <div className="w-full max-w-sm rounded-2xl">
            <Image
              alt="us"
              src={
                "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1400&auto=format&fit=crop"
              }
              width={1000}
              height={1000}
              className="h-[462px] w-[462px] rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>
    </section>
  );
}

export default Us;
