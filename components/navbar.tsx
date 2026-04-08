"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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
          paddingTop: scrolled ? 10 : 16,
          paddingBottom: scrolled ? 10 : 16,
          paddingLeft: scrolled ? 20 : 40,
          paddingRight: scrolled ? 20 : 40,
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
          <motion.img
            src="/logo.svg"
            alt="Ratio"
            animate={{
              width: scrolled ? 24 : 32,
              height: scrolled ? 24 : 32,
            }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          />
          <motion.span
            className="font-bold text-navy tracking-tight"
            animate={{
              fontSize: scrolled ? "16px" : "20px",
            }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            Ratio
          </motion.span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
          {[
            { label: "How we compare", href: "#how-we-compare" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Testimonials", href: "#testimonials" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-navy transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        <motion.a
          href="#contact"
          className="inline-flex items-center gap-1.5 bg-navy text-white font-medium rounded-full whitespace-nowrap shrink-0"
          animate={{
            paddingLeft: scrolled ? 16 : 20,
            paddingRight: scrolled ? 16 : 20,
            paddingTop: scrolled ? 8 : 10,
            paddingBottom: scrolled ? 8 : 10,
            fontSize: scrolled ? "13px" : "16px",
          }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        >
          Request Demo
        </motion.a>
      </motion.nav>
    </div>
  );
}
