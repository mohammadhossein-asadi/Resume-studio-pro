import type { Resume } from "@/types/resume";

export interface ATSIssue {
  id: string;
  category: string;
  severity: "critical" | "warning" | "info";
  message: string;
  recommendation: string;
}

export function calculateATSScore(resume: Resume): number {
  let score = 100;
  const issues = getATSIssues(resume);

  issues.forEach((issue) => {
    if (issue.severity === "critical") score -= 10;
    else if (issue.severity === "warning") score -= 5;
    else score -= 2;
  });

  return Math.max(0, Math.min(100, score));
}

export function getATSIssues(resume: Resume): ATSIssue[] {
  const issues: ATSIssue[] = [];

  // Contact validation
  if (!resume.personalInfo.email) {
    issues.push({
      id: "no-email",
      category: "Contact",
      severity: "critical",
      message: "Missing email address",
      recommendation: "Add a professional email address",
    });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resume.personalInfo.email)) {
    issues.push({
      id: "invalid-email",
      category: "Contact",
      severity: "critical",
      message: "Invalid email format",
      recommendation: "Use a standard email format (name@domain.com)",
    });
  }

  if (!resume.personalInfo.phone) {
    issues.push({
      id: "no-phone",
      category: "Contact",
      severity: "warning",
      message: "Missing phone number",
      recommendation: "Add a phone number for contact",
    });
  }

  if (!resume.personalInfo.firstName && !resume.personalInfo.lastName) {
    issues.push({
      id: "no-name",
      category: "Contact",
      severity: "critical",
      message: "Missing name",
      recommendation: "Add your full name at the top of the resume",
    });
  }

  // Summary check
  if (!resume.personalInfo.summary) {
    issues.push({
      id: "no-summary",
      category: "Content",
      severity: "warning",
      message: "Missing professional summary",
      recommendation: "Add a 2-3 sentence professional summary",
    });
  } else if (resume.personalInfo.summary.length < 50) {
    issues.push({
      id: "short-summary",
      category: "Content",
      severity: "info",
      message: "Summary is too short",
      recommendation: "Expand your summary to 2-3 sentences (100-300 characters)",
    });
  }

  // Experience check
  const experienceSection = resume.sections.find((s) => s.type === "experience");
  if (!experienceSection || experienceSection.items.length === 0) {
    issues.push({
      id: "no-experience",
      category: "Content",
      severity: "critical",
      message: "No work experience listed",
      recommendation: "Add your work experience with bullet points",
    });
  } else {
    experienceSection.items.forEach((item) => {
      if (!item.title) {
        issues.push({
          id: `exp-no-title-${item.id}`,
          category: "Content",
          severity: "critical",
          message: "Experience entry missing job title",
          recommendation: "Add a job title for each experience entry",
        });
      }
      if (!item.subtitle) {
        issues.push({
          id: `exp-no-company-${item.id}`,
          category: "Content",
          severity: "warning",
          message: `Experience "${item.title}" missing company name`,
          recommendation: "Add the company name",
        });
      }
      if (item.bullets.filter((b) => b).length === 0) {
        issues.push({
          id: `exp-no-bullets-${item.id}`,
          category: "Content",
          severity: "warning",
          message: `Experience "${item.title}" has no bullet points`,
          recommendation: "Add 3-5 achievement-oriented bullet points",
        });
      }
      item.bullets.filter((b) => b).forEach((bullet, i) => {
        if (bullet.length < 20) {
          issues.push({
            id: `exp-short-bullet-${item.id}-${i}`,
            category: "Writing",
            severity: "info",
            message: "Bullet point is too short",
            recommendation: "Expand with measurable results and impact",
          });
        }
        if (/^(Responsible for|Worked on|Helped with|Assisted)/i.test(bullet)) {
          issues.push({
            id: `exp-weak-verb-${item.id}-${i}`,
            category: "Writing",
            severity: "warning",
            message: "Bullet starts with a weak verb",
            recommendation: "Start with an action verb (Led, Built, Achieved, Optimized)",
          });
        }
        if (!/\d/.test(bullet) && bullet.length > 30) {
          issues.push({
            id: `exp-no-metrics-${item.id}-${i}`,
            category: "Writing",
            severity: "info",
            message: "Bullet point lacks metrics",
            recommendation: "Add numbers, percentages, or measurable outcomes",
          });
        }
      });
    });
  }

  // Education check
  const educationSection = resume.sections.find((s) => s.type === "education");
  if (!educationSection || educationSection.items.length === 0) {
    issues.push({
      id: "no-education",
      category: "Content",
      severity: "warning",
      message: "No education listed",
      recommendation: "Add your educational background",
    });
  }

  // Skills check
  const skillsSection = resume.sections.find((s) => s.type === "skills");
  if (!skillsSection || skillsSection.items.length === 0) {
    issues.push({
      id: "no-skills",
      category: "Content",
      severity: "warning",
      message: "No skills listed",
      recommendation: "Add relevant technical and soft skills",
    });
  } else {
    const allTags = skillsSection.items.flatMap((i) => i.tags || []);
    if (allTags.length < 5) {
      issues.push({
        id: "few-skills",
        category: "Content",
        severity: "info",
        message: "Consider adding more skills",
        recommendation: "List 8-15 relevant skills for better ATS matching",
      });
    }
  }

  // Length check
  const totalBullets = resume.sections.reduce(
    (acc, s) => acc + s.items.reduce((a, i) => a + i.bullets.filter((b) => b).length, 0),
    0
  );
  if (totalBullets < 5) {
    issues.push({
      id: "too-short",
      category: "Length",
      severity: "warning",
      message: "Resume appears too short",
      recommendation: "Aim for at least 5-8 bullet points across all experience",
    });
  }

  return issues;
}
