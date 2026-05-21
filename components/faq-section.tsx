"use client";

import { useState } from "react";
import styles from "./faq-section.module.css";

/**
 * FAQ — accordion, pixel-matched against the 8098 reference (#ratio-faq).
 * Eyebrow + heading + subheading, then an 800px-wide accordion list inside
 * the shared 1570px bordered frame. All items start closed and multiple
 * can be open at once. The +/- icon is two 1.5px bars; the vertical one
 * rotates away on open.
 */
const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Will this replace my AR team?",
    a: "No. Ratio is built to augment your existing AR team, not replace them. Most customers keep their existing headcount and use Ratio to cover 10× more accounts. This is especially useful for the long tail of customers you have. Their work shifts from chasing collections to resolving disputes, deciding credit terms, and managing strategic accounts.",
  },
  {
    q: "How is Ratio priced?",
    a: "Fixed plans, sized to your invoice volume. We work directly with each customer to land on the plan that fits their AR workload. Clean ROI math, no per-seat surprises.",
  },
  {
    q: "What's the best way to partner?",
    a: "Start with a pilot. Connect your tools, define your guardrails, and see results by week two. Early customers get founding-partner pricing and a direct hand in the roadmap. We're actively shaping the product alongside the first cohort.",
  },
  {
    q: "How is data handled and is it secure?",
    a: "Your data is encrypted at rest and in transit. We use it only to improve performance on your own account. Any other use is explicitly outside our data-governance policies.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.mainContainer}>
        <header className={styles.head}>
          <div className={styles.eyebrowRow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/zL3R1jIJOOTcUZTPulz455RaY.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
            <span className={styles.eyebrow}>FAQ</span>
          </div>
          <h2 className={styles.h2}>Questions, answered</h2>
          <p className={styles.sub}>
            Everything a finance leader should know before a first call.
          </p>
        </header>

        <div className={styles.list}>
          {FAQS.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <div
                key={item.q}
                className={styles.item}
                data-open={isOpen ? "true" : "false"}
              >
                <button
                  type="button"
                  className={styles.q}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className={styles.icon} aria-hidden="true" />
                </button>
                {isOpen && (
                  <div className={styles.a}>
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
