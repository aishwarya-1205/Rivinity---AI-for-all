"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Globe, Shield, Layers } from "lucide-react";
import Image from "next/image";
import { SectionWrapper } from "../ui/section-wrapper";

const features = [
  {
    badge: "Global Infrastructure",
    title: "Planet-Scale Intelligence",
    description:
      "Deploy AI across 200+ edge locations worldwide. Our infrastructure automatically scales to handle billions of requests with consistent sub-100ms latency.",
    icon: Globe,
  },
  {
    badge: "Enterprise Security",
    title: "Zero-Trust AI Security",
    description:
      "SOC2 Type II compliance, end-to-end encryption and granular access control. Your AI infrastructure remains secure at every layer.",
    icon: Shield,
  },
  {
    badge: "Seamless Integration",
    title: "Universal API Layer",
    description:
      "Connect any system with our universal API layer. Pre-built integrations, webhooks, streaming APIs and SDKs across all major languages.",
    icon: Layers,
  },
];

// The three logo layers, stacked exactly on top of one another. Each one
// fades in once (in sync with its corresponding feature's text) and then
// stays visible — never fading out — so they build up into the full logo.
const logos = [
  "/rivinity-logo1.png",
  "/rivinity-logo2.png",
  "/rivinity-logo3.png",
];

function StackedLogos({ logoOpacity }: { logoOpacity: MotionValue<number>[] }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {logos.map((src, index) => (
        <motion.div
          key={src}
          style={{ opacity: logoOpacity[index] }}
          // absolute + inset-0 + same flex centering on every layer
          // guarantees all three sit exactly on top of one another
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={src}
            alt={`Rivinity logo layer ${index + 1}`}
            width={400}
            height={400}
            className="object-contain w-64 h-64 lg:w-80 lg:h-80"
            priority={index === 0}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function FeaturesSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text crossfades per-feature, same as before
  const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.33, 0.5, 0.66], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.66, 0.8, 1], [0, 1, 1]);
  const textOpacity = [opacity1, opacity2, opacity3];
  // Logos appear progressively, exactly in sync with each feature's text.
  // Each logo fades in once (matching the point its feature's text becomes
  // fully visible) and then stays visible — so they stack up: logo 1 alone,
  // then logo 1+2, then logo 1+2+3, never fading back out.
  const logoOpacity1 = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const logoOpacity2 = useTransform(scrollYProgress, [0.33, 0.43], [0, 1]);
  const logoOpacity3 = useTransform(scrollYProgress, [0.66, 0.76], [0, 1]);
  const logoOpacity = [logoOpacity1, logoOpacity2, logoOpacity3];

  return (
    <>
      <section
        ref={containerRef}
        className="relative h-[300vh] hidden lg:block bg-background"
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
                  <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-foreground">
                    {index === 0 && (
                      <>
                        Planet-Scale{" "}
                        <span className="text-gradient">Intelligence</span>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        Zero-Trust AI{" "}
                        <span className="text-gradient">Security</span>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        Universal API{" "}
                        <span className="text-gradient">Layer</span>
                      </>
                    )}
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
            {/* VISUAL SIDE — logos stack on one by one, in sync with the text, no card/box background */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-[420px] aspect-square">
                <StackedLogos logoOpacity={logoOpacity} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile/Tablet: no scroll-linked animation, so just show all 3 logos stacked statically */}
      <SectionWrapper className="lg:hidden" as="div">
        <div className="max-w-2xl mx-auto space-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className="w-full aspect-[4/3] flex items-center justify-center">
                <Image
                  src={logos[index]}
                  alt={`Rivinity logo layer ${index + 1}`}
                  width={400}
                  height={400}
                  className="object-contain w-48 h-48"
                />
              </div>
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-3">
                  <feature.icon className="w-3.5 h-3.5" />
                  {feature.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3 text-foreground">
                  {index === 0 && (
                    <>
                      Planet-Scale{" "}
                      <span className="text-gradient">Intelligence</span>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      Zero-Trust AI{" "}
                      <span className="text-gradient">Security</span>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      Universal API <span className="text-gradient">Layer</span>
                    </>
                  )}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
