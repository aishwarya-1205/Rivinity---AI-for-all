"use client";

import { memo, useEffect, useRef, useState } from "react";
import { CheckCircle2, Circle, Loader, Sparkles, Terminal } from "lucide-react";

/* ================================================================
   TOKEN-BASED SYNTAX HIGHLIGHTER
   Handles: keywords, strings, numbers, comments, functions, ops
================================================================ */
type TokenType =
  | "keyword"
  | "string"
  | "number"
  | "comment"
  | "function"
  | "variable"
  | "operator"
  | "plain"
  | "type";

interface Token {
  type: TokenType;
  text: string;
}

const KEYWORDS = new Set([
  "const",
  "let",
  "await",
  "async",
  "for",
  "of",
  "return",
  "if",
  "else",
  "true",
  "false",
  "new",
  "import",
  "from",
  "export",
  "default",
]);
const TYPES = new Set([
  "string",
  "number",
  "boolean",
  "void",
  "Promise",
  "Response",
]);

function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < line.length) {
    // Comment
    if (line[i] === "/" && line[i + 1] === "/") {
      tokens.push({ type: "comment", text: line.slice(i) });
      break;
    }
    // String
    if (line[i] === '"' || line[i] === "'" || line[i] === "`") {
      const q = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== q) j++;
      tokens.push({ type: "string", text: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    // Number
    if (/[0-9]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[0-9.]/.test(line[j])) j++;
      tokens.push({ type: "number", text: line.slice(i, j) });
      i = j;
      continue;
    }
    // Word
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      const next = line[j];
      const type: TokenType = KEYWORDS.has(word)
        ? "keyword"
        : TYPES.has(word)
          ? "type"
          : next === "("
            ? "function"
            : "variable";
      tokens.push({ type, text: word });
      i = j;
      continue;
    }
    // Operator / punctuation cluster
    if (/[=><+\-*/%!&|^~?:.,;{}()[\]]/.test(line[i])) {
      tokens.push({ type: "operator", text: line[i] });
      i++;
      continue;
    }
    tokens.push({ type: "plain", text: line[i] });
    i++;
  }
  return tokens;
}

const TOKEN_COLORS: Record<TokenType, string> = {
  keyword: "#c084fc", // purple — your highlight hue
  string: "#86efac", // green
  number: "#fbbf24", // amber
  comment: "#6b7280", // gray
  function: "#60a5fa", // blue
  variable: "#e2e8f0", // near-white
  operator: "#94a3b8", // slate
  type: "#f9a8d4", // pink
  plain: "#e2e8f0",
};

function SyntaxLine({ line }: { line: string }) {
  const tokens = tokenize(line);
  return (
    <>
      {tokens.map((t, i) => (
        <span key={i} style={{ color: TOKEN_COLORS[t.type] }}>
          {t.text}
        </span>
      ))}
    </>
  );
}

/* ================================================================
   CODE CONTENT
================================================================ */
const CODE_LINES = [
  `import { Rivinity } from "@rivinity/sdk";`,
  ``,
  `const client = new Rivinity({`,
  `  apiKey: process.env.RIVINITY_API_KEY,`,
  `  model: "rivinity-turbo",`,
  `});`,
  ``,
  `// Stream a completion`,
  `const stream = await client.chat.stream({`,
  `  messages: [{ role: "user", content: prompt }],`,
  `  temperature: 0.7,`,
  `  maxTokens: 2048,`,
  `});`,
  ``,
  `for await (const chunk of stream) {`,
  `  process.stdout.write(chunk.delta.content);`,
  `}`,
];

const OUTPUT_STEPS = [
  { icon: "spin", label: "Connecting to Rivinity Turbo…" },
  { icon: "check", label: "Model loaded · 2048 token context" },
  { icon: "check", label: "Streaming response initiated" },
  { icon: "spark", label: "Output complete · 312 tokens/s" },
];

// ms per line reveal
const LINE_DELAY = 110;
// hold after code done before showing output
const OUTPUT_START_DELAY = 400;
// ms per output step
const OUTPUT_STEP_DELAY = 500;

