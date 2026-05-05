"use client";

import React, { useState } from "react";
import CanvasSidebar from "@/app/dashboard/_components/canvas/CanvasSidebar";
import CanvasNav from "@/app/dashboard/_components/canvas/CanvasNav";
import { PanelLeft } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
  navTitle?: string;
  showModelSelector?: boolean;
}

export default function DashboardLayout({
  children,
  rightPanel,
  navTitle,
  showModelSelector = false,
}: DashboardLayoutProps) {
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

        <CanvasNav 
          rightPanelOpen={rightPanelOpen} 
          setRightPanelOpen={setRightPanelOpen}
          title={navTitle}
          showModelSelector={showModelSelector}
        />
        <div className="flex-1 flex min-h-0">
          {children}
          {rightPanel && 
            React.cloneElement(rightPanel as React.ReactElement<{ isOpen?: boolean, onClose?: () => void }>, { 
              isOpen: rightPanelOpen, 
              onClose: () => setRightPanelOpen(false) 
            })
          }
        </div>
      </div>
    </div>
  );
}
