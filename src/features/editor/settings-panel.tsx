"use client";

import { useResumeStore } from "@/store/resume-store";
import { useI18n } from "@/lib/i18n/context";
import { templates } from "@/features/templates/registry";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function SettingsPanel() {
  const resume = useResumeStore((s) => s.resume);
  const updateSettings = useResumeStore((s) => s.updateSettings);
  const { t } = useI18n();

  const categories = [...new Set(templates.map((t) => t.category))];

  return (
    <div className="p-4 space-y-6">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <div className="w-1 h-4 bg-primary rounded-full" />
        {t("editor.settings")}
      </h3>

      {/* Template Selection */}
      <div className="space-y-3">
        <Label className="text-xs text-muted-foreground">Template ({templates.length})</Label>
        {categories.map((category) => (
          <div key={category}>
            <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              {category}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {templates
                .filter((t) => t.category === category)
                .map((template) => (
                  <button
                    key={template.id}
                    onClick={() => updateSettings({ templateId: template.id })}
                    className={`p-2 rounded-lg border text-left text-xs transition-colors ${
                      resume.settings.templateId === template.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-medium">{template.name}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      {template.description}
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Primary Color */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">{t("editor.color")}</Label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={resume.settings.primaryColor}
            onChange={(e) => updateSettings({ primaryColor: e.target.value })}
            className="w-8 h-8 rounded border border-border cursor-pointer"
          />
          <Input
            value={resume.settings.primaryColor}
            onChange={(e) => updateSettings({ primaryColor: e.target.value })}
            className="h-8 text-xs font-mono"
          />
        </div>
      </div>

      {/* Font Size */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">{t("editor.fontSize")}</Label>
          <span className="text-xs text-muted-foreground">{resume.settings.fontSize}pt</span>
        </div>
        <input
          type="range"
          min="8"
          max="14"
          step="0.5"
          value={resume.settings.fontSize}
          onChange={(e) => updateSettings({ fontSize: parseFloat(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Line Height */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">{t("editor.lineHeight")}</Label>
          <span className="text-xs text-muted-foreground">{resume.settings.lineHeight}</span>
        </div>
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={resume.settings.lineHeight}
          onChange={(e) => updateSettings({ lineHeight: parseFloat(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Paper Size */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">{t("editor.paperSize")}</Label>
        <div className="flex gap-2">
          {(["a4", "letter"] as const).map((size) => (
            <button
              key={size}
              onClick={() => updateSettings({ paperSize: size })}
              className={`flex-1 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                resume.settings.paperSize === size
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Options */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">{t("editor.showDividers")}</Label>
          <button
            role="switch"
            aria-checked={resume.settings.showDividers}
            aria-label={t("editor.showDividers")}
            onClick={() => updateSettings({ showDividers: !resume.settings.showDividers })}
            className={`w-10 h-5 rounded-full transition-colors ${
              resume.settings.showDividers ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                resume.settings.showDividers ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">{t("editor.showIcons")}</Label>
          <button
            role="switch"
            aria-checked={resume.settings.showIcons}
            aria-label={t("editor.showIcons")}
            onClick={() => updateSettings({ showIcons: !resume.settings.showIcons })}
            className={`w-10 h-5 rounded-full transition-colors ${
              resume.settings.showIcons ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                resume.settings.showIcons ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
