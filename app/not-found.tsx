"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { larken, hellix } from "@/lib/fonts";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className={`${hellix.className} min-h-screen bg-neutral-50 text-black transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-white`}
    >
      <Header />

      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1
              className={`${larken.className} text-[120px] leading-none font-bold tracking-tight text-black/10 sm:text-[180px] dark:text-white/10`}
            >
              404
            </h1>
          </div>

          {/* Main Message */}
          <div className="mb-8">
            <h2
              className={`${larken.className} mb-4 text-4xl font-bold tracking-tight sm:text-5xl`}
            >
              Page Not Found
            </h2>
            <p className="text-lg text-black/70 dark:text-white/70">
              We couldn&apos;t find the page you&apos;re looking for. It may
              have been moved or deleted.
            </p>
          </div>

          {/* Bible Verse */}
          <div className="mb-12 rounded-lg border border-black/10 bg-white/50 p-6 dark:border-white/10 dark:bg-white/5">
            <p className="mb-2 text-base text-black/80 italic dark:text-white/80">
              &quot;Ask, and it will be given to you; seek, and you will find;
              knock, and it will be opened to you.&quot;
            </p>
            <p className="text-sm font-semibold text-black/60 dark:text-white/60">
              Matthew 7:7
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="group flex items-center justify-center gap-2 bg-black px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>

            <Link
              href="/sermons"
              className="group flex items-center justify-center gap-2 border border-black bg-transparent px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              <Search className="h-4 w-4" />
              Browse Sermons
            </Link>
          </div>

          {/* Back Link */}
          <div className="mt-8">
            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center gap-2 text-sm text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Go back to previous page
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
