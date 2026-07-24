"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { I18nContext } from "./context";
import { useResumeStore } from "@/store/resume-store";
import type { Locale } from "@/types/resume";
import en from "./locales/en.json";
import fa from "./locales/fa.json";

const translations = { en, fa };

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  return path.split(".").reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return path;
  }, obj) as string;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const language = useResumeStore((s) => s.resume.language);
  const locale: Locale = language === "mixed" ? "en" : language;
  const [mounted, setMounted] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Skip setting on initial mount to avoid hydration mismatch
    // The server renders lang="en" dir="ltr" which matches the default
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale, mounted]);

  const setLocale = useCallback((newLocale: Locale) => {
    const current = useResumeStore.getState().resume;
    useResumeStore.getState().setResume({
      ...current,
      language: newLocale,
      updatedAt: new Date().toISOString(),
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      const translation = translations[locale] as Record<string, unknown>;
      return getNestedValue(translation, key);
    },
    [locale]
  );

  return (
    <I18nContext.Provider
      value={{
        locale,
        dir: locale === "fa" ? "rtl" : "ltr",
        setLocale,
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}
