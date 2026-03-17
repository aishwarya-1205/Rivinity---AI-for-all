"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Globe, Shield, Layers, Cpu, Search, Code2 } from "lucide-react";

const features = [
  {
    badge: "Global Infrastructure",
    title: "Planet-Scale Intelligence",
    description:
      "Deploy AI across 200+ edge locations worldwide. Our infrastructure automatically scales to handle billions of requests with consistent sub-100ms latency.",
    icon: Globe,
    visual: "infrastructure",
  },
  {
    badge: "Enterprise Security",
    title: "Zero-Trust AI Security",
    description:
      "SOC2 Type II compliance, end-to-end encryption and granular access control. Your AI infrastructure remains secure at every layer.",
    icon: Shield,
    visual: "security",
  },
  {
    badge: "Seamless Integration",
    title: "Universal API Layer",
    description:
      "Connect any system with our universal API layer. Pre-built integrations, webhooks, streaming APIs and SDKs across all major languages.",
    icon: Layers,
    visual: "integration",
  },
];

function FeatureVisual({ type }: { type: string }) {
  if (type === "infrastructure") {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center"
        >
          <Cpu className="w-10 h-10 text-accent" />
        </motion.div>
      </div>
    );
  }

  if (type === "security") {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-full border-2 border-dashed border-accent/30"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-8 h-8 text-accent" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "integration") {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <div className="bg-secondary/80 rounded-lg border border-border p-4 font-mono text-xs w-full">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-green-400" />
          </div>
          <p>
            <span className="text-accent">const</span> agent =
            <span className="text-highlight"> rivinity.create()</span>
          </p>
          <p>
            <span className="text-accent">await</span> agent.deploy()
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export function FeaturesSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.33, 0.5, 0.66], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.66, 0.8, 1], [0, 1, 1]);

  const textOpacity = [opacity1, opacity2, opacity3];

  return (
    <>
      <section
        ref={containerRef}
        className="relative h-[300vh] hidden lg:block"
      >
        <div className="sticky top-0 h-screen flex items-center">
          <div className="mx-auto max-w-7xl grid grid-cols-2 gap-16 px-6 w-full">
            {/* TEXT SIDE */}
            <div className="relative flex items-center">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  style={{ opacity: textOpacity[index] }}
                  className="absolute"
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-4">
                    <feature.icon className="w-3.5 h-3.5" />
                    {feature.badge}
                  </span>
                  <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
            {/* VISUAL SIDE */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-[420px] aspect-square rounded-3xl border border-border bg-gradient-to-br from-accent/10 to-transparent overflow-hidden">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.visual}
                    style={{ opacity: textOpacity[index] }}
                    className="absolute inset-0"
                  >
                    <FeatureVisual type={feature.visual} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile/Tablet:  */}
      <section className="lg:hidden py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className="w-full aspect-[4/3] rounded-2xl border border-border bg-gradient-to-br from-accent/10 to-transparent overflow-hidden">
                <FeatureVisual type={feature.visual} />
              </div>
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-3">
                  <feature.icon className="w-3.5 h-3.5" />
                  {feature.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
                  {feature.title}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
