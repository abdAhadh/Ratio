"use client";

import Link from "next/link";
import { useState } from "react";
import { ChatWidget } from "@/components/chat-widget";
import styles from "./setup.module.css";

/**
 * /mcp/setup — Post-signup onboarding for the Walmart MCP connector.
 *
 * Mirrors the cream-coloured app.tryratio.io welcome page in structure
 * but uses the Ratio dark design system (Gelasio serif headline, Geist
 * body, 1px #333 hairlines, dark bg). Copy comes from the operator
 * guide so the steps read precisely, not generically.
 *
 * This route is a localhost mockup for iterating on copy + visual
 * design. The actual form submission and connector URL provisioning
 * live in the separate app.tryratio.io codebase.
 */

const MOCK_EMAIL = "ahadh@tryratio.io";
const MOCK_CONNECTOR_URL =
  "https://mcp.tryratio.io/mcp/5bcc8U-m1xYBrtNv9o29he_YW1P-DZP2ptP4jTbp1f8";

const SAMPLE_QUESTIONS = [
  "List all my Walmart items and their stock status.",
  "Which of my SKUs are out of stock right now?",
  "Show me my orders from the last 30 days.",
  "Do I have any open returns? Summarize them.",
  "Give me a health check of my store.",
];

function CopyIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
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

function LockIcon() {
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
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function McpSetupPage() {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(MOCK_CONNECTOR_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard API may be unavailable over plain http. */
    }
  }

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
          <div className={styles.userPill}>
            <span className={styles.userAvatar} aria-hidden="true">
              {MOCK_EMAIL[0].toUpperCase()}
            </span>
            <span className={styles.userEmail}>{MOCK_EMAIL}</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <p className={styles.introLine}>
            Two quick steps to get Claude querying your Walmart data.
          </p>

          {/* ─── Step 1 ─── */}
          <section className={styles.step}>
            <div className={styles.stepRail} aria-hidden="true">
              <span className={styles.stepBadge}>01</span>
              <span className={styles.stepLine} />
            </div>
            <div className={styles.stepBody}>
              <h2 className={styles.stepTitle}>Connect Walmart</h2>
              <p className={styles.stepLead}>
                Get your Client ID and Client Secret from the Walmart
                Developer Portal:
              </p>
              <ol className={styles.instructionList}>
                <li>
                  <span className={styles.liNum}>1</span>
                  <span>
                    Navigate to the{" "}
                    <a
                      href="https://seller.walmart.com/api-key"
                      target="_blank"
                      rel="noreferrer"
                      className={styles.inlineLink}
                    >
                      API Integration page
                    </a>{" "}
                    in Seller Center.
                  </span>
                </li>
                <li>
                  <span className={styles.liNum}>2</span>
                  <span>
                    Select{" "}
                    <span className={styles.codeChip}>API Key Management</span>{" "}
                    to sign in to the Developer Portal with your Seller
                    Center credentials.
                  </span>
                </li>
                <li>
                  <span className={styles.liNum}>3</span>
                  <span>
                    From there, locate your personal key pair (it has a lock
                    icon next to it) and copy your{" "}
                    <span className={styles.codeChip}>Client ID</span> and{" "}
                    <span className={styles.codeChip}>Client Secret</span>.
                  </span>
                </li>
              </ol>

              <form
                className={styles.card}
                onSubmit={(e) => {
                  e.preventDefault();
                  /* Mock submit. Production app posts to its own backend. */
                }}
              >
                <label className={styles.field}>
                  <span className={styles.label}>Client ID</span>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Client Secret</span>
                  <div className={styles.secretWrap}>
                    <input
                      type={showSecret ? "text" : "password"}
                      className={styles.input}
                      placeholder="••••••••••••••••••••••••"
                      value={clientSecret}
                      onChange={(e) => setClientSecret(e.target.value)}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    <button
                      type="button"
                      className={styles.secretToggle}
                      onClick={() => setShowSecret((s) => !s)}
                      aria-label={
                        showSecret ? "Hide client secret" : "Show client secret"
                      }
                    >
                      <EyeIcon open={showSecret} />
                    </button>
                  </div>
                </label>

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={!clientId || !clientSecret}
                >
                  Connect Walmart
                </button>
                <p className={styles.cardHelper}>
                  We validate the pair against Walmart on submit and store
                  the secret encrypted at rest.
                </p>
              </form>
            </div>
          </section>

          {/* ─── Step 2 ─── */}
          <section className={styles.step}>
            <div className={styles.stepRail} aria-hidden="true">
              <span className={styles.stepBadge}>02</span>
              <span className={styles.stepLine} />
            </div>
            <div className={styles.stepBody}>
              <h2 className={styles.stepTitle}>Connect Claude</h2>
              <p className={styles.stepLead}>
                Copy your connector URL, then paste it into Claude.
              </p>

              <div className={styles.card}>
                <p className={styles.fieldHeading}>Your connector URL</p>
                <div className={styles.urlRow}>
                  <code className={styles.url}>{MOCK_CONNECTOR_URL}</code>
                  <button
                    type="button"
                    className={styles.copyBtn}
                    onClick={copyUrl}
                    aria-label="Copy connector URL"
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <p className={styles.warnRow}>
                  <LockIcon />
                  <span>
                    Treat this URL like a password. Anyone with it can
                    read your Walmart data through Claude. Don&apos;t share
                    it or paste it anywhere public.
                  </span>
                </p>

                <ol className={styles.instructionList}>
                  <li>
                    <span className={styles.liNum}>1</span>
                    <span>
                      Open Claude (web or desktop). Go to{" "}
                      <span className={styles.codeChip}>Settings</span>
                      {" → "}
                      <span className={styles.codeChip}>Connectors</span>
                      .
                    </span>
                  </li>
                  <li>
                    <span className={styles.liNum}>2</span>
                    <span>
                      Click{" "}
                      <span className={styles.codeChip}>
                        Add custom connector
                      </span>
                      {" → "}
                      Paste the URL
                      {" → "}
                      Name it &ldquo;Walmart&rdquo;, and hit Save.
                    </span>
                  </li>
                  <li>
                    <span className={styles.liNum}>3</span>
                    <span>
                      Open a new chat. Make sure the connector is enabled.
                      Start asking.
                    </span>
                  </li>
                </ol>

                <p className={styles.helperText}>
                  Same URL works in ChatGPT, Cursor, Cline, Continue, and
                  any other MCP-compatible client.
                </p>
              </div>
            </div>
          </section>

          {/* ─── Step 3 (try it) ─── */}
          <section className={styles.step}>
            <div className={styles.stepRail} aria-hidden="true">
              <span className={styles.stepBadge}>03</span>
            </div>
            <div className={styles.stepBody}>
              <h2 className={styles.stepTitle}>Try a question</h2>
              <p className={styles.stepLead}>
                A few starter prompts to ask Claude once the connector is
                set up:
              </p>
              <ul className={styles.questionList}>
                {SAMPLE_QUESTIONS.map((q) => (
                  <li key={q} className={styles.questionItem}>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>

      <ChatWidget />
    </div>
  );
}
