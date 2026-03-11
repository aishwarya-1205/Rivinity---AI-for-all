"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Twitter, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Rajesh Kumar",
    handle: "@rajeshk_tech",
    role: "CTO at TechMahindra",
    content:
      "Rivinity has transformed how we handle customer support. Response quality improved by 60% while cutting costs. The Hindi language support is exceptional.",
    avatar: "RK",
  },
  {
    name: "Priya Sharma",
    handle: "@priya_codes",
    role: "Founder at AIStartup",
    content:
      "Finally, an AI platform that truly understands Indian context. Built our entire voice AI product on Rivinity in just 2 weeks. Game changer.",
    avatar: "PS",
  },
  {
    name: "Amit Verma",
    handle: "@amitv_dev",
    role: "Lead Engineer at Flipkart",
    content:
      "The API design is beautiful. Type-safe, well-documented, and incredibly fast. Best DX I've experienced with any AI platform.",
    avatar: "AV",
  },
  {
    name: "Sneha Reddy",
    handle: "@sneha_ai",
    role: "ML Engineer at Google",
    content:
      "Impressed by the quality of Rivinity's multilingual models. Outperforms GPT-4 on Telugu and Kannada benchmarks by a significant margin.",
    avatar: "SR",
  },
  {
    name: "Vikram Singh",
    handle: "@vikrams_ml",
    role: "Data Scientist at Reliance",
    content:
      "Deployed Rivinity agents across 500+ retail stores. Real-time inventory predictions with 95% accuracy. The on-premise option sealed the deal.",
    avatar: "VS",
  },
  {
    name: "Ananya Patel",
    handle: "@ananya_builds",
    role: "Product Manager at Swiggy",
    content:
      "Our food recommendation engine powered by Rivinity increased order value by 23%. The regional language understanding is unmatched.",
    avatar: "AP",
  },
  {
    name: "Karthik Menon",
    handle: "@karthik_eng",
    role: "VP Engineering at Razorpay",
    content:
      "Rivinity's fraud detection models caught 40% more suspicious transactions than our previous system. India-specific training data makes all the difference.",
    avatar: "KM",
  },
  {
    name: "Meera Iyer",
    handle: "@meera_ai",
    role: "Research Lead at IIT Bombay",
    content:
      "Collaborating with Rivinity on constitutional AI for Indian legal context. Their commitment to responsible AI development is exemplary.",
    avatar: "MI",
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex-shrink-0 w-[350px] p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white font-bold">
            {testimonial.avatar}
          </div>
          <div>
            <h4 className="font-semibold text-foreground">
              {testimonial.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {testimonial.handle}
            </p>
          </div>
        </div>
        <Twitter className="w-5 h-5 text-[#1DA1F2]" />
      </div>
      <p className="text-foreground/80 leading-relaxed mb-4">
        {testimonial.content}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {testimonial.role}
        </span>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-accent text-accent" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function WallOfLove() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Wall of Love
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here&apos;s what developers and enterprises are saying about
            Rivinity
          </p>
        </motion.div>
      </div>

      {/* Scrolling testimonials - Row 1 */}
      <div className="relative mb-6">
        <div
          ref={containerRef}
          className="flex gap-6 animate-scroll"
          style={
            {
              "--animation-duration": "60s",
              "--animation-direction": "forwards",
            } as React.CSSProperties
          }
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index % testimonials.length}
            />
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>

      {/* Scrolling testimonials - Row 2 (reverse) */}
      <div className="relative">
        <div
          className="flex gap-6 animate-scroll"
          style={
            {
              "--animation-duration": "70s",
              "--animation-direction": "reverse",
            } as React.CSSProperties
          }
        >
          {[
            ...testimonials.slice(4),
            ...testimonials.slice(0, 4),
            ...testimonials.slice(4),
            ...testimonials.slice(0, 4),
          ].map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index % testimonials.length}
            />
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
