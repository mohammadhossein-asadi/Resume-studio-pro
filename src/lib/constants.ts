export const APP_NAME = "Resume Studio Pro";
export const APP_DESCRIPTION = "World's most advanced bilingual AI-ready Resume Builder";

export const LOCALES = {
  en: { label: "English", dir: "ltr", flag: "🇺🇸" },
  fa: { label: "فارسی", dir: "rtl", flag: "🇮🇷" },
} as const;

export const PAPER_SIZES = {
  a4: { width: 210, height: 297, label: "A4" },
  letter: { width: 216, height: 279, label: "Letter" },
} as const;

export const SECTION_TYPES = [
  { id: "experience", label: "Work Experience", labelFa: "تجربه کاری", icon: "Briefcase" },
  { id: "education", label: "Education", labelFa: "تحصیلات", icon: "GraduationCap" },
  { id: "skills", label: "Skills", labelFa: "مهارت‌ها", icon: "Wrench" },
  { id: "projects", label: "Projects", labelFa: "پروژه‌ها", icon: "Folder" },
  { id: "awards", label: "Awards", labelFa: "جایزه‌ها", icon: "Trophy" },
  { id: "certifications", label: "Certifications", labelFa: "گواهینامه‌ها", icon: "Award" },
  { id: "languages", label: "Languages", labelFa: "زبان‌ها", icon: "Languages" },
  { id: "volunteer", label: "Volunteer", labelFa: "داوطلبی", icon: "Heart" },
  { id: "research", label: "Research", labelFa: "تحقیقات", icon: "FlaskConical" },
  { id: "publications", label: "Publications", labelFa: "انتشارات", icon: "BookOpen" },
  { id: "patents", label: "Patents", labelFa: "اختراعات", icon: "FileCheck" },
  { id: "references", label: "References", labelFa: "ارجاعات", icon: "Users" },
  { id: "custom", label: "Custom Section", labelFa: "بخش سفارشی", icon: "Plus" },
] as const;

export const DEFAULT_PRIMARY_COLOR = "#2563eb";
export const DEFAULT_FONT_SIZE = 10;
export const DEFAULT_LINE_HEIGHT = 1.5;
