"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Plus,
  Phone,
  Mail,
  Scale,
  TrendingDown,
  Banknote,
  ShieldCheck,
  Workflow,
  Activity,
  Building2,
  MessageSquare,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FadeIn, ScaleIn } from "@/components/motion-wrapper";

/* ───────── Brand SVG glyphs (inline so they ship light) ───────── */
function GmailGlyph({ className = "" }: { className?: string }) {
  // Authentic Gmail "M" mark
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22 6.27v11.46c0 .69-.56 1.25-1.25 1.25H18V9.45l-6 4.5-6-4.5V19H3.25C2.56 19 2 18.44 2 17.73V6.27c0-.69.56-1.27 1.25-1.27H4l8 6 8-6h.75c.69 0 1.25.58 1.25 1.27z" />
      <path fill="#34A853" d="M6 19v-9.55l6 4.5z" />
      <path fill="#FBBC04" d="M18 9.45V19l-6-4.5z" />
      <path fill="#EA4335" d="M20 5L12 11 4 5h16z" />
    </svg>
  );
}

function MessagesGlyph({ className = "" }: { className?: string }) {
  // Apple iMessage-style green gradient speech bubble
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="imsg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5BD05A" />
          <stop offset="100%" stopColor="#2EB54F" />
        </linearGradient>
      </defs>
      <path
        fill="url(#imsg)"
        d="M12 3c5.5 0 10 3.78 10 8.44 0 4.66-4.5 8.44-10 8.44-1.1 0-2.17-.16-3.16-.45L4 21l1.36-3.43C3.85 16.12 3 13.92 3 11.44 3 6.78 6.86 3 12 3z"
      />
    </svg>
  );
}

function PhoneGlyph({ className = "" }: { className?: string }) {
  // Voice waveform glyph — cleaner than a generic call icon
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="voicegrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0E7490" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="10" width="2" height="4" rx="1" fill="url(#voicegrad)" />
      <rect x="6.5" y="7" width="2" height="10" rx="1" fill="url(#voicegrad)" />
      <rect x="10.5" y="4" width="2" height="16" rx="1" fill="url(#voicegrad)" />
      <rect x="14.5" y="7" width="2" height="10" rx="1" fill="url(#voicegrad)" />
      <rect x="18.5" y="10" width="2" height="4" rx="1" fill="url(#voicegrad)" />
    </svg>
  );
}

/* ───────── Hero animation: agent outreach across voice, email, SMS ───────── */
type VoiceLine = { who: "agent" | "customer"; name: string; text: string };

type EmailMsg = {
  who: "agent" | "customer";
  from: string;
  time: string;
  text: string;
};

type Channel =
  | {
      key: "voice";
      label: string;
      icon: typeof GmailGlyph;
      transcript: VoiceLine[];
      sectionId: string;
    }
  | {
      key: "email";
      label: string;
      icon: typeof GmailGlyph;
      thread: EmailMsg[];
      sectionId: string;
    }
  | {
      key: "sms";
      label: string;
      icon: typeof GmailGlyph;
      from: string;
      agentMessage: string;
      customerName: string;
      customerReply: string;
      sectionId: string;
    };

const channels: Channel[] = [
  {
    key: "voice",
    label: "Voice",
    icon: PhoneGlyph,
    sectionId: "product",
    transcript: [
      {
        who: "agent",
        name: "Alice, Bane",
        text: "Hey John, Alice from Bane. Quick one on INV-1042. It's 10 days past due.",
      },
      {
        who: "customer",
        name: "John, Acme",
        text: "Yeah, sorry. It got stuck in approvals on our end.",
      },
      {
        who: "agent",
        name: "Alice, Bane",
        text: "No worries. Any sense of when it'll clear?",
      },
      {
        who: "customer",
        name: "John, Acme",
        text: "I'll push it through tomorrow. You'll have it by Friday.",
      },
    ],
  },
  {
    key: "email",
    label: "Email",
    icon: GmailGlyph,
    sectionId: "product",
    thread: [
      {
        who: "agent",
        from: "Bane Industries",
        time: "Thursday 8:22am",
        text: "Hi John, this is Alice from Bane. INV-1042 is 10 days past due. Want me to resend the PDF?",
      },
      {
        who: "customer",
        from: "Acme Co.",
        time: "Friday 9:33am",
        text: "Thanks Alice. Checking internally. Who's the reference on this one?",
      },
      {
        who: "agent",
        from: "Bane Industries",
        time: "Friday 4:35pm",
        text: "Eric Lindholm signed it off on our end. Any sense of when we can expect payment?",
      },
    ],
  },
  {
    key: "sms",
    label: "SMS",
    icon: MessagesGlyph,
    sectionId: "product",
    from: "Bane Industries",
    customerName: "Sarah, Acme",
    agentMessage:
      "Hi Sarah, quick nudge from Bane Industries on INV-1042. Due tomorrow. Anything I can help unblock?",
    customerReply: "All good, paying tomorrow morning. Thanks!",
  },
];

