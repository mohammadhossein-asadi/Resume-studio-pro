import type { Resume } from '@/types/resume';

export interface BulletGenerationInput {
  role: string;
  company: string;
  skills: string[];
  metricsHints?: string[];
  count?: number;
  language?: 'en' | 'fa';
  targetRole?: string;
}

export interface BulletSuggestion {
  text: string;
  confidence: number;
  metrics?: string[];
  actionVerb: string;
}

export interface SummaryGenerationInput {
  currentResume: Resume;
  targetRole?: string;
  language?: 'en' | 'fa';
}

export interface EnhanceBulletInput {
  bullet: string;
  context?: {
    role?: string;
    company?: string;
    skills?: string[];
  };
  language?: 'en' | 'fa';
}

export interface InterviewQuestionInput {
  resume: Resume;
  jobDescription?: string;
  count?: number;
  language?: 'en' | 'fa';
}

export interface InterviewQuestion {
  question: string;
  category: 'behavioral' | 'technical' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
  suggestedApproach?: string;
}

export interface ATSAnalysisInput {
  resume: Resume;
  jobDescription?: string;
  language?: 'en' | 'fa';
}

export interface ATSAnalysis {
  score: number;
  issues: Array<{
    id: string;
    category: string;
    severity: 'critical' | 'warning' | 'info';
    message: string;
    recommendation: string;
  }>;
  matchedKeywords: string[];
  missingKeywords: string[];
}

export interface ProviderConfig {
  name: string;
  apiKey: string;
  baseURL?: string;
  defaultModel: string;
  models: string[];
}
