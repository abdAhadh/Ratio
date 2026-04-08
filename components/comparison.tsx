"use client";

import { X, Minus, Check } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./motion-wrapper";

export function Comparison() {
  return (
    <section id="how-we-compare" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-navy tracking-tight mb-4">
              The only firm that closes your books every single day.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              Built to move at the speed of your business.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto" staggerDelay={0.15}>
          {/* In-house Team */}
          <StaggerItem>
            <div className="bg-white rounded-2xl border border-border p-5 sm:p-7 h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full mb-6">
                In-house Team + Software
              </div>
              <div className="space-y-5">
                {[
                  {
                    title: "High fixed costs",
                    desc: "₹50–75K/month in salaries, software, and overheads.",
                  },
                  {
                    title: "Manual processes, delayed books",
                    desc: "Books close 10+ days late every month.",
                  },
                  {
                    title: "Compliance falls through cracks",
                    desc: "Missed filings lead to penalties.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                      <X className="w-3 h-3 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy mb-1">{item.title}</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Independent CA Firm */}
          <StaggerItem>
            <div className="bg-white rounded-2xl border border-border p-5 sm:p-7 h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-full mb-6">
                Independent CA Firm
              </div>
              <div className="space-y-5">
                {[
                  {
                    title: "Black box operations",
                    desc: "Constant follow-ups to know what's done.",
                  },
                  {
                    title: "Reports arrive weeks late",
                    desc: "15–20 days to close books. Decisions made blind.",
                  },
                  {
                    title: "Reactive, not proactive",
                    desc: "No tax planning. No financial advice.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                      <Minus className="w-3 h-3 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy mb-1">{item.title}</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Ratio Way */}
          <StaggerItem>
            <div className="bg-navy rounded-2xl p-7 h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-green-400 text-xs font-medium rounded-full mb-6">
                The Ratio Way
              </div>
              <div className="space-y-5">
                {[
                  {
                    title: "AI does the work, CA reviews it",
                    desc: "Books reconciled in real-time, proactively.",
                  },
                  {
                    title: "Real-time P&L, always current",
                    desc: "Ask in natural language. Always know where you stand.",
                  },
                  {
                    title: "Compliance on auto-pilot",
                    desc: "Pre-filled returns. Filed on time, every time.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                      <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
