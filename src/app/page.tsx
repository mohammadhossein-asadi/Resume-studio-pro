"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  FileText,
  Sparkles,
  Globe,
  BarChart3,
  Download,
  Palette,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "ATS-Optimized",
    description: "Beat applicant tracking systems with intelligent formatting and keyword optimization.",
  },
  {
    icon: Sparkles,
    title: "AI Writing Engine",
    description: "Transform weak bullet points into powerful, achievement-driven statements.",
  },
  {
    icon: Globe,
    title: "Bilingual Support",
    description: "Seamless English and Persian with automatic RTL/LTR switching.",
  },
  {
    icon: BarChart3,
    title: "Quality Analysis",
    description: "Real-time scoring across 14 dimensions including ATS, writing, and impact.",
  },
  {
    icon: Download,
    title: "Professional Export",
    description: "Export to PDF with embedded fonts, vector graphics, and high DPI.",
  },
  {
    icon: Palette,
    title: "28+ Premium Templates",
    description: "Industry-specific designs for every career path and style.",
  },
];

const stats = [
  { value: "14", label: "Quality Dimensions" },
  { value: "28+", label: "Premium Templates" },
  { value: "2", label: "Languages" },
  { value: "100+", label: "ATS Rules" },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">RS</span>
            </div>
            <span className="font-semibold text-lg">Resume Studio Pro</span>
          </div>
          <button
            onClick={() => router.push("/editor")}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Open Editor
          </button>
        </div>
      </nav>

      <main>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Resume Builder
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Build Resumes That
              <span className="text-primary"> Get Interviews</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The world&apos;s most advanced bilingual resume builder. ATS-optimized,
              recruiter-tested, and powered by intelligent writing analysis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/editor")}
                className="group px-8 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold text-base hover:opacity-90 transition-all flex items-center gap-2"
              >
                Start Building
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/editor")}
                className="px-8 py-3.5 border border-border rounded-xl font-medium text-base hover:bg-muted transition-colors"
              >
                View Templates
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional tools designed to make your resume stand out
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow cursor-default"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
              >
                <feature.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Three steps to your perfect resume
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter Your Details",
                description: "Fill in your information using our intelligent forms with real-time validation.",
              },
              {
                step: "02",
                title: "Get AI Analysis",
                description: "Receive instant feedback on ATS compatibility, writing quality, and impact.",
              },
              {
                step: "03",
                title: "Export & Apply",
                description: "Download your professional resume as PDF with embedded fonts and perfect formatting.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-primary/20 mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-12 md:p-16 rounded-3xl bg-primary text-primary-foreground text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Stand Out?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of professionals who landed their dream jobs
              with resumes built on Resume Studio Pro.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/editor")}
                className="group px-8 py-3.5 bg-white text-primary rounded-xl font-semibold text-base hover:bg-white/90 transition-all flex items-center gap-2"
              >
                Build Your Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-primary-foreground/70">
              {["ATS Optimized", "Bilingual", "Professional Templates", "Free to Use"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-[10px]">RS</span>
            </div>
            <span>Resume Studio Pro</span>
          </div>
          <span>Built with care for your career</span>
        </div>
      </footer>
    </div>
  );
}
