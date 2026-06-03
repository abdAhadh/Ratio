"use client";

import { UnicornShader } from "./hero/unicorn-shader";
import styles from "./cta-banner.module.css";

/**
 * CTA Banner — pixel-matched against localhost:8098.
 *
 * Stack (top to bottom inside the section):
 *   0-60     empty
 *   60-125   line-pattern strip (c1XIjkEYbWaq7wCsdDyG3XVshc.png) · 1200×65
 *   125-581  Unicorn shader (mAQ1wUPYxiiGOyyU767Z) · 1200×456 (behind glass)
 *   157-549  Glass Content Wrapper · 1136×392 · bg rgba(12,12,12,0.8)
 *            + border image (7Z3v0dyQnjasEU52nntX7rkqk.png) · same dimensions
 *     269-329  H2 "Your next AR hire should be an AI agent"
 *     333-361  Sub "Pilot live in 1 week. Measurable DSO impact by day 60."
 *     387-436  CTA pill "REQUEST A DEMO" 177×49 — icon LEFT, label RIGHT
 *   581-646  bottom line-pattern strip · same image as top
 *   646-746  empty
 *
 * Section: 1440 × 746 · padding 0 120px · bg var(--color-bg)
 */
export function CTABanner() {
  return (
    <section id="cta-banner" className={styles.section}>
      <div className={styles.mainContainer}>
        {/* Top line-pattern strip */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/c1XIjkEYbWaq7wCsdDyG3XVshc.png"
          alt=""
          aria-hidden="true"
          className={styles.linePatternTop}
        />

        {/* Shader + glass wrapper area */}
        <div className={styles.shaderArea}>
          <div className={styles.shaderLayer}>
            <UnicornShader project="mAQ1wUPYxiiGOyyU767Z" />
          </div>

          <div className={styles.contentWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/7Z3v0dyQnjasEU52nntX7rkqk.png"
              alt=""
              aria-hidden="true"
              className={styles.borderImage}
            />
            <div className={styles.content}>
              <h2 className={styles.h2}>
                Try Ratio free for 1 month.
              </h2>
              <p className={styles.sub}>
                See how much we recover from your retailer deductions in 30 days.
                <br />
                No commitment.
              </p>
              <div className={styles.ctaRow}>
                <a href="/contact" className={styles.cta}>
                  <span className={styles.ctaIconBg} aria-hidden="true">
                    {/* Two stacked chevrons: the first slides out left on
                        hover, the second slides in from the right. Matches
                        the nav CTA's icon-loop. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/hs5ITvrZLDk3LlGJpQeTaivp4.svg"
                      alt=""
                      width={20}
                      height={20}
                      className={styles.ctaChevron}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/hs5ITvrZLDk3LlGJpQeTaivp4.svg"
                      alt=""
                      width={20}
                      height={20}
                      className={styles.ctaChevron}
                    />
                  </span>
                  <span className={styles.ctaLabel}>START FREE TRIAL</span>
                </a>
                <a href="/contact" className={styles.ctaSecondary}>
                  <span className={styles.ctaSecondaryLabel}>REQUEST DEMO</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom line-pattern strip */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/c1XIjkEYbWaq7wCsdDyG3XVshc.png"
          alt=""
          aria-hidden="true"
          className={styles.linePatternBottom}
        />
      </div>
    </section>
  );
}
