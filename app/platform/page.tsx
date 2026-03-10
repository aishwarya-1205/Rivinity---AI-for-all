"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { 
  Brain, 
  Cpu, 
  Globe, 
  Layers, 
  Shield, 
  Zap,
  Code2,
  Database,
  Cloud,
  Lock,
  Sparkles,
  ArrowRight,
  Check
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const platformFeatures = [
  {
    icon: Brain,
    title: "Autonomous Agents",
    description: "Deploy self-improving AI agents that reason, plan, and execute complex multi-step tasks with minimal human oversight.",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: Cpu,
    title: "Inference Engine",
    description: "Optimized inference infrastructure delivering sub-100ms latency at scale with intelligent model routing and caching.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description: "500+ edge locations across India and worldwide ensuring low-latency AI inference wherever your users are.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II compliant with end-to-end encryption, RBAC, and comprehensive audit logging.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Database,
    title: "Vector Store",
    description: "Petabyte-scale vector database with hybrid search, real-time indexing, and automatic embedding optimization.",
    gradient: "from-rose-500 to-red-500",
  },
  {
    icon: Code2,
    title: "SDK & APIs",
    description: "Type-safe SDKs for Python, JavaScript, Go, and Rust with comprehensive REST and streaming APIs.",
    gradient: "from-indigo-500 to-violet-500",
  },
]

const capabilities = [
  {
    title: "Model Hub",
    items: ["100+ Foundation Models", "Fine-tuning Studio", "Model Versioning", "A/B Testing"],
  },
  {
    title: "Data Platform",
    items: ["ETL Pipelines", "Data Labeling", "Synthetic Data", "Privacy Controls"],
  },
  {
    title: "Observability",
    items: ["Real-time Monitoring", "Cost Analytics", "Performance Tracing", "Alerting"],
  },
  {
    title: "Governance",
    items: ["Access Controls", "Compliance Tools", "Audit Logs", "Data Residency"],
  },
]

function FeatureCard({ feature, index }: { feature: typeof platformFeatures[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10">
        {/* Gradient background on hover */}
        <div className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-5 bg-gradient-to-br",
          feature.gradient
        )} />
        
        {/* Icon */}
        <div className={cn(
          "mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br",
          feature.gradient
        )}>
          <feature.icon className="h-7 w-7 text-white" />
        </div>
        
        {/* Content */}
        <h3 className="mb-3 text-xl font-semibold text-foreground">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
        
        {/* Learn more link */}
        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
          Learn more <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  )
}

export default function PlatformPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-accent/20 via-highlight/10 to-transparent blur-3xl opacity-30" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent/10 to-highlight/10 border border-accent/20 text-sm font-medium text-foreground mb-8"
            >
              <Layers className="w-4 h-4 text-accent" />
              Platform Overview
            </motion.span>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
              The Complete{" "}
              <span className="text-gradient">AI Stack</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Everything you need to build, deploy, and scale intelligent applications. 
              From model inference to vector search, all in one unified platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-base bg-foreground text-background hover:bg-foreground/90 rounded-full">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full">
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Platform Features Grid */}
      <section ref={containerRef} className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Core Platform Components
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built from the ground up for enterprise-grade AI workloads
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Capabilities Section */}
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Full-Stack Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every tool you need to manage the complete AI lifecycle
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">{cap.title}</h3>
                <ul className="space-y-3">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-muted-foreground">
                      <Check className="h-4 w-4 text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Architecture Diagram Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent mb-6">
                <Cloud className="w-4 h-4" />
                Architecture
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Built for Scale
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Our distributed architecture automatically scales from zero to millions of requests, 
                with intelligent load balancing and failover across global regions.
              </p>
              <ul className="space-y-4">
                {[
                  "Auto-scaling from 0 to 1M+ requests/sec",
                  "Multi-region deployment with automatic failover",
                  "99.99% SLA with enterprise support",
                  "Real-time observability and debugging"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-accent" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Architecture visualization */}
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary via-card to-secondary border border-border p-8 relative overflow-hidden">
                {/* Animated nodes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Center node */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center shadow-2xl shadow-accent/30 z-10">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    
                    {/* Orbital rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-border/50 animate-[spin_20s_linear_infinite]">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-border/30 animate-[spin_30s_linear_infinite_reverse]">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-highlight" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-border/20 animate-[spin_40s_linear_infinite]">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent/50" />
                    </div>
                    
                    {/* Corner icons */}
                    <div className="absolute top-8 left-8 w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
                      <Database className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="absolute top-8 right-8 w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
                      <Globe className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="absolute bottom-8 left-8 w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="absolute bottom-8 right-8 w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
                      <Zap className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Ready to build with Rivinity?
            </h2>
            <p className="text-xl text-background/70 max-w-2xl mx-auto mb-10">
              Join thousands of developers building the next generation of AI applications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-base bg-background text-foreground hover:bg-background/90 rounded-full">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-background/30 text-background hover:bg-background/10">
                Talk to Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
