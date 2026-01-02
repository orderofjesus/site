"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Home,
  Calendar,
  Users,
  GraduationCap,
  Heart,
  BookOpen,
  Info,
  Phone,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const data = {
  navMain: [
    { title: "Home", url: "/", icon: Home },
    { title: "About", url: "/about", icon: Info },
    { title: "Sermons", url: "/sermons", icon: BookOpen },
    { title: "Contact", url: "/#connect", icon: Phone },
  ],
  ministries: [
    {
      name: "Kids & Youth Ministry",
      url: "/ministries/youth",
      emoji: "👶",
    },
    {
      name: "Worship & Music",
      url: "/ministries/worship",
      emoji: "🎵",
    },
    {
      name: "Small Groups",
      url: "/ministries/small-groups",
      emoji: "👥",
    },
    {
      name: "Prayer Ministry",
      url: "/ministries/prayer",
      emoji: "🙏",
    },
    {
      name: "Community Outreach",
      url: "/ministries/outreach",
      emoji: "🤝",
    },
    {
      name: "Missions",
      url: "/ministries/missions",
      emoji: "🌍",
    },
  ],
  connect: [
    { name: "Mentorship Program", url: "/mentorship", emoji: "🎓" },
    { name: "Upcoming Events", url: "/events", emoji: "📅" },
    { name: "Bible Schools", url: "/schools", emoji: "📖" },
    { name: "Partnership & Giving", url: "/#give", emoji: "💝" },
    { name: "Volunteer Opportunities", url: "/volunteer", emoji: "✋" },
  ],
};

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
        className="flex w-full flex-col border-r border-neutral-200 bg-white p-0 shadow-2xl sm:max-w-xs dark:border-neutral-800 dark:bg-neutral-950"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        <div className="flex h-14 items-center border-b border-neutral-200 px-4 dark:border-neutral-800">
          <button className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-neutral-100 dark:hover:bg-neutral-900">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black">
                <span className="text-sm font-bold">M</span>
              </div>
              <span className="text-sm font-semibold text-black dark:text-white">Melchizedek</span>
            </div>
            <ChevronDown className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-1 py-4">
          <nav className="space-y-1 px-1">
            {data.navMain.map((item) => {
              const isActive = pathname === item.url;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-neutral-100 dark:hover:bg-neutral-900",
                    isActive
                      ? "bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white"
                      : "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1 truncate">{item.title}</span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-2">
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
              Ministries
            </p>
            <div className="space-y-1">
              {data.ministries.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                  title={item.name}
                >
                  <span className="text-lg leading-none">{item.emoji}</span>
                  <span className="flex-1 truncate">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2 pb-6">
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
              Get Connected
            </p>
            <div className="space-y-1">
              {data.connect.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                  title={item.name}
                >
                  <span className="text-lg leading-none">{item.emoji}</span>
                  <span className="flex-1 truncate">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
          <div className="group rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900">
            <button className="flex w-full items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white">
                JD
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-black dark:text-white">
                  John Doe
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  john@example.com
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-neutral-400 transition-transform group-hover:rotate-180 dark:text-neutral-500" />
            </button>
          </div>
          
          <div className="mt-2 space-y-1">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white">
              <User className="h-4 w-4" />
              <span>My Profile</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
