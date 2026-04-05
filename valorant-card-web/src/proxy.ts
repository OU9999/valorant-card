import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js requires config to be inline-exported for static analysis
export const config = {
  matcher: "/test/:path*",
};

export default function proxy(request: NextRequest): NextResponse {
  if (process.env.APP_ENV !== "true") {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}
