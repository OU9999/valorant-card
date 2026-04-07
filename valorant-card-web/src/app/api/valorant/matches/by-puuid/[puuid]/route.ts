import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ValorantShard } from "@/network/riot/common";
import { getMatchListByPuuid } from "@/lib/riot/client";
import { getSession } from "@/lib/session";

interface Params {
  params: Promise<{ puuid: string }>;
}

const GET = async (request: NextRequest, { params }: Params): Promise<NextResponse> => {
  const { puuid } = await params;

  if (!puuid) {
    return NextResponse.json(
      { error: "puuid is required" },
      { status: 400 },
    );
  }

  const { searchParams } = request.nextUrl;
  const session = await getSession();
  const shard = (searchParams.get("shard") as ValorantShard) ?? session.activeShard ?? "kr";

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
