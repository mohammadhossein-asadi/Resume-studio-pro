"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { Download, FileText, Loader2 } from "lucide-react";
import { cn, escapeHtml } from "@/lib/utils";
import type { Resume } from "@/types/resume";

export function ExportMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const resume = useResumeStore((s) => s.resume);

  const handlePrintPDF = async () => {
    setExporting(true);
    try {
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        alert("Please allow popups to export PDF");
        return;
      }

      const previewEl = document.getElementById("preview-container");
      const content = previewEl?.innerHTML || "";

      const safeName = escapeHtml(`${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`);

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${safeName} - Resume</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Vazirmatn:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <style>
            @page { margin: 0; size: ${resume.settings.paperSize === "a4" ? "210mm 297mm" : "8.5in 11in"}; }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: ${resume.language === "fa" ? '"Vazirmatn"' : '"Inter"'}, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
          </style>
        </head>
        <body>
          ${content}
          <script>
            window.onload = function() {
              setTimeout(function() { window.print(); window.close(); }, 500);
            };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    } finally {
      setExporting(false);
      setIsOpen(false);
    }
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resume.personalInfo.firstName}_${resume.personalInfo.lastName}_resume.json`;
    a.click();
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const handleExportMarkdown = () => {
    const md = generateMarkdown(resume);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resume.personalInfo.firstName}_${resume.personalInfo.lastName}_resume.md`;
    a.click();
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const handleExportHTML = () => {
    const previewEl = document.getElementById("preview-container");
    const content = previewEl?.innerHTML || "";
    const safeName = escapeHtml(`${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`);
    const html = `<!DOCTYPE html>
<html lang="${resume.language === "fa" ? "fa" : "en"}" dir="${resume.language === "fa" ? "rtl" : "ltr"}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} - Resume</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Vazirmatn:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: ${resume.language === "fa" ? '"Vazirmatn"' : '"Inter"'}, sans-serif; background: white; }
    [dir="rtl"] { text-align: right; }
  </style>
</head>
<body>${content}</body>
</html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resume.personalInfo.firstName}_${resume.personalInfo.lastName}_resume.html`;
    a.click();
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const exportOptions = [
    { label: "PDF (Print)", icon: FileText, action: handlePrintPDF, loading: exporting },
    { label: "HTML", icon: FileText, action: handleExportHTML },
    { label: "JSON", icon: FileText, action: handleExportJSON },
    { label: "Markdown", icon: FileText, action: handleExportMarkdown },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
        aria-label="Export resume"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Download className="w-3.5 h-3.5" />
        Export
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            className="absolute right-0 top-full mt-1 z-50 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden"
            role="menu"
            aria-label="Export options"
          >
            {exportOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={opt.action}
                disabled={opt.loading}
                role="menuitem"
                className={cn(
                  "w-full flex items-center gap-2 px-4 py-2.5 text-xs text-left hover:bg-muted transition-colors",
                  "border-b border-border last:border-0",
                  opt.loading && "opacity-50 cursor-not-allowed"
                )}
              >
                {opt.loading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <opt.icon className="w-3.5 h-3.5" />
                )}
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function generateMarkdown(resume: Resume): string {
  const lines: string[] = [];
  const { personalInfo, sections } = resume;

  lines.push(`# ${personalInfo.firstName} ${personalInfo.lastName}`);
  if (personalInfo.title) lines.push(`**${personalInfo.title}**`);
  lines.push("");

  const contacts: string[] = [];
  if (personalInfo.email) contacts.push(`Email: ${personalInfo.email}`);
  if (personalInfo.phone) contacts.push(`Phone: ${personalInfo.phone}`);
  if (personalInfo.location) contacts.push(`Location: ${personalInfo.location}`);
  if (personalInfo.linkedin) contacts.push(`LinkedIn: ${personalInfo.linkedin}`);
  if (personalInfo.github) contacts.push(`GitHub: ${personalInfo.github}`);
  if (contacts.length > 0) {
    lines.push(contacts.join(" | "));
    lines.push("");
  }

  if (personalInfo.summary) {
    lines.push("## Professional Summary");
    lines.push(personalInfo.summary);
    lines.push("");
  }

  sections
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order)
    .forEach((section) => {
      lines.push(`## ${section.title}`);
      section.items.forEach((item) => {
        const dateRange = [item.startDate, item.endDate || "Present"].filter(Boolean).join(" - ");
        lines.push(`### ${item.title}${item.subtitle ? ` — ${item.subtitle}` : ""}`);
        if (item.location) lines.push(`*${item.location}*`);
        if (dateRange) lines.push(`*${dateRange}*`);
        if (item.description) lines.push(item.description);
        item.bullets.filter((b) => b).forEach((bullet) => {
          lines.push(`- ${bullet}`);
        });
        lines.push("");
      });
    });

  return lines.join("\n");
}
