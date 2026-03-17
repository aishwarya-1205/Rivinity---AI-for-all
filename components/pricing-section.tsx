"use client";

import { motion } from "framer-motion";
import { BentoPricing } from "@/components/ui/bento-pricing";

export function PricingSection() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Background Effects */}
      <div
        className="absolute inset-0 -z-10"
        style={{ transform: "translateZ(0)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(35% 80% at 50% 0%, rgba(10, 10, 10, 0.05), transparent)",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 size-full"
          style={{
            backgroundImage:
              "radial-gradient(rgba(10, 10, 10, 0.05) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-[80px] pointer-events-none"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-[80px] pointer-events-none"
          style={{ background: "var(--highlight)" }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* Heading  */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 md:mb-16 max-w-2xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-mono uppercase tracking-wider rounded-full"
            style={{
              color: "var(--muted-foreground)",
              border: "1px solid var(--border)",
              background:
                "color-mix(in srgb, var(--secondary) 50%, transparent)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--accent)" }}
            />
            Transparent Pricing
          </motion.span>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance"
            style={{ color: "var(--foreground)" }}
          >
            Scale Intelligence,{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--accent) 0%, var(--highlight) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Not Costs
            </span>
          </h2>

          <p
            className="mt-4 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: "var(--muted-foreground)" }}
          >
            From experimentation to enterprise scale. Choose the plan that
            matches your ambition and grow without limits.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <BentoPricing />
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-sm mt-8"
          style={{ color: "var(--muted-foreground)" }}
        >
          All plans include access to our global infrastructure, API access, and
          community support.{" "}
          <a
            href="#"
            className="font-medium transition-colors hover:underline"
            style={{ color: "var(--highlight)" }}
          >
            Compare plans
          </a>
        </motion.p>
      </div>
    </section>
  );
}
