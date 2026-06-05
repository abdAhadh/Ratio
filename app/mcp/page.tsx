import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { TrustedByStrip, type LogoSpec } from "@/components/trusted-by-strip";
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
  title: "Connect Walmart to Claude & ChatGPT · Ratio MCP",
  description:
    "A free MCP server for Walmart Marketplace data. Ask Claude, ChatGPT or any MCP-compatible AI about your deductions, orders, performance, listings and more. Amazon and other retailers coming soon.",
  openGraph: {
    title: "Connect Walmart to Claude & ChatGPT · Ratio MCP",
    description:
      "Free MCP server for Walmart Marketplace data. Amazon and other retailers coming soon.",
    type: "website",
  },
};

/* ───── Inline brand glyphs for the H1 ─────
 * All three render in currentColor so the glyphs stay white alongside
 * their wordmarks, keeping the headline visually unified. */

/* Walmart spark — the 6-petal radial mark, currentColor (white). */
const WalmartLogo = () => (
  <svg
    viewBox="-149 631 41 36"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M-128.67 643.868c.758 0 1.415-.404 1.466-.9l.758-8.54c0-.86-1-1.516-2.224-1.516-1.263 0-2.224.708-2.224 1.516l.758 8.54c.05.505.708.9 1.466.9m-4.65 2.68c.404-.657.354-1.415-.05-1.718l-7.025-4.902c-.708-.404-1.82.1-2.426 1.162s-.505 2.274.202 2.678l7.783 3.64c.505.152 1.162-.202 1.516-.86m9.25-.001c.404.657 1.06 1 1.516.8l7.783-3.64c.708-.404.86-1.617.202-2.678-.606-1.06-1.718-1.567-2.426-1.162l-7.025 4.902c-.404.354-.455 1.112-.05 1.77m-4.6 7.983c.758 0 1.415.404 1.466.9l.758 8.54c0 .86-1 1.516-2.224 1.516-1.263 0-2.224-.708-2.224-1.516l.758-8.54c.05-.505.708-.9 1.466-.9m4.6-2.67c.404-.657 1.06-1 1.516-.8l7.783 3.588c.708.404.86 1.617.202 2.678-.606 1.06-1.718 1.567-2.426 1.162l-7.025-4.902c-.404-.303-.455-1.06-.05-1.718m-9.25.002c.404.657.354 1.415-.05 1.718l-7.025 4.902c-.708.404-1.82-.1-2.426-1.162s-.505-2.274.202-2.678l7.783-3.588c.505-.202 1.162.152 1.516.8"
      fill="currentColor"
    />
  </svg>
);

/* Claude logomark — currentColor so it inherits the H1 white. */
const ClaudeLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </svg>
);

/* ChatGPT mark — currentColor so it inherits the H1 white. */
const ChatGptLogo = () => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-0.171 0.482 41.142 40.034"
    aria-hidden="true"
  >
    <path
      d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z"
      fill="currentColor"
    />
  </svg>
);

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
  const headline = (
    <>
      Connect{" "}
      <span className={styles.brandInline}>
        <WalmartLogo />
        Walmart
      </span>{" "}
      to{" "}
      <span className={styles.brandInline}>
        <ClaudeLogo />
        Claude
      </span>{" "}
      &amp;{" "}
      <span className={styles.brandInline}>
        <ChatGptLogo />
        ChatGPT
      </span>
    </>
  );

  return (
    <div className={styles.page}>
      <SiteNav
        navItems={[]}
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
        eyebrowText="Free · MCP server for Walmart"
        customHeadline={headline}
        subLine1="Ask Claude, ChatGPT or any MCP-compatible AI anything about your Walmart Marketplace data: orders, performance, listings, deductions, returns and more."
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
