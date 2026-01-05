"use client";

import React, { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { larken } from "@/lib/fonts";
import { usePathname } from "next/navigation";
import { HandCoins, Handshake } from "lucide-react";
import { AuthButton } from "@/components/auth-button";

const links = [
  {
    id: "1",
    title: "Mentorship",
    href: "/mentorship",
  },
  {
    id: "2",
    title: "Events",
    href: "/events",
  },
  {
    id: "3",
    title: "Schools",
    href: "/schools",
  },
  {
    id: "4",
    title: "Sermons",
    href: "/sermons",
  },
  // {
  //   id: "5",
  //   title: "About",
  //   href: "/about",
  // },
];

// Routes that have dark backgrounds initially (hero images, dark sections, etc.)
const darkBackgroundRoutes = [
  "/",
  /^\/events\/[^/]+$/, // Matches /events/[id] with any ID format (including Convex IDs)
  /^\/schools\/[^/]+$/,
  /^\/mentorship\/[^/]+$/,
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Determine if the page has a light background initially
  const hasLightBackground = !darkBackgroundRoutes.some((route) => {
    if (typeof route === "string") {
      return pathname === route;
    }
    // Handle regex patterns
    return route.test(pathname);
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine text colors based on scroll state and page background
  const getTextColor = () => {
    if (scrolled) {
      return "text-black dark:text-white";
    }
    return hasLightBackground ? "text-black dark:text-white" : "text-white";
  };

  const getSubtitleColor = () => {
    if (scrolled) {
      return "text-black/60 dark:text-white/60";
    }
    return hasLightBackground
      ? "text-black/60 dark:text-white/60"
      : "text-white/80";
  };

  const getLogoColors = () => {
    if (scrolled) {
      return "bg-black text-white dark:bg-white dark:text-black";
    }
    return hasLightBackground
      ? "bg-black text-white dark:bg-white dark:text-black"
      : "bg-white text-black";
  };

  const getButtonColors = () => {
    if (scrolled) {
      return "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90";
    }
    return hasLightBackground
      ? "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
      : "border border-white bg-white text-black hover:bg-black hover:text-white";
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out",
        scrolled
          ? "border-b border-black/5 bg-white/80 py-4 backdrop-blur-md dark:border-white/5 dark:bg-neutral-900/80"
          : "border-transparent bg-transparent py-6",
      )}
    >
      <div className="mx-auto max-w-380 px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileMenu />
            <Link href="/" className="group flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300",
                  getLogoColors(),
                )}
              >
                <span className={`${larken.className} text-xl font-bold`}>
                  M
                </span>
              </div>
              <div className="hidden sm:block">
                <p
                  className={cn(
                    `${larken.className} text-lg leading-none font-bold transition-colors duration-300`,
                    getTextColor(),
                  )}
                >
                  Melchizedek
                </p>
                <p
                  className={cn(
                    "text-[10px] tracking-[0.3em] uppercase transition-colors duration-300",
                    getSubtitleColor(),
                  )}
                >
                  Order of Jesus
                </p>
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((item) => (
              <Link
                key={item.id}
                href={`${item.href}`}
                className={cn(
                  "text-sm font-medium transition-colors hover:opacity-80",
                  getTextColor(),
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              className={cn(
                "hidden gap-x-2 px-4 py-2.5 text-sm font-semibold transition-all duration-300 sm:flex sm:items-center",
                getButtonColors(),
              )}
            >
              <Handshake className="h-[20px] w-[20px]" />
              Partner with us
            </button>
            <AuthButton />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
