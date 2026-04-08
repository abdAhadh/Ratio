"use client";

import {
  ArrowRight,
  Zap,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { FadeIn, ScaleIn } from "./motion-wrapper";

export function Hero() {
  return (
    <section className="pt-36 md:pt-40 pb-24 md:pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1.3fr_0.7fr] gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left — Copy */}
          <div>
            <FadeIn delay={0.2}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/5 text-navy text-xs font-medium rounded-full mb-6 border border-navy/10">
                <Zap className="w-3 h-3" />
                Powered by AI, reviewed by CAs
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold text-navy leading-[1.1] tracking-tight mb-3">
                Your books, taxes, and compliance.
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] font-medium text-text-secondary leading-snug mb-6">
                Fully handled without you lifting a finger.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-lg mb-8">
                AI-native bookkeeping, reporting, and compliance firm for Indian MSMEs.
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-medium rounded-full hover:bg-navy-light transition-colors"
              >
                Request Demo
                <ArrowRight className="w-4 h-4" />
              </a>
            </FadeIn>
          </div>

          {/* Right — Dashboard mockup */}
          <ScaleIn delay={0.4}>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.08)] border border-border overflow-hidden">
                {/* Thin URL bar */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border bg-cream/30">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-300" />
                    <div className="w-2 h-2 rounded-full bg-yellow-300" />
                    <div className="w-2 h-2 rounded-full bg-green-300" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-3 py-0.5 bg-cream rounded text-[9px] text-text-secondary">
                      app.ratio.in
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  {/* 4 compact stat boxes */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      { label: "Revenue", value: "₹2.4 Cr", change: "+12%" },
                      { label: "Expenses", value: "₹1.1 Cr", change: "-3%" },
                      { label: "GST Payable", value: "₹18.2L", change: "Due Apr 20" },
                      { label: "Compliance", value: "98%", change: "All clear" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-cream/60 rounded-lg p-2 border border-border"
                      >
                        <p className="text-[9px] text-text-secondary">{stat.label}</p>
                        <p className="text-sm font-bold text-navy">{stat.value}</p>
                        <p className="text-[9px] text-green-600">{stat.change}</p>
                      </div>
                    ))}
                  </div>
                  {/* Chart + Filings */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-cream/40 rounded-lg p-2 border border-border h-28 flex items-end gap-0.5">
                      {[55, 65, 50, 70, 60, 75, 68, 80].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-navy/10 rounded-t-sm"
                          style={{ height: `${h}%` }}
                        >
                          <div
                            className="w-full bg-navy rounded-t-sm"
                            style={{ height: `${60 + i * 4}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="bg-cream/40 rounded-lg p-3 border border-border">
                      <p className="text-[10px] font-medium text-navy mb-2">Upcoming Filings</p>
                      <table className="w-full">
                        <tbody>
                          {[
                            { name: "GSTR-3B", date: "Apr 20", done: false },
                            { name: "TDS", date: "Apr 30", done: false },
                            { name: "GSTR-1", date: "Apr 11", done: true },
                          ].map((item) => (
                            <tr key={item.name}>
                              <td className="py-1 pr-1 w-4">
                                <div
                                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                                    item.done
                                      ? "bg-green-100 text-green-600"
                                      : "bg-orange-100 text-orange-600"
                                  }`}
                                >
                                  {item.done ? (
                                    <CheckCircle2 className="w-2.5 h-2.5" />
                                  ) : (
                                    <Clock className="w-2.5 h-2.5" />
                                  )}
                                </div>
                              </td>
                              <td className="py-1 text-[10px] text-text-secondary">{item.name}</td>
                              <td className="py-1 text-[10px] text-text-secondary text-right">{item.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>

        {/* Logos */}
        <FadeIn delay={0.8}>
          <div className="mt-28 text-center">
            <p className="text-xs text-text-secondary uppercase tracking-widest mb-6">
              Trusted by leading Indian MSMEs
            </p>
            <div className="flex items-center justify-center gap-10 sm:gap-14 opacity-50 flex-wrap">
              <img src="/logo-calry.svg" alt="Calry by Onseason" className="h-8 w-auto" />
              <img src="/logo-soulathome.svg" alt="Soul At Home" className="h-5 w-auto" />
              <img src="/logo-decawork.svg" alt="Decawork" className="h-5 w-auto" />
              <img src="/logo-interact.svg" alt="Interact AI" className="h-5 w-auto" />
              <img src="/logo-toonz.svg" alt="Toonz" className="h-6 w-auto" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
