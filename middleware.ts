import { NextRequest, NextResponse } from "next/server";

const COOKIE_OPTS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 30, // 30 days
  sameSite: "lax" as const,
};

// GCC countries get the UAE landing page; everyone else gets the US landing.
const GCC_COUNTRIES = new Set(["AE", "SA", "KW", "QA", "BH", "OM"]);

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname !== "/") return NextResponse.next();

  // ?reset_market=1 — clears saved preference
  if (searchParams.get("reset_market") === "1") {
    const res = NextResponse.redirect(new URL("/", request.url));
    res.cookies.set("market_preference", "", { path: "/", maxAge: 0 });
    return res;
  }

  // ?market=ae|us — explicit user choice from country switcher
  const marketParam = searchParams.get("market");
  if (marketParam === "ae") {
    const res = NextResponse.redirect(new URL("/ae", request.url));
    res.cookies.set("market_preference", "ae", COOKIE_OPTS);
    return res;
  }
  if (marketParam === "us") {
    const res = NextResponse.redirect(new URL("/", request.url));
    res.cookies.set("market_preference", "us", COOKIE_OPTS);
    return res;
  }

  // Respect saved preference
  const saved = request.cookies.get("market_preference")?.value;
  if (saved === "ae") return NextResponse.redirect(new URL("/ae", request.url));
  if (saved === "us") return NextResponse.next();

  // GCC visitors land on /ae. Everyone else stays on / (renders US landing).
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    "";

  if (GCC_COUNTRIES.has(country)) {
    return NextResponse.redirect(new URL("/ae", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
