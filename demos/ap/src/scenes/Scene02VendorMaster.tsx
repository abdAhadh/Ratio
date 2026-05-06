import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppShell from '../components/AppShell';
import PdfViewer from '../components/PdfViewer';
import TradeLicenceDoc from '../components/TradeLicenceDoc';
import IbanCertificateDoc from '../components/IbanCertificateDoc';
import RatioLogo from '../components/RatioLogo';

// Scene 2 - Vendor onboarding (21s) - frictionless WhatsApp collection
//   Phase A (0–3.8s):    Customer adds vendor (WhatsApp # primary, email optional)
//   Phase B (3.8–9s):    Phone overlay - Ratio reaches out, vendor uploads 2 PDFs
//   Phase C (9–16s):     Ratio UI - docs ingested, validation runs, cursor clicks Accept
//   Phase D (16–21s):    WhatsApp-only screen - "Onboarding complete" → "Invoice raised"

const T = {
  PHASE_A_END: 3800,

  WA_RATIO_MSG: 4400,
  WA_RATIO_LIST: 5100,
  WA_TYPING:    5900,
  WA_PDF1:      6500,
  WA_PDF2:      7100,
  WA_ACK:       7800,

  PHASE_C_START: 9000,
  DETAILS_FORM:  9200,
  STEP1_SHOW:    9700,   // Trade licence + IBAN collected
  STEP1_DONE:   10300,
  DOC_SWITCH:   10500,   // right rail: chevron pressed → IBAN cert
  STEP2_SHOW:   10700,   // Vendor onboarded + periodic checks
  STEP2_DONE:   11300,
  STEP3_SHOW:   11500,   // Compliance checks (continuous)
  STEP3_TRN:    11700,
  STEP3_IBAN:   12000,
  STEP3_SANCT:  12300,
  CURSOR_IN:    13000,   // cursor enters from below-left
  CURSOR_AT:    14400,   // cursor lands on Accept (1.4s slow travel)
  CURSOR_CLICK: 14800,   // click happens
  ACCEPTED:     15100,   // button flips to Accepted
  PHASE_D_START: 16000,    // WhatsApp + status panel screen begins

  WD_PHONE_IN:    16100,
  WD_PANEL_IN:    16300,
  WD_RATIO_INTRO: 16700,   // Ratio: "✓ You're verified..." (in chat)
  WD_VENDOR_TYPING: 17900, // Vendor "typing..." indicator
  WD_VENDOR_PDF:  18800,   // Vendor sends INV-2025-00428.pdf
  WD_INVOICE_DONE: 19500,  // Status panel "Invoice raised" flips to ✓
  WD_RATIO_ACK:   20100,   // Ratio acknowledges in chat
};

