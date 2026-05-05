import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppShell from '../components/AppShell';
import RatioLogo from '../components/RatioLogo';

// Scene 6 - Approval (Mysa-style bills list + approval pipeline panel + phone overlay)

const T = {
  // Cursor enters and travels to the first vendor row
  CURSOR_IN:     200,
  CURSOR_AT_ROW: 700,
  ROW_CLICK:    1100,    // click on Al Noor Trading row
  ROW_FOCUS:    1100,    // row highlight syncs with the click
  PANEL_OPEN:   1300,    // right detail panel slides in fully populated
                          // (pipeline + approval levels are baked into the
                          //  panel — no progressive reveal after open)
  CURSOR_OUT:   1700,    // cursor fades after click
  // Phone (centered, blurred backdrop):
  //   1. PHONE_IN  → iOS home screen with Ratio notification banner
  //   2. NOTIF_TAP → user taps notification → flips to approval view
  //   3. TAP       → user taps Approve in the app → APPROVED → ROW_PAID
  PHONE_IN:     4200,
  NOTIF_TAP:    6800,
  APPROVAL_VIEW:7000,
  TAP:          9500,
  APPROVED:    10800,
  ROW_PAID:    12300,
};

const BILLS = [
  { v: 'Al Noor Trading',     id: 'INV-2025-00428', amt: 'AED 24,937.50', avatar: 'AN' },
  { v: 'Sahara Logistics',    id: 'INV-2025-00422', amt: 'AED 12,840.00', avatar: 'SL' },
  { v: 'Al Marwan Suppliers', id: 'INV-2025-00417', amt: 'AED 8,720.00',  avatar: 'AM' },
  { v: 'Gulf Cargo Services', id: 'INV-2025-00415', amt: 'AED 47,260.00', avatar: 'GC' },
  { v: 'Emirates FM Group',   id: 'INV-2025-00410', amt: 'AED 6,180.50',  avatar: 'EF' },
  { v: 'Noor Industrial Co.', id: 'INV-2025-00408', amt: 'AED 19,420.00', avatar: 'NI' },
];

