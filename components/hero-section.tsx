"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { DottedTerrain } from "./dotted-terrain"
import { AIConsole } from "./ai-console"
import { IndiaBadge } from "./india-badge"
import { TextGenerateEffect } from "./ui/text-generate-effect"
import { Spotlight } from "./ui/spotlight"
import { InfiniteMovingCards } from "./ui/infinite-moving-cards"

const trustedLogos = [
  { name: "Reliance" },
  { name: "TATA" },
  { name: "Infosys" },
  { name: "Wipro" },
  { name: "TechMahindra" },
  { name: "HCL" },
  { name: "Bajaj" },
  { name: "Mahindra" },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Spotlight Effects */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(255, 122, 24, 0.15)"
      />
      <Spotlight
        className="-top-40 right-0 md:right-60 md:-top-20"
        fill="rgba(108, 99, 255, 0.1)"
      />

      {/* Background Dotted Terrain */}
      <div className="absolute inset-0 overflow-hidden">
        <DottedTerrain />
      </div>

      {/* Premium Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/50 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24">
        {/* India Badge & Announcement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <IndiaBadge />
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent/10 to-highlight/10 dark:from-accent/20 dark:to-highlight/20 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all duration-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-sm font-medium text-foreground">Introducing Rivinity v2.0</span>
            <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Hero Headline with Text Generate Effect */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TextGenerateEffect
              words="AI for All, from India"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-bold tracking-tight text-foreground leading-[1.05] max-w-5xl mx-auto"
              duration={0.5}
            />
          </motion.div>
          
          {/* Animated Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6"
          >
            <span className="inline-block text-lg sm:text-xl md:text-2xl font-semibold text-gradient">
              Sovereign Intelligence. Population-Scale Impact.
            </span>
          </motion.div>
        </div>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground text-center max-w-2xl mx-auto text-pretty leading-relaxed"
        >
          Built on sovereign compute. Powered by frontier-class models. 
          Delivering population-scale AI impact across Bharat and beyond.
        </motion.p>

        {/* AI Console Interface */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="mt-12 sm:mt-16"
        >
          <AIConsole />
        </motion.div>

        {/* Infinite Moving Logo Cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-20 sm:mt-28 pb-8"
        >
          <p className="text-center text-xs sm:text-sm text-muted-foreground mb-8 uppercase tracking-[0.2em] font-medium">
            India Builds with Rivinity
          </p>
          <InfiniteMovingCards
            items={trustedLogos}
            direction="left"
            speed="slow"
            pauseOnHover={true}
            className="mx-auto"
          />
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
