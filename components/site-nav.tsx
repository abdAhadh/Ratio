"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./site-nav.module.css";

/**
 * Top nav — pixel-matched against localhost:8098 on desktop. Logo on
 * left, optional centre links, optional secondary action + primary CTA
 * clustered on the right. On mobile the centre links + CTAs collapse
 * into a hamburger dropdown.
 *
 * Reused by sibling landing pages (e.g. /mcp) that want a slimmed-down
 * nav: pass `navItems={[]}` to hide the centre cluster, `secondaryCta`
 * to add a text link before the primary CTA, and `cta` to override the
 * primary CTA label/href.
 */
type NavLink = { label: string; href: string };
type CtaSpec = { href: string; label: string };

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "PRODUCT", href: "/#how-it-works" },
  { label: "ROI", href: "/#the-problem" },
  { label: "INTEGRATIONS", href: "/#integrations" },
  { label: "FAQ", href: "/#faq" },
];

const DEFAULT_CTA: CtaSpec = { href: "/contact", label: "REQUEST DEMO" };

type SiteNavProps = {
  navItems?: NavLink[];
  cta?: CtaSpec;
  /** Optional text-link action that sits to the LEFT of the primary CTA
   *  in the right cluster. Used by /mcp for the Sign In link. */
  secondaryCta?: CtaSpec;
};

export function SiteNav({
  navItems = DEFAULT_NAV_LINKS,
  cta = DEFAULT_CTA,
  secondaryCta,
}: SiteNavProps = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const showLinks = navItems.length > 0;

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink} aria-label="Ratio home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/aRncskdNBejcpieS2y5kWdyd9Vw.svg"
            alt=""
            width={24}
            height={24}
            className={styles.logoIcon}
            aria-hidden="true"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/M1NkDJ4eDI7E9pTqpUr4NH3RXAo.svg"
            alt="Ratio"
            width={85}
            height={24}
            className={styles.logoImg}
          />
        </Link>

        {showLinks ? (
          <ul className={styles.links}>
            {navItems.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          /* Placeholder keeps the right cluster pinned in grid column 3
             even when the centre nav is empty (e.g. on /mcp). */
          <span className={styles.linksPlaceholder} aria-hidden="true" />
        )}

        <div className={styles.rightCluster}>
          {secondaryCta ? (
            <a href={secondaryCta.href} className={styles.secondaryAction}>
              {secondaryCta.label}
            </a>
          ) : null}
          <a href={cta.href} className={styles.cta}>
            <span className={styles.ctaIconBg} aria-hidden="true">
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
            <span className={styles.ctaLabel}>{cta.label}</span>
          </a>
        </div>

        {/* Mobile hamburger — ALWAYS rendered (CSS hides it on desktop).
            Even pages with no centre links (e.g. /mcp) need it on mobile
            so their CTAs collapse into the dropdown instead of overflowing
            the bar. */}
        <button
          type="button"
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown — ALWAYS rendered (CSS hides it on desktop).
          Holds the centre links (if any), then the secondary action, then
          the primary CTA, so every nav target is reachable on mobile. */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        {navItems.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        {secondaryCta ? (
          <a
            href={secondaryCta.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {secondaryCta.label}
          </a>
        ) : null}
        <a
          href={cta.href}
          className={styles.mobileCta}
          onClick={() => setMenuOpen(false)}
        >
          <span className={styles.mobileCtaIconBg} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hs5ITvrZLDk3LlGJpQeTaivp4.svg"
              alt=""
              width={20}
              height={20}
            />
          </span>
          <span>{cta.label}</span>
        </a>
      </div>
    </nav>
  );
}
