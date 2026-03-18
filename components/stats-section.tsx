"use client";

import { motion, useInView, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  {
    value: 10,
    suffix: "B+",
    label: "API Requests Daily",
    description: "Powering India's AI infrastructure",
  },
  {
    value: 99.99,
    suffix: "%",
    label: "Uptime SLA",
    description: "Enterprise-grade reliability",
  },
  {
    value: 50,
    prefix: "<",
    suffix: "ms",
    label: "Average Latency",
    description: "Lightning-fast responses",
  },
  {
    value: 500,
    suffix: "+",
    label: "Indian Cities",
    description: "Nationwide edge network",
  },
];

function AnimatedNumber({
  value,
  suffix,
  prefix,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, {
    stiffness: 60,
    damping: 20,
  });

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(latest);
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref}>
      {prefix}
      {value < 100 ? display.toFixed(2) : Math.round(display)}
      {suffix}
    </span>
  );
}

import { SectionWrapper } from "./ui/section-wrapper";

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <SectionWrapper
      ref={ref}
      className="bg-background"
      id="stats"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-gradient-to-br from-foreground to-foreground/90 text-background overflow-hidden shadow-xl relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-highlight/10 pointer-events-none" />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ transform: "translateZ(0)" }}
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative px-8 py-12 text-center">
              {/* divider */}
              {index !== 0 && (
                <div className="hidden lg:block absolute left-0 top-1/4 bottom-1/4 w-px bg-white/10" />
              )}

              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-secondary">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>

              <p className="mt-3 text-sm font-semibold text-background/90 uppercase tracking-wider">
                {stat.label}
              </p>

              <p className="mt-1 text-sm text-background/60 leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
