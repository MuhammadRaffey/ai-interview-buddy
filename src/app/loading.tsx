"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import BackgroundEffects from "@/components/layout/BackgroundEffects";

export default function Loading() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <BackgroundEffects />
      <div className="relative z-10">
        <LoadingSpinner size="lg" text="Loading Interview Maestro..." />
      </div>
    </div>
  );
}
