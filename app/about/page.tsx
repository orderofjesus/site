"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  MapPin,
  Book,
  Globe,
  Sparkles,
  Quote,
  ArrowRight,
  Target,
  Eye,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { larken } from "@/lib/fonts";
import Link from "next/link";

const stats = [
  { number: "25+", label: "Years Serving", sublabel: "Since 1999" },
  { number: "2,500+", label: "Active Members", sublabel: "Growing Family" },
  { number: "50+", label: "Small Groups", sublabel: "Across the City" },
  { number: "15", label: "Mission Partners", sublabel: "Worldwide" },
];

const features = [
  {
    icon: Heart,
    title: "Authentic Worship",
    desc: "Experience genuine, spirit-filled worship that honors God and transforms hearts through contemporary and traditional expressions.",
  },
  {
    icon: Users,
    title: "Strong Community",
    desc: "Build meaningful relationships in small groups and serve together in ministry, fostering deep connections.",
  },
  {
    icon: MapPin,
    title: "Local Impact",
    desc: "Serve our city with compassion, meeting practical needs and sharing the gospel through tangible love.",
  },
  {
    icon: Book,
    title: "Biblical Teaching",
    desc: "Grow in your faith through verse-by-verse expository preaching rooted in Scripture and truth.",
  },
  {
    icon: Globe,
    title: "Global Missions",
    desc: "Partner with missionaries worldwide to spread the gospel to the ends of the earth and unreached peoples.",
  },
  {
    icon: Sparkles,
    title: "Spirit-Led Ministry",
    desc: "Empowered by the Holy Spirit to live out our faith with boldness, grace, and supernatural power.",
  },
];

const coreValues = [
  {
    icon: Book,
    title: "Scripture",
    description: "The Bible is our final authority for faith and practice. We believe God's Word is living, active, and sufficient for all of life.",
  },
  {
    icon: Heart,
    title: "Prayer",
    description: "We depend on God through consistent, fervent prayer. Every ministry flows from a foundation of seeking God's presence.",
  },
  {
    icon: Users,
    title: "Unity",
    description: "We pursue unity in Christ across all barriers. Our diversity strengthens us as we love one another in Jesus' name.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We do all things with excellence for God's glory. Our service reflects the character of the One we serve.",
  },
];

const leadership = [
  {
    name: "Rev. John Mitchell",
    role: "Lead Pastor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "With over 20 years in ministry, Pastor John leads our community with wisdom and compassion. His passion is seeing people encounter Jesus and be transformed by His love.",
  },
  {
    name: "Pastor Sarah Johnson",
    role: "Worship & Arts Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    bio: "Sarah brings excellence and authenticity to our worship ministry. She believes worship is not just music, but a lifestyle of surrender to Christ.",
  },
  {
    name: "Pastor Michael Brown",
    role: "Community Outreach Pastor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    bio: "Michael leads our compassion ministries with a heart for the marginalized. The gospel compels us to serve the least, the lost, and the broken.",
  },
  {
    name: "Pastor Emily Davis",
    role: "Discipleship & Small Groups",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    bio: "Emily oversees our small group ministry and discipleship programs. She is passionate about helping believers grow deep roots in their faith.",
  },
];

const timeline = [
  {
    year: "1999",
    title: "Church Founded",
    description: "Started with 30 believers gathering in a home, united by a vision to reach our city for Christ.",
  },
  {
    year: "2005",
    title: "First Building Acquired",
    description: "Moved into our first worship facility, expanding ministry capacity and community impact.",
  },
  {
    year: "2012",
    title: "Global Missions Launch",
    description: "Sent our first missionary family overseas, beginning a legacy of worldwide gospel partnership.",
  },
  {
    year: "2018",
    title: "Community Center Opens",
    description: "Opened our outreach center serving over 1,000 families monthly through food, counseling, and care.",
  },
  {
    year: "2024",
    title: "Multi-Site Expansion",
    description: "Launching new locations to reach more communities with the message of Jesus.",
  },
];

