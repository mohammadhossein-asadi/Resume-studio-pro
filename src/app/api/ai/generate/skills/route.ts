import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/ai";
import { generateSkillsSchema } from "@/lib/ai/schemas";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/ai/rate-limiter";
import { AIError } from "@/lib/ai/errors";

export async function POST(req: NextRequest) {
  const sessionId = req.headers.get("x-session-id") || "anonymous";
  const rateLimitResult = checkRateLimit(sessionId, "generate:skills");
  
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded", retryAfter: rateLimitResult.retryAfter },
      { 
        status: 429, 
        headers: getRateLimitHeaders("generate:skills", sessionId)
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: getRateLimitHeaders("generate:skills", sessionId) }
    );
  }

  const parsed = generateSkillsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.errors },
      { status: 400, headers: getRateLimitHeaders("generate:skills", sessionId) }
    );
  }

  try {
    const skills = await aiService.generateSkills(parsed.data);
    return NextResponse.json(
      { skills },
      { headers: getRateLimitHeaders("generate:skills", sessionId) }
    );
  } catch (error) {
    if (error instanceof AIError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode, headers: getRateLimitHeaders("generate:skills", sessionId) }
      );
    }
    console.error("Generate skills error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: getRateLimitHeaders("generate:skills", sessionId) }
    );
  }
}
