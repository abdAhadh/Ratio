"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_NAME = "cookie_consent";

function setConsent(value: "accepted" | "rejected") {
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

function getConsent(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((r) => r.startsWith(`${COOKIE_NAME}=`));
  return match ? match.split("=")[1] : null;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) {
      // small delay so it doesn't flash on page load
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  function handle(value: "accepted" | "rejected") {
    setConsent(value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[60]"
        >
          <div className="bg-white border border-border rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-5">
            <p className="text-sm font-semibold text-navy mb-1">We use cookies</p>
            <p className="text-xs text-text-secondary leading-relaxed mb-4">
              We use cookies to remember your preferences and improve your experience.{" "}
              <a href="/privacy" className="underline hover:text-navy">Privacy Policy</a>.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handle("accepted")}
                className="flex-1 px-4 py-2 bg-navy text-white text-sm font-medium rounded-full hover:bg-navy-light transition-colors"
              >
                Accept
              </button>
              <button
                onClick={() => handle("rejected")}
                className="flex-1 px-4 py-2 bg-white text-navy text-sm font-medium rounded-full border border-border hover:bg-cream transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
