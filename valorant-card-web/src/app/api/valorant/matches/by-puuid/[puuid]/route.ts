import { NextResponse } from "next/server";
import { getMatchListByPuuid } from "@/lib/riot/client";
import { getSession } from "@/lib/session";

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

  const session = await getSession();
  const shard = session.activeShard ?? "kr";

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
