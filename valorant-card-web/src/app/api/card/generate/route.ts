import { NextResponse } from "next/server";
import { generateCard } from "@/lib/card/generate";
import { saveCard } from "@/lib/card/store";
import { CardGenerationError, ERROR_MESSAGES } from "@/lib/card/errors";
import { getRegionForShard } from "@/lib/riot/client";
import { getSession } from "@/lib/session";

// ─── Concurrency Guard ───
// NOTE: In-memory counter — only effective in single-instance (self-hosted) deployments.
// For serverless (Vercel/Lambda), use an external rate limiter (e.g., Upstash).

let activeGenerations = 0;
const MAX_CONCURRENT = 2;

const POST = async (): Promise<NextResponse> => {
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

    const shard = session.activeShard ?? "kr";
    const region = getRegionForShard(shard);
    const cardData = await generateCard(session.puuid, shard, region);
    const id = saveCard(cardData);
    return NextResponse.json({ id });
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
