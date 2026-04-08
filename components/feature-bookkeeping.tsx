"use client";

import { Zap, Users, CheckCircle2, ChevronRight } from "lucide-react";
import { FadeIn } from "./motion-wrapper";

export function FeatureBookkeeping() {
  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <FadeIn>
          <div className="text-center mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-navy tracking-tight mb-4">
              Never second-guess your profits or your compliance.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              Designed for fast-growing Indian MSMEs.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <FadeIn direction="left">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-4 sm:p-6 overflow-hidden">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-cream rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-navy">Invoices</p>
                    <p className="text-xs text-text-secondary">Auto-categorized</p>
                  </div>
                  <span className="text-sm font-bold text-navy">₹14.2L</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-cream rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-navy">Expenses</p>
                    <p className="text-xs text-text-secondary">Bank-synced</p>
                  </div>
                  <span className="text-sm font-bold text-navy">₹8.7L</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-cream rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-navy">Reconciliation</p>
                    <p className="text-xs text-text-secondary">98% matched</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-24 h-2 bg-cream-darker rounded-full overflow-hidden">
                      <div className="w-[98%] h-full bg-green-500 rounded-full" />
                    </div>
                    <span className="text-xs text-green-600">98%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <p className="text-sm font-medium text-green-800">Books up to date</p>
                  </div>
                  <span className="text-xs text-green-600">As of today</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" /> AI-powered
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> CA-reviewed
                </span>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right">
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-widest mb-3">
                Automated bookkeeping
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4">
                Reconciled books,
                <br />
                every single day
              </h3>
              <p className="text-text-secondary mb-5 leading-relaxed">
                We plug into all your sales and expense systems and make sure
                your books are always upto-date, and reconciled. In real time,
                not at month-end.
              </p>
              <div className="space-y-2.5 mb-6">
                {[
                  "Intermediary fees, GST, TDS mismatches etc are flagged instantly",
                  "Live status of every payable and receivable",
                  "Forward receipts on Slack or WhatsApp. We auto-categorise and extract the data",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
