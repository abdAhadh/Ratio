"use client";

import { Play } from "lucide-react";
import { FadeIn, ScaleIn } from "./motion-wrapper";

export function VisualBreak() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-xs text-text-secondary uppercase tracking-widest text-center mb-4">
            One platform, full loop
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            From books to filing,
            <br />
            stay in control
          </h2>
        </FadeIn>
        <ScaleIn>
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden bg-navy aspect-video flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-colors">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
              <p className="text-white/60 text-sm">Watch how Ratio works</p>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
