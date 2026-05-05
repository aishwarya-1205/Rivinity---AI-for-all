"use client";

import DashboardLayout from "@/app/dashboard/_components/shared/DashboardLayout";
import AppBuilderMain from "@/app/dashboard/_components/app-builder/AppBuilderMain";
import AppBuilderRightPanel from "@/app/dashboard/_components/app-builder/AppBuilderRightPanel";

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
