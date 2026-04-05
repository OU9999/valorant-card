import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { isRsoConfigured } from "@/lib/rso/config";
import { exchangeCodeForToken, getUserInfo } from "@/lib/rso/utils";
import { getSession } from "@/lib/session";

const timingSafeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
};

const GET = async (request: Request): Promise<NextResponse> => {
  if (!isRsoConfigured()) {
    return NextResponse.json(
      { message: "RSO authentication is not yet available" },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    console.error("[rso/callback] OAuth error:", error);
    const session = await getSession();
    session.rsoState = undefined;
    await session.save();
    return NextResponse.redirect(new URL("/?auth_error=denied", request.url));
  }

  if (!code || !state) {
    return NextResponse.json(
      { message: "Missing code or state parameter" },
      { status: 400 },
    );
  }

  const session = await getSession();

  if (!session.rsoState || !timingSafeEqual(state, session.rsoState)) {
    return NextResponse.json(
      { message: "Invalid state parameter" },
      { status: 403 },
    );
  }

  try {
    const tokenResponse = await exchangeCodeForToken(code);
    const userInfo = await getUserInfo(tokenResponse.access_token);

    session.puuid = userInfo.sub;
    session.rsoAccessToken = tokenResponse.access_token;
    session.rsoRefreshToken = tokenResponse.refresh_token;
    session.rsoExpiresAt = Date.now() + tokenResponse.expires_in * 1000;
    session.rsoState = undefined;
    await session.save();

    return NextResponse.redirect(new URL("/?authenticated=true", request.url));
  } catch (err) {
    console.error("[rso/callback] Token exchange failed:", err);
    return NextResponse.redirect(new URL("/?auth_error=exchange_failed", request.url));
  }
};

export { GET };
