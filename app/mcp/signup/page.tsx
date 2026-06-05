"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatWidget } from "@/components/chat-widget";
import styles from "./signup.module.css";

/**
 * /mcp/signup — Account creation mockup.
 *
 * Visually replicates the layout of the live Clerk-hosted sign-up page
 * at app.tryratio.io (heading, Google OAuth row, side-by-side first
 * and last name fields, email, password with show/hide, Continue
 * button, "already have an account" footer) but re-skinned in the
 * Ratio dark design system so the look matches the rest of the site.
 *
 * On submit the form does not actually create an account (the
 * production app.tryratio.io codebase handles real auth). It just
 * forwards to /mcp/setup so the design can be reviewed as a full
 * end-to-end flow during developer handoff.
 */

function GoogleLogo() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function McpSignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    /* Mock submit — production auth lives in the separate
       app.tryratio.io codebase. Just forward to the post-signup
       page so the design can be reviewed end-to-end. */
    router.push("/mcp/setup");
  }

  function handleGoogle() {
    router.push("/mcp/setup");
  }

  const canSubmit = email.trim() && password.trim();

  return (
    <div className={styles.page}>
      <header className={styles.appNav}>
        <div className={styles.appNavInner}>
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
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <header className={styles.cardHeader}>
            <h1 className={styles.h1}>Create your account</h1>
            <p className={styles.sub}>
              Welcome. Fill in the details to get started.
            </p>
          </header>

          <button
            type="button"
            className={styles.googleBtn}
            onClick={handleGoogle}
          >
            <GoogleLogo />
            <span>Continue with Google</span>
          </button>

          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>or</span>
            <span className={styles.dividerLine} />
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.nameRow}>
              <label className={styles.field}>
                <span className={styles.labelRow}>
                  <span className={styles.label}>First name</span>
                  <span className={styles.optional}>Optional</span>
                </span>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.labelRow}>
                  <span className={styles.label}>Last name</span>
                  <span className={styles.optional}>Optional</span>
                </span>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.labelRow}>
                <span className={styles.label}>Email address</span>
              </span>
              <input
                type="email"
                className={styles.input}
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.labelRow}>
                <span className={styles.label}>Password</span>
              </span>
              <div className={styles.secretWrap}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className={styles.secretToggle}
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </label>

            <button
              type="submit"
              className={styles.submit}
              disabled={!canSubmit}
            >
              <span>Continue</span>
              <ArrowRight />
            </button>
          </form>

          <footer className={styles.cardFooter}>
            Already have an account?{" "}
            <Link href="/mcp/signin" className={styles.inlineLink}>
              Sign in
            </Link>
          </footer>
        </div>
      </main>

      <ChatWidget />
    </div>
  );
}