export default function Scene02VendorMaster({ t }: { t: number }) {
  const past = (ms: number) => t >= ms;

  const inPhaseA = t < T.PHASE_A_END + 200;
  const inPhaseB = t >= T.PHASE_A_END && t < T.PHASE_C_START;
  const inPhaseC = t >= T.PHASE_C_START && t < T.PHASE_D_START;
  const inPhaseD = t >= T.PHASE_D_START;
  // Hide AppShell during both WhatsApp phases (B and D)
  const showAppShell = !inPhaseB && !inPhaseD;

  return (
    <div className="flex-1 flex relative" style={{ background: '#FBF7F1' }}>
      {/* AppShell visible during Phase A & C only. Hidden in WhatsApp phases (B & D). */}
      <motion.div
        animate={{ opacity: showAppShell ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 flex"
        style={{ pointerEvents: showAppShell ? 'auto' : 'none' }}
      >
      <AppShell
        activeNav="vendors"
        topTabs={[
          { label: 'All vendors', count: 287 },
          { label: 'Onboarding',  count: 1, active: true },
          { label: 'Pending review', count: 4 },
          { label: 'Suspended',   count: 2 },
        ]}
        contentPadding={false}
        rightPanel={inPhaseC ? (() => {
          const docIndex = past(T.DOC_SWITCH) ? 1 : 0;
          const docs = [
            { name: 'Trade licence',    file: 'trade-licence-1208342.pdf' },
            { name: 'IBAN certificate', file: 'IBAN-certificate-AlNoor.pdf' },
          ];
          const doc = docs[docIndex];
          // Right-chevron is "pressed" briefly to imply a click that switches docs
          const pressing = t >= T.DOC_SWITCH - 280 && t < T.DOC_SWITCH + 60;
          return (
            <div className="h-full flex flex-col" style={{ background: '#F3EDE4' }}>
              {/* Doc nav header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E5E0D8] bg-white flex-shrink-0">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold">Document {docIndex + 1} of 2</div>
                  <div className="text-[12.5px] font-semibold text-[#1A1A2E] truncate">{doc.name}</div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    disabled={docIndex === 0}
                    className="w-7 h-7 rounded-md border flex items-center justify-center"
                    style={{
                      borderColor: '#E5E0D8',
                      background: 'white',
                      opacity: docIndex === 0 ? 0.4 : 1,
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18l-6-6 6-6" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <motion.button
                    disabled={docIndex === 1}
                    animate={{
                      scale: pressing ? 0.88 : 1,
                      background: pressing ? '#1A1A2E' : 'white',
                      borderColor: pressing ? '#1A1A2E' : '#E5E0D8',
                    }}
                    transition={{ duration: 0.18 }}
                    className="w-7 h-7 rounded-md border flex items-center justify-center relative"
                    style={{ opacity: docIndex === 1 ? 0.4 : 1 }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6l6 6-6 6" stroke={pressing ? 'white' : '#1A1A2E'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {/* Click ripple */}
                    <AnimatePresence>
                      {pressing && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0.6 }}
                          animate={{ scale: 2.4, opacity: 0 }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className="absolute inset-0 rounded-md"
                          style={{ background: 'rgba(168,124,40,0.5)' }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>

              {/* Filename / context line */}
              <div className="px-4 py-1.5 text-[10px] text-[#6B6B80] font-mono truncate flex-shrink-0">
                {doc.file}
              </div>

              {/* PDF viewer - full doc, transitions on switch */}
              <div className="flex-1 flex items-center justify-center px-3 pb-3 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={docIndex}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <PdfViewer filename={doc.file} pages={1} width={420} height={580}>
                      {docIndex === 0 ? <TradeLicenceDoc /> : <IbanCertificateDoc />}
                    </PdfViewer>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Pagination dots */}
              <div className="flex items-center justify-center gap-1.5 pb-2.5 flex-shrink-0">
                {docs.map((_, i) => (
                  <motion.span key={i}
                    animate={{
                      width: i === docIndex ? 18 : 6,
                      background: i === docIndex ? '#1A1A2E' : '#D8D2C5',
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-1.5 rounded-full"
                  />
                ))}
              </div>
            </div>
          );
        })() : null}
      >
        <AnimatePresence mode="wait">
          {!inPhaseC ? (
            // ── Phase A: Add vendor form ──────────────────────────────────
            <motion.div
              key="addvendor"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full overflow-hidden bg-white"
            >
              <div className="px-5 pt-4 pb-3 border-b border-[#E5E0D8] flex items-center gap-3">
                <button className="text-[#6B6B80]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold">Onboarding</div>
                  <div className="text-[15px] font-semibold text-[#1A1A2E]">Add a new vendor</div>
                </div>
              </div>

              <div className="p-6 max-w-xl">
                {/* AI agent banner */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="rounded-md px-3 py-2 mb-4 flex items-center gap-2 text-[11px]"
                  style={{ background: '#FDF6E8', border: '1px solid #F0E0B8', color: '#7A5C1F' }}
                >
                  <span style={{ fontSize: 13 }}>✦</span>
                  <span className="font-medium">Ratio's AI agent will reach out on WhatsApp and collect everything else.</span>
                </motion.div>

                {/* Vendor name (optional) */}
                <div className="mb-3.5">
                  <label className="block text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold mb-1.5">
                    Vendor name <span className="text-[#999] font-normal normal-case tracking-normal">· optional, agent will fill from licence</span>
                  </label>
                  <div className="rounded-md border border-[#E5E0D8] px-3 py-2 text-[12px] text-[#999]">
                    e.g. Al Noor Trading
                  </div>
                </div>

                {/* WhatsApp number - primary, focused */}
                <div className="mb-3.5">
                  <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#1A1A2E] font-semibold mb-1.5">
                    <span>WhatsApp number</span>
                    <span className="text-[#999] font-normal normal-case tracking-normal">· required</span>
                  </label>
                  <motion.div
                    initial={false}
                    animate={{
                      borderColor: past(800) ? '#1A1A2E' : '#E5E0D8',
                      boxShadow: past(800) ? '0 0 0 3px rgba(26,26,46,0.08)' : 'none',
                    }}
                    transition={{ duration: 0.3 }}
                    className="rounded-md border px-3 py-2 flex items-center gap-2 bg-white"
                  >
                    <div className="flex items-center gap-1.5 text-[12px] text-[#1A1A2E] font-medium border-r border-[#E5E0D8] pr-2">
                      <span>🇦🇪</span>
                      <span>+971</span>
                    </div>
                    <span className="text-[12px] text-[#1A1A2E] font-mono">
                      55 248 9320
                      <motion.span
                        animate={{ opacity: past(800) && t < T.PHASE_A_END ? [1, 0, 1] : 0 }}
                        transition={{ duration: 0.9, repeat: Infinity }}
                        className="inline-block w-[1px] h-3 ml-0.5"
                        style={{ background: '#1A1A2E' }}
                      />
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold"
                      style={{ background: '#EBFAF3', color: '#1EA672', border: '1px solid #C3E8D5' }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke="#1EA672" strokeWidth="1.4" />
                        <path d="M3 6.5l2 2 4-4" stroke="#1EA672" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      WA verified
                    </span>
                  </motion.div>
                </div>

                {/* Email - optional */}
                <div className="mb-5">
                  <label className="block text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold mb-1.5">
                    Email <span className="text-[#999] font-normal normal-case tracking-normal">· optional</span>
                  </label>
                  <div className="rounded-md border border-[#E5E0D8] px-3 py-2 text-[12px] text-[#999]">
                    fallback if vendor doesn't reply on WhatsApp
                  </div>
                </div>

                {/* Send invite button */}
                <motion.button
                  animate={{
                    scale: past(2400) && past(2200) && t < 2700 ? 0.95 : 1,
                    background: past(2700) ? '#1EA672' : '#1A1A2E',
                  }}
                  transition={{ duration: 0.18 }}
                  className="w-full py-2.5 rounded-md text-[12px] font-semibold text-white flex items-center justify-center gap-2"
                >
                  {past(2700) ? '✓ Invite sent on WhatsApp' : 'Send onboarding invite →'}
                </motion.button>
                <div className="mt-2 text-[10.5px] text-[#6B6B80] text-center">
                  Vendor receives a conversational message · responds with two PDFs · Ratio handles the rest.
                </div>
              </div>
            </motion.div>
          ) : (
            // ── Phase C: Vendor details + thinking-step actions + accept ─────────
            <motion.div
              key="received"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="h-full overflow-hidden bg-white relative flex flex-col"
            >
              {/* Header */}
              <div className="px-5 pt-4 pb-3 border-b border-[#E5E0D8] flex items-center gap-3 flex-shrink-0">
                <button className="text-[#6B6B80]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold">Onboarding · auto-collected</div>
                  <div className="text-[15px] font-semibold text-[#1A1A2E]">Al Noor Trading L.L.C.</div>
                </div>
                <AnimatePresence>
                  {past(T.ACCEPTED) && (
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className="px-2.5 py-1 rounded-md text-[10.5px] font-semibold flex items-center gap-1.5"
                      style={{ background: '#EBFAF3', color: '#1EA672', border: '1px solid #C3E8D5' }}
                    >
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#1EA672" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Vendor accepted
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-auto" style={{ paddingBottom: 70 }}>
                {/* Vendor Details - Mysa-style clean inputs (no colour, no highlight) */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: past(T.DETAILS_FORM) ? 1 : 0, y: past(T.DETAILS_FORM) ? 0 : 6 }}
                  transition={{ duration: 0.35 }}
                  className="px-5 py-4"
                >
                  <div className="text-[13px] font-semibold text-[#1A1A2E] mb-2.5">Vendor details</div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {/* Vendor Name */}
                    <div>
                      <label className="block text-[10px] text-[#6B6B80] mb-1">Vendor name</label>
                      <div className="rounded-md border border-[#E5E0D8] bg-white px-3 py-2 flex items-center gap-2">
                        <span className="flex-1 text-[12px] text-[#1A1A2E] font-medium truncate">Al Noor Trading L.L.C.</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M6 9l6 6 6-6" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    {/* Bank Detail */}
                    <div>
                      <label className="block text-[10px] text-[#6B6B80] mb-1">Bank detail</label>
                      <div className="rounded-md border border-[#E5E0D8] bg-white px-3 py-2 flex items-center gap-2">
                        <span className="flex-1 text-[12px] text-[#1A1A2E] font-medium truncate">Mashreq Bank · AE07 ·· 8901</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="9" fill="#3897F0" />
                          <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M6 9l6 6 6-6" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Three additional fields - separate boxes, same style as the row above */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-[#6B6B80] mb-1">Vendor TRN</label>
                      <div className="rounded-md border border-[#E5E0D8] bg-white px-3 py-2">
                        <span className="text-[12px] text-[#1A1A2E] font-mono">100xxxxxxxxxxx03</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#6B6B80] mb-1">Source of supply</label>
                      <div className="rounded-md border border-[#E5E0D8] bg-white px-3 py-2">
                        <span className="text-[12px] text-[#1A1A2E] font-medium">Dubai, UAE</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#6B6B80] mb-1">Trade licence</label>
                      <div className="rounded-md border border-[#E5E0D8] bg-white px-3 py-2">
                        <span className="text-[12px] text-[#1A1A2E] font-mono">DED 1208342</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Thinking-step actions - no boxes, generous spacing between groups */}
                <div className="px-5 pb-4">
                  <div className="text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold mb-3.5">Action steps</div>
                  <div className="space-y-6">
                    <ThinkingStep
                      visible={past(T.STEP1_SHOW)}
                      done={past(T.STEP1_DONE)}
                      label="Trade licence and IBAN certificate collected over WhatsApp"
                      subItems={[
                        { kind: 'pdf', text: 'trade-licence-1208342.pdf', meta: 'Commercial Licence' },
                        { kind: 'pdf', text: 'IBAN-certificate-AlNoor.pdf', meta: 'Mashreq Bank' },
                      ]}
                    />
                    <ThinkingStep
                      visible={past(T.STEP2_SHOW)}
                      done={past(T.STEP2_DONE)}
                      label="Vendor onboarded"
                      subItems={[
                        { kind: 'check', text: 'Active in master, vendor live', meta: 'Ratio' },
                        { kind: 'check', text: 'Periodic re-checks scheduled for TRN, sanctions, licence expiry', meta: 'daily' },
                      ]}
                    />
                    <ThinkingStep
                      visible={past(T.STEP3_SHOW)}
                      done={past(T.STEP3_SANCT)}
                      label="Compliance checks (continuous)"
                      tightSubs
                      subItems={[
                        { kind: 'check', text: 'TRN verified on FTA EmaraTax', meta: '100xxxxxxxxxxx03 · Active', visible: past(T.STEP3_TRN) },
                        { kind: 'check', text: 'IBAN matched against legal name', meta: 'Mashreq · AE07 0330 · 8901', visible: past(T.STEP3_IBAN) },
                        { kind: 'check', text: 'Sanctions screened', meta: 'UN · OFAC · EU · UK · UAE Local · Clear', visible: past(T.STEP3_SANCT) },
                      ]}
                    />
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </AppShell>
      </motion.div>

      {/* Phase B: WhatsApp phone - centered alone on cream canvas */}
      <AnimatePresence>
        {inPhaseB && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-50 flex items-center justify-center pb-20 pointer-events-none"
          >
              <div className="rounded-[40px] bg-[#1A1A2E] p-2.5 shadow-2xl" style={{ width: 290, height: 560 }}>
                <div className="rounded-[32px] bg-white h-full overflow-hidden flex flex-col relative">
                  {/* Status bar */}
                  <div className="h-7 px-5 flex items-center justify-between text-[10.5px] font-semibold text-[#1A1A2E] flex-shrink-0" style={{ background: '#FBF7F1' }}>
                    <span>9:14</span>
                    <span className="text-[8.5px]">5G</span>
                  </div>
                  {/* WA header */}
                  <div className="flex items-center gap-2 px-3 py-2.5 text-white flex-shrink-0" style={{ background: '#075E54' }}>
                    <button className="text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                    {/* Ratio avatar */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                      style={{ background: '#1A1A2E' }}>
                      <RatioLogo size={28} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] font-semibold truncate">Ratio AI</span>
                        <span className="text-[9px] px-1 rounded" style={{ background: 'rgba(255,255,255,0.18)' }}>VERIFIED</span>
                      </div>
                      <div className="text-[9.5px] text-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />typically replies in seconds
                      </div>
                    </div>
                  </div>

                  {/* Convo body */}
                  <div className="flex-1 flex flex-col justify-end px-2.5 py-2.5 gap-1.5 min-h-0 overflow-hidden" style={{ background: '#ECE5DD' }}>
                    {/* Date stamp */}
                    <AnimatePresence>
                      {past(T.WA_RATIO_MSG) && (
                        <motion.div
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="self-center px-2 py-0.5 rounded text-[8.5px] text-gray-700 font-medium"
                          style={{ background: '#FFF5C2' }}
                        >
                          Today
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Ratio's intro message */}
                    <AnimatePresence>
                      {past(T.WA_RATIO_MSG) && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="self-start max-w-[88%] rounded-xl rounded-tl-sm bg-white px-2.5 py-2 shadow-sm"
                        >
                          <p className="text-[10.5px] text-gray-800 leading-relaxed">
                            Hi 👋 I'm <strong>Ratio</strong>, an AI agent helping <strong>Sahara Holdings</strong> onboard you as a vendor.
                          </p>
                          <div className="flex justify-end mt-0.5"><span className="text-[8.5px] text-gray-400">10:14 AM</span></div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Ratio's request - list message */}
                    <AnimatePresence>
                      {past(T.WA_RATIO_LIST) && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="self-start max-w-[88%] rounded-xl rounded-tl-sm bg-white px-2.5 py-2 shadow-sm"
                        >
                          <p className="text-[10.5px] text-gray-800 leading-relaxed">
                            Could you share two PDFs?
                          </p>
                          <div className="mt-1.5 flex flex-col gap-1 text-[10.5px] text-gray-800">
                            <div>1) <strong>Trade licence</strong></div>
                            <div>2) <strong>IBAN certificate</strong> from your bank <span className="text-gray-500">(request from your bank app, usually arrives in minutes)</span></div>
                          </div>
                          <p className="text-[10.5px] text-gray-700 mt-1.5">Once both are here, you're set up. Reply anytime 🙏</p>
                          <div className="flex justify-end mt-0.5"><span className="text-[8.5px] text-gray-400">10:14 AM</span></div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Vendor "typing…" indicator */}
                    <AnimatePresence>
                      {past(T.WA_TYPING) && !past(T.WA_PDF1) && (
                        <motion.div
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="self-end max-w-[60%] rounded-xl rounded-tr-sm px-3 py-2 shadow-sm flex items-center gap-1"
                          style={{ background: '#DCF8C6' }}
                        >
                          {[0, 0.15, 0.3].map(d => (
                            <motion.span key={d}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 0.9, repeat: Infinity, delay: d }}
                              className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Vendor PDF 1 - Trade licence */}
                    <AnimatePresence>
                      {past(T.WA_PDF1) && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="self-end max-w-[80%] rounded-xl rounded-tr-sm px-2 py-1.5 shadow-sm"
                          style={{ background: '#DCF8C6' }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-11 rounded bg-rose-50 border border-rose-200 flex items-center justify-center flex-shrink-0">
                              <span className="text-[8.5px] font-bold text-rose-600">PDF</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10.5px] font-semibold text-gray-800 truncate">trade-licence-1208342.pdf</div>
                              <div className="text-[8.5px] text-gray-500">Commercial Licence · 1.2 MB</div>
                            </div>
                          </div>
                          <div className="flex justify-end items-center gap-1 mt-0.5">
                            <span className="text-[8.5px] text-gray-400">10:16 AM</span>
                            <span className="text-[10px] text-[#A87C28]">✓✓</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Vendor PDF 2 - IBAN cert */}
                    <AnimatePresence>
                      {past(T.WA_PDF2) && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="self-end max-w-[80%] rounded-xl rounded-tr-sm px-2 py-1.5 shadow-sm"
                          style={{ background: '#DCF8C6' }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-11 rounded bg-rose-50 border border-rose-200 flex items-center justify-center flex-shrink-0">
                              <span className="text-[8.5px] font-bold text-rose-600">PDF</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10.5px] font-semibold text-gray-800 truncate">IBAN-certificate-AlNoor.pdf</div>
                              <div className="text-[8.5px] text-gray-500">Mashreq Bank · 0.4 MB</div>
                            </div>
                          </div>
                          <div className="flex justify-end items-center gap-1 mt-0.5">
                            <span className="text-[8.5px] text-gray-400">10:16 AM</span>
                            <span className="text-[10px] text-[#A87C28]">✓✓</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Ratio acknowledges */}
                    <AnimatePresence>
                      {past(T.WA_ACK) && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="self-start max-w-[80%] rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 shadow-sm"
                        >
                          <p className="text-[10.5px] text-gray-800 leading-relaxed">
                            Got both 👍 Verifying now. I'll ping you the moment you're set up.
                          </p>
                          <div className="flex justify-end mt-0.5"><span className="text-[8.5px] text-gray-400">10:16 AM</span></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Phase C: persistent action bar — sits above subtitles, spans both AppShell columns */}
      <AnimatePresence>
        {inPhaseC && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute flex items-center gap-4 px-4 py-2.5"
            style={{
              bottom: 92,
              left: '50%',
              marginLeft: -440,
              width: 880,
              zIndex: 60,
              background: '#1A1A2E',
              border: '1px solid #2D2D44',
              borderRadius: 10,
              boxShadow: '0 18px 48px rgba(26,26,46,0.32), 0 4px 14px rgba(26,26,46,0.18)',
            }}
          >
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-white leading-tight">
                Vendor passed all checks.
              </div>
              <div className="text-[11px] text-[#9999BB] mt-0.5">
                Accept to complete onboarding.
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                className="px-3.5 py-1.5 text-[12px] font-medium border flex items-center gap-1.5"
                style={{
                  borderRadius: 6,
                  borderColor: '#3A3A5E',
                  color: '#C8C8E0',
                  background: 'transparent',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Reject
              </button>
              <motion.button
                animate={{
                  scale: t >= T.CURSOR_CLICK && t < T.CURSOR_CLICK + 280 ? 0.93 : 1,
                }}
                transition={{ duration: 0.18 }}
                className="relative px-4 py-1.5 text-[12px] font-semibold text-white flex items-center gap-1.5"
                style={{ borderRadius: 6, background: '#22B07A' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Accept
                <AnimatePresence>
                  {t >= T.CURSOR_CLICK && t < T.CURSOR_CLICK + 600 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0.55 }}
                      animate={{ scale: 3.2, opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="absolute inset-0"
                      style={{ background: 'rgba(255,255,255,0.55)', borderRadius: 6 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Cursor — slides toward Accept, lands right before the click */}
            <AnimatePresence>
              {past(T.CURSOR_IN) && t < T.ACCEPTED + 800 && (
                <motion.div
                  initial={{ opacity: 0, x: -200, y: 120 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: (T.CURSOR_AT - T.CURSOR_IN) / 1000,
                    ease: [0.32, 0.72, 0.26, 1],
                    opacity: { duration: 0.25 },
                  }}
                  className="absolute pointer-events-none"
                  style={{ right: 28, bottom: 6 }}
                >
                  <CursorIcon pressing={t >= T.CURSOR_CLICK && t < T.CURSOR_CLICK + 280} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase D: WhatsApp split layout — phone on left, milestone panel on right */}
      <AnimatePresence>
        {inPhaseD && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-50 pointer-events-none"
          >
            {/* Phone — left side (outer wrapper handles centering, inner motion handles entry) */}
            <div
              className="absolute"
              style={{ left: 180, top: 'calc(50% - 40px)', transform: 'translateY(-50%)' }}
            >
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="rounded-[40px] bg-[#1A1A2E] p-2.5 shadow-2xl" style={{ width: 290, height: 560 }}>
                <div className="rounded-[32px] bg-white h-full overflow-hidden flex flex-col relative">
                  {/* Status bar */}
                  <div className="h-7 px-5 flex items-center justify-between text-[10.5px] font-semibold text-[#1A1A2E] flex-shrink-0" style={{ background: '#FBF7F1' }}>
                    <span>9:14</span>
                    <span className="text-[8.5px]">5G</span>
                  </div>
                  {/* WA header */}
                  <div className="flex items-center gap-2 px-3 py-2.5 text-white flex-shrink-0" style={{ background: '#075E54' }}>
                    <button className="text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                      style={{ background: '#1A1A2E' }}>
                      <RatioLogo size={28} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] font-semibold truncate">Ratio AI</span>
                        <span className="text-[9px] px-1 rounded" style={{ background: 'rgba(255,255,255,0.18)' }}>VERIFIED</span>
                      </div>
                      <div className="text-[9.5px] text-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />online
                      </div>
                    </div>
                  </div>

                  {/* Convo */}
                  <div className="flex-1 flex flex-col justify-end px-2.5 py-2.5 gap-1.5 min-h-0 overflow-hidden" style={{ background: '#ECE5DD' }}>
                    {/* Ratio confirmation */}
                    <AnimatePresence>
                      {past(T.WD_RATIO_INTRO) && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="self-start max-w-[88%] rounded-xl rounded-tl-sm bg-white px-2.5 py-2 shadow-sm"
                        >
                          <p className="text-[10.5px] text-gray-800 leading-relaxed">
                            ✓ You're verified, <strong>Ahmed</strong>. Send all invoices for Sahara Holdings to this number. They'll be routed straight for payment. You can share your first invoice whenever you're ready.
                          </p>
                          <div className="flex justify-end mt-0.5"><span className="text-[8.5px] text-gray-400">10:17 AM</span></div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Vendor typing indicator */}
                    <AnimatePresence>
                      {past(T.WD_VENDOR_TYPING) && !past(T.WD_VENDOR_PDF) && (
                        <motion.div
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="self-end max-w-[60%] rounded-xl rounded-tr-sm px-3 py-2 shadow-sm flex items-center gap-1"
                          style={{ background: '#DCF8C6' }}
                        >
                          {[0, 0.15, 0.3].map(d => (
                            <motion.span key={d}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 0.9, repeat: Infinity, delay: d }}
                              className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Vendor sends invoice PDF */}
                    <AnimatePresence>
                      {past(T.WD_VENDOR_PDF) && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="self-end max-w-[80%] rounded-xl rounded-tr-sm px-2 py-1.5 shadow-sm"
                          style={{ background: '#DCF8C6' }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-11 rounded bg-rose-50 border border-rose-200 flex items-center justify-center flex-shrink-0">
                              <span className="text-[8.5px] font-bold text-rose-600">PDF</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10.5px] font-semibold text-gray-800 truncate">INV-2025-00428.pdf</div>
                              <div className="text-[8.5px] text-gray-500">Tax Invoice · 84 KB</div>
                            </div>
                          </div>
                          <div className="flex justify-end items-center gap-1 mt-0.5">
                            <span className="text-[8.5px] text-gray-400">10:21 AM</span>
                            <span className="text-[10px] text-[#A87C28]">✓✓</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Ratio acknowledges */}
                    <AnimatePresence>
                      {past(T.WD_RATIO_ACK) && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="self-start max-w-[88%] rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 shadow-sm"
                        >
                          <p className="text-[10.5px] text-gray-800 leading-relaxed">
                            Got it 👍 Processing now, I'll route it for approval.
                          </p>
                          <div className="flex justify-end mt-0.5"><span className="text-[8.5px] text-gray-400">10:21 AM</span></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
            </div>

            {/* Status panel — right side (no card, no heading, no footer) */}
            <div
              className="absolute"
              style={{ left: 620, top: '50%', transform: 'translateY(-50%)', width: 420 }}
            >
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              {/* Onboarding complete — done from start of Phase D */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#1EA672' }}>
                  <svg width="15" height="15" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold text-[#1A1A2E]">Onboarding complete</div>
                  <div className="text-[12px] text-[#6B6B80] mt-0.5">Vendor verified, master record live</div>
                </div>
              </div>

              {/* Invoice raised — flips when WD_VENDOR_PDF lands */}
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{
                    background: past(T.WD_INVOICE_DONE) ? '#1EA672' : 'transparent',
                    borderColor: past(T.WD_INVOICE_DONE) ? '#1EA672' : '#D8D2C5',
                    scale: t >= T.WD_INVOICE_DONE && t < T.WD_INVOICE_DONE + 350 ? [1, 1.18, 1] : 1,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ borderWidth: 2, borderStyle: 'solid' }}
                >
                  <AnimatePresence>
                    {past(T.WD_INVOICE_DONE) && (
                      <motion.svg
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        width="15" height="15" viewBox="0 0 12 12" fill="none"
                      >
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </motion.div>
                <div className="min-w-0">
                  <div className={`text-[15px] font-semibold ${past(T.WD_INVOICE_DONE) ? 'text-[#1A1A2E]' : 'text-[#6B6B80]'}`}>
                    Invoice raised
                  </div>
                  <div className="text-[12px] text-[#6B6B80] mt-0.5">
                    {past(T.WD_INVOICE_DONE)
                      ? 'INV-2025-00428.pdf received over WhatsApp'
                      : 'awaiting first invoice from vendor'}
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────

interface SubItem {
  kind: 'pdf' | 'check';
  text: string;
  meta?: string;
  visible?: boolean; // default true
}

function ThinkingStep({
  visible, done, label, subItems, tightSubs,
}: {
  visible: boolean;
  done: boolean;
  label: string;
  subItems: SubItem[];
  tightSubs?: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header row - no box, just an icon + label + chevron */}
      <div className="flex items-center gap-2.5">
        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: done ? '#1EA672' : 'transparent', border: done ? 'none' : '1.5px solid #D8D2C5' }}>
          {done ? (
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#A87C28' }}
            />
          )}
        </div>
        <span className="text-[12.5px] text-[#1A1A2E] font-semibold flex-1 tracking-tight">{label}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Sub-items - indented, no boxes */}
      <div className={`pl-7 pt-2 ${tightSubs ? 'space-y-0.5' : 'space-y-1.5'}`}>
        {subItems.map((s, i) => {
          const sVis = s.visible !== false;
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: sVis ? 1 : 0.25 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-[11.5px]"
            >
              {s.kind === 'pdf' ? (
                <span className="inline-flex items-center justify-center w-4 h-5 rounded bg-rose-50 border border-rose-200 flex-shrink-0">
                  <span className="text-[6.5px] font-bold text-rose-600">PDF</span>
                </span>
              ) : (
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#1EA672] flex-shrink-0">
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
              <span className="text-[#1A1A2E] font-medium">{s.text}</span>
              {s.meta && <span className="text-[#999] font-mono text-[10.5px]">· {s.meta}</span>}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function CursorIcon({ pressing }: { pressing: boolean }) {
  return (
    <motion.div
      animate={{ scale: pressing ? 0.86 : 1 }}
      transition={{ duration: 0.12 }}
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}
    >
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
        <path d="M2 2 L2 21 L7 16.5 L10 23 L13 22 L10 15.5 L17 15.5 Z"
          fill="white" stroke="#1A1A2E" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}
