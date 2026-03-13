"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { SparklesIcon, CheckIcon } from "lucide-react";

/* ─── FilledCheck ─────────────────────────────────────────────────────────── */
function FilledCheck() {
  return (
    <div
      className="rounded-full p-0.5 flex-shrink-0"
      style={{
        background: "linear-gradient(135deg, var(--accent), var(--highlight))",
        color: "#ffffff",
      }}
    >
      <CheckIcon className="size-3" strokeWidth={3} />
    </div>
  );
}

/* ─── Shared card gradient background ────────────────────────────────────── */
const cardGradientStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, color-mix(in srgb, var(--accent) 6%, var(--card)) 0%, var(--card) 40%, color-mix(in srgb, var(--highlight) 5%, var(--card)) 100%)",
};

/* ─── OutlineButton ───────────────────────────────────────────────────────── */
function OutlineButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-80 cursor-pointer"
      style={{
        border: "1px solid var(--border)",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {children}
    </button>
  );
}

/* ─── AccentButton ────────────────────────────────────────────────────────── */
function AccentButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02] cursor-pointer"
      style={{
        background: "linear-gradient(135deg, var(--accent), var(--highlight))",
        color: "#ffffff",
      }}
    >
      {children}
    </button>
  );
}

/* ─── PricingCard ──────────────────────────────────────────────────────────── */
type PricingCardProps = {
  titleBadge: string;
  priceLabel: string;
  priceSuffix?: string;
  features: string[];
  cta?: string;
  className?: string;
};

function PricingCard({
  titleBadge,
  priceLabel,
  priceSuffix = "/month",
  features,
  cta = "Get Started",
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl", className)}
      style={{
        border: "1px solid var(--border)",
        ...cardGradientStyle,
        color: "var(--card-foreground)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 w-full h-px opacity-60"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent), var(--highlight), transparent)",
        }}
      />

      <div className="flex items-center gap-3 p-4">
        {/* Badge */}
        <span
          className="font-mono text-xs px-2 py-1 rounded-full border"
          style={{
            background: "var(--secondary)",
            color: "var(--muted-foreground)",
            borderColor: "var(--border)",
          }}
        >
          {titleBadge}
        </span>
        <div className="ml-auto">
          <OutlineButton>{cta}</OutlineButton>
        </div>
      </div>

      <div className="flex items-end gap-2 px-4 py-2">
        <span
          className="font-mono text-5xl font-semibold tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          {priceLabel}
        </span>
        {priceLabel.toLowerCase() !== "free" && priceSuffix && (
          <span
            className="text-sm mb-1"
            style={{ color: "var(--muted-foreground)" }}
          >
            {priceSuffix}
          </span>
        )}
      </div>

      <ul
        className="grid gap-4 p-4 text-sm"
        style={{ color: "var(--muted-foreground)" }}
      >
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3">
            <FilledCheck />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── BentoPricing ─────────────────────────────────────────────────────────── */
export function BentoPricing() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-8">
      {/* Explorer / Free */}
      <PricingCard
        titleBadge="EXPLORER"
        priceLabel="Free"
        features={[
          "Perfect for experimentation",
          "1K AI agent executions/month",
          "Community support access",
        ]}
        cta="Start Free"
        className="lg:col-span-3"
      />

      {/* Featured / PRO card */}
      <div
        className="relative w-full overflow-hidden rounded-xl lg:col-span-5"
        style={{
          border: "1px solid var(--border)",
          ...cardGradientStyle,
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-0.5"
          style={{
            background:
              "linear-gradient(90deg, var(--accent), var(--highlight))",
          }}
        />

        <div className="flex items-center gap-3 p-4">
          <span
            className="font-mono text-xs px-2 py-1 rounded-full border"
            style={{
              background: "var(--secondary)",
              color: "var(--muted-foreground)",
              borderColor: "var(--border)",
            }}
          >
            PRO
          </span>

          <span
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--accent) 12%, transparent), color-mix(in srgb, var(--highlight) 12%, transparent))",
              border:
                "1px solid color-mix(in srgb, var(--accent) 30%, color-mix(in srgb, var(--highlight) 30%, transparent))",
              color: "var(--accent)",
            }}
          >
            <SparklesIcon className="size-3" />
            Most Popular
          </span>

          <div className="ml-auto">
            <AccentButton>Start Building</AccentButton>
          </div>
        </div>

        <div className="flex flex-col p-4 lg:flex-row">
          <div className="pb-4 lg:w-[30%]">
            <span
              className="font-mono text-5xl font-semibold tracking-tight"
              style={{ color: "var(--foreground)" }}
            >
              $49
            </span>
            <span
              className="text-sm ml-1"
              style={{ color: "var(--muted-foreground)" }}
            >
              /month
            </span>
          </div>

          <ul
            className="grid gap-4 text-sm lg:w-[70%]"
            style={{ color: "var(--muted-foreground)" }}
          >
            {[
              "Perfect for startups and growing teams",
              "100K AI agent executions per month",
              "Advanced workflow orchestration",
              "Priority support and dedicated success manager",
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-3">
                <FilledCheck />
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Team */}
      <PricingCard
        titleBadge="TEAM"
        priceLabel="$149"
        features={[
          "For collaborative AI development",
          "500K agent executions/month",
          "Advanced analytics dashboard",
        ]}
        className="lg:col-span-4"
      />

      {/* Enterprise */}
      <PricingCard
        titleBadge="ENTERPRISE"
        priceLabel="Custom"
        priceSuffix=""
        features={[
          "Unlimited agent executions",
          "Dedicated infrastructure",
          "24/7 premium support & SLA",
        ]}
        cta="Contact Sales"
        className="lg:col-span-4"
      />
    </div>
  );
}
