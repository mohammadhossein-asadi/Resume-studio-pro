"use client";

import { useResumeStore } from "@/store/resume-store";
import { useI18n } from "@/lib/i18n/context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PersonalInfoForm() {
  const resume = useResumeStore((s) => s.resume);
  const updatePersonalInfo = useResumeStore((s) => s.updatePersonalInfo);
  const { t } = useI18n();

  const fields = [
    { key: "firstName", label: t("editor.firstName"), placeholder: "John" },
    { key: "lastName", label: t("editor.lastName"), placeholder: "Doe" },
    { key: "title", label: t("editor.title"), placeholder: "Senior Software Engineer" },
    { key: "email", label: t("editor.email"), placeholder: "john@example.com", type: "email" },
    { key: "phone", label: t("editor.phone"), placeholder: "+1 (555) 123-4567" },
    { key: "location", label: t("editor.location"), placeholder: "San Francisco, CA" },
    { key: "website", label: t("editor.website"), placeholder: "https://example.com" },
    { key: "linkedin", label: t("editor.linkedin"), placeholder: "linkedin.com/in/johndoe" },
    { key: "github", label: t("editor.github"), placeholder: "github.com/johndoe" },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <div className="w-1 h-4 bg-primary rounded-full" />
        {t("editor.personalInfo")}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {fields.map((field) => (
          <div
            key={field.key}
            className={field.key === "title" || field.key === "email" ? "col-span-2" : ""}
          >
            <Label className="text-xs text-muted-foreground mb-1 block">
              {field.label}
            </Label>
            <Input
              value={resume.personalInfo[field.key as keyof typeof resume.personalInfo] || ""}
              onChange={(e) => updatePersonalInfo(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="h-8 text-sm"
              type={field.type || "text"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
