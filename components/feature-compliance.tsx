"use client";

import { CheckCircle2, Clock, ChevronRight } from "lucide-react";
import { FadeIn } from "./motion-wrapper";

export function FeatureCompliance() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <FadeIn direction="left">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-4 sm:p-6 overflow-hidden">
              <p className="text-sm font-medium text-navy mb-4">
                Compliance Calendar: April 2026
              </p>
              <div className="space-y-2">
                {[
                  { name: "GSTR-1 Filing", date: "Apr 11", status: "Filed", done: true },
                  { name: "PF/ESI Payment", date: "Apr 15", status: "Filed", done: true },
                  { name: "Advance Tax (Q4)", date: "Apr 15", status: "Filed", done: true },
                  { name: "GSTR-3B Filing", date: "Apr 20", status: "In progress", done: false },
                  { name: "TDS Return (Q4)", date: "Apr 30", status: "Preparing", done: false },
                  { name: "DIR-3 KYC", date: "Apr 30", status: "Scheduled", done: false },
                ].map((item) => (
                  <div
                    key={item.name}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      item.done ? "bg-green-50" : "bg-cream"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          item.done
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {item.done ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy">{item.name}</p>
                        <p className="text-xs text-text-secondary">{item.date}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-md ${
                        item.done
                          ? "text-green-700 bg-green-100"
                          : "text-orange-700 bg-orange-100"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right">
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-widest mb-3">
                Stress-free compliance
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4">
                No more last-minute
                <br />
                rushes to stay compliant
              </h3>
              <p className="text-text-secondary mb-3 leading-relaxed">
                All compliance needs tracked, prepared, and filed by our team
                automatically. Real-time reconciliation means no last-minute
                back and forth.
              </p>
              <p className="text-text-secondary mb-6 leading-relaxed">
                GST and TDS reconciliations are done continuously and
                updated in your books as they happen.
              </p>
              <div className="space-y-3 mb-4">
                {[
                  "GST returns: GSTR-1, GSTR-3B, annual",
                  "TDS deduction, deposit & quarterly filing",
                  "Income tax / ITR filing",
                  "ROC annual returns & Director KYC",
                  "PF & ESI compliance",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-text-secondary italic">
                ...everything to keep you compliant.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
