"use client";

import { Suspense } from "react";
import { useMarket, type Market } from "@/lib/use-market";

function FooterInner({ market }: { market?: Market }) {
  // If parent didn't pass a market, auto-detect from URL/cookie.
  const detected = useMarket();
  const m: Market = market ?? detected;
  const isAE = m === "ae";

  const companyLinks = isAE
    ? [
        { label: "Demo",     href: "/ae#demo" },
        { label: "Features", href: "/ae#features" },
        { label: "FAQs",     href: "/ae#faq" },
      ]
    : [
        { label: "Demo",     href: "/#demo/sales" },
        { label: "Features", href: "/#features" },
        { label: "FAQs",     href: "/#faq" },
      ];

  return (
    <footer className="border-t border-border py-10 md:py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-2">
            <a href={isAE ? "/ae" : "/"} className="flex items-center gap-2">
              <img src="/logo.svg" alt="Ratio" className="w-8 h-8" />
              <span className="text-xl font-bold text-navy tracking-tight">Ratio</span>
            </a>
            {!isAE && (
              <p className="text-sm text-text-secondary mt-2 max-w-xs">
                AI agents that sit on top of your ERP to automate finance ops.
                Built for India&apos;s growing firms.
              </p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-navy mb-3">Company</p>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-text-secondary hover:text-navy transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-navy mb-3">Legal</p>
            <ul className="space-y-2">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use",   href: "/terms" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-text-secondary hover:text-navy transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-secondary text-center sm:text-left">
            &copy; 2026 TidalPeak Labs Private Ltd. All rights reserved.
          </p>
          {!isAE && (
            <p className="text-xs text-text-secondary">
              &#127470;&#127475; Made in India, for India.
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}

export function Footer({ market }: { market?: Market }) {
  return (
    <Suspense fallback={null}>
      <FooterInner market={market} />
    </Suspense>
  );
}
