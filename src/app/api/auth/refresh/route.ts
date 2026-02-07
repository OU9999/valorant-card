import { NextResponse } from "next/server";
import type { RsoSession } from "@/types/riot/auth";
import { refreshAccessToken } from "@/lib/riot/auth";
import { getAccountByAccessToken } from "@/lib/riot/client";
import { getSession, setSession } from "@/lib/session";

const POST = async (): Promise<NextResponse> => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 },
    );
  }

  try {
    const tokens = await refreshAccessToken(session.refreshToken);
    const accountResult = await getAccountByAccessToken(tokens.access_token);

    const updatedSession: RsoSession = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: Date.now() + tokens.expires_in * 1000,
      puuid: accountResult.ok ? accountResult.data.puuid : session.puuid,
      gameName: accountResult.ok ? accountResult.data.gameName : session.gameName,
      tagLine: accountResult.ok ? accountResult.data.tagLine : session.tagLine,
    };

    await setSession(updatedSession);

    return NextResponse.json({
      expiresAt: updatedSession.expiresAt,
      gameName: updatedSession.gameName,
      tagLine: updatedSession.tagLine,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Token refresh error:", message);
    return NextResponse.json(
      { error: "Token refresh failed" },
      { status: 500 },
    );
  }
};

export { POST };
