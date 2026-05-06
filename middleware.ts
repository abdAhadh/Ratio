import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname !== "/") return NextResponse.next();

  // ?reset_market=1 — clears saved preference and serves default (India)
  if (searchParams.get("reset_market") === "1") {
    const res = NextResponse.redirect(new URL("/", request.url));
    res.cookies.set("market_preference", "", { path: "/", maxAge: 0 });
    return res;
  }

  // ?market=ae|in — session-only override for testing, never sets a cookie
  const marketParam = searchParams.get("market");
  if (marketParam === "ae") return NextResponse.rewrite(new URL("/ae", request.url));
  if (marketParam === "in") return NextResponse.next();

  // Respect the user's explicit switcher preference (set only when they manually pick a country)
  const saved = request.cookies.get("market_preference")?.value;
  if (saved === "ae") return NextResponse.rewrite(new URL("/ae", request.url));
  if (saved === "in") return NextResponse.next();

  // Primary signal: IP geolocation via Vercel edge header
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    "";

  if (country === "AE") return NextResponse.rewrite(new URL("/ae", request.url));

  // Secondary timezone signal handled client-side in GeoRedirect
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
