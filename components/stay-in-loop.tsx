"use client";

import { Play } from "lucide-react";
import { FadeIn } from "./motion-wrapper";

export function StayInLoop() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Stay in the loop
          </h2>
          <p className="text-text-secondary mb-8">
            Follow us for tips on compliance, tax planning, and building
            financially healthy businesses.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <a
              href="#"
              className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-border hover:border-navy/20 transition-colors"
            >
              <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">X</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-navy">X / Twitter</p>
                <p className="text-xs text-text-secondary">@ratiofinance</p>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-border hover:border-navy/20 transition-colors"
            >
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-navy">YouTube</p>
                <p className="text-xs text-text-secondary">Ratio Finance</p>
              </div>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
