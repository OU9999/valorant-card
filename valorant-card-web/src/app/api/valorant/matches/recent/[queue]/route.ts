import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ValorantShard } from "@/network/riot/common";
import type { ValorantQueue } from "@/network/riot/match";
import { getRecentMatches } from "@/lib/riot/client";
import { getSession } from "@/lib/session";

const VALID_QUEUES = new Set<string>([
  "competitive",
  "unrated",
  "spikerush",
  "tournamentmode",
  "deathmatch",
  "onefa",
  "ggteam",
  "newmap",
  "snowball",
]);

interface Params {
  params: Promise<{ queue: string }>;
}

const GET = async (request: NextRequest, { params }: Params): Promise<NextResponse> => {
  const { queue } = await params;

  if (!VALID_QUEUES.has(queue)) {
    return NextResponse.json(
      { error: `Invalid queue: ${queue}` },
      { status: 400 },
    );
  }

  const { searchParams } = request.nextUrl;
  const session = await getSession();
  const shard = (searchParams.get("shard") as ValorantShard) ?? session.activeShard ?? "kr";

  try {
    const result = await getRecentMatches(queue as ValorantQueue, shard);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error.message },
        { status: result.error.status },
      );
    }

    return NextResponse.json(result.data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export { GET };
