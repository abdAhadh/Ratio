"use client";

import { useState, useEffect, Suspense } from "react";
import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useMarket, type Market } from "@/lib/use-market";
import Cal, { getCalApi } from "@calcom/embed-react";

const COPY: Record<Market, {
  eyebrow: string;
  heading: string;
  description: React.ReactNode;
  expectations: string[];
  messagePlaceholder: string;
  phone: { dial: string; flag: string; placeholder: string; digits: number };
}> = {
  in: {
    eyebrow: "Request Demo",
    heading: "Upgrade your ERP with AI agents",
    description: (
      <>
        See how Ratio&apos;s AI agents sit on top of SAP, NetSuite, Tally or
        your existing ERP to automate finance ops at scale.
        <br />
        In one call, we&apos;ll show you exactly how we&apos;d fit into your
        stack.
      </>
    ),
    expectations: [
      "We understand your current ERP and finance ops stack",
      "Identify the workflows where AI agents deliver the biggest impact",
      "Walk through how Ratio would deploy on your ERP and stack",
    ],
    messagePlaceholder: "Which ERP are you on? Which workflows are most broken today?",
    phone: { dial: "+91", flag: "🇮🇳", placeholder: "98765 43210", digits: 10 },
  },
  ae: {
    eyebrow: "Request Demo · UAE",
    heading: "AI Agents for Accounts Payables",
    description: (
      <>
        See how Ratio handles every invoice end-to-end. From WhatsApp, email
        and portals, through FTA validation, 3-way match, and approval, into
        your ERP.
        <br />
        In one call, we&apos;ll map your AP workflow and show you exactly
        where agents take over.
      </>
    ),
    expectations: [
      "We map how invoices arrive today (WhatsApp, email, Outlook, portals)",
      "Walk through bilingual extraction, FTA validation, and 3-way match on your data",
      "Show how Ratio embeds your existing approval workflow and posts to your ERP",
    ],
    messagePlaceholder: "Which ERP are you on? How many invoices a month? Where do they come from?",
    phone: { dial: "+971", flag: "🇦🇪", placeholder: "50 123 4567", digits: 9 },
  },
};

function CalEmbed({ name, email, notes }: { name: string; email: string; notes: string }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#1A1A2E",
            "cal-brand-emphasis": "#2D2D44",
            "cal-brand-text": "#FFFFFF",
            "cal-text": "#1A1A2E",
            "cal-text-emphasis": "#1A1A2E",
            "cal-text-muted": "#6B6B80",
            "cal-text-subtle": "#6B6B80",
            "cal-border": "#E5E0D8",
            "cal-border-emphasis": "#E5E0D8",
            "cal-border-subtle": "#E5E0D8",
            "cal-border-booker": "#E5E0D8",
            "cal-bg": "#FFFFFF",
            "cal-bg-emphasis": "#FBF7F1",
            "cal-bg-subtle": "#FBF7F1",
            "cal-bg-muted": "#F3EDE4",
            "cal-bg-inverted": "#1A1A2E",
          },
          dark: {
            "cal-brand": "#1A1A2E",
            "cal-brand-emphasis": "#2D2D44",
            "cal-brand-text": "#FFFFFF",
            "cal-text": "#1A1A2E",
            "cal-text-emphasis": "#1A1A2E",
            "cal-text-muted": "#6B6B80",
            "cal-text-subtle": "#6B6B80",
            "cal-border": "#E5E0D8",
            "cal-border-emphasis": "#E5E0D8",
            "cal-border-subtle": "#E5E0D8",
            "cal-border-booker": "#E5E0D8",
            "cal-bg": "#FFFFFF",
            "cal-bg-emphasis": "#FBF7F1",
            "cal-bg-subtle": "#FBF7F1",
            "cal-bg-muted": "#F3EDE4",
            "cal-bg-inverted": "#1A1A2E",
          },
        },
      });
    })();
  }, []);

  return (
    <Cal
      namespace="30min"
      calLink="tryratio/30min"
      style={{ width: "100%", height: "auto", minHeight: 500, overflow: "visible" }}
      config={{
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
        name: name,
        email: email,
        notes: notes,
      }}
    />
  );
}

function DemoForm() {
  const market = useMarket();
  const copy = COPY[market];

  const [showCal, setShowCal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== copy.phone.digits) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setShowCal(true);

    fetch("/api/demo-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone: `${copy.phone.dial}${digits}`, company, message, market }),
    }).catch(() => {});
  }

  return (
    <div className="grid md:grid-cols-2 gap-12 lg:gap-28 items-start">
      {/* Left: Copy */}
      <div className="md:sticky md:top-32">
        <p className="text-xs text-text-secondary uppercase tracking-widest mb-3">
          {copy.eyebrow}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-[1.2] tracking-tight mb-4">
          {copy.heading}
        </h1>
        <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8">
          {copy.description}
        </p>

        <div className="mb-10">
          <p className="text-sm font-semibold text-navy mb-4">
            What to expect in this call?
          </p>
          <div className="space-y-3">
            {copy.expectations.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <span className="text-sm text-text-secondary">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2 mb-1.5">
            <img
              src="/icon-gmail.svg"
              alt="Gmail"
              className="w-5 h-5 transition-transform duration-200 md:hover:rotate-12"
            />
            <p className="text-sm font-medium text-navy">Reach Out</p>
          </div>
          <p className="text-xs text-text-secondary">
            Feel free to drop your questions to{" "}
            <a
              href="mailto:ahadh@tryratio.io"
              className="text-navy font-medium hover:underline"
            >
              ahadh@tryratio.io
            </a>
          </p>
        </div>
      </div>

      {/* Right: Form / Cal */}
      <div>
        {showCal ? (
          <div className="bg-white rounded-2xl border border-border shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden">
            <CalEmbed name={name} email={email} notes={message} />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          >
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-cream rounded-lg border border-border text-sm text-navy placeholder:text-text-secondary/50 outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-cream rounded-lg border border-border text-sm text-navy placeholder:text-text-secondary/50 outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 bg-cream rounded-lg border border-border text-sm text-navy placeholder:text-text-secondary/50 outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Phone Number
                </label>
                <div className="flex bg-cream rounded-lg border border-border focus-within:border-navy/30 focus-within:ring-1 focus-within:ring-navy/10 transition-all">
                  <div className="flex items-center gap-1.5 pl-3 pr-2 border-r border-border shrink-0">
                    <span className="text-base leading-none">{copy.phone.flag}</span>
                    <span className="text-sm text-navy font-medium">{copy.phone.dial}</span>
                  </div>
                  <input
                    type="tel"
                    placeholder={copy.phone.placeholder}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneError) setPhoneError(false);
                    }}
                    className="w-full px-3 py-3 bg-transparent text-sm text-navy placeholder:text-text-secondary/50 outline-none"
                  />
                </div>
                {phoneError && (
                  <p className="text-xs text-red-500 mt-1.5">
                    Please enter a valid {copy.phone.digits}-digit phone number.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Message{" "}
                  <span className="text-text-secondary/50">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder={copy.messagePlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-cream rounded-lg border border-border text-sm text-navy placeholder:text-text-secondary/50 outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/10 transition-all resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 px-6 py-3.5 bg-navy text-white font-medium rounded-full hover:bg-navy-light transition-colors"
            >
              Pick a time
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<div className="text-text-secondary text-sm">Loading…</div>}>
            <DemoForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

