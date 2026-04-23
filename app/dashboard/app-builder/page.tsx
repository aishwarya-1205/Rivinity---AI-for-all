"use client";

import { useState } from "react";
import CanvasSidebar from "@/components/dashboard/canvas/CanvasSidebar";
import AppBuilderTopBar from "@/components/dashboard/app-builder/AppBuilderTopBar";
import AppBuilderMain from "@/components/dashboard/app-builder/AppBuilderMain";
import AppBuilderRightPanel from "@/components/dashboard/app-builder/AppBuilderRightPanel";
import { PanelLeft } from "lucide-react";

export default function AppBuilderPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  return (
    <div className="h-screen flex bg-background overflow-hidden relative">
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

        <AppBuilderTopBar rightPanelOpen={rightPanelOpen} setRightPanelOpen={setRightPanelOpen} />
        <div className="flex-1 flex min-h-0">
          <AppBuilderMain />
          <AppBuilderRightPanel isOpen={rightPanelOpen} onClose={() => setRightPanelOpen(false)} />
        </div>
      </div>
    </div>
  );
}
