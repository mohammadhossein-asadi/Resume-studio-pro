# Resume Studio Pro — Remaining Work Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the Resume Studio Pro MVP by adding 13 more templates (28+ total), implementing responsive design, polishing UI/animations, and fixing outdated landing page copy.

**Architecture:** Feature-based folder structure under `src/features/`. Templates are React components with a standardized `{ resume: Resume }` interface, registered in `src/features/templates/registry.ts`. Responsive design uses Tailwind CSS v4 breakpoints. Animations use Motion (motion/react).

**Tech Stack:** React 19, Next.js 16, TypeScript, Tailwind CSS v4, Motion (motion/react), Lucide React icons

## Global Constraints

- Use React 19 + Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Use Motion for animations (`import { motion } from "motion/react"`)
- Use Lucide React for icons
- Bilingual (English + Persian) — every component must handle RTL/LTR
- Templates accept `{ resume: Resume }` props and use `settings.primaryColor` for theming
- Templates use `formatDateRange()` from `@/lib/utils` for date formatting
- No new dependencies — use only what's already in package.json
- Every template must render correctly at A4 (794×1123px) and Letter (816×1056px) sizes

---

## Task 1: Fix Landing Page Stats & Copy

**Covers:** Landing page accuracy

**Files:**
- Modify: `src/app/page.tsx:16-54`

**Interfaces:**
- Consumes: `templates` array from `@/features/templates/registry` (for accurate count)
- Produces: Updated stats and feature list reflecting 28+ templates

- [ ] **Step 1: Update the features array**

In `src/app/page.tsx`, update the `features` array item at line 44-47:

```tsx
{
  icon: Palette,
  title: "28+ Premium Templates",
  description: "Industry-specific designs for every career path and style.",
},
```

- [ ] **Step 2: Update the stats array**

Replace the `stats` array (lines 49-54):

```tsx
const stats = [
  { value: "14", label: "Quality Dimensions" },
  { value: "28+", label: "Premium Templates" },
  { value: "2", label: "Languages" },
  { value: "100+", label: "ATS Rules" },
];
```

- [ ] **Step 3: Verify landing page renders correctly**

Run: `npm run dev` and visit `http://localhost:3000`
Expected: Landing page shows "28+ Premium Templates" in both hero stats and features section

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "fix: update landing page stats to reflect 28+ templates"
```

---

## Task 2: Responsive Design — Editor Shell

**Covers:** Mobile/tablet responsive editor layout

**Files:**
- Modify: `src/features/editor/editor-shell.tsx`

**Interfaces:**
- Consumes: Existing `EditorShell` component structure
- Produces: Responsive layout that works on mobile (stacked), tablet (collapsible), desktop (split-pane)

- [ ] **Step 1: Add mobile state and toggle**

Replace the entire `editor-shell.tsx` with responsive version:

```tsx
"use client";

import { useState, useEffect } from "react";
import { useResumeStore } from "@/store/resume-store";
import { useUIStore } from "@/store/ui-store";
import { PersonalInfoForm } from "./personal-info-form";
import { SummaryEditor } from "./summary-editor";
import { SectionEditor } from "./section-editor";
import { SectionManager } from "./section-manager";
import { SettingsPanel } from "./settings-panel";
import { ResumePreview } from "@/features/preview/resume-preview";
import { ExportMenu } from "@/features/export/export-menu";
import { ATSScorePanel } from "@/features/ats/ats-score-panel";
import { QualitySidebar } from "@/features/quality/quality-sidebar";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { PanelLeftClose, PanelLeftOpen, Eye, Edit3 } from "lucide-react";

