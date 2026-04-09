"use client";

import { useState } from "react";
import { Zap, Users, CheckCircle2 } from "lucide-react";
import { FadeIn } from "./motion-wrapper";

const categories = [
  {
    label: "D2C Brands",
    logos: [
      { src: "/icon-amazon.svg", alt: "Amazon", h: "h-5" },
      { src: "/icon-shopify.svg", alt: "Shopify", h: "h-5" },
      { src: "/icon-urbanmerce.svg", alt: "Unicommerce", h: "h-5" },
      { src: "/icon-hdfc.svg", alt: "HDFC Bank", h: "h-6" },
      { src: "/icon-razorpay.svg", alt: "Razorpay", h: "h-4" },
    ],
  },
  {
    label: "Restaurants",
    logos: [
      { src: "/icon-swiggy.svg", alt: "Swiggy", h: "h-5" },
      { src: "/icon-zomato.svg", alt: "Zomato", h: "h-4" },
      { src: "/icon-petpooja.svg", alt: "PetPooja", h: "h-4" },
      { src: "/icon-icici.svg", alt: "ICICI Bank", h: "h-5" },
      { src: "/icon-upi.svg", alt: "UPI", h: "h-4" },
    ],
  },
  {
    label: "Hotels",
    logos: [
      { src: "/icon-booking.svg", alt: "Booking.com", h: "h-4" },
      { src: "/icon-makemytrip.svg", alt: "MakeMyTrip", h: "h-5" },
      { src: "/icon-oracle.png", alt: "Oracle", h: "h-4" },
      { src: "/icon-axisbank.svg", alt: "Axis Bank", h: "h-5" },
      { src: "/icon-yanolja.svg", alt: "Yanolja", h: "h-5" },
    ],
  },
  {
    label: "",
    logos: [],
  },
];

function BookkeepingCard() {
  const [activeTab, setActiveTab] = useState(0);
  const activeLogos = categories[activeTab].logos;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border p-3 sm:p-4 overflow-hidden" style={{ minHeight: 380 }}>
      {/* Category tabs */}
      <div className="flex items-center gap-2 mb-3 overflow-x-auto">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => i < 3 && setActiveTab(i)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              i === 3
                ? "text-text-secondary/30 cursor-default"
                : i === activeTab
                ? "bg-navy text-white"
                : "bg-cream text-text-secondary hover:bg-cream-dark"
            }`}
          >
            {i === 3 ? "More..." : cat.label}
          </button>
        ))}
      </div>

      {/* Preload all tab logos so switching is instant */}
      <div className="hidden">
        {categories.flatMap((cat) => cat.logos).map((logo) => (
          <img key={logo.src} src={logo.src} alt="" />
        ))}
      </div>

      {/* Integration logos */}
      <div className="flex items-center gap-4 px-2 py-2.5 mb-3 bg-cream/50 rounded-lg h-[36px]">
        {activeLogos.length > 0 ? (
          activeLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className={`${logo.h} w-auto max-w-[72px] opacity-70 shrink-0 object-contain`}
            />
          ))
        ) : (
          <p className="text-[10px] text-text-secondary italic col-span-5">Coming soon</p>
        )}
      </div>

      {/* Card content */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between p-2.5 bg-cream rounded-lg">
          <div>
            <p className="text-xs font-medium text-navy">Invoices</p>
            <p className="text-[10px] text-text-secondary">Auto-categorized</p>
          </div>
          <span className="text-xs font-bold text-navy">₹14.2L</span>
        </div>
        <div className="flex items-center justify-between p-2.5 bg-cream rounded-lg">
          <div>
            <p className="text-xs font-medium text-navy">Expenses</p>
            <p className="text-[10px] text-text-secondary">Bank-synced</p>
          </div>
          <span className="text-xs font-bold text-navy">₹8.7L</span>
        </div>
        <div className="flex items-center justify-between p-2.5 bg-cream rounded-lg">
          <div>
            <p className="text-xs font-medium text-navy">Reconciliation</p>
            <p className="text-[10px] text-text-secondary">98% matched</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-20 h-1.5 bg-cream-darker rounded-full overflow-hidden">
              <div className="w-[98%] h-full bg-green-500 rounded-full" />
            </div>
            <span className="text-[10px] text-green-600">98%</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-2.5 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            <p className="text-xs font-medium text-green-800">Books up to date</p>
          </div>
          <span className="text-[10px] text-green-600">As of today</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-3 text-[10px] text-text-secondary">
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3" /> AI-powered
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3" /> CA-reviewed
        </span>
      </div>
    </div>
  );
}

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
            <BookkeepingCard />
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
