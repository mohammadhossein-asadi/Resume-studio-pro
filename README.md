# Resume Studio Pro

<div align="center">

![Resume Studio Pro Logo](public/logo.png)

**AI-Powered Professional Resume & Portfolio Builder**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-Latest-FF6F61?logo=nextauth&logoColor=white)](https://next-auth.js.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[🇬🇧 English](#-resume-studio-pro) • [🇮🇷 فارسی](README.fa.md) • [📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [🤝 Contributing](#-contributing)

</div>

---

## 🌟 Overview

**Resume Studio Pro** is a professional, **AI-powered resume and portfolio builder** that helps job seekers create **ATS-optimized resumes**, **beautiful portfolios**, and **personalized cover letters** in minutes. Features **AI content generation**, **20+ professional templates**, **ATS scoring**, **multi-format export**, and **Persian RTL support** for Iranian job market.

### 🎯 Why Resume Studio Pro?

| Problem | Resume Studio Pro Solution |
|---------|---------------------------|
| Resume writing is hard | **AI writer** — generates bullets, summaries, skills from experience |
| ATS rejects qualified candidates | **ATS optimizer** — keyword analysis, format compliance, scoring |
| Templates look generic | **20+ pro templates** — modern, creative, executive, academic, tech |
| No Persian resume support | **Full RTL** — Persian templates, Jalali dates, Persian numerals |
| Hard to tailor per job | **Job description analyzer** — match score, missing keywords, suggestions |

---

## ✨ Features

### 🤖 **AI Resume Writer**
- **Experience → Bullets** — Paste job description, get quantified achievements
- **Professional Summary** — 3-line elevator pitch from experience
- **Skills Extraction** — Technical + soft skills from projects
- **Cover Letter** — Personalized for each job description
- **LinkedIn Import** — Auto-fill from profile URL
- **Persian Content** — Native Persian generation for Iranian market

### 📄 **Templates (20+)**
| Category | Templates |
|----------|-----------|
| **Modern** | Clean, Minimal, Sidebar, Two-Column, Timeline |
| **Creative** | Portfolio, Designer, Developer, Marketing, Video |
| **Executive** | C-Suite, Director, VP, Board-ready |
| **Academic** | Researcher, Professor, PhD, Grad Student |
| **Tech** | Fullstack, Backend, Frontend, DevOps, Data, Mobile |
| **Persian** | ایرانی استاندارد، مدرن، твор، اکادمی، فنی |

### 🎯 **ATS Optimization**
- **Keyword Analysis** — Extract from job description, match against resume
- **Format Compliance** — Standard sections, standard fonts, no graphics
- **Scoring** — 0-100 ATS score with breakdown
- **Missing Keywords** — Prioritized list with suggestions
- **Section Ordering** — Optimal for ATS parsing

### 🌐 **Portfolio Builder**
- **Project Showcase** — Case studies with images, metrics, links
- **Blog/Articles** — Thought leadership, technical writing
- **Testimonials** — Client/colleague quotes with verification
- **Custom Domain** — yourname.com with SSL
- **Analytics** — Visitor tracking, download events

### 📤 **Export Options**
| Format | Use Case |
|--------|----------|
| **PDF** | Standard applications, printing |
| **DOCX** | Editable for recruiters |
| **Markdown** | GitHub README, Notion, Obsidian |
| **JSON** | API integration, backup |
| **HTML** | Portfolio website |
| **LaTeX** | Academic/research positions |

### 🌍 **Persian-First Experience**
| Feature | Implementation |
|---------|----------------|
| **RTL Editor** | TipTap with full RTL, Persian punctuation |
| **Typography** | Vazirmatn (UI), Noto Nastaliq (creative headers) |
| **Calendar** | Jalali dates in experience, education |
| **Numerals** | Persian digits (۱۲۳) in UI, optional in PDF |
| **Persian Templates** | Right-to-left layouts, Persian section labels |
| **Persian Keywords** | ATS optimization for Iranian job boards |

---

## 🏗️ Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js (App Router) |
| **Runtime** | React 19 |
| **Language** | TypeScript 5 (Strict) |
| **Styling** | Tailwind CSS v4 |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | NextAuth.js |
| **AI** | OpenAI GPT-4 / Claude |
| **Editor** | TipTap (ProseMirror) |
| **PDF** | @react-pdf/renderer / Puppeteer |
| **Deployment** | Vercel + PostgreSQL |

### Project Structure

```
Resume-studio-pro/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   └── templates/              # Template previews
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (builder)/
│   │   │   ├── resume/         # Resume builder
│   │   │   │   ├── basics/
│   │   │   │   ├── experience/
│   │   │   │   ├── education/
│   │   │   │   ├── skills/
│   │   │   │   ├── projects/
│   │   │   │   └── preview/
│   │   │   ├── portfolio/      # Portfolio builder
│   │   │   ├── cover-letter/   # Cover letter generator
│   │   │   ├── ats/            # ATS analyzer
│   │   │   └── templates/      # Template gallery
│   │   ├── api/
│   │   │   ├── ai/             # Content generation
│   │   │   ├── ats/            # ATS scoring
│   │   │   ├── export/         # PDF, DOCX, etc.
│   │   │   └── templates/
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── builder/
│   │   │   ├── ResumeEditor.tsx
│   │   │   ├── SectionEditor.tsx
│   │   │   ├── TemplatePreview.tsx
│   │   │   └── ATSPanel.tsx
│   │   ├── editor/             # TipTap extensions
│   │   ├── ui/
│   │   └── export/
│   ├── hooks/
│   │   ├── useResume.ts
│   │   ├── useATS.ts
│   │   └── useAI.ts
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── ai/
│   │   ├── ats/
│   │   ├── export/
│   │   │   ├── pdf.ts
│   │   │   ├── docx.ts
│   │   │   └── latex.ts
│   │   └── utils.ts
│   ├── store/
│   └── types/
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+
- **PostgreSQL** 15+
- **OpenAI/Claude** API key

### Installation

```bash
git clone https://github.com/mohammadhossein-asadi/Resume-studio-pro.git
cd Resume-studio-pro
npm install
cp .env.example .env.local
# Edit .env.local
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

### Environment Variables

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# AI
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...

# OAuth
GITHUB_CLIENT_ID=...
GOOGLE_CLIENT_ID=...

# Optional
RESEND_API_KEY=...
EMAIL_FROM="Resume Studio <noreply@resumestudio.app>"
```

---

## 🛠️ Development

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run start        # Production server
npm run db:studio    # Prisma Studio
npm run lint         # ESLint
npm test             # Vitest
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Architecture](docs/ARCHITECTURE.md) | System design |
| [AI Prompts](docs/AI_PROMPTS.md) | Resume generation prompts |
| [ATS Algorithm](docs/ATS_ALGORITHM.md) | Scoring methodology |
| [Templates](docs/TEMPLATES.md) | Template development |
| [Deployment](docs/DEPLOYMENT.md) | Vercel guide |

---

## 🚀 Deployment

### Vercel + Neon

```bash
vercel --prod
# Add env vars
# Connect Neon PostgreSQL
```

---

## 🔒 Security

- **NextAuth.js** sessions
- **Prisma** SQL injection prevention
- **Zod** validation
- **Rate limiting** on AI endpoints
- **CSP** headers
- **PDF generation** sandboxed

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📋 Roadmap

- [x] AI resume writer
- [x] 20+ templates
- [x] ATS optimizer
- [x] Portfolio builder
- [x] Cover letter generator
- [x] Multi-format export
- [x] Persian RTL support
- [ ] LinkedIn import
- [ ] Job board integration (LinkedIn, Indeed, Iranian sites)
- [ ] Interview prep integration
- [ ] Mobile app (React Native)
- [ ] White-label for universities/bootcamps

---

## 📄 License

**MIT License** — See [LICENSE](LICENSE)

---

## 🙏 Acknowledgments

- **Next.js**, **Prisma**, **NextAuth.js**, **Tailwind CSS**
- **OpenAI**, **Anthropic** — AI models
- **TipTap** — Rich text editor
- **@react-pdf/renderer** — PDF generation
- **Vazirmatn Font** — Persian typography
- **Noto Nastaliq** — Calligraphic font

---

## 📞 Support & Community

- **Issues**: [GitHub Issues](https://github.com/mohammadhossein-asadi/Resume-studio-pro/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mohammadhossein-asadi/Resume-studio-pro/discussions)

---

<div align="center">

**Built with ❤️ for job seekers who want to stand out**

[🇬🇧 English](README.md) • [🇮🇷 فارسی](README.fa.md) • [⭐ Star us on GitHub](https://github.com/mohammadhossein-asadi/Resume-studio-pro)

</div>