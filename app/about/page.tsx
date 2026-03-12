"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Target,
  Heart,
  ArrowRight,
  Linkedin,
  Twitter,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Component } from "@/components/ui/grid-background";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We exist to democratize AI for India and the world. Every decision we make is guided by our mission to make AI accessible to all.",
  },
  {
    icon: Users,
    title: "India First",
    description:
      "Built in India, for India, and the world. We prioritize Indian languages, contexts, and use cases while building globally competitive technology.",
  },
  {
    icon: Heart,
    title: "Responsible AI",
    description:
      "We believe AI should be safe, beneficial, and aligned with human values. We invest heavily in AI safety and ethical development.",
  },
];

const leadership = [
  {
    name: "Arjun Mehta",
    role: "Co-Founder & CEO",
    bio: "Former Google AI researcher. Stanford CS PhD. Building AI for 1.4B Indians.",
    image: "AM",
  },
  {
    name: "Priya Sharma",
    role: "Co-Founder & CTO",
    bio: "Ex-Meta AI. MIT PhD. Expert in large-scale distributed systems.",
    image: "PS",
  },
  {
    name: "Vikram Singh",
    role: "Chief Scientist",
    bio: "Former OpenAI researcher. Pioneer in multilingual LLMs.",
    image: "VS",
  },
  {
    name: "Neha Krishnan",
    role: "VP Engineering",
    bio: "Ex-Amazon. 15 years building cloud infrastructure at scale.",
    image: "NK",
  },
  {
    name: "Rahul Kumar",
    role: "VP Product",
    bio: "Former Stripe. Expert in developer experience and API design.",
    image: "RK",
  },
  {
    name: "Ananya Patel",
    role: "VP Research",
    bio: "Ex-DeepMind. World expert in speech and audio AI.",
    image: "AP",
  },
];

const milestones = [
  {
    year: "2023",
    event: "Founded in Bangalore",
    description: "Started with a vision to build sovereign AI for India",
  },
  {
    year: "2024",
    event: "Series A Funding",
    description: "Raised $50M led by Sequoia India and Accel",
  },
  {
    year: "2024",
    event: "Rivinity-1 Launch",
    description:
      "Released first multilingual LLM supporting 22 Indian languages",
  },
  {
    year: "2025",
    event: "1M+ Developers",
    description: "Crossed 1 million developers on the platform",
  },
  {
    year: "2025",
    event: "Series B Funding",
    description: "Raised $200M at $2B valuation",
  },
  {
    year: "2026",
    event: "Enterprise Launch",
    description: "Deployed across 50+ Fortune 500 companies in India",
  },
];

const offices = [
  { city: "Bangalore", type: "HQ", address: "Koramangala, Bangalore 560034" },
  { city: "Mumbai", type: "Office", address: "BKC, Mumbai 400051" },
  { city: "Delhi NCR", type: "Office", address: "Gurugram, Haryana 122002" },
  {
    city: "Hyderabad",
    type: "Office",
    address: "HITEC City, Hyderabad 500081",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <Component />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent/10 to-highlight/10 border border-accent/20 text-sm font-medium text-foreground mb-8"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              About Rivinity
            </motion.span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
              Building{" "}
              <span className="text-gradient">India&apos;s AI Future</span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We&apos;re on a mission to democratize artificial intelligence for
              1.4 billion Indians and make India a global leader in AI
              innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight">
              &ldquo;We believe AI should work for everyone, in every language,
              in every context. That&apos;s why we&apos;re building Rivinity —
              <span className="text-accent">
                {" "}
                sovereign AI infrastructure for Bharat and beyond.
              </span>
              &rdquo;
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white text-xl font-bold">
                AM
              </div>
              <div className="text-left">
                <div className="font-semibold">Arjun Mehta</div>
                <div className="text-background/60 text-sm">
                  Co-Founder & CEO
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/10 to-highlight/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From a small team in Bangalore to India&apos;s leading AI company
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden lg:block" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year + milestone.event}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div
                    className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}
                  >
                    <div className="bg-card rounded-2xl p-6 border border-border inline-block">
                      <div className="text-accent font-bold text-lg mb-1">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {milestone.event}
                      </h3>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="hidden lg:flex w-4 h-4 rounded-full bg-accent absolute left-1/2 -translate-x-1/2" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              World-class talent building India&apos;s AI future
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {person.image}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {person.name}
                    </h3>
                    <p className="text-sm text-accent mb-2">{person.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {person.bio}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Our Offices
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Headquartered in Bangalore with offices across India
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-foreground">
                    {office.city}
                  </span>
                  {office.type === "HQ" && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent">
                      HQ
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {office.address}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-gradient-to-br from-accent/10 via-highlight/5 to-accent/10 border border-accent/20 p-12 lg:p-16 text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Join us in building India&apos;s AI future
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              We&apos;re hiring exceptional engineers, researchers, and
              operators who want to make AI work for everyone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 text-base bg-foreground text-background hover:bg-foreground/90 rounded-full"
              >
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base rounded-full"
              >
                Our Culture
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
