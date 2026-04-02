import { NextResponse } from "next/server";
import type { RiotRegion } from "@/network/riot/common";
import { getAccountByRiotId } from "@/lib/riot/client";

interface Params {
  params: Promise<{ gameName: string; tagLine: string }>;
}

const GET = async (_request: Request, { params }: Params): Promise<NextResponse> => {
  const { gameName, tagLine } = await params;

  if (!gameName || !tagLine) {
    return NextResponse.json(
      { error: "gameName and tagLine are required" },
      { status: 400 },
    );
  }

  const region = (process.env.RIOT_REGION ?? "asia") as RiotRegion;

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
