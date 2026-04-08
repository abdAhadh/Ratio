"use client";

import { motion } from "framer-motion";

const logos = [
  { src: "/logo-interact.svg", alt: "Interact AI", height: "h-5", width: "w-[110px]" },
  { src: "/logo-toonz.svg", alt: "Toonz", height: "h-7", width: "w-[50px]" },
  { src: "/logo-calry.svg", alt: "Calry by Onseason", height: "h-8", width: "w-[80px]" },
  { src: "/logo-soulathome.svg", alt: "Soul At Home", height: "h-4", width: "w-[130px]" },
  { src: "/logo-decawork.svg", alt: "Decawork", height: "h-4", width: "w-[110px]" },
];

export function LogoMarquee() {
  return (
    <div className="relative overflow-hidden w-full max-w-3xl mx-auto">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cream to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent z-10" />

      <motion.div
        className="flex items-center gap-14 opacity-50 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {/* Double the logos for seamless loop */}
        {[...logos, ...logos].map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            className={`${logo.height} ${logo.width} object-contain shrink-0`}
          />
        ))}
      </motion.div>
    </div>
  );
}
