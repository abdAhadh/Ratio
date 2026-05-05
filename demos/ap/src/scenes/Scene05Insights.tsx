import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppShell from '../components/AppShell';

// Scene 5 - Smart insights (Mysa-style bill view with insights side-panel)

const INSIGHTS = [
  {
    severity: 'danger',
    title: 'TRN flagged inactive on FTA',
    detail: 'Vendor TRN 100xxxxxxxxxxx03 returned "deregistered" on FTA portal at 10:14. Input VAT recovery is at risk if booked.',
    chip: 'Compliance',
    action: 'Block payment',
  },
  {
    severity: 'warning',
    title: 'Price 18% above 90-day average',
    detail: 'Premium marble slabs charged at AED 4,250 / m². Median across this vendor over 90 days: AED 3,605.',
    chip: 'Pricing drift',
    action: 'Query vendor',
  },
  {
    severity: 'warning',
    title: 'Possible duplicate against INV-2034',
    detail: 'Same vendor, same total (AED 24,937.50), invoice dated 6 days apart. Confidence 71%.',
    chip: 'Duplicate?',
    action: 'Compare',
  },
  {
    severity: 'info',
    title: 'Trade licence expiring in 14 days',
    detail: 'Al Noor Trading L.L.C. trade licence expires 14 March. Auto-block POs after expiry unless renewed.',
    chip: 'Vendor',
    action: 'Set reminder',
  },
];

const COLORS: Record<string, { bg: string; border: string; dot: string; text: string; chipBg: string; chipText: string; }> = {
  danger:  { bg: '#FDE8E9', border: '#F9C4C7', dot: '#E5424D', text: '#8B1F26', chipBg: '#F9C4C7', chipText: '#8B1F26' },
  warning: { bg: '#FEF3C7', border: '#FDE08A', dot: '#D97706', text: '#7B4A0E', chipBg: '#FDE08A', chipText: '#7B4A0E' },
  info:    { bg: '#FDF6E8', border: '#F0E0B8', dot: '#A87C28', text: '#7A5C1F', chipBg: '#F0E0B8', chipText: '#7A5C1F' },
};

export default function Scene05Insights({ t }: { t: number }) {

  return (
    <AppShell
      activeNav="bills"
      topTabs={[
        { label: 'Finance Review', count: 28, active: true },
        { label: 'My Uploads', count: 4 },
        { label: 'All Drafts', count: 21 },
        { label: 'All Bills' },
        { label: 'Rejected', count: 1 },
      ]}
      contentPadding={false}
      rightPanel={
        <div className="h-full overflow-auto bg-[#FDF6E8]" style={{ background: '#FDF6E8' }}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#A87C28] font-semibold">Smart insights</div>
                <div className="text-[14px] font-semibold text-[#1A1A2E]">4 issues detected on this bill</div>
              </div>
              <div className="text-[10px] text-[#A87C28] font-semibold px-2 py-0.5 rounded"
                style={{ background: '#F0E0B8' }}>✦ AI</div>
            </div>
            <div className="space-y-2.5">
              {INSIGHTS.map((ins, i) => {
                const showAt = 600 + i * 1100;
                const visible = t >= showAt;
                const c = COLORS[ins.severity];
                return (
                  <motion.div
                    key={ins.title}
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12, scale: visible ? 1 : 0.97 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-md border p-3 bg-white"
                    style={{ borderColor: c.border }}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ background: c.bg }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M12 8v5M12 16.5h.01" stroke={c.dot} strokeWidth="2.4" strokeLinecap="round" />
                          <circle cx="12" cy="12" r="9" stroke={c.dot} strokeWidth="1.6" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-semibold text-[#1A1A2E] leading-tight">{ins.title}</div>
                        <div className="text-[10.5px] text-[#4A4A6A] mt-1 leading-relaxed">{ins.detail}</div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-widest"
                            style={{ background: c.chipBg, color: c.chipText }}>
                            {ins.chip}
                          </span>
                          <button className="text-[10.5px] font-semibold underline" style={{ color: c.dot }}>
                            {ins.action}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      }
    >
      {/* Main bill detail (subdued, focus is on the insights panel) */}
      <div className="h-full overflow-hidden bg-white">
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
                ✦ AI extracted
              </span>
            </div>
            <div className="text-[11px] text-[#6B6B80]">Al Noor Trading · Aug 25</div>
          </div>
          <span className="px-2.5 py-1 rounded-md text-[10.5px] font-semibold"
            style={{ background: '#FEF3C7', color: '#7B4A0E', border: '1px solid #FDE08A' }}>
            ⚠ 4 flags
          </span>
        </div>

        <div className="px-5 py-4 space-y-3 overflow-auto" style={{ height: 'calc(100% - 73px)' }}>
          {/* Hero amount card */}
          <div className="rounded-md border border-[#E5E0D8] px-4 py-3 bg-[#FBF7F1] flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold">Bill amount</div>
              <div className="text-[20px] font-bold font-mono text-[#1A1A2E]">AED 24,937.50</div>
              <div className="text-[10.5px] text-[#6B6B80]">incl. AED 1,187.50 VAT · Net 45 · due 10 Oct</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold">Status</div>
              <div className="text-[12px] font-semibold text-[#A87C28] mt-1">Held for review →</div>
            </div>
          </div>

          {/* Compact summary */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { l: 'Vendor',       v: 'Al Noor Trading L.L.C.' },
              { l: 'TRN',          v: '100xxxxxxxxxxx03', danger: true },
              { l: 'Bill number',  v: 'INV-2025-00428' },
              { l: 'Bill date',    v: '26 Aug 2025' },
              { l: 'PO',           v: 'PO-MD2025-0331 ✓' },
              { l: 'GRN',          v: 'GRN-344123 ✓' },
            ].map(f => (
              <div key={f.l} className="rounded-md border border-[#E5E0D8] px-3 py-2">
                <div className="text-[9.5px] uppercase tracking-widest text-[#6B6B80] font-semibold mb-0.5">{f.l}</div>
                <div className="text-[11.5px] font-medium text-[#1A1A2E] flex items-center gap-1.5">
                  {f.v}
                  {f.danger && <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#E5424D' }} />}
                </div>
              </div>
            ))}
          </div>

          {/* Action row */}
          <div className="flex items-center gap-2 pt-1">
            <button className="px-3 py-1.5 rounded-md text-[11px] font-medium text-[#6B6B80] border border-[#E5E0D8]">Reject</button>
            <button className="px-3 py-1.5 rounded-md text-[11px] font-medium text-[#1A1A2E] border border-[#E5E0D8]">Send back to vendor</button>
            <button className="ml-auto px-3 py-1.5 rounded-md text-[11px] font-semibold text-white" style={{ background: '#1A1A2E' }}>
              Resolve flags &amp; route for approval
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
