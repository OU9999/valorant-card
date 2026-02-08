import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { generateState, buildAuthorizationUrl } from "@/network/riot/auth";
import { RSO } from "@/lib/riot/constants";

const GET = async (): Promise<NextResponse> => {
  const state = generateState();
  const authUrl = buildAuthorizationUrl(state);

  const cookieStore = await cookies();
  cookieStore.set(RSO.STATE_COOKIE_NAME, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: RSO.STATE_MAX_AGE_SECONDS,
  });

  return NextResponse.redirect(authUrl);
};

export { GET };
