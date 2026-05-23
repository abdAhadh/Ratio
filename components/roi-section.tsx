"use client";

import { UnicornShader } from "./hero/unicorn-shader";
import styles from "./roi-section.module.css";

/**
 * ROI (#the-problem) — pixel-matched against localhost:8098.
 *
 * Layout @ 1440px desktop:
 *   - <section>: full-width, padding 0 120px, bg = page bg
 *   - <main-container>: 1200 wide (max), centered, padding 60px 0 100px,
 *     vertical-only border (1px solid #333) — same pattern as Product
 *     section's Main Container.
 *   - Content Wrapper inside: gap 55 → Heading Container then Card Container.
 *   - Heading Container: 657 wide, centered, gap 12.
 *       · Eyebrow row: 20×20 icon (zL3R1jIJOOTcUZTPulz455RaY.svg) + "ROI" text
 *       · h2 (Gelasio 40/60)
 *       · sub (Geist 16/24 #a6a6a6)
 *   - Card Container: relative, 530 tall. Contains:
 *       · Absolute Unicorn Studio shader (project "mAQ1wUPYxiiGOyyU767Z",
 *         the same as the CTA + footer wordmark) filling 1200×530.
 *       · A 1200×398 cards row positioned y=66 from top (so the shader shows
 *         66px above + 66px below, framed by 1px #333 top/bottom borders).
 *       · 3 cards × 400 × 398, touching (no gap), backdrop-filter: blur(34px),
 *         background rgba(13,14,17,0.9), each with a 1px #333 right border.
 *       · Card content: value (66.24/66.24 Geist 600 white -1.3248px),
 *         label (14/19.6 Geist 400 #a6a6a6), centered with 20px gap.
 */
const STATS = [
  { value: "40%", label: "DSO reduction" },
  { value: "70%", label: "less time spent on AR work" },
  { value: "$65K+", label: "saved per AR hire avoided" },
];

export function ROISection() {
  return (
    <section id="the-problem" className={styles.section}>
      <div className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          {/* ───── Heading ───── */}
          <header className={styles.header}>
            <div className={styles.eyebrowRow}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/zL3R1jIJOOTcUZTPulz455RaY.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
                className={styles.eyebrowIcon}
              />
              <p className={styles.eyebrow}>ROI</p>
            </div>
            <div className={styles.headingAndSubtext}>
              <h2 className={styles.h2}>What you should expect in 60 days</h2>
              <p className={styles.sub}>
                Numbers that collect you more cash, faster and cheaper.
              </p>
            </div>
          </header>

          {/* ───── Card Container: shader band + 3 cards on top ───── */}
          <div className={styles.cardContainer}>
            <div className={styles.htband} aria-hidden="true">
              <UnicornShader project="mAQ1wUPYxiiGOyyU767Z" />
            </div>
            <div className={styles.cardWrapper}>
              {STATS.map((s) => (
                <div key={s.value} className={styles.card}>
                  <div className={styles.value}>{s.value}</div>
                  <div className={styles.label}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Closing tagline under the ROI cards, centred on all viewports. */}
          <p className={styles.outro}>
            Start as a co-pilot for your AR team. Graduate it to autopilot
            whenever you&apos;re ready.
          </p>
        </div>
      </div>
    </section>
  );
}
