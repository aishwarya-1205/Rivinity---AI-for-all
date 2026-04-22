"use client";

import { useState } from "react";
import CanvasSidebar from "@/components/dashboard/canvas/CanvasSidebar";
import CanvasNav from "@/components/dashboard/canvas/CanvasNav";
import AudioLabMain from "@/components/dashboard/audio-lab/AudioLabMain";
import AudioLabRightPanel from "@/components/dashboard/audio-lab/AudioLabRightPanel";
import { PanelLeft } from "lucide-react";

export default function AudioLabPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          <AudioLabMain />
          <AudioLabRightPanel />
        </div>
      </div>
    </div>
  );
}
