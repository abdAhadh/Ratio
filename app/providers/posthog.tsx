"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { readConsent, type Consent } from "@/lib/consent";

/**
 * PostHog analytics — gated by the cookie banner.
 *
 * Init posture is "opt-out by default": PostHog loads but tracks nothing
 * until the visitor explicitly accepts. This keeps us GDPR-safe in EU
 * jurisdictions and matches modern consent best practice (no events fire
 * before consent is granted).
 *
 * The cookie banner writes a `Consent` object to localStorage and dispatches
 * a `ratio:consent` CustomEvent. This provider listens for both the initial
 * stored value (on mount) and live changes (on banner save) and toggles
 * PostHog's capturing + session recording accordingly.
 */
const POSTHOG_KEY = "phc_xEe2HJf2pmKB4wK2EAURZMETSYLU5mdiGfUNiWz4hc6V";
const POSTHOG_HOST = "https://us.i.posthog.com";

if (typeof window !== "undefined" && POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "always",
    capture_pageview: false, // we capture manually below for SPA navigation
    capture_pageleave: true,
    opt_out_capturing_by_default: true,
    session_recording: {
      recordCrossOriginIframes: true,
    },
  });
}

function applyConsent(c: Consent | null) {
  if (typeof window === "undefined") return;
  if (!c || !c.analytics) {
    posthog.opt_out_capturing();
    return;
  }
  posthog.opt_in_capturing();
  if (c.recording) {
    posthog.startSessionRecording();
  } else {
    posthog.stopSessionRecording();
  }
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();

  useEffect(() => {
    if (pathname && ph) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) url += "?" + search;
      ph.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, ph]);

  return null;
}

function ConsentBridge() {
  useEffect(() => {
    // Apply whatever's already in storage (e.g., on a returning visitor)
    applyConsent(readConsent());
    // Live updates from the banner save
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Consent>).detail;
      applyConsent(detail ?? null);
    };
    window.addEventListener("ratio:consent", handler);
    return () => window.removeEventListener("ratio:consent", handler);
  }, []);
  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      <ConsentBridge />
      {children}
    </PHProvider>
  );
}
