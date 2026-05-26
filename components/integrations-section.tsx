import styles from "./integrations-section.module.css";

/**
 * Integrations — full-bleed striped strip with a horizontally scrolling
 * logo marquee. Mirrors what we built into the Framer-export 8098 page.
 *
 * Visual reference:
 *  - Heading block (centred, on the dark section bg)
 *  - Full-viewport strip with the diagonal stripe PNG as background and a
 *    fade gradient on each side; logos drift across the strip in a loop.
 */
/* Logos rendered as a continuous marquee. Order alternates retailers /
   distributors / ERPs so the loop reads as a varied mix rather than a category
   dump. Almost all logos render at "md" height (32px desktop / 26px mobile)
   for symmetry. Target uses "lg" because its viewBox is portrait — the
   bullseye + wordmark needs a touch more vertical room to read at the same
   visual weight as the others. */
const LOGOS: Array<{ src: string; alt: string; h: "lg" | "md" | "sm" }> = [
  { src: "/ratio-integrations/retailer-walmart.svg", alt: "Walmart", h: "md" },
  { src: "/ratio-integrations/erp-netsuite.svg", alt: "Oracle NetSuite", h: "md" },
  { src: "/ratio-integrations/retailer-target.svg", alt: "Target", h: "md" },
  { src: "/ratio-integrations/retailer-tesco.svg", alt: "Tesco", h: "md" },
  { src: "/ratio-integrations/erp-sap.svg", alt: "SAP", h: "md" },
  { src: "/ratio-integrations/retailer-costco.svg", alt: "Costco", h: "md" },
  { src: "/ratio-integrations/retailer-sainsburys.svg", alt: "Sainsbury's", h: "md" },
  { src: "/ratio-integrations/erp-dynamics365.png", alt: "Microsoft Dynamics 365", h: "md" },
  { src: "/ratio-integrations/retailer-kroger.svg", alt: "Kroger", h: "md" },
  { src: "/ratio-integrations/retailer-asda.svg", alt: "ASDA", h: "md" },
  { src: "/ratio-integrations/distributor-kehe.svg", alt: "KeHE Distributors", h: "md" },
  { src: "/ratio-integrations/retailer-amazon.svg", alt: "Amazon", h: "md" },
  { src: "/ratio-integrations/retailer-morrisons.svg", alt: "Morrisons", h: "md" },
  { src: "/ratio-integrations/erp-sage.svg", alt: "Sage", h: "md" },
  { src: "/ratio-integrations/retailer-waitrose.svg", alt: "Waitrose", h: "md" },
  { src: "/ratio-integrations/distributor-unfi.svg", alt: "UNFI", h: "md" },
  { src: "/ratio-integrations/icon-quickbooks.svg", alt: "QuickBooks", h: "md" },
  { src: "/ratio-integrations/distributor-brakes.svg", alt: "Brakes", h: "md" },
];

export function IntegrationsSection() {
  // Duplicate the list for a seamless marquee loop.
  const loop = [...LOGOS, ...LOGOS];
  // Reverse-order copy for the second (mobile-only) marquee bar, so the
  // two bars don't show the same logo at the same spot.
  const reversed = [...LOGOS].reverse();
  const loopReverse = [...reversed, ...reversed];

  return (
    <section id="integrations" className={styles.section}>
      <div className={styles.mainContainer}>
      <header className={styles.header}>
        <div className={styles.eyebrowRow}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/zL3R1jIJOOTcUZTPulz455RaY.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          <span className={styles.eyebrow}>INTEGRATIONS</span>
        </div>
        <h2 className={styles.h2}>Works with the systems you already use.</h2>
        <p className={styles.sub}>
          Ratio connects to your retailer portals, ERP, accounting system,
          and 3PL data. Read-only wherever possible, no rip and replace,
          no long IT project.
        </p>
      </header>

      <div className={styles.strip}>
        <div className={styles.track}>
          {loop.map((logo, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`a-${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              data-h={logo.h}
              className={styles.logo}
            />
          ))}
        </div>
      </div>

      {/* Second marquee bar — shown only on mobile (CSS-controlled), it
          scrolls the opposite direction with a gap above it. */}
      <div
        className={`${styles.strip} ${styles.stripReverse}`}
        aria-hidden="true"
      >
        <div className={`${styles.track} ${styles.trackReverse}`}>
          {loopReverse.map((logo, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`b-${logo.alt}-${i}`}
              src={logo.src}
              alt=""
              data-h={logo.h}
              className={styles.logo}
            />
          ))}
        </div>
      </div>

      <p className={styles.note}>
        Same day responses on shared slack channel with our founding team.
      </p>
      </div>
    </section>
  );
}
