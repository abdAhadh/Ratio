"use client";

import { FadeIn } from "./motion-wrapper";

export function FeatureReporting() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <FadeIn direction="right">
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-widest mb-3">
                Real-time reporting
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4">
                Your finance reports
                <br />
                are a message away
              </h3>
              <p className="text-text-secondary leading-relaxed mb-3">
                P&L, Balance Sheet, and Cash Flow reports auto-generated in
                real time, not manually assembled. Your CA reviews, and reports
                get auto-sent to your email or WhatsApp daily.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Want to deep dive? Just ask a question and our AI answers
                it instantly.
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <div className="relative">
              {/* Chat UI mockup */}
              <div className="bg-white rounded-xl shadow-sm border border-border p-3 sm:p-4 overflow-hidden relative text-sm">
                {/* Platform logos header */}
                <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-border">
                  <div className="flex items-center gap-2">
                    <img src="/icon-whatsapp.svg" alt="WhatsApp" className="w-5 h-5" />
                    <img src="/icon-slack.svg" alt="Slack" className="w-5 h-5" />
                    <img src="/icon-gmail.svg" alt="Gmail" className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-navy leading-tight">Ratio AI</p>
                    <p className="text-[10px] text-green-600 leading-tight">Online</p>
                  </div>
                </div>

                {/* User question */}
                <div className="flex justify-end items-end gap-1.5 mb-3">
                  <div className="bg-navy text-white text-xs rounded-xl rounded-br-sm px-3.5 py-2 max-w-[75%]">
                    What&apos;s my P&L looking like for March?
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=100&h=100&fit=crop&crop=face"
                    alt="Team member"
                    className="w-6 h-6 rounded-full object-cover shrink-0"
                  />
                </div>

                {/* AI response */}
                <div className="flex justify-start">
                  <div className="bg-cream rounded-xl rounded-bl-sm px-3.5 py-2.5 w-full">
                    <p className="text-xs text-text-secondary mb-2">Here&apos;s your March 2026 P&L:</p>
                    {/* P&L card */}
                    <div className="bg-white rounded-lg p-3 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[11px] font-medium text-navy">Profit & Loss</p>
                        <span className="text-[10px] text-text-secondary bg-cream px-1.5 py-0.5 rounded">
                          Mar 2026
                        </span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: "Revenue", value: "₹1.82 Cr", pct: 100 },
                          { label: "COGS", value: "₹72.4L", pct: 40 },
                          { label: "Gross Profit", value: "₹1.10 Cr", pct: 60 },
                          { label: "Operating Expenses", value: "₹48.2L", pct: 26 },
                          { label: "EBITDA", value: "₹61.5L", pct: 34 },
                        ].map((row) => (
                          <div key={row.label}>
                            <div className="flex justify-between text-[11px] mb-0.5">
                              <span className="text-text-secondary">{row.label}</span>
                              <span className="font-medium text-navy">{row.value}</span>
                            </div>
                            <div className="w-full h-1.5 bg-cream-dark rounded-full overflow-hidden">
                              <div
                                className="h-full bg-navy rounded-full"
                                style={{ width: `${row.pct}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2.5 pt-2.5 border-t border-border flex items-center justify-between">
                        <span className="text-[11px] text-text-secondary">Operating Profit Margin</span>
                        <span className="text-base font-bold text-green-600">33.8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
