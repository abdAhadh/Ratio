export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="Ratio" className="w-8 h-8" />
              <span className="text-xl font-bold text-navy tracking-tight">
                Ratio
              </span>
            </a>
            <p className="text-sm text-text-secondary mt-2 max-w-xs">
              AI-native bookkeeping, reporting, and compliance for Indian MSMEs.
              From books to filing, fully handled.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-navy mb-3">Company</p>
            <ul className="space-y-2">
              {[
                { label: "How we compare", href: "#how-we-compare" },
                { label: "How it works", href: "#how-it-works" },
                { label: "Why us", href: "#why-us" },
                { label: "Testimonials", href: "#testimonials" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-navy transition-colors"
                  >
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
                { label: "Terms of Use", href: "/terms" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-navy transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            &copy; 2026 TidalPeak Labs Private Ltd. All rights reserved.
          </p>
          <p className="text-xs text-text-secondary">
            &#127470;&#127475; Made in India, for India.
          </p>
        </div>
      </div>
    </footer>
  );
}
