"use client";

import { memo, useState, useEffect, useRef, useCallback } from "react";
import { Paperclip, ArrowUp, Sparkles, RotateCcw } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   CONSTANTS — defined outside component, never re-created
───────────────────────────────────────────────────────── */
const PROMPT =
  "How do modern AI models understand and generate human-like responses?";

const RESPONSE_LINES = [
  "Modern AI systems use Large Language Models (LLMs) trained on massive amounts of text, code, and structured knowledge.",
  "",
  "→  Transformer architectures help AI understand context, relationships, and intent within conversations",
  "→  Tokenization and embeddings convert human language into machine-readable representations",
  "→  Neural networks analyze billions of parameters to predict and generate meaningful responses",
  "→  Retrieval-Augmented Generation (RAG) enables AI to access external knowledge in real time",
  "→  Fine-tuning and reinforcement learning improve domain-specific accuracy and conversational quality",
  "→  Multimodal AI can process text, images, audio, and documents within a unified intelligence system",
  "",
  "These technologies power next-generation AI applications across research, automation, coding, enterprise systems, and intelligent search.",
  "",
  "Would you like to explore model architectures, AI agents, or real-time inference systems?",
];

const RESPONSE_TEXT = RESPONSE_LINES.join("\n");

// Timing constants (ms)
const PROMPT_CHAR_DELAY = 32; // ms per char while typing prompt
const PROMPT_DONE_PAUSE = 600; // pause after prompt fully typed
const THINKING_DURATION = 900; // how long "…" shows
const RESPONSE_CHAR_DELAY = 16; // ms per char while streaming response
const DONE_PAUSE = 2800; // how long to show completed state before replay
const INITIAL_DELAY = 500; // delay before demo starts

/* ─────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────── */
type Phase =
  | "idle"
  | "typing-prompt"
  | "sent"
  | "thinking"
  | "streaming"
  | "done";

