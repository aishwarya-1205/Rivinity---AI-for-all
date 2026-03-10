"use client"

import { motion } from "framer-motion"

export function IndiaBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF9933]/10 via-white/50 to-[#138808]/10 border border-[#FF9933]/20 dark:from-[#FF9933]/20 dark:via-white/10 dark:to-[#138808]/20"
    >
      <span className="text-sm font-medium text-foreground">
        Proudly Built in
      </span>
      <div className="flex items-center gap-1">
        <div className="w-5 h-3.5 rounded-sm overflow-hidden flex flex-col shadow-sm">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full border border-[#000080]" />
            </div>
          </div>
          <div className="flex-1 bg-[#138808]" />
        </div>
        <span className="text-sm font-semibold text-foreground">India</span>
      </div>
    </motion.div>
  )
}
