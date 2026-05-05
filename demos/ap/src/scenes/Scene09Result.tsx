import React from 'react';
import { motion } from 'framer-motion';
import RatioLogo from '../components/RatioLogo';

export default function Scene09Result() {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[480px] h-[480px] rounded-full blur-3xl opacity-30 absolute -top-24 -right-32"
          style={{ background: 'rgba(168,124,40,0.18)' }} />
        <div className="w-96 h-96 rounded-full blur-3xl opacity-20 absolute -bottom-20 -left-16"
          style={{ background: 'rgba(74,108,247,0.10)' }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center px-8 gap-5">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2.5"
        >
          <RatioLogo size={28} />
          <span className="text-base font-semibold text-[#1A1A2E] tracking-tight">Ratio</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-semibold text-[#1A1A2E] tracking-tight leading-tight max-w-2xl"
        >
          Every invoice handled.<br />Every record reconciled.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-base text-[#6B6B80] max-w-md leading-relaxed"
        >
          Built for the UAE. WhatsApp-native intake, FTA-aware validation, PDC lifecycle, and your existing ERP.
        </motion.p>

        <motion.a
          href="https://tryratio.io/demo"
          target="_self"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-full text-[13px] font-medium"
          style={{ background: '#1A1A2E', color: '#FBF7F1', textDecoration: 'none' }}
        >
          Request demo
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
}
