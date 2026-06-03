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
    q: "Which retailers and channels do you cover?",
    a: "Walmart, Target, Costco, Kroger, Amazon (1P and 3P FBA), Albertsons, Whole Foods, KeHE, UNFI, and most US grocery, mass, club and distributor channels. If you sell into a retailer we have not seen before, we can typically add it within 1 week.",
  },
  {
    q: "Can you recover deductions we already wrote off?",
    a: "It depends on the retailer. Walmart's APDP window is 30 days, Target POL is 30 to 60 days, Costco is 60 days. Kroger and KeHE allow up to 180 days. Amazon cut its Vendor Central window from 5 years to 24 months. Within those windows, Ratio recovers every deduction across all your retailers.",
  },
  {
    q: "What does the free trial involve from our side?",
    a: "We need read-only access to your retailer portals, recent remittances, invoice and shipment records, and contracts with retailers. We set Ratio up on your stack and run it live for 30 days. You see deductions recovered before paying anything.",
  },
  {
    q: "How is Ratio priced?",
    a: "A small monthly subscription plus a commission on what we recover. The commission rate scales with your deduction volume, so larger brands pay a lower rate. We start with a free 1-month trial, so you see the value before committing.",
  },
  {
    q: "How is data handled and is it secure?",
    a: "Your data is encrypted at rest and in transit, with read-only access wherever available. We only use your data to validate and dispute your own deductions, nothing else.",
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
