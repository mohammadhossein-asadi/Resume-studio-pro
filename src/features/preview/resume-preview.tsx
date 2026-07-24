"use client";

import { useResumeStore } from "@/store/resume-store";
import { useUIStore } from "@/store/ui-store";
import { templateRegistry } from "@/features/templates/registry";
import { Suspense, useEffect, useState } from "react";

function TemplateFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <span className="text-xs text-gray-500">Loading template...</span>
      </div>
    </div>
  );
}

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
      <div className="absolute -top-10 right-0 flex items-center gap-2" role="group" aria-label="Zoom controls">
        <button
          onClick={() => useUIStore.getState().setPreviewZoom(Math.max(0.5, previewZoom - 0.1))}
          className="w-6 h-6 rounded bg-card border border-border text-xs hover:bg-muted transition-colors"
          aria-label="Zoom out"
        >
          -
        </button>
        <span className="text-xs text-muted-foreground w-12 text-center" aria-live="polite">
          {Math.round(previewZoom * 100)}%
        </span>
        <button
          onClick={() => useUIStore.getState().setPreviewZoom(Math.min(1.5, previewZoom + 0.1))}
          className="w-6 h-6 rounded bg-card border border-border text-xs hover:bg-muted transition-colors"
          aria-label="Zoom in"
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
        <Suspense fallback={<TemplateFallback />}>
          <TemplateComponent resume={resume} />
        </Suspense>

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
