"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
import { Eye, Edit3 } from "lucide-react";

export function EditorShell() {
  const resume = useResumeStore((s) => s.resume);
  const { sidebarTab, setSidebarTab } = useUIStore();
  const [leftPanelWidth, setLeftPanelWidth] = useState(45);
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
  const [isMobile, setIsMobile] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Cleanup resize listeners on unmount
  useEffect(() => {
    return () => {
      cleanupRef.current?.();
    };
  }, []);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    cleanupRef.current?.(); // Clean up any previous drag
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
      cleanupRef.current = null;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    cleanupRef.current = handleMouseUp;
  }, [leftPanelWidth]);

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
          <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5" role="tablist" aria-label="Mobile view">
            <button
              role="tab"
              aria-selected={mobileView === "editor"}
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
              role="tab"
              aria-selected={mobileView === "preview"}
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
          <div className="flex border-b border-border shrink-0" role="tablist" aria-label="Editor panels">
            {(["editor", "settings", "quality"] as const).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={sidebarTab === tab}
                aria-controls={`panel-${tab}`}
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
            onMouseDown={handleResizeStart}
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
