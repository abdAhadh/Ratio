"use client";

import { UnicornShader } from "@/components/hero/unicorn-shader";
import styles from "./linkedin-cover.module.css";

/**
 * /linkedin-cover — preview of the 1128x191 LinkedIn company-cover PNG.
 * Screenshot the .card element at exact pixel size to produce the asset.
 * Same shader as the landing hero, left-aligned text over a dark scrim
 * so the headline reads cleanly. AR-only positioning (no payables).
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
            <h1 className={styles.h1}>Your AI coworker to automate AR.</h1>
            <p className={styles.sub}>
              AI agents that run collections, cash applications,
              deductions, and disputes, end-to-end.
            </p>
          </div>
          <div className={styles.url}>tryratio.io</div>
        </div>
      </div>
    </main>
  );
}
