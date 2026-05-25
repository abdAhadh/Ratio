import styles from "./linkedin-dp.module.css";

/**
 * /linkedin-dp — preview of the 400x400 LinkedIn company-logo PNG.
 * Screenshot the .card element at exact pixel size to produce the asset.
 * Layout: the sun mark centred on the site's dark bg, with the "Ratio"
 * wordmark below it. Both elements are existing /public SVGs so the
 * mark matches what's in the nav.
 */
export const metadata = {
  title: "Ratio · LinkedIn DP preview",
};

export default function LinkedinDpPage() {
  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
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
            src="/M1NkDJ4eDI7E9pTqpUr4NH3RXAo.svg"
            alt="Ratio"
            className={styles.wordmark}
          />
        </div>
      </div>
    </main>
  );
}
