"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Cal, { getCalApi } from "@calcom/embed-react";

const revenueRanges = [
  "\u20B90 \u2013 \u20B950L",
  "\u20B950L \u2013 \u20B92Cr",
  "\u20B92Cr \u2013 \u20B910Cr",
  "\u20B910Cr \u2013 \u20B950Cr",
  "\u20B950Cr \u2013 \u20B9100Cr",
  "\u20B9100Cr+",
];

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

export default function DemoPage() {
  const [showCal, setShowCal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [revenueOpen, setRevenueOpen] = useState(false);
  const [revenue, setRevenue] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setShowCal(true);

    fetch("/api/demo-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, company, revenue, message }),
    }).catch(() => {});
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-28 items-start">
            {/* Left — Copy */}
            <div className="md:sticky md:top-32">
              <p className="text-xs text-text-secondary uppercase tracking-widest mb-3">
                Request Demo
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-[1.2] tracking-tight mb-4">
                Talk to a finance expert at Ratio
              </h1>
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8">
                See how Indian MSMEs completely offload bookkeeping, taxes, and
                compliance to Ratio.
                <br />
                In one call, we&apos;ll show you why no CA firm or software
                can match what Ratio delivers.
              </p>

              <div className="mb-10">
                <p className="text-sm font-semibold text-navy mb-4">
                  What to expect in this call?
                </p>
                <div className="space-y-3">
                  {[
                    "We understand how your finance ops work today",
                    "Identify gaps across bookkeeping, taxation, reporting, and compliance",
                    "See a live walkthrough of how Ratio can fix your gaps",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span className="text-sm text-text-secondary">
                        {item}
                      </span>
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

            {/* Right — Form / Cal */}
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
                          <span className="text-base leading-none">🇮🇳</span>
                          <span className="text-sm text-navy font-medium">+91</span>
                        </div>
                        <input
                          type="tel"
                          placeholder="98765 43210"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (phoneError) setPhoneError(false);
                          }}
                          className="w-full px-3 py-3 bg-transparent text-sm text-navy placeholder:text-text-secondary/50 outline-none"
                        />
                      </div>
                      {phoneError && (
                        <p className="text-xs text-red-500 mt-1.5">Please enter a valid 10-digit phone number.</p>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">
                        Revenue per Month
                      </label>
                      <button
                        type="button"
                        onClick={() => setRevenueOpen(!revenueOpen)}
                        className="w-full px-4 py-3 bg-cream rounded-lg border border-border text-sm text-left outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/10 transition-all flex items-center justify-between"
                      >
                        <span className={revenue ? "text-navy" : "text-text-secondary/50"}>
                          {revenue || "Select..."}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform ${revenueOpen ? "rotate-180" : ""}`} />
                      </button>
                      {revenueOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg border border-border shadow-[0_8px_24px_rgba(0,0,0,0.1)] overflow-hidden">
                          {revenueRanges.map((range) => (
                            <button
                              key={range}
                              type="button"
                              onClick={() => {
                                setRevenue(range);
                                setRevenueOpen(false);
                              }}
                              className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                                revenue === range
                                  ? "bg-cream text-navy font-medium"
                                  : "text-navy hover:bg-cream/60"
                              }`}
                            >
                              {range}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">
                        Message{" "}
                        <span className="text-text-secondary/50">(optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your current finance setup..."
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
