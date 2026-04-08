"use client";

import { ArrowRight } from "lucide-react";
import { FadeIn } from "./motion-wrapper";

export function FinalCTA() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="bg-navy rounded-3xl px-6 py-12 sm:px-8 sm:py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Stay on top of your finances, finally.
            </h2>
            <p className="text-white/60 mb-12 max-w-xl mx-auto">
              Stop chasing your CAs to close your books and compliance. Let Ratio handle it proactively.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-navy font-medium rounded-full hover:bg-white/90 transition-colors text-lg"
            >
              Request Demo
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
