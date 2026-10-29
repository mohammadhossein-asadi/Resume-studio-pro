import type { GenerateSkillsInput } from "@/lib/ai/schemas";

export const SKILLS_GENERATION_PROMPT = (input: GenerateSkillsInput): string => {
  const lang = input.language === "fa" ? "Persian/Farsi" : "English";

  return "You are an expert resume writer. Generate rich skill descriptions for the following skills:\\n\\n" +
    "Skills: " + input.skills.join(", ") + "\\n" +
    (input.role ? "Target Role: " + input.role + "\\n" : "") +
    "\\nRequirements:\\n" +
    "- For each skill, provide a 1-sentence description of proficiency/usage\\n" +
    "- Include years of experience level if inferable\\n" +
    "- Mention specific tools, frameworks, or methodologies\\n" +
    "- Tailored for " + lang + " resume\\n" +
    "- ATS-friendly terminology\\n\\n" +
    "Output format (JSON only):\\n" +
    "{\\n" +
    "  \"skills\": [\\n" +
    "    { \"name\": \"React\", \"description\": \"5+ years building production SPAs with hooks, context, and performance optimization\" }\\n" +
    "  ]\\n" +
    "}";
};
