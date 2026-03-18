"use client";

import { Box, Lock, Search, Settings, Sparkles, Zap } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SectionWrapper } from "./ui/section-wrapper";

export function GlowingFeatures() {
  return (
    <SectionWrapper className="bg-background">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
          Advanced AI <span className="text-gradient">Infrastructure</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Experience the power of sovereign AI with our state-of-the-art 
          infrastructure designed for population-scale impact.
        </p>
      </div>

      <ul className="grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Sovereign Compute"
          description="Built on indigenous infrastructure for complete data sovereignty and security."
        />
        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/9]"
          icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Customizable Models"
          description="Fine-tune frontier-class models on your own domain-specific data."
        />
        <GridItem
          area="md:[grid-area:2/1/3/13] xl:[grid-area:1/9/2/13]"
          icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Enterprise Security"
          description="End-to-end encryption and SOC2 Type II compliance for mission-critical apps."
        />
        <GridItem
          area="md:[grid-area:3/1/4/7] xl:[grid-area:2/1/3/5]"
          icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Intelligent Search"
          description="Advanced RAG capabilities for lightning-fast information retrieval."
        />
        <GridItem
          area="md:[grid-area:3/7/4/13] xl:[grid-area:2/5/3/13]"
          icon={<Zap className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Low Latency"
          description="Optimized inference engines delivering responses in milliseconds across Bharat."
        />
      </ul>
    </SectionWrapper>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-[2rem] border border-black/5 dark:border-white/5 p-2 md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={4}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[1.5rem] border border-black/5 dark:border-white/5 p-6 shadow-sm dark:shadow-[0_-1px_0_1px_rgba(255,255,255,0.01)_inset,0_1px_4px_rgba(0,0,0,0.5)]">
          <div className="relative flex flex-1 flex-col justify-between">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <p className="font-sans text-sm/[1.125rem] md:text-base/[1.375rem]  text-neutral-400">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
