"use client";

import { hellix, larken } from "@/lib/fonts";
export default function Home() {
  return (
    <div
      className={`${hellix.className} min-h-screen bg-[#f6f7fb] text-zinc-900`}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#eef2ff] via-[#f6f7fb] to-white" />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1a6cf0] to-[#0dbde6] text-white shadow-lg shadow-blue-200/50">
            <span className={`${larken.className} text-xl`}>✶</span>
          </div>
          <div>
            <p
              className={`${larken.className} text-xl leading-tight font-bold`}
            >
              Melchizedek
            </p>
            <p className="text-xs tracking-[0.25em] text-zinc-500 uppercase">
              Order of Jesus
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-zinc-700 md:flex">
          <a className="hover:text-[#0f92ff]" href="#gatherings">
            Sundays
          </a>
          <a className="hover:text-[#0f92ff]" href="#connect">
            Next Steps
          </a>
          <a className="hover:text-[#0f92ff]" href="#ministries">
            Ministries
          </a>
          <a className="hover:text-[#0f92ff]" href="#events">
            Events
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="hidden rounded-full border border-[#0f92ff]/40 px-4 py-2 text-sm font-semibold text-[#0f92ff] transition hover:border-[#0f92ff] hover:bg-[#0f92ff]/10 md:inline-block"
            href="#plan"
          >
            Plan a Visit
          </a>
          <button className="rounded-full bg-[#0f92ff] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200/60 transition hover:-translate-y-[1px] hover:shadow-xl">
            Stream Live
          </button>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-20 md:px-10 lg:gap-20">
        <section
          id="gatherings"
          className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white shadow-2xl shadow-blue-200/30"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-900/75 to-transparent" />
          <div className="relative flex flex-col gap-8 px-8 py-14 md:flex-row md:items-end md:justify-between md:px-12">
            <div className="max-w-xl space-y-6">
              <p className="text-xs tracking-[0.32em] text-[#8fd9ff] uppercase">
                Welcome home
              </p>
              <h1
                className={`${larken.className} text-4xl leading-[1.1] md:text-5xl lg:text-6xl`}
              >
                You belong here. Find Jesus, find family.
              </h1>
              <p className="max-w-lg text-lg text-zinc-200">
                Melchizedek Order of Jesus is a Christ-centered community in the
                heart of the city. Join us this Sunday to worship, connect, and
                step into your next chapter of faith.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  className="rounded-full bg-[#0f92ff] px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-400/40 transition hover:-translate-y-[1px]"
                  href="#plan"
                >
                  Plan your visit
                </a>
                <a
                  className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                  href="#events"
                >
                  See what&apos;s happening
                </a>
              </div>
            </div>
            <div className="w-full max-w-sm rounded-2xl bg-white/10 p-5 backdrop-blur-md md:w-auto">
              <div className="flex items-center justify-between text-sm font-semibold">
                <p>Sunday Gatherings</p>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
                  This week
                </span>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs tracking-[0.2em] text-[#8fd9ff] uppercase">
                    9:00 AM
                  </p>
                  <p className="text-lg font-semibold">City Campus</p>
                  <p className="text-sm text-zinc-200">
                    Teaching, worship, kids check-in opens 8:40
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs tracking-[0.2em] text-[#8fd9ff] uppercase">
                    11:30 AM
                  </p>
                  <p className="text-lg font-semibold">Online + In-Person</p>
                  <p className="text-sm text-zinc-200">
                    Live stream &amp; prayer rooms after service
                  </p>
                </div>
              </div>
              <a
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:-translate-y-[1px]"
                href="#connect"
              >
                I&apos;m new — show me next steps
              </a>
            </div>
          </div>
        </section>

        <section
          id="plan"
          className="grid gap-8 rounded-3xl bg-white p-8 shadow-xl shadow-blue-100/60 md:grid-cols-3 md:p-10"
        >
          <div className="md:col-span-1">
            <p className="text-xs tracking-[0.28em] text-[#0f92ff] uppercase">
              Start here
            </p>
            <h2 className={`${larken.className} mt-3 text-3xl leading-tight`}>
              Know what to do next.
            </h2>
            <p className="mt-3 text-sm text-zinc-600">
              A simple path to feel at home: pick a gathering, meet a pastor,
              and find your people.
            </p>
          </div>
          <div className="grid gap-4 md:col-span-2 md:grid-cols-3">
            {[
              {
                title: "Plan your Sunday",
                body: "Where to park, kids check-in, and a host waiting for you.",
                cta: "Schedule a visit",
              },
              {
                title: "Meet the team",
                body: "Say hello after service or book coffee with a pastor.",
                cta: "Book a coffee",
              },
              {
                title: "Find your group",
                body: "Join a midweek circle near you or online.",
                cta: "See groups",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col justify-between rounded-2xl border border-zinc-100 bg-gradient-to-br from-white to-[#f7fbff] p-4 shadow-sm transition hover:-translate-y-[2px] hover:shadow-md"
              >
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#0f92ff]">
                    {item.title}
                  </p>
                  <p className="text-sm text-zinc-600">{item.body}</p>
                </div>
                <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900">
                  {item.cta} <span aria-hidden>→</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="connect" className="space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs tracking-[0.28em] text-[#0f92ff] uppercase">
                This week
              </p>
              <h2 className={`${larken.className} text-3xl leading-tight`}>
                Move with us.
              </h2>
              <p className="text-sm text-zinc-600">
                Worship, serve, and celebrate together. Here are three ways to
                jump in right now.
              </p>
            </div>
            <a
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-300/40 transition hover:-translate-y-[1px]"
              href="#events"
            >
              Upcoming events <span aria-hidden>↗</span>
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                tag: "Serve",
                title: "Volunteer teams",
                copy: "Greeters, worship, tech, and care teams that make Sundays feel like home.",
                color: "from-[#e6f4ff] via-white to-[#dcefff]",
              },
              {
                tag: "Grow",
                title: "Midweek circles",
                copy: "Small groups across the city studying Scripture and praying together.",
                color: "from-[#fff3e6] via-white to-[#ffe7d1]",
              },
              {
                tag: "Celebrate",
                title: "Baptism Sunday",
                copy: "Share your story. We’ll walk with you, invite family, and celebrate faith.",
                color: "from-[#eafaf1] via-white to-[#d9f5e7]",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`relative overflow-hidden rounded-2xl border border-white bg-gradient-to-br ${card.color} p-6 shadow-lg shadow-zinc-200/50 transition hover:-translate-y-[3px]`}
              >
                <p className="text-xs font-semibold tracking-[0.2em] text-zinc-600 uppercase">
                  {card.tag}
                </p>
                <h3 className={`${larken.className} mt-3 text-2xl`}>
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-700">{card.copy}</p>
                <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900">
                  Learn more <span aria-hidden>→</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section
          id="ministries"
          className="grid gap-6 overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-blue-100/60 lg:grid-cols-2"
        >
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.28em] text-[#0f92ff] uppercase">
              Ministries
            </p>
            <h2 className={`${larken.className} text-3xl leading-tight`}>
              Every generation has a place at the table.
            </h2>
            <p className="text-sm text-zinc-600">
              From kids to creatives, we gather to worship, serve, and build the
              city. Choose where you want to grow.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Kids & Families",
                  detail: "Safe, joyful spaces every Sunday.",
                },
                {
                  title: "Students",
                  detail: "Culture-shaping nights for youth and college.",
                },
                {
                  title: "Creative House",
                  detail: "Worship, production, and storytelling teams.",
                },
                {
                  title: "Prayer & Care",
                  detail: "Weekday prayer rooms and care teams.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-zinc-100 bg-[#f9fbff] px-4 py-5 text-sm shadow-sm"
                >
                  <p className="font-semibold text-neutral-900">{item.title}</p>
                  <p className="mt-1 text-zinc-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f92ff]/80 via-[#0dbde6]/70 to-[#0f92ff]/50 opacity-60 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-8">
                <p className="text-xs tracking-[0.28em] text-[#8fd9ff] uppercase">
                  Worship Night
                </p>
                <h3 className={`${larken.className} mt-2 text-2xl`}>
                  Friday, 7:00 PM
                </h3>
                <p className="mt-2 text-sm text-zinc-200">
                  Live worship, prayer teams, and testimonies from across our
                  campuses.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                    City Campus
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                    Stream online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs tracking-[0.28em] text-[#0f92ff] uppercase">
                Upcoming
              </p>
              <h2 className={`${larken.className} text-3xl leading-tight`}>
                Discover more ways to connect.
              </h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-neutral-900 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:-translate-y-[1px]">
              View full calendar <span aria-hidden>↗</span>
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Serve Day",
                detail: "City-wide projects, Saturday 9:00 AM",
                img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
              },
              {
                title: "Prayer & Worship",
                detail: "Tuesday 6:30 PM, chapel + livestream",
                img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop&sat=-40",
              },
              {
                title: "Foundations Track",
                detail: "4-week course after second service",
                img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop&hue=-20",
              },
            ].map((event) => (
              <div
                key={event.title}
                className="group relative overflow-hidden rounded-2xl bg-neutral-900 text-white shadow-lg shadow-zinc-200/50"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${event.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="relative flex h-64 flex-col justify-end p-6">
                  <p className="text-sm font-semibold">{event.title}</p>
                  <p className="text-sm text-zinc-200">{event.detail}</p>
                  <button className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#8fd9ff]">
                    Details <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-neutral-900 px-8 py-12 text-white shadow-2xl shadow-blue-200/40 md:px-12">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <p className="text-xs tracking-[0.28em] text-[#8fd9ff] uppercase">
                Stay close
              </p>
              <h2 className={`${larken.className} mt-2 text-3xl leading-tight`}>
                Weekly updates, prayer requests, and stories of what God is
                doing.
              </h2>
              <p className="mt-3 text-sm text-zinc-200">
                Join the newsletter so you never miss a gathering or opportunity
                to serve.
              </p>
            </div>
            <form className="flex flex-col gap-3 md:flex-row">
              <input
                className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-300 focus:border-white focus:outline-none"
                placeholder="Email address"
                type="email"
              />
              <button className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:-translate-y-[1px] md:w-auto">
                Sign me up
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-12 flex max-w-6xl flex-col gap-4 px-6 pb-12 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <p
            className={`${larken.className} text-lg font-semibold text-neutral-900`}
          >
            Melchizedek Order of Jesus
          </p>
          <p className="text-sm text-zinc-600">
            A church for the city, for the world.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-zinc-700">
          <a className="hover:text-[#0f92ff]" href="#gatherings">
            Gatherings
          </a>
          <a className="hover:text-[#0f92ff]" href="#connect">
            Get involved
          </a>
          <a className="hover:text-[#0f92ff]" href="#events">
            Events
          </a>
          <a className="hover:text-[#0f92ff]" href="#plan">
            Plan a visit
          </a>
        </div>
      </footer>
    </div>
  );
}
