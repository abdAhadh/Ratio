"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { usePostHog } from "posthog-js/react";
import {
  ArrowRight,
  Sparkles,
  Plus,
  X,
  Play,
  ShoppingBag,
  Landmark,
  Receipt,
  ShieldCheck,
  Building2,
  MessageSquare,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FadeIn, ScaleIn } from "@/components/motion-wrapper";
import { GeoRedirect } from "@/components/geo-redirect";

const erpSystems = [
  { src: "/erp-sap.svg", alt: "SAP", h: "h-10" },
  { src: "/erp-netsuite.svg", alt: "Oracle NetSuite", h: "h-10" },
  { src: "/erp-dynamics365.png", alt: "Microsoft Dynamics 365", h: "h-8" },
  { src: "/erp-tally.svg", alt: "Tally Prime", h: "h-7" },
  { src: "/erp-sage.svg", alt: "Sage", h: "h-9" },
  { src: "/erp-zohobooks.svg", alt: "Zoho Books", h: "h-7" },
];

function ERPMarquee() {
  return (
    <div className="relative overflow-hidden w-full max-w-4xl mx-auto">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cream to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent z-10" />
      <motion.div
        className="flex items-center gap-16 w-max opacity-60"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...erpSystems, ...erpSystems].map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            className={`${logo.h} w-auto object-contain shrink-0 grayscale`}
          />
        ))}
      </motion.div>
    </div>
  );
}

const capabilities = [
  {
    icon: ShoppingBag,
    title: "Sales reconciliation, at the source",
    body: "Ingest revenue from billing tools, CRMs, POS, marketplaces and PSPs. Match fees, refunds and payouts. Post to your ERP with the right entity, tax and sub-ledger.",
  },
  {
    icon: Landmark,
    title: "Bank rec with auto-chase",
    body: "Daily match against bank, PSPs and GL. When breaks surface, agents chase the owner over email and WhatsApp until they're resolved.",
  },
  {
    icon: Receipt,
    title: "AP with 3-way match",
    body: "Bills captured from email, WhatsApp and portals. Matched against PO and GRN. GST-2B and TDS handled natively. Exceptions resolved by agents, not your AP team.",
  },
  {
    icon: ShieldCheck,
    title: "GSTR-2B that closes the loop",
    body: "Purchase register matched to 2B across every GSTIN. Agents chase suppliers for corrections and auto-post ITC adjustments. You stop losing ITC to late filings.",
  },
  {
    icon: Building2,
    title: "Intercompany, done weekly",
    body: "Auto-reconciliation across every subsidiary. One-sided entries caught on day one. Built for NetSuite OneWorld and SAP multi-company setups that have outgrown native eliminations.",
  },
  {
    icon: MessageSquare,
    title: "Ask your live GL",
    body: "Plain-English questions, answered from the live ledger in seconds. Every answer links back to the exact journal lines it came from.",
  },
];

const faqs = [
  {
    q: "Do I need to replace my ERP?",
    a: "No. Ratio sits on top of SAP, NetSuite, Microsoft Dynamics, Tally or Zoho with bidirectional sync. Your ERP stays the book of truth. Agents do the operational work your team does manually today.",
  },
  {
    q: "How is this different from Cleartax, Bill.com or Stampli?",
    a: "Those are static software. They match. They don't act. Ratio's agents chase vendors for corrections, resolve exceptions, and post into your ERP end-to-end. The work that stays manual with point solutions is exactly what we automate.",
  },
  {
    q: "How accurate are the agents, and what's the audit trail?",
    a: "Every action is logged with source documents, confidence score and full audit trail. You set what auto-posts versus what goes to human review. Nothing happens inside your ERP your controller can't see, reverse or override.",
  },
  {
    q: "How long does implementation take?",
    a: "It depends on the scope of workflows you'd like to automate. For most engagements, we aim to go live within 14-28 days, after connecting your ERP and source systems and running parallel for one close cycle.",
  },
  {
    q: "How does Ratio handle GST, TDS and e-invoicing?",
    a: "India-first from day one. GSTR-1, 3B and 2B reconciliation, TDS deductions, e-invoice generation and multi-GSTIN handling are native, not bolted on.",
  },
  {
    q: "Is my financial data secure?",
    a: "India data residency, SOC-2 ready, role-based access, encryption at rest and in transit. Happy to walk your InfoSec and internal audit teams through the full posture on a separate call.",
  },
];

function FAQItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-base font-medium text-navy pr-4">{q}</span>
        {open ? (
          <X className="w-5 h-5 text-text-secondary shrink-0" />
        ) : (
          <Plus className="w-5 h-5 text-text-secondary shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5 -mt-1">
          <p className="text-sm text-text-secondary leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

const demoTabs = [
  { label: "Sales reconciliation", slug: "sales", available: true, type: "youtube" as const },
  { label: "AR agents", slug: "ar", available: true, type: "iframe" as const },
  { label: "AP agents", slug: "ap", available: false, type: "youtube" as const },
];

export default function D2CPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeDemoTab, setActiveDemoTab] = useState(0);
  const [hoverTab, setHoverTab] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const demoContainerRef = useRef<HTMLDivElement>(null);
  const arIframeRef = useRef<HTMLIFrameElement>(null);

  // CSS-based fullscreen (works on iOS where the Fullscreen API is video-only)
  useEffect(() => {
    if (!isFullscreen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [isFullscreen]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((f) => !f);
  }, []);
  const tabsWrapRef = useRef<HTMLDivElement>(null);
  const demoSectionRef = useRef<HTMLElement>(null);
  const posthog = usePostHog();

  // Hash → tab routing: #demo, #demo/sales, #demo/ar
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash.replace("#", "");
      if (hash === "demo" || hash === "demo/") {
        // Backwards compat: #demo and #demo/ → activate Sales tab
        setActiveDemoTab(0);
        setVideoPlaying(false);
        window.history.replaceState(null, "", "#demo/sales");
        setTimeout(() => {
          demoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
        return;
      }
      const match = hash.match(/^demo\/(\w+)$/);
      if (match) {
        const slug = match[1];
        const idx = demoTabs.findIndex((t) => t.slug === slug && t.available);
        if (idx !== -1) {
          setActiveDemoTab(idx);
          setVideoPlaying(false);
          setTimeout(() => {
            demoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }
      }
    }
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Update URL hash when tab changes (without triggering scroll)
  const switchTab = useCallback(
    (i: number) => {
      if (!demoTabs[i].available) return;
      setActiveDemoTab(i);
      setVideoPlaying(false);
      const slug = demoTabs[i].slug;
      window.history.replaceState(null, "", `#demo/${slug}`);
      posthog?.capture("demo_tab_viewed", {
        demo_tab: demoTabs[i].label,
        demo_slug: slug,
      });
    },
    [posthog],
  );

  // Track demo play
  const handlePlay = useCallback(() => {
    if (demoTabs[activeDemoTab].slug === "ar") {
      const iframe = arIframeRef.current;
      // Same-origin iframe: play its audio directly from the parent's click so
      // the user gesture chain reaches the audio play() call. This bypasses
      // the iframe's autoplay restriction and the rAF throttling that follows.
      try {
        iframe?.contentDocument?.querySelectorAll("audio").forEach((a) => {
          a.play().catch(() => {});
        });
      } catch {
        // cross-origin
      }
      iframe?.focus();
      iframe?.contentWindow?.postMessage({ type: "ratio:start" }, "*");
    }
    setVideoPlaying(true);
    posthog?.capture("demo_played", {
      demo_tab: demoTabs[activeDemoTab].label,
      demo_slug: demoTabs[activeDemoTab].slug,
      demo_type: demoTabs[activeDemoTab].type,
    });
  }, [activeDemoTab, posthog]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = tabsWrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <>
      <GeoRedirect />
      <Navbar />
      <main className="overflow-x-hidden bg-cream">
        {/* ───────── 1. HERO ───────── */}
        <section className="pt-36 md:pt-40 pb-32 md:pb-48 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn delay={0.15}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/5 text-navy text-xs font-medium rounded-full mb-6 border border-navy/10">
                <Sparkles className="w-3 h-3" />
                Built for CFOs outgrowing their ERPs
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <h1
                className="font-bold text-navy leading-[1.1] md:leading-[1.05] tracking-tight mb-5"
                style={{ fontSize: "clamp(2.375rem, 7.5vw, 4.5rem)" }}
              >
                <span className="block md:hidden">Upgrade your ERP</span>
                <span className="block md:hidden">with AI agents.</span>
                <span className="hidden md:block whitespace-nowrap">Upgrade your ERP with</span>
                <span className="hidden md:block whitespace-nowrap">AI agents.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.35}>
              <p
                className="text-text-secondary leading-snug mb-8"
                style={{ fontSize: "clamp(1rem, 2.35vw, 1.75rem)" }}
              >
                <span className="block md:whitespace-nowrap">
                  AI agents that sit on top of your existing ERP to automate finance ops.
                </span>
                <span className="block md:whitespace-nowrap">
                  Scale your finance team without scaling headcount.
                </span>
              </p>
            </FadeIn>
            <FadeIn delay={0.45}>
              <div className="flex justify-center mb-16">
                <a
                  href="/demo"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-medium rounded-full hover:bg-navy-light transition-colors"
                >
                  Request Demo
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.55}>
              <div className="mt-32 md:mt-36">
                <p className="text-xs text-text-secondary uppercase tracking-widest mb-6">
                  Works with ERP systems like
                </p>
                <ERPMarquee />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ───────── 2. DEMO VIDEO ───────── */}
        <section id="demo" ref={demoSectionRef} className="pt-10 md:pt-16 pb-20 md:pb-28 px-6">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <p className="text-xs text-text-secondary uppercase tracking-widest mb-3 text-center">
                See it in action
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-navy tracking-tight text-center mb-10">
                Watch AI agents run your finance ops.
              </h2>
            </FadeIn>

            {/* Category tabs */}
            <FadeIn>
              <div
                ref={tabsWrapRef}
                onMouseMove={handleMove}
                className="relative flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-8"
              >
                {demoTabs.map((tab, i) => {
                  const isActive = i === activeDemoTab;
                  const disabled = !tab.available;
                  return (
                    <button
                      key={tab.label}
                      onClick={() => switchTab(i)}
                      onMouseEnter={() => disabled && setHoverTab(i)}
                      onMouseLeave={() => disabled && setHoverTab(null)}
                      className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all ${
                        isActive
                          ? "bg-navy text-white border-navy"
                          : disabled
                          ? "bg-cream text-text-secondary/60 border-border cursor-default"
                          : "bg-white text-navy border-border hover:border-navy/30"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}

                {/* Cursor-following "Coming Soon" chip */}
                {hoverTab !== null && (
                  <div
                    className="pointer-events-none absolute z-20 px-3 py-1.5 rounded-full bg-navy text-white text-xs font-medium shadow-lg whitespace-nowrap"
                    style={{
                      left: cursor.x,
                      top: cursor.y,
                      transform: "translate(12px, 16px)",
                    }}
                  >
                    Coming soon 🚧
                  </div>
                )}
              </div>
            </FadeIn>

            <div
              ref={demoContainerRef}
              className={`bg-white shadow-[0_8px_60px_rgba(0,0,0,0.08)] overflow-hidden ${
                isFullscreen && activeDemoTab === 1
                  ? "fixed inset-0 z-[100] rounded-none border-0"
                  : "relative rounded-2xl border border-border"
              }`}
            >
                {activeDemoTab === 0 && (
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "1788 / 1080" }}
                  >
                    {videoPlaying ? (
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/4npyiWgzit0?autoplay=1&rel=0&modestbranding=1&playsinline=1&vq=hd1080&hd=1"
                        title="Ratio product demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        onClick={handlePlay}
                        aria-label="Play Ratio demo"
                        className="group absolute inset-0 w-full h-full overflow-hidden text-left"
                      >
                        {/* Navy gradient base */}
                        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />

                        {/* Soft radial glow */}
                        <div
                          className="absolute inset-0 opacity-60"
                          style={{
                            background:
                              "radial-gradient(900px 500px at 30% 20%, rgba(255,255,255,0.12), transparent 60%), radial-gradient(700px 500px at 80% 100%, rgba(196,149,106,0.18), transparent 60%)",
                          }}
                        />

                        {/* Subtle grid */}
                        <div
                          className="absolute inset-0 opacity-[0.07]"
                          style={{
                            backgroundImage:
                              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                          }}
                        />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
                          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white/10 backdrop-blur border border-white/15 rounded-full mb-2 sm:mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[9px] sm:text-[11px] font-medium text-white/80 uppercase tracking-widest">
                              Product walkthrough · 2 min
                            </span>
                          </div>

                          <h3 className="text-white text-base sm:text-3xl md:text-5xl font-bold tracking-tight leading-[1.15] max-w-2xl">
                            Watch AI agents reconcile<br />a D2C brand&apos;s books.
                          </h3>
                          <p className="text-white/60 text-[10px] sm:text-sm md:text-base mt-1.5 sm:mt-4 max-w-xl px-4 sm:px-0">
                            Every order, refund and payout reconciled in real time and posted to ERP.
                          </p>

                          {/* Play button */}
                          <div className="mt-3 sm:mt-8 relative">
                            <span className="absolute inset-0 rounded-full bg-white/20 blur-xl group-hover:bg-white/30 transition-all" />
                            <div className="relative w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                              <Play className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-navy fill-navy ml-0.5 sm:ml-1" />
                            </div>
                          </div>
                        </div>

                        {/* Bottom branding strip */}
                        <div className="absolute bottom-0 inset-x-0 px-5 py-3 flex items-center justify-between text-[11px] text-white/50 bg-gradient-to-t from-black/40 to-transparent">
                          <div className="flex items-center gap-2">
                            <img src="/logo.svg" alt="Ratio" className="w-4 h-4 opacity-80" />
                            <span className="font-medium">Ratio · tryratio.io</span>
                          </div>
                          <span className="hidden sm:inline">Daily reconciliation for D2C brands</span>
                        </div>
                      </button>
                    )}
                  </div>
                )}

                {activeDemoTab === 1 && (
                  <div
                    className="relative w-full"
                    style={isFullscreen ? { height: "100dvh" } : { aspectRatio: "1280 / 768" }}
                  >
                    {/* Iframe is always rendered AND visible from the start so
                        the browser doesn't throttle its rAF (Framer Motion + the
                        synthetic clock both rely on rAF). The cover sits on top
                        of it. */}
                    <iframe
                      ref={arIframeRef}
                      className="absolute inset-0 w-full h-full"
                      src="/demos/ar/index.html"
                      title="Ratio AR agents demo"
                      allow="autoplay"
                      style={{ border: "none" }}
                    />
                    {videoPlaying && (
                      <button
                        onClick={toggleFullscreen}
                        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                        className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-md bg-black/40 hover:bg-black/60 backdrop-blur flex items-center justify-center text-white transition-colors"
                      >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      </button>
                    )}
                    {!videoPlaying && (
                      <button
                        onClick={handlePlay}
                        aria-label="Play AR agents demo"
                        className="group absolute inset-0 w-full h-full overflow-hidden text-left"
                      >
                        {/* Navy gradient base */}
                        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />

                        {/* Soft radial glow */}
                        <div
                          className="absolute inset-0 opacity-60"
                          style={{
                            background:
                              "radial-gradient(900px 500px at 70% 20%, rgba(255,255,255,0.12), transparent 60%), radial-gradient(700px 500px at 20% 100%, rgba(196,149,106,0.18), transparent 60%)",
                          }}
                        />

                        {/* Subtle grid */}
                        <div
                          className="absolute inset-0 opacity-[0.07]"
                          style={{
                            backgroundImage:
                              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                          }}
                        />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
                          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white/10 backdrop-blur border border-white/15 rounded-full mb-2 sm:mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[9px] sm:text-[11px] font-medium text-white/80 uppercase tracking-widest">
                              Interactive walkthrough · 2 min
                            </span>
                          </div>

                          <h3 className="text-white text-base sm:text-3xl md:text-5xl font-bold tracking-tight leading-[1.15] max-w-2xl">
                            Watch AI agents collect<br />your receivables.
                          </h3>
                          <p className="text-white/60 text-[10px] sm:text-sm md:text-base mt-1.5 sm:mt-4 max-w-xl px-4 sm:px-0">
                            Automated follow-ups across WhatsApp, email and voice. Every payment tracked and matched.
                          </p>

                          {/* Play button */}
                          <div className="mt-3 sm:mt-8 relative">
                            <span className="absolute inset-0 rounded-full bg-white/20 blur-xl group-hover:bg-white/30 transition-all" />
                            <div className="relative w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                              <Play className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-navy fill-navy ml-0.5 sm:ml-1" />
                            </div>
                          </div>
                        </div>

                        {/* Bottom branding strip */}
                        <div className="absolute bottom-0 inset-x-0 px-5 py-3 flex items-center justify-between text-[11px] text-white/50 bg-gradient-to-t from-black/40 to-transparent">
                          <div className="flex items-center gap-2">
                            <img src="/logo.svg" alt="Ratio" className="w-4 h-4 opacity-80" />
                            <span className="font-medium">Ratio · tryratio.io</span>
                          </div>
                          <span className="hidden sm:inline">AI-powered accounts receivable automation</span>
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>
          </div>
        </section>

        {/* ───────── 3. PRODUCT IN DETAIL ───────── */}
        <section id="features" className="py-20 md:py-28 px-6 bg-white border-y border-border">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <p className="text-xs text-text-secondary uppercase tracking-widest mb-3 text-center">
                What Ratio does
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-navy tracking-tight text-center mb-4">
                Scale revenue. Not your finance team.
              </h2>
              <p
                className="text-text-secondary text-center max-w-3xl mx-auto mb-14 leading-snug"
                style={{ fontSize: "clamp(0.82rem, 2.1vw, 1.125rem)" }}
              >
                <span className="block md:whitespace-nowrap">
                  Deploy custom AI agents inside your ERP to automate everything your finance team does manually today.
                </span>
                <span className="block md:whitespace-nowrap">
                  At a fraction of the cost.
                </span>
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
          </div>
        </section>

        {/* ───────── 4. FAQ ───────── */}
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
                  Everything a CFO should know before a first conversation.
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

        {/* ───────── 5. CTA ───────── */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="bg-navy rounded-3xl px-6 py-12 sm:px-8 sm:py-16 md:px-16 md:py-20 text-center">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-[1.15] sm:leading-tight">
                  <span className="sm:hidden">
                    Your next finance<br />hire should be<br />an AI agent.
                  </span>
                  <span className="hidden sm:inline">
                    Your next finance hire<br />should be an AI agent.
                  </span>
                </h2>
                <p className="text-white/60 mb-12 max-w-xl mx-auto">
                  30 minutes with our team. See Ratio running on a company your size,
                  and what your close cycle and headcount plan look like 30 days in.
                </p>
                <a
                  href="/demo"
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
