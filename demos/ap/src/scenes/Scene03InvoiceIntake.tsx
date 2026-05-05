import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppShell from '../components/AppShell';
import PdfViewer from '../components/PdfViewer';
import TaxInvoiceDoc from '../components/TaxInvoiceDoc';

// Scene 3 - Invoice intake — Ratio's product UI processing the invoice that
// already arrived via WhatsApp in the previous scene's Phase D. No phone overlay.

const T = {
  HEADER_FILL: 1200,
  FIELD1: 1600, FIELD2: 2000, FIELD3: 2400, FIELD4: 2800, FIELD5: 3200, FIELD6: 3600,
  AR_TOGGLE:   6000,
  EN_TOGGLE:   9500,
};

export default function Scene03InvoiceIntake({ t }: { t: number }) {
  const past = (ms: number) => t >= ms;
  const showAR = t >= T.AR_TOGGLE && t < T.EN_TOGGLE;

  return (
    <div className="flex-1 flex relative">
      <AppShell
        activeNav="bills"
        topTabs={[
          { label: 'Finance Review', count: 28, active: true },
          { label: 'My Uploads', count: 4 },
          { label: 'All Drafts', count: 21 },
          { label: 'All Bills' },
          { label: 'Rejected', count: 1 },
        ]}
        searchPlaceholder="Search bills, vendors, IDs"
        contentPadding={false}
        rightPanel={
          <div className="h-full flex items-center justify-center p-3" style={{ background: '#F3EDE4' }}>
            <PdfViewer filename="INV-2025-00428.pdf" pages={1} width={400} height={600}>
              <TaxInvoiceDoc />
            </PdfViewer>
          </div>
        }
      >
        <div className="h-full overflow-hidden bg-white">
          {/* Bill detail header */}
          <div className="px-5 pt-4 pb-3 border-b border-[#E5E0D8] flex items-center gap-3">
            <button className="text-[#6B6B80]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="text-[15px] font-semibold text-[#1A1A2E]">2025/00428</div>
                <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold flex items-center gap-1"
                  style={{ background: '#FDF6E8', color: '#A87C28', border: '1px solid #F0E0B8' }}>
                  <span>✦</span> AI extracted
                </span>
              </div>
              <div className="text-[11px] text-[#6B6B80]">Al Noor Trading · Aug 25 · Bill received via WhatsApp</div>
            </div>
            <AnimatePresence>
              {past(T.HEADER_FILL) && (
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="px-2.5 py-1 rounded-md text-[10.5px] font-semibold flex items-center gap-1.5"
                  style={{ background: '#EBFAF3', color: '#1EA672', border: '1px solid #C3E8D5' }}
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#1EA672" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Vendor TRN verified
                </motion.div>
              )}
            </AnimatePresence>
            {/* EN/AR toggle */}
            <div className="flex items-center gap-1 bg-white border border-[#E5E0D8] rounded-md p-0.5 ml-1">
              <button className={`px-2.5 py-0.5 text-[10px] rounded ${!showAR ? 'bg-[#1A1A2E] text-white' : 'text-[#6B6B80]'}`}>EN</button>
              <button className={`px-2.5 py-0.5 text-[10px] rounded ${showAR ? 'bg-[#1A1A2E] text-white' : 'text-[#6B6B80]'}`}>AR</button>
            </div>
          </div>

          {/* Form body */}
          <div className="px-5 py-4 overflow-auto" style={{ height: 'calc(100% - 73px)' }}>
            {/* Vendor block */}
            <div className="mb-4">
              <div className="text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold mb-2">Vendor details</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l: 'Vendor name', v: showAR ? 'النور للتجارة ذ.م.م' : 'Al Noor Trading L.L.C.', t: T.FIELD1, rtl: showAR },
                  { l: 'Bank account', v: 'Mashreq · ·· 5678', t: T.FIELD2, badge: 'verified' },
                  { l: 'TRN', v: '100xxxxxxxxxxx03', t: T.FIELD3, badge: 'FTA-active' },
                  { l: 'Place of supply', v: 'Dubai · UAE', t: T.FIELD4 },
                ].map(f => {
                  const lit = past(f.t);
                  return (
                    <motion.div
                      key={f.l}
                      initial={false}
                      animate={{ opacity: lit ? 1 : 0.3 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-md border border-[#E5E0D8] px-3 py-2"
                    >
                      <div className="text-[9.5px] uppercase tracking-widest text-[#6B6B80] font-semibold mb-0.5">{f.l}</div>
                      <div className="flex items-center gap-2">
                        <div className="text-[12px] font-medium text-[#1A1A2E] flex-1" dir={f.rtl ? 'rtl' : 'ltr'}>{f.v}</div>
                        {f.badge === 'verified' && lit && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold"
                            style={{ background: '#EBFAF3', color: '#1EA672', border: '1px solid #C3E8D5' }}>✓ verified</span>
                        )}
                        {f.badge === 'FTA-active' && lit && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold"
                            style={{ background: '#EBFAF3', color: '#1EA672', border: '1px solid #C3E8D5' }}>✓ FTA active</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bill summary */}
            <div className="mb-4">
              <div className="text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold mb-2">Bill summary</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l: 'Bill amount', v: 'AED 24,937.50',  t: T.FIELD5, accent: true },
                  { l: 'Net amount (post-VAT)', v: 'AED 23,750.00', t: T.FIELD5 + 200 },
                  { l: 'Bill title', v: showAR ? 'بلاطات رخامية ممتازة - أغسطس 25' : 'Premium Marble Slabs · Aug 25', t: T.FIELD6, rtl: showAR },
                  { l: 'Bill number', v: 'INV-2025-00428', t: T.FIELD6 + 200 },
                  { l: 'Bill date', v: '26 / 08 / 2025', t: T.FIELD6 + 400 },
                  { l: 'Due date · Net 45', v: '10 / 10 / 2025', t: T.FIELD6 + 600 },
                  { l: 'Cost centre', v: 'OPS-DXB · auto-coded', t: T.FIELD6 + 800 },
                  { l: 'GL account', v: 'COGS · Marble (5101)',   t: T.FIELD6 + 1000 },
                ].map(f => {
                  const lit = past(f.t);
                  return (
                    <motion.div
                      key={f.l}
                      initial={false}
                      animate={{ opacity: lit ? 1 : 0.3 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-md border border-[#E5E0D8] px-3 py-2"
                      style={{ background: f.accent ? '#FBF7F1' : 'white' }}
                    >
                      <div className="text-[9.5px] uppercase tracking-widest text-[#6B6B80] font-semibold mb-0.5">{f.l}</div>
                      <div className={`${f.accent ? 'text-[14px] font-bold font-mono' : 'text-[12px] font-medium'} text-[#1A1A2E]`}
                        dir={f.rtl ? 'rtl' : 'ltr'}>{f.v}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </div>
  );
}
