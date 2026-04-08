"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./motion-wrapper";

const testimonials = [
  {
    quote:
      "Our GST filings used to be a last-minute scramble. Now they're done a week before the deadline.",
    name: "Priya Sharma",
    role: "Founder, DesignStack",
    initials: "PS",
  },
  {
    quote:
      "The AI catches things our old bookkeeper missed. Duplicate entries, wrong HSN codes, you name it.",
    name: "Amit Patel",
    role: "Director, TradeMax Exports",
    initials: "AP",
  },
  {
    quote:
      "We switched from a full-time accountant to Ratio. Saving ₹4L/year and getting better accuracy.",
    name: "Sneha Reddy",
    role: "CEO, GrowthLabs",
    initials: "SR",
  },
  {
    quote:
      "Ratio gave us real-time visibility into our P&L. We no longer wait 15 days to know where we stand.",
    name: "Vikram Desai",
    role: "COO, FreshBasket",
    initials: "VD",
  },
  {
    quote:
      "The compliance calendar alone is worth it. Every filing tracked, every deadline met. No more penalties.",
    name: "Meera Iyer",
    role: "Finance Head, UrbanCraft",
    initials: "MI",
  },
  {
    quote:
      "Our bookkeeper used to take 10 days to reconcile. Ratio does it daily, automatically.",
    name: "Rahul Menon",
    role: "Founder, CloudKitchens Co.",
    initials: "RM",
  },
];

function TestimonialCard({ quote, name, role, initials }: {
  quote: string;
  name: string;
  role: string;
  initials: string;
}) {
  return (
    <div className="bg-white rounded-xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.08)] w-[340px] shrink-0 flex flex-col justify-between" style={{ minHeight: 200 }}>
      <p className="text-[15px] text-navy leading-relaxed mb-8">
        {quote}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center">
          <span className="text-xs font-bold text-navy">{initials}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-navy">{name}</p>
          <p className="text-xs text-text-secondary">{role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonial() {
  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-navy tracking-tight mb-4">
              Our customer reviews
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              Hear from Indian teams using Ratio to close their books daily
              and never miss a compliance deadline.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Sliding testimonial cards */}
      <div className="relative overflow-hidden w-full">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-cream to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-cream to-transparent z-10" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} {...t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
