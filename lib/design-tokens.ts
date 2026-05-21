/**
 * Authoritative design tokens extracted from the live 8098 page after
 * runAll() rebrand completes. These are the *exact* computed values Framer
 * is using. Match against these — do not invent variants.
 *
 * Captured @ 1440px desktop. Mobile/tablet variants must be probed
 * separately when those breakpoints are built.
 */

export const colors = {
  // Framer token IDs preserved as comments for traceability.
  bg: "#0d0e11", //  --token-63b9b9c3-6ac1-43be-8c1c-18c159200f8c
  bgElev: "#16181c", //  --token-4f3f52cd-44e1-4afc-8206-902d4c764b34
  bgDark1a: "#1a1a1a", //  --token-e2cc9733-91c8-4739-82da-332628439f30
  bgGlass: "#191b20cc", //  --token-9a168a8f-c425-43fb-95e1-13fcc2cf3d3b — 80% over bg
  trustedByBg: "#010101", // measured on #trusted-by

  fg: "#e6e6e6", //  --token-5f9b3b25-7191-4ac0-a0db-16d00027605c — H2 body off-white
  fgBright: "#ffffff", //  --token-382b681b-f39b-4faf-bf00-ab1dc35f01c3 — Hero H1
  fgMuted: "#a6a6a6", //  --token-7d0fe029-e356-45c2-a323-29ae1d8fcc6a — subtext
  fgDim: "#999999", // measured on nav anchors
  fgInk: "#010101", //  --token-02384985-0d8b-49a1-b856-8e3e1646cee3
  fgDeep: "#333", //  --token-d5a2b3dd-5036-42e5-9ee3-ac286960a60a

  accentBlue: "#2cc6ff", //  --token-b12d61e9-407a-4814-af44-384c4aa42e13 — eyebrows
  accentBlueDeep: "#024380", //  --token-ff8328b8-4f76-4ce0-b388-5ebc69bb64bd
  accentRed: "#e45862", //  --token-110b4a39-65f0-4c5c-9b83-f9a0cc51aef5

  borderFaint: "#b2b2b229", //  --token-00066877 (16% white)
} as const;

export const fonts = {
  // Framer loads Geist + Gelasio via Google Fonts. The "Placeholder" entries
  // are Framer's fallback names while remote fonts load — keep both in the
  // stack for layout parity.
  sans: 'var(--font-geist-sans), Geist, "Geist Placeholder", system-ui, sans-serif',
  serif: 'var(--font-gelasio), Gelasio, "Gelasio Placeholder", Georgia, serif',
} as const;

/**
 * Typography presets — each entry is the *exact* computed style of that
 * element on the live 8098 page @ 1440px desktop. Use these verbatim.
 */
export const type = {
  // Hero <h1> — "Your AI coworker to automate AR"
  heroH1: {
    fontFamily: fonts.serif,
    fontSize: "56px",
    fontWeight: 400,
    lineHeight: "64px",
    letterSpacing: "-2.8px",
    color: colors.fgBright,
  },
  // Hero <p> — subtitle below the H1
  heroSubtext: {
    fontFamily: fonts.sans,
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "21px",
    letterSpacing: "-0.14px",
    color: colors.fgMuted,
  },
  // Nav links (PRODUCT / ROI / INTEGRATIONS / FAQ)
  navLink: {
    fontFamily: fonts.sans,
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "21px",
    letterSpacing: "-0.14px",
    color: colors.fgDim,
  },
  // "PRODUCT" / "ROI" / "INTEGRATIONS" style eyebrow above section headings
  eyebrow: {
    fontFamily: fonts.sans,
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "14px",
    letterSpacing: "0.42px", // ~0.03em for uppercase
    color: colors.accentBlue,
    textTransform: "uppercase" as const,
  },
  // Section H2 — used on Product/ROI sections
  sectionH2: {
    fontFamily: fonts.serif,
    fontSize: "40px",
    fontWeight: 400,
    lineHeight: "60px",
    letterSpacing: "-2px",
    color: colors.fg,
  },
  // Larger section H2 — used on the Integrations section (our custom)
  sectionH2Large: {
    fontFamily: fonts.serif,
    fontSize: "56px",
    fontWeight: 500,
    lineHeight: "61.6px",
    letterSpacing: "-1.12px",
    color: colors.fg,
  },
  // Standard 16px body paragraph
  body: {
    fontFamily: fonts.sans,
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "normal",
    color: colors.fgMuted,
  },
} as const;

/**
 * Layout measurements from each section @ 1440px desktop.
 */
export const layout = {
  // Outer gutter — most sections inset 120px left/right.
  sectionPadX: "120px",
  // Hero is full-bleed (no horizontal padding) with internal alignment.
  // Trusted-by strip is also full-bleed.
  // Section heights (for visual-diff sanity):
  heightHero: 900,
  heightTrustedBy: 112,
  heightHowItWorks: 2781, // includes sticky scroll
  heightProblem: 875,
  heightIntegrations: 448,
  heightCta: 746,
} as const;

export const tokens = { colors, fonts, type, layout };
export default tokens;
