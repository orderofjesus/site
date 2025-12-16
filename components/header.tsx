import React from "react";
import { Manrope, Playfair_Display } from "next/font/google";
import Image from "next/image";
import ImageCarousel from "@/components/carousel";
import Hero from "@/components/hero";
const manrope = Manrope({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function Header() {
  return (
    <header className="mx-auto flex max-w-440 items-center justify-between px-6 py-6 md:px-10">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-linear-to-br from-[#1a6cf0] to-[#0dbde6] text-white shadow-lg shadow-blue-200/50">
          <span className={`${playfair.className} text-xl`}>✶</span>
        </div>
        <div>
          <p
            className={`${playfair.className} text-xl leading-tight font-bold`}
          >
            Melchizedek
          </p>
          <p className="text-xs tracking-[0.25em] text-zinc-500 uppercase">
            Order of Jesus
          </p>
        </div>
      </div>

      <nav className="hidden items-center gap-6 text-sm font-semibold text-zinc-700 md:flex">
        <a className="hover:text-[#0f92ff]" href="#gatherings">
          Sundays
        </a>
        <a className="hover:text-[#0f92ff]" href="#connect">
          Next Steps
        </a>
        <a className="hover:text-[#0f92ff]" href="#ministries">
          Ministries
        </a>
        <a className="hover:text-[#0f92ff]" href="#events">
          Events
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <a
          className="hidden rounded-full border border-[#0f92ff]/40 px-4 py-2 text-sm font-semibold text-[#0f92ff] transition hover:border-[#0f92ff] hover:bg-[#0f92ff]/10 md:inline-block"
          href="#plan"
        >
          Plan a Visit
        </a>
        <button className="rounded-full bg-[#0f92ff] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200/60 transition hover:-translate-y-px hover:shadow-xl">
          Stream Live
        </button>
      </div>
    </header>
  );
}

export default Header;
