import { NextRequest, NextResponse } from "next/server";

const COOKIE_OPTS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 30, // 30 days
  sameSite: "lax" as const,
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname !== "/") return NextResponse.next();

  // ?reset_market=1 — clears saved preference
  if (searchParams.get("reset_market") === "1") {
    const res = NextResponse.redirect(new URL("/", request.url));
    res.cookies.set("market_preference", "", { path: "/", maxAge: 0 });
    return res;
  }

  // ?market=ae|in — explicit user choice from country switcher
  // Sets the cookie AND redirects to the clean URL
  const marketParam = searchParams.get("market");
  if (marketParam === "ae") {
    const res = NextResponse.redirect(new URL("/ae", request.url));
    res.cookies.set("market_preference", "ae", COOKIE_OPTS);
    return res;
  }
  if (marketParam === "in") {
    const res = NextResponse.redirect(new URL("/", request.url));
    res.cookies.set("market_preference", "in", COOKIE_OPTS);
    return res;
  }

  // Respect saved preference (redirect so URL matches the page)
  const saved = request.cookies.get("market_preference")?.value;
  if (saved === "ae") return NextResponse.redirect(new URL("/ae", request.url));
  if (saved === "in") return NextResponse.next();

  // Primary signal: IP geolocation via Vercel edge header
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    "";

  if (country === "AE") return NextResponse.redirect(new URL("/ae", request.url));

  // Secondary signal (timezone) handled client-side in GeoRedirect
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
