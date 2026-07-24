"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { useI18n } from "@/lib/i18n/context";
import type { SectionType } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Plus, Briefcase, GraduationCap, Wrench, Folder, Trophy, Award, Languages, Heart, FlaskConical, BookOpen, FileCheck, Users } from "lucide-react";

const sectionIcons: Record<string, React.ReactNode> = {
  experience: <Briefcase className="w-4 h-4" />,
  education: <GraduationCap className="w-4 h-4" />,
  skills: <Wrench className="w-4 h-4" />,
  projects: <Folder className="w-4 h-4" />,
  awards: <Trophy className="w-4 h-4" />,
  certifications: <Award className="w-4 h-4" />,
  languages: <Languages className="w-4 h-4" />,
  volunteer: <Heart className="w-4 h-4" />,
  research: <FlaskConical className="w-4 h-4" />,
  publications: <BookOpen className="w-4 h-4" />,
  patents: <FileCheck className="w-4 h-4" />,
  references: <Users className="w-4 h-4" />,
};

const availableSections: { type: SectionType; labelKey: string }[] = [
  { type: "projects", labelKey: "sections.projects" },
  { type: "awards", labelKey: "sections.awards" },
  { type: "certifications", labelKey: "sections.certifications" },
  { type: "languages", labelKey: "sections.languages" },
  { type: "volunteer", labelKey: "sections.volunteer" },
  { type: "research", labelKey: "sections.research" },
  { type: "publications", labelKey: "sections.publications" },
  { type: "patents", labelKey: "sections.patents" },
  { type: "references", labelKey: "sections.references" },
  { type: "custom", labelKey: "sections.custom" },
];

export function SectionManager() {
  const resume = useResumeStore((s) => s.resume);
  const addSection = useResumeStore((s) => s.addSection);
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const existingTypes = resume.sections.map((s) => s.type);
  const addableSections = availableSections.filter(
    (s) => !existingTypes.includes(s.type)
  );

  if (addableSections.length === 0) return null;

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-8 text-xs"
      >
        <Plus className="w-3.5 h-3.5 mr-1" />
        {t("editor.addSection")}
      </Button>

      {isOpen && (
        <div className="grid grid-cols-2 gap-1.5 p-2 bg-muted/50 rounded-lg">
          {addableSections.map((section) => (
            <button
              key={section.type}
              onClick={() => {
                addSection(section.type);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-2 py-1.5 text-xs text-left hover:bg-background rounded transition-colors"
            >
              {sectionIcons[section.type] || <Plus className="w-4 h-4" />}
              {t(section.labelKey)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
