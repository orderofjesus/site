"use client";

import React from "react";
import Link from "next/link";
import { larken } from "@/lib/fonts";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="flex h-10 w-10 items-center justify-center bg-black dark:bg-white text-white dark:text-black transition-colors duration-300">
                <span className={`${larken.className} text-xl font-bold`}>M</span>
              </div>
              <div>
                <p className={`${larken.className} text-lg font-bold leading-tight text-black dark:text-white`}>
                  Melchizedek
                </p>
                <p className="text-[9px] tracking-[0.25em] uppercase text-neutral-500 dark:text-neutral-400">
                  Order of Jesus
                </p>
              </div>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs leading-relaxed">
              A Christ-centered community dedicated to knowing Jesus and making Him known.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-black dark:text-white mb-4">Navigate</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="/#partner" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  Partner
                </Link>
              </li>
              <li>
                <Link href="/#connect" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Mentorship & Schools */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-black dark:text-white mb-4">Mentorship</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <Link href="/mentorship" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/mentorship/one-on-one" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  One on One
                </Link>
              </li>
              <li>
                <Link href="/mentorship/elijah-network" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  Elijah Network
                </Link>
              </li>
            </ul>
            <h3 className="text-sm font-semibold text-black dark:text-white mb-4">Schools</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/schools/mystical-masterclass" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  Mystical Masterclass
                </Link>
              </li>
              <li>
                <Link href="/schools/open-scroll" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  Open Scroll
                </Link>
              </li>
            </ul>
          </div>

          {/* Events */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-black dark:text-white mb-4">Events</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/events" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  All Events
                </Link>
              </li>
              <li>
                <Link href="/events#healing" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  Healing Services
                </Link>
              </li>
              <li>
                <Link href="/events#conferences" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  Conferences
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-black dark:text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-center text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Melchizedek Order of Jesus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
