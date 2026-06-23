"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./mcp-cycling-headline.module.css";

/**
 * Two-track cycling headline for the /mcp hero:
 *
 *   Turn {AI} into your AI {Store} employee.
 *
 * Design goals (and how they're met):
 *
 * 1. The surrounding headline text must NOT shift when a placeholder
 *    word changes length ("Claude" 6ch ↔ "ChatGPT" 7ch). Each slot
 *    renders an invisible "sizer" containing EVERY option stacked in
 *    the same CSS grid cell, so the slot's box is permanently as wide
 *    as the widest option. The animated word is layered on top with
 *    position:absolute, so swapping it never triggers reflow. The words
 *    after the slot stay perfectly still.
 *
 * 2. The swap must feel premium, not like a value being pasted in.
 *    Each word enters with a blur-in + rise + fade on a spring, and the
 *    outgoing word blurs-out + rises + fades. Because the two are
 *    absolutely stacked they cross-dissolve rather than hard-cut. Spring
 *    physics (not a fixed-duration tween) give the motion natural
 *    acceleration / settle.
 *
 * 3. Respects prefers-reduced-motion: falls back to a plain opacity
 *    cross-fade with no blur or movement.
 */

type BrandOption = {
  name: string;
  Logo: () => React.ReactElement;
};

/* Walmart spark — the 6-petal radial mark. */
const WalmartLogo = () => (
  <svg
    viewBox="-149 631 41 36"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M-128.67 643.868c.758 0 1.415-.404 1.466-.9l.758-8.54c0-.86-1-1.516-2.224-1.516-1.263 0-2.224.708-2.224 1.516l.758 8.54c.05.505.708.9 1.466.9m-4.65 2.68c.404-.657.354-1.415-.05-1.718l-7.025-4.902c-.708-.404-1.82.1-2.426 1.162s-.505 2.274.202 2.678l7.783 3.64c.505.152 1.162-.202 1.516-.86m9.25-.001c.404.657 1.06 1 1.516.8l7.783-3.64c.708-.404.86-1.617.202-2.678-.606-1.06-1.718-1.567-2.426-1.162l-7.025 4.902c-.404.354-.455 1.112-.05 1.77m-4.6 7.983c.758 0 1.415.404 1.466.9l.758 8.54c0 .86-1 1.516-2.224 1.516-1.263 0-2.224-.708-2.224-1.516l.758-8.54c.05-.505.708-.9 1.466-.9m4.6-2.67c.404-.657 1.06-1 1.516-.8l7.783 3.588c.708.404.86 1.617.202 2.678-.606 1.06-1.718 1.567-2.426 1.162l-7.025-4.902c-.404-.303-.455-1.06-.05-1.718m-9.25.002c.404.657.354 1.415-.05 1.718l-7.025 4.902c-.708.404-1.82-.1-2.426-1.162s-.505-2.274.202-2.678l7.783-3.588c.505-.202 1.162.152 1.516.8"
      fill="currentColor"
    />
  </svg>
);

/* Amazon smile + arrow — stylised inline glyph that reads as Amazon
 * when paired with the "Amazon" wordmark right after it. */
const AmazonLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M2.5 11.5 Q12 19.5 21 12"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M17 9.5 L21 12 L18.5 16.2"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

/* Claude logomark — Anthropic's official single-path glyph. */
const ClaudeLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </svg>
);

/* ChatGPT mark — OpenAI knot. */
const ChatGptLogo = () => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-0.171 0.482 41.142 40.034"
    aria-hidden="true"
  >
    <path
      d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z"
      fill="currentColor"
    />
  </svg>
);

const AI_OPTIONS: BrandOption[] = [
  { name: "Claude", Logo: ClaudeLogo },
  { name: "ChatGPT", Logo: ChatGptLogo },
];

const STORE_OPTIONS: BrandOption[] = [
  { name: "Walmart", Logo: WalmartLogo },
  { name: "Amazon", Logo: AmazonLogo },
];

const CYCLE_MS = 3000; // each word stays settled this long
const STORE_OFFSET_MS = 1500; // half a beat so the two slots alternate

/* Brand chip — logo + wordmark. Used by both the sizer and the rolling
   word so they render identically. */
function BrandWord({ option }: { option: BrandOption }) {
  const { Logo } = option;
  return (
    <span className={styles.brand}>
      <Logo />
      {option.name}
    </span>
  );
}

