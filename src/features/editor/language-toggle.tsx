"use client";

import { useI18n } from "@/lib/i18n/context";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "fa" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border hover:bg-muted transition-colors"
      aria-label={`Switch language. Current: ${locale === "en" ? "English" : "Persian"}`}
    >
      <Globe className="w-3.5 h-3.5" />
      {locale === "en" ? "EN" : "FA"}
    </button>
  );
}
