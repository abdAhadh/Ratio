"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { FadeIn } from "./motion-wrapper";

const testimonials = [
  {
    quote:
      "I ran on gut-feel financials for a year because my old CA and Zoho setup couldn't even get basic compliance right. Ratio gave me reconciled books every single day and let me spot unnecessary expenses just by asking a question on WhatsApp.",
    name: "Hersh Patel",
    role: "CEO, Soul at Home",
  },
  {
    quote:
      "Our CA firm took 10+ days to close books each month. I was flying blind on my finances. Ratio changed that completely. Never thought AI could be used in such a powerful way.",
    name: "Aman Raj",
    role: "CEO, DecaWork",
  },
  {
    quote:
      "We were always scrambling before GST deadlines. Now filings are done a week early, and I actually trust the numbers. The compliance tracking alone made the switch worth it.",
    name: "Suyash Karn",
    role: "Co-founder, Interact AI",
  },
  {
    quote:
      "Switched from a full-time bookkeeper to Ratio for our Indian entity. Better accuracy, real-time P&L visibility, and I stopped chasing people for updates. Everything is just there when I need it.",
    name: "Boris Pavlov",
    role: "CEO, Calry",
  },
  {
    quote:
      "Real-time reconciliation was a game changer for us. We went from waiting 15 days for a financial picture to having it updated daily, automatically. Discrepancies get flagged before they become problems.",
    name: "Karthik Kumar",
    role: "Director of Finance, Toonz",
  },
];

function TestimonialCard({
  quote,
  name,
  role,
  isHovered,
  onHover,
  onLeave,
}: {
  quote: string;
  name: string;
  role: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`bg-white rounded-xl p-7 w-[340px] shrink-0 flex flex-col justify-between transition-all duration-300 cursor-default ${
        isHovered
          ? "shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-navy/10"
          : "shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-transparent"
      }`}
      style={{ minHeight: 200 }}
    >
      <p className="text-[15px] text-navy leading-relaxed mb-8">{quote}</p>
      <div>
        <p className="text-sm font-semibold text-navy">{name}</p>
        <p className="text-xs text-text-secondary">{role}</p>
      </div>
    </div>
  );
}

function MarqueeTrack() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isPaused = hoveredIndex !== null;
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (isPaused) return;
    const speed = 0.05; // pixels per ms
    let newX = x.get() - delta * speed;

    // Reset when first set is fully scrolled
    if (trackRef.current) {
      const halfWidth = trackRef.current.scrollWidth / 2;
      if (Math.abs(newX) >= halfWidth) {
        newX += halfWidth;
      }
    }

    x.set(newX);
  });

  const allCards = [...testimonials, ...testimonials];

  return (
    <motion.div ref={trackRef} className="flex gap-6 w-max" style={{ x }}>
      {allCards.map((t, i) => (
        <TestimonialCard
          key={`${t.name}-${i}`}
          {...t}
          isHovered={hoveredIndex === i}
          onHover={() => setHoveredIndex(i)}
          onLeave={() => setHoveredIndex(null)}
        />
      ))}
    </motion.div>
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
      <div className="relative overflow-x-clip w-full py-4">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-cream to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-cream to-transparent z-10" />

        <MarqueeTrack />
      </div>
    </section>
  );
}
