"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Runs only on the India page (/).
// If the user has no saved market preference and their timezone is Asia/Dubai,
// treat them as a UAE visitor (catches VPN users where IP geo is wrong).
export function GeoRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Don't override an explicit user preference
    const saved = document.cookie
      .split("; ")
      .find((r) => r.startsWith("market_preference="))
      ?.split("=")[1];
    if (saved) return;

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === "Asia/Dubai") {
      // Set cookie so middleware respects it on next navigation
      document.cookie =
        "market_preference=ae; path=/; max-age=" + 60 * 60 * 24 * 30 + "; samesite=lax";
      router.replace("/ae");
    }
  }, [router]);

  return null;
}
