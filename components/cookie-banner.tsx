"use client";

import { useEffect, useState } from "react";
import styles from "./cookie-banner.module.css";
import {
  OPEN_BANNER_EVENT,
  readConsent,
  writeConsent,
} from "@/lib/consent";

/**
 * Cookie consent banner — compact Accept / Reject design.
 *
 * Behaviour:
 *  - On first visit (no stored consent): slides up after a 600 ms delay so
 *    it doesn't compete with the hero shader's first paint.
 *  - "Accept" → analytics + recording on.
 *  - "Reject" → both off. Saved either way so we don't re-prompt.
 *  - Footer "Manage cookies" link dispatches `ratio:open-cookie-settings`
 *    which re-opens this banner.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (existing) return undefined;
    const t = window.setTimeout(() => setOpen(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_BANNER_EVENT, handler);
    return () => window.removeEventListener(OPEN_BANNER_EVENT, handler);
  }, []);

  function decide(accept: boolean) {
    writeConsent({ analytics: accept, recording: accept });
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className={styles.wrap}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
    >
      <p className={styles.body}>
        We use cookies for analytics and session replay.{" "}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>
      <div className={styles.actions}>
        <button
          className={`${styles.btn} ${styles.btnSecondary}`}
          onClick={() => decide(false)}
          type="button"
        >
          Reject
        </button>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => decide(true)}
          type="button"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
