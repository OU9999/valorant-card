import { NextResponse } from "next/server";
import { getMatchById } from "@/lib/riot/client";
import { getSession } from "@/lib/session";

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

  const session = await getSession();
  const shard = session.activeShard ?? "kr";

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