/* True odometer roll — NO overlap, NO opacity fade.
   The incoming word rolls in from y:100% (just below the clip window)
   to y:0; the outgoing word rolls from y:0 to y:-100% (just above).
   Both use the SAME duration + SAME easing, so at every frame their
   positions are exactly complementary: the outgoing word fills the top
   slice of the window while the incoming fills the bottom slice — they
   tile and hand off at the window's mid-line, never occupying the same
   pixels. The vertical clip-path (see CSS) hides whatever is outside the
   line. Opacity stays 1 throughout: any fade would make both words
   semi-transparent in the same region, which reads as the "overlap /
   ghosting" we're eliminating.
   100% == the word's own line height (≈ the window height), so the
   hand-off lands exactly at the window edges. */
const ROLL_DURATION = 0.62;
const ROLL_EASE = [0.65, 0, 0.35, 1] as const; // easeInOutCubic — decisive + smooth

const ROLL_VARIANTS = {
  initial: { y: "100%" },
  animate: {
    y: "0%",
    transition: { duration: ROLL_DURATION, ease: ROLL_EASE },
  },
  exit: {
    y: "-100%",
    transition: { duration: ROLL_DURATION, ease: ROLL_EASE },
  },
};

/* Reduced motion: a plain crossfade is acceptable (movement is what
   reduced-motion users want suppressed). */
const REDUCED_ROLL = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

/**
 * One cycling word, driven by a WALL-CLOCK metronome.
 *
 * The visible option is derived purely from the current time:
 *   index = floor((Date.now() + offsetMs) / CYCLE_MS) % options.length
 *
 * Nothing accumulates ticks, so the animation is completely independent
 * of whether the tab is focused. Background the tab (where browsers
 * throttle timers) and return — the next tick reads the clock and snaps
 * straight to the correct word. A visibilitychange listener resyncs the
 * instant the tab is shown again.
 *
 * The lane is FIXED to the widest option's width (via an invisible grid
 * sizer) and the word is centered in it. That means every swap is an
 * identical, symmetric vertical roll — no width choreography, no
 * direction-dependent timing, no overlap, and far less code.
 */
function CyclingWord({
  options,
  offsetMs = 0,
}: {
  options: BrandOption[];
  /* Phase offset so the two slots don't swap on the same beat. */
  offsetMs?: number;
}) {
  const reduce = useReducedMotion();
  // Start at 0 for a deterministic SSR / first-paint render; the clock
  // takes over on mount (avoids a hydration mismatch from Date.now()).
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const len = options.length;

    function tick() {
      const now = Date.now() + offsetMs;
      setIndex(Math.floor(now / CYCLE_MS) % len);
      // Schedule the next swap at the exact next clock boundary, so the
      // metronome never drifts even if a tick fired slightly late.
      timer = setTimeout(tick, CYCLE_MS - (now % CYCLE_MS));
    }
    tick();

    // Re-read the clock the moment the tab becomes visible again, in case
    // background throttling delayed the pending timeout.
    function onVisible() {
      if (!document.hidden) {
        clearTimeout(timer);
        tick();
      }
    }
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [options, offsetMs]);

  const current = options[index];

  return (
    <span className={styles.slot}>
      {/* Sizer — every option stacked in one grid cell, hidden but in
          flow. Locks the lane to the WIDEST option's width + tallest
          height, and supplies a STABLE baseline (the logos are
          align-self:center in CSS, so the chip baseline equals the text
          baseline regardless of which option is showing). Nothing here
          animates, so the surrounding headline text never moves. */}
      <span className={styles.sizer} aria-hidden="true">
        {options.map((o) => (
          <span key={o.name} className={styles.sizerItem}>
            <BrandWord option={o} />
          </span>
        ))}
      </span>

      {/* Animated layer — vertical-clip mask, word centered in the fixed
          lane so the reserved space splits symmetrically. */}
      <span className={styles.animLayer}>
        <AnimatePresence initial={false} mode="sync">
          <motion.span
            key={current.name}
            className={styles.animWord}
            variants={reduce ? REDUCED_ROLL : ROLL_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <BrandWord option={current} />
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

export function MCPCyclingHeadline() {
  return (
    <>
      Turn <CyclingWord options={AI_OPTIONS} />{" "}
      {/* Mobile-only line breaks force the 3-line shape:
            Turn {AI}
            into your AI
            {Store} employee
          On desktop these <br>s are display:none, so the headline wraps
          naturally (2 lines) as before. */}
      <br className={styles.mobileBreak} />
      into your AI{" "}
      <br className={styles.mobileBreak} />
      <CyclingWord options={STORE_OPTIONS} offsetMs={STORE_OFFSET_MS} />{" "}
      employee.
    </>
  );
}