export default function Scene06Approval({ t }: { t: number }) {
  const past = (ms: number) => t >= ms;

  // Approval pipeline progress: 0 = idle, 1 = approved by L1, 2 = paid
  const stage = past(T.ROW_PAID) ? 2 : past(T.APPROVED) ? 1 : 0;

  const RightPanel = (
    <div className="h-full overflow-auto">
      <div className="px-4 py-3 border-b border-[#E5E0D8] flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: '#1A1A2E' }}>AN</div>
        <div className="flex-1">
          <div className="text-[12.5px] font-semibold text-[#1A1A2E]">Al Noor Trading</div>
          <div className="text-[10px] text-[#6B6B80]">INV-2025-00428</div>
        </div>
        {/* Search · Maximise (opens full invoice view) · Close */}
        <button className="text-[#6B6B80] hover:text-[#1A1A2E] px-1" title="Search">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button className="text-[#6B6B80] hover:text-[#1A1A2E] px-1" title="Open full invoice view">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M5 2H2v3M14 5V2h-3M11 14h3v-3M2 11v3h3"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="text-[#6B6B80] hover:text-[#1A1A2E] px-1" title="Close">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="px-4 py-2 border-b border-[#E5E0D8] flex items-center gap-3 text-[11px]">
        <span className="font-semibold text-[#1A1A2E] border-b-2 border-[#1A1A2E] pb-1.5 -mb-2">Details</span>
        <span className="text-[#6B6B80]">Audit Trail</span>
        <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md font-semibold flex items-center gap-1"
          style={{ background: '#FDF6E8', color: '#A87C28', border: '1px solid #F0E0B8' }}>
          ✦ AI Enhanced version
        </span>
      </div>

      <div className="px-4 py-3">
        {/* Pipeline + approval-levels are part of the panel from the moment
            it opens — no progressive reveal. */}
        <div className="rounded-md border border-[#E5E0D8] px-3 py-3">
          <div className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: '#A87C28' }}>In Approval</div>
              {/* Single-color pipeline — connector line runs THROUGH the circles.
                  Bronze for completed segments, light cream for upcoming. No
                  separate progress bar; no per-step numbering. */}
              {(() => {
                const steps = [
                  { l: 'Uploaded', sub: 'Ratio AI' },
                  { l: 'Approved', sub: stage >= 1 ? '1/3' : '0/3' },
                  { l: 'Reviewed', sub: stage >= 2 ? 'auto' : '–' },
                  { l: 'Paid',     sub: stage >= 2 ? 'UAEFTS' : '–' },
                ];
                const completedIdx = stage === 0 ? 0 : stage === 1 ? 1 : 3; // index of last filled circle
                const currentIdx   = stage === 0 ? 1 : stage === 1 ? 2 : 3;
                return (
                  <div className="relative px-1">
                    {/* connector — gray base */}
                    <div className="absolute left-[12.5%] right-[12.5%] top-3 h-[2px] rounded-full" style={{ background: '#F0EDE6' }} />
                    {/* connector — bronze fill up to completedIdx */}
                    <div
                      className="absolute left-[12.5%] top-3 h-[2px] rounded-full"
                      style={{
                        background: '#A87C28',
                        width: `calc(${(completedIdx / 3) * 75}% )`,
                        transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    />
                    <div className="relative grid grid-cols-4 gap-2">
                      {steps.map((s, i) => {
                        const isDone = i <= completedIdx && completedIdx >= 0 && (stage > 0 || i === 0);
                        const doneSafe = i === 0 || (i === 1 && stage >= 1) || (i >= 2 && stage >= 2);
                        const isCurrent = i === currentIdx && !doneSafe;
                        return (
                          <div key={s.l} className="flex flex-col items-center text-center">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center mb-1.5 relative"
                              style={{
                                background: doneSafe ? '#A87C28' : '#FBFAF7',
                                border: doneSafe
                                  ? '1.5px solid #A87C28'
                                  : isCurrent
                                  ? '1.5px solid #A87C28'
                                  : '1.5px solid #E5E0D8',
                              }}
                            >
                              {doneSafe ? (
                                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              ) : isCurrent ? (
                                <motion.span
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ background: '#A87C28' }}
                                  animate={{ opacity: [0.4, 1, 0.4] }}
                                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                                />
                              ) : null}
                            </div>
                            <div className="text-[10px] font-semibold text-[#1A1A2E] leading-tight">{s.l}</div>
                            <div className="text-[9.5px] text-[#6B6B80] leading-tight mt-0.5">{s.sub}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
        </div>

        {/* Approval levels — also part of the panel from open. */}
        <div className="mt-4">
          <div className="text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold mb-2">Approval required from</div>
              <div className="space-y-2">
                {[
                  { l: 'Level 1', names: ['Priya S.', 'Krish K.'], current: stage === 0, done: stage >= 1 },
                  { l: 'Level 2', names: ['Niharika N.', 'Mannu K.'], queued: true },
                  { l: 'Level 3', names: ['Hassan N.'], queued: true },
                ].map(lv => (
                  <div key={lv.l} className="flex items-center gap-2.5">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                      lv.done ? 'border-[#1EA672] bg-[#1EA672]' : lv.current ? 'border-[#A87C28]' : 'border-[#D8D2C5]'
                    }`}>
                      {lv.done && (
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      )}
                      {lv.current && <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#A87C28' }} />}
                    </div>
                    <div className="text-[10px] font-semibold text-[#6B6B80] w-12">{lv.l}:</div>
                    <div className="text-[11px] text-[#1A1A2E]">{lv.names.join(', ')}</div>
                    {lv.current && <span className="ml-auto text-[9px] text-[#A87C28] font-semibold">awaiting</span>}
                    {lv.done && <span className="ml-auto text-[9px] text-[#1EA672] font-semibold">approved · 10:17</span>}
                  </div>
                ))}
              </div>
        </div>

        {/* Bill summary */}
        <div className="mt-4">
          <div className="text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold mb-2">Summary</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-[9.5px] text-[#999]">Bill amount</div>
              <div className="text-[14px] font-mono font-bold text-[#1A1A2E]">AED 24,937.50</div>
            </div>
            <div>
              <div className="text-[9.5px] text-[#999]">Net amount</div>
              <div className="text-[14px] font-mono font-bold text-[#1A1A2E]">AED 23,750.00</div>
            </div>
            <div>
              <div className="text-[9.5px] text-[#999]">Bill title</div>
              <div className="text-[11px] font-medium text-[#1A1A2E]">Carrara Marble · Aug-25</div>
            </div>
            <div>
              <div className="text-[9.5px] text-[#999]">Bill number</div>
              <div className="text-[11px] font-medium text-[#1A1A2E]">INV-2025-00428</div>
            </div>
            <div>
              <div className="text-[9.5px] text-[#999]">Bill date</div>
              <div className="text-[11px] font-medium text-[#1A1A2E]">26 / 08 / 2025</div>
            </div>
            <div>
              <div className="text-[9.5px] text-[#999]">Due date</div>
              <div className="text-[11px] font-medium text-[#1A1A2E]">10 / 10 / 2025</div>
            </div>
            <div className="col-span-2">
              <div className="text-[9.5px] text-[#999]">Ratio category</div>
              <div className="text-[11px] font-medium text-[#1A1A2E]">COGS · Marble (5101)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
        filters={[
          { label: 'Overdue', active: true },
        ]}
        contentPadding={false}
        rightPanel={past(T.PANEL_OPEN) ? RightPanel : null}
      >
        <div className="h-full overflow-hidden bg-white">
          {/* Stats bar */}
          <div className="px-5 py-3 border-b border-[#E5E0D8] flex items-center gap-6">
            <div>
              <div className="text-[9.5px] uppercase tracking-widest text-[#6B6B80] font-semibold">Total Bills</div>
              <div className="text-[16px] font-bold text-[#1A1A2E]">28</div>
            </div>
            <div className="h-8 w-px bg-[#E5E0D8]" />
            <div>
              <div className="text-[9.5px] uppercase tracking-widest text-[#6B6B80] font-semibold">Total Bill Amount</div>
              <div className="text-[16px] font-bold text-[#1A1A2E] font-mono">AED 119,358.00</div>
            </div>
          </div>

          {/* Table header */}
          <div className="px-5 py-2 border-b border-[#E5E0D8] grid grid-cols-[1fr_140px_60px_140px] gap-3 text-[9.5px] uppercase tracking-widest text-[#6B6B80] font-semibold">
            <span>Vendor</span>
            <span>ID</span>
            <span>Bill</span>
            <span className="text-right">Bill Amount</span>
          </div>

          {/* Rows */}
          <div className="overflow-auto" style={{ height: 'calc(100% - 100px)' }}>
            {BILLS.map((b, i) => {
              const focused = i === 0 && past(T.ROW_FOCUS);
              return (
                <motion.div
                  key={b.id}
                  animate={{ background: focused ? '#FDF6E8' : 'white' }}
                  transition={{ duration: 0.3 }}
                  className="px-5 py-2.5 grid grid-cols-[1fr_140px_60px_140px] gap-3 border-b border-[#F0EDE6] items-center text-[12px]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9.5px] font-bold text-white flex-shrink-0"
                      style={{ background: '#1A1A2E' }}>{b.avatar}</div>
                    <span className="text-[#1A1A2E] truncate">{b.v}</span>
                  </div>
                  <span className="text-[#4A4A6A] font-mono text-[10.5px]">{b.id}</span>
                  <div className="w-5 h-6 rounded bg-rose-50 border border-rose-200 flex items-center justify-center">
                    <span className="text-[6.5px] font-bold text-rose-600">PDF</span>
                  </div>
                  <span className="text-right text-[#1A1A2E] font-mono font-medium">{b.amt}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AppShell>

      {/* Phone overlay — CENTERED with a blurred + dimmed backdrop so all
          attention focuses on the device. Two phases:
            1. Lock-screen-style home with a Ratio notification banner
            2. After the notification is tapped, the in-app approval screen */}
      <AnimatePresence>
        {past(T.PHONE_IN) && (
          <>
            {/* Backdrop — blur + dim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-40 pointer-events-none"
              style={{
                background: 'rgba(20, 20, 35, 0.45)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            />
            {/* Phone, centered */}
            <div className="absolute inset-0 z-50 flex items-center justify-center pb-20 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="rounded-[40px] bg-[#1A1A2E] p-[10px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
                  style={{ width: 290, height: 560 }}
                >
                  <div className="rounded-[30px] h-full overflow-hidden flex flex-col relative">
                    {past(T.APPROVAL_VIEW) ? (
                      <PhoneApprovalScreen
                        t={t}
                        approved={past(T.APPROVED)}
                        tapping={past(T.TAP) && t < T.TAP + 220}
                      />
                    ) : (
                      <PhoneHomeScreen
                        showNotif={past(T.PHONE_IN + 700)}
                        tapping={past(T.NOTIF_TAP) && t < T.NOTIF_TAP + 220}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Notification tap ripple — fires on home screen */}
            <AnimatePresence>
              {past(T.NOTIF_TAP) && t < T.NOTIF_TAP + 600 && (
                <div className="absolute inset-0 z-[51] flex items-start justify-center pointer-events-none" style={{ paddingTop: 148 }}>
                  <motion.div
                    initial={{ scale: 0, opacity: 0.45 }}
                    animate={{ scale: 2.6, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="rounded-full"
                    style={{ width: 60, height: 60, background: 'rgba(255,255,255,0.6)' }}
                  />
                </div>
              )}
            </AnimatePresence>

            {/* Approve tap ripple — fires inside the approval screen */}
            <AnimatePresence>
              {past(T.TAP) && t < T.APPROVED + 400 && (
                <div className="absolute inset-0 z-[51] flex items-end justify-center pointer-events-none" style={{ paddingBottom: 146 }}>
                  <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="rounded-full"
                    style={{ width: 60, height: 60, background: 'rgba(168,124,40,0.45)' }}
                  />
                </div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>

      {/* Cursor — enters at top, glides to first vendor row, clicks to open
          the right detail panel. Coordinates are scene-root absolute pixels.
          First row Y position: tabs(44) + filters(40) + stats(70) + table-hdr(28) + row-half(20) ≈ 202.
          Vendor name X: nav-rail(52) + px-5(20) + avatar-half(12) ≈ 84. */}
      <AnimatePresence>
        {t >= T.CURSOR_IN && t < T.CURSOR_OUT && (
          <motion.div
            key="approval-cursor"
            initial={{ opacity: 0, top: 130, left: 280 }}
            animate={{
              opacity: 1,
              top:  past(T.CURSOR_AT_ROW) ? 200 : 130,
              left: past(T.CURSOR_AT_ROW) ? 110 : 280,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.35 },
              top:     { duration: 0.55, ease: [0.32, 0.72, 0.26, 1] },
              left:    { duration: 0.55, ease: [0.32, 0.72, 0.26, 1] },
            }}
            className="absolute pointer-events-none z-[55]"
          >
            <ApprovalCursor pressing={t >= T.ROW_CLICK && t < T.ROW_CLICK + 220} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ApprovalCursor({ pressing }: { pressing: boolean }) {
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

// ── iOS Lock Screen — light wallpaper, realistic notification ─────────────
function PhoneHomeScreen({ showNotif, tapping }: { showNotif: boolean; tapping: boolean }) {
  // Dark text on a light wallpaper — switch all white-on-dark elements to
  // a deep navy for proper contrast.
  const TXT = '#1A1A2E';

  return (
    <div
      className="h-full relative overflow-hidden"
      style={{
        // Soft warm-light "sunrise" wallpaper — cream → peach → soft coral.
        // Aligns with Ratio's cream + bronze palette, reads as a real photo.
        background: `
          radial-gradient(120% 90% at 30% 10%, rgba(255, 232, 200, 0.95) 0%, transparent 55%),
          radial-gradient(90% 80% at 80% 100%, rgba(255, 205, 178, 0.85) 0%, transparent 60%),
          radial-gradient(80% 70% at 15% 90%, rgba(255, 220, 195, 0.80) 0%, transparent 60%),
          linear-gradient(180deg, #FAEAD8 0%, #F8D5BB 55%, #F2BC9C 100%)
        `,
      }}
    >
      {/* Subtle film-grain / noise overlay for photographic depth */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-15"
        style={{
          backgroundImage: `radial-gradient(rgba(120,80,40,0.18) 1px, transparent 1px)`,
          backgroundSize: '3px 3px',
        }}
      />

      <div className="relative h-full flex flex-col">
        {/* Status bar — dark text on light wallpaper */}
        <div
          className="h-9 px-5 flex items-center justify-between text-[11px] font-semibold flex-shrink-0"
          style={{ color: TXT }}
        >
          <span>Etisalat</span>
          <span className="flex items-center gap-1.5">
            {/* signal bars */}
            <span className="flex items-end gap-[1.5px] h-[10px]">
              <span className="w-[3px] h-[3px] rounded-[0.5px]" style={{ background: TXT }} />
              <span className="w-[3px] h-[5px] rounded-[0.5px]" style={{ background: TXT }} />
              <span className="w-[3px] h-[7px] rounded-[0.5px]" style={{ background: TXT }} />
              <span className="w-[3px] h-[9px] rounded-[0.5px]" style={{ background: TXT }} />
            </span>
            <span className="text-[10px] tracking-tight">5G</span>
            {/* battery */}
            <span className="relative ml-0.5">
              <span
                className="block w-[22px] h-[10px] rounded-[2.5px] relative"
                style={{ border: `1px solid ${TXT}99` }}
              >
                <span
                  className="absolute top-[1px] left-[1px] bottom-[1px] rounded-[1px]"
                  style={{ width: 16, background: TXT }}
                />
              </span>
              <span
                className="absolute -right-[2px] top-[3px] w-[1.5px] h-[4px] rounded-r-[1px]"
                style={{ background: `${TXT}99` }}
              />
            </span>
          </span>
        </div>

        {/* Tiny lock icon */}
        <div className="flex justify-center mt-2">
          <svg width="13" height="16" viewBox="0 0 14 18" fill="none">
            <path
              d="M3.6 7.5 V5.2 C3.6 3 5.1 1.4 7 1.4 C8.9 1.4 10.4 3 10.4 5.2 V7.5"
              stroke={TXT}
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <rect x="2.2" y="7.3" width="9.6" height="8.6" rx="1.6" fill={TXT} />
          </svg>
        </div>

        {/* Date */}
        <div
          className="text-center mt-2 text-[12px]"
          style={{ color: TXT, letterSpacing: 0.1, opacity: 0.92 }}
        >
          Tuesday, 5 May
        </div>

        {/* Time — huge, thin, SF Pro Display */}
        <div
          className="text-center -mt-1"
          style={{
            color: TXT,
            fontSize: 86,
            fontWeight: 200,
            letterSpacing: '-0.045em',
            lineHeight: 1,
            fontFamily:
              '-apple-system, "SF Pro Display", "Helvetica Neue", system-ui, sans-serif',
            textShadow: '0 1px 0 rgba(255,255,255,0.45)',
          }}
        >
          9:14
        </div>

        {/* Notification banner — frosted WHITE glass on light wallpaper */}
        <div className="px-3 mt-5">
          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: tapping ? 0.96 : 1,
                }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="px-3 py-2.5 relative overflow-hidden"
                  style={{
                    borderRadius: 18,
                    background: 'rgba(255, 255, 255, 0.72)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    border: '0.5px solid rgba(255, 255, 255, 0.85)',
                    boxShadow:
                      '0 8px 22px -6px rgba(120, 70, 30, 0.18), inset 0 0.5px 0 rgba(255,255,255,0.6)',
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {/* Real Ratio mark — navy square with the white flowing
                        glyph inside (from RatioLogo SVG). */}
                    <div
                      className="overflow-hidden flex-shrink-0"
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.18)',
                      }}
                    >
                      <RatioLogo size={20} />
                    </div>
                    <span
                      className="text-[10px] font-semibold"
                      style={{ color: '#1A1A2E', letterSpacing: '0.06em', opacity: 0.9 }}
                    >
                      RATIO
                    </span>
                    <span className="text-[10px] ml-auto" style={{ color: '#6B6B80' }}>now</span>
                  </div>
                  <div className="text-[13px] font-semibold leading-tight" style={{ color: '#1A1A2E' }}>
                    Approval needed
                  </div>
                  <div className="text-[11.5px] mt-0.5 leading-snug" style={{ color: '#4A4A6A' }}>
                    Al Noor Trading · AED 24,937.50
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Spacer pushes the bottom controls down */}
        <div className="flex-1" />

        {/* Bottom action buttons (flashlight + camera) — light surface needs
            navy-tinted glass for the dimmed look. */}
        <div className="flex items-center justify-between px-10 pb-6 flex-shrink-0">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(26, 26, 46, 0.18)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '0.5px solid rgba(26,26,46,0.10)',
            }}
          >
            <svg width="13" height="17" viewBox="0 0 14 18" fill="none">
              <path d="M4 1.5 H10 L9 5 H5 Z" fill={TXT} />
              <path d="M5 5 H9 L8 12.5 H6 Z" fill={TXT} />
              <rect x="6.4" y="13" width="1.2" height="3" rx="0.5" fill={TXT} />
            </svg>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(26, 26, 46, 0.18)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '0.5px solid rgba(26,26,46,0.10)',
            }}
          >
            <svg width="18" height="14" viewBox="0 0 22 16" fill="none">
              <path d="M2 4 H6 L7.5 2 H14.5 L16 4 H20 V13 H2 Z" stroke={TXT} strokeWidth="1.2" strokeLinejoin="round" />
              <circle cx="11" cy="9" r="3" stroke={TXT} strokeWidth="1.2" />
            </svg>
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-1.5 flex-shrink-0">
          <div className="w-[110px] h-[3.5px] rounded-full" style={{ background: `${TXT}D9` }} />
        </div>
      </div>
    </div>
  );
}

// ── Compact in-app approval screen (Ratio mobile) ──────────────────────────
function PhoneApprovalScreen({
  t, approved, tapping,
}: { t: number; approved: boolean; tapping: boolean }) {
  return (
    <motion.div
      key="approval-screen"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="h-full flex flex-col bg-white"
    >
      {/* Status bar */}
      <div className="h-7 px-5 flex items-center justify-between text-[10px] font-semibold text-[#1A1A2E] flex-shrink-0">
        <span>9:14</span>
        <span className="text-[8.5px]">●●●●  5G</span>
      </div>

      {/* App header — clean, just "Approval needed" */}
      <div className="px-4 py-3 flex items-center gap-2 flex-shrink-0 border-b border-[#F0EDE6]">
        <button className="text-[#6B6B80] -ml-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="overflow-hidden flex-shrink-0" style={{ width: 20, height: 20, borderRadius: 5 }}>
          <RatioLogo size={20} />
        </div>
        <span className="text-[12px] font-semibold text-[#1A1A2E]">Approval needed</span>
      </div>

      {/* Body */}
      <div className="flex-1 px-4 pt-4 pb-3 flex flex-col">
        {/* Vendor + amount */}
        <div className="text-[9px] uppercase tracking-widest text-[#6B6B80] font-semibold">Pay vendor</div>
        <div className="text-[13.5px] font-semibold text-[#1A1A2E] mt-1 leading-tight">Al Noor Trading L.L.C.</div>
        <div className="text-[10px] text-[#6B6B80] mt-0.5">INV-2025-00428 · Net 45 · due 10 Oct</div>

        <div className="mt-3 text-[24px] font-mono font-bold text-[#1A1A2E] leading-none">AED 24,937.50</div>
        <div className="text-[9.5px] text-[#6B6B80] mt-1">incl. AED 1,187.50 VAT (5%)</div>

        {/* Verified row */}
        <div className="mt-3 flex items-center gap-1.5 text-[10px]" style={{ color: '#1EA672' }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#1EA672" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-medium">PO + GRN matched · 3-way match</span>
        </div>

        {/* Divider — separates bill/vendor info from flags + status */}
        <div className="mt-3.5 h-px" style={{ background: '#F0EDE6' }} />

        {/* Flags — clean list, no chips */}
        <div className="mt-3">
          <div className="text-[9px] uppercase tracking-widest font-semibold mb-2" style={{ color: '#A87C28' }}>
            ⚠ 3 Flags to review
          </div>
          <div className="space-y-2">
            {[
              { dot: '#A87C28', text: 'Price 18% above 90-day average' },
              { dot: '#A87C28', text: 'Possible duplicate against INV-2034' },
              { dot: '#B5392E', text: 'Trade licence expiring in 14 days' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-[6px] flex-shrink-0" style={{ background: f.dot }} />
                <span className="text-[11px] text-[#1A1A2E] leading-snug">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Approval status pipeline — compact mobile version of the desktop
            panel. Single-color (bronze) theme, connector line, no numbering. */}
        <div className="mt-4">
          <div className="text-[9px] uppercase tracking-widest font-semibold mb-2" style={{ color: '#A87C28' }}>
            In Approval
          </div>
          <PhonePipeline approvedStage={approved} />
        </div>

        {/* Actions — equal-size buttons, icons on both, distinct press state. */}
        <div className="mt-auto grid grid-cols-2 gap-2.5 pt-3">
          {/* Reject — neutral pill, with an X icon. */}
          <button
            className="py-2.5 rounded-xl text-[11.5px] font-semibold text-[#4A4A6A] flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-[0.96] active:bg-[#E8E2D4]"
            style={{
              background: '#F0EDE6',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 3l6 6M9 3l-6 6" stroke="#4A4A6A" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Reject
          </button>

          {/* Approve — primary; check icon is always present (before, during,
              and after the tap). The press state dims the fill, adds an inner
              shadow + bronze ring; success state turns green. */}
          <motion.button
            animate={{
              scale: tapping ? 0.94 : 1,
              background: approved
                ? '#1EA672'
                : tapping
                ? '#0E0E1C'
                : '#1A1A2E',
              boxShadow: tapping
                ? 'inset 0 2px 6px rgba(0,0,0,0.45), 0 0 0 2px rgba(168,124,40,0.5)'
                : approved
                ? '0 6px 16px -6px rgba(30,166,114,0.5), inset 0 0.5px 0 rgba(255,255,255,0.18)'
                : '0 4px 14px -4px rgba(0,0,0,0.28), inset 0 0.5px 0 rgba(255,255,255,0.10)',
            }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="py-2.5 rounded-xl text-[11.5px] font-semibold text-white flex items-center justify-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6l3 3 5-5"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {approved ? 'Approved' : 'Approve'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Compact pipeline for the phone — same single-color aesthetic as the
// desktop panel: gray base connector + bronze fill, bronze for current step.
function PhonePipeline({ approvedStage }: { approvedStage: boolean }) {
  const completedIdx = approvedStage ? 1 : 0;
  const currentIdx   = approvedStage ? 2 : 1;
  const steps = [
    { l: 'Uploaded', sub: 'Ratio AI' },
    { l: 'Approved', sub: approvedStage ? '1/3' : '0/3' },
    { l: 'Reviewed', sub: '–' },
    { l: 'Paid',     sub: '–' },
  ];
  return (
    <div className="relative px-1">
      {/* connector — gray base */}
      <div className="absolute left-[12.5%] right-[12.5%] top-[10px] h-[2px] rounded-full" style={{ background: '#F0EDE6' }} />
      {/* connector — bronze fill up to completedIdx */}
      <div
        className="absolute left-[12.5%] top-[10px] h-[2px] rounded-full"
        style={{
          background: '#A87C28',
          width: `${(completedIdx / 3) * 75}%`,
          transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      <div className="relative grid grid-cols-4 gap-1">
        {steps.map((s, i) => {
          const isDone = i <= completedIdx;
          const isCurrent = i === currentIdx;
          return (
            <div key={s.l} className="flex flex-col items-center text-center">
              <div
                className="w-[20px] h-[20px] rounded-full flex items-center justify-center mb-1 relative"
                style={{
                  background: isDone ? '#A87C28' : 'white',
                  border: isDone
                    ? '1.5px solid #A87C28'
                    : isCurrent
                    ? '1.5px solid #A87C28'
                    : '1.5px solid #E5E0D8',
                }}
              >
                {isDone ? (
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : isCurrent ? (
                  <motion.span
                    className="w-1 h-1 rounded-full"
                    style={{ background: '#A87C28' }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ) : null}
              </div>
              <div className="text-[8.5px] font-semibold text-[#1A1A2E] leading-tight">{s.l}</div>
              <div className="text-[7.5px] text-[#6B6B80] leading-tight mt-[1px]">{s.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
