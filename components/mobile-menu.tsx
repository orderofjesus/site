"use client";

import React from "react";
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
import { DM_Sans, EB_Garamond } from "next/font/google";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";

const dmSans = DM_Sans({ subsets: ["latin"] });
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-black transition-colors duration-200 hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
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
                <span className={`${garamond.className} text-2xl font-bold`}>
                  M
                </span>
              </div>
              <div>
                <p
                  className={`${garamond.className} text-xl font-bold leading-none`}
                >
                  Melchizedek
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-black/60 dark:text-white/60">
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
