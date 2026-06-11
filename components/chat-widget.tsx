"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./chat-widget.module.css";

/**
 * ChatWidget — floating bottom-right bubble that opens a conversational
 * lead-capture panel. First message asks the visitor's name + email;
 * subsequent messages post straight to Slack via /api/chat.
 *
 * Port of the original tally-site ChatWidget (commit c4cddfc) re-skinned
 * into the Ratio dark design system (dark surface, white text, 1px
 * white-alpha hairlines, monospace timestamps removed). Tailwind classes
 * from the original are replaced with CSS modules so this component
 * doesn't depend on a Tailwind config that the rebuilt ratio-website
 * doesn't ship.
 */

const STORAGE_KEY = "ratio_chat_user";
const AVATAR_SRC = "/abdul-ahadh.jpg";
const HOST_NAME = "Abdul Ahadh";
const HOST_INITIALS = "AA";

const BOT_DETAIL_REQUEST =
  "I'll get back to you in the next 30 mins. Meanwhile, could you share your name and email so I know who to follow up with?";
const BOT_NEED_EMAIL =
  "I didn't catch an email there. Could you share your name and email so I can follow up?";
const BOT_THANK_YOU =
  "Thanks. I've shared your details with the team. We'll be in touch shortly.";
const BOT_ACK_RETURNING = "Got it. I'll get back to you within 30 mins.";

/* Proactive greeting — surfaced once per session as a teaser above the
   bubble, and seeded as the first messages when the panel opens. Intro +
   soft invite to talk, in the host's voice. */
const GREETING_1 = "Hey, I'm Ahadh, co-founder of Ratio 👋";
const GREETING_2 =
  "Got questions about recovering your retail deductions? I'm right here, or happy to jump on a quick call.";
const TEASER_SEEN_KEY = "ratio_chat_teaser_seen";
const TEASER_DELAY_MS = 4000;

const EMAIL_RE = /[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}/;

type Role = "user" | "bot";
interface Message {
  role: Role;
  content: string;
}
interface SavedUser {
  name: string;
  email: string;
}

