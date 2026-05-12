"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePostHog } from "posthog-js/react";

const SIGN_IN_URL = "https://app.tryratio.io/sign-in";
const SIGN_UP_URL = "https://app.tryratio.io/sign-up";

/**
 * Top nav for /tally-mcp. Mirrors the desktop layout used elsewhere on
 * tryratio.io and collapses the Sign in / Get started CTAs into a
 * hamburger overlay on mobile, just like the main Navbar component.
 */
export function TallyMcpNav() {
  const [open, setOpen] = useState(false);
  const posthog = usePostHog();

  function trackCta(event: "signup_clicked" | "signin_clicked", location: string) {
    // Fire-and-forget. PostHog's send uses fetch/sendBeacon so the event
    // delivers even when the browser navigates away to app.tryratio.io.
    posthog?.capture(event, {
      location,
      page: "/tally-mcp",
    });
  }

  return (
    <header className="border-b border-border relative">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        {/*
          Logo links to "/". Edge middleware on `/` handles geo-routing
          (UAE → /ae, everyone else → /).
        */}
        <a
          href="/"
          aria-label="Ratio home"
          className="flex flex-col items-start gap-1 shrink-0 hover:opacity-80 transition-opacity"
        >
          <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-text-secondary opacity-70 leading-none">
            Powered by
          </span>
          <span className="flex items-center gap-2">
            <img src="/logo.svg" alt="Ratio" className="w-8 h-8" />
            <span className="text-xl font-bold text-navy tracking-tight">Ratio</span>
          </span>
        </a>

        {/* Desktop CTAs */}
        <nav className="hidden md:flex items-center gap-4 md:gap-5">
          <a
            href={SIGN_IN_URL}
            onClick={() => trackCta("signin_clicked", "tally_mcp_header")}
            className="text-sm md:text-base font-medium text-text-secondary hover:text-navy transition-colors"
          >
            Sign in
          </a>
          <a
            href={SIGN_UP_URL}
            onClick={() => trackCta("signup_clicked", "tally_mcp_header")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-navy text-white text-base font-medium rounded-full whitespace-nowrap shrink-0 hover:bg-navy-light transition-colors"
          >
            Get started
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden flex items-center justify-center w-9 h-9 text-navy"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/*
        Mobile menu overlay. Styling and animation mirror the main Navbar
        component's mobile menu so the design is consistent across the site:
        same cream background, same border + shadow, same y: -10 / 0.2s
        easeOut transition, same text-link row + navy pill CTA pattern.
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute inset-x-0 top-full bg-cream backdrop-blur-lg border-b border-border shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-40"
          >
            <div className="flex flex-col px-6 py-5">
              <a
                href={SIGN_IN_URL}
                onClick={() => {
                  trackCta("signin_clicked", "tally_mcp_mobile_menu");
                  setOpen(false);
                }}
                className="text-base font-medium text-navy py-3 border-b border-border/50"
              >
                Sign in
              </a>
              <a
                href={SIGN_UP_URL}
                onClick={() => {
                  trackCta("signup_clicked", "tally_mcp_mobile_menu");
                  setOpen(false);
                }}
                className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-navy text-white text-base font-medium rounded-full hover:bg-navy-light transition-colors"
              >
                Get started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
