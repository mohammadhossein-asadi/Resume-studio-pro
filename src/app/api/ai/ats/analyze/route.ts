import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/ai";
import { atsAnalyzeSchema } from "@/lib/ai/schemas";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/ai/rate-limiter";
import { AIError } from "@/lib/ai/errors";

export async function POST(req: NextRequest) {
  const sessionId = req.headers.get("x-session-id") || "anonymous";
  const rateLimitResult = checkRateLimit(sessionId, "ats:analyze");
  
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded", retryAfter: rateLimitResult.retryAfter },
      { 
        status: 429, 
        headers: getRateLimitHeaders("ats:analyze", sessionId)
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: getRateLimitHeaders("ats:analyze", sessionId) }
    );
  }

  const parsed = atsAnalyzeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.errors },
      { status: 400, headers: getRateLimitHeaders("ats:analyze", sessionId) }
    );
  }

  try {
    // For now, return a placeholder - full ATS analysis would need more implementation
    return NextResponse.json(
      { 
        analysis: { 
          score: 75, 
          issues: [], 
          matchedKeywords: [], 
          missingKeywords: [] 
        } 
      },
      { headers: getRateLimitHeaders("ats:analyze", sessionId) }
    );
  } catch (error) {
    if (error instanceof AIError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode, headers: getRateLimitHeaders("ats:analyze", sessionId) }
      );
    }
    console.error("ATS analyze error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: getRateLimitHeaders("ats:analyze", sessionId) }
    );
  }
}
