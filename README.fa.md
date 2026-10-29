<div align="center">

# Resume Studio Pro

### پیشرفته‌ترین سازنده‌ی رزومه‌ی هوشمندزاده و دوزبانه‌ی دنیای

سازنده‌ی نسل جدید رزومه با تولید محتوا به‌قدرت هوش مصنوعی، پشتیبانی دوزبانه (ان/فارسی)، پیش‌نمایش بلادرنگ، بهینه‌سازی ATS و تصدیر به چندین فرمت — با Next.js 16، React Hook Form و Zustand.

[![Next.js 16](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## نمای کلی

Resume Studio Pro پیشرفته‌ترین سازنده‌ی رزومه‌ی دنیا در عصر هوشمندزاده است، برای عصر هوشمندزاده طراحی شده. بهبوددهنده‌های محتوا هوشمند، امتیازدهی آنی ATS، پشتیبانی دوزبانه (انگلیسی/فارسی) با لایه‌بندی RTL و الگوهای حرفه‌ای — همه در یک رابط کش‌و‌رها با پیش‌نمایش زنده.

---

## ویژگی‌ها

| ویژگی | توضیح |
|:--------|:------------|
| **تولید محتوا با هوش مصنوعی** | نکات، خلاصه‌ها و توصیفات مهارت تولیدشده با GPT متناسب با نقش‌های مقصد |
| **دوزبانه ان/فارسی** | پشتیبانی کامل انگلیسی/فارسی با لایه‌بندی RTL، فونت Vazirmatn و تعویض آنی |
| **پیش‌نمایش بلادرنگ** | ویراستار پنل-تقسیم‌شده با پیش‌نمایش PDF زنده هنگامی که می‌نویسید |
| **بهینه‌سازی ATS** | امتیازدهی STS درونی با تحلیل کلمه‌کلید و اعتبارسنجی فرمت |
| **الگوهای حرفه‌ای** | ۱۰+ الگوی بهینه‌شده برای صنایع و سطوح تجربه مختلف |
| **قسمت‌های کش‌و‌رها** | بازترتیب، افزودن، حذف بخش‌ها با کش‌و‌رها شهودی |
| **تصدیر فرمت‌های چندگانه** | PDF، DOCX، Markdown، JSON و متن ساده |
| **تاریخچه نسخه** | کنترل نسخه شبیه به Git با شاخه‌بندی و بازگردانی |
| **آماده‌سازی مصاحبه با هوشمند** | تولید سوالات احتمالی مصاحبه بر اساس محتوای رزومه |
| **تم تاریک/روشن** | آگاه به سیستم با تعویض دستی |
| **پشتیبانی آفلاین** | PWA با پایداری در ذخیره‌ی محلی |

---

## پشته فناوری

| لایه | فناوری‌ها |
|:------|:-------------|
| **فریم‌ورک** | Next.js 16 (App Router, Turbopack) |
| **زبان** | TypeScript 5 (صریح) |
| **استایلینگ** | Tailwind CSS 4.3، متغیرهای CSS |
| **فرم‌ها** | React Hook Form 7، اعتبارسنجی Zod 4 |
| **وضعیت** | Zustand 5 با پایداری |
| **انیمیشن** | Motion (Framer Motion) 12 |
| **آیکون‌ها** | Lucide React |
| **تولید PDF** | @react-pdf/renderer |
| **یکپارچگی هوشمند** | API OpenAI (معماری ارائه‌دهنده قابل‌تعویض) |

---

## ساختار پروژه

```
resume-studio-pro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── builder/            # صفحات سازنده‌ی رزومه
│   │   ├── templates/          | گالریالگو
│   │   ├── api/                # مسیرهای API (هویت، تصدیر، ATS)
│   │   └── layout.tsx          # لی‌اوت ریشه با ارائه‌دهندگان
│   ├── components/
│   │   ├── builder/            # بوم سازنده، بخش‌ها، نوار ابزار
│   │   ├── preview/            # کامپوننت‌های پیش‌نمایش زنده
│   │   ├── templates/          # کامپوننت‌های الگو
│   │   ├── ai/                 # دستیار هوشمند، پیشنهادها
│   │   ├── export/             # دیالوگ‌های تصدیر
│   │   ├── ui/                 # پایه‌های shadcn/ui
│   │   └── layout/             # سربرگ، نوار کنار، پانویس
│   ├── features/               # ماژول‌های ویژگی (ATS، هوشمند، i18n)
│   ├── lib/                    # ابزارها، تولیدکننده PDF، کلاینت هوشمند
│   ├── store/                  # فروشگاه‌های Zustand (رزومه، تنظیمات، تاریخچه)
│   ├── types/                  # رابط‌های TypeScript
│   └── styles/                 # استایل‌های جهانی، پیکربندی Tailwind
├── public/                     # دارایی‌های استاتیک، فونت‌ها (Vazirmatn)
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## شروع سریع

### پیش‌نیازها

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### نصب

```bash
git clone https://github.com/mohammadhossein-asadi/Resume-studio-pro.git
cd Resume-studio-pro
npm install
```

### پیکربندی محیط

فایل `.env.local` بسازید:

```env
# ارائه‌دهنده هوشمند (اختیاری)
OPENAI_API_KEY="sk-..."
# یا
ANTHROPIC_API_KEY="sk-ant-..."
# یا
GOOGLE_GEMINI_API_KEY="..."
```

### توسعه

```bash
npm run dev
```

با Turbopack در آدرس `http://localhost:3000` باز می‌شود.

### بیلد نسخه‌ی تولید

```bash
npm run build
npm run start
```

---

## تصمیمات کلیدی معماری

### معماری ارائه‌دهنده هوشمند قابل‌تعویض
دایرکتوری `lib/ai/providers/` کلاسترهای Open массив، Anthropic و Google Gemini را در خود جای می‌دهد — ارائه‌دهنده را از طریق متغیر محیط بدون تغییر کد تعویض کنید.

### طراحی اول‌RTL دوزبانه
فارسی (فارسی) یک لُکال زمان‌بندی اول است: لایه‌بندی RTL، فونت Vazirmatn با ۶ وزن، بوم‌سازی اعداد و کامپوننت‌های رابط منعکس‌شده — فقط رشته‌های ترجمه‌شده نیست.

### اسکیمای رزومه اعتبارسنجی‌شده با Zod
منبع حقیقت واحد برای ساختار رزومه. اسکیماهای Zod اعتبارسنجی فرم، پارس خروجی هوشمند، تولید PDF و سریالایز تصدیر را پیشران می‌کنند — حذف انحراف تایپی.

### تولید PDF از طریق @react-pdf/renderer
تولید PDF اعلام‌به‌گزارش با کامپوننت‌های React. الگوها کامپوننت‌های React هستند که هم به پیش‌نمایش زنده و هم خروجی PDF رندر می‌شوند — همسان‌نگری بصری تضمین‌شده.

### کنترل نسخه با تاریخچه‌ی غیرقابل‌تغییر
هر ذخیره‌ی یک snapshot غیرقابل‌تغییر با فراداده ( Timestamp، پرچم کمک‌هوشمند، الگو) می‌سازد. شاخه‌بندی امکان کاوش در تغییرات را بدون از دست دادن اصلی فراهم می‌کند.

---

## اسکریپت‌ها

| دستور | توضیح |
|:--------|:------------|
| `npm run dev` | راه‌اندازی سرور توسعه با Turbopack |
| `npm run build` | بیلد نسخه‌ی تولید |
| `npm run start` | اجرای سرور نسخه‌ی تولید |
| `npm run lint` | ESLint + لینتینگ Next.js |

---

## نقشه راه

- [ ] مولد نامه پوشش با هوشمند
- [ ] وارد/همghSync پروفایل LinkedIn
- [ ] ویرایش مشارکتی (چند-کاربر آنی)
- [ ] بازار الگوها
- [ ] یکپارچگی ATS (Greenhouse، Lever，Workday)
- [ ] اپلیکیشن موبایل (React Native)
- [ ] پیشنهاد مسیر شغلی با هوشمند

---

## مجوز

این پروژه تحت [مجوز MIT](LICENSE) منتشر شده است.

---

<div align="center">

**Mohammadhossein Asadi** — مهندس فرانت‌اند و فرانت‌به‌کل

[![GitHub](https://img.shields.io/badge/GitHub-mohammadhossein--asadi-0a0a0a?style=flat-square&logo=github)](https://github.com/mohammadhossein-asadi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mohammadhossein--asadi-0a66c2?style=flat-square&logo=linkedin)](https://linkedin.com/in/mohammadhossein-asadi)

</div>
