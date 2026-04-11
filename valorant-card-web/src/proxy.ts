import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TEST_ROUTE_PATTERN = /^\/test(\/|$)/;

export const config = {
  matcher: "/test/:path*",
};

export default function proxy(request: NextRequest): NextResponse {
  if (TEST_ROUTE_PATTERN.test(request.nextUrl.pathname) && process.env.APP_ENV !== "true") {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}
