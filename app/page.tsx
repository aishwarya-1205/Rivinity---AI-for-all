"use client";

import { SmoothScroll } from "@/components/landing/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { DemoShowcase } from "@/components/landing/demo-showcase";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { SecuritySection } from "@/components/landing/security-section";
import { RoadmapSection } from "@/components/landing/roadmap-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { StatsSection } from "@/components/landing/stats-section";
import { FAQSection } from "@/components/landing/faq-section";
import { UpdatesSection } from "@/components/landing/updates-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/footer";
import { GlowingFeatures } from "@/components/landing/glowing-features";

export default function HomePage() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background">
        {/* Content Layer */}
        <div className="relative z-10">
          <Navbar />
          <main>
            <HeroSection />
            <GlowingFeatures />
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
