"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { FadeIn } from "./motion-wrapper";

const faqs = [
  {
    question: "Do I need to replace my existing accounting software?",
    answer:
      "No. Ratio integrates with Tally, Zoho Books, and other tools you already use. We sit on top of your existing stack. No migration, no rip-and-replace.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "Most teams are fully onboarded within a week. We handle the integrations, import your historical data, and start reconciling from day one.",
  },
  {
    question: "What happens to my data? Is it secure?",
    answer:
      "All financial data is encrypted and stored on Indian servers in compliance with RBI data localization norms. We follow CERT-In guidelines and are fully compliant with the DPDP Act 2023.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-base font-medium text-navy pr-4">
          {question}
        </span>
        {isOpen ? (
          <X className="w-5 h-5 text-text-secondary shrink-0" />
        ) : (
          <Plus className="w-5 h-5 text-text-secondary shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-5 -mt-1">
          <p className="text-sm text-text-secondary leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-20 px-6">
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
              Everything you need to know before getting started.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
