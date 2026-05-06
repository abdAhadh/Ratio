import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppShell from '../components/AppShell';
import RatioLogo from '../components/RatioLogo';

// Scene 8 — Sync & Reconcile (18s)
//
//   Phase 0 (0–5.3s)  Hero: "Sync reconciled entries with 1 click" with
//                     ERP logos cycling (Tally → Zoho → SAP → NetSuite → QB).
//   Phase 1 (5.3s–)   Accounting screen:
//                       1. Rows reveal
//                       2. Cursor clicks Al Noor row → right-side panel
//                          slides in with bank-recon + journal-posting
//                          details for that single ledger entry.
//                       3. Cursor closes the panel.
//                       4. Cursor clicks Select-all → wave-fills the rows.
//                       5. Cursor clicks Sync → "All synced".

const T = {
  // Scene 8 = 15.7s, locked to L17 + L18.
  //   L17 (scene-local 0-5.3s)   "Ratio integrates with your ERP system,
  //                               sync reconciled entries with one click"
  //   L18 (scene-local 5.9-15.6s) "Every entry already has its bank match,
  //                                journal lines, Chart of Accounts..."

  // ── Phase 0 · Hero intro · runs through L17, all 5 ERPs cycle in ~5s ────
  HERO_IN:           200,
  ERP_FIRST:         500,
  ERP_STEP:          940,    // 5 logos × 940ms ≈ 4.7s — last logo lingers to HERO_OUT
  HERO_OUT:         5800,    // exits ~100ms before L18 starts

  // ── Phase 1 · Accounting · plays during L18 ─────────────────────────────
  TABLE_FADE:       5900,    // L18 starts
  ROW_REVEAL:       6100,    // first row · subsequent rows stagger 90ms

  // Sub-flow A — click one row, see its bank-recon panel, close it.
  CURSOR_IN:        7000,
  CURSOR_AT_ROW:    7400,
  ROW_CLICK:        7700,
  ROW_PANEL_OPEN:   7900,
  ROW_PANEL_FILL:   8400,
  CURSOR_TO_CLOSE: 11000,    // dwell ~3s on panel
  CLOSE_CLICK:     11500,
  PANEL_CLOSED:    11800,

  // Sub-flow B — select all + bulk sync to ERP
  CURSOR_TO_SELALL:12100,
  SELECT_ALL_CLICK:12600,
  ROW_FILL_STEP:      55,
  CURSOR_TO_SYNC:  13300,
  SYNC_CLICK:      14000,
  SYNC_PROGRESS:   14200,
  SYNCED:          15400,    // ~200ms before scene 8 ends
};

// UAE-relevant ERPs
const ERPS = [
  { name: 'Tally Prime', logo: '/logos/tally.svg' },
  { name: 'Zoho Books',  logo: '/logos/zoho-books.svg' },
  { name: 'SAP B1',      logo: '/logos/sap.svg' },
  { name: 'NetSuite',    logo: '/logos/netsuite.svg' },
  { name: 'QuickBooks',  logo: '/logos/quickbooks.svg' },
];

const BILLS = [
  { vendor: 'Al Noor Trading',      id: 'INV-2025-00428', date: '26 Aug', amt: 'AED 24,937.50', coa: 'COGS · Marble',          narration: 'Premium Marble Slabs · Aug',   avatar: 'AN', focal: true },
  { vendor: 'Sahara Logistics',     id: 'INV-2025-00422', date: '25 Aug', amt: 'AED 12,840.00', coa: 'Logistics · Freight',    narration: 'Cold-chain transit',           avatar: 'SL' },
  { vendor: 'Gulf Cargo Services',  id: 'INV-2025-00415', date: '24 Aug', amt: 'AED 30,156.40', coa: 'Freight · Inbound',      narration: 'DXB → JEA · 12 m³',            avatar: 'GC' },
  { vendor: 'Emirates FM Group',    id: 'INV-2025-00410', date: '24 Aug', amt: 'AED  6,180.50', coa: 'Office · Maintenance',   narration: 'FM services · Aug',            avatar: 'EF' },
  { vendor: 'Noor Industrial Co.',  id: 'INV-2025-00408', date: '23 Aug', amt: 'AED 19,420.00', coa: 'COGS · Steel',           narration: 'Rebar · Aug delivery',         avatar: 'NI' },
  { vendor: 'Al Marwan Suppliers',  id: 'INV-2025-00401', date: '22 Aug', amt: 'AED 60,000.00', coa: 'COGS · Cement',          narration: 'Bulk cement · Aug',            avatar: 'AM' },
  { vendor: 'Damac Vendor Co.',     id: 'INV-2025-00395', date: '21 Aug', amt: 'AED  4,250.00', coa: 'Marketing · Events',     narration: 'DXB exhibition booth',         avatar: 'DV' },
  { vendor: 'Etisalat Business',    id: 'INV-2025-00388', date: '20 Aug', amt: 'AED  3,200.00', coa: 'Telecom · 5G',           narration: 'Fleet plan · Aug',             avatar: 'EB' },
  { vendor: 'Al Manara Holdings',   id: 'INV-2025-00382', date: '19 Aug', amt: 'AED  8,500.00', coa: 'Professional · Legal',   narration: 'Retainer · Aug',               avatar: 'AH' },
  { vendor: 'Mashreq Card Centre',  id: 'INV-2025-00378', date: '18 Aug', amt: 'AED  1,150.00', coa: 'Travel · Drivers',       narration: 'Driver allowances',            avatar: 'MC' },
  { vendor: 'Microsoft Gulf',       id: 'INV-2025-00370', date: '17 Aug', amt: 'AED  2,400.00', coa: 'Software · Subs',        narration: 'Power BI licences (Aug)',      avatar: 'MG' },
];

