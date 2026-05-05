import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppShell from '../components/AppShell';

// Scene 7 - Payment + PDC lifecycle (Mysa-style payment screen → PDC register)

const T = {
  ROW_SELECT:    500,
  BANK_PICK:    1500,
  VERIFY:       2400,
  // Cursor enters and presses Pay now
  PAY_CURSOR_IN: 2900,
  PAY_AT_BTN:   3200,
  PAY:          3500,    // click moment
  PAID:         4800,
  // Cursor moves up to the "Scheduled" tab and clicks it
  CURSOR_TO_TAB:5400,
  TAB_CLICK:    6300,
  PDC_PIVOT:    6500,    // body swaps from Pay-bills → Scheduled
  PDC_REGISTER: 7400,
  PDC_FOCUS:    9200,
  STAGE_DEP:   10800,
  STAGE_CLR:   13000,
};

const SELECTED_BILLS = [
  { v: 'Al Noor Trading',     id: 'INV-2025-00428', amt: 'AED 24,937.50', sel: true,  rail: 'UAEFTS', avatar: 'AN' },
  { v: 'Sahara Logistics',    id: 'INV-2025-00422', amt: 'AED 12,840.00', sel: true,  rail: 'IPP',    avatar: 'SL' },
  { v: 'Gulf Cargo Services', id: 'INV-2025-00415', amt: 'USD 8,200.00',  sel: false, rail: 'SWIFT',  avatar: 'GC' },
];

// Scheduled = mixed-rail future-dated payments. The first row is Al Noor
// Trading — the same vendor we just approved in Scene 6. Its bill rolls into
// "Scheduled" with a PDC issued, and we follow that cheque's lifecycle on
// the right-side panel (issued → deposited → cleared).
const SCHEDULED = [
  { rail: 'PDC',    ref: 'CHQ-001340', vendor: 'Al Noor Trading',     bill: 'INV-2025-00428', amt: 'AED 24,937.50', run: '20 May', avatar: 'AN', stage: 0, focal: true },
  { rail: 'UAEFTS', ref: 'TXN-440152', vendor: 'Emirates FM Group',   bill: 'INV-2025-00310', amt: 'AED 12,400.00', run: '22 Apr', avatar: 'EF', stage: 0 },
  { rail: 'PDC',    ref: 'CHQ-001284', vendor: 'Al Marwan Suppliers', bill: 'INV-2025-00401', amt: 'AED 60,000.00', run: '14 Apr', avatar: 'AM', stage: 0 },
  { rail: 'PDC',    ref: 'CHQ-001335', vendor: 'Gulf Cargo Services', bill: 'INV-2025-00277', amt: 'AED 45,000.00', run: '02 May', avatar: 'GC', stage: 0 },
  { rail: 'IPP',    ref: 'IPP-880233', vendor: 'Noor Industrial Co.', bill: 'INV-2025-00185', amt: 'AED  6,180.00', run: '20 Mar', avatar: 'NI', stage: 2 },
];

