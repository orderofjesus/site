"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { motion } from "framer-motion";
import { larken } from "@/lib/fonts";
import Image from "next/image";
import {
  ArrowRight,
  Mountain,
  Calendar,
  Clock,
  MapPin,
  Flame,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Music,
  BookOpen,
  Zap,
} from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: Flame,
    title: "Prophetic Impartation",
    description:
      "Receive powerful impartation from seasoned prophetic ministers and experience fresh fire for your calling.",
  },
  {
    icon: BookOpen,
    title: "Deep Teaching",
    description:
      "Dive into intensive biblical teaching on prophetic ministry, the Elijah mandate, and walking in spiritual authority.",
  },
  {
    icon: Music,
    title: "Corporate Worship",
    description:
      "Experience extended times of worship and soaking in God's presence with a community of hungry believers.",
  },
  {
    icon: Users,
    title: "Community Building",
    description:
      "Connect with like-minded believers, build lasting relationships, and become part of a prophetic network.",
  },
  {
    icon: Zap,
    title: "Prophetic Activation",
    description:
      "Participate in hands-on activation sessions to develop and grow in your prophetic gifting.",
  },
  {
    icon: Sparkles,
    title: "Breakthrough & Deliverance",
    description:
      "Experience personal breakthrough, inner healing, and freedom as you encounter God in new ways.",
  },
];

const retreatSchedule = [
  {
    time: "Morning",
    title: "Teaching & Impartation",
    description:
      "Deep dive into prophetic ministry with experienced teachers and receive impartation for your calling.",
  },
  {
    time: "Midday",
    title: "Worship & Soaking",
    description:
      "Extended worship sessions and time to soak in God's presence, receiving revelation and refreshing.",
  },
  {
    time: "Afternoon",
    title: "Activation & Practice",
    description:
      "Hands-on prophetic activation exercises, group practice sessions, and personal ministry time.",
  },
  {
    time: "Evening",
    title: "Community & Fellowship",
    description:
      "Gather for meals, share testimonies, build relationships, and pray for one another.",
  },
];

const upcomingRetreats = [
  {
    title: "Elijah Rising: Spring Intensive",
    date: "April 18-21, 2024",
    location: "Mountain View Retreat Center, Colorado",
    duration: "4 Days / 3 Nights",
    spots: "35 spots remaining",
    level: "All Levels Welcome",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Summer Prophetic Gathering",
    date: "July 12-18, 2024",
    location: "Lakeside Conference Center, Oregon",
    duration: "7 Days / 6 Nights",
    spots: "Registration Opens Soon",
    level: "Intermediate & Advanced",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop",
  },
];

const testimonials = [
  {
    name: "Marcus Thompson",
    role: "Pastor & Prophet",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    quote:
      "The Elijah Network retreat completely transformed my understanding of prophetic ministry. The impartation I received has changed my entire ministry approach.",
  },
  {
    name: "Jennifer Lee",
    role: "Worship Leader",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    quote:
      "I came seeking activation and left with a burning fire for the prophetic. The community I found here continues to support my journey long after the retreat ended.",
  },
  {
    name: "Daniel Rodriguez",
    role: "Ministry Leader",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    quote:
      "This wasn't just a retreat—it was a life-altering encounter with God. The teaching was profound, and the community was incredible. I can't wait for the next one.",
  },
];

const faqs = [
  {
    question: "What's included in the retreat cost?",
    answer:
      "The retreat fee includes all sessions, materials, meals, and accommodation. Transportation to and from the venue is not included. Scholarships are available for those with financial need.",
  },
  {
    question: "What level of prophetic experience do I need?",
    answer:
      "We welcome all levels! Some retreats are designed for beginners, while others are for intermediate/advanced participants. Check the specific retreat details for level requirements.",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring comfortable clothing for worship and activities, a Bible, journal, any medications you need, and an open heart. Detailed packing lists are sent to registered participants.",
  },
  {
    question: "Can I attend if I'm not part of Melchizedek Order?",
    answer:
      "Absolutely! The Elijah Network is open to anyone hungry for prophetic ministry and spiritual growth, regardless of home church or affiliation.",
  },
  {
    question: "What if I need to cancel?",
    answer:
      "We have a flexible cancellation policy. Full refunds are available up to 30 days before the retreat. Contact us directly for specific circumstances or emergencies.",
  },
  {
    question: "Will there be personal ministry time?",
    answer:
      "Yes! Each retreat includes dedicated time for personal prophetic ministry, prayer, and breakthrough sessions with our ministry team.",
  },
];

