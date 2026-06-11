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
 * Centre items are data-driven and can be either a plain link or a GROUP
 * (a labelled trigger that opens a hover/click dropdown of child links).
 * This keeps the bar uncluttered as more destinations are added: the
 * home-page explainer anchors live under a "Product" group, while
 * standalone destinations (Case study, Free MCP, FAQ) sit at top level.
 *
 * Reused by sibling landing pages (e.g. /mcp) that want a slimmed-down
 * nav: pass `navItems={[]}` to hide the centre cluster, `secondaryCta`
 * to add a text link before the primary CTA, and `cta` to override the
 * primary CTA label/href.
 */
type NavLink = { label: string; href: string };
type NavGroup = { label: string; children: NavLink[] };
type NavItem = NavLink | NavGroup;
type CtaSpec = { href: string; label: string };

function isGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    label: "PRODUCT",
    children: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Integrations", href: "/#integrations" },
      { label: "ROI", href: "/#the-problem" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  { label: "CASE STUDY", href: "/case-studies/dr-water" },
  { label: "FREE MCP", href: "/mcp" },
];

const DEFAULT_CTA: CtaSpec = { href: "/contact", label: "REQUEST DEMO" };

type SiteNavProps = {
  navItems?: NavItem[];
  cta?: CtaSpec;
  /** Optional text-link action that sits to the LEFT of the primary CTA
   *  in the right cluster. Used by /mcp for the Sign In link. */
  secondaryCta?: CtaSpec;
};

export function SiteNav({
  navItems = DEFAULT_NAV_ITEMS,
  cta = DEFAULT_CTA,
  secondaryCta,
}: SiteNavProps = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  // Which centre dropdown (by group label) is open on desktop.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
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
            {navItems.map((item) =>
              isGroup(item) ? (
                <li
                  key={item.label}
                  className={styles.groupLi}
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() =>
                    setOpenMenu((cur) => (cur === item.label ? null : cur))
                  }
                >
                  <button
                    type="button"
                    className={`${styles.link} ${styles.trigger}`}
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.label}
                    onClick={() =>
                      setOpenMenu((cur) =>
                        cur === item.label ? null : item.label
                      )
                    }
                  >
                    {item.label}
                    <svg
                      className={styles.chevron}
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {openMenu === item.label && (
                    <div className={styles.dropdown}>
                      <div className={styles.dropdownCard}>
                        {item.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className={styles.dropdownItem}
                            onClick={() => setOpenMenu(null)}
                          >
                            {/* On hover: the accent square fades in at the
                                left gutter and the label slides right to make
                                room (smooth). No footer-style roller-blind
                                here. */}
                            <span
                              className={styles.dropdownMarker}
                              aria-hidden="true"
                            />
                            <span className={styles.dropdownItemText}>
                              {child.label}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <a href={item.href} className={styles.link}>
                    {item.label}
                  </a>
                </li>
              )
            )}
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
          Groups are flattened: the group label becomes a small section
          heading, its children list beneath it, then standalone links,
          then the secondary action + primary CTA. */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        {navItems.map((item) =>
          isGroup(item) ? (
            <div key={item.label} className={styles.mobileGroup}>
              <p className={styles.mobileGroupLabel}>{item.label}</p>
              {item.children.map((child) => (
                <a
                  key={child.href}
                  href={child.href}
                  className={`${styles.mobileLink} ${styles.mobileSubLink}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {child.label}
                </a>
              ))}
            </div>
          ) : (
            <a
              key={item.href}
              href={item.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          )
        )}
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
