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

  // Step 02 — Amazon SP-API credentials.
  const [amzClientId, setAmzClientId] = useState("");
  const [amzClientSecret, setAmzClientSecret] = useState("");
  const [amzRefreshToken, setAmzRefreshToken] = useState("");
  const [amzMerchantToken, setAmzMerchantToken] = useState("");
  const [showAmzSecret, setShowAmzSecret] = useState(false);
  const [showAmzRefresh, setShowAmzRefresh] = useState(false);

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
            3 quick steps to get Claude querying your Walmart and Amazon
            data.
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

          {/* ─── Step 2 — Amazon (optional) ─── */}
          <section className={styles.step}>
            <div className={styles.stepRail} aria-hidden="true">
              <span className={styles.stepBadge}>02</span>
              <span className={styles.stepLine} />
            </div>
            <div className={styles.stepBody}>
              <h2 className={styles.stepTitle}>Connect Amazon</h2>
              <p className={styles.stepLead}>
                Paste your Amazon SP-API LWA credentials and a
                seller-authorized refresh token. Skip if you only sell on
                Walmart.
              </p>

              <ol className={styles.instructionList}>
                <li>
                  <span className={styles.liNum}>1</span>
                  <span>
                    Sign in to Seller Central. Open{" "}
                    <span className={styles.codeChip}>
                      Apps and Services
                    </span>
                    {" → "}
                    <span className={styles.codeChip}>Develop Apps</span>.
                  </span>
                </li>
                <li>
                  <span className={styles.liNum}>2</span>
                  <span>
                    Click{" "}
                    <span className={styles.codeChip}>
                      Add new app client
                    </span>
                    . Set type to{" "}
                    <span className={styles.codeChip}>Sellers</span> and
                    give it any name (e.g. &ldquo;Ratio Reporting&rdquo;).
                  </span>
                </li>
                <li>
                  <span className={styles.liNum}>3</span>
                  <span>
                    For roles and permissions, select all. Recommended for
                    the breadth of use cases Ratio MCP supports. If not,
                    pick only the entities you want Claude to read.
                  </span>
                </li>
                <li>
                  <span className={styles.liNum}>4</span>
                  <span>
                    Open the app. Copy the{" "}
                    <span className={styles.codeChip}>LWA Client ID</span>{" "}
                    and{" "}
                    <span className={styles.codeChip}>
                      LWA Client Secret
                    </span>
                    . Click{" "}
                    <span className={styles.codeChip}>Authorize app</span>{" "}
                    to generate a{" "}
                    <span className={styles.codeChip}>Refresh Token</span>.
                    Copy that too.
                  </span>
                </li>
              </ol>

              <details className={styles.devAccountToggle}>
                <summary>
                  Don&apos;t have a developer account yet? Set one up
                  first.
                </summary>
                <ol className={styles.toggleList}>
                  <li>
                    Log into Seller Central with your main owner account.
                  </li>
                  <li>
                    Open{" "}
                    <span className={styles.codeChip}>
                      Apps and Services
                    </span>
                    {" → "}
                    <span className={styles.codeChip}>Develop Apps</span>{" "}
                    and register as a developer.
                  </li>
                  <li>
                    For developer type, choose{" "}
                    <span className={styles.codeChip}>
                      Private Developer
                    </span>{" "}
                    (apps for your own company). Accept the agreements
                    and submit.
                  </li>
                  <li>
                    Amazon reviews it. Usually a day or two. If they ask
                    follow-up questions, reply within 5 days or the case
                    closes. Once approved, come back to step 1 above.
                  </li>
                </ol>
              </details>

              <form
                className={styles.card}
                onSubmit={(e) => {
                  e.preventDefault();
                  /* Mock submit. Production app posts to its own backend. */
                }}
              >
                <label className={styles.field}>
                  <span className={styles.label}>LWA Client ID</span>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="amzn1.application-oa2-client.…"
                    value={amzClientId}
                    onChange={(e) => setAmzClientId(e.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>LWA Client Secret</span>
                  <div className={styles.secretWrap}>
                    <input
                      type={showAmzSecret ? "text" : "password"}
                      className={styles.input}
                      placeholder="amzn1.oa2-cs.v1.…"
                      value={amzClientSecret}
                      onChange={(e) => setAmzClientSecret(e.target.value)}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    <button
                      type="button"
                      className={styles.secretToggle}
                      onClick={() => setShowAmzSecret((s) => !s)}
                      aria-label={
                        showAmzSecret
                          ? "Hide LWA client secret"
                          : "Show LWA client secret"
                      }
                    >
                      <EyeIcon open={showAmzSecret} />
                    </button>
                  </div>
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Refresh Token</span>
                  <div className={styles.secretWrap}>
                    <input
                      type={showAmzRefresh ? "text" : "password"}
                      className={styles.input}
                      placeholder="Atzr|…"
                      value={amzRefreshToken}
                      onChange={(e) => setAmzRefreshToken(e.target.value)}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    <button
                      type="button"
                      className={styles.secretToggle}
                      onClick={() => setShowAmzRefresh((s) => !s)}
                      aria-label={
                        showAmzRefresh
                          ? "Hide refresh token"
                          : "Show refresh token"
                      }
                    >
                      <EyeIcon open={showAmzRefresh} />
                    </button>
                  </div>
                </label>

                <label className={styles.field}>
                  <span className={styles.labelRow}>
                    <span className={styles.label}>Merchant Token</span>
                    <span className={styles.optionalHint}>
                      Optional · enables Listings
                    </span>
                  </span>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="A1B2C3D4E5F6G7"
                    value={amzMerchantToken}
                    onChange={(e) => setAmzMerchantToken(e.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </label>

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={
                    !amzClientId ||
                    !amzClientSecret ||
                    !amzRefreshToken
                  }
                >
                  Connect Amazon
                </button>
                <p className={styles.cardHelper}>
                  We run a live LWA + orders check on submit and store
                  the secrets encrypted at rest.
                </p>
              </form>
            </div>
          </section>

          {/* ─── Step 3 — Connect Claude ─── */}
          <section className={styles.step}>
            <div className={styles.stepRail} aria-hidden="true">
              <span className={styles.stepBadge}>03</span>
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
              <span className={styles.stepBadge}>04</span>
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
