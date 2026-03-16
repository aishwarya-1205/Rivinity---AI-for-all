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
    minHeight: 64, // Increased to prevent placeholder cutting on mobile
    maxHeight: 160,
  });

  return (
    <div className="max-w-3xl mx-auto">
      {/* Main Input Container */}
      <motion.div
        className={cn(
          "relative rounded-2xl border transition-all duration-300",
          "bg-card/60 dark:bg-card/40 backdrop-blur-xl",
          isFocused
            ? "border-accent/50 shadow-2xl shadow-accent/10 dark:shadow-accent/5"
            : "border-border shadow-xl",
        )}
        whileHover={{ scale: 1.005 }}
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
          {/* Textarea Input */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustHeight();
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask Rivinity to build something amazing..."
            className={cn(
              "w-full px-5 py-4 resize-none border-none rounded-t-2xl",
              "bg-transparent text-foreground text-base",
              "focus:outline-none focus:ring-0",
              "placeholder:text-muted-foreground min-h-[64px]",
            )}
            style={{ overflow: "hidden" }}
          />

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-4 pb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary"
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
              className={cn(
                "h-9 w-9 rounded-lg transition-all",
                message.trim()
                  ? "bg-accent text-accent-foreground hover:bg-accent/90"
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

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex items-center justify-center flex-wrap gap-2 mt-6"
      >
        {quickActions.map((action) => (
          <motion.button
            key={action.label}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setMessage(action.label)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all",
              "border border-border bg-card/50 dark:bg-card/30 backdrop-blur-sm",
              "text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-border/80",
            )}
          >
            <action.icon className="w-4 h-4" />
            <span className="text-xs font-medium">{action.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
