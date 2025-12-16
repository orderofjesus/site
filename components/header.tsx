"use client";

import React, { useState, useEffect } from "react";
import { EB_Garamond } from "next/font/google";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-in-out",
        scrolled
          ? "border-b border-black/5 bg-white/80 py-4 backdrop-blur-md dark:border-white/5 dark:bg-neutral-900/80"
          : "border-transparent bg-transparent py-6"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileMenu />
            <Link href="/" className="group flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300",
                  scrolled
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-white text-black"
                )}
              >
                <span className={`${garamond.className} text-xl font-bold`}>
                  M
                </span>
              </div>
              <div className="hidden sm:block">
                <p
                  className={cn(
                    `${garamond.className} text-lg font-bold leading-none transition-colors duration-300`,
                    scrolled
                      ? "text-black dark:text-white"
                      : "text-white"
                  )}
                >
                  Melchizedek
                </p>
                <p
                  className={cn(
                    "text-[10px] uppercase tracking-[0.3em] transition-colors duration-300",
                    scrolled
                      ? "text-black/60 dark:text-white/60"
                      : "text-white/80"
                  )}
                >
                  Order of Jesus
                </p>
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {["About", "Sermons", "Ministries", "Events", "Connect"].map(
              (item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={cn(
                    "text-sm font-medium transition-colors hover:opacity-80",
                    scrolled
                      ? "text-black dark:text-white"
                      : "text-white"
                  )}
                >
                  {item}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              className={cn(
                "hidden rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 md:block",
                scrolled
                  ? "border border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                  : "bg-white text-black hover:bg-white/90"
              )}
            >
              Plan a Visit
            </button>
            <button
              className={cn(
                "hidden rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 sm:block",
                scrolled
                  ? "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  : "border border-white text-white hover:bg-white hover:text-black"
              )}
            >
              Give
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
