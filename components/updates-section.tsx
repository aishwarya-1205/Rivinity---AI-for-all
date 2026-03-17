"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const updates = [
  {
    category: "RESEARCH",
    title: "Introducing Rivinity Bharat",
    date: "March 2026",
    gradient: "from-[#FF9933] to-accent",
    description:
      "Our foundational model trained on Indian languages and cultural context",
  },
  {
    category: "PRODUCT",
    title: "Rivinity Voice 2.0",
    date: "February 2026",
    gradient: "from-accent to-highlight",
    description: "22 Indian languages with near-human speech synthesis",
  },
  {
    category: "ANNOUNCEMENT",
    title: "Rivinity Edge Launch",
    date: "January 2026",
    gradient: "from-highlight to-[#138808]",
    description: "Deploy AI at the edge across 500+ Indian cities",
  },
];

export function UpdatesSection() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Research & Updates
          </h2>
        </motion.div>

        <div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          style={{ transform: "translateZ(0)" }}
        >
          {updates.map((update, index) => (
            <motion.a
              href="#"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 flex flex-col">
                <div
                  className={`h-40 bg-gradient-to-br ${update.gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl font-bold text-white/90 tracking-tight">
                      {update.title.split(" ").pop()}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-accent uppercase tracking-wider">
                      {update.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {update.date}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-accent transition-colors">
                    {update.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground text-pretty">
                    {update.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Button variant="outline" className="group mt-8">
            View All Updates
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
