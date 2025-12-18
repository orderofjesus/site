"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  Home,
  Info,
  BookOpen,
  Calendar,
  Users,
  Heart,
  Phone,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { larken } from "@/lib/fonts";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Info, label: "About", href: "/#about" },
  { icon: BookOpen, label: "Sermons", href: "/sermons" },
  { icon: Calendar, label: "Events", href: "/#events" },
  { icon: Users, label: "Ministries", href: "/#ministries" },
  { icon: Heart, label: "Give", href: "/#give" },
  { icon: Phone, label: "Contact", href: "/#connect" },
];

export function MobileMenu() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const hasLightBackground = pathname !== "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine button colors based on scroll state and page background
  const getButtonColors = () => {
    if (scrolled) {
      return "border-black/20 bg-black/5 text-black hover:bg-black hover:text-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white dark:hover:text-black";
    }
    return hasLightBackground
      ? "border-black/20 bg-black/5 text-black hover:bg-black hover:text-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white dark:hover:text-black"
      : "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-black";
  };

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <button
          className={cn(
            "group relative flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xl transition-all duration-300 ease-out",
            getButtonColors()
          )}
          aria-label="Toggle menu"
        >
          <span className="h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out group-hover:w-6" />
          <span className="h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out group-hover:w-4" />
          <span className="h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out group-hover:w-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full border-r border-black/10 bg-white p-0 sm:max-w-md dark:border-white/10 dark:bg-neutral-900"
      >
        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
        <div className="flex h-full flex-col">
          {/* Header */}
          <SheetHeader className="border-b border-black/10 p-6 dark:border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                <span className={`${larken.className} text-2xl font-bold`}>
                  M
                </span>
              </div>
              <div>
                <p
                  className={`${larken.className} text-xl leading-none font-bold`}
                >
                  Melchizedek
                </p>
                <p className="text-[10px] tracking-[0.3em] text-black/60 uppercase dark:text-white/60">
                  Order of Jesus
                </p>
              </div>
            </div>
          </SheetHeader>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 rounded-xl border border-black/10 p-4 transition-colors duration-200 hover:border-black hover:bg-black hover:text-white dark:border-white/10 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-lg font-medium">{item.label}</span>
                    <ChevronRight className="ml-auto h-5 w-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer CTAs */}
          <SheetFooter className="space-y-3 border-t border-black/10 p-6 dark:border-white/10">
            <button className="w-full rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
              Plan Your Visit
            </button>
            <button className="w-full rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition-colors duration-200 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
              Watch Online
            </button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ChevronRight({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