function ChannelChip({
  active,
  label,
  Icon,
  onClick,
}: {
  active: boolean;
  label: string;
  Icon: typeof GmailGlyph;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-[11px] font-medium transition-colors cursor-pointer ${
        active
          ? "bg-navy text-cream border-navy"
          : "bg-white text-navy border-border hover:border-navy/40"
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

function HeroAnimation() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % channels.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const handleChipClick = (i: number) => {
    setIdx(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
    // also jump to the section for keyboard-style nav
    const id = channels[i].sectionId;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const current = channels[idx];
  const Icon = current.icon;

  return (
    <div className="relative w-full">
      {/* Channel chips — right-aligned to match card's right edge */}
      <div className="flex items-center justify-end gap-2 mb-4">
        {channels.map((c, i) => (
          <ChannelChip
            key={c.key}
            active={i === idx}
            label={c.label}
            Icon={c.icon}
            onClick={() => handleChipClick(i)}
          />
        ))}
      </div>

      {/* Cycling channel area — Vercel-style sharp corners */}
      <div className="relative min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* ─── EMAIL: separate floating cards with asymmetric offsets ─── */}
            {current.key === "email" && (
              <div className="space-y-3">
                {current.thread.map((msg, i) => {
                  const isAgent = msg.who === "agent";
                  // Asymmetric horizontal offsets per card to feel organic
                  const offsets = ["mr-10", "ml-14 mr-0", "ml-6 mr-12"];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.2 + i * 0.85,
                        duration: 0.4,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className={`border rounded-md px-4 py-3 shadow-[0_8px_24px_-12px_rgba(26,26,46,0.18)] ${
                        isAgent
                          ? "bg-[#EEF6E2] border-[#D5E5BA]"
                          : "bg-white border-border"
                      } ${offsets[i] ?? ""}`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="inline-flex items-center gap-1.5">
                          <span className="text-[11px] text-text-secondary">From</span>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border bg-white border-border text-[11px] font-medium text-navy`}
                          >
                            <span
                              className={`w-3 h-3 rounded-sm flex items-center justify-center text-[8px] font-bold ${
                                isAgent
                                  ? "bg-navy text-cream"
                                  : "bg-warm/40 text-navy"
                              }`}
                            >
                              {isAgent ? "B" : "A"}
                            </span>
                            {msg.from}
                          </span>
                        </div>
                        <span className="text-[10px] text-text-secondary whitespace-nowrap">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-[12.5px] text-navy leading-relaxed">
                        {msg.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* ─── VOICE: floating avatar + bubble pairs, no background ─── */}
            {current.key === "voice" && (
              <div className="space-y-3">
                {current.transcript.map((line, i) => {
                  const isAgent = line.who === "agent";
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.25 + i * 0.85,
                        duration: 0.4,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className={`flex items-end gap-2 ${
                        isAgent ? "" : "flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-semibold border ${
                          isAgent
                            ? "bg-navy text-cream border-navy"
                            : "bg-warm/40 text-navy border-warm/50"
                        }`}
                      >
                        {isAgent ? "A" : "J"}
                      </div>
                      <div
                        className={`max-w-[78%] px-3 py-2 rounded-md text-[12.5px] leading-relaxed border shadow-[0_4px_16px_-8px_rgba(26,26,46,0.1)] ${
                          isAgent
                            ? "bg-white border-border text-navy"
                            : "bg-navy text-cream border-navy"
                        }`}
                      >
                        {line.text}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* ─── SMS: keep wrapped chat-bubble UI ─── */}
            {current.key === "sms" && (
              <div className="border border-border rounded-md bg-white shadow-[0_10px_40px_-15px_rgba(26,26,46,0.12)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-cream/40">
                  <Icon className="w-4 h-4" />
                  <p className="text-[11px] font-semibold text-navy flex-1 truncate">
                    {current.label}
                  </p>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-text-secondary w-10">From</span>
                      <span className="text-navy font-medium">{current.from}</span>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-[80%] bg-gradient-to-br from-[#5BD05A] to-[#22A04B] text-white text-[12.5px] rounded-md px-3 py-2 leading-snug">
                        {current.agentMessage}
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4, duration: 0.45 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[80%] bg-cream border border-border text-navy text-[12.5px] rounded-md px-3 py-2 leading-snug">
                        {current.customerReply}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const integrations = [
  { src: "/erp-netsuite.svg", alt: "Oracle NetSuite", h: "h-10" },
  { src: "/erp-sap.svg",      alt: "SAP",             h: "h-10" },
  { src: "/erp-dynamics365.png", alt: "Microsoft Dynamics 365", h: "h-8" },
  { src: "/erp-sage.svg",     alt: "Sage Intacct",    h: "h-9" },
];

// Logo set used in the dedicated Integrations section.
// Heights tuned per-logo for similar OPTICAL size — the visible mark inside
// each SVG has different padding ratios, so heights compensate accordingly.
const integrationLogos = [
  { src: "/erp-netsuite.svg",         alt: "Oracle NetSuite",        h: "h-10 sm:h-12" },
  { src: "/erp-sap.svg",              alt: "SAP",                    h: "h-9  sm:h-11" },
  { src: "/erp-dynamics365.png",      alt: "Microsoft Dynamics 365", h: "h-8  sm:h-10" },
  { src: "/erp-sage.svg",             alt: "Sage Intacct",           h: "h-9  sm:h-11" },
  { src: "/icon-quickbooks.svg",      alt: "QuickBooks",             h: "h-10 sm:h-12" },
  { src: "/icon-salesforce.svg",      alt: "Salesforce",             h: "h-9  sm:h-11" },
  { src: "/icon-plaid.svg",           alt: "Plaid",                  h: "h-9  sm:h-11" },
  { src: "/icon-chase.svg",           alt: "Chase",                  h: "h-7  sm:h-9"  },
  { src: "/icon-bankofamerica.svg",   alt: "Bank of America",        h: "h-6  sm:h-8"  },
  { src: "/icon-slack.svg",           alt: "Slack",                  h: "h-9  sm:h-11" },
];

function IntegrationMarquee() {
  return (
    <div className="relative overflow-hidden w-full max-w-4xl mx-auto">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cream to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent z-10" />
      <motion.div
        className="flex items-center w-max opacity-60"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: 45, ease: "linear" },
        }}
      >
        {/*
          Three copies (not two) and a -33.333% slide. Two copies were
          mathematically seamless at the wrap point but the total row
          width (~1180px) was narrower than 2× the visible viewport
          (~1792px on desktop), so the viewport's right edge could sweep
          past the end of content and reveal blank cream. Tripling makes
          (N-1)*W ≥ V on every supported breakpoint.
        */}
        {[...integrations, ...integrations, ...integrations].map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            className={`${logo.h} w-auto object-contain shrink-0 grayscale mr-16`}
          />
        ))}
      </motion.div>
    </div>
  );
}

const capabilities = [
  {
    icon: Mail,
    title: "Multi-channel collections",
    body:
      "Voice call, email, or SMS. Ratio learns each customer's preferred channel and tone, follows the cadence you set, and finds the right contact to escalate when your contact goes dark.",
  },
  {
    icon: Banknote,
    title: "Cash, auto-applied",
    body:
      "Connects to your bank account and auto-matches incoming payments to open invoices, across any source.",
  },
  {
    icon: Scale,
    title: "Disputes and deductions, handled",
    body:
      "Short-pays and disputes arrive with full context (invoice, contract, delivery, emails), surfaced in your Slack with a next-step recommendation. Ratio follows through until cash lands.",
  },
  {
    icon: ShieldCheck,
    title: "Data-led credit terms",
    body:
      "Ratio combines payment history with pulled credit reports to help finance set smarter credit terms. Helps your sales team re-negotiate payment terms when an account trends risky.",
  },
  {
    icon: Activity,
    title: "Real-time AR insights",
    body:
      "Live DSO, aging buckets, and cohort recovery rates. Forecast cash collections by week, customer, and product line.",
  },
  {
    icon: Workflow,
    title: "The messy edge cases",
    body:
      "Coupa or Ariba portal uploads. Short-pays from missing PO lines. Payments blocked on a buyer's internal sign-off. Ratio handles the long tail of AR work that point solutions skip.",
  },
];

const outcomes = [
  { stat: "40%", label: "DSO reduction" },
  { stat: "70%", label: "less time spent on AR work" },
  { stat: "$65K+", label: "saved per AR hire avoided" },
];

const faqs = [
  {
    q: "Will this replace my AR team?",
    a: "No. Ratio is built to augment your existing AR team, not replace them. Most customers keep their existing headcount and use Ratio to cover 10× more accounts. This is especially useful for the long tail of customers you have. Their work shifts from chasing collections to resolving disputes, deciding credit terms, and managing strategic accounts.",
  },
  {
    q: "How is Ratio priced?",
    a: "Fixed plans, sized to your invoice volume. We work directly with each customer to land on the plan that fits their AR workload. Clean ROI math, no per-seat surprises.",
  },
  {
    q: "What's the best way to partner?",
    a: "Start with a pilot. Connect your tools, define your guardrails, and see results by week two. Early customers get founding-partner pricing and a direct hand in the roadmap. We're actively shaping the product alongside the first cohort.",
  },
  {
    q: "How is data handled and is it secure?",
    a: "Your data is encrypted at rest and in transit. We use it only to improve performance on your own account. Any other use is explicitly outside our data-governance policies.",
  },
];

function FAQItem({
  q,
  a,
  open,
  onClick,
}: {
  q: string;
  a: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-cream/40">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-navy hover:bg-cream/70 transition-colors"
      >
        <span className="text-base font-medium">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="shrink-0 text-text-secondary"
        >
          <Plus className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] },
              opacity: { duration: 0.22, ease: "easeOut" },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 -mt-1 text-sm text-text-secondary leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function USPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      <main className="bg-cream">
        {/* ───────── 1. HERO ───────── */}
        {/* Note: <HeroAnimation /> is kept exported below for reuse in another */}
        {/* section later. Removed from hero per design call to reduce density. */}
        <section className="pt-36 md:pt-40 pb-20 md:pb-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.2}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/5 text-navy text-xs font-medium rounded-full mb-8 border border-navy/10">
                <Sparkles className="w-3 h-3" />
                AI agents for AR
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-navy leading-[1.05] tracking-tight mb-8">
                Your AI coworker to automate AR
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10">
                AI agents that run collections, cash applications, deductions and disputes, end-to-end.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <a
                href="/demo?market=us"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-navy text-white font-medium rounded-full hover:bg-navy-light transition-colors text-base"
              >
                Request Demo
                <ArrowRight className="w-4 h-4" />
              </a>
            </FadeIn>

            {/* Integrations strip */}
            <FadeIn delay={0.7}>
              <div className="mt-24">
                <p className="text-xs text-text-secondary uppercase tracking-widest mb-6">
                  Sits on top of the stack you already run
                </p>
                <IntegrationMarquee />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ───────── 3. PRODUCT / CAPABILITIES ───────── */}
        <section id="product" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <p className="text-xs text-text-secondary uppercase tracking-widest mb-3 text-center">
                The product
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-navy tracking-tight text-center mb-5 max-w-3xl mx-auto leading-tight">
                Finally, AR software that does the work for you.
              </h2>
              <p
                className="text-text-secondary text-center max-w-3xl mx-auto mb-14 leading-relaxed"
                style={{ fontSize: "clamp(0.82rem, 2.1vw, 1.125rem)" }}
              >
                Ratio learns from every customer interaction and gets smarter
                over time. It personalises every touchpoint, just like your best
                AR hire would.
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {capabilities.map((c, i) => (
                <FadeIn key={c.title} delay={0.05 + i * 0.06}>
                  <div className="bg-cream/50 border border-border rounded-xl p-6 h-full hover:border-navy/20 transition-colors">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy/5 text-navy mb-4">
                      <c.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-navy mb-2">{c.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{c.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.2}>
              <p className="text-center text-navy mt-14 max-w-3xl mx-auto leading-snug text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                Start as a co-pilot for your AR team.
                <br />
                Graduate it to autopilot whenever you're ready.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ───────── 4. OUTCOMES — dark contrast section with hover micro-interactions ───────── */}
        <section id="outcomes" className="py-24 px-6 bg-navy relative overflow-hidden">
          {/* Subtle background accent */}
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)] pointer-events-none" />
          <div className="relative max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-14">
                <p className="text-xs text-warm uppercase tracking-widest mb-3">
                  Outcomes
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-cream tracking-tight mb-4">
                  What you should expect in 60 days.
                </h2>
                <p className="text-base sm:text-lg text-cream/60 max-w-2xl mx-auto leading-relaxed">
                  Numbers that collect you more cash, faster and cheaper.
                </p>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-4">
              {outcomes.map((o, i) => (
                <FadeIn key={o.label} delay={0.05 + i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    className="group relative bg-navy-light/40 border border-cream/10 rounded-2xl p-8 text-center h-full overflow-hidden cursor-default transition-[border-color,box-shadow,background-color] duration-300 hover:border-warm/40 hover:bg-navy-light/60 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                  >
                    {/* Hover accent line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-warm/0 group-hover:bg-warm/60 transition-colors duration-300" />

                    <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-cream tracking-tight mb-3 leading-none">
                      {o.stat}
                    </p>
                    <p className="text-sm text-cream/65 leading-snug">{o.label}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.25}>
              <p className="text-center text-cream mt-24 md:mt-28 max-w-3xl mx-auto leading-snug text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                Same day responses on shared slack channel with our founding team.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ───────── 6. INTEGRATIONS — larger marquee with real logos ───────── */}
        <section id="integrations" className="py-24 px-6 bg-cream-dark/30 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center mb-14">
            <FadeIn>
              <p className="text-xs text-text-secondary uppercase tracking-widest mb-3">
                Integrations
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-navy tracking-tight mb-4">
                Works with the systems you already use.
              </h2>
              <p className="text-base sm:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Think of Ratio as a co-worker who has access to your CRM, ERP,
                payment processor and messaging systems. No rip and replace.
              </p>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="relative w-full">
              {/* Edge fades */}
              <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-cream-dark/30 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-cream-dark/30 to-transparent z-10 pointer-events-none" />

              <motion.div
                className="flex items-center w-max py-4 opacity-70"
                animate={{ x: ["0%", "-33.333%"] }}
                transition={{
                  x: { repeat: Infinity, repeatType: "loop", duration: 54, ease: "linear" },
                }}
              >
                {/*
                  Three copies and a -33.333% slide. Two were borderline at
                  wide viewports — content row could be < 2× the visible
                  width, leaving blank cream at the wrap point. Tripling
                  guarantees (N-1)*W ≥ viewport at every breakpoint.
                */}
                {[
                  ...integrationLogos,
                  ...integrationLogos,
                  ...integrationLogos,
                ].map((logo, i) => (
                  <img
                    key={`${logo.alt}-${i}`}
                    src={logo.src}
                    alt={logo.alt}
                    className={`${logo.h} w-auto object-contain shrink-0 grayscale mr-20 sm:mr-24 md:mr-28`}
                  />
                ))}
              </motion.div>
            </div>
          </FadeIn>
        </section>

        {/* ───────── 9. FAQ ───────── */}
        <section id="faq" className="py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-xs text-text-secondary uppercase tracking-widest mb-3">
                  FAQ
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-navy tracking-tight mb-4">
                  Questions, answered
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-text-secondary">
                  Everything a finance leader should know before a first call.
                </p>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="space-y-3">
                {faqs.map((f, i) => (
                  <FAQItem
                    key={f.q}
                    q={f.q}
                    a={f.a}
                    open={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ───────── 10. FINAL CTA ───────── */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="bg-navy rounded-3xl px-6 py-12 sm:px-8 sm:py-16 md:px-16 md:py-20 text-center">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-[1.15] sm:leading-tight">
                  <span className="sm:hidden">
                    Your next AR hire<br />should be<br />an AI agent.
                  </span>
                  <span className="hidden sm:inline">
                    Your next AR hire<br />should be an AI agent.
                  </span>
                </h2>
                <p className="text-white/60 mb-12 max-w-xl mx-auto">
                  Pilot live in 1 week. Measurable DSO impact by day 60.
                </p>
                <a
                  href="/demo?market=us"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-navy font-medium rounded-full hover:bg-white/90 transition-colors text-lg"
                >
                  Request Demo
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
