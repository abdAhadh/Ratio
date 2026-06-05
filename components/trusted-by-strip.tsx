"use client";

import { Fragment, useEffect, useRef } from "react";
import styles from "./trusted-by-strip.module.css";

/**
 * Trusted-by strip — pixel-matched against localhost:8098.
 *
 *  - <section>:  1440 × 112 at viewport top:788 (overlays bottom 112px of hero)
 *  - Subheading: 253 wide · "Integrations with" label
 *  - Ticker:     remaining width · diagonal stripe PNG bg · scrolling logo row
 *
 * 8098 uses a JS-driven ticker (transform: translateX nudged by interval)
 * with `transition: all`. We replicate via JS in this component so the speed
 * matches 8098 exactly. Logos use TWO different filters:
 *   - Simple wordmarks (NetSuite, SAP, Dynamics, Sage) →
 *       `brightness(0) invert(1)`  (collapse to white silhouette)
 *   - Icon-with-detail logos (QuickBooks, Salesforce) →
 *       `grayscale(1) brightness(1.3) contrast(1.05)`  (preserve internal text)
 */

export type LogoSpec = {
  src: string;
  alt: string;
  /* "lg" gives a slightly taller render — used for logos whose viewBox is
     portrait (Target's bullseye + wordmark) so they read at similar visual
     weight as the wider wordmarks. */
  h?: "lg";
  filter?: "preserve";
};

/* Same 18-logo set as the integrations marquee, rendered shorter (height
   22px on desktop / ~18px on mobile) and faster-scrolling. Order alternates
   retailers / ERPs / distributors so the strip reads as a varied mix.
   All logos render with `width: auto` so the browser computes each width
   from its native aspect ratio at the fixed CSS height — uniform cap-height
   across the strip. */
const LOGOS: LogoSpec[] = [
  { src: "/ratio-integrations/retailer-walmart.svg",    alt: "Walmart" },
  { src: "/ratio-integrations/erp-netsuite.svg",        alt: "Oracle NetSuite" },
  { src: "/ratio-integrations/retailer-target.svg",     alt: "Target" },
  { src: "/ratio-integrations/retailer-tesco.svg",      alt: "Tesco" },
  { src: "/ratio-integrations/erp-sap.svg",             alt: "SAP" },
  { src: "/ratio-integrations/retailer-costco.svg",     alt: "Costco" },
  { src: "/ratio-integrations/retailer-sainsburys.svg", alt: "Sainsbury's" },
  { src: "/ratio-integrations/erp-dynamics365.png",     alt: "Microsoft Dynamics 365" },
  { src: "/ratio-integrations/retailer-kroger.svg",     alt: "Kroger" },
  { src: "/ratio-integrations/retailer-asda.svg",       alt: "ASDA" },
  { src: "/ratio-integrations/distributor-kehe.svg",    alt: "KeHE Distributors" },
  { src: "/ratio-integrations/retailer-amazon.svg",     alt: "Amazon" },
  { src: "/ratio-integrations/retailer-morrisons.svg",  alt: "Morrisons" },
  { src: "/ratio-integrations/erp-sage.svg",            alt: "Sage" },
  { src: "/ratio-integrations/retailer-waitrose.svg",   alt: "Waitrose" },
  { src: "/ratio-integrations/distributor-unfi.svg",    alt: "UNFI" },
  { src: "/ratio-integrations/icon-quickbooks.svg",     alt: "QuickBooks", filter: "preserve" },
  { src: "/ratio-integrations/distributor-brakes.svg",  alt: "Brakes" },
];

// Pixel-per-second scroll rate — tuned to feel like 8098's JS ticker.
const TICKER_PX_PER_SEC = 50;

type TrustedByStripProps = {
  /** Top line of the 2-line left-side label. Defaults to "Integrations". */
  labelLine1?: string;
  /** Bottom line of the 2-line left-side label. Defaults to "with". */
  labelLine2?: string;
  /** Logo set to scroll in the ticker. Defaults to the home page mix. */
  logos?: LogoSpec[];
};

export function TrustedByStrip({
  labelLine1 = "Integrations",
  labelLine2 = "with",
  logos = LOGOS,
}: TrustedByStripProps = {}) {
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = ulRef.current;
    if (!ul) return;
    const section = ul.closest("section");

    let raf = 0;
    let last = performance.now();
    let offset = 0;
    let running = true;

    const measureStride = () => {
      const a0 = ul.children[0] as HTMLElement | undefined;
      const b0 = ul.children[logos.length] as HTMLElement | undefined;
      if (!a0 || !b0) return 0;
      return b0.offsetLeft - a0.offsetLeft;
    };

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      offset += TICKER_PX_PER_SEC * dt;
      const stride = measureStride();
      if (stride > 0 && offset >= stride) offset -= stride;
      ul.style.transform = `translateX(${-offset}px)`;
      if (running) raf = requestAnimationFrame(tick);
    };

    // Pause the ticker when the strip is off-screen so we don't waste CPU on
    // background animations the user can't see.
    const io =
      section && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              for (const e of entries) {
                if (e.isIntersecting && !running) {
                  running = true;
                  last = performance.now();
                  raf = requestAnimationFrame(tick);
                } else if (!e.isIntersecting && running) {
                  running = false;
                  cancelAnimationFrame(raf);
                }
              }
            },
            { rootMargin: "100px 0px" }
          )
        : null;
    if (io && section) io.observe(section);

    raf = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  // Render the logo list N times so the track is always wider than
   // (ticker_width + stride). With copy width ~774 and tickers up to
   // ~1750px at 2000-wide viewports, 5 copies (~3870px) keeps content
   // visible across the entire ticker during the scroll → no gap on wrap.
  const COPIES = 5;
  const renderLogos = (keyPrefix: string) =>
    logos.map((logo, i) => (
      <li
        key={`${keyPrefix}-${i}`}
        className={`${styles.tickerItem} ${logo.filter === "preserve" ? styles.tickerItemPreserve : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo.src}
          alt={logo.alt}
          className={styles.logo}
          data-h={logo.h ?? "md"}
        />
      </li>
    ));

  return (
    <section
      className={styles.section}
      aria-label={`${labelLine1} ${labelLine2}`}
    >
      <div className={styles.subheading}>
        <p className={styles.label}>{labelLine1}</p>
        <p className={styles.label}>{labelLine2}</p>
      </div>

      <div className={styles.ticker}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/LZ9t1f3YqMBf3Ia4qPFRdOzzn90.png"
          alt=""
          aria-hidden="true"
          className={styles.pattern}
        />
        <ul ref={ulRef} className={styles.track} role="group">
          {Array.from({ length: COPIES }, (_, c) => (
            <Fragment key={`copy-${c}`}>{renderLogos(String(c))}</Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
}
