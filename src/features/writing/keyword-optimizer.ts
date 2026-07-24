import type { Resume } from "@/types/resume";

export interface KeywordIssue {
  id: string;
  type: "missing" | "frequency" | "placement" | "balance" | "stuffing";
  severity: "critical" | "warning" | "info";
  message: string;
  keyword?: string;
  recommendation: string;
}

const industryKeywords: Record<string, string[]> = {
  software_engineering: [
    "JavaScript", "TypeScript", "Python", "Java", "React", "Node.js", "AWS",
    "Docker", "Kubernetes", "CI/CD", "REST API", "GraphQL", "SQL", "NoSQL",
    "Git", "Agile", "Scrum", "Microservices", "TDD", "DevOps",
  ],
  data_science: [
    "Machine Learning", "Deep Learning", "Python", "R", "TensorFlow", "PyTorch",
    "Pandas", "NumPy", "SQL", "Tableau", "Power BI", "Statistics",
    "A/B Testing", "Data Visualization", "ETL", "Big Data", "Spark",
  ],
  product_management: [
    "Roadmap", "Sprint", "Agile", "Scrum", "KPI", "OKR", "User Story",
    "MVP", "Stakeholder", "Cross-functional", "Go-to-Market", "PRD",
    "A/B Testing", "User Research", "Data-driven", "Product Strategy",
  ],
  marketing: [
    "SEO", "SEM", "PPC", "Content Marketing", "Social Media", "Email Marketing",
    "Analytics", "Conversion Rate", "ROI", "Brand Strategy", "Campaign",
    "Marketing Automation", "HubSpot", "Google Analytics", "A/B Testing",
  ],
  finance: [
    "Financial Modeling", "Excel", "SQL", "Bloomberg", "GAAP", "IFRS",
    "Budgeting", "Forecasting", "Variance Analysis", "P&L", "Cash Flow",
    "Valuation", "DCF", "Excel", "Tableau", "Power BI",
  ],
  healthcare: [
    "Patient Care", "EHR", "EMR", "Epic", "Cerner", "HIPAA", "Clinical",
    "Triage", "Assessment", "Diagnosis", "Treatment Plan", "Documentation",
    "Compliance", "Quality Improvement", "Patient Safety",
  ],
  design: [
    "Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator", "InVision",
    "User Research", "Wireframing", "Prototyping", "Design System",
    "Typography", "Color Theory", "Responsive Design", "Accessibility",
  ],
  sales: [
    "CRM", "Salesforce", "Pipeline", "Quota", "Closing", "Prospecting",
    "Negotiation", "Account Management", "Revenue", "Upsell", "Cross-sell",
    "B2B", "B2C", "Enterprise", "SaaS",
  ],
};

function extractWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s+#.]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function countOccurrences(text: string, keyword: string): number {
  const lower = text.toLowerCase();
  const keywordLower = keyword.toLowerCase();
  let count = 0;
  let index = 0;
  while ((index = lower.indexOf(keywordLower, index)) !== -1) {
    count++;
    index += keywordLower.length;
  }
  return count;
}

