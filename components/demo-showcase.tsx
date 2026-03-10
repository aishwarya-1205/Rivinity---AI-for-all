"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  MessageSquare,
  Mic,
  Code2,
  Search,
  Play,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const demos = [
  {
    id: "chat",
    label: "Conversational AI",
    icon: MessageSquare,
    title: "Experience Rivinity Chat",
    preview: {
      type: "chat",
      messages: [
        {
          role: "user",
          content: "मुझे भारत के टॉप 5 स्टार्टअप यूनिकॉर्न के बारे में बताओ",
        },
        {
          role: "assistant",
          content:
            "भारत के टॉप 5 स्टार्टअप यूनिकॉर्न हैं:\n\n1. Flipkart — $37.6B valuation\n2. BYJU'S — $22B valuation\n3. Swiggy — $10.7B valuation\n4. Ola Cabs — $7.3B valuation\n5. PhonePe — $12B valuation",
        },
      ],
    },
  },
  {
    id: "voice",
    label: "Voice AI",
    icon: Mic,
    title: "Voice Intelligence",
    preview: {
      type: "voice",
    },
  },
  {
    id: "code",
    label: "Code Generation",
    icon: Code2,
    title: "AI Code Assistant",
    preview: {
      type: "code",
      code: `export async function POST(req: Request) {
  const { prompt } = await req.json()

  const response = await rivinity.chat({
    model: "rivinity-turbo",
    messages: [{ role: "user", content: prompt }]
  })

  return Response.json(response)
}`,
    },
  },
  {
    id: "search",
    label: "AI Search",
    icon: Search,
    title: "Semantic Search",
    preview: {
      type: "search",
      query: "What is our refund policy for enterprise customers?",
      results: [
        { title: "Enterprise Refund Policy", relevance: 98 },
        { title: "Customer Support Guidelines", relevance: 87 },
        { title: "Billing FAQ", relevance: 76 },
      ],
    },
  },
];

export function DemoShowcase() {
  const [activeDemo, setActiveDemo] = useState(demos[0]);

  return (
    <section className="relative py-24 bg-secondary/30 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-32 -translate-x-1/2 w-[700px] h-[400px] bg-accent/20 blur-[140px] opacity-40" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            See it in Action
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Experience Rivinity
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive demos showcasing our AI capabilities
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-2 rounded-full bg-card border border-border shadow-sm">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all",
                  activeDemo.id === demo.id
                    ? "bg-foreground text-background shadow"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <demo.icon className="w-4 h-4" />
                {demo.label}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Window */}
        <motion.div
          key={activeDemo.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-card/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.25)] overflow-hidden"
        >
          {/* gradient overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-highlight/20 opacity-30 pointer-events-none" />

          {/* Window header */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-secondary/40">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            <div className="flex-1 text-center text-sm text-muted-foreground">
              {activeDemo.title}
            </div>

            <button className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent hover:bg-accent/20 transition">
              <Play className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-10 min-h-[420px]">
            {/* CHAT */}
            {activeDemo.preview.type === "chat" && (
              <div className="space-y-6 max-w-2xl mx-auto">
                {activeDemo.preview.messages?.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className={cn(
                      "flex gap-4",
                      msg.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white font-bold">
                        R
                      </div>
                    )}

                    <div
                      className={cn(
                        "max-w-md rounded-2xl px-5 py-4 text-sm",
                        msg.role === "user"
                          ? "bg-foreground text-background"
                          : "bg-secondary",
                      )}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>

                    {msg.role === "user" && (
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold">
                        U
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* VOICE */}
            {activeDemo.preview.type === "voice" && (
              <div className="flex flex-col items-center justify-center h-[320px]">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center shadow-xl"
                >
                  <Mic className="w-10 h-10 text-white" />
                </motion.div>

                <p className="mt-6 text-muted-foreground">
                  Listening in Hindi...
                </p>
              </div>
            )}

            {/* CODE */}
            {activeDemo.preview.type === "code" && (
              <div className="max-w-2xl mx-auto">
                <pre className="bg-foreground text-background rounded-xl p-6 overflow-x-auto">
                  <code className="text-sm font-mono">
                    {activeDemo.preview.code}
                  </code>
                </pre>
              </div>
            )}

            {/* SEARCH */}
            {activeDemo.preview.type === "search" && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    value={activeDemo.preview.query}
                    readOnly
                    className="w-full h-14 pl-12 pr-4 rounded-xl bg-secondary border border-border"
                  />
                </div>

                <div className="space-y-3">
                  {activeDemo.preview.results?.map((result, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary border border-border"
                    >
                      <span className="font-medium">{result.title}</span>
                      <span className="text-sm text-accent">
                        {result.relevance}% match
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
