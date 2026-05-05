import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Only apply geo-routing on the root path
  if (pathname !== "/") return NextResponse.next();

  // Allow manual override via ?market=in or ?market=ae (for testing)
  const marketOverride = searchParams.get("market");
  if (marketOverride === "ae") {
    return NextResponse.rewrite(new URL("/ae", request.url));
  }
  if (marketOverride === "in") {
    return NextResponse.next();
  }

  // Vercel sets this header on Edge; fall back to CF-IPCountry for self-hosted
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    "";

  if (country === "AE") {
    return NextResponse.rewrite(new URL("/ae", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