function detectIndustry(text: string): string {
  const lower = text.toLowerCase();
  const scores: Record<string, number> = {};

  for (const [industry, keywords] of Object.entries(industryKeywords)) {
    scores[industry] = keywords.filter((kw) => lower.includes(kw.toLowerCase())).length;
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[1] > 0 ? sorted[0][0] : "software_engineering";
}

export function analyzeKeywords(
  resume: Resume,
  targetIndustry?: string,
  jobDescription?: string
): KeywordIssue[] {
  const issues: KeywordIssue[] = [];
  const fullText = [
    resume.personalInfo.summary,
    ...resume.sections.flatMap((s) =>
      s.items.flatMap((i) => [i.title, i.subtitle, i.description, ...i.bullets])
    ),
  ]
    .filter(Boolean)
    .join(" ");

  // Detect industry from resume content if not specified
  const industry = targetIndustry || detectIndustry(fullText);
  const keywords = industryKeywords[industry] || industryKeywords.software_engineering;

  // Check for missing keywords
  const missingKeywords = keywords.filter(
    (kw) => !fullText.toLowerCase().includes(kw.toLowerCase())
  );

  if (missingKeywords.length > keywords.length * 0.5) {
    issues.push({
      id: "many-missing-keywords",
      type: "missing",
      severity: "critical",
      message: `Missing ${missingKeywords.length} relevant keywords for ${industry.replace(/_/g, " ")}`,
      recommendation: `Add relevant keywords: ${missingKeywords.slice(0, 5).join(", ")}${missingKeywords.length > 5 ? "..." : ""}`,
    });
  } else if (missingKeywords.length > 2) {
    issues.push({
      id: "some-missing-keywords",
      type: "missing",
      severity: "warning",
      message: `Consider adding ${missingKeywords.length} missing keywords`,
      recommendation: `Missing: ${missingKeywords.slice(0, 5).join(", ")}${missingKeywords.length > 5 ? "..." : ""}`,
    });
  }

  // Check keyword frequency (stuffing detection)
  keywords.forEach((keyword) => {
    const count = countOccurrences(fullText, keyword);
    if (count > 5) {
      issues.push({
        id: `stuffing-${keyword.toLowerCase().replace(/\s+/g, "-")}`,
        type: "stuffing",
        severity: "warning",
        message: `"${keyword}" appears ${count} times — may look like keyword stuffing`,
        keyword,
        recommendation: `Reduce to 2-3 strategic placements of "${keyword}"`,
      });
    }
  });

  // Check placement — keywords should be in summary and experience bullets
  const summaryText = resume.personalInfo.summary || "";
  const experienceBullets = resume.sections
    .filter((s) => s.type === "experience")
    .flatMap((s) => s.items.flatMap((i) => i.bullets))
    .join(" ");

  const summaryKeywords = keywords.filter((kw) =>
    summaryText.toLowerCase().includes(kw.toLowerCase())
  );
  const experienceKeywords = keywords.filter((kw) =>
    experienceBullets.toLowerCase().includes(kw.toLowerCase())
  );

  if (summaryKeywords.length === 0 && keywords.length > 0) {
    issues.push({
      id: "no-summary-keywords",
      type: "placement",
      severity: "warning",
      message: "No industry keywords found in your summary",
      recommendation: "Include 2-3 key skills/technologies in your professional summary",
    });
  }

  if (experienceKeywords.length === 0 && keywords.length > 0) {
    issues.push({
      id: "no-experience-keywords",
      type: "placement",
      severity: "warning",
      message: "No industry keywords found in experience bullet points",
      recommendation: "Weave relevant keywords naturally into your experience descriptions",
    });
  }

  // Check hard/soft skills balance
  const hardSkills = keywords.filter((kw) =>
    fullText.toLowerCase().includes(kw.toLowerCase())
  );
  const softSkills = [
    "leadership", "communication", "teamwork", "problem-solving",
    "adaptability", "creativity", "critical thinking", "collaboration",
  ].filter((kw) => fullText.toLowerCase().includes(kw));

  if (hardSkills.length > 0 && softSkills.length === 0) {
    issues.push({
      id: "no-soft-skills",
      type: "balance",
      severity: "info",
      message: "No soft skills detected in your resume",
      recommendation: "Add soft skills like leadership, communication, or problem-solving",
    });
  }

  // Job description matching
  if (jobDescription) {
    const jdWords = extractWords(jobDescription);
    const jdKeywords = [...new Set(jdWords)].filter((w) => w.length > 4);
    const missingFromJD = jdKeywords.filter(
      (kw) => !fullText.toLowerCase().includes(kw)
    );

    if (missingFromJD.length > jdKeywords.length * 0.3) {
      issues.push({
        id: "jd-mismatch",
        type: "missing",
        severity: "warning",
        message: `Your resume may not match the job description well`,
        recommendation: `Consider adding: ${missingFromJD.slice(0, 5).join(", ")}`,
      });
    }
  }

  return issues;
}

export function getKeywordScore(
  resume: Resume,
  targetIndustry?: string
): number {
  const issues = analyzeKeywords(resume, targetIndustry);
  let score = 100;
  issues.forEach((issue) => {
    if (issue.severity === "critical") score -= 15;
    else if (issue.severity === "warning") score -= 8;
    else score -= 3;
  });
  return Math.max(0, Math.min(100, score));
}

export function getIndustryKeywords(industry: string): string[] {
  return industryKeywords[industry] || [];
}

export function getAllIndustries(): string[] {
  return Object.keys(industryKeywords);
}
