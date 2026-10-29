import type { SummaryGenerationInput } from "@/types/ai";

export const SUMMARY_GENERATION_PROMPT = (input: SummaryGenerationInput): string => {
  const lang = input.language === "fa" ? "Persian/Farsi" : "English";
  const { personalInfo, sections, settings } = input.currentResume;

  const experienceSection = sections.find(s => s.type === "experience");
  const experience = experienceSection?.items.slice(0, 3).map(item => 
    item.title + " at " + item.subtitle + " (" + item.bullets.filter(b => b).slice(0, 2).join("; ") + ")"
  ).join(" | ") || "No experience listed";

  const skillsSection = sections.find(s => s.type === "skills");
  const topSkills = skillsSection?.items.flatMap(i => i.tags || []).slice(0, 10).join(", ") || "Not specified";

  let targetRolePart = "";
  if (input.targetRole) {
    targetRolePart = "Target Role: " + input.targetRole + "\\n";
  }

  return "You are an expert resume writer. Write a compelling professional summary (2-3 sentences) for:\\n\\n" +
    "Name: " + personalInfo.firstName + " " + personalInfo.lastName + "\\n" +
    "Current Title: " + personalInfo.title + "\\n" +
    "Experience: " + experience + "\\n" +
    "Top Skills: " + topSkills + "\\n" +
    targetRolePart +
    "Current Summary: " + (personalInfo.summary || "None provided") + "\\n\\n" +
    "Requirements:\\n" +
    "- 2-3 sentences max\\n" +
    "- Start with years of experience and current role\\n" +
    "- Highlight 2-3 key achievements with metrics\\n" +
    "- Mention core technical/functional expertise\\n" +
    "- Tailored for " + lang + " resume\\n" +
    "- ATS-friendly keywords naturally integrated\\n" +
    "- No buzzwords like \"passionate\", \"dynamic\", \"results-driven\"\\n\\n" +
    "Output: Plain text only (the summary itself, no JSON, no labels).";
};
