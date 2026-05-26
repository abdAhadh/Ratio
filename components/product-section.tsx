"use client";

import { useEffect, useRef, useState } from "react";
import { UnicornShader } from "./hero/unicorn-shader";
import styles from "./product-section.module.css";

/**
 * Product (How It Works) — pixel-matched against localhost:8098.
 *
 * Reference layout @ 2000px wide viewport:
 *  - <section>: 2000 wide, padding 0 120px (but Main Container caps at 1570).
 *  - <main-container>: 1570 × 2781, centered (x=215), padding 60px 0 100px,
 *    with vertical-only borders (left/right 1px solid #333) — this is the
 *    bordered "box" the user noticed.
 *  - Inside Main Container:
 *      - Content Wrapper: 1570 wide, flex col, gap 55px.
 *        - Heading Container: 657 wide (centered), gap 12.
 *          - Eyebrow row (icon + "PRODUCT" eyebrow)
 *          - h2
 *          - sub p
 *        - Card Container: 1570 wide, flex col.
 *          - Top line-pattern strip (65 tall, 1570 wide, full 1px #333 border)
 *          - Cards Wrapper: flex row, no gap.
 *            - Left Side Container: 644 wide, sticky top:120, padding 75 40 45 30
 *              · Dot 1 (active) is white circle 13×13, border-radius 50%
 *              · Dots 2-6 are 12×12 squares (border-radius 0), 1px #8b8b8b
 *                border, transparent fill — outlined squares
 *              · Item list — item 1 white, items 2-6 #a6a6a6, 103px apart
 *            - Right Side Container: 926 wide, position:relative, padding 32
 *              · UnicornShader fills it exactly (926×2120)
 *              · Card Wrapper inside is 862 wide (926-2*32), padding 80px 0,
 *                gap 32, contains 6 sticky cards (862 wide, 296-320 tall)
 *          - Bottom line-pattern strip (65 tall, 1570 wide)
 *  - Active state is SCROLL-DRIVEN: as the user scrolls, the active item +
 *    dot cycles through 1→6 based on which card is currently stuck near the
 *    top of the viewport. Active item is white text (others #a6a6a6). Active
 *    dot is a 13×13 white circle (others are 12×12 outlined squares with
 *    1px rgb(139,139,139) border).
 */

/* Per-card SVG glyphs (Lucide-style, 24×24, 1.75px white stroke). Inline so
   they don't depend on PNG icons whose strokes were almost invisible on the
   card background. Each glyph maps to its card's subject:
     0 intake from many channels  → speech-bubble with lines
     1 verify against your docs   → receipt
     2 file disputes              → message-circle-question
     3 live dispute status        → activity / line chart
     4 cash + ERP close-out       → landmark / bank */
const ICON_BY_INDEX: Array<React.ReactElement> = [
  <svg
    key="intake"
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
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M7 9h10" />
    <path d="M7 13h6" />
  </svg>,
  <svg
    key="verify"
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
    <path d="M4 2v20l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2V2l-2 2-2-2-2 2-2-2-2 2-2-2-2 2Z" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <path d="M12 17.5v-11" />
  </svg>,
  <svg
    key="file"
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
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>,
  <svg
    key="track"
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
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>,
  <svg
    key="close"
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
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </svg>,
];

// Per-card sticky top (CSS top) — each subsequent card stickies a few px lower
// so they stack/fan visually as the user scrolls.
const STICKY_TOPS = [120, 130, 140, 140, 140];

const CARDS = [
  {
    title: "Pulls every deduction into one place",
    body: "Agents read deductions out of emails, EDI feeds and retailer portals. If you sell 3P on Amazon, FBA charges are pulled in too.",
  },
  {
    title: "Verifies each one against your records",
    body: "Every deduction is matched against your invoice, BOL, POD and promo contracts to find what is invalid.",
  },
  {
    title: "Files disputes in each retailer's portal",
    body: "Agents file each dispute in the right portal with the supporting documents attached, before the retailer's deadline.",
  },
  {
    title: "Live status on every dispute",
    body: "A dashboard shows what the agents are working on and where each dispute stands.",
  },
  {
    title: "Closes the loop in your ERP",
    body: "Once a recovery clears, agents apply the cash, create the credit memo and post the entries in your ERP.",
  },
];

