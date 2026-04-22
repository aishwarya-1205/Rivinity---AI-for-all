"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FileProvider } from "@/components/dashboard/context/FileContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FileProvider>
          <div className="h-screen bg-background text-foreground overflow-hidden">
            {children}
          </div>
          <Toaster />
          <Sonner />
        </FileProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
