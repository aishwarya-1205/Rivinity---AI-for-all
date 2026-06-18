"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  MinusIcon,
  SparklesIcon,
  GiftIcon,
  LaptopIcon,
  UsersIcon,
  BuildingIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────────────
   Shared primitives
   ──────────────────────────────────────────────────────────────────────── */

function FilledCheck({ size = "size-3" }: { size?: string }) {
  return (
    <div
      className="rounded-full p-0.5 flex-shrink-0"
      style={{
        background: "linear-gradient(135deg, var(--accent), var(--highlight))",
        color: "#ffffff",
      }}
    >
      <CheckIcon className={size} strokeWidth={3} />
    </div>
  );
}

/** Gradient-ring icon chip used as each tier's signature mark. */
function TierIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div
      className="flex size-9 items-center justify-center rounded-xl"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--accent) 14%, transparent), color-mix(in srgb, var(--highlight) 14%, transparent))",
        border:
          "1px solid color-mix(in srgb, var(--accent) 25%, color-mix(in srgb, var(--highlight) 25%, transparent))",
      }}
    >
      <Icon
        className="size-4"
        style={{ color: "var(--accent)" }}
        strokeWidth={2}
      />
    </div>
  );
}

function OutlineButton({
  children,
  href = "/signup",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <Link href={href} className="block">
      <button
        className="w-full cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition duration-200 hover:opacity-80"
        style={{
          border: "1px solid var(--border)",
          background: "var(--secondary)",
          color: "var(--foreground)",
        }}
      >
        {children}
      </button>
    </Link>
  );
}

function AccentButton({
  children,
  href = "/signup",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <Link href={href} className="block">
      <button
        className="w-full cursor-pointer rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.01] hover:opacity-90"
        style={{
          background:
            "linear-gradient(135deg, var(--accent), var(--highlight))",
        }}
      >
        {children}
      </button>
    </Link>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Plan data — same plans/copy as the original BentoPricing
   ──────────────────────────────────────────────────────────────────────── */

type PlanId = "free" | "pro" | "team" | "enterprise";

const PLAN_META: Record<
  PlanId,
  { label: string; icon: React.ElementType; tagline: string }
> = {
  free: {
    label: "Explorer",
    icon: GiftIcon,
    tagline: "Perfect for experimentation",
  },
  pro: {
    label: "Pro",
    icon: LaptopIcon,
    tagline: "For startups and growing teams",
  },
  team: {
    label: "Team",
    icon: UsersIcon,
    tagline: "For collaborative AI development",
  },
  enterprise: {
    label: "Enterprise",
    icon: BuildingIcon,
    tagline: "Unlimited scale, custom infra",
  },
};

type Tier = {
  id: PlanId;
  price: string;
  priceSuffix?: string;
  popular?: boolean;
  features: string[];
  cta: string;
  hasSeatEstimator?: boolean;
};

const TIERS: Tier[] = [
  {
    id: "free",
    price: "Free",
    features: [
      "1K AI agent executions/month",
      "Community support access",
      "Core model access",
    ],
    cta: "Start Free",
  },
  {
    id: "pro",
    price: "$49",
    priceSuffix: "/month",
    popular: true,
    features: [
      "100K AI agent executions/month",
      "Advanced workflow orchestration",
      "Priority support & success manager",
    ],
    cta: "Start Building",
  },
  {
    id: "team",
    price: "$149",
    priceSuffix: "/month",
    features: [
      "500K agent executions/month",
      "Advanced analytics dashboard",
      "Shared team workspaces",
    ],
    cta: "Start Now",
    hasSeatEstimator: true,
  },
  {
    id: "enterprise",
    price: "Custom",
    features: [
      "Unlimited agent executions",
      "Dedicated infrastructure",
      "24/7 premium support & SLA",
    ],
    cta: "Contact Sales",
  },
];

/* Feature-comparison table, grouped like Mistral's "Plans / Features and tools" */
type CellValue = true | false | string;

type FeatureRow = {
  label: string;
  values: Record<PlanId, CellValue>;
};

type FeatureGroup = {
  title: string;
  rows: FeatureRow[];
};

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Access",
    rows: [
      {
        label: "API access",
        values: { free: true, pro: true, team: true, enterprise: true },
      },
      {
        label: "Web dashboard",
        values: { free: true, pro: true, team: true, enterprise: true },
      },
      {
        label: "CLI & SDK",
        values: { free: false, pro: true, team: true, enterprise: true },
      },
      {
        label: "Mobile app (iOS & Android)",
        values: { free: true, pro: true, team: true, enterprise: true },
      },
    ],
  },
  {
    title: "Features & tools",
    rows: [
      {
        label: "Agent executions",
        values: {
          free: "1K/mo",
          pro: "100K/mo",
          team: "500K/mo",
          enterprise: "Unlimited",
        },
      },
      {
        label: "Workflow orchestration",
        values: { free: false, pro: true, team: true, enterprise: true },
      },
      {
        label: "Analytics dashboard",
        values: { free: false, pro: false, team: true, enterprise: true },
      },
      {
        label: "Storage",
        values: {
          free: "1GB",
          pro: "15GB",
          team: "30GB/user",
          enterprise: "Custom",
        },
      },
      {
        label: "Custom models & agents",
        values: { free: false, pro: false, team: false, enterprise: true },
      },
    ],
  },
  {
    title: "Support & security",
    rows: [
      {
        label: "Community support",
        values: { free: true, pro: true, team: true, enterprise: true },
      },
      {
        label: "Priority support",
        values: { free: false, pro: true, team: true, enterprise: true },
      },
      {
        label: "Dedicated success manager",
        values: { free: false, pro: true, team: true, enterprise: true },
      },
      {
        label: "SAML SSO",
        values: { free: false, pro: false, team: false, enterprise: true },
      },
      {
        label: "Audit logs",
        values: { free: false, pro: false, team: false, enterprise: true },
      },
    ],
  },
];

