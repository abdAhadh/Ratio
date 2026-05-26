"use client";

import { UnicornShader } from "@/components/hero/unicorn-shader";
import styles from "./linkedin-cover-employee.module.css";

/**
 * /linkedin-cover-employee — preview of the 1584x396 LinkedIn personal-
 * profile cover PNG (used by employees on their individual profiles).
 *
 * LinkedIn renders the avatar circle at the bottom-LEFT of the cover with
 * ~272px diameter overlapping the cover by ~136px. Mobile centre-crops to
 * roughly the central 900px wide. So we keep the most important
 * branding (h1 + sub + URL) in the right two-thirds of the cover, leaving
 * the bottom-left clear of the avatar.
 *
 * Same UnicornShader + dark scrim as the company cover. Bigger type since
 * the cover is twice as tall.
 */
export default function LinkedinCoverEmployeePage() {
  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.shaderLayer} aria-hidden="true">
          <UnicornShader project="hNoUYN2AHKFq4LxKJyNV" />
        </div>
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.content}>
          <div className={styles.text}>
            <h1 className={styles.h1}>
              Recover retail deductions on autopilot.
            </h1>
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
