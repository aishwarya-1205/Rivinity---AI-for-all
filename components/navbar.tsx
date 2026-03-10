"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/platform", label: "Platform" },
  { href: "/research", label: "Research" },
  { href: "/enterprise", label: "Enterprise" },
  { href: "/about", label: "About" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(247, 244, 236, 0)", "rgba(247, 244, 236, 0.9)"]
  )
  
  const darkBackgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(5, 8, 22, 0)", "rgba(5, 8, 22, 0.9)"]
  )

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(16px)"]
  )

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    
    if (savedTheme === "dark" || (!savedTheme && systemDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: isDark ? darkBackgroundColor : backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative h-9 w-9">
              <svg viewBox="0 0 32 32" fill="none" className="h-full w-full">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
                <circle cx="16" cy="16" r="6" className="fill-accent" />
                <path d="M16 2 L16 8 M16 24 L16 30 M2 16 L8 16 M24 16 L30 16" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">Rivinity</span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            {/* Dark Mode Toggle */}
            {mounted && (
              <motion.button
                onClick={toggleDarkMode}
                className="relative p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle dark mode"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isDark ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isDark ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </motion.div>
              </motion.button>
            )}
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-medium px-4">
              Sign in
            </Button>
            <Button 
              size="sm" 
              className="bg-foreground text-background hover:bg-foreground/90 font-semibold px-5 rounded-xl shadow-lg shadow-foreground/10"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button & Dark Mode */}
          <div className="md:hidden flex items-center gap-1">
            {mounted && (
              <button
                onClick={toggleDarkMode}
                className="p-2.5 text-foreground rounded-xl hover:bg-secondary/80 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
            <button
              className="p-2.5 text-foreground rounded-xl hover:bg-secondary/80 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-background/98 backdrop-blur-2xl border-t border-border"
        >
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-base font-medium text-foreground py-3 px-4 rounded-xl hover:bg-secondary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <Button variant="outline" className="w-full h-12 rounded-xl font-medium">Sign in</Button>
              <Button className="w-full h-12 rounded-xl bg-foreground text-background font-semibold">Get Started</Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
