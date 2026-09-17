<div align="center">

# Resume Studio Pro

### World's Most Advanced Bilingual AI-Ready Resume Builder

A next-generation resume builder with AI-powered content generation, bilingual support (EN/FA), real-time preview, ATS optimization, and export to multiple formats — built with Next.js 16, React Hook Form, and Zustand.

[![Next.js 16](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## Overview

Resume Studio Pro is the world's most advanced bilingual resume builder, designed for the AI era. It combines intelligent content generation, real-time ATS scoring, bilingual (English/Persian) support with RTL layout, and professional templates — all in a seamless drag-and-drop interface with live preview.

---

## Features

| Feature | Description |
|:--------|:------------|
| **AI Content Generation** | GPT-powered bullet points, summaries, and skill descriptions tailored to target roles |
| **Bilingual EN/FA** | Full English/Persian support with RTL layout, Vazirmatn font, and instant switching |
| **Real-Time Preview** | Split-pane editor with live PDF preview as you type |
| **ATS Optimization** | Built-in ATS scoring with keyword analysis and format validation |
| **Professional Templates** | 10+ templates optimized for different industries and experience levels |
| **Drag-and-Drop Sections** | Reorder, add, remove sections with intuitive drag-and-drop |
| **Multi-Format Export** | PDF, DOCX, Markdown, JSON, and plain text |
| **Version History** | Git-like version control with branching and restore |
| **AI Interview Prep** | Generates likely interview questions based on resume content |
| **Dark/Light Theme** | System-aware with manual toggle |
| **Offline Support** | PWA with local storage persistence |

---

## Tech Stack

| Layer | Technologies |
|:------|:-------------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 (strict) |
| **Styling** | Tailwind CSS 4.3, CSS Variables |
| **Forms** | React Hook Form 7, Zod 4 validation |
| **State** | Zustand 5 with persistence |
| **Animation** | Motion (Framer Motion) 12 |
| **Icons** | Lucide React |
| **PDF Generation** | @react-pdf/renderer |
| **AI Integration** | OpenAI API (pluggable provider architecture) |

---

## Project Structure

```
resume-studio-pro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── builder/            # Resume builder pages
│   │   ├── templates/          # Template gallery
│   │   ├── api/                # API routes (AI, export, ATS)
│   │   └── layout.tsx          # Root layout with providers
│   ├── components/
│   │   ├── builder/            # Builder canvas, sections, toolbar
│   │   ├── preview/            # Live preview components
│   │   ├── templates/          # Template components
│   │   ├── ai/                 # AI assistant, suggestions
│   │   ├── export/             # Export dialogs
│   │   ├── ui/                 # shadcn/ui primitives
│   │   └── layout/             # Header, sidebar, footer
│   ├── features/               # Feature modules (ATS, AI, i18n)
│   ├── lib/                    # Utilities, PDF generator, AI client
│   ├── store/                  # Zustand stores (resume, settings, history)
│   ├── types/                  # TypeScript interfaces
│   └── styles/                 # Global styles, Tailwind config
├── public/                     # Static assets, fonts (Vazirmatn)
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation

```bash
git clone https://github.com/mohammadhossein-asadi/Resume-studio-pro.git
cd Resume-studio-pro
npm install
```

### Environment Configuration

Create a `.env.local` file:

```env
# AI Provider (optional)
OPENAI_API_KEY="sk-..."
# or
ANTHROPIC_API_KEY="sk-ant-..."
# or
GOOGLE_GEMINI_API_KEY="..."
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:3000` with Turbopack.

### Production Build

```bash
npm run build
npm run start
```

---

## Key Architecture Decisions

### Pluggable AI Provider Architecture
The `lib/ai/providers/` directory contains adapters for OpenAI, Anthropic, and Google Gemini — switch providers via environment variable without code changes.

### Bilingual RTL-First Design
Persian (Farsi) is a first-class locale: RTL layout, Vazirmatn font with 6 weights, numeral localization, and mirrored UI components — not just translated strings.

### Zod-Validated Resume Schema
Single source of truth for resume structure. Zod schemas power form validation, AI output parsing, PDF generation, and export serialization — eliminating type drift.

### PDF Generation via @react-pdf/renderer
Declarative PDF generation using React components. Templates are React components that render to both the live preview and PDF output — guaranteed visual parity.

### Version Control with Immutable History
Each save creates an immutable snapshot with metadata (timestamp, AI-assisted flag, template). Branching enables exploring variations without losing the original.

---

## Scripts

| Command | Description |
|:--------|:------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint + Next.js linting |

---

## Roadmap

- [ ] Cover letter generator with AI
- [ ] LinkedIn profile import/sync
- [ ] Collaborative editing (real-time multi-user)
- [ ] Template marketplace
- [ ] ATS integration (Greenhouse, Lever, Workday)
- [ ] Mobile app (React Native)
- [ ] AI career path recommendations

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Mohammadhossein Asadi** — Frontend & Full-Stack Engineer

[![GitHub](https://img.shields.io/badge/GitHub-mohammadhossein--asadi-0a0a0a?style=flat-square&logo=github)](https://github.com/mohammadhossein-asadi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mohammadhossein--asadi-0a66c2?style=flat-square&logo=linkedin)](https://linkedin.com/in/mohammadhossein-asadi)

</div>