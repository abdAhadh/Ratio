"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Runs only on the India page (/).
// Timezone fallback for VPN users: if no explicit preference is saved and
// the browser timezone is Asia/Dubai, redirect to /ae for this session only.
// Does NOT set a cookie — only the explicit country switcher persists a preference.
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
      router.replace("/ae");
    }
  }, [router]);

  return null;
}
