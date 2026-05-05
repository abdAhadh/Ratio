"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { usePostHog } from "posthog-js/react";
import {
  ArrowRight,
  Plus,
  X,
  Play,
  MessageSquare,
  FileText,
  ShieldCheck,
  Smartphone,
  Landmark,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FadeIn, ScaleIn } from "@/components/motion-wrapper";

const erpSystems = [
  { src: "/erp-sap.svg", alt: "SAP", h: "h-10" },
  { src: "/erp-netsuite.svg", alt: "Oracle NetSuite", h: "h-10" },
  { src: "/erp-tally.svg", alt: "Tally Prime", h: "h-7" },
  { src: "/erp-zohobooks.svg", alt: "Zoho Books", h: "h-7" },
  { src: "/erp-sage.svg", alt: "Sage", h: "h-9" },
  { src: "/erp-dynamics365.png", alt: "Microsoft Dynamics 365", h: "h-8" },
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
    icon: MessageSquare,
    title: "Vendor onboarding",
    body: "Onboard vendors in seconds. Ratio verifies TRN, matches IBAN and screens for sanctions automatically.",
  },
  {
    icon: FileText,
    title: "Invoice intake from anywhere",
    body: "Captures invoices from WhatsApp, email, Outlook, Slack or any channel. Bilingual extraction in English and Arabic.",
  },
  {
    icon: ShieldCheck,
    title: "FTA validation and 3-way match",
    body: "Checks every invoice against FTA rules, matches it to the PO and GRN from your ERP, and flags variances.",
  },
  {
    icon: Sparkles,
    title: "Smart insights before approval",
    body: "Surfaces vendor risk, price drift, duplicate invoices and compliance issues before anything reaches an approver.",
  },
  {
    icon: Smartphone,
    title: "Approval workflows",
    body: "Embed your existing approval workflow into Ratio. Approvers get full context and a one-tap decision from any device.",
  },
  {
    icon: Landmark,
    title: "Payment tracking and reconciliation",
    body: "Track payment status across every invoice. Entries post to your ERP automatically and reconcile against your bank.",
  },
];

const faqs = [
  {
    q: "Do I need to replace my ERP?",
    a: "No. Ratio sits on top of SAP, SAP B1, NetSuite, Tally Prime, Zoho Books or QuickBooks with bidirectional sync. Your ERP stays the book of truth. Agents handle the AP workflow your team does manually today.",
  },
  {
    q: "How does invoice intake work?",
    a: "Vendors send invoices however they already do: WhatsApp, email, Outlook, Slack, or a supplier portal. Ratio picks them up from every channel, reads them bilingually in English and Arabic, extracts every field, and runs FTA validation automatically. No portal login required for your vendors.",
  },
  {
    q: "How does Ratio handle UAE VAT and FTA compliance?",
    a: "TRN is verified live on the FTA portal during vendor onboarding. Every invoice is checked against FTA tax-invoice format rules. VAT is extracted and matched per line item. Ratio is being built ahead of the UAE's mandatory e-invoicing rollout (FTA 5-corner Peppol, January 2027).",
  },
  {
    q: "How accurate are the agents, and what's the audit trail?",
    a: "Every action is logged with source documents, confidence score and a full audit trail. You set what auto-posts versus what goes to human review. Nothing happens inside your ERP your controller can't see, reverse or override.",
  },
  {
    q: "How long does implementation take?",
    a: "For most engagements we aim to go live within 7-14 days, depending on the complexity of your existing process. Talk to us to evaluate this.",
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

export default function UAEPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const demoSectionRef = useRef<HTMLElement>(null);
  const posthog = usePostHog();

  const handlePlay = useCallback(() => {
    setVideoPlaying(true);
    posthog?.capture("demo_played", {
      demo_tab: "AP agents",
      demo_slug: "ap",
      demo_type: "iframe",
      market: "ae",
    });
  }, [posthog]);

  // Hash → demo scroll
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash.replace("#", "");
      if (hash === "demo" || hash.startsWith("demo/")) {
        setTimeout(() => {
          demoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    }
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden bg-cream">
        {/* ───────── 1. HERO ───────── */}
        <section className="pt-36 md:pt-40 pb-32 md:pb-48 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn delay={0.15}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/5 text-navy text-xs font-medium rounded-full mb-6 border border-navy/10">
                <span className="text-base leading-none">🇦🇪</span>
                Built for the UAE
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <h1
                className="font-bold text-navy leading-[1.1] md:leading-[1.05] tracking-tight mb-5"
                style={{ fontSize: "clamp(2.375rem, 7.5vw, 4.5rem)" }}
              >
                <span className="block">AI Agents for</span>
                <span className="block">Accounts Payables.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.35}>
              <p
                className="text-text-secondary leading-snug mb-8"
                style={{ fontSize: "clamp(1rem, 2.35vw, 1.75rem)" }}
              >
                <span className="block md:whitespace-nowrap">
                  AI agents that integrate with your ERP and handle invoice intake,
                </span>
                <span className="block md:whitespace-nowrap">
                  validation, approvals, payment, and reconciliation.
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
                Watch AI agents handle every invoice.
              </h2>
            </FadeIn>

            <ScaleIn>
              <div className="relative rounded-2xl border border-border bg-white shadow-[0_8px_60px_rgba(0,0,0,0.08)] overflow-hidden">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "1280 / 768" }}
                >
                  {videoPlaying ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="/demos/ap/index.html"
                      title="Ratio UAE AP agents demo"
                      allow="autoplay"
                      style={{ border: "none" }}
                    />
                  ) : (
                    <button
                      onClick={handlePlay}
                      aria-label="Play UAE AP agents demo"
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
                            Interactive walkthrough · 2 min
                          </span>
                        </div>

                        <h3 className="text-white text-base sm:text-3xl md:text-5xl font-bold tracking-tight leading-[1.15] max-w-2xl">
                          Watch AI agents process<br />every invoice, end-to-end.
                        </h3>
                        <p className="text-white/60 text-[10px] sm:text-sm md:text-base mt-1.5 sm:mt-4 max-w-xl px-4 sm:px-0">
                          Vendor onboarding, bilingual extraction, 3-way match, and payment. All automated.
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
                        <span className="hidden sm:inline">AI-powered accounts payable for the UAE</span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </ScaleIn>
          </div>
        </section>

        {/* ───────── 3. CAPABILITIES ───────── */}
        <section id="features" className="py-20 md:py-28 px-6 bg-white border-y border-border">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <p className="text-xs text-text-secondary uppercase tracking-widest mb-3 text-center">
                What Ratio does
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-navy tracking-tight text-center mb-4">
                Every invoice. Handled.
              </h2>
              <p
                className="text-text-secondary text-center max-w-3xl mx-auto mb-14 leading-snug"
                style={{ fontSize: "clamp(0.82rem, 2.1vw, 1.125rem)" }}
              >
                <span className="block md:whitespace-nowrap">
                  From WhatsApp to your ERP, Ratio automates the entire AP workflow
                </span>
                <span className="block md:whitespace-nowrap">
                  so your finance team can focus on what matters.
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
                  Everything a finance leader should know before a first conversation.
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
                    Your next AP hire<br />should be an<br />AI agent.
                  </span>
                  <span className="hidden sm:inline">
                    Your next AP hire<br />should be an AI agent.
                  </span>
                </h2>
                <p className="text-white/60 mb-12 max-w-xl mx-auto">
                  30 minutes with our team. See Ratio running on a company your size,
                  and what your AP close cycle looks like 30 days in.
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
