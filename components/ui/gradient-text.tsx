"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: string
  animate?: boolean
}

export function GradientText({ 
  children, 
  className, 
  gradient = "from-accent via-highlight to-accent",
  animate = true 
}: GradientTextProps) {
  return (
    <motion.span
      className={cn(
        "inline-block bg-gradient-to-r bg-clip-text text-transparent bg-[length:200%_auto]",
        gradient,
        animate && "animate-shimmer",
        className
      )}
      initial={animate ? { backgroundPosition: "0% center" } : undefined}
      animate={animate ? { backgroundPosition: "200% center" } : undefined}
      transition={animate ? { duration: 3, repeat: Infinity, ease: "linear" } : undefined}
    >
      {children}
    </motion.span>
  )
}
