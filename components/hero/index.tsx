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
const H1_TEXT = "Your AI coworker to automate AR";
const SUBHEAD =
  "AI agents that run collections, cash applications, deductions and disputes, end-to-end. Sits on top of your existing ERP and bank.";

const WORD_STAGGER_MS = 50;
const WORD_BASE_MS = 100;

export function Hero() {
  const words = H1_TEXT.split(" ");
  const subDelay = WORD_BASE_MS + words.length * WORD_STAGGER_MS + 200;
  const ctaDelay = subDelay + 150;

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
          <span className={styles.eyebrowText}>AI agents for AR</span>
        </div>

        <h1 className={styles.h1}>
          {words.map((w, i) => (
            <Fragment key={`${w}-${i}`}>
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
              {i < words.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h1>

        <p
          className={styles.sub}
          style={
            { animationDelay: `${subDelay}ms` } as React.CSSProperties
          }
        >
          {SUBHEAD}
        </p>

        <a
          href="/contact"
          className={styles.cta}
          style={
            { animationDelay: `${ctaDelay}ms` } as React.CSSProperties
          }
        >
          <span className={styles.ctaIconBg} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hs5ITvrZLDk3LlGJpQeTaivp4.svg"
              alt=""
              width={20}
              height={20}
            />
          </span>
          <span className={styles.ctaLabel}>REQUEST DEMO</span>
        </a>
      </div>
    </section>
  );
}
