"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { motion } from "framer-motion";
import { larken } from "@/lib/fonts";
import {
  ArrowRight,
  Users,
  Calendar,
  Clock,
  Heart,
  BookOpen,
  MessageCircle,
  Target,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: Heart,
    title: "Personalized Spiritual Direction",
    description:
      "Receive one-on-one guidance tailored specifically to your spiritual journey, calling, and season of life.",
  },
  {
    icon: Target,
    title: "Focused Accountability",
    description:
      "Regular check-ins keep you on track with your spiritual goals and help you navigate challenges with wisdom.",
  },
  {
    icon: MessageCircle,
    title: "Confidential Safe Space",
    description:
      "Share your struggles, questions, and victories in a private, judgment-free environment.",
  },
  {
    icon: BookOpen,
    title: "Curated Resources",
    description:
      "Access teachings, books, and materials specifically selected for your growth and development.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Submit Application",
    description:
      "Fill out our mentorship application form sharing your background, goals, and what you're seeking in a mentor.",
  },
  {
    step: "02",
    title: "Mentor Matching",
    description:
      "Our team carefully reviews your application and matches you with a mentor suited to your needs and calling.",
  },
  {
    step: "03",
    title: "Initial Meeting",
    description:
      "Meet your mentor for an introductory session to establish goals, expectations, and meeting schedule.",
  },
  {
    step: "04",
    title: "Begin Journey",
    description:
      "Start your mentorship journey with regular meetings, prayer support, and personalized guidance.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Worship Leader",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    quote:
      "My mentor helped me navigate a difficult season of transition and discover my true calling in ministry. I can't imagine where I'd be without this guidance.",
  },
  {
    name: "David Chen",
    role: "Young Professional",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    quote:
      "The accountability and wisdom I received transformed not just my spiritual life, but every area of my life. This mentorship was a game-changer.",
  },
  {
    name: "Rebecca Martinez",
    role: "Ministry Leader",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    quote:
      "Having someone who truly understands the prophetic walk alongside me has been invaluable. The personalized guidance is exactly what I needed.",
  },
];

const faqs = [
  {
    question: "How long does the mentorship last?",
    answer:
      "Our one-on-one mentorship typically runs for 6-12 months, depending on your needs and goals. Some relationships continue beyond this as ongoing spiritual friendship.",
  },
  {
    question: "How often do we meet?",
    answer:
      "Most mentorship relationships meet bi-weekly or monthly for 60-90 minutes. The exact frequency is determined by you and your mentor based on your needs and schedules.",
  },
  {
    question: "Can I choose my mentor?",
    answer:
      "While we carefully match you with the best mentor for your needs, you can express preferences in your application. If the match isn't working, we can reassess.",
  },
  {
    question: "Is there a cost?",
    answer:
      "We ask for a monthly commitment to help cover administrative costs and materials. Contact us for specific pricing and scholarship opportunities for those with financial need.",
  },
  {
    question: "What if I'm new to faith?",
    answer:
      "Absolutely! We have mentors experienced in discipling new believers. This program is for anyone seeking spiritual growth, regardless of where you are in your journey.",
  },
  {
    question: "Can meetings be virtual?",
    answer:
      "Yes! Many of our mentorship relationships happen via video calls, which allows for flexibility and accessibility. In-person meetings are also available if location permits.",
  },
];

export default function OneOnOneMentorshipPage() {
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
                  <Users className="h-4 w-4" />
                  One-on-One Mentorship
                </div>
              </div>

              <h1
                className={`${larken.className} mb-6 text-5xl font-bold md:text-6xl lg:text-7xl`}
              >
                Personal Guidance for Your Journey
              </h1>

              <p className="mb-8 text-xl leading-relaxed text-black/70 dark:text-white/70">
                Experience transformative spiritual growth through personalized
                mentorship. Walk alongside an experienced guide who will help
                you discover your calling, navigate challenges, and grow deeper
                in your relationship with God.
              </p>

              <div className="mb-8 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="text-lg">6-12 month commitment</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="text-lg">Bi-weekly or monthly meetings</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="text-lg">In-person or virtual options</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="group inline-flex cursor-pointer items-center gap-2 bg-black px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                  Apply Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="inline-flex cursor-pointer items-center gap-2 border border-black px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
                  Download Info Packet
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
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1400&auto=format&fit=crop"
                  alt="One-on-one mentorship meeting"
                  className="h-[500px] w-full object-cover lg:h-[600px]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>

                {/* Floating Stats */}
                <div className="absolute right-8 bottom-8 left-8">
                  <div className="rounded-xl bg-white/95 p-6 backdrop-blur-sm dark:bg-neutral-900/95">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div
                          className={`${larken.className} text-3xl font-bold`}
                        >
                          100+
                        </div>
                        <div className="text-xs text-black/60 dark:text-white/60">
                          Active Mentorships
                        </div>
                      </div>
                      <div>
                        <div
                          className={`${larken.className} text-3xl font-bold`}
                        >
                          6-12
                        </div>
                        <div className="text-xs text-black/60 dark:text-white/60">
                          Months
                        </div>
                      </div>
                      <div>
                        <div
                          className={`${larken.className} text-3xl font-bold`}
                        >
                          1:1
                        </div>
                        <div className="text-xs text-black/60 dark:text-white/60">
                          Format
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
              Our one-on-one mentorship provides personalized support designed
              to help you grow spiritually, emotionally, and in your calling.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
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

      {/* Process Section */}
      <section className="relative overflow-hidden bg-neutral-50 py-24 dark:bg-black">
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
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-black/70 dark:text-white/70">
              Getting started with one-on-one mentorship is simple. Here&apos;s
              what to expect.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div
                    className={`${larken.className} mb-4 text-6xl font-bold text-black/20 dark:text-white/20`}
                  >
                    {step.step}
                  </div>
                  <h3 className={`${larken.className} mb-3 text-xl font-bold`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-black/70 dark:text-white/70">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute top-12 right-0 hidden h-px w-full translate-x-1/2 bg-black/20 lg:block dark:bg-white/20"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              Hear From Our Community
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-black/70 dark:text-white/70">
              Real stories from people whose lives have been transformed through
              mentorship.
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
                className="rounded-2xl border-2 border-black/10 bg-neutral-50 p-8 dark:border-white/10 dark:bg-neutral-800"
              >
                <div className="mb-6 flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-16 w-16 rounded-full object-cover"
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
      <section className="bg-neutral-50 py-24 dark:bg-black">
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
                className="rounded-xl border-2 border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900"
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
            <h2
              className={`${larken.className} mb-6 text-4xl font-bold md:text-5xl`}
            >
              Ready to Begin Your Journey?
            </h2>
            <p className="mb-10 text-xl text-white/90 dark:text-black/90">
              Take the first step towards transformative spiritual growth. Apply
              for one-on-one mentorship today and discover what God has in store
              for you.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="group inline-flex cursor-pointer items-center gap-2 bg-white px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90">
                Apply for Mentorship
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="inline-flex cursor-pointer items-center gap-2 border-2 border-white px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black dark:border-black dark:text-black dark:hover:bg-black dark:hover:text-white">
                Have Questions? Contact Us
              </button>
            </div>

            <p className="mt-8 text-sm text-white/70 dark:text-black/70">
              Applications are reviewed on a rolling basis. Limited spots
              available.
            </p>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
