import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const POST = async (): Promise<NextResponse> => {
  const session = await getSession();
  await session.destroy();

  return NextResponse.json({ ok: true });
};

export { POST };
