"use client"

import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const stats = [
  { value: 10, suffix: "B+", label: "API Requests Daily", description: "Powering India's AI infrastructure" },
  { value: 99.99, suffix: "%", label: "Uptime SLA", description: "Enterprise-grade reliability" },
  { value: 50, prefix: "<", suffix: "ms", label: "Average Latency", description: "Lightning-fast responses" },
  { value: 500, suffix: "+", label: "Indian Cities", description: "Nationwide edge network" },
]

function AnimatedNumber({ value, suffix, prefix }: { value: number; suffix?: string; prefix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 })
  const display = useTransform(spring, (current) => {
    if (value < 100) {
      return current.toFixed(2)
    }
    return Math.round(current)
  })

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      setDisplayValue(Number(latest))
    })
    return unsubscribe
  }, [display])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{value < 100 ? displayValue.toFixed(2) : Math.round(displayValue)}{suffix}
    </span>
  )
}

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2rem] bg-foreground overflow-hidden shadow-2xl"
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-highlight/20 opacity-50" />
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="stats-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="4" cy="4" r="1" fill="currentColor" className="text-background" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#stats-grid)" />
            </svg>
          </div>

          {/* Glowing orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/30 rounded-full blur-[100px] animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-highlight/30 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

          <div className="relative grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-8 sm:p-10 lg:p-12 text-center group"
              >
                {/* Divider */}
                {index !== 0 && (
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-background/20 to-transparent hidden lg:block" />
                )}
                
                <motion.div 
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-background tracking-tight"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </motion.div>
                <div className="mt-3 text-sm sm:text-base font-semibold text-background/90">
                  {stat.label}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-background/60">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
