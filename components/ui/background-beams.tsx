"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const [beams] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
      x1: `${Math.random() * 100}%`,
      x2: `${Math.random() * 100}%`,
    }))
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "200px" })

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <svg
        className="absolute h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 122, 24, 0)" />
            <stop offset="50%" stopColor="rgba(255, 122, 24, 0.5)" />
            <stop offset="100%" stopColor="rgba(255, 122, 24, 0)" />
          </linearGradient>
          <linearGradient id="beam-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(108, 99, 255, 0)" />
            <stop offset="50%" stopColor="rgba(108, 99, 255, 0.5)" />
            <stop offset="100%" stopColor="rgba(108, 99, 255, 0)" />
          </linearGradient>
        </defs>
        {beams.map((beam) => (
          <motion.line
            key={beam.id}
            x1={beam.x1}
            y1="-10%"
            x2={beam.x2}
            y2="110%"
            stroke={beam.id % 2 === 0 ? "url(#beam-gradient)" : "url(#beam-gradient-2)"}
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? {
              pathLength: [0, 1],
              opacity: [0, 0.5, 0],
            } : { opacity: 0 }}
            transition={{
              duration: beam.duration,
              delay: beam.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}
