import { Manrope, Playfair_Display } from "next/font/google";
import Image from "next/image";

const manrope = Manrope({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl border border-neutral-200 bg-white text-xl font-semibold text-neutral-900 shadow-sm">
          ✶
        </div>
        <div>
          <p
            className={`${playfair.className} text-xl font-bold leading-tight text-neutral-900`}
          >
            Melchizedek
          </p>
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
            Order of Jesus
          </p>
        </div>
      </div>
      <nav className="hidden items-center gap-6 text-sm font-semibold text-neutral-700 md:flex">
        <a className="hover:text-neutral-900" href="#welcome">
          Welcome
        </a>
        <a className="hover:text-neutral-900" href="#next">
          Next Steps
        </a>
        <a className="hover:text-neutral-900" href="#ministries">
          Ministries
        </a>
        <a className="hover:text-neutral-900" href="#events">
          Events
        </a>
      </nav>
      <div className="flex items-center gap-3">
        <a
          className="hidden rounded-full border border-neutral-900 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:-translate-y-[1px] md:inline-flex"
          href="#next"
        >
          Plan a Visit
        </a>
        <a
          className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-[1px]"
          href="#events"
        >
          Watch Live
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="welcome"
      className="mx-auto grid max-w-6xl gap-10 rounded-3xl border border-neutral-200 bg-white px-4 py-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-10"
    >
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
          Welcome home
        </p>
        <h1
          className={`${playfair.className} text-4xl leading-[1.1] text-neutral-900 sm:text-5xl`}
        >
          A church for the city, a seat for you.
        </h1>
        <p className="text-base leading-relaxed text-neutral-600">
          Every Sunday we gather to worship Jesus, care for one another, and
          scatter back into the city with hope. Come as you are—there is room
          for your story here.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-[1px]"
            href="#next"
          >
            Plan your visit
          </a>
          <a
            className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:-translate-y-[1px]"
            href="#events"
          >
            See gatherings
          </a>
        </div>
      </div>
      <div className="relative h-72 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 sm:h-96">
        <Image
          alt="People gathered in church"
          className="object-cover grayscale"
          fill
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop"
        />
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
      className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl border border-neutral-200 bg-white px-4 py-10 sm:px-6 lg:px-10"
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
          Start here
        </p>
        <h2 className={`${playfair.className} text-3xl text-neutral-900`}>
          Your next step.
        </h2>
        <p className="text-sm text-neutral-600">
          Three simple ways to feel at home this week.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {steps.map((item) => (
          <div
            key={item.title}
            className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
          >
            <div className="space-y-2">
              <p className="text-sm font-semibold text-neutral-900">
                {item.title}
              </p>
              <p className="text-sm text-neutral-600">{item.description}</p>
            </div>
            <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900">
              {item.cta} <span aria-hidden>→</span>
            </button>
          </div>
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
      className="mx-auto grid max-w-6xl gap-6 rounded-3xl border border-neutral-200 bg-white px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-10"
    >
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
          Ministries
        </p>
        <h2 className={`${playfair.className} text-3xl text-neutral-900`}>
          Every generation has a seat.
        </h2>
        <p className="text-sm text-neutral-600">
          Discover where you can grow, serve, and belong.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-5 text-sm shadow-sm"
          >
            <p className="font-semibold text-neutral-900">{item.title}</p>
            <p className="mt-1 text-neutral-600">{item.detail}</p>
          </div>
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
      className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl border border-neutral-200 bg-white px-4 py-10 sm:px-6 lg:px-10"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
            Upcoming
          </p>
          <h2 className={`${playfair.className} text-3xl text-neutral-900`}>
            Join us this week.
          </h2>
        </div>
        <a
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900"
          href="#"
        >
          View calendar <span aria-hidden>↗</span>
        </a>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.title}
            className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
          >
            <div className="space-y-2">
              <p className="text-sm font-semibold text-neutral-900">
                {event.title}
              </p>
              <p className="text-sm text-neutral-600">{event.detail}</p>
            </div>
            <a
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900"
              href={event.href}
            >
              Details <span aria-hidden>→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4 rounded-3xl border border-neutral-200 bg-white px-4 py-10 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
            Stay close
          </p>
          <h2 className={`${playfair.className} text-3xl text-neutral-900`}>
            Weekly updates and prayer.
          </h2>
          <p className="text-sm text-neutral-600">
            Get service details, ways to serve, and stories of what God is
            doing.
          </p>
        </div>
        <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            className="w-full rounded-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-900 focus:outline-none"
            placeholder="Email address"
            type="email"
          />
          <button className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-[1px]">
            Sign me up
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-neutral-200 px-4 py-8 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
      <div>
        <p
          className={`${playfair.className} text-lg font-semibold text-neutral-900`}
        >
          Melchizedek Order of Jesus
        </p>
        <p className="text-sm text-neutral-600">
          For God. For people. For the city.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-neutral-700">
        <a className="hover:text-neutral-900" href="#welcome">
          Gatherings
        </a>
        <a className="hover:text-neutral-900" href="#next">
          Get involved
        </a>
        <a className="hover:text-neutral-900" href="#events">
          Events
        </a>
        <a className="hover:text-neutral-900" href="#next">
          Plan a visit
        </a>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div
      className={`${manrope.className} min-h-screen bg-neutral-100 text-neutral-900`}
    >
      <Header />
      <main className="space-y-12 pb-14">
        <Hero />
        <NextSteps />
        <Ministries />
        <EventsSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
