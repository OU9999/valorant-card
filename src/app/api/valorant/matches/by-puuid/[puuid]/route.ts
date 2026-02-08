import { NextResponse } from "next/server";
import type { ValorantShard } from "@/network/riot/types/common";
import { getMatchListByPuuid } from "@/network/riot/client";

interface Params {
  params: Promise<{ puuid: string }>;
}

const GET = async (_request: Request, { params }: Params): Promise<NextResponse> => {
  const { puuid } = await params;

  if (!puuid) {
    return NextResponse.json(
      { error: "puuid is required" },
      { status: 400 },
    );
  }

  const shard = (process.env.VALORANT_SHARD ?? "kr") as ValorantShard;

  try {
    const result = await getMatchListByPuuid(puuid, shard);

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
