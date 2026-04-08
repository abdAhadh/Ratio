"use client";

import { FileText } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./motion-wrapper";

export function Resources() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs text-text-secondary uppercase tracking-widest mb-4">
              Resources
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Ideas to level up
              <br />
              your finance game
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {[
            {
              tag: "Guide",
              title: "The MSME founder's guide to GST compliance in 2026",
              desc: "Everything you need to know about GSTR-1, GSTR-3B, and annual returns.",
            },
            {
              tag: "Playbook",
              title: "How to close your books in 3 days, not 15",
              desc: "A step-by-step playbook for faster monthly closes using AI + CA review.",
            },
            {
              tag: "Checklist",
              title: "ROC compliance checklist for private limited companies",
              desc: "Annual returns, DIR-3 KYC, board resolutions. Never miss a filing.",
            },
          ].map((post) => (
            <StaggerItem key={post.title}>
              <a
                href="#"
                className="group block bg-cream rounded-2xl overflow-hidden border border-border hover:border-navy/20 transition-colors h-full"
              >
                <div className="aspect-[16/10] bg-cream-dark flex items-center justify-center">
                  <FileText className="w-8 h-8 text-navy/20" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-accent">{post.tag}</span>
                  <h4 className="font-semibold text-navy mt-2 mb-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{post.desc}</p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
