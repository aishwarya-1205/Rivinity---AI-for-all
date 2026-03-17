"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Globe } from "@/components/ui/globe";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-[900px] flex items-center overflow-hidden bg-background"
    >
      {/* Background Beams */}
      <BackgroundBeams className="opacity-40" />

      {/* Gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--background) 40%, transparent), var(--background))",
        }}
      />

      {/* Globe Background */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="relative w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] lg:w-[1100px] lg:h-[1100px] opacity-50 dark:opacity-60 top-52 sm:top-28 lg:top-2">
          <Globe
            className="absolute inset-0"
            config={{
              width: 1100,
              height: 1100,
              onRender: () => {},
              devicePixelRatio: 2,
              phi: 0,
              theta: 0.3,
              dark: 0,
              diffuse: 2,
              mapSamples: 8000,
              mapBrightness: 10,
              baseColor: [0.8, 0.75, 0.7],
              markerColor: [255 / 255, 122 / 255, 24 / 255],
              glowColor: [0.9, 0.85, 0.8],
              markers: [
                { location: [19.076, 72.8777], size: 0.14 },
                { location: [28.6139, 77.209], size: 0.14 },
                { location: [12.9716, 77.5946], size: 0.12 },
                { location: [13.0827, 80.2707], size: 0.1 },
                { location: [22.5726, 88.3639], size: 0.1 },
                { location: [17.385, 78.4867], size: 0.1 },
                { location: [23.0225, 72.5714], size: 0.08 },
                { location: [18.5204, 73.8567], size: 0.08 },

                { location: [40.7128, -74.006], size: 0.06 },
                { location: [51.5074, -0.1278], size: 0.05 },
                { location: [1.3521, 103.8198], size: 0.05 },
                { location: [35.6762, 139.6503], size: 0.05 },
              ],
            }}
          />
        </div>
      </div>

      {/* Radial fade overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,transparent_20%,var(--background)_75%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-8 flex flex-col items-center text-center pt-10">
        {/* Header content with Badge */}
        <div className="flex flex-col items-center mb-16 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent/10 to-highlight/10 border border-accent/30 text-sm font-medium text-accent backdrop-blur-md shadow-md mb-28 -mt-60"
          >
            <Sparkles className="w-4 h-4" />
            Start building today
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-7xl font-bold text-foreground tracking-tight mb-8 leading-[1.1] text-balance">
              Build the future of{" "}
              <span className="text-gradient">India's AI</span> with Rivinity
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Join the movement to democratize AI across Bharat. From startups
              in Bangalore to enterprises in Mumbai, build sovereign AI
              applications at scale.
            </p>
          </motion.div>
        </div>

        {/* Buttons BELOW globe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-20"
        >
          {/* Primary Button */}
          <div className="transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_40px_rgba(255,122,24,0.35)] rounded-2xl">
            <MovingBorderButton
              borderRadius="1rem"
              className="bg-background dark:bg-card text-foreground px-10 py-4 font-semibold text-base"
              containerClassName="h-14"
              duration={3000}
            >
              <span className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </span>
            </MovingBorderButton>
          </div>

          {/* Secondary Button */}
          <button className="h-14 px-10 text-base font-semibold border-2 border-border rounded-2xl bg-background/50 backdrop-blur-sm hover:bg-secondary/50 hover:border-foreground/20 transition-all duration-300 hover:scale-105">
            Contact Sales
          </button>
        </motion.div>

        {/* Trust text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-sm text-muted-foreground text-center"
        >
          No credit card required • Free tier includes 100K API calls/month
        </motion.p>
      </div>
    </section>
  );
}
