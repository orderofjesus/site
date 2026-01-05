"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
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
  LogIn,
  LayoutDashboard,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@workos-inc/authkit-nextjs/components";

const data = {
  navMain: [
    { title: "Home", url: "/", icon: Home },
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "About", url: "/about", icon: Info },
    { title: "Sermons", url: "/sermons", icon: BookOpen },
    { title: "Partner", url: "/#partner", icon: Heart },
    { title: "Contact", url: "/#connect", icon: Phone },
  ],
  expandable: [
    {
      title: "Mentorship",
      icon: Users,
      items: [
        // { name: "Overview", url: "/mentorship" },
        { name: "One on One", url: "/mentorship/one-on-one" },
        { name: "Elijah Network", url: "/mentorship/elijah-network" },
      ],
    },
    {
      title: "Schools",
      icon: GraduationCap,
      items: [
        { name: "Mystical Masterclass", url: "/schools/mystical-masterclass" },
        { name: "Open Scroll", url: "/schools/open-scroll" },
      ],
    },
    {
      title: "Events",
      icon: Calendar,
      items: [
        { name: "All Events", url: "/events" },
        { name: "Healing Services", url: "/events#healing" },
        { name: "Conferences", url: "/events#conferences" },
      ],
    },
  ],
};

// Routes that have dark backgrounds initially (hero images, dark sections, etc.)
const darkBackgroundRoutes = [
  "/",
  /^\/events\/[^/]+$/, // Matches /events/[id] with any ID format (including Convex IDs)
  /^\/schools\/[^/]+$/,
  /^\/mentorship\/[^/]+$/,
];

export function MobileMenu() {
  const [scrolled, setScrolled] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Mentorship",
    "Schools",
    "Events",
  ]);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut, loading } = useAuth();
  const isAuthenticated = !!user;

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

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

  // Determine button colors based on scroll state and page background
  const getButtonColors = () => {
    if (scrolled) {
      return "border-black/20 bg-black/5 text-black hover:bg-black hover:text-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white dark:hover:text-black";
    }
    return hasLightBackground
      ? "border-black/20 bg-black/5 text-black hover:bg-black hover:text-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white dark:hover:text-black"
      : "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-black";
  };

  // console.log("Auth status: ", isAuthenticated);
  // console.log("Auth user: ", user);

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <button
          className={cn(
            "group relative flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-xl transition-all duration-300 ease-out",
            getButtonColors(),
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
              <span className="text-sm font-semibold text-black dark:text-white">
                Melchizedek
              </span>
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
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all",
                    isActive
                      ? "bg-black text-white shadow-sm dark:bg-white dark:text-black"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1 truncate">{item.title}</span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-3 pb-6">
            {data.expandable.map((section) => {
              const isExpanded = expandedSections.includes(section.title);
              return (
                <div key={section.title} className="space-y-1">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50 dark:text-neutral-100 dark:hover:bg-neutral-900"
                  >
                    <section.icon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    <span className="flex-1 text-left">{section.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-neutral-500 transition-transform duration-200 dark:text-neutral-400",
                        isExpanded && "rotate-180",
                      )}
                    />
                  </button>
                  {isExpanded && (
                    <div className="space-y-0.5 border-l-2 border-neutral-200 pl-4 dark:border-neutral-800">
                      {section.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.url}
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
                        >
                          <span className="flex-1">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900 dark:border-neutral-600 dark:border-t-neutral-100" />
            </div>
          ) : (
            <>
              {isAuthenticated ? (
                <>
                  <div className="mb-3 flex items-center gap-3 px-2">
                    {user && user.profilePictureUrl ? (
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={user.profilePictureUrl}
                          alt={user.firstName || "User"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-xs font-semibold text-white dark:bg-white dark:text-black">
                        {user && user.firstName
                          ? user.firstName
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)
                          : "U"}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {user?.firstName || "User"}
                      </p>
                      <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                    >
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                    {/* <Link
                      href="/settings"
                      className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link> */}
                    <button
                      onClick={async () => {
                        await signOut({
                          returnTo: "/",
                        }).then(() => {
                          router.refresh();
                        });
                      }}
                      className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
