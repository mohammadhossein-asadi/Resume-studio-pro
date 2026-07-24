import type { Resume } from "@/types/resume";

interface WritingIssue {
  id: string;
  category: string;
  severity: "critical" | "warning" | "info";
  message: string;
  recommendation: string;
}

const weakVerbs = [
  "responsible for",
  "worked on",
  "helped with",
  "assisted",
  "was involved in",
  "participated in",
  "contributed to",
  "handled",
  "dealt with",
  "took care of",
  "managed",
  "was in charge of",
];

const buzzwords = [
  "synergy",
  "leverage",
  "utilize",
  "streamline",
  "optimize",
  "dynamic",
  "passionate",
  "results-driven",
  "team player",
  "go-getter",
  "think outside the box",
  "detail-oriented",
  "self-starter",
];

const passiveIndicators = [
  "was performed",
  "was completed",
  "was developed",
  "was created",
  "was implemented",
  "was designed",
  "was built",
  "was launched",
  "was delivered",
  "was managed",
];

export function analyzeWriting(resume: Resume): WritingIssue[] {
  const issues: WritingIssue[] = [];

  resume.sections.forEach((section) => {
    section.items.forEach((item) => {
      item.bullets.filter((b) => b).forEach((bullet, bulletIndex) => {
        const lowerBullet = bullet.toLowerCase();

        // Weak verb detection
        weakVerbs.forEach((verb) => {
          if (lowerBullet.startsWith(verb)) {
            issues.push({
              id: `weak-verb-${item.id}-${bulletIndex}`,
              category: "Writing",
              severity: "warning",
              message: `Bullet starts with weak phrase "${verb}"`,
              recommendation: "Start with a strong action verb (Led, Built, Achieved, Optimized, Delivered)",
            });
          }
        });

        // Passive voice detection
        passiveIndicators.forEach((passive) => {
          if (lowerBullet.includes(passive)) {
            issues.push({
              id: `passive-${item.id}-${bulletIndex}`,
              category: "Writing",
              severity: "warning",
              message: "Passive voice detected",
              recommendation: "Rewrite in active voice (e.g., 'Developed X' instead of 'X was developed')",
            });
          }
        });

        // Buzzword detection
        buzzwords.forEach((buzzword) => {
          if (lowerBullet.includes(buzzword)) {
            issues.push({
              id: `buzzword-${item.id}-${bulletIndex}`,
              category: "Writing",
              severity: "info",
              message: `Buzzword "${buzzword}" detected`,
              recommendation: "Replace with specific, concrete language",
            });
          }
        });

        // Missing metrics
        if (bullet.length > 40 && !/\d/.test(bullet)) {
          issues.push({
            id: `no-metrics-${item.id}-${bulletIndex}`,
            category: "Writing",
            severity: "info",
            message: "No metrics or numbers in bullet point",
            recommendation: "Add measurable results (%, $, # of users, time saved)",
          });
        }

        // Too long
        if (bullet.length > 150) {
          issues.push({
            id: `too-long-${item.id}-${bulletIndex}`,
            category: "Writing",
            severity: "info",
            message: "Bullet point is too long",
            recommendation: "Keep bullet points under 2 lines (100-150 characters)",
          });
        }

        // No impact verb
        const impactVerbs = [
          "increased", "decreased", "improved", "reduced", "saved",
          "generated", "achieved", "exceeded", "delivered", "launched",
          "built", "led", "created", "designed", "implemented",
          "developed", "optimized", "automated", "streamlined", "grew",
        ];
        const hasImpactVerb = impactVerbs.some((v) => lowerBullet.includes(v));
        if (!hasImpactVerb && bullet.length > 30) {
          issues.push({
            id: `no-impact-${item.id}-${bulletIndex}`,
            category: "Writing",
            severity: "info",
            message: "Consider adding impact-oriented language",
            recommendation: "Use verbs that demonstrate measurable impact",
          });
        }
      });
    });
  });

  return issues;
}
