"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./site-nav.module.css";

/**
 * Top nav — pixel-matched against localhost:8098 on desktop. On mobile the
 * centre links + CTA collapse into a hamburger dropdown (the Closor template
 * does the same). All mobile-only elements are display:none on desktop.
 */
const NAV_LINKS: Array<{ label: string; href: string }> = [
  { label: "PRODUCT", href: "/#how-it-works" },
  { label: "ROI", href: "/#the-problem" },
  { label: "INTEGRATIONS", href: "/#integrations" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

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

        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.link}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="/contact" className={styles.cta}>
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
          <span className={styles.ctaLabel}>REQUEST DEMO</span>
        </a>

        {/* Mobile-only hamburger toggle */}
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

      {/* Mobile-only dropdown menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="/contact"
          className={styles.mobileCta}
          onClick={() => setMenuOpen(false)}
        >
          REQUEST DEMO
        </a>
      </div>
    </nav>
  );
}
