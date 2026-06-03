import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { CTABanner } from "@/components/cta-banner";
import styles from "./dr-water.module.css";

export const metadata: Metadata = {
  title: "Dr Water × Ratio | Case Study",
  description:
    "How Dr Water, a lean DTC hydration brand, recovered $52k of retailer deductions in 90 days with Ratio, across Amazon 1P, Walmart and Erewhon.",
};

const STATS: Array<{ value: string; label: string }> = [
  { value: "$52k+", label: "Recovered in first 90 days" },
  { value: "90%", label: "Win rate on disputed claims" },
  { value: "18 hrs", label: "Saved per month, finance team" },
];

const RESULTS: string[] = [
  "$52,300 recovered in the first 90 days.",
  "90% win rate on disputed claims.",
  "18 hours per month freed up.",
  "7.8x ROI on Ratio's fee.",
];

const QUOTE_PHOTO = "/case-studies/dr-water/smile-bhateja.jpg";
const QUOTE_NAME = "Smile Bhateja";
const QUOTE_ROLE = "Co-founder & CEO, Dr Water";

function QuoteCallout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className={styles.quote}>
      <p className={styles.quoteText}>{children}</p>
      <div className={styles.quoteAttrRow}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={QUOTE_PHOTO}
          alt={QUOTE_NAME}
          width={44}
          height={44}
          className={styles.quoteAvatar}
        />
        <div className={styles.quoteAttrText}>
          <p className={styles.quoteAttrName}>{QUOTE_NAME}</p>
          <p className={styles.quoteAttrRole}>{QUOTE_ROLE}</p>
        </div>
      </div>
    </blockquote>
  );
}

export default function DrWaterCaseStudy() {
  return (
    <>
      <SiteNav />

      <main className={styles.main}>
        <div className={styles.inner}>
          {/* Side rails — same geometry as footer + contact page, joins
              continuously through the page when stacked. */}
          <div className={styles.rails} aria-hidden="true" />

          {/* Hero */}
          <header className={styles.hero}>
            <Link href="/" className={styles.crumb}>
              ← Back to home
            </Link>
            <p className={styles.eyebrow}>CASE STUDY · DR WATER</p>
            <h1 className={styles.h1}>
              How Dr Water recovered $52k of deductions in 90 days with Ratio.
            </h1>
            <p className={styles.sub}>
              A lean DTC hydration brand reclaims margin from Amazon 1P,
              Walmart and Erewhon, without adding finance headcount.
            </p>
          </header>

          {/* Hero strip — same hatched divider used across the site */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/c1XIjkEYbWaq7wCsdDyG3XVshc.png"
            alt=""
            aria-hidden="true"
            className={styles.strip}
          />

          {/* Stat row */}
          <section className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </section>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/c1XIjkEYbWaq7wCsdDyG3XVshc.png"
            alt=""
            aria-hidden="true"
            className={styles.strip}
          />

          {/* About */}
          <section className={styles.section}>
            <h2 className={styles.h2}>About Dr Water</h2>
            <p className={styles.p}>
              Dr Water is a premium functional hydration brand selling across
              DTC, Amazon 1P, Walmart, and Erewhon. The team is twelve people
              across product, ops, and marketing. The finance function is just
              one person handling AR, AP, and remittance review, with the CEO
              stepping in during month-end close. Their finances are managed
              by a CPA firm that handles bookkeeping, tax filings, and
              compliance on top of QuickBooks.
            </p>
          </section>

          {/* The Challenge */}
          <section className={styles.section}>
            <h2 className={styles.h2}>The challenge</h2>
            <p className={styles.p}>
              Every retailer deducted differently. Walmart short-paid via APDP
              with a 30-day dispute window. Amazon 1P fired chargebacks for
              cost discrepancies and shortage claims through Vendor Central.
              Erewhon emailed remittance PDFs with scan-down billbacks buried
              inside.
            </p>
            <p className={styles.p}>
              For a one-person finance function, the manual effort to claim
              each deduction was substantial. Every dispute meant logging into
              a portal, downloading the remittance, hunting for the matching
              POD or BOL across the 3PL&apos;s email and a shared Drive
              folder, and uploading a packet of evidence.
            </p>
            <p className={styles.p}>
              The CEO regularly stepped in during month-end close to help
              reconcile remittances, since the one-person finance function
              simply couldn&apos;t keep up. Chasing retailer deductions sat
              outside the scope of the CPA firm that managed Dr Water&apos;s
              books, so it kept rolling over to the founder.
            </p>

            <QuoteCallout>
              We knew we were leaking margin every week. We just didn&apos;t
              have the time or the playbook to chase it. Walmart&apos;s 30-day
              window came and went before we&apos;d even read the remittance.
            </QuoteCallout>
          </section>

          {/* The Solution */}
          <section className={styles.section}>
            <h2 className={styles.h2}>The solution</h2>
            <p className={styles.p}>
              Ratio connected to Dr Water&apos;s existing stack in 3 days:
              QuickBooks via OAuth, the 3PL through shipment notifications,
              authorized sync to Walmart APDP and Amazon Vendor Central
              (Amazon over the official SP-API, Walmart over a read-only
              Retail Link credential), and a forwarded inbox rule for
              Erewhon&apos;s emailed remittance PDFs.
            </p>
            <p className={styles.p}>
              From there, Ratio&apos;s AI agents pull every deduction the
              moment it hits a remittance, match it to the corresponding
              invoice, POD, BOL, and (where applicable) the original promo
              agreement, then file the dispute through the correct channel
              (APDP for Walmart, Vendor Central for Amazon, email for Erewhon)
              well inside each retailer&apos;s dispute window. Dr Water&apos;s
              finance function reviews a single weekly dashboard instead of
              three retailer portals.
            </p>

            <QuoteCallout>
              It took us two calls and an hour of integration work. By the end
              of week one Ratio had already filed 38 disputes that we&apos;d
              have written off. By month two it was running on autopilot.
            </QuoteCallout>
          </section>

          {/* The Results */}
          <section className={styles.section}>
            <h2 className={styles.h2}>The results</h2>
            <p className={styles.p}>
              In the first 90 days of running Ratio, Dr Water&apos;s
              one-person finance function went from chasing deductions
              reactively to letting them get handled in the background.
            </p>

            <ul className={styles.resultList}>
              {RESULTS.map((r) => (
                <li key={r} className={styles.resultItem}>
                  <span className={styles.bullet} aria-hidden="true">
                    →
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      {/* Closing CTA — reuses the End CTA banner from the home page */}
      <CTABanner />

      <SiteFooter />
    </>
  );
}
