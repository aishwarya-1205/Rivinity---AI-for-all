"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CanvasSidebar from "@/components/dashboard/canvas/CanvasSidebar";
import CanvasNav from "@/components/dashboard/canvas/CanvasNav";
import RivinityLMMain from "@/components/dashboard/rivinity-lm/RivinityLMMain";
import RivinityLMRightPanel from "@/components/dashboard/rivinity-lm/RivinityLMRightPanel";
import { PanelLeft } from "lucide-react";

function RivinityLMContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeFeature, setActiveFeature] = useState<string>("landing");
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("q") || "";

  return (
    <div className="h-screen flex overflow-hidden">
      <div
        className="shrink-0 transition-all duration-300 ease-in-out overflow-hidden"
        style={{ width: sidebarOpen ? 260 : 0 }}
      >
        <CanvasSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative">
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="absolute top-3 left-3 z-20 w-8 h-8 rounded-xl glass border border-glass shadow-float flex items-center justify-center text-muted-foreground/60 hover:text-foreground/80 hover:shadow-glow-accent transition-all duration-200"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <CanvasNav />
        <div className="flex-1 flex min-h-0">
          <RivinityLMMain
            activeFeature={activeFeature}
            onFeatureChange={setActiveFeature}
            initialMessage={initialMessage}
          />
          <RivinityLMRightPanel activeFeature={activeFeature} onFeatureChange={setActiveFeature} />
        </div>
      </div>
    </div>
  );
}

export default function RivinityLMDocsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RivinityLMContent />
    </Suspense>
  );
}
