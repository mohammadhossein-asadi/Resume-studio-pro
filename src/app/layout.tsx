import type { Metadata, Viewport } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resume Studio Pro — AI-Powered Bilingual Resume Builder",
  description:
    "Build ATS-optimized resumes with AI writing analysis, 28+ premium templates, and bilingual English/Persian support. The world's most advanced resume builder.",
  keywords: [
    "resume builder",
    "CV builder",
    "ATS resume",
    "bilingual resume",
    "Persian resume",
    "AI resume",
    "professional resume",
    "resume templates",
  ],
  openGraph: {
    title: "Resume Studio Pro — AI-Powered Bilingual Resume Builder",
    description:
      "Build ATS-optimized resumes with AI writing analysis, 28+ premium templates, and bilingual English/Persian support.",
    type: "website",
    siteName: "Resume Studio Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Studio Pro — AI-Powered Bilingual Resume Builder",
    description:
      "Build ATS-optimized resumes with AI writing analysis, 28+ premium templates, and bilingual English/Persian support.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`antialiased ${inter.variable} ${vazirmatn.variable}`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
