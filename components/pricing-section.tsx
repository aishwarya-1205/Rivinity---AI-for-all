"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { BentoPricing } from "@/components/ui/bento-pricing"

export function PricingSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-[radial-gradient(35%_80%_at_50%_0%,var(--foreground)/.06,transparent)] absolute inset-0" />
        {/* Dots Pattern */}
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 size-full',
            'bg-[radial-gradient(color-mix(in_oklab,var(--foreground)/.15_30%,transparent)_1px,transparent_1px)]',
            'bg-[size:12px_12px]',
          )}
        />
        {/* Gradient Orbs */}
        <div
          aria-hidden
          className="absolute inset-0 isolate -z-10 opacity-60 contain-strict"
        >
          <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,var(--foreground)/.04_0,hsla(0,0%,55%,.02)_50%,var(--foreground)/.01_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,var(--foreground)/.03_0,var(--foreground)/.01_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,var(--foreground)/.03_0,var(--foreground)/.01_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* Heading */}
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
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-mono uppercase tracking-wider text-muted-foreground border border-border rounded-full bg-secondary/50"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Transparent Pricing
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Scale Intelligence,{" "}
            <span className="text-accent">Not Costs</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            From experimentation to enterprise scale. Choose the plan that matches your ambition and grow without limits.
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
          className="text-center text-sm text-muted-foreground mt-8"
        >
          All plans include access to our global infrastructure, API access, and community support.{" "}
          <a href="#" className="text-accent hover:underline">Compare plans</a>
        </motion.p>
      </div>
    </section>
  )
}
