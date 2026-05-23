import type { Metadata } from "next";
import { Geist, Gelasio } from "next/font/google";
import "./globals.css";

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

const SITE_TITLE = "Ratio | Your AI coworker to automate AR";
const SITE_DESCRIPTION =
  "Ratio is the AI coworker that automates accounts receivable. Multi-channel collections, cash auto-applied, deductions recovered, disputes resolved.";

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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ratio, your AI coworker to automate AR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
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
      </head>
      <body>{children}</body>
    </html>
  );
}