const testimonials = [
  {
    quote: "This church changed my life. I found not just a place to worship, but a family that truly lives out the love of Christ.",
    author: "Sarah M.",
    role: "Member since 2018",
  },
  {
    quote: "The biblical teaching here has equipped me to grow in my faith and serve God's kingdom with confidence and purpose.",
    author: "David K.",
    role: "Small Group Leader",
  },
  {
    quote: "I've witnessed God's transforming power here. This community welcomed me with open arms and helped me discover my calling.",
    author: "Jennifer L.",
    role: "Volunteer Coordinator",
  },
];

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-xs tracking-[0.4em] uppercase text-black/60 dark:text-white/60">
              About Melchizedek
            </p>
            <h1 className={`${larken.className} mb-6 text-5xl font-bold md:text-7xl`}>
              Know Jesus,
              <br />
              Make Him Known
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-black/70 dark:text-white/70">
              We are a Christ-centered community dedicated to worship, discipleship, and service.
              Our mission is to glorify God by making disciples who love Jesus and transform the world.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="border border-black/10 bg-white p-6 text-center transition-all duration-300 hover:border-black hover:shadow-lg dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white"
              >
                <p className={`${larken.className} mb-2 text-4xl font-bold`}>{stat.number}</p>
                <p className="mb-1 text-sm font-semibold">{stat.label}</p>
                <p className="text-xs text-black/60 dark:text-white/60">{stat.sublabel}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="bg-neutral-50 px-6 py-20 dark:bg-neutral-900 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border-l-4 border-black bg-white p-8 dark:border-white dark:bg-neutral-800"
            >
              <Target className="mb-4 h-8 w-8" />
              <h3 className={`${larken.className} mb-4 text-2xl font-bold`}>Our Mission</h3>
              <p className="leading-relaxed text-black/70 dark:text-white/70">
                To glorify God by making disciples who love Jesus and transform the world through
                authentic worship, biblical teaching, and Spirit-led ministry.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-l-4 border-black bg-white p-8 dark:border-white dark:bg-neutral-800"
            >
              <Eye className="mb-4 h-8 w-8" />
              <h3 className={`${larken.className} mb-4 text-2xl font-bold`}>Our Vision</h3>
              <p className="leading-relaxed text-black/70 dark:text-white/70">
                A city and world where people experience genuine encounters with Christ, growing in
                faith and serving with compassion as agents of transformation.
              </p>
            </motion.div>

            {/* Purpose */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border-l-4 border-black bg-white p-8 dark:border-white dark:bg-neutral-800"
            >
              <Compass className="mb-4 h-8 w-8" />
              <h3 className={`${larken.className} mb-4 text-2xl font-bold`}>Our Purpose</h3>
              <p className="leading-relaxed text-black/70 dark:text-white/70">
                To create a community where people know Jesus deeply and make Him known boldly,
                equipping believers to live out their faith with excellence and grace.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Believe Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className={`${larken.className} mb-6 text-4xl font-bold md:text-5xl`}>
              What We Believe
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-black/70 dark:text-white/70">
              Our faith is anchored in the timeless truths of Scripture and expressed through
              authentic community and passionate service.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group border border-black/10 bg-white p-8 transition-all duration-300 hover:border-black hover:shadow-xl dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white"
              >
                <feature.icon className="mb-4 h-10 w-10 transition-transform group-hover:scale-110" />
                <h3 className={`${larken.className} mb-3 text-xl font-bold`}>{feature.title}</h3>
                <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-neutral-50 px-6 py-20 dark:bg-neutral-900 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className={`${larken.className} mb-6 text-4xl font-bold md:text-5xl`}>
              Our Core Values
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-black/70 dark:text-white/70">
              These principles guide everything we do as a church community, shaping our worship,
              ministry, and mission.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 border-2 border-black bg-white p-8 transition-all duration-300 hover:shadow-xl dark:border-white dark:bg-neutral-800"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center bg-black dark:bg-white">
                    <value.icon className="h-6 w-6 text-white dark:text-black" />
                  </div>
                </div>
                <div>
                  <h3 className={`${larken.className} mb-3 text-2xl font-bold`}>{value.title}</h3>
                  <p className="leading-relaxed text-black/70 dark:text-white/70">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className={`${larken.className} mb-6 text-4xl font-bold md:text-5xl`}>
              Our Leadership
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-black/70 dark:text-white/70">
              Our pastoral team is committed to serving Christ and shepherding our congregation with
              wisdom, compassion, and biblical integrity.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group overflow-hidden border border-black/10 bg-white transition-all duration-300 hover:border-black hover:shadow-xl dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`${larken.className} mb-1 text-2xl font-bold`}>{leader.name}</h3>
                  <p className="mb-4 text-sm font-semibold text-black/60 dark:text-white/60">
                    {leader.role}
                  </p>
                  <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
                    {leader.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-neutral-50 px-6 py-20 dark:bg-neutral-900 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className={`${larken.className} mb-6 text-4xl font-bold md:text-5xl`}>
              Our Story
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-black/70 dark:text-white/70">
              From humble beginnings to a thriving community, God has been faithful through every
              season of our church's journey.
            </p>
          </motion.div>

          <div className="relative space-y-12 border-l-2 border-black/20 pl-12 dark:border-white/20">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[57px] flex h-10 w-10 items-center justify-center border-2 border-black bg-white dark:border-white dark:bg-neutral-900">
                  <div className="h-4 w-4 bg-black dark:bg-white" />
                </div>
                <div className="border border-black/10 bg-white p-8 transition-all duration-300 hover:border-black hover:shadow-lg dark:border-white/10 dark:bg-neutral-800 dark:hover:border-white">
                  <p className={`${larken.className} mb-2 text-4xl font-bold`}>{item.year}</p>
                  <h3 className={`${larken.className} mb-3 text-2xl font-bold`}>{item.title}</h3>
                  <p className="leading-relaxed text-black/70 dark:text-white/70">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className={`${larken.className} mb-6 text-4xl font-bold md:text-5xl`}>
              What People Say
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-black/70 dark:text-white/70">
              Hear from members of our community about how God is working in and through
              Melchizedek.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-l-4 border-black bg-white p-8 dark:border-white dark:bg-neutral-900"
              >
                <Quote className="mb-4 h-6 w-6 text-black/40 dark:text-white/40" />
                <p className="mb-6 leading-relaxed text-black/80 italic dark:text-white/80">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-black/60 dark:text-white/60">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black px-6 py-20 text-white dark:bg-white dark:text-black lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`${larken.className} mb-6 text-4xl font-bold md:text-5xl`}>
              Join Our Community
            </h2>
            <p className="mb-8 text-lg leading-relaxed opacity-80">
              Whether you're exploring faith for the first time or looking for a church home, we'd
              love to welcome you. Come experience authentic worship, biblical teaching, and genuine
              community.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/#connect">
                <Button
                  size="lg"
                  className="group bg-white px-8 py-6 text-base font-semibold text-black hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90"
                >
                  Plan Your Visit
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/events">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent px-8 py-6 text-base font-semibold text-white hover:bg-white hover:text-black dark:border-black dark:text-black dark:hover:bg-black dark:hover:text-white"
                >
                  View Events
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
