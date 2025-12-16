"use client";

import { Manrope, Playfair_Display } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const manrope = Manrope({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function Header() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between border-b border-black/10 bg-white px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg border border-black bg-black text-xl font-semibold text-white">
          ✶
        </div>
        <div>
          <p
            className={`${playfair.className} text-xl font-bold leading-tight text-black`}
          >
            Melchizedek
          </p>
          <p className="text-xs uppercase tracking-[0.28em] text-black/60">
            Order of Jesus
          </p>
        </div>
      </div>
      <nav className="hidden items-center gap-6 text-sm font-medium text-black/70 md:flex">
        <a className="hover:text-black transition-colors" href="#welcome">
          Welcome
        </a>
        <a className="hover:text-black transition-colors" href="#next">
          Next Steps
        </a>
        <a className="hover:text-black transition-colors" href="#ministries">
          Ministries
        </a>
        <a className="hover:text-black transition-colors" href="#events">
          Events
        </a>
      </nav>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="hidden border-black text-black hover:bg-black hover:text-white md:inline-flex"
          asChild
        >
          <a href="#next">Plan a Visit</a>
        </Button>
        <Button className="bg-black text-white hover:bg-black/90" asChild>
          <a href="#events">Watch Live</a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="welcome"
      className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-10"
    >
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.28em] text-black/50">
          Welcome home
        </p>
        <h1
          className={`${playfair.className} text-4xl leading-[1.1] text-black sm:text-5xl lg:text-6xl`}
        >
          A church for the city, a seat for you.
        </h1>
        <p className="text-base leading-relaxed text-black/70 sm:text-lg">
          Every Sunday we gather to worship Jesus, care for one another, and
          scatter back into the city with hope. Come as you are—there is room
          for your story here.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            className="bg-black text-white hover:bg-black/90"
            size="lg"
            asChild
          >
            <a href="#next">Plan your visit</a>
          </Button>
          <Button
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white"
            size="lg"
            asChild
          >
            <a href="#events">See gatherings</a>
          </Button>
        </div>
      </div>
      <div className="relative h-72 overflow-hidden rounded-lg border border-black/10 bg-white sm:h-96">
        <Image
          alt="People gathered in church"
          className="object-cover"
          fill
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop"
        />
      </div>
    </section>
  );
}

