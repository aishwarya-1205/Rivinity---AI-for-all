"use client";

import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import CanvasMain from "@/components/dashboard/canvas/CanvasMain";
import CanvasRightPanel from "@/components/dashboard/canvas/CanvasRightPanel";

export default function DashboardPage() {
  return (
    <DashboardLayout
      rightPanel={<CanvasRightPanel />}
      showModelSelector={true}
      navTitle="Rivinity Core"
    >
      <CanvasMain />
    </DashboardLayout>
  );
}