/* ─────────────────────────────────────────────────────────
   BLINKING CURSOR
───────────────────────────────────────────────────────── */
function Cursor() {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 2,
        height: "1em",
        verticalAlign: "text-bottom",
        background: "var(--accent)",
        borderRadius: 1,
        marginLeft: 1,
        animation: "rivCursor .85s step-end infinite",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────
   THINKING DOTS
───────────────────────────────────────────────────────── */
function ThinkingDots() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "var(--muted-foreground)",
            opacity: 0.5,
            animation: "rivDot 1s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   CHAT DEMO
───────────────────────────────────────────────────────── */
export const ChatDemo = memo(function ChatDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [promptChars, setPromptChars] = useState(0); // how many prompt chars visible
  const [respChars, setRespChars] = useState(0); // how many response chars visible

  // Single RAF-based ticker ref — avoids setTimeout pile-up
  const rafRef = useRef<number>(0);
  const stateRef = useRef({
    phase: "idle" as Phase,
    promptChars: 0,
    respChars: 0,
  });

  // Keep stateRef in sync
  stateRef.current = { phase, promptChars, respChars };

  /* ── Core animation loop ─────────────────────────────── */
  const runDemo = useCallback(() => {
    // Cancel any in-flight animation
    cancelAnimationFrame(rafRef.current);

    // Reset
    setPhase("idle");
    setPromptChars(0);
    setRespChars(0);

    let startTime: number | null = null;

    /*
      Timeline (all relative to `startTime`):
        0                        → idle (brief)
        INITIAL_DELAY            → start typing prompt
        INITIAL_DELAY + PROMPT_CHARS * PROMPT_CHAR_DELAY  → prompt fully typed
        ^ + PROMPT_DONE_PAUSE    → "sent" phase (bubble appears)
        ^ + 50ms                 → "thinking" phase (dots)
        ^ + THINKING_DURATION    → "streaming" phase
        ^ + RESP_CHARS * RESP_CHAR_DELAY → "done"
        ^ + DONE_PAUSE           → restart
    */
    const T_PROMPT_START = INITIAL_DELAY;
    const T_PROMPT_END = T_PROMPT_START + PROMPT.length * PROMPT_CHAR_DELAY;
    const T_SENT = T_PROMPT_END + PROMPT_DONE_PAUSE;
    const T_THINKING = T_SENT + 50;
    const T_STREAM_START = T_THINKING + THINKING_DURATION;
    const T_STREAM_END =
      T_STREAM_START + RESPONSE_TEXT.length * RESPONSE_CHAR_DELAY;
    const T_DONE = T_STREAM_END + 50;
    const T_RESTART = T_DONE + DONE_PAUSE;

    function tick(ts: number) {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;

      if (elapsed < T_PROMPT_START) {
        // idle — do nothing, just wait
      } else if (elapsed < T_PROMPT_END) {
        const chars = Math.floor(
          (elapsed - T_PROMPT_START) / PROMPT_CHAR_DELAY,
        );
        if (stateRef.current.phase !== "typing-prompt")
          setPhase("typing-prompt");
        if (stateRef.current.promptChars !== chars) setPromptChars(chars);
      } else if (elapsed < T_SENT) {
        if (stateRef.current.promptChars !== PROMPT.length)
          setPromptChars(PROMPT.length);
        if (stateRef.current.phase !== "typing-prompt")
          setPhase("typing-prompt");
      } else if (elapsed < T_THINKING) {
        if (stateRef.current.phase !== "sent") setPhase("sent");
      } else if (elapsed < T_STREAM_START) {
        if (stateRef.current.phase !== "thinking") setPhase("thinking");
      } else if (elapsed < T_STREAM_END) {
        const chars = Math.floor(
          (elapsed - T_STREAM_START) / RESPONSE_CHAR_DELAY,
        );
        if (stateRef.current.phase !== "streaming") setPhase("streaming");
        if (stateRef.current.respChars !== chars) setRespChars(chars);
      } else if (elapsed < T_DONE) {
        if (stateRef.current.respChars !== RESPONSE_TEXT.length)
          setRespChars(RESPONSE_TEXT.length);
        if (stateRef.current.phase !== "done") setPhase("done");
      } else if (elapsed < T_RESTART) {
        // hold on "done"
        if (stateRef.current.phase !== "done") setPhase("done");
      } else {
        // Restart — reset startTime so the loop begins fresh
        startTime = ts;
        setPhase("idle");
        setPromptChars(0);
        setRespChars(0);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    runDemo();
    return () => cancelAnimationFrame(rafRef.current);
  }, [runDemo]);

  /* ── Derived display values ──────────────────────────── */
  const isTyping = phase === "typing-prompt";
  const showPrompt = phase !== "idle";
  const showThink = phase === "thinking";
  const showResp = phase === "streaming" || phase === "done";
  const isDone = phase === "done";

  const visiblePrompt = PROMPT.slice(0, promptChars);
  const visibleResponse = RESPONSE_TEXT.slice(0, respChars);

  /* ── Render ──────────────────────────────────────────── */
  return (
    <>
      {/* Keyframes — injected once, static string, no re-renders */}
      <style>{`
        @keyframes rivCursor { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes rivDot { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-4px)} }
        @keyframes rivSlideUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rivFadeIn { from{opacity:0} to{opacity:1} }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "20px 20px 16px",
          gap: 12,
          fontFamily: "var(--font-sans, 'Space Grotesk', sans-serif)",
        }}
      >
        {/* ── Response bubble — appears above the input card ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 10,
            overflow: "hidden",
          }}
        >
          {/* User prompt bubble */}
          {showPrompt && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                animation:
                  phase === "typing-prompt"
                    ? "none"
                    : "rivSlideUp 0.3s ease both",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  background: "var(--foreground)",
                  color: "var(--background)",
                  borderRadius: "18px 18px 4px 18px",
                  padding: "10px 14px",
                  fontSize: 13,
                  lineHeight: 1.5,
                  wordBreak: "break-word",
                }}
              >
                {visiblePrompt}
                {isTyping && <Cursor />}
              </div>
            </div>
          )}

          {/* Thinking / Response bubble */}
          {(showThink || showResp) && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                animation: "rivSlideUp 0.3s ease both",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  flexShrink: 0,
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                }}
              >
                <img
                  src="/logo.png"
                  alt="Rivinity"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Bubble */}
              <div
                style={{
                  flex: 1,
                  background: "var(--secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px 18px 18px 18px",
                  padding: "10px 14px",
                  fontSize: 12.5,
                  lineHeight: 1.65,
                  color: "var(--muted-foreground)",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {showThink && <ThinkingDots />}

                {showResp && (
                  <>
                    {visibleResponse}
                    {!isDone && <Cursor />}
                  </>
                )}

                {/* Done badge */}
                {isDone && (
                  <div
                    style={{
                      marginTop: 10,
                      paddingTop: 8,
                      borderTop: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      animation: "rivFadeIn 0.4s ease both",
                    }}
                  >
                    <Sparkles
                      size={11}
                      style={{ color: "var(--accent)", flexShrink: 0 }}
                    />
                    <span
                      style={{ fontSize: 11, color: "var(--muted-foreground)" }}
                    >
                      Ready to generate — click to preview
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Main input card (matches reference image exactly) ── */}
        <div
          style={{
            background: "var(--card, #fff)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "14px 16px 12px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            flexShrink: 0,
          }}
        >
          {/* Text area row */}
          <div
            style={{
              fontSize: 13.5,
              color: "var(--muted-foreground)",
              minHeight: 24,
              lineHeight: 1.5,
              marginBottom: 14,
              wordBreak: "break-word",
            }}
          >
            {phase === "idle" ? (
              <span style={{ opacity: 0.6 }}>
                Ask Rivinity to build something amazing…
              </span>
            ) : (
              <span style={{ opacity: 0.45 }}>
                Ask Rivinity to build something amazing…
              </span>
            )}
          </div>

          {/* Toolbar row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Paperclip */}
            <button
              aria-label="Attach file"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
                color: "var(--muted-foreground)",
                opacity: 0.7,
                flexShrink: 0,
              }}
            >
              <Paperclip size={16} />
            </button>

            {/* ⌘ + K badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                border: "1px solid var(--border)",
                borderRadius: 6,
                padding: "2px 7px",
                fontSize: 11,
                color: "var(--muted-foreground)",
                opacity: 0.7,
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 12 }}>⌘</span>
              <span>+</span>
              <span>K</span>
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Send / Replay button */}
            <button
              onClick={runDemo}
              aria-label="Replay demo"
              title="Replay demo"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: isDone
                  ? "linear-gradient(135deg, var(--accent), var(--highlight))"
                  : "var(--secondary)",
                border: "1px solid var(--border)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.3s ease",
              }}
            >
              {isDone ? (
                <RotateCcw size={14} color="white" />
              ) : (
                <ArrowUp size={14} color="var(--muted-foreground)" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
