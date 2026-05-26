"use client";

import { UnicornShader } from "./hero/unicorn-shader";
import styles from "./problem-section.module.css";

/**
 * Problem section. Sits between TrustedByStrip and ProductSection. The
 * goal: tell the viewer WHY this matters before we show the solution.
 *
 * Layout reference: ROI section's bordered main container + UnicornShader
 * band behind the cards + Product section's top/bottom line-pattern
 * strips. 3 cards sit flush in a row with vertical dividers, semi-
 * transparent over the shader so the warm glow shows through.
 */

/* Per-card SVG glyphs. Lucide-style, 24×24, 1.75 stroke, currentColor.
   Matched to the visual density of the product section's 6 card icons. */
const ICON_BY_INDEX: Array<React.ReactElement> = [
  /* 1. Short-paid — Banknote with $ inside, evoking money taken off
       the top of every invoice. */
  <svg
    key="banknote"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M6 12h.01" />
    <path d="M18 12h.01" />
  </svg>,
  /* 2. Manual review — ClipboardList. Evokes the per-dispute checklist
       work an AR analyst does line by line. */
  <svg
    key="clipboard"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" />
    <path d="M12 16h4" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
  </svg>,
  /* 3. Write-offs — Trash. Direct metaphor for deductions thrown away
       because disputing them isn't worth the labor. */
  <svg
    key="trash"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>,
];

const CARDS = [
  {
    title: "Retailers short-pay you",
    body: "Every retailer deducts from what they pay you, 15 to 25% of your topline. Some of it is legitimate. Some of it is not.",
  },
  {
    title: "Disputing deductions costs time",
    body: "Your finance team has to identify deductions, pull docs, and file in each retailer's portal. It takes months, most get written off.",
  },
  {
    title: "Most invalid deductions never get disputed.",
    body: "About 3% of your topline sits in invalid deductions. For a $100M brand, that's $3M a year, all of it recoverable.",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className={styles.section}>
      <div className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
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
              <p className={styles.eyebrow}>THE PROBLEM</p>
            </div>
            <div className={styles.headingAndSubtext}>
              <h2 className={styles.h2}>
                You&apos;re losing money on every retailer payment.
              </h2>
              <p className={styles.sub}>
                Deductions, chargebacks and OTIF fines add up to 3% of your
                topline. Your Finance team is buried in manual work to
                recover it.
              </p>
            </div>
          </header>

          {/* Card container holds the UnicornShader as a full-bleed
              background (visible above and below the cards row) plus the
              cards themselves on top. No decorative line-pattern strips:
              the shader provides the visual interest. Same shader project
              as ROI / CTA for visual continuity across the "problem →
              recovery → CTA" arc. */}
          <div className={styles.cardContainer}>
            <div className={styles.shader} aria-hidden="true">
              <UnicornShader project="mAQ1wUPYxiiGOyyU767Z" />
            </div>

            <div className={styles.cardsRow}>
              {CARDS.map((c, i) => (
                <article key={c.title} className={styles.card}>
                  <div className={styles.cardHead}>
                    <div className={styles.cardIcon}>{ICON_BY_INDEX[i]}</div>
                    <span className={styles.cardNum}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={styles.cardText}>
                    <h3 className={styles.cardTitle}>{c.title}</h3>
                    <p className={styles.cardBody}>{c.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
