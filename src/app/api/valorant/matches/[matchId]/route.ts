import { NextResponse } from "next/server";
import type { ValorantShard } from "@/network/riot/common";
import { getMatchById } from "@/network/riot/client";

interface Params {
  params: Promise<{ matchId: string }>;
}

const GET = async (_request: Request, { params }: Params): Promise<NextResponse> => {
  const { matchId } = await params;

  if (!matchId) {
    return NextResponse.json(
      { error: "matchId is required" },
      { status: 400 },
    );
  }

  const shard = (process.env.VALORANT_SHARD ?? "kr") as ValorantShard;

  try {
    const result = await getMatchById(matchId, shard);

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
