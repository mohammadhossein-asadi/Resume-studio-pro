import type { BulletGenerationInput } from "@/types/ai";

export const BULLET_GENERATION_PROMPT = (input: BulletGenerationInput): string => {
  const lang = input.language === "fa" ? "Persian/Farsi" : "English";
  const count = input.count || 4;

  let metricsPart = "";
  if (input.metricsHints && input.metricsHints.length > 0) {
    metricsPart = "Metrics to incorporate: " + input.metricsHints.join(", ") + "\\n";
  }

  let targetRolePart = "";
  if (input.targetRole) {
    targetRolePart = "Target Role: " + input.targetRole + "\\n";
  }

  return "You are an expert resume writer. Generate " + count + " powerful achievement bullets for:\\n\\n" +
    "Role: " + input.role + "\\n" +
    "Company: " + input.company + "\\n" +
    "Key Skills: " + input.skills.join(", ") + "\\n" +
    metricsPart +
    targetRolePart +
    "\\nRequirements:\\n" +
    "- Start with strong action verbs (Led, Built, Achieved, Optimized, Delivered, Spearheaded, Engineered, Architected, etc.)\\n" +
    "- Include measurable metrics (%, $, # users, time saved, revenue, efficiency gains) in EVERY bullet\\n" +
    "- Use STAR format: Situation, Task, Action, Result\\n" +
    "- Tailored for " + lang + " resume\\n" +
    "- Each bullet 1-2 lines max, concise and impactful\\n" +
    "- No weak phrases like \"Responsible for\", \"Worked on\", \"Helped with\"\\n" +
    "- Focus on IMPACT and RESULTS\\n\\n" +
    "Output format (JSON only, no markdown):\\n" +
    "{\\n" +
    "  \"bullets\": [\\n" +
    "    { \"text\": \"...\", \"confidence\": 0.95, \"metrics\": [\"40%\", \"2M users\"], \"actionVerb\": \"Optimized\" }\\n" +
    "  ]\\n" +
    "}";
};

export const ENHANCE_BULLET_PROMPT = (input: {
  bullet: string;
  context?: { role?: string; company?: string; skills?: string[] };
  language: "en" | "fa";
}): string => {
  const lang = input.language === "fa" ? "Persian/Farsi" : "English";

  let contextPart = "";
  if (input.context?.role) contextPart += "Role: " + input.context.role + "\\n";
  if (input.context?.company) contextPart += "Company: " + input.context.company + "\\n";
  if (input.context?.skills) contextPart += "Skills: " + input.context.skills.join(", ") + "\\n";

  return "You are an expert resume writer. Transform this weak bullet into a powerful achievement statement:\\n\\n" +
    "Original bullet: \"" + input.bullet + "\"\\n" +
    contextPart +
    "\\nRequirements:\\n" +
    "- Start with a strong action verb\\n" +
    "- Add measurable metrics if missing (%, $, #, time)\\n" +
    "- Use active voice\\n" +
    "- Keep it concise (1-2 lines)\\n" +
    "- Language: " + lang + "\\n\\n" +
    "Output format (JSON only):\\n" +
    "{\\n" +
    "  \"improved\": \"...\",\\n" +
    "  \"confidence\": 0.9,\\n" +
    "  \"metrics\": [\"40%\", \"2M users\"],\\n" +
    "  \"actionVerb\": \"Optimized\"\\n" +
    "}";
};
