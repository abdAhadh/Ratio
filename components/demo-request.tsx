"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import posthog from "posthog-js";
import styles from "./demo-request.module.css";

/* The Cal.com embed is a client-only interactive widget. Loading it with
   ssr:false keeps @calcom/embed-react out of the server bundle — importing
   it during SSR was breaking DemoRequest's server render and causing a
   hydration mismatch. */
const CalEmbed = dynamic(() => import("./cal-embed").then((m) => m.CalEmbed), {
  ssr: false,
});

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+91", flag: "🇮🇳" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+61", flag: "🇦🇺" },
  { code: "+65", flag: "🇸🇬" },
];

const EXPECT = [
  "Quick read on your retailer mix and roughly how much you write off each year.",
  "Walk-through of how Ratio's AI agents pull, verify and dispute deductions.",
  "Set up a free 1-month trial you can start within a week.",
];

function CheckIcon() {
  return (
    <span className={styles.checkCircle} aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6.4 5 8.9 9.5 3.6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function EyebrowIcon() {
  return (
    <svg
      className={styles.eyebrowIcon}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="6" r="3.4" fill="#e45862" />
      <circle cx="5.6" cy="13.5" r="3.4" fill="#e45862" />
      <circle cx="14.4" cy="13.5" r="3.4" fill="#e45862" />
    </svg>
  );
}

export function DemoRequest() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dial, setDial] = useState("+1");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showCal, setShowCal] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fullPhone = `${dial} ${phone}`.trim();
    // Tag the visitor with their email so session recordings and future
    // events are linked to a known identity, then fire a custom event so
    // demo signups can be counted directly in PostHog (without needing to
    // parse autocaptured form-submit events).
    try {
      if (email) posthog.identify(email, { name, email, phone: fullPhone });
      posthog.capture("demo_form_submitted", {
        name,
        email,
        phone: fullPhone,
        has_message: Boolean(message),
      });
    } catch {
      /* PostHog may not be initialised in SSR / dev — never block the form */
    }
    // Fire-and-forget: notify Slack server-side; the calendar opens either way.
    fetch("/api/demo-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone: fullPhone, message }),
    }).catch(() => {});
    setShowCal(true);
  }

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <h1 className={styles.h1}>Request Demo</h1>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/c1XIjkEYbWaq7wCsdDyG3XVshc.png"
          alt=""
          aria-hidden="true"
          className={styles.strip}
        />

        <div className={styles.grid}>
          {/* Left — marketing copy */}
          <div className={styles.left}>
            <h2 className={styles.h2}>AI agents that recover retail deductions</h2>
            <hr className={styles.divider} />
            <p className={styles.lead}>
              See how Ratio pulls deductions from portals, emails and EDI,
              matches them against your invoices and shipment docs, and
              disputes the invalid ones.
            </p>
            <p className={`${styles.lead} ${styles.leadLast}`}>
              In one call, we&apos;ll walk through your retailer mix and
              scope a free 1-month trial of Ratio.
            </p>
            <p className={styles.expectHeading}>What to expect in this call?</p>
            <ul className={styles.expectList}>
              {EXPECT.map((item) => (
                <li key={item} className={styles.expectItem}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form card with an animated gradient border */}
          <div className={styles.right}>
            <div className={styles.cardWrap}>
              <div className={styles.card}>
                {showCal ? (
                  <>
                    <div className={styles.eyebrowRow}>
                      <EyebrowIcon />
                      <p className={styles.eyebrow}>Final step</p>
                    </div>
                    <h2 className={styles.cardTitle}>Pick a time</h2>
                    <p className={styles.calNote}>
                      Choose a slot that works for you. We&apos;ll send a
                      calendar invite and see you then.
                    </p>
                    <CalEmbed name={name} email={email} notes={message} />
                  </>
                ) : (
                  <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.eyebrowRow}>
                      <EyebrowIcon />
                      <p className={styles.eyebrow}>Contact us</p>
                    </div>
                    <h2 className={styles.cardTitle}>Let&apos;s talk</h2>

                    <label className={styles.field}>
                      <span className={styles.label}>Name</span>
                      <input
                        className={styles.input}
                        type="text"
                        required
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Work Email</span>
                      <input
                        className={styles.input}
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>

                    <div className={styles.field}>
                      <span className={styles.label}>Phone Number</span>
                      <div className={styles.phoneRow}>
                        <select
                          className={styles.select}
                          value={dial}
                          onChange={(e) => setDial(e.target.value)}
                          aria-label="Country dialing code"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          className={styles.phoneInput}
                          type="tel"
                          required
                          placeholder="(555) 123-4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <label className={styles.field}>
                      <span className={styles.label}>Message (optional)</span>
                      <textarea
                        className={styles.textarea}
                        rows={3}
                        placeholder="Which retailers do you sell into? Approximate annual revenue?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </label>

                    <button className={styles.submit} type="submit">
                      <span className={styles.submitIcon}>
                        {/* Two chevrons — the visible one slides out left on
                            hover while the second slides in from the right. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/hs5ITvrZLDk3LlGJpQeTaivp4.svg"
                          alt=""
                          width={20}
                          height={20}
                          className={styles.submitChevron}
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/hs5ITvrZLDk3LlGJpQeTaivp4.svg"
                          alt=""
                          width={20}
                          height={20}
                          className={styles.submitChevron}
                        />
                      </span>
                      Pick a time
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/c1XIjkEYbWaq7wCsdDyG3XVshc.png"
          alt=""
          aria-hidden="true"
          className={styles.strip}
        />
      </div>

      {/* Side rails — align with and join the footer's side borders. */}
      <div className={styles.rails} aria-hidden="true" />
    </main>
  );
}
