import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/ai";
import { generateBulletsSchema } from "@/lib/ai/schemas";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/ai/rate-limiter";
import { ValidationError, AIError } from "@/lib/ai/errors";

export async function POST(req: NextRequest) {
  const sessionId = req.headers.get("x-session-id") || "anonymous";
  const rateLimitResult = checkRateLimit(sessionId, "generate:bullets");
  
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded", retryAfter: rateLimitResult.retryAfter },
      { 
        status: 429, 
        headers: getRateLimitHeaders("generate:bullets", sessionId)
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: getRateLimitHeaders("generate:bullets", sessionId) }
    );
  }

  const parsed = generateBulletsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.errors },
      { status: 400, headers: getRateLimitHeaders("generate:bullets", sessionId) }
    );
  }

  try {
    const bullets = await aiService.generateBullets(parsed.data);
    return NextResponse.json(
      { bullets },
      { headers: getRateLimitHeaders("generate:bullets", sessionId) }
    );
  } catch (error) {
    if (error instanceof AIError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode, headers: getRateLimitHeaders("generate:bullets", sessionId) }
      );
    }
    console.error("Generate bullets error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: getRateLimitHeaders("generate:bullets", sessionId) }
    );
  }
}
