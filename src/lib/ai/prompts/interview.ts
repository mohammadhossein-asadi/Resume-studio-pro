import type { InterviewQuestionsInput } from "@/lib/ai/schemas";

export const INTERVIEW_QUESTIONS_PROMPT = (input: InterviewQuestionsInput): string => {
  const lang = input.language === "fa" ? "Persian/Farsi" : "English";
  const { personalInfo, sections } = input.resume;

  const experienceSection = sections.find(s => s.type === "experience");
  const experience = experienceSection?.items.map(item => 
    item.title + " at " + item.subtitle + ": " + item.bullets.filter(b => b).join("; ")
  ).join(" | ") || "No experience listed";

  const skillsSection = sections.find(s => s.type === "skills");
  const skills = skillsSection?.items.flatMap(i => i.tags || []).join(", ") || "Not specified";

  let jdPart = "";
  if (input.jobDescription) {
    jdPart = "\\nJob Description:\\n" + input.jobDescription.slice(0, 2000) + "\\n";
  }

  return "You are an expert interview coach. Generate " + (input.count || 10) + " likely interview questions based on this resume:\\n\\n" +
    "Candidate: " + personalInfo.firstName + " " + personalInfo.lastName + "\\n" +
    "Title: " + personalInfo.title + "\\n" +
    "Experience: " + experience + "\\n" +
    "Skills: " + skills + "\\n" +
    "Summary: " + personalInfo.summary + "\\n" +
    jdPart +
    "\\nRequirements:\\n" +
    "- Mix of behavioral (STAR), technical, and situational questions\\n" +
    "- Tailored to the specific experience and skills shown\\n" +
    "- If job description provided, prioritize questions relevant to that role\\n" +
    "- Language: " + lang + "\\n\\n" +
    "Output format (JSON only):\\n" +
    "{\\n" +
    "  \"questions\": [\\n" +
    "    { \"question\": \"...\", \"category\": \"behavioral\", \"difficulty\": \"medium\", \"suggestedApproach\": \"Use STAR: Situation, Task, Action, Result\" }\\n" +
    "  ]\\n" +
    "}";
};
