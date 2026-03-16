"use client";

import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { DemoShowcase } from "@/components/demo-showcase";
import { IntegrationsSection } from "@/components/integrations-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { SecuritySection } from "@/components/security-section";
import { RoadmapSection } from "@/components/roadmap-section";
import { PricingSection } from "@/components/pricing-section";
import { StatsSection } from "@/components/stats-section";
import { FAQSection } from "@/components/faq-section";
import { UpdatesSection } from "@/components/updates-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background">
        {/* Content Layer */}
        <div className="relative z-10">
          <Navbar />
          <main>
            <HeroSection />
            <FeaturesSection />
            <DemoShowcase />
            <IntegrationsSection />
            <TestimonialsSection />
            <SecuritySection />
            <RoadmapSection />
            <PricingSection />
            <StatsSection />
            <FAQSection />
            <UpdatesSection />
            <CTASection />
          </main>
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}
