/**
 * Cookie / tracking consent — shared shape + localStorage helpers.
 *
 * Storage key is versioned so we can force re-consent if our cookie policy
 * materially changes. Bumping `STORAGE_KEY` to `ratio_consent_v2` will hide
 * the banner state and re-prompt every visitor.
 */
export type Consent = {
  v: 1;
  /** Pageviews, autocaptured clicks, custom events. PostHog cookies. */
  analytics: boolean;
  /** Session replay / screen recording. */
  recording: boolean;
  /** Epoch ms when the visitor saved this. */
  ts: number;
};

export const STORAGE_KEY = "ratio_consent_v1";
export const CONSENT_EVENT = "ratio:consent";
export const OPEN_BANNER_EVENT = "ratio:open-cookie-settings";

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (parsed && parsed.v === 1) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function writeConsent(next: Omit<Consent, "v" | "ts">) {
  if (typeof window === "undefined") return;
  const payload: Consent = {
    v: 1,
    analytics: next.analytics,
    recording: next.recording,
    ts: Date.now(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* localStorage can throw in private mode — ignore */
  }
  // Broadcast so PostHog (and anything else listening) can react in-flight
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: payload }));
}
