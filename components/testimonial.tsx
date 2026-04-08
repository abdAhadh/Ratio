"use client";

import { Star } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./motion-wrapper";

export function Testimonial() {
  return (
    <section id="testimonials" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <blockquote className="text-xl sm:text-2xl md:text-4xl font-bold text-navy leading-snug mb-8">
            &ldquo;Ratio replaced our bookkeeper, our CA&apos;s monthly chase, and our
            compliance anxiety. All in one platform.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
              <span className="text-sm font-bold text-navy">RK</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-navy">Rajesh Kumar</p>
              <p className="text-xs text-text-secondary">
                CFO, BuildRight Industries, ₹32 Cr revenue
              </p>
            </div>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 mt-14" staggerDelay={0.15}>
          {[
            {
              quote:
                "Our GST filings used to be a last-minute scramble. Now they're done a week before the deadline.",
              name: "Priya Sharma",
              role: "Founder, DesignStack",
            },
            {
              quote:
                "The AI catches things our old bookkeeper missed. Duplicate entries, wrong HSN codes, you name it.",
              name: "Amit Patel",
              role: "Director, TradeMax Exports",
            },
            {
              quote:
                "We switched from a full-time accountant to Ratio. Saving ₹4L/year and getting better accuracy.",
              name: "Sneha Reddy",
              role: "CEO, GrowthLabs",
            },
          ].map((t) => (
            <StaggerItem key={t.name}>
              <div className="bg-white rounded-2xl p-6 text-left border border-border h-full">
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-sm font-medium text-navy">{t.name}</p>
                <p className="text-xs text-text-secondary">{t.role}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
