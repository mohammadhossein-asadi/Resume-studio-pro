"use client";

import { useMemo } from "react";
import { useResumeStore } from "@/store/resume-store";
import { calculateATSScore } from "./ats-engine";
import { Shield } from "lucide-react";

export function ATSScorePanel() {
  const resume = useResumeStore((s) => s.resume);

  const score = useMemo(() => calculateATSScore(resume), [resume]);

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-green-600 bg-green-50";
    if (s >= 60) return "text-yellow-600 bg-yellow-50";
    if (s >= 40) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md ${getScoreColor(score)}`}
      title={`ATS Score: ${score}/100`}
    >
      <Shield className="w-3.5 h-3.5" />
      ATS: {score}
    </div>
  );
}
