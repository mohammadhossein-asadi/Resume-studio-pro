"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Resume, ResumeSection, SectionItem, SectionType } from "@/types/resume";
import { createDefaultResume, createSampleResume } from "@/lib/defaults";
import { generateId } from "@/lib/utils";

interface ResumeState {
  resume: Resume;
  setResume: (resume: Resume) => void;
  updatePersonalInfo: (field: string, value: string) => void;
  updateSettings: (settings: Partial<Resume["settings"]>) => void;
  addSection: (type: SectionType) => void;
  removeSection: (sectionId: string) => void;
  updateSection: (sectionId: string, updates: Partial<ResumeSection>) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  addItem: (sectionId: string) => void;
  removeItem: (sectionId: string, itemId: string) => void;
  updateItem: (sectionId: string, itemId: string, updates: Partial<SectionItem>) => void;
  addBullet: (sectionId: string, itemId: string) => void;
  removeBullet: (sectionId: string, itemId: string, bulletIndex: number) => void;
  updateBullet: (sectionId: string, itemId: string, bulletIndex: number, value: string) => void;
  loadSampleResume: () => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: createSampleResume(),

      setResume: (resume) => set({ resume }),

      updatePersonalInfo: (field, value) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, [field]: value },
            updatedAt: new Date().toISOString(),
          },
        })),

      updateSettings: (settings) =>
        set((state) => ({
          resume: {
            ...state.resume,
            settings: { ...state.resume.settings, ...settings },
            updatedAt: new Date().toISOString(),
          },
        })),

      addSection: (type) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: [
              ...state.resume.sections,
              {
                id: generateId(),
                type,
                title: type.charAt(0).toUpperCase() + type.slice(1),
                items: [],
                visible: true,
                order: state.resume.sections.length,
              },
            ],
            updatedAt: new Date().toISOString(),
          },
        })),

      removeSection: (sectionId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.filter((s) => s.id !== sectionId),
            updatedAt: new Date().toISOString(),
          },
        })),

      updateSection: (sectionId, updates) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.map((s) =>
              s.id === sectionId ? { ...s, ...updates } : s
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      reorderSections: (fromIndex, toIndex) =>
        set((state) => {
          const sections = [...state.resume.sections];
          const [removed] = sections.splice(fromIndex, 1);
          sections.splice(toIndex, 0, removed);
          return {
            resume: {
              ...state.resume,
              sections: sections.map((s, i) => ({ ...s, order: i })),
              updatedAt: new Date().toISOString(),
            },
          };
        }),

      toggleSectionVisibility: (sectionId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.map((s) =>
              s.id === sectionId ? { ...s, visible: !s.visible } : s
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      addItem: (sectionId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: [
                      ...s.items,
                      {
                        id: generateId(),
                        title: "",
                        subtitle: "",
                        location: "",
                        startDate: "",
                        endDate: "",
                        current: false,
                        description: "",
                        bullets: [""],
                        tags: [],
                      },
                    ],
                  }
                : s
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      removeItem: (sectionId, itemId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.map((s) =>
              s.id === sectionId
                ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
                : s
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      updateItem: (sectionId, itemId, updates) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: s.items.map((i) =>
                      i.id === itemId ? { ...i, ...updates } : i
                    ),
                  }
                : s
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      addBullet: (sectionId, itemId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: s.items.map((i) =>
                      i.id === itemId
                        ? { ...i, bullets: [...i.bullets, ""] }
                        : i
                    ),
                  }
                : s
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      removeBullet: (sectionId, itemId, bulletIndex) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: s.items.map((i) =>
                      i.id === itemId
                        ? {
                            ...i,
                            bullets: i.bullets.filter((_, idx) => idx !== bulletIndex),
                          }
                        : i
                    ),
                  }
                : s
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      updateBullet: (sectionId, itemId, bulletIndex, value) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: s.items.map((i) =>
                      i.id === itemId
                        ? {
                            ...i,
                            bullets: i.bullets.map((b, idx) =>
                              idx === bulletIndex ? value : b
                            ),
                          }
                        : i
                    ),
                  }
                : s
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      loadSampleResume: () => set({ resume: createSampleResume() }),

      resetResume: () => set({ resume: createDefaultResume() }),
    }),
    {
      name: "resume-storage",
      storage: {
        getItem: (name) => {
          try {
            const str = localStorage.getItem(name);
            return str ? JSON.parse(str) : null;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch {
            // Storage full or unavailable - silently fail
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch {
            // Silently fail
          }
        },
      },
    }
  )
);
