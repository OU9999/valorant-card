import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

interface AuthStatusResponse {
  authenticated: boolean;
}

const GET = async (): Promise<NextResponse<AuthStatusResponse>> => {
  const session = await getSession();

  if (!session.puuid) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({ authenticated: true });
};

export { GET };
