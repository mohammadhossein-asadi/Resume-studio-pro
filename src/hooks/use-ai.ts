"use client";

import { useState } from "react";
import type { 
  BulletGenerationInput, 
  BulletSuggestion, 
  EnhanceBulletInput,
  SummaryGenerationInput,
  InterviewQuestionInput,
  InterviewQuestion,
  GenerateSkillsInput,
} from "@/types/ai";

interface UseAIOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "anonymous";
  let id = sessionStorage.getItem("ai-session-id");
  if (!id) {
    id = "session-" + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem("ai-session-id", id);
  }
  return id;
}

async function aiFetch<T>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`/api/ai/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-session-id": getSessionId(),
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.error || "Request failed");
    (error as any).code = data.code;
    (error as any).statusCode = res.status;
    (error as any).retryAfter = data.retryAfter;
    throw error;
  }

  return data;
}

export function useGenerateBullets(options: UseAIOptions<{ bullets: BulletSuggestion[] }> = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generate = async (input: BulletGenerationInput) => {
    setLoading(true);
    setError(null);
    try {
      const data = await aiFetch<{ bullets: BulletSuggestion[] }>("generate/bullets", input);
      options.onSuccess?.(data);
      return data.bullets;
    } catch (e) {
      const err = e as Error;
      setError(err);
      options.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, error };
}

export function useEnhanceBullet(options: UseAIOptions<{ result: { improved: string; confidence: number; metrics: string[]; actionVerb: string } }> = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const enhance = async (input: EnhanceBulletInput) => {
    setLoading(true);
    setError(null);
    try {
      const data = await aiFetch<{ result: { improved: string; confidence: number; metrics: string[]; actionVerb: string } }>("enhance/bullet", input);
      options.onSuccess?.(data);
      return data.result;
    } catch (e) {
      const err = e as Error;
      setError(err);
      options.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { enhance, loading, error };
}

export function useGenerateSummary(options: UseAIOptions<{ summary: string }> = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generate = async (input: SummaryGenerationInput) => {
    setLoading(true);
    setError(null);
    try {
      const data = await aiFetch<{ summary: string }>("generate/summary", input);
      options.onSuccess?.(data);
      return data.summary;
    } catch (e) {
      const err = e as Error;
      setError(err);
      options.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, error };
}

export function useGenerateSkills(options: UseAIOptions<{ skills: Array<{ name: string; description: string }> }> = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generate = async (input: GenerateSkillsInput) => {
    setLoading(true);
    setError(null);
    try {
      const data = await aiFetch<{ skills: Array<{ name: string; description: string }> }>("generate/skills", input);
      options.onSuccess?.(data);
      return data.skills;
    } catch (e) {
      const err = e as Error;
      setError(err);
      options.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, error };
}

export function useInterviewQuestions(options: UseAIOptions<{ questions: InterviewQuestion[] }> = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generate = async (input: InterviewQuestionInput) => {
    setLoading(true);
    setError(null);
    try {
      const data = await aiFetch<{ questions: InterviewQuestion[] }>("interview/questions", input);
      options.onSuccess?.(data);
      return data.questions;
    } catch (e) {
      const err = e as Error;
      setError(err);
      options.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, error };
}
