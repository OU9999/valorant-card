import type { SessionOptions } from "iron-session";

interface SessionData {
  puuid?: string;
  gameName?: string;
  tagLine?: string;
  rsoAccessToken?: string;
  rsoRefreshToken?: string;
  rsoExpiresAt?: number;
  rsoState?: string;
}

const COOKIE_NAME = process.env.IRON_SESSION_COOKIE_NAME ?? "vfc_session";

const getSessionOptions = (): SessionOptions => {
  const password = process.env.IRON_SESSION_PASSWORD;
  if (!password) {
    throw new Error(
      "IRON_SESSION_PASSWORD is not set. Please set a 32+ character secret in your environment variables.",
    );
  }

  return {
    password,
    cookieName: COOKIE_NAME,
    ttl: 86400, // 24h
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax" as const,
    },
  };
};

export { getSessionOptions, COOKIE_NAME };
export type { SessionData };
