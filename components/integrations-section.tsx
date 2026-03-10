"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const integrations = [
  { name: "OpenAI", color: "#10A37F" },
  { name: "Anthropic", color: "#D4A574" },
  { name: "AWS", color: "#FF9900" },
  { name: "Azure", color: "#0078D4" },
  { name: "Google", color: "#4285F4" },
  { name: "Slack", color: "#4A154B" },
  { name: "Discord", color: "#5865F2" },
  { name: "GitHub", color: "#181717" },
  { name: "Notion", color: "#000000" },
  { name: "Linear", color: "#5E6AD2" },
  { name: "Vercel", color: "#000000" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Redis", color: "#DC382D" },
  { name: "Stripe", color: "#635BFF" },
  { name: "Twilio", color: "#F22F46" },
  { name: "SendGrid", color: "#1A82E2" },
  { name: "Zapier", color: "#FF4A00" },
]

export function IntegrationsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center rounded-3xl border border-border bg-card/50 p-8 lg:p-12"
        >
          {/* Left Side - Content */}
          <div>
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-highlight/10 border border-accent/20 text-sm font-medium text-foreground mb-6"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              Integrations
            </motion.span>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1]">
              Connect to{" "}
              <span className="text-gradient">everything</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Seamlessly integrate Rivinity with your existing tools and workflows. 
              Connect to 100+ services with our pre-built connectors and universal API.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-12 px-6 bg-foreground text-background hover:bg-foreground/90 rounded-full">
                <Link href="/platform" className="flex items-center gap-2">
                  Browse Integrations
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="h-12 px-6 rounded-full">
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Hexagonal Grid */}
          <div className="relative">
            <div className="grid grid-cols-6 gap-3">
              {integrations.map((integration, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  className="relative aspect-square"
                >
                  <div
                    className="absolute inset-0 bg-card dark:bg-card/80 border border-border shadow-sm flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-accent/30"
                    style={{
                      clipPath:
                        "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: integration.color }}
                    >
                      {integration.name.charAt(0)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-highlight/5 blur-3xl pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
