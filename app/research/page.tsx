"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Users,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Brain,
  Globe,
  Mic,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Component } from "@/components/ui/grid-background";

const researchPapers = [
  {
    title: "Rivinity-LLM: Scaling Language Models for Indic Languages",
    authors: ["Dr. Priya Sharma", "Arjun Mehta", "Dr. Kavita Rao"],
    date: "February 2026",
    category: "Language Models",
    description:
      "We present Rivinity-LLM, a family of large language models trained on 2 trillion tokens of Indic language data, achieving state-of-the-art performance on 22 Indian languages.",
    citations: 234,
    icon: BookOpen,
  },
  {
    title: "Zero-Shot Voice Cloning with Multi-Speaker Indian Accents",
    authors: ["Vikram Singh", "Dr. Ananya Patel", "Rahul Kumar"],
    date: "January 2026",
    category: "Speech & Audio",
    description:
      "A novel approach to voice synthesis supporting 50+ Indian regional accents with just 3 seconds of reference audio, enabling personalized voice experiences at scale.",
    citations: 156,
    icon: Mic,
  },
  {
    title: "Distributed Inference: Serving 1M+ Concurrent AI Requests",
    authors: ["Dr. Sanjay Gupta", "Neha Krishnan", "Amit Verma"],
    date: "December 2025",
    category: "Infrastructure",
    description:
      "Technical deep-dive into our distributed inference architecture that achieves sub-50ms latency while serving over one million concurrent requests across our global edge network.",
    citations: 189,
    icon: Globe,
  },
  {
    title: "Constitutional AI for Indian Legal and Cultural Context",
    authors: ["Dr. Meera Iyer", "Ravi Shankar", "Pooja Desai"],
    date: "November 2025",
    category: "AI Safety",
    description:
      "Adapting constitutional AI principles for the Indian context, ensuring AI systems respect diverse cultural norms, legal frameworks, and ethical considerations.",
    citations: 312,
    icon: Brain,
  },
];

const researchAreas = [
  {
    title: "Foundation Models",
    description:
      "Building large-scale language and multimodal models optimized for Indian languages and contexts.",
    papers: 24,
    researchers: 18,
  },
  {
    title: "Speech & Audio",
    description:
      "Advancing voice AI technology for diverse Indian accents, dialects, and acoustic environments.",
    papers: 16,
    researchers: 12,
  },
  {
    title: "AI Safety & Alignment",
    description:
      "Ensuring AI systems are safe, beneficial, and aligned with Indian values and legal frameworks.",
    papers: 19,
    researchers: 14,
  },
  {
    title: "Efficient Inference",
    description:
      "Optimizing model serving for low-latency, cost-effective AI deployment at population scale.",
    papers: 21,
    researchers: 15,
  },
];

const teamMembers = [
  {
    name: "Dr. Priya Sharma",
    role: "Chief Research Scientist",
    focus: "NLP & Language Models",
    image: "PS",
  },
  {
    name: "Dr. Sanjay Gupta",
    role: "VP of Infrastructure Research",
    focus: "Distributed Systems",
    image: "SG",
  },
  {
    name: "Dr. Meera Iyer",
    role: "Head of AI Safety",
    focus: "Alignment & Ethics",
    image: "MI",
  },
  {
    name: "Vikram Singh",
    role: "Principal Scientist",
    focus: "Speech & Audio AI",
    image: "VS",
  },
];

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <Component />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent/10 to-highlight/10 border border-accent/20 text-sm font-medium text-foreground mb-8"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              Research & Innovation
            </motion.span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
              Advancing AI for <span className="text-gradient">Bharat</span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mb-10 leading-relaxed">
              Our research team is pioneering the next generation of AI systems
              designed specifically for Indian languages, cultures, and use
              cases.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">80+</div>
                <div className="text-sm text-muted-foreground">
                  Publications
                </div>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Researchers</div>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">22</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">5</div>
                <div className="text-sm text-muted-foreground">
                  Research Labs
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Areas */}
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
              Research Focus Areas
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pushing the boundaries of what&apos;s possible with AI in India
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-card rounded-2xl p-6 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {area.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {area.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-foreground font-medium">
                    {area.papers} Papers
                  </span>
                  <span className="text-muted-foreground">
                    {area.researchers} Researchers
                  </span>
                </div>
                <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Papers */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-16"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Latest Publications
              </h2>
              <p className="text-xl text-muted-foreground">
                Our most impactful research contributions
              </p>
            </div>
            <Button variant="outline" className="hidden sm:flex rounded-full">
              View All Papers <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <div className="space-y-6">
            {researchPapers.map((paper, index) => (
              <motion.article
                key={paper.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/10 to-highlight/10 flex items-center justify-center">
                      <paper.icon className="w-7 h-7 text-accent" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                        {paper.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {paper.date}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <FileText className="w-3 h-3" />
                        {paper.citations} citations
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {paper.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {paper.authors.join(", ")}
                    </div>
                  </div>
                  <ArrowUpRight className="flex-shrink-0 w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Button variant="outline" className="w-full rounded-full">
              View All Papers <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Research Team */}
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
              Research Leadership
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              World-class researchers driving AI innovation in India
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.image}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-accent mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.focus}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <Button size="lg" className="rounded-full">
              Join Our Research Team <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