export function EditorShell() {
  const resume = useResumeStore((s) => s.resume);
  const { sidebarTab, setSidebarTab } = useUIStore();
  const [leftPanelWidth, setLeftPanelWidth] = useState(45);
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <motion.header
        initial={{ y: -56 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-14 border-b border-border flex items-center justify-between px-4 bg-card shrink-0"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center cursor-pointer"
          >
            <span className="text-primary-foreground font-bold text-sm">RS</span>
          </motion.div>
          <h1 className="font-semibold text-sm hidden sm:block">Resume Studio Pro</h1>
        </div>

        {/* Mobile View Toggle */}
        {isMobile && (
          <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
            <button
              onClick={() => setMobileView("editor")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                mobileView === "editor"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={() => setMobileView("preview")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                mobileView === "preview"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
          <ATSScorePanel />
          <ExportMenu />
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Editor */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className={cn(
            "border-r border-border bg-card flex flex-col overflow-hidden",
            isMobile
              ? mobileView === "editor"
                ? "w-full"
                : "hidden"
              : "border-r"
          )}
          style={isMobile ? undefined : { width: `${leftPanelWidth}%` }}
        >
          {/* Tab Bar */}
          <div className="flex border-b border-border shrink-0">
            {(["editor", "settings", "quality"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSidebarTab(tab)}
                className={cn(
                  "flex-1 px-4 py-2.5 text-xs font-medium capitalize transition-all duration-200 relative",
                  sidebarTab === tab
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {tab}
                {sidebarTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {sidebarTab === "editor" && (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 space-y-4"
                >
                  <PersonalInfoForm />
                  <SummaryEditor />
                  <SectionManager />
                  {resume.sections
                    .filter((s) => s.visible)
                    .sort((a, b) => a.order - b.order)
                    .map((section) => (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <SectionEditor section={section} />
                      </motion.div>
                    ))}
                </motion.div>
              )}
              {sidebarTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <SettingsPanel />
                </motion.div>
              )}
              {sidebarTab === "quality" && (
                <motion.div
                  key="quality"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <QualitySidebar />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Resize Handle (desktop only) */}
        {!isMobile && (
          <div
            className="w-1 bg-border hover:bg-primary/50 cursor-col-resize transition-colors shrink-0"
            onMouseDown={(e) => {
              e.preventDefault();
              const startX = e.clientX;
              const startWidth = leftPanelWidth;
              const containerWidth = window.innerWidth;

              const handleMouseMove = (moveEvent: MouseEvent) => {
                const delta = moveEvent.clientX - startX;
                const newWidth = Math.min(
                  70,
                  Math.max(30, startWidth + (delta / containerWidth) * 100)
                );
                setLeftPanelWidth(newWidth);
              };

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          />
        )}

        {/* Right Panel - Preview */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className={cn(
            "bg-muted/30 overflow-auto flex items-start justify-center p-6",
            isMobile
              ? mobileView === "preview"
                ? "flex-1"
                : "hidden"
              : "flex-1"
          )}
        >
          <ResumePreview />
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Make ResumePreview responsive**

Update `src/features/preview/resume-preview.tsx` to scale on mobile:

```tsx
"use client";

import { useResumeStore } from "@/store/resume-store";
import { useUIStore } from "@/store/ui-store";
import { templateRegistry } from "@/features/templates/registry";
import { useEffect, useState } from "react";

export function ResumePreview() {
  const resume = useResumeStore((s) => s.resume);
  const previewZoom = useUIStore((s) => s.previewZoom);
  const showHeatmap = useUIStore((s) => s.showHeatmap);
  const [containerWidth, setContainerWidth] = useState(0);

  const TemplateComponent = templateRegistry[resume.settings.templateId] || templateRegistry.classic;

  const paperWidth = resume.settings.paperSize === "a4" ? 794 : 816;
  const paperHeight = resume.settings.paperSize === "a4" ? 1123 : 1056;

  useEffect(() => {
    const el = document.getElementById("preview-container");
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const autoScale = containerWidth > 0 ? Math.min(1, (containerWidth - 48) / paperWidth) : 1;
  const finalZoom = containerWidth > 0 ? autoScale * previewZoom : previewZoom;

  return (
    <div id="preview-container" className="relative w-full">
      {/* Zoom Controls */}
      <div className="absolute -top-10 right-0 flex items-center gap-2">
        <button
          onClick={() => useUIStore.getState().setPreviewZoom(Math.max(0.5, previewZoom - 0.1))}
          className="w-6 h-6 rounded bg-card border border-border text-xs hover:bg-muted transition-colors"
        >
          -
        </button>
        <span className="text-xs text-muted-foreground w-12 text-center">
          {Math.round(previewZoom * 100)}%
        </span>
        <button
          onClick={() => useUIStore.getState().setPreviewZoom(Math.min(1.5, previewZoom + 0.1))}
          className="w-6 h-6 rounded bg-card border border-border text-xs hover:bg-muted transition-colors"
        >
          +
        </button>
      </div>

      {/* Paper */}
      <div
        className="bg-white shadow-xl relative mx-auto"
        style={{
          width: `${paperWidth}px`,
          height: `${paperHeight}px`,
          transform: `scale(${finalZoom})`,
          transformOrigin: "top center",
          fontFamily: resume.language === "fa" ? '"Vazirmatn", sans-serif' : '"Inter", sans-serif',
        }}
      >
        <TemplateComponent resume={resume} />

        {/* Heatmap Overlay */}
        {showHeatmap && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 via-yellow-500/10 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-red-500/30 to-transparent" />
            <div className="absolute top-1/3 left-0 right-0 h-1/3 bg-gradient-to-b from-yellow-500/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-500/10 to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify responsive behavior**

Run: `npm run dev` and test at 375px (mobile), 768px (tablet), 1280px (desktop)
Expected:
- Mobile: Toggle between Edit/Preview views, full-width panels
- Tablet/Desktop: Resizable split-pane as before

- [ ] **Step 4: Commit**

```bash
git add src/features/editor/editor-shell.tsx src/features/preview/resume-preview.tsx
git commit -m "feat: add responsive design with mobile edit/preview toggle"
```

---

## Task 3: Add 7 Industry Templates (Batch 1)

**Covers:** Template expansion — Engineering, Research, Student, Freelancer, Consultant, Nonprofit, Real Estate

**Files:**
- Create: `src/features/templates/engineering/template.tsx`
- Create: `src/features/templates/research/template.tsx`
- Create: `src/features/templates/student/template.tsx`
- Create: `src/features/templates/freelancer/template.tsx`
- Create: `src/features/templates/consultant/template.tsx`
- Create: `src/features/templates/nonprofit/template.tsx`
- Create: `src/features/templates/real-estate/template.tsx`
- Modify: `src/features/templates/registry.ts`

**Interfaces:**
- Consumes: `Resume` type from `@/types/resume`, `formatDateRange` from `@/lib/utils`
- Produces: 7 new template components + registry entries

Each template follows the same pattern as existing templates (Classic/Modern). Key structure:
- Accept `{ resume: Resume }` props
- Destructure `personalInfo`, `sections`, `settings` from resume
- Handle RTL via `dir` attribute
- Use `settings.primaryColor` for theming
- Use `formatDateRange()` for dates
- Filter sections by `visible` and sort by `order`

- [ ] **Step 1: Create Engineering template**

Create `src/features/templates/engineering/template.tsx`:

```tsx
import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function EngineeringTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  return (
    <div dir={dir} className="h-full flex" style={{ fontSize: `${settings.fontSize}pt`, lineHeight: settings.lineHeight }}>
      {/* Left sidebar - skills & contact */}
      <div className="w-2/5 p-5" style={{ backgroundColor: `${settings.primaryColor}08` }}>
        <div className="mb-5">
          <h1 className="text-xl font-bold" style={{ color: settings.primaryColor }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && <p className="text-xs text-gray-600 mt-1">{personalInfo.title}</p>}
        </div>

        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: settings.primaryColor }}>Contact</h2>
          <div className="space-y-1 text-[10px] text-gray-600">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
            {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
            {personalInfo.github && <p>{personalInfo.github}</p>}
          </div>
        </div>

        {sections.filter((s) => s.type === "skills" && s.visible).map((section) => (
          <div key={section.id} className="mb-5">
            <h2 className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: settings.primaryColor }}>
              {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
            </h2>
            <div className="flex flex-wrap gap-1">
              {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                <span key={i} className="px-2 py-0.5 text-[9px] rounded font-mono" style={{ backgroundColor: `${settings.primaryColor}15`, color: settings.primaryColor }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {sections.filter((s) => s.type === "languages" && s.visible).map((section) => (
          <div key={section.id} className="mb-5">
            <h2 className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: settings.primaryColor }}>Languages</h2>
            <div className="space-y-1 text-[10px] text-gray-600">
              {section.items.map((item) => <p key={item.id}>{item.title}</p>)}
            </div>
          </div>
        ))}
      </div>

      {/* Right content */}
      <div className="flex-1 p-5">
        {personalInfo.summary && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: settings.primaryColor }}>Summary</h2>
            <p className="text-[10px] text-gray-700">{personalInfo.summary}</p>
          </div>
        )}

        {sections.filter((s) => s.visible && s.type !== "skills" && s.type !== "languages").sort((a, b) => a.order - b.order).map((section) => (
          <div key={section.id} className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: settings.primaryColor }}>
              {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
            </h2>
            <div className="space-y-2.5">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-start mb-0.5">
                    <div>
                      <h3 className="font-semibold text-[11px]">{item.title}</h3>
                      {item.subtitle && <p className="text-[10px] text-gray-600">{item.subtitle}{item.location && ` | ${item.location}`}</p>}
                    </div>
                    <span className="text-[9px] text-gray-500 whitespace-nowrap">{formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}</span>
                  </div>
                  {item.bullets.some((b) => b) && (
                    <ul className={`list-disc text-[10px] text-gray-700 space-y-0.5 ${isRTL ? "mr-4" : "ml-4"}`}>
                      {item.bullets.filter(Boolean).map((bullet, i) => <li key={i}>{bullet}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create Research template**

Create `src/features/templates/research/template.tsx` — academic-focused with publications emphasis, two-column layout, serif headings.

- [ ] **Step 3: Create Student template**

Create `src/features/templates/student/template.tsx` — education-first layout, projects emphasis, coursework section.

- [ ] **Step 4: Create Freelancer template**

Create `src/features/templates/freelancer/template.tsx` — portfolio-style, client projects emphasis, skills grid.

- [ ] **Step 5: Create Consultant template**

Create `src/features/templates/consultant/template.tsx` — executive consulting style, client impact metrics.

- [ ] **Step 6: Create Nonprofit template**

Create `src/features/templates/nonprofit/template.tsx` — mission-driven layout, volunteer/impact emphasis.

- [ ] **Step 7: Create Real Estate template**

Create `src/features/templates/real-estate/template.tsx` — professional licensing style, certifications emphasis.

- [ ] **Step 8: Register all 7 templates**

Update `src/features/templates/registry.ts` — add imports and entries for all 7 new templates. The registry should now have 22 templates.

- [ ] **Step 9: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 10: Verify templates appear in settings**

Run: `npm run dev`, open editor, go to Settings tab
Expected: 22 templates listed across 10+ categories

- [ ] **Step 11: Commit**

```bash
git add src/features/templates/ src/features/templates/registry.ts
git commit -m "feat: add 7 industry templates (engineering, research, student, freelancer, consultant, nonprofit, real-estate)"
```

---

## Task 4: Add 6 More Templates (Batch 2)

**Covers:** Template expansion — Photography, Architecture, Education, Media, Manufacturing, Military

**Files:**
- Create: `src/features/templates/photography/template.tsx`
- Create: `src/features/templates/architecture/template.tsx`
- Create: `src/features/templates/education/template.tsx`
- Create: `src/features/templates/media/template.tsx`
- Create: `src/features/templates/manufacturing/template.tsx`
- Create: `src/features/templates/military/template.tsx`
- Modify: `src/features/templates/registry.ts`

**Interfaces:**
- Same as Task 3 — each template follows the `{ resume: Resume }` pattern
- Produces: 6 more template components + updated registry (28 total)

- [ ] **Step 1: Create Photography template**

Create `src/features/templates/photography/template.tsx` — visual portfolio style, large header, project gallery layout.

- [ ] **Step 2: Create Architecture template**

Create `src/features/templates/architecture/template.tsx` — structured grid layout, CAD-style precision, certifications section.

- [ ] **Step 3: Create Education template**

Create `src/features/templates/education/template.tsx` — teaching-focused, education credentials emphasis, publications/courses.

- [ ] **Step 4: Create Media template**

Create `src/features/templates/media/template.tsx` — broadcast/portfolio style, media credits emphasis.

- [ ] **Step 5: Create Manufacturing template**

Create `src/features/templates/manufacturing/template.tsx` — industrial/technical style, certifications/safety emphasis.

- [ ] **Step 6: Create Military template**

Create `src/features/templates/military/template.tsx` — formal/military style, rank/awards emphasis, structured format.

- [ ] **Step 7: Register all 6 templates**

Update `src/features/templates/registry.ts` — add imports and entries. Registry should now have 28 templates.

- [ ] **Step 8: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 9: Verify 28 templates in settings**

Run: `npm run dev`, open editor → Settings
Expected: 28 templates across 16 categories

- [ ] **Step 10: Commit**

```bash
git add src/features/templates/ src/features/templates/registry.ts
git commit -m "feat: add 6 more templates (photography, architecture, education, media, manufacturing, military) — 28 total"
```

---

## Task 5: UI Polish — Landing Page Animations & Micro-interactions

**Covers:** Animation polish, hover effects, loading states

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/features/editor/editor-shell.tsx`

**Interfaces:**
- Consumes: Existing Motion setup
- Produces: Smoother animations, staggered reveals, hover micro-interactions

- [ ] **Step 1: Add staggered card hover effects to landing page**

In `src/app/page.tsx`, update the features grid cards (around line 160-178) to add hover animations:

```tsx
{features.map((feature, i) => (
  <motion.div
    key={feature.title}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: i * 0.1 }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow cursor-default"
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
    >
      <feature.icon className="w-6 h-6 text-primary" />
    </motion.div>
    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">
      {feature.description}
    </p>
  </motion.div>
))}
```

- [ ] **Step 2: Add CTA button pulse animation**

Update the CTA section button (around line 256-260):

```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => router.push("/editor")}
  className="group px-8 py-3.5 bg-white text-primary rounded-xl font-semibold text-base hover:bg-white/90 transition-all flex items-center gap-2"
>
  Build Your Resume
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</motion.button>
```

- [ ] **Step 3: Add smooth tab transitions in editor**

The editor already has good animations. Verify the AnimatePresence transitions feel smooth. No code changes needed unless issues are found.

- [ ] **Step 4: Verify animations run smoothly**

Run: `npm run dev`, test landing page hover effects and editor tab switching
Expected: Smooth 60fps animations, no jank

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add hover micro-interactions and polished animations to landing page"
```

---

## Task 6: Responsive Design — Landing Page

**Covers:** Mobile-responsive landing page

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: Existing landing page structure
- Produces: Fully responsive landing page for mobile/tablet/desktop

- [ ] **Step 1: Audit current responsive classes**

The landing page already uses responsive Tailwind classes (`md:`, `sm:`). Verify:
- Hero text: `text-4xl md:text-6xl` ✓
- Stats grid: `grid-cols-2 md:grid-cols-4` ✓
- Features grid: `md:grid-cols-2 lg:grid-cols-3` ✓
- How it works: `md:grid-cols-3` ✓
- CTA buttons: `flex-col sm:flex-row` ✓
- Footer: already responsive ✓

The landing page is already responsive. No changes needed.

- [ ] **Step 2: Verify mobile rendering**

Run: `npm run dev`, test at 375px width
Expected: All sections stack properly, text readable, buttons accessible

- [ ] **Step 3: Commit (no changes needed)**

Skip if no changes were made.

---

## Task 7: Final Verification & Build Check

**Covers:** End-to-end verification

**Files:**
- None (verification only)

- [ ] **Step 1: TypeScript check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Successful build with no errors

- [ ] **Step 3: Dev server smoke test**

Run: `npm run dev`
Test:
- Landing page loads at `/`
- Editor loads at `/editor`
- All 28 templates render in preview
- Theme toggle works (dark/light)
- Language toggle works (EN/FA)
- Responsive layout works on mobile
- Export menu opens

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "chore: final verification and fixes"
```