function SermonCarousel() {
  const sermons = [
    {
      title: "Grace in the City",
      speaker: "Pastor Lena Hart",
      date: "This Sunday",
      image:
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "Hope Carried Forward",
      speaker: "Guest: Mark Rivers",
      date: "Next Week",
      image:
        "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "Jesus at the Center",
      speaker: "Pastor David Cole",
      date: "Archive",
      image:
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1400&auto=format&fit=crop",
    },
  ];
  const [index, setIndex] = useState(0);
  const move = (direction: 1 | -1) => {
    setIndex((prev) => (prev + direction + sermons.length) % sermons.length);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-lg border border-black/10 bg-white">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {sermons.map((sermon) => (
            <div key={sermon.title} className="relative min-w-full">
              <div className="relative h-72 sm:h-96">
                <Image
                  alt={sermon.title}
                  className="object-cover"
                  fill
                  src={sermon.image}
                  priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6 sm:px-10 sm:pb-10">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">
                    {sermon.date}
                  </p>
                  <h3
                    className={`${playfair.className} mt-2 text-3xl leading-tight text-white sm:text-4xl`}
                  >
                    {sermon.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/90">{sermon.speaker}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 flex items-center px-3 sm:px-5">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/95 text-black hover:bg-white border border-black/10"
            onClick={() => move(-1)}
            aria-label="Previous sermon"
          >
            ←
          </Button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 sm:px-5">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/95 text-black hover:bg-white border border-black/10"
            onClick={() => move(1)}
            aria-label="Next sermon"
          >
            →
          </Button>
        </div>
      </div>
    </section>
  );
}

function NextSteps() {
  const steps = [
    {
      title: "Plan Sunday",
      description:
        "Where to park, kids check-in, and a friendly face to meet you at the door.",
      cta: "Schedule",
    },
    {
      title: "Meet the team",
      description:
        "Say hello after service or grab coffee with a pastor during the week.",
      cta: "Book coffee",
    },
    {
      title: "Join a circle",
      description:
        "Midweek groups across the city and online to pray, learn, and belong.",
      cta: "Find a group",
    },
  ];

  return (
    <section
      id="next"
      className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-10"
    >
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.28em] text-black/50">
          Start here
        </p>
        <h2 className={`${playfair.className} text-3xl text-black sm:text-4xl`}>
          Your next step.
        </h2>
        <p className="text-base text-black/70">
          Three simple ways to feel at home this week.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {steps.map((item) => (
          <Card key={item.title} className="border-black/10">
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription className="text-black/70">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                className="text-black hover:text-black hover:bg-black/5 -ml-2"
                asChild
              >
                <a href="#">
                  {item.cta}{" "}
                  <span aria-hidden className="ml-1">
                    →
                  </span>
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Ministries() {
  const items = [
    { title: "Kids & Families", detail: "Safe, joyful spaces every Sunday." },
    {
      title: "Students",
      detail: "Youth and college nights to shape culture together.",
    },
    {
      title: "Creative House",
      detail: "Worship, production, and storytelling teams.",
    },
    { title: "Prayer & Care", detail: "Weekday prayer rooms and care visits." },
  ];

  return (
    <section
      id="ministries"
      className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-10"
    >
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.28em] text-black/50">
          Ministries
        </p>
        <h2 className={`${playfair.className} text-3xl text-black sm:text-4xl`}>
          Every generation has a seat.
        </h2>
        <p className="text-base text-black/70">
          Discover where you can grow, serve, and belong.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Card key={item.title} className="border-black/10">
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle>
              <CardDescription className="text-black/70">
                {item.detail}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

function EventsSection() {
  const events = [
    {
      title: "Serve Day",
      detail: "City-wide projects, Saturday 9:00 AM",
      href: "#",
    },
    {
      title: "Prayer + Worship",
      detail: "Tuesday 6:30 PM, chapel & online",
      href: "#",
    },
    {
      title: "Foundations Track",
      detail: "Four-week course after second service",
      href: "#",
    },
  ];

  return (
    <section
      id="events"
      className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-10"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-black/50">
            Upcoming
          </p>
          <h2
            className={`${playfair.className} text-3xl text-black sm:text-4xl`}
          >
            Join us this week.
          </h2>
        </div>
        <Button
          variant="ghost"
          className="text-black hover:text-black hover:bg-black/5"
          asChild
        >
          <a href="#">
            View calendar{" "}
            <span aria-hidden className="ml-1">
              ↗
            </span>
          </a>
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {events.map((event) => (
          <Card key={event.title} className="border-black/10">
            <CardHeader>
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription className="text-black/70">
                {event.detail}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                className="text-black hover:text-black hover:bg-black/5 -ml-2"
                asChild
              >
                <a href={event.href}>
                  Details{" "}
                  <span aria-hidden className="ml-1">
                    →
                  </span>
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-black/10 px-4 py-16 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-black/50">
            Stay close
          </p>
          <h2
            className={`${playfair.className} text-3xl text-black sm:text-4xl`}
          >
            Weekly updates and prayer.
          </h2>
          <p className="text-base text-black/70">
            Get service details, ways to serve, and stories of what God is
            doing.
          </p>
        </div>
        <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            className="w-full rounded-lg border border-black/20 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-black focus:outline-none"
            placeholder="Email address"
            type="email"
          />
          <Button
            type="submit"
            className="bg-black text-white hover:bg-black/90 whitespace-nowrap"
          >
            Sign me up
          </Button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-black/10 bg-white px-4 py-12 sm:px-6 lg:px-10 md:flex-row md:items-center md:justify-between">
      <div>
        <p className={`${playfair.className} text-lg font-semibold text-black`}>
          Melchizedek Order of Jesus
        </p>
        <p className="text-sm text-black/70">
          For God. For people. For the city.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-black/70">
        <a className="hover:text-black transition-colors" href="#welcome">
          Gatherings
        </a>
        <a className="hover:text-black transition-colors" href="#next">
          Get involved
        </a>
        <a className="hover:text-black transition-colors" href="#events">
          Events
        </a>
        <a className="hover:text-black transition-colors" href="#next">
          Plan a visit
        </a>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className={`${manrope.className} min-h-screen bg-white text-black`}>
      <Header />
      <main className="space-y-0">
        <Hero />
        <SermonCarousel />
        <NextSteps />
        <Ministries />
        <EventsSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
