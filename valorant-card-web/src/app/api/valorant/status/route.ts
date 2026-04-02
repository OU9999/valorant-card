import { NextResponse } from "next/server";
import type { ValorantShard } from "@/network/riot/common";
import { getPlatformStatus } from "@/lib/riot/client";

const GET = async (): Promise<NextResponse> => {
  const shard = (process.env.VALORANT_SHARD ?? "kr") as ValorantShard;

  try {
    const result = await getPlatformStatus(shard);

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
