import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import type { SessionData } from "./config";
import { getSessionOptions } from "./config";

const getSession = async (): Promise<ReturnType<typeof getIronSession<SessionData>>> => {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, getSessionOptions());
};

export { getSession };
export type { SessionData };