const TOTAL_AMT = 'AED 173,034.40';

export default function Scene08SyncReconcile({ t }: { t: number }) {
  const past = (ms: number) => t >= ms;
  const inHero = !past(T.HERO_OUT);
  const isSynced  = past(T.SYNCED);
  const isSyncing = past(T.SYNC_PROGRESS) && !isSynced;
  const panelOpen = past(T.ROW_PANEL_OPEN) && !past(T.CLOSE_CLICK);

  // Cycling ERP index — advances every T.ERP_STEP after T.ERP_FIRST.
  const erpIdx = Math.min(
    ERPS.length - 1,
    Math.max(0, Math.floor((t - T.ERP_FIRST) / T.ERP_STEP)),
  );

  // ── Phase 0 — Hero ──────────────────────────────────────────────────────
  if (inHero) {
    return (
      <div
        className="flex-1 flex relative min-h-0 overflow-hidden"
        style={{
          background: '#FBF7F1',
          backgroundImage: 'radial-gradient(rgba(168,124,40,0.10) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      >
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: past(T.HERO_IN) ? 1 : 0, y: past(T.HERO_IN) ? 0 : 14 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="text-[34px] font-semibold leading-tight" style={{ color: '#1A1A2E' }}>
              Sync reconciled entries with 1&nbsp;click
            </div>
            <div className="text-[20px] mt-1" style={{ color: '#4A4A6A' }}>
              directly to your ERP
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: past(T.HERO_IN + 250) ? 1 : 0, y: past(T.HERO_IN + 250) ? 0 : 16 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex items-center gap-8"
          >
            <div
              className="rounded-2xl flex items-center justify-center"
              style={{
                width: 168,
                height: 168,
                background: 'linear-gradient(135deg, #FDF6E8 0%, #FBF7F1 100%)',
                border: '1px solid #EBDFC4',
                boxShadow: '0 18px 40px -16px rgba(168,124,40,0.18)',
              }}
            >
              <RatioLogo size={84} />
            </div>

            <div className="flex items-center justify-center" style={{ width: 56, height: 56 }}>
              <svg width="34" height="34" viewBox="0 0 28 28" fill="none">
                <path d="M5 9 H22 L18 5" stroke="#6B6B80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M23 19 H6 L10 23" stroke="#6B6B80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div
              className="rounded-2xl flex items-center justify-center bg-white"
              style={{
                width: 168, height: 168,
                border: '1px solid #E5E0D8',
                boxShadow: '0 18px 40px -16px rgba(26,26,46,0.10)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={erpIdx}
                  initial={{ opacity: 0, scale: 0.93, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -4 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center"
                  style={{ width: 130, height: 70 }}
                >
                  <img
                    src={ERPS[erpIdx].logo}
                    alt={ERPS[erpIdx].name}
                    style={{ maxWidth: 110, maxHeight: 50, objectFit: 'contain' }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: past(T.ERP_FIRST) ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5 text-[12px] uppercase tracking-widest font-semibold"
            style={{ color: '#A87C28' }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={erpIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {ERPS[erpIdx].name}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Phase 1 — Accounting (with row-click panel sub-flow) ────────────────
  return (
    <AppShell
      activeNav="rec"
      topTabs={[
        { label: 'Needs Review', count: 12 },
        { label: 'Ready to Sync', count: 11, active: !isSynced },
        { label: 'Synced',        active: isSynced },
        { label: 'Excluded' },
      ]}
      contentPadding={false}
    >
      <div className="h-full bg-white relative overflow-hidden">
        {/* Main accounting view — always full width; the row-detail panel
            opens as an OVERLAY on top, never compressing the table. */}
        <div className="h-full flex flex-col relative">
          {/* Page title */}
          <div className="px-5 py-3 flex items-center justify-between border-b border-[#E5E0D8]">
            <div className="text-[18px] font-semibold text-[#1A1A2E]">Accounting</div>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: '#1A1A2E' }}>VE</div>
          </div>

          {/* Stats + Sync */}
          <div className="px-5 py-3 flex items-center gap-6 border-b border-[#E5E0D8]">
            <Stat label="Bills"    value="11" />
            <div className="h-8 w-px bg-[#E5E0D8]" />
            <Stat label="Expenses" value="0" />
            <div className="h-8 w-px bg-[#E5E0D8]" />
            <Stat label="Payments" value={TOTAL_AMT} mono />
            <div className="ml-auto">
              <motion.button
                animate={{
                  scale: past(T.SYNC_CLICK) && t < T.SYNC_CLICK + 280 ? 0.93 : 1,
                  background: '#1EA672',
                  boxShadow: past(T.SYNC_CLICK) && t < T.SYNC_CLICK + 280
                    ? 'inset 0 2px 6px rgba(0,0,0,0.4), 0 0 0 2px rgba(168,124,40,0.4)'
                    : '0 4px 12px -4px rgba(30,166,114,0.45), inset 0 0.5px 0 rgba(255,255,255,0.18)',
                }}
                transition={{ duration: 0.18 }}
                className="relative px-4 py-1.5 rounded-md text-[11.5px] font-semibold text-white flex items-center gap-1.5"
              >
                {isSynced ? (
                  <>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    All synced
                  </>
                ) : isSyncing ? (
                  <>
                    <motion.svg
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      width="11" height="11" viewBox="0 0 24 24" fill="none"
                    >
                      <path d="M21 12a9 9 0 11-3-6.7" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                    </motion.svg>
                    Syncing…
                  </>
                ) : (
                  <>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M21 12a9 9 0 11-3-6.7L21 8M21 3v5h-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Sync (11)
                  </>
                )}
                <AnimatePresence>
                  {past(T.SYNC_CLICK) && t < T.SYNC_CLICK + 600 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0.55 }}
                      animate={{ scale: 3.2, opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-md"
                      style={{ background: 'rgba(255,255,255,0.55)' }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Column header */}
          <div className="px-5 py-2 border-b border-[#E5E0D8] grid grid-cols-[24px_1fr_120px_70px_50px_120px_140px_180px_36px] gap-3 text-[9.5px] uppercase tracking-widest text-[#6B6B80] font-semibold items-center">
            <Checkbox checked={past(T.SELECT_ALL_CLICK)} pressing={past(T.SELECT_ALL_CLICK) && t < T.SELECT_ALL_CLICK + 220} />
            <span>Vendor</span>
            <span>ID</span>
            <span>Date</span>
            <span>Bill</span>
            <span className="text-right">Bill Amount</span>
            <span>CoA</span>
            <span>Description</span>
            <span className="text-right">Action</span>
          </div>

          {/* Rows */}
          <div className="overflow-auto flex-1" style={{ paddingBottom: 8 }}>
            {BILLS.map((b, i) => {
              const visible    = past(T.ROW_REVEAL + i * 90);
              const isSelected = past(T.SELECT_ALL_CLICK + i * T.ROW_FILL_STEP);
              // The focal row gets bronze ONLY while it's being clicked (panel
              // about to open) up until select-all fires — so the user knows
              // "this is the one we're inspecting". Once select-all kicks in,
              // every row shares the same selected wash.
              const isFocalActive = b.focal && past(T.ROW_CLICK) && !past(T.SELECT_ALL_CLICK);
              const rowBg = isSelected ? '#FDF6E8' : isFocalActive ? '#FDF6E8' : 'white';
              return (
                <motion.div
                  key={b.id}
                  initial={false}
                  animate={{
                    opacity: visible ? 1 : 0,
                    y: visible ? 0 : 4,
                    background: rowBg,
                  }}
                  transition={{ duration: 0.3 }}
                  className="px-5 py-2.5 grid grid-cols-[24px_1fr_120px_70px_50px_120px_140px_180px_36px] gap-3 border-b border-[#F0EDE6] items-center text-[11.5px]"
                >
                  <Checkbox checked={past(T.SELECT_ALL_CLICK + i * T.ROW_FILL_STEP)} />
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" style={{ background: '#1A1A2E' }}>
                      {b.avatar}
                    </div>
                    <span className="text-[#1A1A2E] truncate">{b.vendor}</span>
                  </div>
                  <span className="font-mono text-[10.5px] text-[#4A4A6A]">{b.id}</span>
                  <span className="text-[10.5px] text-[#6B6B80] font-mono">{b.date}</span>
                  <div className="w-7 h-8 rounded bg-rose-50 border border-rose-200 flex items-center justify-center">
                    <span className="text-[7px] font-bold text-rose-600">PDF</span>
                  </div>
                  <span className="text-right font-mono font-semibold text-[#1A1A2E]">{b.amt}</span>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                      <path d="M6 1.2 L7 5 L10.8 6 L7 7 L6 10.8 L5 7 L1.2 6 L5 5 Z" fill="#A87C28" />
                    </svg>
                    <span className="text-[#1A1A2E] truncate">{b.coa}</span>
                  </div>
                  <span className="text-[#4A4A6A] truncate">{b.narration}</span>
                  <div className="flex items-center justify-end">
                    <button className="w-6 h-6 rounded flex items-center justify-center text-[#4A4A6A] border border-[#E5E0D8]" title="Edit mapping">
                      <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                        <path d="M9 1.6L12.4 5L4.6 12.8H1.2V9.4L9 1.6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ERP connections footer */}
          <div className="px-5 py-2 flex items-center gap-3 border-t border-[#E5E0D8] flex-shrink-0" style={{ background: '#FBF7F1' }}>
            <span className="text-[9.5px] uppercase tracking-widest text-[#6B6B80] font-semibold">Connected to</span>
            <div className="flex items-center gap-1.5">
              {ERPS.map((e) => (
                <div
                  key={e.name}
                  className="px-2 py-1 rounded-md border bg-white flex items-center justify-center"
                  style={{ width: 50, height: 22, borderColor: isSynced ? '#1EA672' : '#E5E0D8' }}
                  title={e.name}
                >
                  <img src={e.logo} alt={e.name} style={{ maxWidth: 38, maxHeight: 12, objectFit: 'contain' }} />
                </div>
              ))}
            </div>
            {isSynced && (
              <span className="text-[10px] font-semibold flex items-center gap-1" style={{ color: '#1EA672' }}>
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#1EA672" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                11 entries posted · Tally Prime
              </span>
            )}
          </div>

          {/* Cursor — Al Noor row → Close → Select-all → Sync (4 stops).
              Positioned relative to the accounting flex-col (which sits below
              the AppShell tabs). All coordinates are scene-local pixels.
              SVG cursor tip is at (2,2) inside the 22×26 SVG. */}
          <AnimatePresence>
            {past(T.CURSOR_IN) && t < T.SYNCED + 400 && (
              <motion.div
                initial={{ opacity: 0, top: 280, left: 220 }}
                animate={{
                  opacity: 1,
                  // Cursor's absolute parent is the accounting flex-col, which
                  // sits inside the AppShell content area (RIGHT of the nav
                  // rail). So x=0 is right after the nav rail, NOT scene-root.
                  // Content area is ~1228px wide (1280 - 52 nav).
                  //
                  // Vertical layout (y=0 is below the AppShell top tabs):
                  //   Page title row: 0–50   (py-3 + 18px text)
                  //   Stats row:      50–112 (py-3 + 15px value + 9.5px label)
                  //   Column header:  112–142
                  //   Rows:           142+   (each ~46px) · row 1 centre ≈165
                  //
                  // Targets:
                  //   • Al Noor row vendor area: y≈165, x≈120
                  //     (px-5(20) + checkbox(24) + gap(12) + avatar(24)/2 + 30)
                  //   • Close ✕ on panel: panel sits at right edge, width 460.
                  //     Panel left ≈ 1228-460 = 768. Close X near panel right
                  //     edge: x ≈ 1199. Header py-3 + svg/2 = y≈19.
                  //   • Select-all checkbox: y≈127, x≈30
                  //     (px-5(20) + checkbox/2(8) ≈ 28; tip offset ⇒ 30)
                  //   • Sync button: stats row right side. Button ~100px wide,
                  //     right edge ≈ 1208. Centre ≈ 1158. y≈80.
                  // Cursor SVG tip is at (2,2), so subtract 2 from each.
                  top:  past(T.CURSOR_TO_SYNC)   ? 78
                       : past(T.CURSOR_TO_SELALL) ? 125
                       : past(T.CURSOR_TO_CLOSE)  ? 24   // panel header centre
                       : 163,
                  left: past(T.CURSOR_TO_SYNC)   ? 1158
                       : past(T.CURSOR_TO_SELALL) ? 30
                       : past(T.CURSOR_TO_CLOSE)  ? 1199
                       : 118,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.35 },
                  top:     { duration: 0.7, ease: [0.32, 0.72, 0.26, 1] },
                  left:    { duration: 0.7, ease: [0.32, 0.72, 0.26, 1] },
                }}
                className="absolute pointer-events-none z-[55]"
              >
                <SyncCursor pressing={
                  (past(T.ROW_CLICK)        && t < T.ROW_CLICK + 220) ||
                  (past(T.CLOSE_CLICK)      && t < T.CLOSE_CLICK + 220) ||
                  (past(T.SELECT_ALL_CLICK) && t < T.SELECT_ALL_CLICK + 220) ||
                  (past(T.SYNC_CLICK)       && t < T.SYNC_CLICK + 220)
                } />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Row detail panel — OVERLAY on top of the table with a blurred
            backdrop. Rows behind keep their full width unchanged. */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              key="row-detail-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-30 pointer-events-none"
              style={{
                background: 'rgba(20, 20, 35, 0.18)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {panelOpen && (
            <motion.aside
              key="row-detail-panel"
              initial={{ x: 460, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 460, opacity: 0 }}
              transition={{
                x:       { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              }}
              className="absolute top-0 right-0 bottom-0 z-40 border-l border-[#E5E0D8] bg-white flex flex-col overflow-auto shadow-[-12px_0_30px_-16px_rgba(26,26,46,0.18)]"
              style={{ width: 460 }}
            >
              {/* Panel header */}
              <div className="px-4 py-3 flex items-center gap-2 border-b border-[#E5E0D8]">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: '#1A1A2E' }}>AN</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-semibold text-[#1A1A2E]">Al Noor Trading</div>
                  <div className="text-[10px] text-[#6B6B80] font-mono">INV-2025-00428 · 26 Aug</div>
                </div>
                <button
                  className="text-[#6B6B80] hover:text-[#1A1A2E] px-1"
                  title="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-4 py-3 flex-1">
                {/* Bank reconciliation card */}
                <motion.div
                  initial={false}
                  animate={{ opacity: past(T.ROW_PANEL_FILL) ? 1 : 0, y: past(T.ROW_PANEL_FILL) ? 0 : 6 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-md border border-[#E5E0D8] overflow-hidden mb-4"
                >
                  <div className="px-3 py-1.5 text-[9.5px] uppercase tracking-widest text-[#6B6B80] font-semibold flex items-center justify-between" style={{ background: '#FBF7F1' }}>
                    <span>Bank reconciliation</span>
                    <span className="text-[9px] font-semibold flex items-center gap-1 normal-case" style={{ color: '#1EA672' }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#1EA672' }} />
                      Auto-matched
                    </span>
                  </div>
                  <div className="px-3 py-2.5 grid grid-cols-2 gap-y-2 gap-x-3 text-[11px]">
                    <Detail k="Rail"      v="UAEFTS" />
                    <Detail k="UTR"       v="UFT-25-0814-77432" mono />
                    <Detail k="Debited"  v="14 Mar · 14:08" />
                    <Detail k="Settled"  v="14 Mar · 14:11" />
                    <Detail k="From"     v="ENBD ·· 1209" />
                    <Detail k="To IBAN"  v="·· 5678 (Mashreq)" />
                  </div>
                </motion.div>

                {/* Linked bill confirmation */}
                <motion.div
                  initial={false}
                  animate={{ opacity: past(T.ROW_PANEL_FILL + 200) ? 1 : 0, y: past(T.ROW_PANEL_FILL + 200) ? 0 : 6 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-md p-3 mb-4 flex items-center gap-2"
                  style={{ background: '#EBFAF3', border: '1px solid #C3E8D5' }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#1EA672" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[11px]" style={{ color: '#1A6F4E' }}>
                    Matched to <span className="font-mono">INV-2025-00428</span> · 3-way verified
                  </span>
                </motion.div>

                {/* Journal posting preview */}
                <motion.div
                  initial={false}
                  animate={{ opacity: past(T.ROW_PANEL_FILL + 400) ? 1 : 0, y: past(T.ROW_PANEL_FILL + 400) ? 0 : 6 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-md border border-[#E5E0D8] overflow-hidden"
                >
                  <div className="px-3 py-1.5 text-[9.5px] uppercase tracking-widest text-[#6B6B80] font-semibold flex items-center justify-between" style={{ background: '#FBF7F1' }}>
                    <span>Journal entry · auto-coded</span>
                    <span className="text-[8.5px] font-semibold px-1.5 py-0.5 rounded normal-case" style={{ background: '#FDF6E8', color: '#A87C28' }}>
                      ✦ AI
                    </span>
                  </div>
                  <table className="w-full text-[10.5px]">
                    <thead>
                      <tr className="text-[8.5px] uppercase tracking-widest text-[#6B6B80]" style={{ background: '#FBFAF7' }}>
                        <th className="px-3 py-1 text-left font-semibold">Account</th>
                        <th className="px-3 py-1 text-right font-semibold">Debit</th>
                        <th className="px-3 py-1 text-right font-semibold">Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#F0EDE6]">
                        <td className="px-3 py-1.5 text-[#1A1A2E]">COGS · Marble (5101)</td>
                        <td className="px-3 py-1.5 font-mono text-right text-[#1A1A2E]">22,950.00</td>
                        <td className="px-3 py-1.5 font-mono text-right text-[#999]">–</td>
                      </tr>
                      <tr className="border-t border-[#F0EDE6]">
                        <td className="px-3 py-1.5 text-[#1A1A2E]">Freight expense (5210)</td>
                        <td className="px-3 py-1.5 font-mono text-right text-[#1A1A2E]">800.00</td>
                        <td className="px-3 py-1.5 font-mono text-right text-[#999]">–</td>
                      </tr>
                      <tr className="border-t border-[#F0EDE6]">
                        <td className="px-3 py-1.5 text-[#1A1A2E]">Input VAT 5% (1205)</td>
                        <td className="px-3 py-1.5 font-mono text-right text-[#1A1A2E]">1,187.50</td>
                        <td className="px-3 py-1.5 font-mono text-right text-[#999]">–</td>
                      </tr>
                      <tr className="border-t border-[#F0EDE6]">
                        <td className="px-3 py-1.5 text-[#1A1A2E]">Accounts Payable (2010)</td>
                        <td className="px-3 py-1.5 font-mono text-right text-[#999]">–</td>
                        <td className="px-3 py-1.5 font-mono text-right text-[#1A1A2E]">24,937.50</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="px-3 py-1.5 text-[9.5px] text-[#6B6B80] flex items-center gap-1.5 border-t border-[#E5E0D8]" style={{ background: '#FBF7F1' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#1EA672' }} />
                    Cost centre OPS-DXB · ready for sync
                  </div>
                </motion.div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────
function Stat({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[9.5px] uppercase tracking-widest text-[#6B6B80] font-semibold">{label}</div>
      <div className={`text-[15px] font-semibold text-[#1A1A2E] mt-0.5 ${mono ? 'font-mono' : ''}`}>{value}</div>
    </div>
  );
}

function Detail({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="min-w-0">
      <div className="text-[9px] uppercase tracking-widest text-[#6B6B80] font-semibold">{k}</div>
      <div className={`text-[11.5px] text-[#1A1A2E] truncate ${mono ? 'font-mono' : ''}`}>{v}</div>
    </div>
  );
}

function Checkbox({ checked, pressing }: { checked: boolean; pressing?: boolean }) {
  return (
    <motion.div
      animate={{
        scale: pressing ? 0.88 : 1,
        background: checked ? '#1A1A2E' : 'white',
        borderColor: checked ? '#1A1A2E' : '#D8D2C5',
      }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="w-4 h-4 rounded flex items-center justify-center"
      style={{ border: '1.5px solid #D8D2C5' }}
    >
      {checked && (
        <motion.svg
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
          width="9" height="9" viewBox="0 0 12 12" fill="none"
        >
          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      )}
    </motion.div>
  );
}

function SyncCursor({ pressing }: { pressing: boolean }) {
  return (
    <motion.div
      animate={{ scale: pressing ? 0.86 : 1 }}
      transition={{ duration: 0.12 }}
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}
    >
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
        <path
          d="M2 2 L2 21 L7 16.5 L10 23 L13 22 L10 15.5 L17 15.5 Z"
          fill="white"
          stroke="#1A1A2E"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