export function ProductSection() {
  // 8098 mechanic: a dashed vertical line element grows from dot 1 downward
  // as the user scrolls; each dot it reaches turns from outlined-square into
  // a white-filled-circle, CUMULATIVELY. So at full scroll, all 5 dots are
  // filled circles connected by a dashed line; at the top, only dot 1 is
  // filled and no line is visible.
  //
  // - `lineHeight` = pixel height of the dashed connector line (0…~320)
  // - A dot at index i is considered "reached" when lineHeight >= i*80
  //   (80 = list line-height 30 + flex gap 50 — gives the items visible
  //   breathing room while end-of-section alignment with card 5 is held
  //   by the leftSide padding-bottom setting.)
  const [lineHeight, setLineHeight] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const compute = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const cards = sec.querySelectorAll<HTMLElement>(
        `.${styles.cardSticky}`
      );
      if (!cards.length) return;
      // Activation line: when card i's top crosses this y, dot i is reached.
      const activationLine = window.innerHeight * 0.25;
      let activeIdx = 0;
      cards.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top <= activationLine) activeIdx = i;
      });

      // Compute the line height. Each step between dots is 80px (line-height
      // 30 + list gap 50). Within the current step we interpolate based on
      // how close the next card is to the activation line, so the line grows
      // smoothly between dots.
      let h = activeIdx * 80;
      if (activeIdx < cards.length - 1) {
        const next = cards[activeIdx + 1].getBoundingClientRect();
        const remaining = next.top - activationLine;
        // Each card occupies ~328px of scroll. Use that to estimate
        // the in-between progress.
        const stepProgress = Math.max(0, Math.min(1, 1 - remaining / 328));
        h += stepProgress * 80;
      }
      setLineHeight((prev) =>
        Math.abs(prev - h) < 0.5 ? prev : Math.round(h)
      );
    };
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute, { passive: true });
    compute();
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  // Each dot's vertical position from the top of the track. 80px step
  // (line-height 30 + gap 50). End-of-section alignment with card 5's
  // bottom is held independently by .leftSide padding-bottom (= 50), so
  // changing the step here doesn't affect that alignment.
  const DOT_TOPS = [0, 80, 160, 240, 320];
  // A dot is "active" (filled circle) once the line has reached its top.
  const isDotActive = (i: number) => lineHeight >= DOT_TOPS[i];
  // The current active text item is the highest-index reached dot.
  const activeItemIdx = DOT_TOPS.reduce(
    (best, top, i) => (lineHeight >= top ? i : best),
    0
  );

  return (
    <section id="how-it-works" ref={sectionRef} className={styles.section}>
      <div className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          {/* ───── Heading Container (gap 12) ───── */}
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
              <p className={styles.eyebrow}>PRODUCT</p>
            </div>
            {/* Heading and Subtext (gap 4) */}
            <div className={styles.headingAndSubtext}>
              <h2 className={styles.h2}>
                How Ratio recovers money for you.
              </h2>
              <p className={styles.sub}>
                AI agents take over finding and disputing invalid retailer
                deductions, so your team does not have to. Our deduction
                experts step in for complex cases.
              </p>
            </div>
          </header>

          {/* ───── Card Container ───── */}
          <div className={styles.cardContainer}>
            {/* Top decorative line-pattern strip (1570×65, 1px #333 all sides) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/c1XIjkEYbWaq7wCsdDyG3XVshc.png"
              alt=""
              aria-hidden="true"
              className={styles.linePattern}
            />

            <div className={styles.cardsWrapper}>
              {/* Left Side: dots + list */}
              <div className={styles.leftSide}>
                <div className={styles.stickyHeadings}>
                  {/* Indicator — dashed line that grows on scroll + 6 dots.
                      Each dot is an outlined square until the line reaches it,
                      then becomes a white-filled circle. CUMULATIVE — once
                      a dot is filled it stays filled. */}
                  <div className={styles.track} aria-hidden="true">
                    <div
                      className={styles.line}
                      style={{ height: `${lineHeight}px` }}
                    />
                    {CARDS.map((_, i) => {
                      const active = isDotActive(i);
                      /* DOT_VISUAL_OFFSET (9px) shifts each dot down so its
                         vertical centre aligns with the centre of the
                         corresponding text line (line-height 30 → centre y=15;
                         dot height ~12 → top at 9 puts its centre at 15). */
                      return (
                        <div
                          key={i}
                          className={`${styles.dot} ${active ? styles.dotActive : ""}`}
                          style={{
                            top: `${DOT_TOPS[i] + 9 + (active ? -0.5 : 0)}px`,
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Card titles (numbers removed — the dot rail to the left
                      already conveys order). */}
                  <ol className={styles.list}>
                    {CARDS.map((c, i) => (
                      <li
                        key={c.title}
                        className={`${styles.listItem} ${i === activeItemIdx ? styles.listItemActive : ""}`}
                      >
                        {c.title}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Right Side: shader behind, cards in front */}
              <div className={styles.rightSide}>
                <div className={styles.shader} aria-hidden="true">
                  <UnicornShader project="dEgIk7gTgac92JHdIqzB" />
                </div>
                <div className={styles.cardWrapper}>
                  {CARDS.map((c, i) => (
                    <div
                      key={c.title}
                      className={styles.cardSticky}
                      style={{ top: `${STICKY_TOPS[i]}px` }}
                    >
                      <article className={styles.card}>
                        <div className={styles.cardHead}>
                          <div className={styles.cardIcon}>
                            {ICON_BY_INDEX[i]}
                          </div>
                          <span className={styles.cardNum}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className={styles.cardText}>
                          <h4 className={styles.cardTitle}>{c.title}</h4>
                          <p className={styles.cardBody}>{c.body}</p>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom decorative line-pattern strip */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/c1XIjkEYbWaq7wCsdDyG3XVshc.png"
              alt=""
              aria-hidden="true"
              className={styles.linePattern}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
