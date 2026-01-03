"use client";

import { VideoHero } from "@/components/video-hero";
import { Header } from "@/components/header";
import { ConnectOptions } from "@/components/connect-options";
import { FeaturedCarouselSection } from "@/components/featured-carousel-section";
import { AboutSection } from "@/components/about-section";
import { PartnerSection } from "@/components/partner-section";
import { SermonsGrid } from "@/components/sermons-grid";
import { ConnectSection } from "@/components/connect-section";
import { Footer } from "@/components/footer";
import { hellix } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { useAuth } from "@workos-inc/authkit-nextjs/components";

import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";

const sermons = [
  {
    id: 1,
    title: "The Heart of Worship",
    speaker: "Pastor John Mitchell",
    date: "March 10, 2024",
    duration: "42 min",
    series: "Living Faith",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Grace Upon Grace",
    speaker: "Pastor Sarah Johnson",
    date: "March 3, 2024",
    duration: "38 min",
    series: "Living Faith",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Walking in the Spirit",
    speaker: "Pastor John Mitchell",
    date: "February 25, 2024",
    duration: "45 min",
    series: "Spirit Led",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Love That Transforms",
    speaker: "Pastor Emily Chen",
    date: "February 18, 2024",
    duration: "40 min",
    series: "Spirit Led",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Faith in Action",
    speaker: "Pastor Michael Brown",
    date: "February 11, 2024",
    duration: "36 min",
    series: "Active Faith",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "The Power of Prayer",
    speaker: "Pastor Sarah Johnson",
    date: "February 4, 2024",
    duration: "44 min",
    series: "Active Faith",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400&auto=format&fit=crop",
  },
];

const featuredSermons = [
  {
    id: 1,
    title: "The Heart of Worship",
    subtitle: "Discovering True Devotion",
    speaker: "Pastor John Mitchell",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Grace Upon Grace",
    subtitle: "Living in God's Abundant Love",
    speaker: "Pastor Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Walking in the Spirit",
    subtitle: "A Journey of Faith and Power",
    speaker: "Pastor John Mitchell",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <div
      className={`${hellix.className} dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(96, 94, 214, 0.76),rgba(25, 52, 75, 0.98))] min-h-screen bg-neutral-50 text-black transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-white`}
    >
      <Header />
      {/* <div className="background-animate bg-linear-to-r from-neutral-50 via-zinc-500 to-gray-500 pb-24">
        <VideoHero />
      </div> */}
      <div className="bg-neutral-50 pb-24 dark:bg-black">
        <VideoHero />
      </div>
      <ConnectOptions />
      <Authenticated>You are signed in</Authenticated>
      <Unauthenticated>
        <p>Please sign in to view data</p>
      </Unauthenticated>
      <FeaturedCarouselSection sermons={featuredSermons} />
      <AboutSection />
      <PartnerSection />
      <SermonsGrid sermons={sermons} />
      <ConnectSection />
      <Footer />
    </div>
  );
}
