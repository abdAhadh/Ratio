import Link from "next/link";
import styles from "./site-nav.module.css";

/**
 * Top nav — pixel-matched against localhost:8098.
 *
 * Reference computed-style values (1440px desktop):
 *  - <nav>:       80px tall · bg rgb(1,1,1) · backdrop-blur(15.55px) · padding 16px 60px · position:fixed
 *  - inner row:   1320px wide · 48px tall · flex space-between · gap 10px
 *  - logo:        85×24 SVG  (/M1NkDJ4eDI7E9pTqpUr4NH3RXAo.svg)
 *  - nav links:   14px Geist 500 · color #999 · letter-spacing -0.14px · 20px gap between items
 *  - CTA pill:    164×48 · bg #fff · sharp corners (0 radius) · padding 14px · gap 10px
 *  - CTA text:    14px Geist 500 · color rgb(26,26,26) · letter-spacing -0.14px
 *  - CTA icon BG: 20×20 · bg rgb(26,26,26) · radius 2px · contains chevron-right SVG
 */
/** Nav links are root-relative (`/#section`) so they resolve from every
 *  page — on the home page they smooth-scroll to the section; from a
 *  sub-page they navigate to the home page and then scroll there. */
const NAV_LINKS: Array<{ label: string; href: string }> = [
  { label: "PRODUCT", href: "/#how-it-works" },
  { label: "ROI", href: "/#the-problem" },
  { label: "INTEGRATIONS", href: "/#integrations" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteNav() {
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
          {/* SVG wordmark — exactly what 8098 serves: a 60×20 SVG containing
              a <text> node rendered in Georgia/Times-New-Roman serif. Using
              the SVG (not HTML text) so the font rendering matches 8098 1:1. */}
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
            {/* Two chevrons — on hover the visible one slides out left while
                the second slides in from the right (8098's icon-box loop). */}
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
      </div>
    </nav>
  );
}
