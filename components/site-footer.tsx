"use client";

import { UnicornShader } from "./hero/unicorn-shader";
import styles from "./site-footer.module.css";

/**
 * Footer — pixel-matched against localhost:8098.
 *
 * Layout @ 1440px desktop (footer-top = 5750, height = 875):
 *
 *   ┌──────────────────────────── Main Container ────────────────────────────┐
 *   │ 120px ┌─ HOME ───────┬─ COMPANY ───┬─ LEGAL ────┐ 120px                 │
 *   │       │ title (56)   │ title (56)  │ title (56) │  Heading row borders   │
 *   │       ├──────────────┼─────────────┼────────────┤                       │
 *   │       │ Product      │ LinkedIn    │ Terms      │  Link rows            │
 *   │       │ ROI          │             │ Privacy    │                       │
 *   │       │ Integrations │             │            │                       │
 *   │       ├──────────────┴─────────────┴────────────┤                       │
 *   │       │ "Ratio" (24px serif white)              │                       │
 *   │       │ tagline (16px muted, 324 wide)          │                       │
 *   │       └─────────────────────────────────────────┘                       │
 *   │                                                                         │
 *   │   © 2026 TidalPeak Labs Private Ltd. ...   (centered, 14px muted)       │
 *   │   ─────────── line-pattern strip 1200×65 ───────────                    │
 *   │                                                                         │
 *   │           ░░ Giant "Ratio" wordmark with shader bg + 3D tilt ░░         │
 *   └─────────────────────────────────────────────────────────────────────────┘
 *
 * Columns at left: 120, 520, 920 — each 400 wide. Border 1px #333 via ::after
 * pseudo on each cell, replicating the 8098 grid look.
 */
const NAV_HOME = [
  { label: "Product", href: "/#how-it-works" },
  { label: "ROI", href: "/#the-problem" },
  { label: "Integrations", href: "/#integrations" },
];
const NAV_COMPANY = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/try-ratio/",
    external: true,
  },
];
const NAV_LEGAL = [
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

function Column({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; href: string; external?: boolean }>;
}) {
  return (
    <div className={styles.col}>
      <div className={styles.colHead}>
        <p className={styles.colTitle}>{title}</p>
      </div>
      <div className={styles.colLinks}>
        <ul className={styles.colList}>
          {items.map((it) => (
            <li key={it.label}>
              <a
                href={it.href}
                className={styles.colLink}
                {...(it.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Footer link with 8098's "roller blind" hover — two stacked text copies
 * inside a clipped 24px window; on hover the track slides up one line so
 * the cyan copy replaces the white one.
 */
function FooterLink({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={styles.colLink}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className={styles.colLinkTrack}>
        <span className={styles.colLinkText}>{label}</span>
        <span className={styles.colLinkText}>{label}</span>
      </span>
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.mainContainer}>
        {/* Heading row: 3 column titles in a flex row with bottom border */}
        <div className={styles.headingRow}>
          <div className={styles.col}>
            <div className={styles.colHead}>
              <p className={styles.colTitle}>HOME</p>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.colHead}>
              <p className={styles.colTitle}>COMPANY</p>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.colHead}>
              <p className={styles.colTitle}>LEGAL</p>
            </div>
          </div>
        </div>

        {/* Links row: 3 link lists */}
        <div className={styles.linksRow}>
          <div className={styles.linksCell}>
            <ul className={styles.colList}>
              {NAV_HOME.map((it) => (
                <li key={it.label}>
                  <FooterLink label={it.label} href={it.href} />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.linksCell}>
            <ul className={styles.colList}>
              {NAV_COMPANY.map((it) => (
                <li key={it.label}>
                  <FooterLink
                    label={it.label}
                    href={it.href}
                    external={it.external}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.linksCell}>
            <ul className={styles.colList}>
              {NAV_LEGAL.map((it) => (
                <li key={it.label}>
                  <FooterLink label={it.label} href={it.href} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pro row: "Ratio" h4 + tagline box (track 1) + an empty divider
            cell (track 2) carrying the 2/3 column line through the row */}
        <div className={styles.proRow}>
          <div className={styles.proCell}>
            <h4 className={styles.proTitle}>Ratio</h4>
            <p className={styles.tagline}>
              Start as a co-pilot for your AR team. Graduate it to autopilot
              whenever you&apos;re ready.
            </p>
          </div>
          <div className={styles.proDivider} aria-hidden="true" />
        </div>

        {/* Mobile-only 2×2 column grid (CSS-controlled): HOME | COMPANY on
            row 1, the "Ratio" box | LEGAL on row 2. On mobile the desktop
            heading / links / pro rows above are hidden instead. */}
        <div className={styles.mGrid}>
          <div className={styles.mCell}>
            <p className={styles.mTitle}>HOME</p>
            <ul className={styles.mList}>
              {NAV_HOME.map((it) => (
                <li key={it.label}>
                  <a href={it.href} className={styles.mLink}>
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.mCell}>
            <p className={styles.mTitle}>COMPANY</p>
            <ul className={styles.mList}>
              {NAV_COMPANY.map((it) => (
                <li key={it.label}>
                  <a
                    href={it.href}
                    className={styles.mLink}
                    {...(it.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.mCell}>
            <p className={styles.mTitle}>LEGAL</p>
            <ul className={styles.mList}>
              {NAV_LEGAL.map((it) => (
                <li key={it.label}>
                  <a href={it.href} className={styles.mLink}>
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Empty cell — keeps col 2 of row 2 as an empty bordered box. */}
          <div className={styles.mCell} aria-hidden="true" />
          {/* "Ratio" + tagline — its own full-width row at the bottom. */}
          <div className={`${styles.mCell} ${styles.mProRow}`}>
            <h4 className={styles.mProTitle}>Ratio</h4>
            <p className={styles.mTagline}>
              Start as a co-pilot for your AR team.
              <br />
              Graduate it to autopilot whenever you&apos;re ready.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright (centered) — entity on line 1, rights reserved on line 2. */}
      <p className={styles.copyright}>
        © {new Date().getFullYear()} TidalPeak Labs Private Ltd.
        <br />
        All rights reserved.
      </p>

      {/* Decorative line-pattern strip */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/c1XIjkEYbWaq7wCsdDyG3XVshc.png"
        alt=""
        aria-hidden="true"
        className={styles.linePattern}
      />

      {/* Giant "Ratio" wordmark with shader background + 3D tilt */}
      <div className={styles.wordmark} aria-hidden="true">
        <div className={styles.wordmarkShader}>
          <UnicornShader project="mAQ1wUPYxiiGOyyU767Z" />
        </div>
        <span className={styles.wordmarkText}>Ratio</span>
      </div>

      {/* Full-height vertical rails (1px #333 L+R), drawn on top. */}
      <div className={styles.rails} aria-hidden="true" />
    </footer>
  );
}