/* ────────────────────────────────────────────────────────────────────────
   Tier card
   ──────────────────────────────────────────────────────────────────────── */

function TierCard({ tier }: { tier: Tier }) {
  const meta = PLAN_META[tier.id];
  const isFree = tier.id === "free";

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl transition-transform duration-200",
        tier.popular && "md:-translate-y-2",
      )}
      style={{
        background: "var(--card)",
        border: tier.popular
          ? "1px solid color-mix(in srgb, var(--accent) 45%, transparent)"
          : "1px solid var(--border)",
        boxShadow: tier.popular
          ? "0 0 0 1px color-mix(in srgb, var(--accent) 15%, transparent), 0 18px 40px -16px color-mix(in srgb, var(--highlight) 35%, transparent)"
          : undefined,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 h-px w-full"
        style={{
          background: tier.popular
            ? "linear-gradient(90deg, var(--accent), var(--highlight))"
            : "linear-gradient(90deg, transparent, var(--border), transparent)",
        }}
      />

      {tier.popular && (
        <div
          className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-white"
          style={{
            background:
              "linear-gradient(135deg, var(--accent), var(--highlight))",
          }}
        >
          <SparklesIcon className="size-3.5" />
          Most popular
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <TierIcon icon={meta.icon} />
          <span className="font-medium" style={{ color: "var(--foreground)" }}>
            {meta.label}
          </span>
        </div>

        <p
          className="mt-3 text-sm leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          {meta.tagline}
        </p>

        <div className="mt-5 flex items-end gap-1.5">
          <span
            className="font-mono text-4xl font-semibold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            {tier.price}
          </span>
          {!isFree && tier.priceSuffix && (
            <span
              className="mb-1 text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              {tier.priceSuffix}
            </span>
          )}
        </div>

        <div
          className="my-5 h-px w-full"
          style={{ background: "var(--border)" }}
        />

        <ul
          className="flex flex-1 flex-col gap-3 text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <FilledCheck />
              <span className="leading-snug">{f}</span>
            </li>
          ))}
        </ul>

        {tier.hasSeatEstimator && <SeatEstimator />}

        <div className="mt-6">
          {tier.popular ? (
            <AccentButton>{tier.cta}</AccentButton>
          ) : tier.id === "enterprise" ? (
            <OutlineButton href="/contact">{tier.cta}</OutlineButton>
          ) : (
            <OutlineButton>{tier.cta}</OutlineButton>
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Comparison table
   ──────────────────────────────────────────────────────────────────────── */

function Cell({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <FilledCheck size="size-3" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <MinusIcon
          className="size-3.5"
          style={{ color: "var(--muted-foreground)" }}
        />
      </div>
    );
  }
  return (
    <span className="text-sm" style={{ color: "var(--foreground)" }}>
      {value}
    </span>
  );
}

function ComparisonTable() {
  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{ border: "1px solid var(--border)", background: "var(--card)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th className="w-1/3 p-4 text-left">
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Compare plans
                </span>
              </th>
              {TIERS.map((tier) => {
                const meta = PLAN_META[tier.id];
                return (
                  <th key={tier.id} className="p-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <TierIcon icon={meta.icon} />
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--foreground)" }}
                      >
                        {meta.label}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {FEATURE_GROUPS.map((group) => (
              <React.Fragment key={group.title}>
                <tr style={{ background: "var(--secondary)" }}>
                  <td
                    colSpan={TIERS.length + 1}
                    className="px-4 py-2 text-xs font-semibold tracking-wide uppercase"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {group.title}
                  </td>
                </tr>
                {group.rows.map((row) => (
                  <tr
                    key={row.label}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td
                      className="px-4 py-3 text-sm"
                      style={{ color: "var(--foreground)" }}
                    >
                      {row.label}
                    </td>
                    {TIERS.map((tier) => (
                      <td key={tier.id} className="px-4 py-3 text-center">
                        <Cell value={row.values[tier.id]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Team seat stepper (small Mistral-style detail, kept self-contained)
   ──────────────────────────────────────────────────────────────────────── */

function SeatEstimator() {
  const [seats, setSeats] = useState(2);
  const perSeat = 25;

  return (
    <div
      className="mt-5 flex items-center justify-between rounded-xl px-4 py-3"
      style={{
        background: "var(--secondary)",
        border: "1px solid var(--border)",
      }}
    >
      <div>
        <span
          className="font-mono text-lg font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          ${perSeat * seats}
        </span>
        <span
          className="ml-1 text-xs"
          style={{ color: "var(--muted-foreground)" }}
        >
          /mo &middot; {seats} {seats === 1 ? "user" : "users"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          aria-label="Decrease seats"
          onClick={() => setSeats((s) => Math.max(1, s - 1))}
          className="cursor-pointer rounded-md p-1 transition hover:opacity-70"
          style={{ color: "var(--muted-foreground)" }}
        >
          <MinusCircleIcon className="size-5" />
        </button>
        <button
          aria-label="Increase seats"
          onClick={() => setSeats((s) => Math.min(99, s + 1))}
          className="cursor-pointer rounded-md p-1 transition hover:opacity-70"
          style={{ color: "var(--accent)" }}
        >
          <PlusCircleIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Main export — drop-in replacement, same name/usage as before
   ──────────────────────────────────────────────────────────────────────── */

export function BentoPricing() {
  return (
    <div className="flex flex-col gap-10">
      {/* Tier cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier) => (
          <TierCard key={tier.id} tier={tier} />
        ))}
      </div>

      {/* Feature comparison */}
      <ComparisonTable />
    </div>
  );
}
