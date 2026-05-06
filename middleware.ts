import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname !== "/") return NextResponse.next();

  // ?market=ae|in — manual override via URL param, saves preference as cookie
  const marketParam = searchParams.get("market");
  if (marketParam === "ae" || marketParam === "in") {
    const res =
      marketParam === "ae"
        ? NextResponse.rewrite(new URL("/ae", request.url))
        : NextResponse.next();
    res.cookies.set("market_preference", marketParam, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    });
    return res;
  }

  // Respect saved user preference (set by cookie when they use the switcher)
  const saved = request.cookies.get("market_preference")?.value;
  if (saved === "ae") return NextResponse.rewrite(new URL("/ae", request.url));
  if (saved === "in") return NextResponse.next();

  // Primary signal: IP geolocation via Vercel edge header
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    "";

  if (country === "AE") {
    return NextResponse.rewrite(new URL("/ae", request.url));
  }

  // Secondary signal (timezone) is handled client-side in GeoRedirect component
  // because timezone is not available in edge middleware
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
