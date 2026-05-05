"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowUpIcon,
  Paperclip,
  Code2,
  Rocket,
  Layers,
  Brain,
  Mic,
  Database,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}: {
  minHeight: number;
  maxHeight?: number;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Infinity),
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight],
  );

  useEffect(() => {
    if (textareaRef.current)
      textareaRef.current.style.height = `${minHeight}px`;
  }, [minHeight]);

  return { textareaRef, adjustHeight };
}

const quickActions = [
  { icon: Code2, label: "Generate Code" },
  { icon: Brain, label: "AI Agents" },
  { icon: Workflow, label: "Build Workflow" },
  { icon: Mic, label: "Voice Assistant" },
  { icon: Database, label: "Data Analysis" },
  { icon: Layers, label: "UI Components" },
  { icon: Rocket, label: "Deploy App" },
  { icon: Sparkles, label: "Research" },
];

export function AIConsole() {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56, // Slightly smaller on mobile
    maxHeight: 160,
  });

  const handleSubmit = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    window.location.href = `/dashboard?q=${encodeURIComponent(trimmed)}`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-0">
      {/* Main Input Container */}
      <motion.div
        className={cn(
          "relative rounded-2xl border transition duration-300",
          "bg-card/60 dark:bg-card/40 backdrop-blur-xl",
          isFocused
            ? "border-accent/50 shadow-2xl shadow-accent/10 dark:shadow-accent/5"
            : "border-border shadow-xl",
        )}
        whileHover={{ scale: 1.002 }}
        transition={{ duration: 0.2 }}
      >
        {/* Glow Effect */}
        <div
          className={cn(
            "absolute -inset-0.5 bg-gradient-to-r from-accent/20 via-highlight/20 to-accent/20 rounded-2xl blur-xl transition-opacity duration-300",
            isFocused ? "opacity-60" : "opacity-0",
          )}
        />

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustHeight();
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Ask Rivinity to build something amazing..."
            className={cn(
              "w-full px-5 py-4 resize-none border-none rounded-t-2xl",
              "bg-transparent text-foreground text-[15px] sm:text-base",
              "focus:outline-none focus:ring-0",
              "placeholder:text-muted-foreground min-h-[56px] sm:min-h-[64px]",
            )}
            style={{ overflow: "hidden" }}
          />

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-4 pb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-9 sm:w-9 text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                <kbd className="px-1.5 py-0.5 bg-secondary rounded border border-border font-mono text-[10px]">
                  ⌘
                </kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 bg-secondary rounded border border-border font-mono text-[10px]">
                  K
                </kbd>
              </div>
            </div>

            <Button
              disabled={!message.trim()}
              onClick={handleSubmit}
              className={cn(
                "h-8 w-8 sm:h-9 sm:w-9 rounded-lg transition",
                message.trim()
                  ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent"
                  : "bg-secondary text-muted-foreground cursor-not-allowed",
              )}
              size="icon"
            >
              <ArrowUpIcon className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions - Scrollable on mobile */}
      <div className="relative mt-5 group">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar sm:flex-wrap sm:justify-center sm:pb-0"
        >
          {quickActions.map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setMessage(action.label)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs transition shrink-0",
                "border border-border bg-card/50 dark:bg-card/30 backdrop-blur-sm",
                "text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-border/80",
              )}
            >
              <action.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-medium">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>
        
        {/* Mobile Gradient indicators for scroll */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none sm:hidden" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none sm:hidden" />
      </div>
    </div>
  );
}
