import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppShell from '../components/AppShell';
import PdfViewer from '../components/PdfViewer';
import TaxInvoiceDoc from '../components/TaxInvoiceDoc';

// Merged Scene 3 + Scene 4 - "Invoice Processing" - one continuous scene (28s).
//   0-14s   = Scene 3 portion: bill detail extraction with EN/AR toggle
//   14-28s  = Scene 4 portion: scroll → compliance + PO/GRN + 3-way match (with modal)
//
// Same component instance is used for both scene IDs in App.tsx so there's no
// AnimatePresence re-mount between them.

const T = {
  // ── Scene 3 portion · Bill detail loads (0-14000ms) ─────────────────────────
  HEADER_FILL: 1200,
  // Smart insights section appears COLLAPSED — visible but not yet expanded.
  // It's the first thing the user sees; the expansion happens later, after PO/GRN.
  INSIGHTS_SHOW:    1300,
  FIELD1: 1900, FIELD2: 2300, FIELD3: 2700, FIELD4: 3100, FIELD5: 3500, FIELD6: 3900,
  AR_TOGGLE: 6500,
  EN_TOGGLE: 10000,

  // ── Scene 4 portion - keyframes locked to L8 / L9 / L10 / L11 voiceover ──
  // mergedT origin = scene 3 start (global 34.2s). So:
  //   L8  (52.1-58.4s) "FTA rules / Duplicates flagged"  -> mergedT 17900-24200
  //   L9  (58.5-64.6s) "purchase order and GRN"          -> mergedT 24300-30400
  //   L10 (64.7-69.5s) "surfaces smart insights"         -> mergedT 30500-35300
  //   L11 (69.6-77.7s) "Pricing drift / duplicate / risk"-> mergedT 35400-43500
  //
  // Step 1 (Compliance) reveals BEFORE the scroll, peeking up from the bottom.
  STEP1_SHOW:  16500,   // ~1.4s before L8, peek
  STEP1_S1:    18300,   // L8 line 1: "FTA rules"
  STEP1_S2:    19800,
  STEP1_S3:    21000,   // L8 line 2: "Duplicates flagged"
  STEP1_DONE:  22500,

  // Slow scroll DOWN (custom RAF, ~1800ms) — starts just as L8 begins
  SCROLL_DOWN: 17900,

  // Step 2 (PO / GRN modal) is locked to L9 — modal opens once the VO says
  // "purchase order and GRN" so the click matches the words.
  STEP2_SHOW:  23800,
  STEP2_S1:    24500,
  STEP2_S2:    25500,
  MODAL_OPEN:  26200,   // ~1.9s into L9 - modal pops as VO says "GRN"
  M_CURSOR_IN:    26500,
  M_CURSOR_AT_OPT:27000,
  MODAL_PICK:     28100,
  M_CURSOR_AT_SEL:28500,
  M_SELECT_CLICK: 29400,
  MODAL_CLOSE:    29800,
  STEP2_S3:       29900,
  STEP2_DONE:     30200,

  // ── Scroll BACK UP. Cursor stays from modal, travels with the scroll up to
  //    the Smart Insights chevron, clicks it, the card expands, then the
  //    cursor moves to the back arrow and clicks to leave for Approval. ──────
  SCROLL_UP:           30700,   // start of L10 - "smart insights"
  CURSOR_TO_INSIGHTS:  31300,
  CURSOR_AT_INSIGHTS:  32600,
  INSIGHTS_CLICK:      33100,   // mid-L10 - card expands as VO names insights
  CURSOR_TO_BACK:      41000,   // L11 winding down - head to back arrow
  BACK_CLICK:          42500,   // ~1s before scene 6 begins
};

const GRNS = [
  { id: 'GRN-344123', date: '20 Aug', loc: 'DXB warehouse', amt: '5.4 m² · AED 22,950', avail: 'Available · matches PO line 1' },
  { id: 'GRN-002343', date: '20 Aug', loc: 'JEA · transit',  amt: '3.2 m² · AED 13,600', avail: 'Available · partial' },
  { id: 'GRN-030523', date: '14 Aug', loc: 'DXB warehouse', amt: '4.1 m² · AED 17,425', avail: 'Available · prior PO' },
  { id: 'GRN-018712', date: '11 Aug', loc: 'DXB warehouse', amt: '5.0 m² · AED 21,250', avail: 'Already invoiced' },
];

