import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/ai";
import { interviewQuestionsSchema } from "@/lib/ai/schemas";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/ai/rate-limiter";
import { AIError } from "@/lib/ai/errors";

export async function POST(req: NextRequest) {
  const sessionId = req.headers.get("x-session-id") || "anonymous";
  const rateLimitResult = checkRateLimit(sessionId, "interview:questions");
  
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded", retryAfter: rateLimitResult.retryAfter },
      { 
        status: 429, 
        headers: getRateLimitHeaders("interview:questions", sessionId)
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: getRateLimitHeaders("interview:questions", sessionId) }
    );
  }

  const parsed = interviewQuestionsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.errors },
      { status: 400, headers: getRateLimitHeaders("interview:questions", sessionId) }
    );
  }

  try {
    const questions = await aiService.generateInterviewQuestions(parsed.data);
    return NextResponse.json(
      { questions },
      { headers: getRateLimitHeaders("interview:questions", sessionId) }
    );
  } catch (error) {
    if (error instanceof AIError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode, headers: getRateLimitHeaders("interview:questions", sessionId) }
      );
    }
    console.error("Interview questions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: getRateLimitHeaders("interview:questions", sessionId) }
    );
  }
}
