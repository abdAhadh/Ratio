"use client";

import { Fragment } from "react";
import { UnicornShader } from "./unicorn-shader";
import styles from "./hero.module.css";

/**
 * Hero — pixel-matched against localhost:8098.
 *
 * Layout reference (1440px desktop):
 *  - <section>:        1440 × 788 · overflow hidden · position relative
 *  - Unicorn shader:   1440 × 788 from top:0 (canvas)
 *  - Eyebrow pill:     left:72 top:234 · 144 × 33 · bg rgba(178,178,178,0.16)
 *  - <h1>:             left:72 top:309 · 558 × 128 · Gelasio 56/64 · -2.8px
 *  - <p>:              left:72 top:449 · 560 × 48 · Geist 16/24
 *  - CTA:              left:72 top:533 · 164 × 48 · white pill (sharp)
 *
 * Entry animation: per-word blur-in on the H1 + fade-up on sub/CTA. Driven
 * by pure CSS keyframes (defined in hero.module.css) — framer-motion would
 * fight React 19 hydration timing here, so we skip it and use vanilla
 * animations with per-word `animation-delay`.
 */
// Hero H1 is forced onto two lines, but at DIFFERENT word boundaries per
// viewport so the line lengths stay balanced:
//   Desktop: "Recover retail deductions" / "on autopilot"
//   Mobile : "Recover retail"            / "deductions on autopilot"
// The mobile split puts a shorter string on line 1, which lets the headline
// scale up to a closor.framer.website-style 38–40px on the smaller screen
// without overflowing. Two <br /> tags render between the parts; CSS toggles
// which one is visible per viewport (.mobileBreak vs .desktopBreak).
const H1_PART1 = "Recover retail"; // line 1 on mobile, fits line 1 on desktop
const H1_PART2 = "deductions"; // line 2 on mobile, completes line 1 on desktop
const H1_PART3 = "on autopilot"; // line 2 on desktop, continues line 2 on mobile
// Subhead is rendered as two visual paragraphs (first the mechanism, then
// the outcome on its own line). The full string is kept here for SEO /
// metadata reuse; the JSX below renders the two halves.
const SUBHEAD_LINE_1 =
  "AI agents that pull deductions from portals, emails and EDI, match them against your contracts and shipment docs, and dispute the invalid ones.";
const SUBHEAD_LINE_2 = "Adds 3% back to your topline.";

const WORD_STAGGER_MS = 50;
const WORD_BASE_MS = 100;

export function Hero() {
  const part1Words = H1_PART1.split(" ");
  const part2Words = H1_PART2.split(" ");
  const part3Words = H1_PART3.split(" ");
  const totalH1Words =
    part1Words.length + part2Words.length + part3Words.length;
  const subDelay = WORD_BASE_MS + totalH1Words * WORD_STAGGER_MS + 200;
  const subLine2Delay = subDelay + 100;
  const ctaDelay = subLine2Delay + 200;

  return (
    <section id="hero" className={styles.section}>
      <div className={styles.shaderLayer}>
        <UnicornShader project="hNoUYN2AHKFq4LxKJyNV" />
      </div>

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowIconWrap} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/FLUpFZ3WewYoIhp88GA3QqCv9A.svg"
              alt=""
              width={12}
              height={12}
              className={styles.eyebrowIcon}
            />
          </span>
          <span className={styles.eyebrowText}>AI agents for CPG</span>
        </div>

        <h1 className={styles.h1}>
          {/* Part 1 — "Recover retail" */}
          {part1Words.map((w, i) => (
            <Fragment key={`p1-${w}-${i}`}>
              <span
                className={styles.h1Word}
                style={
                  {
                    animationDelay: `${WORD_BASE_MS + i * WORD_STAGGER_MS}ms`,
                  } as React.CSSProperties
                }
              >
                {w}
              </span>
              {" "}
            </Fragment>
          ))}
          {/* Forces the line break after "retail" on mobile only. */}
          <br className={styles.mobileBreak} />
          {/* Part 2 — "deductions" */}
          {part2Words.map((w, i) => (
            <Fragment key={`p2-${w}-${i}`}>
              <span
                className={styles.h1Word}
                style={
                  {
                    animationDelay: `${
                      WORD_BASE_MS + (part1Words.length + i) * WORD_STAGGER_MS
                    }ms`,
                  } as React.CSSProperties
                }
              >
                {w}
              </span>
              {" "}
            </Fragment>
          ))}
          {/* Forces the line break after "deductions" on desktop only. */}
          <br className={styles.desktopBreak} />
          {/* Part 3 — "on autopilot" */}
          {part3Words.map((w, i) => (
            <Fragment key={`p3-${w}-${i}`}>
              <span
                className={styles.h1Word}
                style={
                  {
                    animationDelay: `${
                      WORD_BASE_MS +
                      (part1Words.length + part2Words.length + i) *
                        WORD_STAGGER_MS
                    }ms`,
                  } as React.CSSProperties
                }
              >
                {w}
              </span>
              {i < part3Words.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h1>

        <p
          className={styles.sub}
          style={
            { animationDelay: `${subDelay}ms` } as React.CSSProperties
          }
        >
          {SUBHEAD_LINE_1}
        </p>

        <p
          className={styles.subLine2}
          style={
            { animationDelay: `${subLine2Delay}ms` } as React.CSSProperties
          }
        >
          {SUBHEAD_LINE_2}
        </p>

        <div
          className={styles.ctaRow}
          style={
            { animationDelay: `${ctaDelay}ms` } as React.CSSProperties
          }
        >
          <a href="/contact" className={styles.cta}>
            <span className={styles.ctaIconBg} aria-hidden="true">
              {/* Two stacked chevrons. First is centered; second parked 30px
                  off the right edge. On hover both slide -30px in lockstep
                  so the first exits left and the second slides into centre. */}
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
            <span className={styles.ctaLabel}>REQUEST DEMO</span>
          </a>
          <a href="/contact" className={styles.ctaSecondary}>
            <span className={styles.ctaSecondaryLabel}>START FREE TRIAL</span>
          </a>
        </div>
      </div>
    </section>
  );
}
