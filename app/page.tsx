"use client";

import { DM_Sans, EB_Garamond } from "next/font/google";
import {
  ChevronRight,
  Play,
  Calendar,
  MapPin,
  Users,
  Heart,
} from "lucide-react";

const dmSans = DM_Sans({ subsets: ["latin"] });
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
  return (
    <div className={`${dmSans.className} min-h-screen bg-white text-black`}>
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                <span className={`${garamond.className} text-2xl font-bold`}>
                  M
                </span>
              </div>
              <div>
                <p
                  className={`${garamond.className} text-xl leading-none font-bold`}
                >
                  Melchizedek
                </p>
                <p className="text-[10px] tracking-[0.3em] text-black/60 uppercase">
                  Order of Jesus
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-8 lg:flex">
              <a
                href="#about"
                className="text-sm font-medium text-black/70 transition-colors hover:text-black"
              >
                About
              </a>
              <a
                href="#sermons"
                className="text-sm font-medium text-black/70 transition-colors hover:text-black"
              >
                Sermons
              </a>
              <a
                href="#ministries"
                className="text-sm font-medium text-black/70 transition-colors hover:text-black"
              >
                Ministries
              </a>
              <a
                href="#events"
                className="text-sm font-medium text-black/70 transition-colors hover:text-black"
              >
                Events
              </a>
              <a
                href="#connect"
                className="text-sm font-medium text-black/70 transition-colors hover:text-black"
              >
                Connect
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <button className="hidden border border-black px-6 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white md:block">
                Plan a Visit
              </button>
              <button className="bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black/90">
                Give
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center bg-black pt-20 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1600&auto=format&fit=crop"
            alt="Church gathering"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-6 text-xs tracking-[0.4em] text-white/80 uppercase">
              Welcome Home
            </p>
            <h1
              className={`${garamond.className} mb-8 text-6xl leading-[1.05] font-bold md:text-7xl lg:text-8xl`}
            >
              You Belong
              <br />
              Here
            </h1>
            <p className="mb-12 max-w-2xl text-xl leading-relaxed text-white/90 md:text-2xl">
              Experience authentic worship, genuine community, and life-changing
              encounters with Jesus Christ.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="group flex items-center gap-2 bg-white px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-white/90">
                Join Us This Sunday
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="flex items-center gap-2 border border-white px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black">
                <Play className="h-5 w-5" />
                Watch Live
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex animate-bounce flex-col items-center gap-2">
            <p className="text-xs tracking-[0.3em] text-white/60 uppercase">
              Scroll to Explore
            </p>
            <ChevronRight className="h-4 w-4 rotate-90 text-white/60" />
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="border-b border-black/10 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative border-2 border-black bg-white p-10 transition-all duration-500 hover:bg-black hover:text-white">
              <div className="absolute top-10 right-10 text-8xl font-bold text-black/5 transition-colors group-hover:text-white/10">
                01
              </div>
              <div className="relative">
                <p className="mb-4 text-xs tracking-[0.3em] text-black/60 uppercase group-hover:text-white/70">
                  Sunday Morning
                </p>
                <h3 className={`${garamond.className} mb-2 text-3xl font-bold`}>
                  9:00 AM
                </h3>
                <p className="mb-4 text-lg">Traditional Service</p>
                <p className="text-sm text-black/60 group-hover:text-white/70">
                  Classic hymns, liturgy, and timeless worship
                </p>
              </div>
            </div>

            <div className="group relative border-2 border-black bg-black p-10 text-white">
              <div className="absolute top-10 right-10 text-8xl font-bold text-white/10">
                02
              </div>
              <div className="relative">
                <p className="mb-4 text-xs tracking-[0.3em] text-white/70 uppercase">
                  Sunday Morning
                </p>
                <h3 className={`${garamond.className} mb-2 text-3xl font-bold`}>
                  11:00 AM
                </h3>
                <p className="mb-4 text-lg">Contemporary Service</p>
                <p className="text-sm text-white/70">
                  Modern worship, live band, and dynamic teaching
                </p>
              </div>
            </div>

            <div className="group relative border-2 border-black bg-white p-10 transition-all duration-500 hover:bg-black hover:text-white">
              <div className="absolute top-10 right-10 text-8xl font-bold text-black/5 transition-colors group-hover:text-white/10">
                03
              </div>
              <div className="relative">
                <p className="mb-4 text-xs tracking-[0.3em] text-black/60 uppercase group-hover:text-white/70">
                  Wednesday Evening
                </p>
                <h3 className={`${garamond.className} mb-2 text-3xl font-bold`}>
                  7:00 PM
                </h3>
                <p className="mb-4 text-lg">Midweek Prayer</p>
                <p className="text-sm text-black/60 group-hover:text-white/70">
                  Community prayer, worship, and Bible study
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sermon Carousel */}
      <section className="bg-black py-32 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16">
            <p className="mb-4 text-xs tracking-[0.4em] text-white/60 uppercase">
              Featured Messages
            </p>
            <h2
              className={`${garamond.className} text-5xl font-bold md:text-6xl`}
            >
              Transforming Messages
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {featuredSermons.map((sermon, index) => (
              <div
                key={sermon.id}
                className="group relative overflow-hidden border border-white/10 bg-white/5 transition-all duration-500 hover:border-white"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={sermon.image}
                    alt={sermon.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <button className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white text-black transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-1 h-6 w-6" fill="currentColor" />
                  </button>
                </div>
                <div className="p-8">
                  <p className="mb-3 text-xs tracking-[0.3em] text-white/60 uppercase">
                    {sermon.speaker}
                  </p>
                  <h3
                    className={`${garamond.className} mb-2 text-2xl font-bold`}
                  >
                    {sermon.title}
                  </h3>
                  <p className="text-white/70">{sermon.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-xs tracking-[0.4em] text-black/60 uppercase">
                Our Mission
              </p>
              <h2
                className={`${garamond.className} mb-8 text-5xl font-bold md:text-6xl`}
              >
                Know Jesus,
                <br />
                Make Him Known
              </h2>
              <p className="mb-8 text-xl leading-relaxed text-black/80">
                We are a Christ-centered community dedicated to worship,
                discipleship, and service. Our mission is to glorify God by
                making disciples who love Jesus and transform the world.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-black text-white">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3
                      className={`${garamond.className} mb-2 text-xl font-bold`}
                    >
                      Authentic Worship
                    </h3>
                    <p className="text-black/70">
                      Experience genuine, spirit-filled worship that honors God
                      and transforms hearts.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-black text-white">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3
                      className={`${garamond.className} mb-2 text-xl font-bold`}
                    >
                      Community
                    </h3>
                    <p className="text-black/70">
                      Build meaningful relationships in small groups and serve
                      together in ministry.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-black text-white">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3
                      className={`${garamond.className} mb-2 text-xl font-bold`}
                    >
                      Local Impact
                    </h3>
                    <p className="text-black/70">
                      Serve our city with compassion, meeting practical needs
                      and sharing the gospel.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1400&auto=format&fit=crop"
                  alt="Community worship"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 flex h-48 w-48 items-center justify-center bg-black text-white">
                <div className="text-center">
                  <p
                    className={`${garamond.className} mb-2 text-5xl font-bold`}
                  >
                    25+
                  </p>
                  <p className="text-xs tracking-[0.3em] uppercase">
                    Years Serving
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sermon Grid */}
      <section id="sermons" className="bg-neutral-50 py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="mb-4 text-xs tracking-[0.4em] text-black/60 uppercase">
                Teaching Archive
              </p>
              <h2
                className={`${garamond.className} text-5xl font-bold md:text-6xl`}
              >
                Recent Sermons
              </h2>
            </div>
            <button className="hidden items-center gap-2 text-sm font-semibold transition-all hover:gap-3 md:flex">
              View All Sermons
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon) => (
              <article
                key={sermon.id}
                className="group overflow-hidden border border-black/10 bg-white transition-all duration-500 hover:border-black hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={sermon.image}
                    alt={sermon.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40"></div>
                  <button className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Play className="ml-1 h-5 w-5" fill="currentColor" />
                  </button>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 text-xs font-semibold text-black">
                    {sermon.series}
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-2 text-xs tracking-[0.2em] text-black/60 uppercase">
                    {sermon.speaker}
                  </p>
                  <h3
                    className={`${garamond.className} mb-3 text-2xl font-bold group-hover:underline`}
                  >
                    {sermon.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-black/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {sermon.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Play className="h-4 w-4" />
                      {sermon.duration}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <button className="inline-flex items-center gap-2 bg-black px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-black/90">
              View All Sermons
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="bg-black py-32 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="mb-6 text-xs tracking-[0.4em] text-white/60 uppercase">
            Take the Next Step
          </p>
          <h2
            className={`${garamond.className} mb-8 text-5xl font-bold md:text-7xl`}
          >
            Join Our Community
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-white/80">
            Whether you&apos;re new to faith or have been walking with Jesus for
            years, there&apos;s a place for you here. Connect with us today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-white/90">
              Plan Your First Visit
            </button>
            <button className="border border-white px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black">
              Join a Small Group
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                  <span className={`${garamond.className} text-2xl font-bold`}>
                    M
                  </span>
                </div>
                <div>
                  <p
                    className={`${garamond.className} text-xl leading-none font-bold`}
                  >
                    Melchizedek
                  </p>
                  <p className="text-[10px] tracking-[0.3em] text-black/60 uppercase">
                    Order of Jesus
                  </p>
                </div>
              </div>
              <p className="mb-6 max-w-sm text-black/70">
                A Christ-centered community dedicated to knowing Jesus and
                making Him known in our city and beyond.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">Connect</h3>
              <ul className="space-y-2 text-sm text-black/70">
                <li>
                  <a href="#" className="transition-colors hover:text-black">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-black">
                    Beliefs
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-black">
                    Leadership
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-black">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold">Ministries</h3>
              <ul className="space-y-2 text-sm text-black/70">
                <li>
                  <a href="#" className="transition-colors hover:text-black">
                    Kids Ministry
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-black">
                    Youth Ministry
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-black">
                    Small Groups
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-black">
                    Outreach
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 text-sm text-black/60 md:flex-row">
            <p>
              © {new Date().getFullYear()} Melchizedek Order of Jesus. All
              rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-black">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-black">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