export default function Scene07PaymentPDC({ t }: { t: number }) {
  const past = (ms: number) => t >= ms;
  const inPDC = past(T.PDC_PIVOT);

  // PDC focus row stage progression
  const focusStage = past(T.STAGE_CLR) ? 2 : past(T.STAGE_DEP) ? 1 : past(T.PDC_FOCUS) ? 0 : 0;

  return (
    <AppShell
      activeNav="pay"
      topTabs={[
        // PDC is a payment rail, not a peer of "Pay bills". Post-dated cheques
        // are scheduled future payments, so they live under "Scheduled". The
        // count here covers PDCs + other future-dated runs.
        { label: 'Pay bills', count: 12, active: !inPDC },
        { label: 'Scheduled', count: 55, active: inPDC },
        { label: 'History' },
      ]}
      contentPadding={false}
    >
      {/* Crossfade between Pay-bills and Scheduled bodies — same shell, no
          re-render of nav rail or top tabs. Quick fade only (no translate),
          so the swap reads as the inner panel switching, not a page reload. */}
      <AnimatePresence mode="wait">
        {!inPDC ? (
          <motion.div
            key="pay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="h-full overflow-hidden bg-white relative"
          >
            {/* Pay bills header — clear hierarchy: small label, big amount,
                tiny secondary count. The amount is the hero. */}
            <div className="px-5 py-3 border-b border-[#E5E0D8] flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold">Run · Today</div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[20px] font-mono font-bold text-[#1A1A2E] leading-none">AED&nbsp;37,777.50</span>
                  <span className="text-[11px] text-[#6B6B80]">· 2 of 3 bills selected</span>
                </div>
              </div>
              {/* Bank account selector */}
              <div className="flex items-center gap-2">
                <div className="rounded-md border border-[#E5E0D8] px-2.5 py-1.5 flex items-center gap-2 text-[11px]">
                  <div className="w-5 h-5 rounded bg-[#1A1A2E] text-white text-[8px] font-bold flex items-center justify-center">EN</div>
                  <div>
                    <div className="text-[10px] font-semibold text-[#1A1A2E]">Emirates NBD · ·· 1209</div>
                    <div className="text-[8.5px] text-[#6B6B80] font-mono">Balance: AED 4,820,142 · refresh ↻</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected bills table */}
            <div className="px-5 py-2 border-b border-[#E5E0D8] grid grid-cols-[24px_1fr_140px_90px_140px_100px] gap-3 text-[9.5px] uppercase tracking-widest text-[#6B6B80] font-semibold">
              <span></span>
              <span>Vendor</span>
              <span>ID</span>
              <span>Rail</span>
              <span className="text-right">Pay amount</span>
              <span className="text-center">Beneficiary</span>
            </div>

            <div className="overflow-auto" style={{ height: 'calc(100% - 90px - 30px)', paddingBottom: 130 }}>
              {SELECTED_BILLS.map((b, i) => {
                // Every row with sel:true gets the same selected wash so the
                // table reads as "all selected together" — no per-row focal
                // colour split. Al Noor still gets the demo's IBAN-verified
                // pill on the right for tracking, just no special background.
                const isSelected = b.sel && past(T.ROW_SELECT);
                const isFocal    = i === 0 && past(T.ROW_SELECT);
                const verified   = i === 0 && past(T.VERIFY);
                const rowBg = isSelected ? '#FDF6E8' : 'white';
                return (
                  <motion.div
                    key={b.id}
                    animate={{ background: rowBg }}
                    transition={{ duration: 0.3 }}
                    className="px-5 py-2.5 grid grid-cols-[24px_1fr_140px_90px_140px_100px] gap-3 border-b border-[#F0EDE6] items-center text-[12px]"
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                      b.sel ? 'border-[#1A1A2E] bg-[#1A1A2E]' : 'border-[#D8D2C5]'
                    }`}>
                      {b.sel && (
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9.5px] font-bold text-white flex-shrink-0"
                        style={{ background: '#1A1A2E' }}>{b.avatar}</div>
                      <span className="text-[#1A1A2E] truncate">{b.v}</span>
                    </div>
                    <span className="text-[#4A4A6A] font-mono text-[10.5px]">{b.id}</span>
                    <span className="text-[10px] text-[#1A1A2E] font-semibold px-1.5 py-0.5 rounded inline-flex items-center justify-self-start"
                      style={{ background: '#FBF7F1', border: '1px solid #E5E0D8' }}>{b.rail}</span>
                    <span className="text-right text-[#1A1A2E] font-mono font-semibold">{b.amt}</span>
                    <div className="flex items-center justify-center gap-1 text-[10px]">
                      {verified ? (
                        <span className="px-1.5 py-0.5 rounded font-semibold flex items-center gap-1"
                          style={{ background: '#EBFAF3', color: '#1EA672', border: '1px solid #C3E8D5' }}>
                          <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#1EA672" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          IBAN ✓
                        </span>
                      ) : isFocal ? (
                        <span className="text-[#A87C28] font-semibold">verifying…</span>
                      ) : (
                        <span className="text-[#6B6B80]">·· 5678</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Floating Pay action bar — same dark-overlay treatment as the
                Accept/Reject bar in the vendor-onboarding scene, so the
                primary action is consistent across the demo. */}
            <div className="absolute left-0 right-0 flex justify-center pointer-events-none" style={{ bottom: 56 }}>
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 px-4 py-2.5 pointer-events-auto"
                style={{
                  width: 880,
                  background: '#1A1A2E',
                  border: '1px solid #2D2D44',
                  borderRadius: 10,
                  boxShadow: '0 18px 48px rgba(26,26,46,0.32), 0 4px 14px rgba(26,26,46,0.18)',
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-white leading-tight">
                    2 bills ready · AED 37,777.50
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: '#9999BB' }}>
                    Approved · CFO sign-off · 14:02
                  </div>
                </div>

                <motion.button
                  animate={{
                    scale: past(T.PAY) && t < T.PAY + 280 ? 0.93 : 1,
                    background: '#22B07A',
                  }}
                  transition={{ duration: 0.18 }}
                  className="relative px-4 py-1.5 text-[12px] font-semibold text-white flex items-center gap-1.5 flex-shrink-0"
                  style={{ borderRadius: 6 }}
                >
                  {past(T.PAID) ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Sent · UTR captured
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M3 7h18M3 12h18M3 17h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      Pay now
                    </>
                  )}
                  <AnimatePresence>
                    {past(T.PAY) && t < T.PAY + 600 && (
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
              </motion.div>
            </div>

            {/* Cursor — lands on Pay now → presses → glides up to the
                "Scheduled" top tab → presses, triggering the body swap.
                Cursor's parent is this motion.div with `relative`. AppShell
                tabs sit ABOVE this view (negative-y from cursor origin), so
                the tab click position uses a negative top value. */}
            <AnimatePresence>
              {past(T.PAY_CURSOR_IN) && t < T.PDC_PIVOT && (
                <motion.div
                  key="pay-cursor"
                  initial={{ opacity: 0, top: 400, left: 880 }}
                  animate={{
                    opacity: 1,
                    // Stop 1 — Pay now button. Floating bar at bottom: 56.
                    //   Verified against rendered screenshot: button centre
                    //   sits at body-container y≈585, x≈986. Cursor tip is
                    //   at SVG (2,2), so cursor.top = 583, cursor.left = 984.
                    // Stop 2 — "Scheduled" tab in AppShell tabs bar.
                    //   Tabs row sits ABOVE this motion.div, so we pass a
                    //   small negative top to place the cursor on the tab.
                    //   Tabs start at px-5(20). "Pay bills 12" ~ 96px wide,
                    //   gap 8, "Scheduled 55" ~ 104px ⇒ centre ≈ 176.
                    top:  past(T.CURSOR_TO_TAB) ? -42 : 583,
                    left: past(T.CURSOR_TO_TAB) ? 176 : 984,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.3 },
                    top:     { duration: 0.7, ease: [0.32, 0.72, 0.26, 1] },
                    left:    { duration: 0.7, ease: [0.32, 0.72, 0.26, 1] },
                  }}
                  className="absolute pointer-events-none z-[55]"
                >
                  <PayCursor pressing={
                    (past(T.PAY) && t < T.PAY + 220) ||
                    (past(T.TAB_CLICK) && t < T.TAB_CLICK + 220)
                  } />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="pdc"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="h-full overflow-hidden bg-white grid grid-cols-[1fr_320px]"
          >
            {/* Scheduled — mixed-rail register. Al Noor (focal) sits at top
                showing its bill flowing approval → scheduled → cheque tracked. */}
            <div className="overflow-hidden border-r border-[#E5E0D8]">
              <div className="px-5 py-3 border-b border-[#E5E0D8] flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold">Scheduled · all rails</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-[20px] font-mono font-bold text-[#1A1A2E] leading-none">AED&nbsp;1,167,737.50</span>
                    <span className="text-[11px] text-[#6B6B80]">· 55 payments scheduled</span>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-md text-[11px] font-medium text-[#1A1A2E] border border-[#E5E0D8] flex items-center gap-1.5 flex-shrink-0">
                  + Schedule payment
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5l3 3 3-3" stroke="#1A1A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="px-5 py-2 border-b border-[#E5E0D8] grid grid-cols-[100px_70px_1fr_120px_120px_70px_90px] gap-3 text-[9.5px] uppercase tracking-widest text-[#6B6B80] font-semibold">
                <span>Reference</span><span>Rail</span><span>Vendor</span><span>Bill</span><span className="text-right">Amount</span><span>Run</span><span>Status</span>
              </div>

              <div className="overflow-auto" style={{ height: 'calc(100% - 110px)' }}>
                {SCHEDULED.map((p, i) => {
                  const focused = p.focal && past(T.PDC_FOCUS);
                  const stage = p.focal ? focusStage : p.stage;
                  const stageMap = ['Issued', 'Deposited', 'Cleared'];
                  // For non-PDC rails, "Issued" reads as "Queued" / "Cleared" stays.
                  const railIsPDC = p.rail === 'PDC';
                  const stageLabel = railIsPDC ? stageMap[stage] : stage === 2 ? 'Cleared' : 'Queued';
                  const stageColor = stage === 2 ? '#1EA672' : '#A87C28';
                  const stageBg   = stage === 2 ? '#EBFAF3' : '#FDF6E8';
                  return (
                    <motion.div
                      key={p.ref}
                      animate={{ background: focused ? '#FDF6E8' : 'white' }}
                      transition={{ duration: 0.3 }}
                      className="px-5 py-2.5 grid grid-cols-[100px_70px_1fr_120px_120px_70px_90px] gap-3 border-b border-[#F0EDE6] items-center text-[11.5px]"
                    >
                      <span className="font-mono text-[10.5px] text-[#1A1A2E]">{p.ref}</span>
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded inline-flex items-center justify-self-start"
                        style={{ background: '#FBF7F1', border: '1px solid #E5E0D8', color: '#1A1A2E' }}
                      >
                        {p.rail}
                      </span>
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[8.5px] font-bold text-white flex-shrink-0"
                          style={{ background: '#1A1A2E' }}
                        >
                          {p.avatar}
                        </div>
                        <span className="text-[#1A1A2E] truncate">{p.vendor}</span>
                      </div>
                      <span className="font-mono text-[10.5px] text-[#4A4A6A]">{p.bill}</span>
                      <span className="text-right font-mono font-semibold text-[#1A1A2E]">{p.amt}</span>
                      <span className="text-[#6B6B80] font-mono text-[10.5px]">{p.run}</span>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-semibold inline-flex items-center justify-self-start"
                        style={{ background: stageBg, color: stageColor, border: `1px solid ${stageColor}33` }}
                      >
                        {stageLabel}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right panel: focused PDC lifecycle + calendar */}
            <div className="overflow-auto bg-[#FBF7F1]">
              <AnimatePresence>
                {past(T.PDC_REGISTER) && (
                  <motion.div
                    initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                    className="p-4"
                  >
                    {/* Mini cheque card — focal: Al Noor Trading */}
                    <div className="rounded-md p-3 mb-4"
                      style={{
                        border: '1px solid #EBDFC4',
                        background: 'linear-gradient(135deg, #FDF6E8 0%, white 100%)',
                      }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="text-[8.5px] font-semibold text-[#A87C28] uppercase tracking-widest">Emirates NBD</div>
                        <div className="text-[8px] text-[#A87C28] font-mono">CHQ-001340</div>
                      </div>
                      <div className="text-[8.5px] text-[#6B6B80] mb-0.5">Pay</div>
                      <div className="text-[12px] font-semibold text-[#1A1A2E] mb-1.5">Al Noor Trading L.L.C.</div>
                      <div className="text-[8.5px] text-[#6B6B80]">A.E. dirhams</div>
                      <div className="text-[16px] font-mono font-bold text-[#1A1A2E] mb-2">AED 24,937.50</div>
                      <div className="flex items-center justify-between text-[9px] text-[#6B6B80] font-mono">
                        <span>Date: 20 / 05 / 2025</span>
                        <span>Sahara Holdings</span>
                      </div>
                    </div>

                    {/* Bill linkage — shows the cheque is tied to the bill we
                        just approved in Scene 6 */}
                    <div className="rounded-md p-2.5 mb-4 flex items-center gap-2 text-[10.5px]"
                      style={{ background: '#EBFAF3', border: '1px solid #C3E8D5' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#1EA672" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[#1A6F4E]">
                        Linked to <span className="font-mono">INV-2025-00428</span> · approved 14:08
                      </span>
                    </div>

                    {/* Track Payment */}
                    <div className="text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold mb-2">Track Payment</div>
                    <div className="relative pl-5">
                      <div className="absolute left-1.5 top-1 bottom-1 w-[2px]" style={{ background: '#E5E0D8' }} />
                      {[
                        { key: 'issued',  label: 'Cheque issued by Sahara',                    date: '5 May 14:12',  stage: 0 },
                        { key: 'deposit', label: 'Deposited by Al Noor at Mashreq Bank',       date: '20 May 09:18', stage: 1 },
                        { key: 'cleared', label: 'Cleared · funds debited from Sahara · ENBD', date: '21 May 11:42', stage: 2 },
                      ].map((s, i) => {
                        const visible = focusStage >= s.stage;
                        const isCleared = i === 2;
                        return (
                          <motion.div key={s.key}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: visible ? 1 : 0.3 }}
                            transition={{ duration: 0.3 }}
                            className="relative pb-4 last:pb-0"
                          >
                            <div className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                              style={{
                                background: visible ? (isCleared ? '#1EA672' : '#A87C28') : '#E5E0D8',
                                boxShadow: visible ? `0 0 0 4px ${isCleared ? 'rgba(30,166,114,0.18)' : 'rgba(168,124,40,0.15)'}` : 'none',
                              }}>
                              {visible && (
                                <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </div>
                            <div className="text-[11px] font-semibold text-[#1A1A2E] leading-tight">{s.label}</div>
                            <div className="text-[10px] text-[#6B6B80] font-mono">{s.date}</div>
                          </motion.div>
                        );
                      })}
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}

function PayCursor({ pressing }: { pressing: boolean }) {
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
