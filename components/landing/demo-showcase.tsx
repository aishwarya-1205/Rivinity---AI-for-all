"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, memo, useRef, useEffect } from "react";
import { VoiceDemo } from "./VoiceDemo";
import { ChatDemo } from "./ChatDemo";
import { CodeDemo } from "./CodeDemo";
import {
  MessageSquare,
  Mic,
  Code2,
  Search,
  Play,
  Globe,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "../ui/section-wrapper";

const demos = [
  {
    id: "chat",
    label: "Conversational AI",
    icon: MessageSquare,
    title: "Rivinity Chat Workspace",
  },
  {
    id: "voice",
    label: "Voice AI",
    icon: Mic,
    title: "Voice Intelligence",
  },
  {
    id: "code",
    label: "Code Generation",
    icon: Code2,
    title: "AI Code Assistant",
  },
  {
    id: "search",
    label: "AI Search",
    icon: Search,
    title: "Semantic Search",
  },
];

export function DemoShowcase() {
  const [activeDemo, setActiveDemo] = useState(demos[0]);
  const [demoState, setDemoState] = useState(0);

  const restart = () => setDemoState((p) => p + 1);

  return (
    <SectionWrapper className="bg-background" id="experience">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
          Experience <span className="text-gradient">Rivinity</span>
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore interactive demos that simulate real Rivinity workflows.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8 sm:mb-12">
        <div className="w-full max-w-5xl flex flex-wrap justify-between gap-2 p-2 rounded-xl bg-card border border-border">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => {
                setActiveDemo(demo);
                restart();
              }}
              className={cn(
                "flex items-center justify-center gap-2 px-2 sm:px-4 py-2 rounded-lg text-[11px] sm:text-sm font-medium transition text-center",
                activeDemo.id === demo.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
            >
              <demo.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {demo.label}
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className="h-[360px] sm:h-[460px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeDemo.id}-${demoState}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            {activeDemo.id === "chat" && <ChatDemo />}
            {activeDemo.id === "voice" && <VoiceDemo />}
            {activeDemo.id === "code" && <CodeDemo />}
            {activeDemo.id === "search" && <SearchDemo />}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}

const SearchDemo = memo(function SearchDemo() {
  const [phase, setPhase] = useState<
    "idle" | "typing" | "searching" | "sources" | "streaming" | "done"
  >("idle");
  const [queryChars, setQueryChars] = useState(0);
  const [answerChars, setAnswerChars] = useState(0);

  const FULL_QUERY = "What are AI agents and how do they work?";
  const FULL_ANSWER =
    "AI agents are autonomous systems designed to perceive their environment, reason about goals, and take actions to achieve them. They represent a shift from reactive tools to proactive collaborators.";

  const suggestedQuestions = [
    "How do I build my first AI agent?",
    "What's the difference between an agent and an LLM?",
    "Can agents work together in a swarm?",
    "What are the best frameworks for AI agents?",
  ];

  const sources = [
    { name: "rivinity.ai", icon: "R" },
    { name: "github.com", icon: "G" },
    { name: "arxiv.org", icon: "A" },
  ];

  const rafRef = useRef<number>(0);

  useEffect(() => {
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;

      // Timing Config
      const T_TYPING_START = 500;
      const T_TYPING_END = T_TYPING_START + FULL_QUERY.length * 40;
      const T_SEARCHING = T_TYPING_END + 400;
      const T_SOURCES = T_SEARCHING + 1200;
      const T_STREAMING_START = T_SOURCES + 400;
      const T_STREAMING_END = T_STREAMING_START + FULL_ANSWER.length * 15;
      const T_DONE = T_STREAMING_END + 400;

      if (elapsed < T_TYPING_START) {
        setPhase("idle");
      } else if (elapsed < T_TYPING_END) {
        setPhase("typing");
        setQueryChars(Math.floor((elapsed - T_TYPING_START) / 40));
      } else if (elapsed < T_SEARCHING) {
        setQueryChars(FULL_QUERY.length);
        setPhase("typing");
      } else if (elapsed < T_SOURCES) {
        setPhase("searching");
      } else if (elapsed < T_STREAMING_START) {
        setPhase("sources");
      } else if (elapsed < T_STREAMING_END) {
        setPhase("streaming");
        setAnswerChars(Math.floor((elapsed - T_STREAMING_START) / 15));
      } else {
        setAnswerChars(FULL_ANSWER.length);
        setPhase("done");
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="flex flex-col h-full bg-card/50 rounded-2xl border border-border/50 overflow-hidden">
      {/* Search Bar */}
      <div className="p-4 border-b border-border/50 flex items-center gap-3 bg-muted/30">
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border shadow-sm">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-foreground font-medium">
            {FULL_QUERY.slice(0, queryChars)}
            {phase === "typing" && (
              <span className="inline-block w-0.5 h-3.5 bg-accent animate-pulse ml-0.5" />
            )}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
        {phase === "searching" && (
          <div className="flex flex-col items-center justify-center h-full space-y-4 animate-in fade-in duration-500">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-accent/40 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Searching the web...
            </span>
          </div>
        )}

        {(phase === "sources" || phase === "streaming" || phase === "done") && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Sources Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                <Globe className="w-3 h-3" />
                Sources
              </div>
              <div className="flex flex-wrap gap-2">
                {sources.map((source, i) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                    className="flex items-center gap-2 px-2.5 py-1.5 bg-background border border-border rounded-full hover:bg-secondary transition cursor-pointer shadow-sm"
                  >
                    <div className="w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent border border-accent/20">
                      {source.icon}
                    </div>
                    <span className="text-[11px] font-medium">
                      {source.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Answer Section */}
            <div className="space-y-4">
              <div className="text-sm sm:text-base leading-relaxed text-foreground/90 font-medium">
                {FULL_ANSWER.slice(0, answerChars)}
                {phase === "streaming" && (
                  <span className="inline-block w-0.5 h-4 bg-accent animate-pulse ml-0.5" />
                )}
                {phase === "done" && (
                  <span className="inline-flex items-center justify-center w-4 h-4 ml-1 rounded-full bg-accent/10 text-[9px] font-bold text-accent border border-accent/20 cursor-help animate-in zoom-in duration-300">
                    1
                  </span>
                )}
              </div>

              {phase === "done" && (
                <div className="space-y-2 animate-in fade-in duration-700">
                  <div className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-accent font-bold mt-1">→</span>
                    <span>
                      <strong>Task Decomposition:</strong> Agents break down
                      complex goals into manageable steps using iterative
                      reasoning.
                      <span className="inline-flex items-center justify-center w-4 h-4 ml-1 rounded-full bg-accent/10 text-[9px] font-bold text-accent border border-accent/20 cursor-help">
                        2
                      </span>
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-accent font-bold mt-1">→</span>
                    <span>
                      <strong>Tool Usage:</strong> They can interact with
                      external APIs, databases, and web browsers to fetch
                      real-time data.
                      <span className="inline-flex items-center justify-center w-4 h-4 ml-1 rounded-full bg-accent/10 text-[9px] font-bold text-accent border border-accent/20 cursor-help">
                        3
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground italic border-l-2 border-accent/30 pl-3 mt-4">
                    "The future of software is not just tools we use, but
                    partners that act on our behalf."
                  </p>
                </div>
              )}
            </div>

            {/* Suggested Questions */}
            {phase === "done" && (
              <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="text-[11px] font-semibold text-foreground/50 uppercase tracking-widest">
                  Suggested questions
                </div>
                <div className="space-y-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      className="flex items-center justify-between w-full p-2.5 text-xs text-left border border-border rounded-xl hover:bg-secondary hover:border-accent/30 transition group"
                    >
                      <span className="text-muted-foreground group-hover:text-foreground transition">
                        {q}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-accent transition" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {phase === "done" && (
        <div className="p-3 border-t border-border/50 bg-muted/30 flex items-center justify-between animate-in fade-in duration-500">
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-background rounded-md transition">
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-background rounded-md transition">
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-background rounded-md transition ml-1">
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-background rounded-md transition">
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <button className="flex items-center gap-1.5 text-[10px] font-bold text-accent hover:underline px-2 py-1">
            <MoreHorizontal className="w-3.5 h-3.5" />
            More Details
          </button>
        </div>
      )}
    </div>
  );
});
