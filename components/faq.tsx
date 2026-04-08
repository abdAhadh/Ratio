"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { FadeIn } from "./motion-wrapper";

const faqs = [
  {
    question: "Is Ratio a service or a software?",
    answer:
      "Both. We're an AI-native services firm. You care about outcomes like reconciled books, staying compliant, and filing taxes on time. We deliver that. A large chunk of the work is handled by our AI agents, with our in-house CAs stepping in for accuracy and oversight. You interact with our software for things like expense filing and reports, while a dedicated CA from our team keeps a tab on your finances.",
  },
  {
    question: "Do I need to replace my existing accounting software?",
    answer:
      "No. Ratio integrates with Tally, Zoho Books, and other tools you already use. That said, most customers find themselves interacting with our AI agents and software far more than their old accounting system. We recommend keeping your existing setup as a data backup, while our AI agents and accounting layer, synced with your system, handle the heavy lifting.",
  },
  {
    question: "Can you integrate with our systems?",
    answer:
      "Yes. We're built to add integrations fast, usually under a week. If API access is available, we plug right in. If not, our AI agents use Computer Use to access your tools directly through the browser, just like a human would. Either way, we figure this out on the first discovery call so there are no surprises.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "Regardless of where your integrations stand, we fully onboard you and start handling your books within 1 week. We're working hard to bring that down even further.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes. All data is encrypted and stored on Indian servers, fully compliant with RBI data localization norms, CERT-In guidelines, and the DPDP Act 2023. We treat your financial data with the same seriousness a bank would.",
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
