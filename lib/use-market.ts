"use client";

import { usePathname, useSearchParams } from "next/navigation";

export type Market = "ae" | "us";

/**
 * Single source of truth for which market the user is currently on.
 * Used by Navbar, Footer, Demo page — anywhere the UI varies by market.
 *
 * Resolution order (highest to lowest priority):
 *   1. URL pathname (e.g. /ae → ae)
 *   2. URL query param (?market=ae|us)
 *   3. market_preference cookie (set by the country switcher)
 *   4. Default: US (also rendered at "/")
 *
 * The middleware handles geo-routing at the edge — GCC visitors will be on
 * /ae by the time this hook runs.
 */
export function useMarket(): Market {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pathname === "/ae" || pathname?.startsWith("/ae/")) return "ae";
  if (pathname === "/us" || pathname?.startsWith("/us/")) return "us";

  const param = searchParams.get("market");
  if (param === "ae") return "ae";
  if (param === "us") return "us";

  if (typeof document !== "undefined") {
    const m = document.cookie.match(/(?:^|;\s*)market_preference=([^;]+)/);
    if (m && m[1] === "ae") return "ae";
  }

  return "us";
}
