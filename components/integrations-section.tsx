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
const LOGOS: Array<{ src: string; alt: string; h: "lg" | "md" | "sm" }> = [
  { src: "/ratio-integrations/icon-chase.svg", alt: "Chase", h: "sm" },
  { src: "/ratio-integrations/icon-bankofamerica.svg", alt: "Bank of America", h: "sm" },
  { src: "/ratio-integrations/icon-slack.svg", alt: "Slack", h: "md" },
  { src: "/ratio-integrations/erp-netsuite.svg", alt: "Oracle NetSuite", h: "lg" },
  { src: "/ratio-integrations/erp-sap.svg", alt: "SAP", h: "md" },
  { src: "/ratio-integrations/erp-dynamics365.png", alt: "Microsoft Dynamics 365", h: "md" },
  { src: "/ratio-integrations/erp-sage.svg", alt: "Sage", h: "md" },
  { src: "/ratio-integrations/icon-quickbooks.svg", alt: "QuickBooks", h: "lg" },
  { src: "/ratio-integrations/icon-salesforce.svg", alt: "Salesforce", h: "md" },
  { src: "/ratio-integrations/icon-plaid.svg", alt: "Plaid", h: "md" },
];

export function IntegrationsSection() {
  // Duplicate the list for a seamless marquee loop.
  const loop = [...LOGOS, ...LOGOS];

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
          Think of Ratio as a co-worker who has access to your CRM, ERP,
          payment processor and messaging systems. No rip and replace.
        </p>
      </header>

      <div className={styles.strip}>
        <div className={styles.track}>
          {loop.map((logo, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
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
