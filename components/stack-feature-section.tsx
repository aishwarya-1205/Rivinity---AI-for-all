"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StackCard {
  label: string;
  title: string;
  description: string;
  cta?: string;
  gradient: string;
  textColor?: string;
}

const cards: StackCard[] = [
  {
    label: "For Developers",
    title: "Ship AI features in hours, not weeks.",
    description:
      "Type-safe SDKs, streaming APIs, and one-line model switching. Everything you need to go from prototype to production without fighting infrastructure.",
    cta: "Start Building Free",
    gradient: "from-background to-secondary",
    textColor: "text-foreground",
  },
  {
    label: "For Enterprises",
    title: "AI at scale with zero compromise on security.",
    description:
      "SOC 2 Type II, private deployments, RBAC, and data residency in India. Rivinity is the only platform built for Indian compliance requirements.",
    cta: "Talk to Sales",
    gradient: "from-accent/5 to-accent/15",
    textColor: "text-foreground",
  },
  {
    label: "For Researchers",
    title: "The fastest path from idea to deployed model.",
    description:
      "Fine-tuning studio, experiment tracking, and petabyte-scale vector store. Publish research and productionize it on the same platform.",
    cta: "Explore Research",
    gradient: "from-highlight/5 to-highlight/15",
    textColor: "text-foreground",
  },
];

function StackCard({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: StackCard;
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = start + segmentSize;

  // Each card scales slightly smaller as the next one comes in
  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [1, 1 - (total - index - 1) * 0.04],
  );

  // Cards above get pushed up and shrink when new card stacks
  const y = useTransform(
    scrollYProgress,
    [start, end],
    ["0%", `-${(total - index - 1) * 6}%`],
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, Math.min(end + segmentSize * 0.5, 1)],
    [1, index === total - 1 ? 1 : 0.6],
  );

  return (
    <motion.div style={{ scale, y, opacity }} className="sticky top-32 w-full">
      <div
        className={`
          w-full rounded-3xl border border-border bg-gradient-to-br ${card.gradient}
          p-8 md:p-12 shadow-xl
        `}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
          {/* Left: label + title */}
          <div className="flex-1">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent mb-4">
              {card.label}
            </span>
            <h3
              className={`text-3xl md:text-4xl font-bold leading-tight mb-4 ${card.textColor}`}
            >
              {card.title}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {card.description}
            </p>
          </div>

          {/* Right: CTA */}
          {card.cta && (
            <div className="flex-shrink-0">
              <Button
                size="lg"
                className="h-14 px-8 text-base bg-foreground text-background hover:opacity-90 rounded-full shadow-xl shadow-black/10 group"
              >
                {card.cta}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}
        </div>

        {/* Decorative index pip */}
        <div className="mt-8 flex items-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition duration-300 ${
                i === index ? "w-8 bg-accent" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function StackFeatureSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      style={{ height: `${cards.length * 60}vh` }}
      className="relative"
    >
      {/* Sticky outer wrapper */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl w-full">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Ready to build with{" "}
              <span className="text-gradient">Rivinity?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers building the next generation of AI
              applications.
            </p>
          </div>

          {/* Stacking cards */}
          <div className="relative flex flex-col gap-0">
            {cards.map((card, index) => (
              <StackCard
                key={card.label}
                card={card}
                index={index}
                total={cards.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
