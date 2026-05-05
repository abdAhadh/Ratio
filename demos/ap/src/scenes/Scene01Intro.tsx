import React from 'react';
import { motion } from 'framer-motion';
import RatioLogo from '../components/RatioLogo';

export default function Scene01Intro() {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-96 h-96 rounded-full blur-3xl opacity-30 absolute -top-10 -left-20"
          style={{ background: 'rgba(184,140,50,0.18)' }} />
        <div className="w-80 h-80 rounded-full blur-3xl opacity-20 absolute bottom-10 right-10"
          style={{ background: 'rgba(74,108,247,0.10)' }} />
        <div className="w-64 h-64 rounded-full blur-3xl opacity-15 absolute top-20 right-32"
          style={{ background: 'rgba(184,140,50,0.07)' }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center px-8 gap-5">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2.5"
        >
          <RatioLogo size={32} />
          <span className="text-xl font-semibold text-[#1A1A2E] tracking-tight">Ratio</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide"
          style={{ background: 'rgba(26,26,46,0.05)', color: '#1A1A2E', border: '1px solid rgba(26,26,46,0.10)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#A87C28' }} />
          Built for the UAE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl font-semibold text-[#1A1A2E] tracking-tight leading-tight max-w-2xl"
        >
          Your AI Accounts Payable Agent.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg text-[#6B6B80] font-normal max-w-lg leading-relaxed"
        >
          AI agents that handle invoice intake, validation, approvals, payment, and reconciliation. End-to-end.
        </motion.p>
      </div>
    </div>
  );
}
