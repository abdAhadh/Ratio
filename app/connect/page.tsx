import Link from "next/link";
import styles from "./connect.module.css";

/**
 * /connect — credential-setup guide we link from outreach emails instead
 * of pasting all the steps inline. Designed to be served at a Ratio
 * subdomain (e.g. connect.tryratio.io). Reuses the site design system.
 *
 * The Ratio logo links to /mcp (the MCP connector page), not the home
 * page, since this flow belongs to the MCP product.
 */
export const metadata = {
  title: "Connect your Amazon account · Ratio",
  description:
    "Generate read-only Amazon SP-API credentials in your own Seller Central and send them to Ratio.",
};

export default function ConnectPage() {
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <Link href="/mcp" className={styles.logo} aria-label="Ratio MCP">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/aRncskdNBejcpieS2y5kWdyd9Vw.svg"
              alt=""
              aria-hidden="true"
              className={styles.logoIcon}
            />
            <span className={styles.logoText}>Ratio</span>
          </Link>
        </header>

        <h1 className={styles.h1}>Connect your Amazon account</h1>
        <p className={styles.sub}>
          Generate read-only API credentials inside your own Seller Central
          and send them over. We never get your login, and you can revoke
          access anytime.
        </p>

        <div className={styles.console}>
          <p className={styles.consoleLabel}>Open the Seller Central Developer Console</p>
          <a
            className={styles.consoleLink}
            href="https://sellercentral.amazon.com/sellingpartner/developerconsole"
            target="_blank"
            rel="noreferrer"
          >
            <b>US</b> https://sellercentral.amazon.com/sellingpartner/developerconsole
          </a>
          <a
            className={styles.consoleLink}
            href="https://sellercentral.amazon.co.jp/sellingpartner/developerconsole"
            target="_blank"
            rel="noreferrer"
          >
            <b>Japan</b> https://sellercentral.amazon.co.jp/sellingpartner/developerconsole
          </a>
          <p className={styles.consoleAlt}>
            Or sign in to Seller Central and open Apps and Services → Develop
            Apps.
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            If you are already a registered Private Developer
          </h2>
          <div className={styles.step}>
            <span className={styles.num}>1</span>
            <p className={styles.stepText}>
              Click <span className={styles.chip}>Add new app client</span>, set
              type to <span className={styles.chip}>Sellers</span>, and name it{" "}
              <span className={styles.chip}>Ratio Connector</span>.
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.num}>2</span>
            <p className={styles.stepText}>
              For roles, select all of them (Inventory and Order Tracking,
              Finance and Accounting, Pricing, Product Listing, Selling Partner
              Insights, and the rest) so Ratio can read across your account.
              Ratio only ever performs read operations and never writes.
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.num}>3</span>
            <p className={styles.stepText}>
              Open the app, copy the{" "}
              <span className={styles.chip}>LWA Client ID</span> and{" "}
              <span className={styles.chip}>LWA Client Secret</span>, then click{" "}
              <span className={styles.chip}>Authorize app</span> to generate a{" "}
              <span className={styles.chip}>Refresh Token</span>.
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.num}>4</span>
            <p className={styles.stepText}>
              Grab your Merchant Token under Settings → Account Info → Business
              Information → Your Merchant Token.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>If you are not registered yet</h2>
          <div className={styles.step}>
            <span className={styles.num}>1</span>
            <p className={styles.stepText}>
              In the console above, register as a{" "}
              <span className={styles.chip}>Private Developer</span> and submit.
              Amazon usually approves within a day or two.
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.num}>2</span>
            <p className={styles.stepText}>
              Once approved, follow the four steps above.
            </p>
          </div>
        </section>

        <div className={styles.creds}>
          <p className={styles.credsLabel}>Then send us these four:</p>
          <ul className={styles.credsList}>
            <li>LWA Client ID</li>
            <li>LWA Client Secret</li>
            <li>Refresh Token</li>
            <li>Merchant Token</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
