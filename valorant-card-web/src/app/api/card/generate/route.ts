import { NextResponse } from "next/server";
import { generateCard } from "@/lib/card/generate";
import { CardGenerationError, ERROR_MESSAGES } from "@/lib/card/errors";
import { getSession } from "@/lib/session";

// ─── Concurrency Guard ───
// NOTE: In-memory counter — only effective in single-instance (self-hosted) deployments.
// For serverless (Vercel/Lambda), use an external rate limiter (e.g., Upstash).

let activeGenerations = 0;
const MAX_CONCURRENT = 2;

const POST = async (request: Request): Promise<NextResponse> => {
  if (activeGenerations >= MAX_CONCURRENT) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.RATE_LIMITED, code: "RATE_LIMITED" },
      { status: 429, headers: { "Retry-After": "5" } },
    );
  }

  activeGenerations++;

  try {
    const session = await getSession();
    if (!session.puuid) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED, code: "UNAUTHORIZED" },
        { status: 401 },
      );
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body.riotId !== "string") {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_RIOT_ID, code: "INVALID_RIOT_ID" },
        { status: 400 },
      );
    }

    const cardData = await generateCard(body.riotId);
    return NextResponse.json(cardData);
  } catch (error) {
    if (error instanceof CardGenerationError) {
      const response: Record<string, unknown> = {
        error: ERROR_MESSAGES[error.code],
        code: error.code,
      };

      if (error.retryAfter) {
        response.retryAfter = error.retryAfter;
      }

      return NextResponse.json(response, {
        status: error.statusCode,
        ...(error.retryAfter
          ? { headers: { "Retry-After": String(error.retryAfter) } }
          : {}),
      });
    }

    console.error("[card/generate] Unexpected error:", error);

    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_ERROR, code: "INTERNAL_ERROR" },
      { status: 500 },
    );
  } finally {
    activeGenerations--;
  }
};

export { POST };
