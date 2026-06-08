import type { Metadata } from "next";
import { Geist, Gelasio } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "./providers/posthog";
import { CookieBanner } from "@/components/cookie-banner";
import { ChatWidget } from "@/components/chat-widget";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  /* Disable Next.js's "Geist Fallback" face which uses adjusted system-font
     metrics. 8098 (a Framer site) does not insert this fallback, so leaving
     it on causes visible weight/letter-spacing drift while Geist loads. */
  adjustFontFallback: false,
});

const gelasio = Gelasio({
  variable: "--font-gelasio",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: false,
});

const SITE_TITLE = "Ratio | Recover retail deductions on autopilot";
const SITE_DESCRIPTION =
  "Ratio's AI agents pull deductions from portals, emails and EDI, match them against your contracts and shipment docs, and dispute the invalid ones. Adds 3% back to your topline.";

export const metadata: Metadata = {
  metadataBase: new URL("https://tryratio.io"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://tryratio.io",
    siteName: "Ratio",
    type: "website",
    images: [
      {
        url: "/og-image-v2.png",
        width: 1200,
        height: 630,
        alt: "Ratio: AI agents that recover invalid retailer deductions and FBA reimbursement leakage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image-v2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geist.variable} ${gelasio.variable}`}
    >
      <head>
        {/* Preload the UnicornStudio runtime + every scene JSON / texture
            the page renders so the shaders can hit a warm cache on first
            paint instead of doing a serial fetch chain. The 4 unique scenes
            in use across the page total ~120 KB — fine to grab upfront. */}
        <link rel="preload" as="script" href="/unicornStudio.umd.js" />
        <link
          rel="preload"
          as="fetch"
          href="/us-scenes/hNoUYN2AHKFq4LxKJyNV.json"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="fetch"
          href="/us-scenes/dEgIk7gTgac92JHdIqzB.json"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="fetch"
          href="/us-scenes/mAQ1wUPYxiiGOyyU767Z.json"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href="/us-textures/blue_noise_med-3e976e.png"
        />
        <link
          rel="preload"
          as="image"
          href="/us-textures/remix_download__83_-7f61c2.jfif"
        />
        {/* Kick off the UnicornStudio runtime load + parse during the
            initial HTML parse, not after hydration — without this the script
            only starts executing once the first shader's IntersectionObserver
            fires, which can be a full second after first paint on slow links. */}
        <script src="/unicornStudio.umd.js" async data-ratio-unicorn="1" />

        {/* WebGL recovery on browser back-navigation.
            On localhost dev (Next.js 16 + Turbopack) React occasionally
            does not run its useEffects after a cross-origin back nav,
            leaving the shader's <canvas> blank. This inline script lives
            OUTSIDE the React lifecycle: it listens for `pageshow` and,
            if our localizer flag (set inside the shader's useEffect)
            hasn't been raised after a short delay, forces a fresh
            navigation so the shader re-initializes from scratch.
            Production builds don't exhibit the bug, so the reload only
            fires when the bug is actually present.
            sessionStorage gate prevents reload loops on the rare path
            where the reload itself fails to hydrate. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var KEY='__ratio_reload_attempt__';
                window.addEventListener('pageshow', function(){
                  setTimeout(function(){
                    var hasShader = document.querySelector('[data-us-project]');
                    if (!hasShader) return;
                    if (window.__ratioUsLocalized) {
                      sessionStorage.removeItem(KEY);
                      return;
                    }
                    var count = parseInt(sessionStorage.getItem(KEY) || '0', 10);
                    if (count >= 1) return;
                    sessionStorage.setItem(KEY, String(count + 1));
                    location.reload();
                  }, 1200);
                });
              })();
            `,
          }}
        />
      </head>
      <body>
        <PostHogProvider>
          {children}
          <CookieBanner />
          {/* Site-wide floating chat bubble (bottom-right, desktop only).
              Mounted at the root layout so it's present on every route
              (home, contact, case studies, /mcp, etc.) without each page
              needing to opt in. POSTs the conversation to /api/chat which
              forwards it to Slack via SLACK_WEBHOOK_URL (same env var the
              demo form uses). */}
          <ChatWidget />
        </PostHogProvider>
      </body>
    </html>
  );
}