function extractContact(text: string): { name?: string; email?: string } {
  const m = text.match(EMAIL_RE);
  const email = m?.[0];
  if (!email) return {};
  const name = text
    .replace(email, "")
    .replace(/[,;|:\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return { email, name: name || undefined };
}

function Avatar({ size }: { size: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span
        aria-hidden="true"
        className={styles.avatarFallback}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {HOST_INITIALS}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={AVATAR_SRC}
      alt=""
      onError={() => setFailed(true)}
      className={styles.avatarImg}
      style={{ width: size, height: size }}
    />
  );
}

const POST_USER_PAUSE_MS = 220;
const TYPING_DURATION_MS = 950;
const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [awaitingDetails, setAwaitingDetails] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedUser, setSavedUser] = useState<SavedUser | null>(null);
  // Teaser reveal sequence: hidden → first bubble → typing dots → second
  // bubble. Each surfaced bubble plays a pop, mirroring the in-panel flow.
  const [teaserStage, setTeaserStage] = useState<
    "hidden" | "m1" | "typing" | "m2"
  >("hidden");
  const firstQueryRef = useRef<string>("");
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const openRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      setSavedUser(JSON.parse(raw) as SavedUser);
    } catch {
      /* ignore */
    }
  }, []);

  // Keep a ref of `open` so the (run-once) teaser timer can read the
  // latest value without re-subscribing.
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Pre-create + unlock an AudioContext on the first user gesture, so the
  // notification pop can actually sound when the teaser appears (browsers
  // block audio until a gesture has occurred).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return;
    const unlock = () => {
      if (!audioCtxRef.current) audioCtxRef.current = new AC();
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {});
      }
    };
    const opts: AddEventListenerOptions = { once: true };
    window.addEventListener("pointerdown", unlock, opts);
    window.addEventListener("keydown", unlock, opts);
    window.addEventListener("touchstart", unlock, opts);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  // Proactive teaser — once per browser session, a few seconds after the
  // visitor lands: surface the first greeting bubble just above the bubble
  // (without opening the panel) and play a soft pop.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(TEASER_SEEN_KEY)) return;
    const t = setTimeout(() => {
      window.sessionStorage.setItem(TEASER_SEEN_KEY, "1");
      if (openRef.current) return; // already chatting — don't interrupt
      setTeaserStage("m1");
      playPop();
    }, TEASER_DELAY_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reveal chain: after the first bubble, show a brief "typing" beat, then
  // the second bubble (with its own pop). Each step's timer is torn down if
  // the stage changes (e.g. the visitor opens or dismisses the teaser).
  useEffect(() => {
    if (teaserStage === "m1") {
      const t = setTimeout(() => setTeaserStage("typing"), 1100);
      return () => clearTimeout(t);
    }
    if (teaserStage === "typing") {
      const t = setTimeout(() => {
        setTeaserStage("m2");
        playPop();
      }, 950);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teaserStage]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => composerRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  async function postToSlack(payload: {
    name: string;
    email: string;
    conversation: Message[];
    path: string;
  }) {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Submit failed");
  }

  // Soft "pop" — a short sine blip with a quick pitch drop and fast decay,
  // synthesised so there's no audio asset to ship. No-op (silent) if the
  // browser hasn't unlocked audio via a gesture yet.
  function playPop() {
    if (typeof window === "undefined") return;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return;
    if (!audioCtxRef.current) audioCtxRef.current = new AC();
    const ctx = audioCtxRef.current;
    const fire = () => {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(540, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.12);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.16, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.22);
    };
    if (ctx.state === "suspended") ctx.resume().then(fire).catch(() => {});
    else fire();
  }

  // Open the panel, dismiss the teaser, and (only on a fresh, un-captured
  // conversation) seed the greeting so the panel opens with the same intro
  // the teaser showed.
  function openChat() {
    setTeaserStage("hidden");
    setOpen(true);
    setMessages((m) =>
      m.length === 0 && !savedUser
        ? [
            { role: "bot", content: GREETING_1 },
            { role: "bot", content: GREETING_2 },
          ]
        : m
    );
  }

  async function sayBot(content: string, typingMs = TYPING_DURATION_MS) {
    await delay(POST_USER_PAUSE_MS);
    setIsTyping(true);
    await delay(typingMs);
    setIsTyping(false);
    setMessages((m) => [...m, { role: "bot", content }]);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || isTyping) return;
    const trimmed = text.trim();
    if (!trimmed) return;

    setError(null);
    const userMsg: Message = { role: "user", content: trimmed };
    setText("");
    setMessages((m) => [...m, userMsg]);

    if (savedUser) {
      setSubmitting(true);
      try {
        const postPromise = postToSlack({
          name: savedUser.name,
          email: savedUser.email,
          conversation: [userMsg],
          path: window.location.pathname,
        });
        await delay(POST_USER_PAUSE_MS);
        setIsTyping(true);
        await Promise.all([postPromise, delay(TYPING_DURATION_MS)]);
        setIsTyping(false);
        setMessages((m) => [
          ...m,
          { role: "bot", content: BOT_ACK_RETURNING },
        ]);
      } catch {
        setIsTyping(false);
        setError("Couldn't send. Try again, or email hello@tryratio.io.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (!awaitingDetails) {
      firstQueryRef.current = trimmed;
      setAwaitingDetails(true);
      await sayBot(BOT_DETAIL_REQUEST);
      return;
    }

    const { name, email } = extractContact(trimmed);
    if (!email) {
      await sayBot(BOT_NEED_EMAIL, 800);
      return;
    }

    const resolvedName = name || "—";
    setSubmitting(true);
    try {
      const postPromise = postToSlack({
        name: resolvedName,
        email,
        conversation: [
          { role: "user", content: firstQueryRef.current },
          { role: "bot", content: BOT_DETAIL_REQUEST },
          userMsg,
        ],
        path: window.location.pathname,
      });
      await delay(POST_USER_PAUSE_MS);
      setIsTyping(true);
      await Promise.all([postPromise, delay(TYPING_DURATION_MS)]);
      setIsTyping(false);
      const u: SavedUser = { name: resolvedName, email };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      setSavedUser(u);
      setAwaitingDetails(false);
      setMessages((m) => [...m, { role: "bot", content: BOT_THANK_YOU }]);
    } catch {
      setIsTyping(false);
      setError("Couldn't send to the team. Try again, or email hello@tryratio.io.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Floating bubble — desktop only. */}
      <div className={styles.bubbleWrap}>
        {/* Proactive greeting teaser — two message bubbles that reveal in
            sequence (first → typing → second) above the bubble. Does not
            open the panel; clicking a bubble opens the chat. */}
        <AnimatePresence>
          {!open && teaserStage !== "hidden" && (
            <motion.div
              key="teaserStack"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              className={styles.teaserStack}
            >
              <button
                type="button"
                aria-label="Dismiss"
                onClick={(e) => {
                  e.stopPropagation();
                  setTeaserStage("hidden");
                }}
                className={styles.teaserClose}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                <motion.div
                  key="m1"
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 520, damping: 26, mass: 0.7 }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open chat with ${HOST_NAME}`}
                  onClick={openChat}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openChat();
                    }
                  }}
                  className={styles.teaserMsg}
                >
                  <p className={styles.teaserText}>{GREETING_1}</p>
                </motion.div>

                {teaserStage === "typing" && (
                  <motion.div
                    key="typing"
                    layout
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
                    transition={{ type: "spring", stiffness: 520, damping: 26, mass: 0.7 }}
                    className={`${styles.teaserMsg} ${styles.teaserTyping}`}
                    aria-hidden="true"
                  >
                    <span className={styles.typingDots}>
                      <span className={styles.dot} />
                      <span
                        className={styles.dot}
                        style={{ animationDelay: "0.15s" }}
                      />
                      <span
                        className={styles.dot}
                        style={{ animationDelay: "0.3s" }}
                      />
                    </span>
                  </motion.div>
                )}

                {teaserStage === "m2" && (
                  <motion.div
                    key="m2"
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 520, damping: 26, mass: 0.7 }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open chat with ${HOST_NAME}`}
                    onClick={openChat}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openChat();
                      }
                    }}
                    className={styles.teaserMsg}
                  >
                    <p className={styles.teaserText}>{GREETING_2}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {!open && teaserStage === "hidden" && (
          <span aria-hidden="true" className={styles.bubbleTooltip}>
            <span className={styles.tooltipNameRow}>
              <span className={styles.tooltipName}>{HOST_NAME}</span>
              <span className={styles.tooltipDot} />
            </span>
            <span className={styles.tooltipTitle}>
              Co-founder and CEO, Ratio
            </span>
          </span>
        )}
        <button
          type="button"
          onClick={() => (open ? setOpen(false) : openChat())}
          aria-label={open ? "Close chat" : `Open chat with ${HOST_NAME}`}
          className={styles.bubble}
        >
          <span className={styles.bubbleAvatarWrap}>
            <Avatar size={56} />
            <span aria-hidden="true" className={styles.bubbleOnline} />
          </span>
        </button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label={`Chat with ${HOST_NAME}`}
            className={styles.panel}
          >
            <div className={styles.header}>
              <span className={styles.headerAvatarWrap}>
                <Avatar size={40} />
                <span aria-hidden="true" className={styles.headerOnline} />
              </span>
              <div className={styles.headerText}>
                <p className={styles.headerName}>{HOST_NAME}</p>
                <p className={styles.headerStatus}>
                  Typically replies within 30 mins
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className={styles.closeBtn}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div ref={scrollRef} className={styles.scroll}>
              <AnimatePresence initial={false}>
                {messages.map((m, i) =>
                  m.role === "user" ? (
                    <motion.div
                      key={`m-${i}`}
                      layout="position"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.22,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={styles.userRow}
                    >
                      <div className={styles.userBubble}>
                        <p className={styles.msgText}>{m.content}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`m-${i}`}
                      layout="position"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.22,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={styles.botRow}
                    >
                      <span className={styles.botAvatar}>
                        <Avatar size={26} />
                      </span>
                      <div className={styles.botBubble}>
                        <p className={styles.msgText}>{m.content}</p>
                      </div>
                    </motion.div>
                  )
                )}
                {isTyping && (
                  <motion.div
                    key="typing"
                    layout="position"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={styles.botRow}
                  >
                    <span className={styles.botAvatar}>
                      <Avatar size={26} />
                    </span>
                    <div className={styles.typingBubble}>
                      <span className={styles.typingDots}>
                        <span className={styles.dot} />
                        <span
                          className={styles.dot}
                          style={{ animationDelay: "0.15s" }}
                        />
                        <span
                          className={styles.dot}
                          style={{ animationDelay: "0.3s" }}
                        />
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <form onSubmit={handleSend} className={styles.composer}>
              {messages.length === 0 && !savedUser && (
                <p className={styles.composerHint}>
                  Send a message to start a conversation.
                </p>
              )}
              <div className={styles.composerRow}>
                <textarea
                  ref={composerRef}
                  placeholder={
                    awaitingDetails
                      ? "Type your name and email…"
                      : "Type your message…"
                  }
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e as unknown as React.FormEvent);
                    }
                  }}
                  className={styles.composerInput}
                  rows={2}
                  required
                />
                <button
                  type="submit"
                  disabled={submitting || isTyping || !text.trim()}
                  className={styles.sendBtn}
                  aria-label="Send message"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
              {error && <p className={styles.errorText}>{error}</p>}
              {savedUser && messages.length === 0 && (
                <p className={styles.savedNote}>
                  Sending as{" "}
                  <span className={styles.savedEmail}>{savedUser.email}</span>{" "}
                  ·{" "}
                  <button
                    type="button"
                    onClick={() => {
                      window.localStorage.removeItem(STORAGE_KEY);
                      setSavedUser(null);
                    }}
                    className={styles.notYouBtn}
                  >
                    not you?
                  </button>
                </p>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
