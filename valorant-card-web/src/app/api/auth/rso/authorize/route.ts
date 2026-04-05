import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { isRsoConfigured } from "@/lib/rso/config";
import { buildAuthorizeUrl } from "@/lib/rso/utils";
import { getSession } from "@/lib/session";

const GET = async (): Promise<NextResponse> => {
  if (!isRsoConfigured()) {
    return NextResponse.json(
      { message: "RSO authentication is not yet available" },
      { status: 503 },
    );
  }

  const state = crypto.randomUUID();

  const session = await getSession();
  session.rsoState = state;
  await session.save();

  const authorizeUrl = buildAuthorizeUrl(state);
  return NextResponse.redirect(authorizeUrl);
};

export { GET };
