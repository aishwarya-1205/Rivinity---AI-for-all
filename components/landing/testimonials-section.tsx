"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "Finally, an AI platform that truly understands multilingual Indian users. We launched our conversational AI product in record time.",
    image: "RK",
    name: "Arjun Dev",
    role: "Founder at NeuralSphere",
  },
  {
    text: "Rivinity’s retrieval and reasoning capabilities significantly improved our enterprise search accuracy and response quality.",
    image: "PS",
    name: "Ira Malhotra",
    role: "AI Product Lead at Quantara Systems",
  },
  {
    text: "The infrastructure is incredibly scalable. We deployed AI agents across multiple workflows without worrying about latency.",
    image: "AV",
    name: "Vivaan Rao",
    role: "VP Engineering at Nexovate Labs",
  },
  {
    text: "The developer experience feels modern and production-ready. Clean APIs, fast inference, and seamless integrations.",
    image: "SR",
    name: "Keshav Nair",
    role: "Lead Engineer at Synexis AI",
  },
  {
    text: "We evaluated several global AI platforms, but Rivinity’s multilingual intelligence for Indian languages stood out immediately.",
    image: "VS",
    name: "Anika Reddy",
    role: "ML Researcher at Veltrix Systems",
  },
  {
    text: "Building our RAG pipeline and knowledge retrieval system became dramatically easier using Rivinity’s AI stack.",
    image: "AP",
    name: "Reyansh Kapoor",
    role: "CTO at AetherMind Technologies",
  },
  {
    text: "Our AI search engine became noticeably smarter after integrating Rivinity’s contextual retrieval architecture.",
    image: "KM",
    name: "Tanvi Mehra",
    role: "Product Architect at Infiniq Labs",
  },
  {
    text: "The autonomous coding agents reduced debugging and development time across our engineering workflows.",
    image: "DS",
    name: "Dhruv Sen",
    role: "Engineering Manager at CodeMatrix AI",
  },
  {
    text: "Rivinity helped us scale globally while still delivering localized AI experiences optimized for Bharat.",
    image: "MK",
    name: "Myra Kulkarni",
    role: "Director of AI Solutions at Omnira Tech",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

import { SectionWrapper } from "../ui/section-wrapper";

export function TestimonialsSection() {
  return (
    <SectionWrapper className="bg-background" id="testimonials">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center max-w-[600px] mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-6 text-foreground text-balance">
          What our <span className="text-gradient">users</span> say
        </h2>
        <p className="text-lg text-muted-foreground text-balance">
          See how organizations across Bharat trust Rivinity to build
          population-scale AI applications.
        </p>
      </motion.div>

      {/* Animated Testimonial Columns */}
      <div className="relative mt-16 h-[600px] xl:h-[700px] overflow-hidden">
        {/* Top Fade Overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />

        <div
          className="flex justify-center gap-6 h-full relative"
          style={{ transform: "translateZ(0)" }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={35}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={28}
          />
        </div>

        {/* Bottom Fade Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
      </div>
    </SectionWrapper>
  );
}
