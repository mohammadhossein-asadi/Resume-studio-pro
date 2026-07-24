"use client";

import { useResumeStore } from "@/store/resume-store";
import { useI18n } from "@/lib/i18n/context";
import { Textarea } from "@/components/ui/textarea";

export function SummaryEditor() {
  const resume = useResumeStore((s) => s.resume);
  const updatePersonalInfo = useResumeStore((s) => s.updatePersonalInfo);
  const { t } = useI18n();

  const charCount = resume.personalInfo.summary.length;
  const maxChars = 500;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <div className="w-1 h-4 bg-primary rounded-full" />
          {t("editor.summary")}
        </h3>
        <span
          className={`text-xs ${
            charCount > maxChars
              ? "text-destructive"
              : charCount > maxChars * 0.8
              ? "text-warning"
              : "text-muted-foreground"
          }`}
        >
          {charCount}/{maxChars}
        </span>
      </div>
      <Textarea
        value={resume.personalInfo.summary}
        onChange={(e) => updatePersonalInfo("summary", e.target.value)}
        placeholder={t("editor.summaryPlaceholder")}
        className="min-h-[100px] text-sm resize-none"
        maxLength={maxChars}
      />
    </div>
  );
}
