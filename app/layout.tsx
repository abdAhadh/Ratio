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
        {/* Preload the UnicornStudio runtime so the background shaders
            initialise as soon as the first IntersectionObserver fires —
            without this the script only starts fetching when a shader
            comes into view, adding a noticeable beat on a cold load. */}
        <link
          rel="preload"
          as="script"
          href="/unicornStudio.umd.js"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
