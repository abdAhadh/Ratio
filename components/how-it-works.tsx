"use client";

import { BookOpen, Zap, BarChart3, FileText } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./motion-wrapper";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs text-text-secondary uppercase tracking-widest mb-4">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Four steps to financial peace of mind
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-4 gap-6" staggerDelay={0.15}>
          {[
            {
              step: "01",
              icon: <BookOpen className="w-5 h-5" />,
              title: "Connect",
              desc: "Link your bank accounts, Tally, or upload your data. Takes 10 minutes.",
            },
            {
              step: "02",
              icon: <Zap className="w-5 h-5" />,
              title: "We process",
              desc: "AI categorizes transactions, reconciles accounts, and flags anomalies.",
            },
            {
              step: "03",
              icon: <BarChart3 className="w-5 h-5" />,
              title: "You review",
              desc: "Monthly reports delivered. Discuss with your dedicated CA on a call.",
            },
            {
              step: "04",
              icon: <FileText className="w-5 h-5" />,
              title: "We file",
              desc: "GST, TDS, ITR, ROC. All prepared and filed on time. You just approve.",
            },
          ].map((s) => (
            <StaggerItem key={s.step}>
              <div className="bg-white rounded-2xl p-6 border border-border h-full">
                <span className="text-xs font-bold text-accent mb-3 block">{s.step}</span>
                <div className="p-2 bg-cream rounded-xl w-fit mb-3">{s.icon}</div>
                <h4 className="font-semibold text-navy mb-2">{s.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
