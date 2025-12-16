"use client";

import React from "react";
import { DM_Sans, EB_Garamond } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"] });
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-black/10 dark:border-white/10 py-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center bg-black dark:bg-white text-white dark:text-black transition-colors duration-300">
                <span className={`${garamond.className} text-2xl font-bold`}>M</span>
              </div>
              <div>
                <p className={`${garamond.className} text-xl font-bold leading-none`}>
                  Melchizedek
                </p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-black/60 dark:text-white/60">
                  Order of Jesus
                </p>
              </div>
            </div>
            <p className="text-black/70 dark:text-white/70 max-w-sm mb-6">
              A Christ-centered community dedicated to knowing Jesus and making Him known in
              our city and beyond.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
              <li>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  Beliefs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  Leadership
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Ministries</h3>
            <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
              <li>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  Kids Ministry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  Youth Ministry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  Small Groups
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  Outreach
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-black/60 dark:text-white/60">
          <p>© {new Date().getFullYear()} Melchizedek Order of Jesus. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
