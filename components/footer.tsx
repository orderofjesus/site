"use client";

import React from "react";
import Link from "next/link";
import { larken } from "@/lib/fonts";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-2">
            <Link
              href="/"
              className="group mb-4 inline-flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center bg-black text-white transition-colors duration-300 dark:bg-white dark:text-black">
                <span className={`${larken.className} text-xl font-bold`}>
                  M
                </span>
              </div>
              <div>
                <p
                  className={`${larken.className} text-lg leading-tight font-bold text-black dark:text-white`}
                >
                  Melchizedek
                </p>
                <p className="text-[9px] tracking-[0.25em] text-neutral-500 uppercase dark:text-neutral-400">
                  Order of Jesus
                </p>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              A Christ-centered community dedicated to knowing Jesus and making
              Him known.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1">
            <h3 className="mb-4 text-sm font-semibold text-black dark:text-white">
              Navigate
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/sermons"
                  className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  Sermons
                </Link>
              </li>
              <li>
                <Link
                  href="/#partner"
                  className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  Partner
                </Link>
              </li>
              <li>
                <Link
                  href="/#connect"
                  className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Mentorship & Schools */}
          <div className="col-span-1">
            <h3 className="mb-4 text-sm font-semibold text-black dark:text-white">
              Mentorship
            </h3>
            <ul className="mb-6 space-y-3">
              <li className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white">
                Overview
              </li>
              <li>
                <Link
                  href="/mentorship/one-on-one"
                  className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  One on One
                </Link>
              </li>
              <li>
                <Link
                  href="/mentorship/elijah-network"
                  className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  Elijah Network
                </Link>
              </li>
            </ul>
            <h3 className="mb-4 text-sm font-semibold text-black dark:text-white">
              Schools
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/schools/mystical-masterclass"
                  className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  Mystical Masterclass
                </Link>
              </li>
              <li>
                <Link
                  href="/schools/open-scroll"
                  className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  Open Scroll
                </Link>
              </li>
            </ul>
          </div>

          {/* Events */}
          <div className="col-span-1">
            <h3 className="mb-4 text-sm font-semibold text-black dark:text-white">
              Events
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/events"
                  className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  All Events
                </Link>
              </li>
              <li>
                <Link
                  href="/events#healing"
                  className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  Healing Services
                </Link>
              </li>
              <li>
                <Link
                  href="/events#conferences"
                  className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  Conferences
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="mb-4 text-sm font-semibold text-black dark:text-white">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Melchizedek Order of Jesus. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