export default function Scene04Match({ t }: { t: number }) {
  const past = (ms: number) => t >= ms;
  const showAR = t >= T.AR_TOGGLE && t < T.EN_TOGGLE;
  const modalOpen = past(T.MODAL_OPEN) && !past(T.MODAL_CLOSE);

  // Slow custom RAF scroll (~1800ms ease-in-out) — two phases:
  //   • SCROLL_DOWN → animate to action-steps offset so user sees compliance + PO/GRN
  //   • SCROLL_UP   → animate back to top so insights expand at the start of the page
  // STEP1 (Compliance) reveals BEFORE the down-scroll so the action steps are
  // already partially visible at the bottom of the body when the scroll begins.
  const bodyRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const scrollPhase: 'top' | 'bottom' =
    t >= T.SCROLL_DOWN && t < T.SCROLL_UP ? 'bottom' : 'top';
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    const body = bodyRef.current;
    const steps = stepsRef.current;
    if (!body) return;
    // Scroll just far enough to bring the action-steps into view — clamp to
    // the body's max scrollable distance so we don't leave a tall empty
    // gutter below the steps.
    const maxScroll = Math.max(0, body.scrollHeight - body.clientHeight);
    const desired = steps ? steps.offsetTop - 12 : 0;
    const target = scrollPhase === 'bottom' ? Math.min(desired, maxScroll) : 0;
    const start = body.scrollTop;
    const change = target - start;
    if (Math.abs(change) < 1) return;
    const duration = 1800;
    const startTime = performance.now();
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      body.scrollTop = start + change * eased;
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else rafRef.current = null;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollPhase]);

  return (
    <div className="flex-1 flex relative min-h-0 overflow-hidden">
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
        <div className="h-full overflow-hidden bg-white flex flex-col">
          {/* Bill detail header */}
          <div className="px-5 pt-4 pb-3 border-b border-[#E5E0D8] flex items-center gap-3 flex-shrink-0">
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
              <div className="text-[11px] text-[#6B6B80]">Al Noor Trading · Aug 25</div>
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
            <div className="flex items-center gap-1 bg-white border border-[#E5E0D8] rounded-md p-0.5 ml-1">
              <button className={`px-2.5 py-0.5 text-[10px] rounded ${!showAR ? 'bg-[#1A1A2E] text-white' : 'text-[#6B6B80]'}`}>EN</button>
              <button className={`px-2.5 py-0.5 text-[10px] rounded ${showAR ? 'bg-[#1A1A2E] text-white' : 'text-[#6B6B80]'}`}>AR</button>
            </div>
          </div>

          {/* Scrollable body */}
          <div ref={bodyRef} className="flex-1 overflow-auto px-5 py-4">
            {/* Smart insights — visible from the start (collapsed). The cursor
                clicks the chevron after the page scrolls back up, expanding
                the card to surface 3 flagged issues for human review. */}
            <SmartInsights
              show={past(T.INSIGHTS_SHOW)}
              expanded={past(T.INSIGHTS_CLICK)}
              items={[
                {
                  title: 'Price 18% above 90-day average',
                  detail: 'AED 4,250 / m² billed · vendor median 90d AED 3,605.',
                  cta: 'Query vendor',
                },
                {
                  title: 'Possible duplicate against INV-2034',
                  detail: 'Same vendor + total AED 24,937.50 · invoiced 6 days apart · 71% confidence.',
                  cta: 'Compare',
                },
                {
                  title: 'Trade licence expiring in 14 days',
                  detail: 'Al Noor Trading expires 5 Sep · auto-block POs after expiry unless renewed.',
                  cta: 'Set reminder',
                },
              ]}
            />

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
            <div className="mb-6">
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

            {/* Action steps - thinking-step format - revealed after scroll */}
            <div id="action-steps" ref={stepsRef} className="space-y-6" style={{ scrollMarginTop: 12, paddingBottom: 32 }}>
              <ThinkingStep
                visible={past(T.STEP1_SHOW)}
                done={past(T.STEP1_DONE)}
                label="Compliance checks"
                subItems={[
                  { text: 'Tax Invoice format · FTA-compliant', meta: 'TRN · AED · VAT calc · valid', visible: past(T.STEP1_S1) },
                  { text: 'No duplicate found',                  meta: 'searched by vendor + no. + amount', visible: past(T.STEP1_S2) },
                  { text: 'Currency · AED native',              meta: 'no FX conversion required', visible: past(T.STEP1_S3) },
                ]}
              />
              <ThinkingStep
                visible={past(T.STEP2_SHOW)}
                done={past(T.STEP2_DONE)}
                label="Purchase Order and Goods Received fetched from your ERP"
                subItems={[
                  { text: 'Purchase Order PO-MD2025-0331',       meta: '5.4 m² Marble + freight · AED 22,950', visible: past(T.STEP2_S1) },
                  { text: '6 GRNs available against this PO',    meta: 'reviewing by date and qty', visible: past(T.STEP2_S2) },
                  { text: 'GRN-344123 selected · three-way matched', meta: '20 Aug · DXB warehouse · variance 0.0%', visible: past(T.STEP2_S3) },
                ]}
              />
            </div>
          </div>
        </div>
      </AppShell>

      {/* GRN selection modal - centered overlay using flex (no transform conflict) */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-40"
              style={{ background: 'rgba(26,26,46,0.4)' }}
            />
            <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-xl border border-[#E5E0D8] shadow-2xl overflow-hidden pointer-events-auto"
                style={{ width: 540 }}
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E5E0D8]">
                  <button>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18l-6-6 6-6" stroke="#6B6B80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="text-[14px] font-semibold text-[#1A1A2E] flex-1">6 GRN's available against the PO</div>
                  <button>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M6 6l12 12M18 6L6 18" stroke="#6B6B80" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <div className="px-4 py-2 border-b border-[#E5E0D8]" style={{ background: '#FBF7F1' }}>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-md border border-[#E5E0D8] text-[11px] text-[#1A1A2E] font-mono">
                    PO: PO-MD2025-0331
                  </div>
                </div>
                <div className="px-2 py-1 max-h-[320px] overflow-auto">
                  {GRNS.map((g, i) => {
                    const selected = i === 0 && past(T.MODAL_PICK);
                    return (
                      <div key={g.id} className={`px-3 py-2.5 rounded-md flex items-center gap-3 ${i !== GRNS.length - 1 ? 'border-b border-[#F0EDE6]' : ''}`}>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selected ? 'border-[#1EA672]' : 'border-[#D8D2C5]'
                        }`}>
                          {selected && <div className="w-2 h-2 rounded-full" style={{ background: '#1EA672' }} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-semibold text-[#1A1A2E]">{g.id}</div>
                          <div className="text-[10.5px] text-[#6B6B80]">{g.date} · {g.loc}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10.5px] text-[#1A1A2E] font-mono">{g.amt}</div>
                          <div className="text-[9.5px] text-[#6B6B80]">{g.avail}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-[#E5E0D8] bg-white">
                  <button className="px-4 py-2 rounded-md text-[12px] font-medium text-[#4A4A6A] border border-[#E5E0D8]">Cancel</button>
                  <motion.button
                    animate={{
                      background: past(T.MODAL_PICK) ? '#1EA672' : '#9DC9B0',
                      scale: t >= T.M_SELECT_CLICK && t < T.M_SELECT_CLICK + 220 ? 0.93 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="relative px-5 py-2 rounded-md text-[12px] font-semibold text-white"
                  >
                    Select
                    <AnimatePresence>
                      {t >= T.M_SELECT_CLICK && t < T.M_SELECT_CLICK + 500 && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0.55 }}
                          animate={{ scale: 3, opacity: 0 }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className="absolute inset-0 rounded-md"
                          style={{ background: 'rgba(255,255,255,0.55)' }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

                {/* Animated cursor — anchored to modal, points at first GRN row, then to Select */}
                <AnimatePresence>
                  {past(T.M_CURSOR_IN) && t < T.MODAL_CLOSE + 100 && (
                    <motion.div
                      initial={{ opacity: 0, top: 360, left: 500 }}
                      animate={{
                        opacity: 1,
                        // Cursor positioned relative to the modal (which is 540px wide).
                        // SVG tip is at (2,2) inside the 22×26 cursor SVG.
                        // First-option radio: center (29, 121), 16×16.
                        // Select button: center (484, 347), 76×34.
                        top:
                          t >= T.M_CURSOR_AT_SEL ? 340
                          : t >= T.M_CURSOR_AT_OPT ? 118
                          : 360,
                        left:
                          t >= T.M_CURSOR_AT_SEL ? 476
                          : t >= T.M_CURSOR_AT_OPT ? 24
                          : 500,
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{
                        opacity: { duration: 0.25 },
                        top:  { duration: 0.7, ease: [0.32, 0.72, 0.26, 1] },
                        left: { duration: 0.7, ease: [0.32, 0.72, 0.26, 1] },
                      }}
                      className="absolute pointer-events-none"
                    >
                      <ModalCursor pressing={
                        (t >= T.MODAL_PICK && t < T.MODAL_PICK + 220) ||
                        (t >= T.M_SELECT_CLICK && t < T.M_SELECT_CLICK + 220)
                      } />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Persistent post-modal cursor — appears at the Select button position
          just as the modal exits, then animates up alongside the scroll-up to
          the Smart Insights chevron, clicks, and fades out toward scene end.
          (Coordinates are scene-root absolute pixels; the canvas is 1280×768
          minus the top nav, so scene-root is roughly 1280×682.) */}
      <AnimatePresence>
        {t >= T.MODAL_CLOSE && (
          <motion.div
            key="scene-cursor"
            initial={false}
            animate={{
              opacity: 1,
              // Three target positions (scene-root absolute pixels):
              //   • Select button (modal centered):    (846, 502)
              //   • Smart Insights chevron:            (778, 126)
              //   • Back arrow (bill detail header):   ( 65,  60)
              //     – nav-rail(52) + px-5(20) + svg-half(7) - tip(2) ≈ 77 left
              //     – tabs(44) + pt-4(16) + svg-half(7) - tip(2) ≈ 65 top
              top:
                past(T.CURSOR_TO_BACK)     ? 65
                : past(T.CURSOR_TO_INSIGHTS) ? 126
                : 502,
              left:
                past(T.CURSOR_TO_BACK)     ? 77
                : past(T.CURSOR_TO_INSIGHTS) ? 778
                : 846,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              top:     { duration: 1.30, ease: [0.32, 0.72, 0.26, 1] },
              left:    { duration: 1.30, ease: [0.32, 0.72, 0.26, 1] },
            }}
            className="absolute pointer-events-none z-[55]"
          >
            <ModalCursor pressing={
              (t >= T.INSIGHTS_CLICK && t < T.INSIGHTS_CLICK + 220) ||
              (t >= T.BACK_CLICK     && t < T.BACK_CLICK + 220)
            } />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// "Smart insights" — collapsible card pinned to the top of the bill detail
// view. Starts collapsed; the persistent cursor clicks the chevron after the
// page scrolls back up, smoothly expanding the card to surface 3 flagged
// issues. No nested boxes per item — just a sparkle + concise copy + a small
// underlined action button per row, separated by hairline dividers.
interface InsightItem {
  title: string;
  detail: string;
  cta: string;
}

function SmartInsights({
  show, expanded, items,
}: {
  show: boolean;
  expanded: boolean;
  items: InsightItem[];
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mb-4 rounded-md border overflow-hidden relative"
      style={{
        // Ratio brand gradient — subtle cream→bronze→cream wash that signals
        // "AI surface" without overpowering the rest of the bill detail page.
        background:
          'linear-gradient(135deg, #FDF6E8 0%, #FBF7F1 45%, #F7EFDC 100%)',
        borderColor: '#EBDFC4',
        boxShadow: '0 1px 2px rgba(168, 124, 40, 0.05)',
      }}
    >
      {/* Subtle gold sheen accent at the top edge — AI-section affordance */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(168, 124, 40, 0.45) 35%, rgba(168, 124, 40, 0.55) 65%, transparent 100%)',
        }}
      />
      <div className="w-full flex items-center justify-between px-3.5 py-2.5 relative">
        <div className="flex items-center gap-2">
          {/* Bronze-tinted sparkle icon — Ratio's AI mark */}
          <div
            className="w-[22px] h-[22px] rounded-md flex items-center justify-center flex-shrink-0"
            style={{
              background:
                'linear-gradient(135deg, #FDF6E8 0%, #F4E4BD 100%)',
              border: '1px solid #EBDFC4',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1 L8.1 5.4 L12.5 6.5 L8.1 7.6 L7 12 L5.9 7.6 L1.5 6.5 L5.9 5.4 Z"
                fill="#A87C28"
              />
              <path d="M11.5 1.5 L12 3 L13.5 3.5 L12 4 L11.5 5.5 L11 4 L9.5 3.5 L11 3 Z" fill="#A87C28" opacity="0.7" />
            </svg>
          </div>
          <div className="text-[12px] font-semibold tracking-[0.01em]" style={{ color: '#1A1A2E' }}>
            Smart Insights
          </div>
          <motion.span
            initial={false}
            animate={{ opacity: expanded ? 1 : 0, scale: expanded ? 1 : 0.85 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10px] px-1.5 py-0.5 rounded font-semibold"
            style={{ background: 'white', color: '#A87C28', border: '1px solid #F0E0B8' }}
          >
            ⚠ {items.length} flagged
          </motion.span>
        </div>
        <motion.svg
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          width="11" height="11" viewBox="0 0 12 12" fill="none"
        >
          <path d="M3 4.5l3 3 3-3" stroke="#6B6B80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </div>
      {/* Expansion: animate maxHeight to a stable upper bound (avoids the
          'auto'-measurement overshoot that produced jitter). All rows mount
          immediately so the panel grows monotonically. */}
      <motion.div
        initial={false}
        animate={{
          maxHeight: expanded ? 360 : 0,
          opacity:   expanded ? 1   : 0,
        }}
        transition={{
          maxHeight: { duration: 0.45, ease: [0.32, 0.72, 0.26, 1] },
          opacity:   { duration: 0.30, ease: [0.32, 0.72, 0.26, 1] },
        }}
        style={{ overflow: 'hidden' }}
      >
        <div
          className="border-t"
          style={{
            borderColor: '#EBDFC4',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.85) 100%)',
          }}
        >
          {items.map((it, i) => (
            <InsightRow key={i} item={it} isLast={i === items.length - 1} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function InsightRow({ item, isLast }: { item: InsightItem; isLast: boolean }) {
  return (
    <div
      className={`flex items-start gap-2.5 px-3.5 py-2.5 ${isLast ? '' : 'border-b'}`}
      style={{ borderColor: '#EFECE5' }}
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="mt-[5px] flex-shrink-0">
        <path d="M6 1.2 L7 5 L10.8 6 L7 7 L6 10.8 L5 7 L1.2 6 L5 5 Z" fill="#1EA672" />
      </svg>
      <div className="flex-1 min-w-0 text-[11.5px] leading-[1.5]">
        <span className="font-semibold text-[#1A1A2E]">{item.title}</span>
        <span className="text-[#5A5A70]"> · {item.detail}</span>
      </div>
      <button
        className="text-[10.5px] font-semibold underline whitespace-nowrap mt-[2px] flex-shrink-0"
        style={{ color: '#A87C28' }}
      >
        {item.cta}
      </button>
    </div>
  );
}

function ModalCursor({ pressing }: { pressing: boolean }) {
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

interface SubItem { text: string; meta?: string; visible?: boolean; }

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
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#1EA672] flex-shrink-0">
                <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[#1A1A2E] font-medium">{s.text}</span>
              {s.meta && <span className="text-[#999] font-mono text-[10.5px]">· {s.meta}</span>}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
