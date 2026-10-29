import { completeWithFallback } from "./providers";
import { BULLET_GENERATION_PROMPT, ENHANCE_BULLET_PROMPT } from "./prompts/bullets";
import { SUMMARY_GENERATION_PROMPT } from "./prompts/summary";
import { SKILLS_GENERATION_PROMPT } from "./prompts/skills";
import { INTERVIEW_QUESTIONS_PROMPT } from "./prompts/interview";
import type { 
  BulletGenerationInput, 
  BulletSuggestion, 
  EnhanceBulletInput,
  SummaryGenerationInput,
  InterviewQuestionInput,
  InterviewQuestion,
  GenerateSkillsInput,
} from "@/types/ai";
import { AIError } from "./errors";

export const aiService = {
  async generateBullets(input: BulletGenerationInput): Promise<BulletSuggestion[]> {
    const prompt = BULLET_GENERATION_PROMPT(input);
    const response = await completeWithFallback(prompt, { 
      temperature: 0.7, 
      maxTokens: 2000,
      systemPrompt: "You are an expert resume writer. Output only valid JSON."
    });
    
    try {
      const parsed = JSON.parse(response.content);
      return (parsed.bullets || []).map((b: any) => ({
        text: b.text,
        confidence: b.confidence ?? 0.8,
        metrics: b.metrics ?? [],
        actionVerb: b.actionVerb ?? "",
      }));
    } catch (e) {
      throw new AIError("Failed to parse AI response", "PARSE_ERROR", 500, response.provider);
    }
  },

  async enhanceBullet(input: EnhanceBulletInput): Promise<{ improved: string; confidence: number; metrics: string[]; actionVerb: string }> {
    const prompt = ENHANCE_BULLET_PROMPT(input);
    const response = await completeWithFallback(prompt, { 
      temperature: 0.5, 
      maxTokens: 1000,
      systemPrompt: "You are an expert resume writer. Output only valid JSON."
    });
    
    try {
      const parsed = JSON.parse(response.content);
      return {
        improved: parsed.improved,
        confidence: parsed.confidence ?? 0.8,
        metrics: parsed.metrics ?? [],
        actionVerb: parsed.actionVerb ?? "",
      };
    } catch (e) {
      throw new AIError("Failed to parse AI response", "PARSE_ERROR", 500, response.provider);
    }
  },

  async generateSummary(input: SummaryGenerationInput): Promise<string> {
    const prompt = SUMMARY_GENERATION_PROMPT(input);
    const response = await completeWithFallback(prompt, { 
      temperature: 0.7, 
      maxTokens: 500,
      systemPrompt: "You are an expert resume writer. Output plain text only."
    });
    
    return response.content.trim();
  },

  async generateSkills(input: GenerateSkillsInput): Promise<Array<{ name: string; description: string }>> {
    const prompt = SKILLS_GENERATION_PROMPT(input);
    const response = await completeWithFallback(prompt, { 
      temperature: 0.5, 
      maxTokens: 2000,
      systemPrompt: "You are an expert resume writer. Output only valid JSON."
    });
    
    try {
      const parsed = JSON.parse(response.content);
      return parsed.skills || [];
    } catch (e) {
      throw new AIError("Failed to parse AI response", "PARSE_ERROR", 500, response.provider);
    }
  },

  async generateInterviewQuestions(input: InterviewQuestionInput): Promise<InterviewQuestion[]> {
    const prompt = INTERVIEW_QUESTIONS_PROMPT(input);
    const response = await completeWithFallback(prompt, { 
      temperature: 0.7, 
      maxTokens: 2000,
      systemPrompt: "You are an expert interview coach. Output only valid JSON."
    });
    
    try {
      const parsed = JSON.parse(response.content);
      return parsed.questions || [];
    } catch (e) {
      throw new AIError("Failed to parse AI response", "PARSE_ERROR", 500, response.provider);
    }
  },
};
