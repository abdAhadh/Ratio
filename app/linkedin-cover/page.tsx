import styles from "./linkedin-cover.module.css";

/**
 * /linkedin-cover — preview of the 1128x191 LinkedIn company-cover PNG.
 * Screenshot the .card element at exact pixel size to produce the asset.
 *
 * Uses the same frozen-shader PNG as the DP and employee-cover so all
 * three assets share an identical texture. The live UnicornShader was
 * compressed too flat at this cover's 5.9:1 aspect ratio — the soft
 * horizontal banding visible on the taller employee cover disappeared.
 * Switching to the static image lets the bands read at any aspect.
 */
export const metadata = {
  title: "Ratio · LinkedIn cover preview",
};

export default function LinkedinCoverPage() {
  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.shaderLayer} aria-hidden="true" />
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.content}>
          <div className={styles.text}>
            <h1 className={styles.h1}>Recover retail deductions on autopilot.</h1>
            <p className={styles.sub}>
              AI agents that recover invalid retailer deductions for CPG
              brands.
            </p>
          </div>
          <div className={styles.url}>tryratio.io</div>
        </div>
      </div>
    </main>
  );
}
