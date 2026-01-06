"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { larken } from "@/lib/fonts";
import {
  LayoutDashboard,
  Calendar,
  School,
  Users,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    param: null,
  },
  {
    title: "My Events",
    href: "/dashboard?view=events",
    icon: Calendar,
    param: "events",
  },
  {
    title: "My Schools",
    href: "/dashboard?view=schools",
    icon: School,
    param: "schools",
  },
  {
    title: "My Mentorships",
    href: "/dashboard?view=mentorships",
    icon: Users,
    param: "mentorships",
  },
];

interface DashboardNavProps {
  userName?: string;
  userEmail?: string;
}

export function DashboardNav({ userName, userEmail }: DashboardNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view");
  const { theme, setTheme } = useTheme();

  const isActive = (param: string | null) => {
    if (param === null) {
      return pathname === "/dashboard" && !currentView;
    }
    return currentView === param;
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="fixed top-20 left-4 z-40 lg:hidden">
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-lg border border-black/10 bg-white p-2 shadow-lg dark:border-white/10 dark:bg-neutral-900"
          variant="ghost"
          size="icon"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-30 h-screen w-64 border-r border-black/10 bg-white transition-transform duration-300 dark:border-white/10 dark:bg-neutral-900",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo/Header */}
          <div className="border-b border-black/10 p-6 dark:border-white/10">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black">
                <span className={`${larken.className} text-xl font-bold`}>
                  M
                </span>
              </div>
              <div>
                <p
                  className={`${larken.className} text-lg leading-none font-bold`}
                >
                  Melchizedek
                </p>
                <p className="text-[10px] tracking-[0.3em] text-black/60 uppercase dark:text-white/60">
                  Dashboard
                </p>
              </div>
            </Link>
          </div>

          {/* User Info */}
          {userEmail && (
            <div className="border-b border-black/10 p-6 dark:border-white/10">
              <p className="mb-1 text-sm font-semibold">{userName || "User"}</p>
              <p className="text-xs text-black/60 dark:text-white/60">
                {userEmail}
              </p>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.param);

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="border-t border-black/10 p-4 dark:border-white/10">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mb-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-black/70 transition-all duration-200 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-5 w-5" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" />
                  Dark Mode
                </>
              )}
            </button>

            {/* Sign Out */}
            <Link
              href="/api/auth/logout"
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20"
            >
              <LogOut className="h-5 w-5" />
              Log out
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