export default function ElijahNetworkPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/5"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <div className="mb-4 inline-flex items-center gap-2 bg-black px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">
                  <Mountain className="h-4 w-4" />
                  Elijah Network Retreat
                </div>
              </div>

              <h1
                className={`${larken.className} mb-6 text-5xl font-bold md:text-6xl lg:text-7xl`}
              >
                Intensive Prophetic Training & Community
              </h1>

              <p className="mb-8 text-xl leading-relaxed text-black/70 dark:text-white/70">
                Step into the mantle of Elijah through intensive retreat
                experiences designed to activate, equip, and release you into
                prophetic ministry. Join a community of hungry believers for
                deep impartation and transformation.
              </p>

              <div className="mb-8 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="text-lg">3-7 day immersive experiences</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="text-lg">
                    Multiple retreats throughout the year
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="text-lg">All meals & lodging included</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="group inline-flex cursor-pointer items-center gap-2 bg-black px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                  Register for Next Retreat
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="inline-flex cursor-pointer items-center gap-2 border border-black px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
                  View Schedule
                </button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl lg:h-[600px]">
                <Image
                  src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1400&auto=format&fit=crop"
                  alt="Elijah Network retreat"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>

                {/* Overlay Badge */}
                <div className="absolute top-8 left-8">
                  <div className="bg-white px-6 py-3 text-sm font-bold text-black shadow-lg dark:bg-black dark:text-white">
                    ⛰️ Intensive Retreat Experience
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute right-8 bottom-8 left-8">
                  <div className="rounded-xl bg-white/95 p-6 backdrop-blur-sm dark:bg-neutral-900/95">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div
                          className={`${larken.className} text-3xl font-bold`}
                        >
                          3-7
                        </div>
                        <div className="text-xs text-black/60 dark:text-white/60">
                          Days
                        </div>
                      </div>
                      <div>
                        <div
                          className={`${larken.className} text-3xl font-bold`}
                        >
                          40+
                        </div>
                        <div className="text-xs text-black/60 dark:text-white/60">
                          Attendees
                        </div>
                      </div>
                      <div>
                        <div
                          className={`${larken.className} text-3xl font-bold`}
                        >
                          4x
                        </div>
                        <div className="text-xs text-black/60 dark:text-white/60">
                          Per Year
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-24 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2
              className={`${larken.className} mb-6 text-4xl font-bold md:text-5xl`}
            >
              What You&apos;ll Experience
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-black/70 dark:text-white/70">
              Each Elijah Network retreat is designed to activate, equip, and
              release you into the fullness of your prophetic calling.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl border-2 border-black/10 bg-neutral-50 p-8 transition-all hover:border-black hover:shadow-lg dark:border-white/10 dark:bg-neutral-800 dark:hover:border-white"
              >
                <div className="mb-4 inline-flex rounded-full bg-black/5 p-4 transition-colors group-hover:bg-black group-hover:text-white dark:bg-white/5 dark:group-hover:bg-white dark:group-hover:text-black">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className={`${larken.className} mb-3 text-2xl font-bold`}>
                  {benefit.title}
                </h3>
                <p className="text-black/70 dark:text-white/70">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="relative overflow-hidden bg-neutral-900 py-24 text-white dark:bg-black">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.1) 100%)`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2
              className={`${larken.className} mb-6 text-4xl font-bold md:text-5xl`}
            >
              Daily Retreat Schedule
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/80">
              Each day is thoughtfully designed to create space for encounter,
              learning, activation, and community.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {retreatSchedule.map((schedule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="mb-4">
                  <div className="inline-block bg-white px-4 py-1 text-sm font-bold text-black">
                    {schedule.time}
                  </div>
                </div>
                <h3 className={`${larken.className} mb-3 text-xl font-bold`}>
                  {schedule.title}
                </h3>
                <p className="text-sm text-white/80">{schedule.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Retreats Section */}
      <section className="bg-white py-24 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2
              className={`${larken.className} mb-6 text-4xl font-bold md:text-5xl`}
            >
              Upcoming Retreats
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-black/70 dark:text-white/70">
              Join us for one of our upcoming Elijah Network experiences.
              Register early as spots fill quickly!
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {upcomingRetreats.map((retreat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group overflow-hidden rounded-2xl border-2 border-black/10 bg-neutral-50 transition-all hover:shadow-2xl dark:border-white/10 dark:bg-neutral-800"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={retreat.image}
                    alt={retreat.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="inline-block bg-white px-4 py-2 text-sm font-bold text-black">
                      {retreat.level}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className={`${larken.className} mb-4 text-2xl font-bold`}>
                    {retreat.title}
                  </h3>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span className="text-black/70 dark:text-white/70">
                        {retreat.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span className="text-black/70 dark:text-white/70">
                        {retreat.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="h-4 w-4" />
                      <span className="text-black/70 dark:text-white/70">
                        {retreat.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Users className="h-4 w-4" />
                      <span className="font-semibold">{retreat.spots}</span>
                    </div>
                  </div>

                  <button className="group/btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-none bg-black px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                    Register Now
                    <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="mb-4 text-black/70 dark:text-white/70">
              Want to be notified when new retreats are announced?
            </p>
            <button className="inline-flex cursor-pointer items-center gap-2 border border-black px-8 py-3 text-base font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
              Join the Mailing List
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-neutral-50 py-24 dark:bg-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2
              className={`${larken.className} mb-6 text-4xl font-bold md:text-5xl`}
            >
              Transformation Stories
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-black/70 dark:text-white/70">
              Hear from those who have experienced the power of the Elijah
              Network.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border-2 border-black/10 bg-white p-8 dark:border-white/10 dark:bg-neutral-900"
              >
                <div className="mb-6 flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-black/60 dark:text-white/60">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-black/70 italic dark:text-white/70">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24 dark:bg-neutral-900">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2
              className={`${larken.className} mb-6 text-4xl font-bold md:text-5xl`}
            >
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-xl border-2 border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-800"
              >
                <h3 className={`${larken.className} mb-3 text-xl font-bold`}>
                  {faq.question}
                </h3>
                <p className="text-black/70 dark:text-white/70">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden bg-black px-6 py-24 text-white dark:bg-white dark:text-black">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 bg-white/20 px-6 py-3 text-sm font-bold backdrop-blur-sm dark:bg-black/20">
              <Flame className="h-5 w-5" />
              Step Into Your Prophetic Calling
            </div>

            <h2
              className={`${larken.className} mb-6 text-4xl font-bold md:text-5xl`}
            >
              Ready for an Encounter?
            </h2>
            <p className="mb-10 text-xl text-white/90 dark:text-black/90">
              Don&apos;t miss the next Elijah Network retreat. Join us for
              intensive training, powerful impartation, and life-changing
              community. Register today!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="group inline-flex cursor-pointer items-center gap-2 bg-white px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90">
                Register for Next Retreat
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="inline-flex cursor-pointer items-center gap-2 border-2 border-white px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black dark:border-black dark:text-black dark:hover:bg-black dark:hover:text-white">
                Download Retreat Guide
              </button>
            </div>

            <p className="mt-8 text-sm text-white/80 dark:text-black/80">
              Early bird pricing available. Group discounts for 3 or more
              attendees.
            </p>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
