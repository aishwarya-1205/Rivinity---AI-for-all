"use client";
import { useState } from "react";

import DashboardLayout from "@/app/dashboard/_components/shared/DashboardLayout";
import AudioLabMain from "@/app/dashboard/_components/audio-lab/AudioLabMain";
import AudioLabRightPanel from "@/app/dashboard/_components/audio-lab/AudioLabRightPanel";

export default function AudioLabPage() {
  const [activeFeature, setActiveFeature] = useState("text-to-speech");

  return (
    <DashboardLayout
      showModelSelector={true}
      rightPanel={<AudioLabRightPanel activeFeature={activeFeature} isOpen={true} onClose={() => {}} />}
    >
      <AudioLabMain activeFeature={activeFeature} onFeatureChange={setActiveFeature} />
    </DashboardLayout>
  );
}
