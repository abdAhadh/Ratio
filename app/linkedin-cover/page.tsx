"use client";

import { UnicornShader } from "@/components/hero/unicorn-shader";
import styles from "./linkedin-cover.module.css";

/**
 * /linkedin-cover — preview of the 1128x191 LinkedIn company-cover PNG.
 * Screenshot the .card element at exact pixel size to produce the asset.
 * Same shader as the landing hero, left-aligned text over a dark scrim
 * so the headline reads cleanly. Positions the brand for retail deduction
 * recovery (CPG).
 */
export default function LinkedinCoverPage() {
  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.shaderLayer} aria-hidden="true">
          <UnicornShader project="hNoUYN2AHKFq4LxKJyNV" />
        </div>
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
