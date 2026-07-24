"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { useI18n } from "@/lib/i18n/context";
import type { ResumeSection } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, ChevronDown, ChevronUp, GripVertical } from "lucide-react";

interface SectionEditorProps {
  section: ResumeSection;
}

export function SectionEditor({ section }: SectionEditorProps) {
  const { addItem, removeItem, updateItem, addBullet, removeBullet, updateBullet, removeSection } =
    useResumeStore();
  const { t } = useI18n();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/50">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
          <h3 className="text-sm font-semibold">
            {t(`sections.${section.type}`)}
          </h3>
          <span className="text-xs text-muted-foreground">
            ({section.items.length})
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => addItem(section.id)}
            className="h-7 px-2"
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeSection(section.id)}
            className="h-7 px-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Section Items */}
      <div className="divide-y divide-border">
        {section.items.map((item) => (
          <div key={item.id} className="p-3 space-y-3">
            {/* Item Header */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {item.title || t("editor.itemTitle")}
                </span>
                {item.subtitle && (
                  <span className="text-xs text-muted-foreground">
                    at {item.subtitle}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(section.id, item.id);
                  }}
                  className="h-6 px-1.5 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
                {expandedItems.has(item.id) ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </div>

            {/* Expanded Content */}
            {expandedItems.has(item.id) && (
              <div className="space-y-2 pl-2 border-l-2 border-primary/20">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      {t("editor.itemTitle")}
                    </Label>
                    <Input
                      value={item.title}
                      onChange={(e) =>
                        updateItem(section.id, item.id, { title: e.target.value })
                      }
                      placeholder="Job Title"
                      className="h-7 text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      {t("editor.itemSubtitle")}
                    </Label>
                    <Input
                      value={item.subtitle || ""}
                      onChange={(e) =>
                        updateItem(section.id, item.id, { subtitle: e.target.value })
                      }
                      placeholder="Company"
                      className="h-7 text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      {t("editor.itemLocation")}
                    </Label>
                    <Input
                      value={item.location || ""}
                      onChange={(e) =>
                        updateItem(section.id, item.id, { location: e.target.value })
                      }
                      placeholder="Location"
                      className="h-7 text-xs"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label className="text-xs text-muted-foreground">
                        {t("editor.startDate")}
                      </Label>
                      <Input
                        type="month"
                        value={item.startDate}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { startDate: e.target.value })
                        }
                        className="h-7 text-xs"
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-xs text-muted-foreground">
                        {t("editor.endDate")}
                      </Label>
                      <Input
                        type="month"
                        value={item.endDate || ""}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { endDate: e.target.value })
                        }
                        disabled={item.current}
                        className="h-7 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Current Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`current-${item.id}`}
                    checked={item.current || false}
                    onChange={(e) =>
                      updateItem(section.id, item.id, {
                        current: e.target.checked,
                        endDate: e.target.checked ? "" : item.endDate,
                      })
                    }
                    className="rounded border-border"
                  />
                  <Label
                    htmlFor={`current-${item.id}`}
                    className="text-xs text-muted-foreground"
                  >
                    {t("editor.current")}
                  </Label>
                </div>

                {/* Bullet Points */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    {t("editor.bullets")}
                  </Label>
                  {item.bullets.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className="flex gap-2">
                      <Textarea
                        value={bullet}
                        onChange={(e) =>
                          updateBullet(section.id, item.id, bulletIndex, e.target.value)
                        }
                        placeholder="Achievement or responsibility..."
                        className="min-h-[60px] text-xs resize-none flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBullet(section.id, item.id, bulletIndex)}
                        className="h-7 px-1.5 text-destructive hover:text-destructive shrink-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addBullet(section.id, item.id)}
                    className="h-7 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {t("editor.addBullet")}
                  </Button>
                </div>

                {/* Tags */}
                <div>
                  <Label className="text-xs text-muted-foreground">
                    {t("editor.tags")}
                  </Label>
                  <Input
                    value={item.tags?.join(", ") || ""}
                    onChange={(e) =>
                      updateItem(section.id, item.id, {
                        tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                      })
                    }
                    placeholder="React, TypeScript, Node.js"
                    className="h-7 text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {section.items.length === 0 && (
          <div className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-2">
              No items yet
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem(section.id)}
              className="h-7 text-xs"
            >
              <Plus className="w-3 h-3 mr-1" />
              {t("editor.addItem")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
