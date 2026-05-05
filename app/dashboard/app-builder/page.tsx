"use client";

import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import AppBuilderMain from "@/app/dashboard/app-builder/AppBuilderMain";
import AppBuilderRightPanel from "@/app/dashboard/app-builder/AppBuilderRightPanel";

export default function AppBuilderPage() {
  return (
    <DashboardLayout
      navTitle="Rivinity Builder"
      showModelSelector={false}
      rightPanel={<AppBuilderRightPanel isOpen={true} onClose={() => {}} />}
    >
      <AppBuilderMain />
    </DashboardLayout>
  );
}
