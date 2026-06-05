"use client";

import { Fragment } from "react";
import { UnicornShader } from "./unicorn-shader";
import styles from "./hero.module.css";

/**
 * Hero — pixel-matched against localhost:8098 for the home page, also
 * reused by sibling landing pages (e.g. /mcp) that want the same shader
 * + content rhythm but with their own copy and CTAs.
 *
 * Default rendering: the home-page hero with its per-word fade-in
 * animation on the headline. Pass `customHeadline` to swap in a
 * different React tree (e.g. with inline brand logomarks) — the
 * animation is skipped in that mode so the markup stays simple.
 *
 * Visual contract (1440px desktop):
 *  - <section>:        1440 × 788 · overflow hidden · position relative
 *  - Shader fills:     left:0 right:0 top:0 bottom:112 (by default)
 *                      OR bottom:0 when `fullBleedShader` is true
 *  - Eyebrow pill:     left:72 top:234 · translucent grey, gradient tile
 *  - <h1>:             left:72 top:309 · Gelasio 56/64
 *  - <p> subhead:      left:72 top:449 · Geist 16/24
 *  - CTA row:          left:72 top:533 · white pill + outline pill
 */
const HOME_H1_PART1 = "Recover retail";
const HOME_H1_PART2 = "deductions";
const HOME_H1_PART3 = "on autopilot";

const HOME_SUBHEAD_LINE_1 =
  "AI agents that pull deductions from portals, emails and EDI, match them against your contracts and shipment docs, and dispute the invalid ones.";
const HOME_SUBHEAD_LINE_2 = "Adds 3% back to your topline.";

const WORD_STAGGER_MS = 50;
const WORD_BASE_MS = 100;

type CtaSpec = { href: string; label: string };

type HeroProps = {
  /** Eyebrow pill text. Defaults to home page copy. */
  eyebrowText?: string;
  /** Drop-in headline. When provided, the per-word animation is skipped. */
  customHeadline?: React.ReactNode;
  /** First subhead line (mechanism). Defaults to home page copy. */
  subLine1?: string;
  /** Second subhead line (outcome). Defaults to home page copy. */
  subLine2?: string;
  /** Primary CTA (white pill + sliding chevrons). Defaults to REQUEST DEMO. */
  primaryCta?: CtaSpec;
  /** Secondary CTA (transparent outline pill). Defaults to START FREE TRIAL. */
  secondaryCta?: CtaSpec;
  /** UnicornStudio scene project id. Defaults to the home page shader. */
  shaderProject?: string;
  /** When true, the shader fills the section all the way to the bottom
   *  (no 112px reservation for the TrustedByStrip overlay). Use on pages
   *  that don't render a TrustedByStrip below the hero. */
  fullBleedShader?: boolean;
};

const DEFAULT_PRIMARY: CtaSpec = { href: "/contact", label: "REQUEST DEMO" };
const DEFAULT_SECONDARY: CtaSpec = {
  href: "/contact",
  label: "START FREE TRIAL",
};

export function Hero({
  eyebrowText = "AI agents for CPG",
  customHeadline,
  subLine1 = HOME_SUBHEAD_LINE_1,
  subLine2 = HOME_SUBHEAD_LINE_2,
  primaryCta = DEFAULT_PRIMARY,
  secondaryCta = DEFAULT_SECONDARY,
  shaderProject = "hNoUYN2AHKFq4LxKJyNV",
  fullBleedShader = false,
}: HeroProps = {}) {
  // Word-animation maths — only used by the default home headline. The
  // staggered fade-in stays the home page's signature; custom-headline
  // pages render as a single block to keep the markup honest.
  const part1Words = HOME_H1_PART1.split(" ");
  const part2Words = HOME_H1_PART2.split(" ");
  const part3Words = HOME_H1_PART3.split(" ");
  const totalH1Words =
    part1Words.length + part2Words.length + part3Words.length;
  const subDelay = WORD_BASE_MS + totalH1Words * WORD_STAGGER_MS + 200;
  const subLine2Delay = subDelay + 100;
  const ctaDelay = subLine2Delay + 200;

  return (
    <section id="hero" className={styles.section}>
      <div
        className={`${styles.shaderLayer} ${fullBleedShader ? styles.shaderFullBleed : ""}`}
      >
        {/* Hero shader is always above the fold, so start it eagerly —
            the IntersectionObserver gate is meant for below-the-fold
            shaders and just adds a render-cycle delay here. */}
        <UnicornShader project={shaderProject} eager />
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
          <span className={styles.eyebrowText}>{eyebrowText}</span>
        </div>

        {customHeadline ? (
          <h1 className={styles.h1}>{customHeadline}</h1>
        ) : (
          <h1 className={styles.h1}>
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
                </span>{" "}
              </Fragment>
            ))}
            <br className={styles.mobileBreak} />
            {part2Words.map((w, i) => (
              <Fragment key={`p2-${w}-${i}`}>
                <span
                  className={styles.h1Word}
                  style={
                    {
                      animationDelay: `${
                        WORD_BASE_MS +
                        (part1Words.length + i) * WORD_STAGGER_MS
                      }ms`,
                    } as React.CSSProperties
                  }
                >
                  {w}
                </span>{" "}
              </Fragment>
            ))}
            <br className={styles.desktopBreak} />
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
        )}

        <p
          className={styles.sub}
          style={
            customHeadline
              ? undefined
              : ({ animationDelay: `${subDelay}ms` } as React.CSSProperties)
          }
        >
          {subLine1}
        </p>

        {subLine2 ? (
          <p
            className={styles.subLine2}
            style={
              customHeadline
                ? undefined
                : ({
                    animationDelay: `${subLine2Delay}ms`,
                  } as React.CSSProperties)
            }
          >
            {subLine2}
          </p>
        ) : null}

        <div
          className={`${styles.ctaRow} ${!subLine2 ? styles.ctaRowCompact : ""}`}
          style={
            customHeadline
              ? undefined
              : ({ animationDelay: `${ctaDelay}ms` } as React.CSSProperties)
          }
        >
          <a href={primaryCta.href} className={styles.cta}>
            <span className={styles.ctaIconBg} aria-hidden="true">
              {/* Two stacked chevrons — first centred, second parked 30px
                  off-right. On hover both slide -30px in lockstep. */}
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
            <span className={styles.ctaLabel}>{primaryCta.label}</span>
          </a>
          <a href={secondaryCta.href} className={styles.ctaSecondary}>
            <span className={styles.ctaSecondaryLabel}>
              {secondaryCta.label}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
