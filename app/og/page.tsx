import { UnicornShader } from "../../components/hero/unicorn-shader";
import styles from "./og.module.css";

/**
 * OG image preview (/og) — a 1200×630 panel that mirrors the hero's
 * shader + brand language, but centred with much larger type, no CTA,
 * and exact pixel dimensions. Screenshot this card to produce the
 * /public/og-image.png used by metadata in app/layout.tsx.
 */
export default function OgPreviewPage() {
  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.shaderLayer}>
          <UnicornShader project="hNoUYN2AHKFq4LxKJyNV" />
        </div>
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIconWrap} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/FLUpFZ3WewYoIhp88GA3QqCv9A.svg"
                alt=""
                width={14}
                height={14}
                className={styles.eyebrowIcon}
              />
            </span>
            <span className={styles.eyebrowText}>AI agents for AR</span>
          </div>

          <h1 className={styles.h1}>Your AI coworker to automate AR</h1>

          <p className={styles.sub}>
            AI agents that run collections, cash applications, deductions
            and disputes — end-to-end.
          </p>
        </div>
      </div>
    </main>
  );
}
