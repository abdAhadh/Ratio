import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { TrustedByStrip, type LogoSpec } from "@/components/trusted-by-strip";
import { MCPCyclingHeadline } from "@/components/mcp-cycling-headline";
import styles from "./mcp.module.css";

/**
 * /mcp — Ratio MCP servers for retailers.
 *
 * Walmart MCP is live; Amazon and other retailers follow. The page
 * reuses the shared Hero shell from the home page (same shader, same
 * eyebrow / H1 / CTA rhythm) and the SiteNav with the centre nav links
 * stripped. Below the hero we list the live retailer in brand colour
 * and the upcoming retailers as a silver-white marquee.
 *
 * The footer's COMPANY column links here as "Free Walmart MCP".
 */
export const metadata: Metadata = {
  title: "Ask any AI about your Walmart and Amazon stores · Ratio MCP",
  description:
    "Free MCP servers for Walmart and Amazon. Ask Claude, ChatGPT or any MCP-compatible AI about your orders, inventory, deductions, returns, listings and performance.",
  openGraph: {
    title: "Ask any AI about your Walmart and Amazon stores · Ratio MCP",
    description:
      "Free MCP servers for Walmart and Amazon. Plug your seller account into Claude, ChatGPT or any MCP-compatible AI.",
    type: "website",
  },
};

/* Coming-soon retailers. Walmart isn't in this set because it's already
 * the live integration shown in the hero H1 — repeating it here would
 * read as "Walmart coming soon" which is the opposite of true. */
const COMING_SOON_LOGOS: LogoSpec[] = [
  { src: "/ratio-integrations/retailer-amazon.svg", alt: "Amazon" },
  { src: "/ratio-integrations/retailer-target.svg", alt: "Target", h: "lg" },
  { src: "/ratio-integrations/retailer-kroger.svg", alt: "Kroger" },
  { src: "/ratio-integrations/retailer-costco.svg", alt: "Costco" },
  { src: "/ratio-integrations/retailer-tesco.svg", alt: "Tesco" },
  { src: "/ratio-integrations/retailer-asda.svg", alt: "ASDA" },
  { src: "/ratio-integrations/retailer-morrisons.svg", alt: "Morrisons" },
  { src: "/ratio-integrations/retailer-sainsburys.svg", alt: "Sainsbury's" },
  { src: "/ratio-integrations/retailer-waitrose.svg", alt: "Waitrose" },
];

export default function McpPage() {
  /* Headline cycles two slots:
     • the AI client (Claude ↔ ChatGPT)
     • the seller store (Walmart ↔ Amazon)
     ...on independent timers so the matrix of "any AI × any retailer"
     reads as a single moving line. See MCPCyclingHeadline for the
     framer-motion swap mechanics. */
  const headline = <MCPCyclingHeadline />;

  return (
    <div className={styles.page}>
      <SiteNav
        secondaryCta={{
          href: "https://app.tryratio.io/sign-in",
          label: "SIGN IN",
        }}
        cta={{
          href: "https://app.tryratio.io/sign-up",
          label: "GET STARTED FOR FREE",
        }}
      />

      <Hero
        eyebrowText="Free · MCP server for Walmart and Amazon"
        customHeadline={headline}
        subLine1="Ask Claude, ChatGPT or any MCP-compatible AI anything about your Walmart and Amazon Marketplace data: orders, performance, listings, deductions, returns and more."
        subLine2=""
        primaryCta={{
          href: "https://app.tryratio.io/sign-up",
          label: "GET STARTED FOR FREE",
        }}
        secondaryCta={{
          href: "https://app.tryratio.io/sign-in",
          label: "SIGN IN",
        }}
        shaderProject="hNoUYN2AHKFq4LxKJyNV"
      />

      {/* Overlay strip at the bottom of the hero — same component the
          home page uses, just with different label + logo set. The
          ticker scrolls the upcoming retailers and the left-side label
          flags that the Walmart MCP is the start of the series. */}
      <TrustedByStrip
        labelLine1="More"
        labelLine2="coming soon"
        logos={COMING_SOON_LOGOS}
      />

      <SiteFooter />
    </div>
  );
}
