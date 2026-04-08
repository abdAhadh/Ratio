"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Why us", href: "#how-we-compare" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQs", href: "#faqs" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <motion.nav
        className="flex items-center justify-between bg-cream/80 backdrop-blur-md"
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: scrolled ? 12 : 0,
          opacity: 1,
          maxWidth: scrolled ? 720 : 1440,
          borderRadius: scrolled ? 9999 : 0,
          paddingTop: scrolled ? 12 : 16,
          paddingBottom: scrolled ? 12 : 16,
          paddingLeft: scrolled ? 24 : 40,
          paddingRight: scrolled ? 24 : 40,
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.08)"
            : "0 1px 0 rgba(0,0,0,0.04)",
        }}
        transition={{
          duration: 0.5,
          ease: [0.32, 0.72, 0, 1],
        }}
        style={{ width: "100%" }}
      >
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.svg" alt="Ratio" className="w-8 h-8" />
          <span className="text-xl font-bold text-navy tracking-tight">
            Ratio
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-navy transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 bg-navy text-white text-base font-medium rounded-full whitespace-nowrap shrink-0 hover:bg-navy-light transition-colors"
        >
          Request Demo
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 text-navy"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
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
            className="fixed inset-x-0 top-[72px] md:hidden bg-cream/95 backdrop-blur-lg border-t border-border z-40"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-navy py-3 border-b border-border/50 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center px-6 py-3.5 bg-navy text-white text-base font-medium rounded-full hover:bg-navy-light transition-colors"
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
