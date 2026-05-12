"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "ratio_chat_user";
const AVATAR_SRC = "/abdul-ahadh.jpg";
const HOST_NAME = "Abdul Ahadh";
const HOST_INITIALS = "AA";

const BOT_DETAIL_REQUEST =
  "I'll get back to you in the next 30 mins. Meanwhile, could you help me with your Name and Email ID in the chat?";
const BOT_NEED_EMAIL =
  "I didn't catch an email in that — could you share your name and email so I can follow up?";
const BOT_THANK_YOU =
  "Thanks! I've shared your details with the team. We'll be in touch shortly.";
const BOT_ACK_RETURNING = "Got it — I'll get back to you within 30 mins.";

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

/**
 * Pulls an email out of a free-form reply and treats whatever's left as the
 * name. Handles "John Doe, john@x.com", "john@x.com - John", "John\njohn@x.com"
 * and most other natural variants.
 */
function extractContact(text: string): { name?: string; email?: string } {
  const emailMatch = text.match(EMAIL_RE);
  const email = emailMatch?.[0];
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
        className="rounded-full flex items-center justify-center font-semibold shrink-0"
        style={{
          width: size,
          height: size,
          background: "#1A1A2E",
          color: "#FBF7F1",
          fontSize: size * 0.4,
        }}
      >
        {HOST_INITIALS}
      </span>
    );
  }
  return (
    <img
      src={AVATAR_SRC}
      alt=""
      onError={() => setFailed(true)}
      className="rounded-full object-cover shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [awaitingDetails, setAwaitingDetails] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedUser, setSavedUser] = useState<SavedUser | null>(null);
  const firstQueryRef = useRef<string>("");
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore saved contact info
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

  // Focus composer on open
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => composerRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Scroll to bottom on new messages or while typing
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

  // Timing for the bot reply animation. Chosen to feel like a real person
  // is typing — long enough that the reply doesn't beat the user's own
  // message bubble onto the screen, short enough that nobody waits.
  const POST_USER_PAUSE_MS = 220;      // beat after user message before typing
  const TYPING_DURATION_MS = 950;      // how long the typing dots show

  function delay(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  /** Show typing dots, wait, then push a bot message. */
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

    // Always render the user's bubble first.
    setMessages((m) => [...m, userMsg]);

    // RETURNING VISITOR — POST quietly, then bot ack.
    if (savedUser) {
      setSubmitting(true);
      try {
        const postPromise = postToSlack({
          name: savedUser.name,
          email: savedUser.email,
          conversation: [userMsg],
          path: window.location.pathname,
        });
        // Start the typing animation in parallel with the POST so it
        // feels responsive even on slow networks.
        await delay(POST_USER_PAUSE_MS);
        setIsTyping(true);
        await Promise.all([postPromise, delay(TYPING_DURATION_MS)]);
        setIsTyping(false);
        setMessages((m) => [...m, { role: "bot", content: BOT_ACK_RETURNING }]);
      } catch {
        setIsTyping(false);
        setError("Couldn't send. Try again, or email hello@tryratio.io.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // FIRST-TIME — first message: ack + ask for details (no network call).
    if (!awaitingDetails) {
      firstQueryRef.current = trimmed;
      setAwaitingDetails(true);
      await sayBot(BOT_DETAIL_REQUEST);
      return;
    }

    // FIRST-TIME — follow-up: should contain name + email.
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
      {/* Floating button + hover tooltip — desktop only (hidden below md). */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] group hidden md:block">
        {/* Hover tooltip — slides in from the right of the button on hover, hidden when the panel is open */}
        {!open && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-[opacity,transform] duration-200 ease-out whitespace-nowrap bg-navy text-white text-sm font-medium pl-3.5 pr-3 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.18)] flex items-center gap-2"
          >
            {HOST_NAME}
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#22C55E" }}
            />
          </span>
        )}

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close chat" : `Open chat with ${HOST_NAME}`}
          className="w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.22)] transition-all duration-200 ease-out hover:scale-[1.06] active:scale-100"
        >
          <span className="relative block w-full h-full">
            <Avatar size={56} />
            {/* Online dot */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full"
              style={{
                background: "#16A34A",
                boxShadow: "0 0 0 2.5px #FBF7F1",
              }}
            />
          </span>
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label={`Chat with ${HOST_NAME}`}
          className="fixed bottom-24 right-5 sm:right-6 z-[60] w-[360px] max-w-[calc(100vw-2.5rem)] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-border overflow-hidden hidden md:flex flex-col"
          style={{
            height: 540,
            maxHeight: "calc(100vh - 7rem)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 bg-navy text-white">
            <span className="relative shrink-0">
              <Avatar size={40} />
              <span
                aria-hidden="true"
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full"
                style={{
                  background: "#22C55E",
                  boxShadow: "0 0 0 2px #1A1A2E",
                }}
              />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight">{HOST_NAME}</p>
              <p className="text-[11px] text-white/60 mt-0.5 leading-tight">
                Typically replies within 30 mins
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/60 hover:text-white p-1 -m-1"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ background: "rgba(251, 247, 241, 0.5)" }}
          >
            <AnimatePresence initial={false}>
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <motion.div
                    key={`msg-${i}`}
                    layout="position"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-end"
                  >
                    <div className="bg-navy text-white rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[80%]">
                      <p className="text-sm leading-snug whitespace-pre-wrap">
                        {m.content}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`msg-${i}`}
                    layout="position"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-2"
                  >
                    <span className="mt-0.5">
                      <Avatar size={28} />
                    </span>
                    <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[80%]">
                      <p className="text-sm leading-snug text-navy whitespace-pre-wrap">
                        {m.content}
                      </p>
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
                  className="flex gap-2"
                >
                  <span className="mt-0.5">
                    <Avatar size={28} />
                  </span>
                  <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-3.5 py-3">
                    <span className="inline-flex gap-1 items-center">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-text-secondary opacity-60"
                        style={{
                          animation: "chatDot 1.2s ease-in-out infinite",
                        }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-text-secondary opacity-60"
                        style={{
                          animation: "chatDot 1.2s ease-in-out infinite",
                          animationDelay: "0.15s",
                        }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-text-secondary opacity-60"
                        style={{
                          animation: "chatDot 1.2s ease-in-out infinite",
                          animationDelay: "0.3s",
                        }}
                      />
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <style jsx>{`
              @keyframes chatDot {
                0%, 60%, 100% {
                  transform: translateY(0);
                  opacity: 0.4;
                }
                30% {
                  transform: translateY(-3px);
                  opacity: 0.9;
                }
              }
            `}</style>
          </div>

          {/* Composer */}
          <form
            onSubmit={handleSend}
            className="border-t border-border p-3 bg-white"
          >
            {messages.length === 0 && !savedUser && (
              <p className="text-xs text-text-secondary text-center mb-2">
                Send a message to start a conversation.
              </p>
            )}
            <div className="flex items-end gap-2">
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
                className="flex-1 text-sm px-3 py-2 rounded-lg border border-border focus:outline-none focus:border-navy resize-none text-navy placeholder:text-text-secondary"
                rows={2}
                required
              />
              <button
                type="submit"
                disabled={submitting || isTyping || !text.trim()}
                className="bg-navy text-white p-2.5 rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50 shrink-0"
                aria-label="Send message"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            {error && (
              <p className="text-xs mt-2" style={{ color: "#DC2626" }}>
                {error}
              </p>
            )}
            {savedUser && messages.length === 0 && (
              <p className="text-[11px] text-text-secondary mt-2">
                Sending as{" "}
                <span className="font-medium text-navy">{savedUser.email}</span>{" "}
                ·{" "}
                <button
                  type="button"
                  onClick={() => {
                    window.localStorage.removeItem(STORAGE_KEY);
                    setSavedUser(null);
                  }}
                  className="underline hover:text-navy"
                >
                  not you?
                </button>
              </p>
            )}
          </form>
        </div>
      )}
    </>
  );
}