/* ================================================================
   CODE DEMO COMPONENT
================================================================ */
export const CodeDemo = memo(function CodeDemo() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [outputStep, setOutputStep] = useState(-1); // -1 = hidden
  const rafRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = () => {
    cancelAnimationFrame(rafRef.current);
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  };

  useEffect(() => {
    clearAll();
    setVisibleLines(0);
    setOutputStep(-1);

    // Reveal lines one by one
    CODE_LINES.forEach((_, i) => {
      const id = setTimeout(() => setVisibleLines(i + 1), 600 + i * LINE_DELAY);
      timerRef.current.push(id);
    });

    const codeDone = 600 + CODE_LINES.length * LINE_DELAY + OUTPUT_START_DELAY;

    // Then reveal output steps
    OUTPUT_STEPS.forEach((_, i) => {
      const id = setTimeout(
        () => setOutputStep(i),
        codeDone + i * OUTPUT_STEP_DELAY,
      );
      timerRef.current.push(id);
    });

    return clearAll;
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        fontFamily: "'Geist Mono', 'Fira Code', 'Cascadia Code', monospace",
      }}
    >
      {/* ── Editor card ───────────────────────────────────────── */}
      <div
        style={{
          background: "#0d0d14",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(108,99,255,0.18)",
          boxShadow:
            "0 0 0 1px rgba(108,99,255,0.08), 0 8px 40px rgba(0,0,0,0.35)",
        }}
      >
        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "#0a0a10",
          }}
        >
          {/* Active tab */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 16px",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "2px solid var(--accent, #ff7a18)",
              background: "#0d0d14",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent, #ff7a18)",
                display: "inline-block",
                opacity: 0.85,
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: "#e2e8f0",
                letterSpacing: "0.01em",
              }}
            >
              stream.ts
            </span>
          </div>
          {/* Inactive tab */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 16px",
              borderRight: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span style={{ fontSize: 12, color: "#4b5563" }}>config.ts</span>
          </div>
          <div style={{ flex: 1 }} />
          {/* Live indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0 16px",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
                animation: "codeGlow 1.8s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: "#4b5563",
                letterSpacing: "0.04em",
              }}
            >
              LIVE
            </span>
          </div>
        </div>

        {/* Code area */}
        <div style={{ padding: "18px 0 14px", minHeight: 240 }}>
          {CODE_LINES.map((line, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 0,
                opacity: i < visibleLines ? 1 : 0,
                transform:
                  i < visibleLines ? "translateX(0)" : "translateX(-6px)",
                transition: "opacity 0.2s ease, transform 0.2s ease",
                minHeight: line === "" ? 10 : undefined,
              }}
            >
              {/* Line number */}
              <span
                style={{
                  width: 44,
                  textAlign: "right",
                  paddingRight: 20,
                  fontSize: 12,
                  lineHeight: "22px",
                  color: "#2d3748",
                  userSelect: "none",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              {/* Highlighted line */}
              <span
                style={{
                  fontSize: 12.5,
                  lineHeight: "22px",
                  whiteSpace: "pre",
                  letterSpacing: "0.01em",
                }}
              >
                {line ? <SyntaxLine line={line} /> : " "}
              </span>
              {/* Blinking cursor on last visible line while still typing */}
              {i === visibleLines - 1 && visibleLines < CODE_LINES.length && (
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: "1em",
                    background: "var(--accent, #ff7a18)",
                    borderRadius: 1,
                    marginLeft: 1,
                    verticalAlign: "text-bottom",
                    animation: "cdCursor .7s step-end infinite",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "7px 16px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "#080810",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: 11,
                color: "#6b7280",
                letterSpacing: "0.03em",
              }}
            >
              TypeScript
            </span>
            <span style={{ fontSize: 11, color: "#374151" }}>UTF-8</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontSize: 11,
                background:
                  "linear-gradient(135deg, var(--accent,#ff7a18), var(--highlight,#6c63ff))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 600,
                letterSpacing: "0.03em",
              }}
            >
              Rivinity Turbo
            </span>
            <span style={{ fontSize: 11, color: "#374151" }}>·</span>
            <span style={{ fontSize: 11, color: "#4b5563" }}>
              Ln {visibleLines}, Col 1
            </span>
          </div>
        </div>
      </div>

      {/* ── Output / terminal card ────────────────────────────── */}
      <div
        style={{
          background: "var(--secondary)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          overflow: "hidden",
          opacity: outputStep >= 0 ? 1 : 0,
          transform: outputStep >= 0 ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        {/* Terminal header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 14px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Terminal
            size={13}
            style={{ color: "var(--muted-foreground)", opacity: 0.6 }}
          />
          <span
            style={{
              fontSize: 12,
              color: "var(--muted-foreground)",
              opacity: 0.7,
              letterSpacing: "0.02em",
            }}
          >
            Output
          </span>
        </div>

        {/* Steps */}
        <div
          style={{
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {OUTPUT_STEPS.map((step, i) => {
            const visible = i <= outputStep;
            const isLast = i === OUTPUT_STEPS.length - 1;
            const isActive = i === outputStep && !isLast;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                {/* Icon */}
                <span
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {step.icon === "spin" && isActive ? (
                    <Loader
                      size={13}
                      style={{
                        color: "var(--accent)",
                        animation: "cdSpin 1s linear infinite",
                      }}
                    />
                  ) : step.icon === "spark" ? (
                    <Sparkles size={13} style={{ color: "var(--accent)" }} />
                  ) : (
                    <CheckCircle2
                      size={13}
                      style={{
                        color: isActive ? "var(--muted-foreground)" : "#22c55e",
                      }}
                    />
                  )}
                </span>
                <span
                  style={{
                    fontSize: 12.5,
                    color:
                      isLast && i === outputStep
                        ? "var(--foreground)"
                        : "var(--muted-foreground)",
                    fontFamily: "'Geist Mono', monospace",
                    letterSpacing: "0.01em",
                    fontWeight: isLast && i === outputStep ? 500 : 400,
                  }}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes cdCursor { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes codeGlow  { 0%,100%{opacity:1;box-shadow:0 0 4px #22c55e} 50%{opacity:0.4;box-shadow:none} }
        @keyframes cdSpin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
});
