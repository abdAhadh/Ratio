import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Footer } from "@/components/footer";
import { TallyMcpNav } from "@/components/tally-mcp-nav";
import { TallyMcpComingSoon } from "@/components/tally-mcp-coming-soon";
import { TallyMcpHeroCtas } from "@/components/tally-mcp-hero-ctas";
import type { Market } from "@/lib/use-market";

export const metadata: Metadata = {
  title: "Connect Tally Prime to Claude & ChatGPT · Ratio",
  description:
    "A free, copy-paste MCP server guide. Go from zero to AI-powered finance ops in under 30 minutes. Works with Tally Prime on desktop and on cloud.",
  openGraph: {
    title: "Connect Tally Prime to Claude & ChatGPT",
    description:
      "A free, copy-paste MCP connector that brings Claude and ChatGPT to your Tally Prime data. Setup in under 30 minutes. Works on desktop and cloud.",
    type: "website",
    url: "https://tryratio.io/tally-mcp",
    siteName: "Ratio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect Tally Prime to Claude & ChatGPT",
    description:
      "A free, copy-paste MCP connector that brings Claude and ChatGPT to your Tally Prime data. Setup in under 30 minutes.",
  },
};

export default async function TallyMcpPage() {
  // Read the market_preference cookie server-side so the Footer renders the
  // correct US/UAE links on the server itself. Without this, useMarket()
  // returns "us" on SSR and "ae" on hydration for UAE users with the cookie,
  // causing a Next.js hydration mismatch in the Footer logo's href.
  const cookieStore = await cookies();
  const market: Market =
    cookieStore.get("market_preference")?.value === "ae" ? "ae" : "us";

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/*
        Top nav. Client component because the mobile hamburger menu carries
        its own open/closed state. Mirrors the main Navbar's positioning on
        desktop and collapses the CTAs into a hamburger overlay on mobile.
      */}
      <TallyMcpNav />

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 md:px-10 py-12 md:py-20 text-center relative overflow-hidden">
        {/* Soft blur accents */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "480px",
            height: "480px",
            background: "rgba(196, 149, 106, 0.18)",
            filter: "blur(80px)",
            top: "-100px",
            left: "-120px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "420px",
            height: "420px",
            background: "rgba(74, 108, 247, 0.10)",
            filter: "blur(80px)",
            bottom: "-80px",
            right: "-100px",
          }}
        />

        {/* Chip */}
        <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 bg-navy/5 border border-navy/10 rounded-full mb-6">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#16A34A", boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.15)" }}
          />
          <span className="text-xs font-medium text-navy">Free · Setup in under 30 minutes</span>
        </div>

        {/* Headline. Font size lives in globals.css (.tally-hero-headline)
            so the mobile and desktop ranges can be tuned independently via
            a media query. */}
        <h1
          className="tally-hero-headline relative z-10 font-bold text-navy leading-[1.1] sm:leading-[1.05] tracking-[-0.03em] sm:tracking-[-0.035em] mb-6 max-w-[1000px]"
        >
          Connect your Tally{" "}
          {/* Mobile-only break after "Tally" → line 1 ends here on mobile */}
          <br className="sm:hidden" />
          Prime{" "}
          {/* Desktop-only break after "Prime" → line 1 ends here on desktop */}
          <br className="hidden sm:inline" />
          to{" "}
          <span className="inline-flex items-center gap-[0.22em] whitespace-nowrap align-baseline">
            <span
              className="inline-flex items-center justify-center flex-shrink-0"
              style={{ width: "0.85em", height: "0.85em", position: "relative", top: "-0.03em" }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <title>Claude</title>
                <path
                  d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"
                  fill="#D97757"
                  fillRule="nonzero"
                />
              </svg>
            </span>
            Claude
          </span>{" "}
          {/* Mobile-only break before "&" → line 2 ends after Claude on mobile,
              line 3 starts with "& ChatGPT". */}
          <br className="sm:hidden" />
          &amp;{" "}
          <span className="inline-flex items-center gap-[0.22em] whitespace-nowrap align-baseline">
            <span
              className="inline-flex items-center justify-center flex-shrink-0 text-black"
              style={{ width: "0.85em", height: "0.85em", position: "relative", top: "-0.03em" }}
              aria-hidden="true"
            >
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.171 0.482 41.142 40.034"
                className="w-full h-full"
              >
                <path
                  d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z"
                  fill="currentColor"
                />
              </svg>
            </span>
            ChatGPT
          </span>
        </h1>

        {/* Subhead */}
        <p
          className="relative z-10 font-normal text-text-secondary leading-relaxed max-w-[560px] mb-8"
          style={{ fontSize: "clamp(15px, 1.25vw, 17px)" }}
        >
          A free, copy-paste MCP server guide. Go from zero to AI-powered finance ops in under 30
          minutes. Works with Tally Prime on desktop and on cloud.
        </p>

        {/* Hero CTAs (client component so it can track clicks to PostHog
            before the cross-origin navigation). */}
        <TallyMcpHeroCtas />

        {/* Available now */}
        <div className="relative z-10 w-full max-w-[1080px] text-center">
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-text-secondary mb-5">
            Available Now
          </p>
          <div className="flex items-center justify-center mb-12">
            <svg
              height="50"
              viewBox="99 144 800 339"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Tally Prime"
            >
              <path d="m139 424.8h4.6c3.9 0 6.5 1.9 6.5 5.9s-2 5.9-6.5 5.9h-4.6zm0 35.8v-16.9h3.3c10.4 0 15-4.6 15-12.4s-4.6-12.4-15-12.4h-11.8v41.7zm42.9-30.6c0-4.6 2-5.9 5.2-5.9s5.2 1.3 5.2 5.9v17c0 4.5-2 5.9-5.2 5.9s-5.2-1.3-5.2-5.9zm-7.8 16.3c0 10.4 5.9 14.3 13.7 14.3 8.5 0 13.7-3.9 13.7-14.3v-15c0-10.4-5.9-13.7-13.7-13.7s-13.7 3.9-13.7 13.7zm51.5 14.3h7.8l7.1-28.6 5.9 28.6h7.8l9.8-41.6h-7.8l-5.9 26.7-5.9-26.7h-8.4l-5.9 26.7-5.9-26.7h-7.8zm77.4 0v-7.1h-14.9v-11.1h11v-7.2h-11v-9.7h14.9v-6.5h-22.8v41.6zm26.1-35.8h4.6c3.9 0 5.9 2 5.9 5.9s-2 5.9-5.9 5.9h-4.6zm20.2 35.8-7.8-18.9c4.6-2 6.5-5.2 6.5-10.4 0-7.8-4.6-12.4-15-12.4h-12.3v41.7h8.5v-16.9h3.9l7.2 16.9zm51.4-30.6c0-4.6 2-5.9 5.2-5.9s5.9 1.3 5.9 5.9v17c0 4.5-2 5.9-5.9 5.9-3.3 0-5.2-1.3-5.2-5.9zm-8.5 16.3c0 10.4 5.9 14.3 13.7 14.3 8.5 0 13.7-3.9 13.7-14.3v-15c0-10.4-5.9-13.7-13.7-13.7s-13.7 3.9-13.7 13.7zm53.4 14.3v-18.2h10.4v-7.2h-10.4v-9.7h13.7v-6.5h-22.2v41.6zm82.7-33.2c-1.3-5.9-5.9-10.4-13.7-10.4-8.5 0-13 4.6-13 11.7 0 11.7 18.2 11.7 18.2 19.5 0 3.2-2 5.2-5.2 5.2-2.6 0-5.9-2-6.5-6.5l-7.2 1.3c2 8.5 7.2 11.7 14.3 11.7 8.5 0 13.7-4.6 13.7-11.7 0-13-18.2-13.7-18.2-19.5 0-3.3 1.3-4.6 4.6-4.6 2.6 0 4.6 2 5.9 5.9zm25.4 33.2v-41.6h-8.5v41.6zm24.1 0v-33.2l9.1 33.2h6.5l8.5-33.2v33.2h7.1v-41.6h-11l-7.8 26.7-7.9-26.7h-11.7v41.6zm56-35.8h4.6c3.9 0 6.5 1.9 6.5 5.9s-2 5.9-6.5 5.9h-4.6zm0 35.8v-16.9h3.9c10.4 0 15-4.6 15-12.4s-5.2-12.4-15-12.4h-11.7v41.7zm54 0v-7.1h-13v-34.5h-8.5v41.6zm23.4 0v-41.6h-8.4v41.6zm23.5-30.6c0-4.6 2-5.9 5.2-5.9s5.9 1.3 5.9 5.9v1.3h8.5c0-10.4-5.9-13.7-13.7-13.7s-13.7 3.9-13.7 13.7v15c0 10.4 5.9 14.3 13.7 14.3 8.5 0 13.7-3.9 13.7-14.3v-2h-8.5v2.6c0 4.5-2 5.9-5.9 5.9-3.2 0-5.2-1.3-5.2-5.9zm45.6 30.6v-41.6h-7.8v41.6zm15.6-41.6v6.5h9.8v35.1h7.8v-35.1h9.7v-6.5zm48.2 0h-8.5l11.7 24.7v16.9h8.5v-16.9l11.7-24.7h-8.5l-7.1 16.2z" />
              <path d="m429.3 282.9c5.9-3.9 18.2-18.9 18.9-20.2s3.2-3.9.6-6.5-5.2-1.3-8.5.6c-3.2 1.3-16.9 11.7-22.1 16.3-5.2 3.9-18.2 15.6-18.2 15.6s-7.2 5.9-4.6 9.1 5.2 2 8.5.7c3.9-1.3 19.6-11.7 25.4-15.6zm289.1 73.6c2 .6 6.5 2 6.5 6.5 0 0-4.6 9.1-5.9 9.8-2 .6-5.2.6-11.7-2s-38.4-10.4-46.9-12.4-27.3-5.2-27.3-5.2-2.6-1.3-6.5 4.6c-3.9 6.5-16.3 24.1-16.3 24.1-.4 1.5-1.7 2.6-3.2 2.6-2.6 0-12.4-.7-16.3-2.6s-5.2-2-2.6-5.9 11.1-21.5 15-24.7c3.2-3.2-2.6-2.6-4.6-3.2s-39.7-2.6-50.8-2c-11.1 0-50.1 0-64.5 1.3-14.3.6-65.1 5.9-78.8 7.8-13.7 2.6-68.4 9.8-75.5 11.7s-22.1 3.9-22.1 3.9c-5 1.1-10.2.7-15-1.3-7.2-3.2-18.9-7.8-9.1-11.1s58.6-13 73.6-15c15-2.6 62.5-9.1 82-9.8s73.6-3.9 93.8-3.9 47.5 1.3 59.9 2.6c11.7.6 19.5 1.3 22.1 2s2.6-1.3 5.2-3.9 9.8-12.4 9.8-12.4 2.6-3.9-2.6-.6c-4.6 3.2-12.4 3.2-16.3 0-3.9-3.9-5.2-7.2-7.2-5.9-4.2 2.3-8.5 4.3-13 5.9-3.9 1.3-20.8 5.2-30.6-1.3-9.8-7.2-10.4-9.8-11.7-13-1.3-4.5-2-4.5-5.2-2.6-3.3 1.9-14.3 7.8-18.9 9.8-4.1 2.4-8.9 3.3-13.7 2.6-6.5-.6-13.7-2.6-16.9-7.8-2.6-5.2-3.2-9.1-6.5-6.5s-21.5 13-31.2 15.6c-9.8 3.3-12.4 3.9-17.6 3.3-5.9-.6-11.7-3.3-13.7-6.5s-2.6-3.9-5.2-2.6c-2.6 2-9.8 7.2-15 7.2-5.2-.6-18.9-3.9-26-17.6s-2-19.5 4.6-26.7c6.5-6.5 18.2-16.9 18.2-16.9s15-11.1 19.5-13c5.2-2.6 13-7.2 18.2-7.2 7.1-.9 14.2 1.2 19.6 5.9 7.2 5.9 11.7 11.7 12.4 14.3s3.9 10.4-1.3 16.3-20.2 19.5-20.2 19.5-5.9 3.3-3.3 7.2 12.4-2.6 15.6-4.5c3.2-2.6 20.2-16.9 25.4-21.5 5.2-5.2 37.8-37.1 41-40.4 2.6-3.3 30-30 33.8-32.6 3.9-2.6 5.2-4.6 13-3.2 4.1.7 8 2 11.7 3.9 0 0 7.8 3.3 1.3 7.8-5.9 4.5-26.7 22.1-31.9 27.3s-20.2 20.2-24.7 25.4c-4.6 6.5-17.6 22.8-19.5 25.4-2 3.3-3.3 6.5 0 9.1 3.3 2 9.1 0 15-5.2s24.1-20.2 30-26.7c6.5-6.5 40.4-38.4 43.6-41.7 3.3-2.6 18.9-15 18.9-15s2-2.6 6.5-2.6 9.1.6 11.7 2l7.8 3.9s3.2 1.3-2 5.2-33.8 26-41 34.5c-7.8 8.5-22.8 25.4-28.7 32.6-5.9 7.8-9.8 11.1-5.2 16.3s9.8 3.9 12.4 3.3c6.5-3.7 12.4-8.3 17.6-13.7 6.5-6.5 26-28 28.7-30 2-2.6 9.8-9.8 9.8-9.8s1.3-3.2 5.9-3.2 6.5.6 11.1 1.3c3.9.6 13 2.6 8.5 7.8-5.2 5.2-17.6 18.2-20.2 20.8-2.6 3.2-13 15-15 18.2s-4.6 7.2-2 9.1 9.8-.6 16.3-4.6c9-4.8 17.3-10.7 24.7-17.6 8.5-7.8 22.1-20.2 22.1-20.2s2.6-5.2 12.4-3.2c9.8 2.6 12.4 3.2 12.4 3.2s7.8 2 2.6 6.5-22.1 20.2-28.6 26c-6.5 6.5-26.7 26.7-30 30.6s-13 13-9.1 13.7 33.9 5.9 40.4 7.9c5.1 3.9 28.6 11.7 30.5 13zm-336.6-162.1c-5.8-.8-11.7-.8-17.6 0-9.8 1.3-38.4 3.9-43.6 6.5s-9.8-3.3-11.7-5.2c-2.6-2-7.8-7.8-7.8-7.8s-2.6-3.3 2-4.6c5.2-1.3 34.5-5.9 43.6-7.2 9.1-.6 53.4-3.3 65.8-3.3 11.7 0 52.7 2.6 63.8 5.2 0 0 2-.6 4.6 4.6 1.2 3.3 1.9 6.9 2 10.4 0 0 2 3.9-5.2 3.3-8.5-.6-20.8-1.3-29.3-2s-28.6-2-31.9-2c-2.6 0-3.9 0-5.2 2.6-2 2.6-9.8 13-11.7 15.6s-10.4 13.7-17.6 23.5-16.3 22.1-24.7 34.5c-7.8 13-15 24.7-18.2 30-2 3.1-3.7 6.4-5.2 9.8-.6 1.3-1.3 3.3-5.2 3.3s-20.8-.6-20.8-.6-7.2.6-2.6-7.2c4.6-8.5 14.3-24.7 18.2-30.6 3.9-6.5 25.4-35.8 29.9-41 3.7-4.6 28.4-37.8 28.4-37.8z" fill="#ed1c24" />
            </svg>
          </div>

          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-text-secondary opacity-70 mb-5">
            More coming soon
          </p>
          <TallyMcpComingSoon />
        </div>
      </main>

      {/*
        Footer (shared, market-aware). Passing the server-resolved market
        eliminates the hydration mismatch caused by client-only cookie reads.
      */}
      <Footer market={market} />
    </div>
  );
}
