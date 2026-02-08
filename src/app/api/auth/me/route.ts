import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const GET = async (): Promise<NextResponse> => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 },
    );
  }

  return NextResponse.json({
    authenticated: true,
    puuid: session.puuid,
    gameName: session.gameName,
    tagLine: session.tagLine,
    expiresAt: session.expiresAt,
  });
};

export { GET };
