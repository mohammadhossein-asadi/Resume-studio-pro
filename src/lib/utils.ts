import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function formatDate(date: string, locale: string = 'en-US'): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString(locale === 'fa' ? 'fa-IR' : 'en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatDateRange(startDate: string, endDate?: string, current?: boolean, locale: string = 'en-US'): string {
  const start = formatDate(startDate, locale);
  if (current) {
    return `${start} - ${locale === 'fa' ? 'فعلی' : 'Present'}`;
  }
  if (!endDate) return start;
  const end = formatDate(endDate, locale);
  return `${start} - ${end}`;
}
