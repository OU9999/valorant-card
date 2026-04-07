import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ValorantShard, Locale } from "@/network/riot/common";
import { getContent } from "@/lib/riot/client";
import { getSession } from "@/lib/session";

const GET = async (request: NextRequest): Promise<NextResponse> => {
  const { searchParams } = request.nextUrl;
  const locale = searchParams.get("locale") as Locale | null;
  const session = await getSession();
  const shard = (searchParams.get("shard") as ValorantShard) ?? session.activeShard ?? "kr";

  try {
    const result = await getContent(shard, locale ?? undefined);

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
