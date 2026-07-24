export type SectionType =
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "awards"
  | "certifications"
  | "languages"
  | "volunteer"
  | "research"
  | "publications"
  | "patents"
  | "references"
  | "custom";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  nationality?: string;
  dateOfBirth?: string;
}

export interface SectionItem {
  id: string;
  title: string;
  subtitle?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  bullets: string[];
  tags?: string[];
}

export interface ResumeSection {
  id: string;
  type: SectionType;
  title: string;
  titleFa?: string;
  items: SectionItem[];
  visible: boolean;
  order: number;
  custom?: boolean;
}

export interface ResumeSettings {
  templateId: string;
  primaryColor: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  paperSize: "a4" | "letter";
  showDividers: boolean;
  showIcons: boolean;
  columnLayout: "single" | "two";
}

export interface Resume {
  id: string;
  personalInfo: PersonalInfo;
  sections: ResumeSection[];
  settings: ResumeSettings;
  language: "en" | "fa" | "mixed";
  createdAt: string;
  updatedAt: string;
}

export type Locale = "en" | "fa";

export interface AnalysisScore {
  overall: number;
  ats: number;
  writing: number;
  grammar: number;
  impact: number;
  recruiter: number;
  readability: number;
  formatting: number;
  keywords: number;
  actionVerbs: number;
  achievements: number;
  professionalTone: number;
  consistency: number;
  completeness: number;
}

export interface AnalysisIssue {
  id: string;
  category: string;
  severity: "critical" | "warning" | "info";
  message: string;
  recommendation: string;
  example?: string;
  sectionId?: string;
  itemId?: string;
}
