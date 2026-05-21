import type { ReactNode } from "react";
import { SiteNav } from "./site-nav";
import { SiteFooter } from "./site-footer";
import styles from "./legal-page.module.css";

/**
 * Shared shell for static legal pages (Terms of Use, Privacy Policy).
 * Reuses the exact same <SiteNav> and <SiteFooter> as the home page so the
 * header and footer stay identical across the site; each page passes its
 * own body (intro + sections) as children.
 */
export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main className={styles.main}>
        <article className={styles.article}>
          <p className={styles.updated}>{lastUpdated}</p>
          <h1 className={styles.h1}>{title}</h1>
          {children}
        </article>
        {/* Side rails — align with and join the footer's side borders. */}
        <div className={styles.rails} aria-hidden="true" />
      </main>
      <SiteFooter />
    </>
  );
}
