import styles from "./linkedin-dp.module.css";

/**
 * /linkedin-dp — preview of the 400x400 LinkedIn company-logo PNG.
 *
 * Static dark gradient background — gives the same visual feel as the
 * landing-hero shader (cyan-to-plum horizontal blend with subtle vertical
 * scan-line texture) but rendered purely via CSS so the exported PNG is
 * deterministic and the LinkedIn DP doesn't try to be a moving target.
 *
 * Brand mark + wordmark stacked, both perfectly centered on the same
 * vertical axis. Uses the tighter centered wordmark variant so its
 * visible "Ratio" letters land on the icon's centre line, instead of the
 * site-wide wordmark which is left-aligned within a wider canvas.
 */
export const metadata = {
  title: "Ratio · LinkedIn DP preview",
};

export default function LinkedinDpPage() {
  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.bg} aria-hidden="true" />
        <div className={styles.inner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/aRncskdNBejcpieS2y5kWdyd9Vw.svg"
            alt=""
            aria-hidden="true"
            className={styles.icon}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ratio-wordmark-centered.svg"
            alt="Ratio"
            className={styles.wordmark}
          />
        </div>
      </div>
    </main>
  );
}
