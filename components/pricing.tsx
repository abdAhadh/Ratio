"use client";

import { CheckCircle2 } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./motion-wrapper";

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs text-text-secondary uppercase tracking-widest mb-4">
              Pricing
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Simple plans
              <br />
              for serious businesses
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          staggerDelay={0.15}
        >
          {/* Starter */}
          <StaggerItem>
            <div className="bg-cream rounded-2xl p-8 border border-border h-full flex flex-col">
              <p className="text-xs text-text-secondary uppercase tracking-widest mb-2">
                Starter
              </p>
              <div className="mb-1">
                <span className="text-4xl font-bold text-navy">₹9,999</span>
                <span className="text-text-secondary text-sm">/mo</span>
              </div>
              <p className="text-xs text-text-secondary mb-6">
                For businesses up to ₹10 Cr revenue
              </p>
              <a
                href="#"
                className="block text-center px-4 py-2.5 border border-navy text-navy text-sm font-medium rounded-full hover:bg-navy hover:text-white transition-colors mb-6"
              >
                Get started
              </a>
              <ul className="space-y-2.5 flex-1">
                {[
                  "Monthly bookkeeping",
                  "Bank reconciliation",
                  "GST return filing",
                  "TDS filing",
                  "P&L & Balance Sheet",
                  "Compliance calendar",
                  "Email support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* Growth */}
          <StaggerItem>
            <div className="bg-navy rounded-2xl p-8 text-white relative h-full flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-accent text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most popular
                </span>
              </div>
              <p className="text-xs text-white/60 uppercase tracking-widest mb-2">
                Growth
              </p>
              <div className="mb-1">
                <span className="text-4xl font-bold">₹19,999</span>
                <span className="text-white/60 text-sm">/mo</span>
              </div>
              <p className="text-xs text-white/60 mb-6">
                For businesses ₹10–30 Cr revenue
              </p>
              <a
                href="#"
                className="block text-center px-4 py-2.5 bg-white text-navy text-sm font-medium rounded-full hover:bg-white/90 transition-colors mb-6"
              >
                Get started
              </a>
              <ul className="space-y-2.5 flex-1">
                {[
                  "Everything in Starter",
                  "Income tax / ITR filing",
                  "ROC annual returns",
                  "Director KYC filing",
                  "MIS reports for founders",
                  "Dedicated CA assigned",
                  "Monthly review call",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* Scale */}
          <StaggerItem>
            <div className="bg-cream rounded-2xl p-8 border border-border h-full flex flex-col">
              <p className="text-xs text-text-secondary uppercase tracking-widest mb-2">
                Scale
              </p>
              <div className="mb-1">
                <span className="text-4xl font-bold text-navy">₹39,999</span>
                <span className="text-text-secondary text-sm">/mo</span>
              </div>
              <p className="text-xs text-text-secondary mb-6">
                For businesses ₹30–50 Cr revenue
              </p>
              <a
                href="#"
                className="block text-center px-4 py-2.5 border border-navy text-navy text-sm font-medium rounded-full hover:bg-navy hover:text-white transition-colors mb-6"
              >
                Get started
              </a>
              <ul className="space-y-2.5 flex-1">
                {[
                  "Everything in Growth",
                  "Virtual CFO advisory",
                  "Cash flow forecasting",
                  "Audit support & prep",
                  "Multi-entity support",
                  "Investor-ready reporting",
                  "Custom integrations",
                  "Dedicated Slack channel",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
