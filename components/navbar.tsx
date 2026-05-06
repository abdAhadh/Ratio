"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Check } from "lucide-react";
import { usePathname } from "next/navigation";

const markets = [
  { id: "in", label: "India", flag: "🇮🇳", href: "/?market=in" },
  { id: "ae", label: "UAE",   flag: "🇦🇪", href: "/?market=ae" },
];

function getNavLinks(isAE: boolean) {
  return isAE
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
}

function setMarketCookie(market: string) {
  document.cookie = `market_preference=${market}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
}

function MarketSwitcher({ isAE }: { isAE: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = markets.find((m) => m.id === (isAE ? "ae" : "in"))!;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-border bg-white/60 hover:bg-white transition-colors text-sm font-medium text-navy"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-text-secondary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-36 bg-white border border-border rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] overflow-hidden z-50"
          >
            {markets.map((m) => (
              <a
                key={m.id}
                href={m.href}
                onClick={() => { setMarketCookie(m.id); setOpen(false); }}
                className="flex items-center justify-between px-4 py-2.5 text-sm text-navy hover:bg-cream transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span>{m.flag}</span>
                  <span>{m.label}</span>
                </span>
                {m.id === current.id && <Check className="w-3.5 h-3.5 text-navy" />}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const isAE = pathname === "/ae";
  const navLinks = getNavLinks(isAE);
  const current = markets.find((m) => m.id === (isAE ? "ae" : "in"))!;
  const { scrollY } = useScroll();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const shouldAnimate = !isMobile && scrolled;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <motion.nav
        className="flex items-center justify-between bg-cream/80 backdrop-blur-md"
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: shouldAnimate ? 12 : 0,
          opacity: 1,
          maxWidth: shouldAnimate ? 800 : 1440,
          borderRadius: shouldAnimate ? 9999 : 0,
          paddingTop: isMobile ? 14 : shouldAnimate ? 12 : 16,
          paddingBottom: isMobile ? 14 : shouldAnimate ? 12 : 16,
          paddingLeft: isMobile ? 20 : shouldAnimate ? 24 : 40,
          paddingRight: isMobile ? 20 : shouldAnimate ? 24 : 40,
          boxShadow: shouldAnimate
            ? "0 4px 24px rgba(0,0,0,0.08)"
            : "0 1px 0 rgba(0,0,0,0.04)",
        }}
        transition={{
          duration: isMobile ? 0 : 0.5,
          ease: [0.32, 0.72, 0, 1],
        }}
        style={{ width: "100%" }}
      >
        <a href={isAE ? "/ae" : "/"} className="flex items-center gap-2 shrink-0">
          <img src="/logo.svg" alt="Ratio" className="w-8 h-8" />
          <span className="text-xl font-bold text-navy tracking-tight">Ratio</span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-navy transition-colors whitespace-nowrap">
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop right: market switcher + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <MarketSwitcher isAE={isAE} />
          <a
            href="/demo"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-navy text-white text-base font-medium rounded-full whitespace-nowrap shrink-0 hover:bg-navy-light transition-colors"
          >
            Request Demo
          </a>
        </div>

        {/* Mobile right: hamburger only */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-9 h-9 text-navy"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[62px] md:hidden bg-cream backdrop-blur-lg border-b border-border shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-40"
          >
            <div className="flex flex-col px-6 py-5">
              {/* Nav links */}
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-navy py-3 border-b border-border/50"
                >
                  {link.label}
                </a>
              ))}

              {/* Region switcher — subtle inline selector */}
              <div className="pt-3 pb-1 flex items-center gap-1">
                {markets.map((m, i) => (
                  <span key={m.id} className="flex items-center gap-1">
                    {i > 0 && <span className="text-border text-sm select-none">·</span>}
                    <a
                      href={m.href}
                      onClick={() => { setMarketCookie(m.id); setMobileMenuOpen(false); }}
                      className={`flex items-center gap-1.5 px-2 py-1 text-sm transition-colors ${
                        m.id === current.id
                          ? "text-navy font-semibold border-b-2 border-navy"
                          : "text-text-secondary hover:text-navy border-b-2 border-transparent"
                      }`}
                    >
                      <span>{m.flag}</span>
                      <span>{m.label}</span>
                    </a>
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href="/demo"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-navy text-white text-base font-medium rounded-full hover:bg-navy-light transition-colors"
              >
                Request Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
