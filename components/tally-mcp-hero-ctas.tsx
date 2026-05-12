"use client";

import { usePostHog } from "posthog-js/react";

const SIGN_IN_URL = "https://app.tryratio.io/sign-in";
const SIGN_UP_URL = "https://app.tryratio.io/sign-up";

/**
 * The Get started / Sign in pair that sits in the /tally-mcp hero.
 *
 * Lives in its own client component (rather than inline on the page) so it
 * can fire a PostHog event before the cross-origin navigation to
 * app.tryratio.io. The page itself is an async server component and can't
 * use hooks directly.
 */
export function TallyMcpHeroCtas() {
  const posthog = usePostHog();

  function trackCta(event: "signup_clicked" | "signin_clicked") {
    posthog?.capture(event, {
      location: "tally_mcp_hero",
      page: "/tally-mcp",
    });
  }

  return (
    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 mb-16">
      <a
        href={SIGN_UP_URL}
        onClick={() => trackCta("signup_clicked")}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white text-[15px] font-medium rounded-full hover:bg-navy-light transition-colors w-full sm:w-auto"
      >
        Get started
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[16px] h-[16px]"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
      <a
        href={SIGN_IN_URL}
        onClick={() => trackCta("signin_clicked")}
        className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-navy text-[15px] font-medium rounded-full border border-border hover:bg-cream-dark transition-colors w-full sm:w-auto"
      >
        Sign in
      </a>
    </div>
  );
}
