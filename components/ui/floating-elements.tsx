"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingElementsProps {
  className?: string
  count?: number
}

export function FloatingElements({ className, count = 6 }: FloatingElementsProps) {
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.1 + 0.05,
  }))

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full"
          style={{
            width: el.size,
            height: el.size,
            left: `${el.x}%`,
            top: `${el.y}%`,
            background: el.id % 2 === 0 
              ? "radial-gradient(circle, var(--accent) 0%, transparent 70%)"
              : "radial-gradient(circle, var(--highlight) 0%, transparent 70%)",
            opacity: el.opacity,
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
