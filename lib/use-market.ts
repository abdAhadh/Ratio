"use client";

import { usePathname, useSearchParams } from "next/navigation";

export type Market = "in" | "ae";

/**
 * Single source of truth for which market the user is currently on.
 * Used by Navbar, Footer, Demo page — anywhere the UI varies by market.
 *
 * Resolution order (highest to lowest priority):
 *   1. URL pathname (e.g. /ae → ae)
 *   2. URL query param (?market=ae|in)
 *   3. market_preference cookie (set by the country switcher)
 *   4. Default: India
 *
 * The middleware also handles geo-routing at the edge — by the time this
 * hook runs, a UAE visitor will already be on /ae, so pathname === "/ae"
 * is the most common positive case.
 */
export function useMarket(): Market {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pathname === "/ae" || pathname?.startsWith("/ae/")) return "ae";

  const param = searchParams.get("market");
  if (param === "ae") return "ae";
  if (param === "in") return "in";

  if (typeof document !== "undefined") {
    const m = document.cookie.match(/(?:^|;\s*)market_preference=([^;]+)/);
    if (m && m[1] === "ae") return "ae";
  }

  return "in";
}
