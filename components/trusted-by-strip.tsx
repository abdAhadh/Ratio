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

type LogoSpec = {
  src: string;
  alt: string;
  width: number;
  filter: "flat" | "preserve";
};

// Order matches 8098's strip exactly. Note that the original Framer SVG file
// names retain alt text from the Closor template; the actual file contents
// are the integration partner logos.
const LOGOS: LogoSpec[] = [
  { src: "/jAvS7i3euzhzs9QG47ZCnKWs.svg",    alt: "Oracle NetSuite",        width: 65,  filter: "flat" },
  { src: "/fsJ1gOVplaJe3c8baYuNmLdRk.svg",   alt: "SAP",                    width: 83,  filter: "flat" },
  { src: "/iWxq7l9uiHCpn3rJ20znALDue2I.png", alt: "Microsoft Dynamics 365", width: 104, filter: "flat" },
  { src: "/NnTn4flsDXQe6LWvltXVlRps.svg",    alt: "Sage",                   width: 79,  filter: "flat" },
  { src: "/A7BEzgODSPL3agNIiD6fYHUiweE.svg", alt: "QuickBooks",             width: 73,  filter: "preserve" },
  { src: "/ZVex0Mw39oLEoCDbZKzESs2WMU.svg",  alt: "Salesforce",             width: 82,  filter: "preserve" },
];

// Pixel-per-second scroll rate — tuned to feel like 8098's JS ticker.
const TICKER_PX_PER_SEC = 50;

export function TrustedByStrip() {
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
      const b0 = ul.children[LOGOS.length] as HTMLElement | undefined;
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
    LOGOS.map((logo, i) => (
      <li
        key={`${keyPrefix}-${i}`}
        className={`${styles.tickerItem} ${logo.filter === "preserve" ? styles.tickerItemPreserve : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={22}
          className={styles.logo}
          style={{ width: `${logo.width}px` }}
        />
      </li>
    ));

  return (
    <section className={styles.section} aria-label="Integrations">
      <div className={styles.subheading}>
        <p className={styles.label}>Integrations</p>
        <p className={styles.label}>with</p>
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
