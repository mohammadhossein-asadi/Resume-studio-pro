"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface UIState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
  activeSectionId: string | null;
  setActiveSectionId: (id: string | null) => void;
  sidebarTab: "editor" | "settings" | "ats" | "quality";
  setSidebarTab: (tab: "editor" | "settings" | "ats" | "quality") => void;
  previewZoom: number;
  setPreviewZoom: (zoom: number) => void;
  showHeatmap: boolean;
  toggleHeatmap: () => void;
  isFullscreen: boolean;
  setIsFullscreen: (fullscreen: boolean) => void;
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.setAttribute("data-theme", resolved);
  return resolved;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: "light",
      resolvedTheme: "light",
      setTheme: (theme) => {
        const resolved = applyTheme(theme);
        set({ theme, resolvedTheme: resolved });
      },
      activeSectionId: null,
      setActiveSectionId: (id) => set({ activeSectionId: id }),
      sidebarTab: "editor",
      setSidebarTab: (tab) => set({ sidebarTab: tab }),
      previewZoom: 0.75,
      setPreviewZoom: (zoom) => set({ previewZoom: zoom }),
      showHeatmap: false,
      toggleHeatmap: () => set((state) => ({ showHeatmap: !state.showHeatmap })),
      isFullscreen: false,
      setIsFullscreen: (fullscreen) => set({ isFullscreen: fullscreen }),
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({
        previewZoom: state.previewZoom,
        theme: state.theme,
      }),
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
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.resolvedTheme = applyTheme(state.theme);
        }
      },
    }
  )
);
