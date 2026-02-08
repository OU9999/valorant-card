import { NextResponse } from "next/server";
import type { ValorantShard } from "@/network/riot/types/common";
import type { ValorantQueue } from "@/network/riot/types/match";
import { getRecentMatches } from "@/network/riot/client";

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

type Params = {
  params: Promise<{ queue: string }>;
};

const GET = async (_request: Request, { params }: Params): Promise<NextResponse> => {
  const { queue } = await params;

  if (!VALID_QUEUES.has(queue)) {
    return NextResponse.json(
      { error: `Invalid queue: ${queue}` },
      { status: 400 },
    );
  }

  const shard = (process.env.VALORANT_SHARD ?? "kr") as ValorantShard;

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
