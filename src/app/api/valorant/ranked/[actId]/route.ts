import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ValorantShard } from "@/network/riot/common";
import { getLeaderboard } from "@/network/riot/client";

interface Params {
  params: Promise<{ actId: string }>;
}

const GET = async (request: NextRequest, { params }: Params): Promise<NextResponse> => {
  const { actId } = await params;

  if (!actId) {
    return NextResponse.json(
      { error: "actId is required" },
      { status: 400 },
    );
  }

  const { searchParams } = request.nextUrl;
  const size = searchParams.get("size");
  const startIndex = searchParams.get("startIndex");
  const shard = (process.env.VALORANT_SHARD ?? "kr") as ValorantShard;

  try {
    const result = await getLeaderboard({
      actId,
      shard,
      size: size ? parseInt(size, 10) : undefined,
      startIndex: startIndex ? parseInt(startIndex, 10) : undefined,
    });

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
