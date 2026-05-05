"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/app/dashboard/_components/shared/DashboardLayout";
import RivinityLMMain from "@/app/dashboard/_components/rivinity-lm/RivinityLMMain";
import RivinityLMRightPanel from "@/app/dashboard/_components/rivinity-lm/RivinityLMRightPanel";

function RivinityLMContent() {
  const [activeFeature, setActiveFeature] = useState<string>("landing");
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("q") || "";

  return (
    <DashboardLayout
      showModelSelector={true}
      rightPanel={
        <RivinityLMRightPanel 
          activeFeature={activeFeature} 
          onFeatureChange={setActiveFeature} 
          isOpen={true}
          onClose={() => {}}
        />
      }
    >
      <RivinityLMMain
        activeFeature={activeFeature}
        onFeatureChange={setActiveFeature}
        initialMessage={initialMessage}
      />
    </DashboardLayout>
  );
}

export default function RivinityLMDocsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RivinityLMContent />
    </Suspense>
  );
}
