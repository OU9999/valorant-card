import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { RsoSession } from "@/types/riot/auth";
import { exchangeCodeForTokens } from "@/lib/riot/auth";
import { getAccountByAccessToken } from "@/lib/riot/client";
import { RSO } from "@/lib/riot/constants";
import { setSession } from "@/lib/session";

const GET = async (request: NextRequest): Promise<NextResponse> => {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    const description = searchParams.get("error_description") ?? "Unknown error";
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(description)}`, request.url),
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/?error=missing_params", request.url),
    );
  }

  const cookieStore = await cookies();
  const storedState = cookieStore.get(RSO.STATE_COOKIE_NAME)?.value;

  if (!storedState || storedState !== state) {
    return NextResponse.redirect(
      new URL("/?error=invalid_state", request.url),
    );
  }

  cookieStore.delete(RSO.STATE_COOKIE_NAME);

  try {
    const tokens = await exchangeCodeForTokens(code);
    const accountResult = await getAccountByAccessToken(tokens.access_token);

    if (!accountResult.ok) {
      return NextResponse.redirect(
        new URL("/?error=account_fetch_failed", request.url),
      );
    }

    const session: RsoSession = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: Date.now() + tokens.expires_in * 1000,
      puuid: accountResult.data.puuid,
      gameName: accountResult.data.gameName,
      tagLine: accountResult.data.tagLine,
    };

    await setSession(session);

    return NextResponse.redirect(new URL("/", request.url));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("RSO callback error:", message);
    return NextResponse.redirect(
      new URL("/?error=auth_failed", request.url),
    );
  }
};

export { GET };
