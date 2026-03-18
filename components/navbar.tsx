"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const navLinks = [
  { href: "/platform", label: "Platform" },
  { href: "/research", label: "Research" },
  { href: "/enterprise", label: "Enterprise" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { scrollY } = useScroll();

  const [activeTab, setActiveTab] = useState(navLinks[0].label);
  const isDark = resolvedTheme === "dark";

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    [
      "rgba(255, 255, 255, 0)",
      isDark ? "rgba(10, 10, 15, 0.9)" : "rgba(255, 255, 255, 0.9)",
    ],
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(16px)"],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 pointer-events-none"
    >
      <div className="mx-auto max-w-7xl relative flex items-center justify-between pointer-events-auto">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <motion.a
            href="/"
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative h-9 w-9">
              <svg viewBox="0 0 32 32" fill="none" className="h-full w-full">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-foreground"
                />
                <circle cx="16" cy="16" r="6" className="fill-accent" />
                <path
                  d="M16 2 L16 8 M16 24 L16 30 M2 16 L8 16 M24 16 L30 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-foreground"
                />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Rivinity
            </span>
          </motion.a>
        </div>

        {/* Center: Glass Nav Pill */}
        <nav className="hidden md:flex relative items-center">
          {/* Glass Pill */}
          <div className="relative flex items-center gap-1 bg-background/60 dark:bg-white/[0.04] backdrop-blur-xl px-2 py-1.5 rounded-full border border-border/40 shadow-lg">
            {navLinks.map((link) => {
              const isActive = activeTab === link.label;
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    // Prevent navigation if these are just internal test links
                    // e.preventDefault(); 
                    setActiveTab(link.label);
                  }}
                  className={`
                    relative px-5 py-2 text-sm font-medium transition-colors rounded-full
                    ${isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"}
                  `}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10">{link.label}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-accent/5 rounded-full z-0"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent rounded-t-full">
                        <div className="absolute w-12 h-6 bg-accent/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-highlight/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-accent/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </motion.a>
              );
            })}
          </div>
        </nav>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            {mounted && (
              <motion.button
                onClick={toggleDarkMode}
                className="relative p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-all duration-200"
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
            <Link href="/signup">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground font-medium px-4 rounded-full"
              >
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-foreground text-background hover:opacity-90 font-semibold px-6 rounded-full shadow-xl shadow-black/10"
              >
                Get Started
              </Button>
            </Link>

          </div>

          {/* Mobile Menu Button & Dark Mode */}
          <div className="md:hidden flex items-center gap-1">
            {mounted && (
              <button
                onClick={toggleDarkMode}
                className="p-2.5 text-foreground rounded-full hover:bg-secondary/80 transition-colors"
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
              className="p-2.5 text-foreground rounded-full hover:bg-secondary/80 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
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
              <Link href="/signup" className="w-full">
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/signup" className="w-full">
                <Button 
                  className="w-full h-12 rounded-xl bg-foreground text-background font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Button>
              </Link>

            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
