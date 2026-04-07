import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ValorantShard } from "@/network/riot/common";
import { getAccountByRiotId, getRegionForShard } from "@/lib/riot/client";
import { getSession } from "@/lib/session";

interface Params {
  params: Promise<{ gameName: string; tagLine: string }>;
}

const GET = async (request: NextRequest, { params }: Params): Promise<NextResponse> => {
  const { gameName, tagLine } = await params;

  if (!gameName || !tagLine) {
    return NextResponse.json(
      { error: "gameName and tagLine are required" },
      { status: 400 },
    );
  }

  const { searchParams } = request.nextUrl;
  const session = await getSession();
  const shard = (searchParams.get("shard") as ValorantShard) ?? session.activeShard ?? "kr";
  const region = getRegionForShard(shard);

  try {
    const result = await getAccountByRiotId(
      decodeURIComponent(gameName),
      decodeURIComponent(tagLine),
      region,
    );

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
