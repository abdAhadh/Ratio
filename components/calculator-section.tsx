"use client";

import { useState } from "react";
import { UnicornShader } from "./hero/unicorn-shader";
import styles from "./calculator-section.module.css";

/**
 * Calculator section. Slot: between Integrations and FAQ.
 *
 * A slider lets the viewer set their annual revenue through retail + Amazon
 * channels; the recoverable-per-year number updates in lockstep using a
 * 3-5% range (matches the ROI section's claim).
 *
 * Layout mirrors the ROI section: bordered main container, a shader-backed
 * band inside, and a centered card on top of the shader. Slider micro-
 * interactions: filled track in accent blue, thumb glows + scales on hover
 * and active. Range numbers update with a tiny opacity tween when the
 * slider settles between integer millions.
 */

const MIN_REVENUE_M = 10; //  $10M
const MAX_REVENUE_M = 500; // $500M
const DEFAULT_REVENUE_M = 100;
const RECOVERY_RATE_MIN = 0.03; // 3%
const RECOVERY_RATE_MAX = 0.05; // 5%

/* Money formatter that picks units intelligently:
 *   - 0–1M    → "$XXXK"
 *   - 1–10M   → "$X.XM" (1 decimal, trailing .0 stripped)
 *   - 10M+    → "$XXM"  (rounded integer) */
function fmtMoney(m: number): string {
  if (m >= 10) return `$${Math.round(m)}M`;
  if (m >= 1) {
    const r = Math.round(m * 10) / 10;
    return r === Math.floor(r) ? `$${Math.floor(r)}M` : `$${r}M`;
  }
  return `$${Math.round(m * 1000)}K`;
}

export function CalculatorSection() {
  const [revenueM, setRevenueM] = useState<number>(DEFAULT_REVENUE_M);

  const fillPercent =
    ((revenueM - MIN_REVENUE_M) / (MAX_REVENUE_M - MIN_REVENUE_M)) * 100;
  const recoveredLow = revenueM * RECOVERY_RATE_MIN;
  const recoveredHigh = revenueM * RECOVERY_RATE_MAX;

  return (
    <section id="calculator" className={styles.section}>
      <div className={styles.mainContainer}>
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
            <span className={styles.eyebrow}>CALCULATOR</span>
          </div>
          <div className={styles.headingAndSubtext}>
            <h2 className={styles.h2}>How much could you recover?</h2>
            <p className={styles.sub}>
              Move the slider to see what Ratio could return for a brand your
              size.
            </p>
          </div>
        </header>

        <div className={styles.cardContainer}>
          <div className={styles.shader} aria-hidden="true">
            <UnicornShader project="mAQ1wUPYxiiGOyyU767Z" />
          </div>

          <div className={styles.card}>
            {/* Input — annual revenue */}
            <div className={styles.block}>
              <div className={styles.blockLabel}>
                Your annual revenue through retailers and Amazon
              </div>
              <div className={styles.bigValue}>{fmtMoney(revenueM)}</div>
            </div>

            {/* Slider — sliderArea holds only the visible track + the input
                so the track centers on the input. sliderTicks lives as a
                sibling so its height doesn't shift the track center. */}
            <div className={styles.sliderWrap}>
              <div className={styles.sliderArea}>
                <div className={styles.sliderTrack} aria-hidden="true">
                  <div
                    className={styles.sliderFill}
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={MIN_REVENUE_M}
                  max={MAX_REVENUE_M}
                  step={5}
                  value={revenueM}
                  onChange={(e) => setRevenueM(Number(e.target.value))}
                  className={styles.slider}
                  aria-label="Annual revenue through retailers and Amazon, in millions"
                />
              </div>
              <div className={styles.sliderTicks} aria-hidden="true">
                <span>{fmtMoney(MIN_REVENUE_M)}</span>
                <span>{fmtMoney(MAX_REVENUE_M)}</span>
              </div>
            </div>

            <div className={styles.divider} aria-hidden="true" />

            {/* Output — recoverable per year */}
            <div className={styles.block}>
              <div className={styles.blockLabel}>
                Recoverable per year, at 3-5% of channel revenue
              </div>
              <div className={styles.bigValue}>
                <span className={styles.recoveredHighlight}>
                  {fmtMoney(recoveredLow)}
                </span>
                <span className={styles.dash}>–</span>
                <span className={styles.recoveredHighlight}>
                  {fmtMoney(recoveredHigh)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
