import React from "react";
import type { Resume } from "@/types/resume";

export interface TemplateMeta {
  id: string;
  name: string;
  category: string;
  description: string;
  component: React.LazyExoticComponent<React.ComponentType<{ resume: Resume }>>;
}

function lazyTemplate(importFn: () => Promise<Record<string, React.ComponentType<{ resume: Resume }>>>) {
  return React.lazy(async () => {
    const mod = await importFn();
    // Use the first exported component as default
    const Component = Object.values(mod)[0];
    return { default: Component };
  });
}

export const templates: TemplateMeta[] = [
  { id: "classic", name: "Classic", category: "Minimal", description: "Clean and timeless design", component: lazyTemplate(() => import("./classic/template")) },
  { id: "modern", name: "Modern", category: "Modern", description: "Sidebar layout with color accent", component: lazyTemplate(() => import("./modern/template")) },
  { id: "minimal", name: "Minimal", category: "Minimal", description: "Ultra-clean, whitespace-focused", component: lazyTemplate(() => import("./minimal/template")) },
  { id: "executive", name: "Executive", category: "Executive", description: "Professional and polished", component: lazyTemplate(() => import("./executive/template")) },
  { id: "developer", name: "Developer", category: "Developer", description: "Tech-focused with skills emphasis", component: lazyTemplate(() => import("./developer/template")) },
  { id: "creative", name: "Creative", category: "Creative", description: "Bold and visually striking", component: lazyTemplate(() => import("./creative/template")) },
  { id: "sales", name: "Sales", category: "Sales", description: "Results-driven and metric-focused", component: lazyTemplate(() => import("./sales/template")) },
  { id: "academic", name: "Academic", category: "Academic", description: "Research and education focused", component: lazyTemplate(() => import("./academic/template")) },
  { id: "executive-v2", name: "Executive Pro", category: "Executive", description: "Minimalist executive style", component: lazyTemplate(() => import("./executive-v2/template")) },
  { id: "finance", name: "Finance", category: "Finance", description: "Professional financial style", component: lazyTemplate(() => import("./finance/template")) },
  { id: "healthcare", name: "Healthcare", category: "Healthcare", description: "Medical and clinical focused", component: lazyTemplate(() => import("./healthcare/template")) },
  { id: "legal", name: "Legal", category: "Legal", description: "Formal and traditional", component: lazyTemplate(() => import("./legal/template")) },
  { id: "marketing", name: "Marketing", category: "Marketing", description: "Bold and brand-forward", component: lazyTemplate(() => import("./marketing/template")) },
  { id: "startup", name: "Startup", category: "Startup", description: "Modern tech startup style", component: lazyTemplate(() => import("./startup/template")) },
  { id: "international", name: "International", category: "International", description: "Global CV format with photo", component: lazyTemplate(() => import("./international/template")) },
  { id: "engineering", name: "Engineering", category: "Developer", description: "Two-column sidebar with monospace skills", component: lazyTemplate(() => import("./engineering/template")) },
  { id: "research", name: "Research", category: "Academic", description: "Academic CV with serif headings", component: lazyTemplate(() => import("./research/template")) },
  { id: "student", name: "Student", category: "Minimal", description: "Education-first single column layout", component: lazyTemplate(() => import("./student/template")) },
  { id: "freelancer", name: "Freelancer", category: "Creative", description: "Portfolio-style with client focus", component: lazyTemplate(() => import("./freelancer/template")) },
  { id: "consultant", name: "Consultant", category: "Executive", description: "Executive consulting with accent borders", component: lazyTemplate(() => import("./consultant/template")) },
  { id: "nonprofit", name: "Nonprofit", category: "Nonprofit", description: "Mission-driven with warm design", component: lazyTemplate(() => import("./nonprofit/template")) },
  { id: "real-estate", name: "Real Estate", category: "Real Estate", description: "Professional licensing with certifications", component: lazyTemplate(() => import("./real-estate/template")) },
  { id: "photography", name: "Photography", category: "Creative", description: "Visual portfolio with elegant layout", component: lazyTemplate(() => import("./photography/template")) },
  { id: "architecture", name: "Architecture", category: "Developer", description: "Structured grid with precision design", component: lazyTemplate(() => import("./architecture/template")) },
  { id: "education", name: "Education", category: "Academic", description: "Teaching-focused with credentials emphasis", component: lazyTemplate(() => import("./education/template")) },
  { id: "media", name: "Media", category: "Creative", description: "Broadcast portfolio with dark sidebar", component: lazyTemplate(() => import("./media/template")) },
  { id: "manufacturing", name: "Manufacturing", category: "Developer", description: "Industrial technical with certifications", component: lazyTemplate(() => import("./manufacturing/template")) },
  { id: "military", name: "Military", category: "Executive", description: "Formal military style with awards", component: lazyTemplate(() => import("./military/template")) },
];

export const templateRegistry: Record<string, React.ComponentType<{ resume: Resume }>> = Object.fromEntries(
  templates.map((t) => [t.id, t.component])
);
