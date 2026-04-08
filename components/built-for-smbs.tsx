"use client";

import { Zap, Users, Clock, ShieldCheck } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./motion-wrapper";

export function BuiltForSMBs() {
  return (
    <section id="why-us" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-navy">
              Why Startups and MSMEs trust us
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.12}>
          <StaggerItem>
            <div className="bg-cream rounded-2xl p-8 border border-border h-full">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-navy/5 rounded-xl shrink-0">
                  <Zap className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy mb-1">
                    AI first, CA reviewed
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    99% of the repetitive work is lifted by AI. Edge cases are
                    flagged and reviewed by CAs. Ensuring real-time, reconciled books.
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-cream rounded-2xl p-8 border border-border h-full">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-navy/5 rounded-xl shrink-0">
                  <Users className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy mb-1">
                    Integrates with your existing systems
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Ratio integrates with all sales and expense related systems,
                    including bank accounts to keep your books upto-date. You
                    don&apos;t need to buy or use another accounting tool when you
                    have Ratio.
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-cream rounded-2xl p-8 border border-border h-full">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-navy/5 rounded-xl shrink-0">
                  <Clock className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy mb-1">
                    Close books daily
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    What used to take 15 days now takes 1. AI handles the heavy
                    lifting so your books stay current, not catch-up.
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-cream rounded-2xl p-8 border border-border h-full">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-navy/5 rounded-xl shrink-0">
                  <ShieldCheck className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy mb-1">
                    Zero missed deadlines
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Automated compliance calendar with pre-filled returns. File
                    on time, every time.
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
