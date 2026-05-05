import React from 'react';
import { motion } from 'framer-motion';

// Mysa-inspired product chrome.
// Dark sidebar (narrow icon rail) + light main area with optional top tab bar.

interface AppShellProps {
  activeNav?: 'bills' | 'vendors' | 'pay' | 'rec' | 'reports';
  topTabs?: { label: string; count?: number; active?: boolean }[];
  filters?: { label: string; active?: boolean }[];
  searchPlaceholder?: string;
  children: React.ReactNode;
  rightPanel?: React.ReactNode;   // slides in from right
  rightPanelKey?: string | number; // forces re-mount/animation
  contentPadding?: boolean;
}

const NAV_ITEMS: { id: AppShellProps['activeNav']; icon: React.ReactNode }[] = [
  { id: 'bills',   icon: <BillsIcon /> },
  { id: 'vendors', icon: <VendorIcon /> },
  { id: 'pay',     icon: <PayIcon /> },
  { id: 'rec',     icon: <RecIcon /> },
  { id: 'reports', icon: <ReportIcon /> },
];

export default function AppShell({
  activeNav = 'bills',
  topTabs,
  filters,
  searchPlaceholder,
  children,
  rightPanel,
  rightPanelKey,
  contentPadding = true,
}: AppShellProps) {
  return (
    <div className="flex-1 flex relative bg-[#FBF7F1]">
      {/* Left dark sidebar */}
      <div className="w-[52px] flex-shrink-0 bg-[#1A1A2E] flex flex-col items-center py-3 gap-1">
        <div className="w-7 h-7 rounded-md flex items-center justify-center mb-3"
          style={{ background: '#A87C28' }}>
          <span className="text-[10px] font-bold text-white">R</span>
        </div>
        {NAV_ITEMS.map(n => (
          <div key={n.id} className={`w-9 h-9 rounded-md flex items-center justify-center ${
            n.id === activeNav ? 'bg-[#2D2D44] text-white' : 'text-[#7777AA]'
          }`}>
            {n.icon}
          </div>
        ))}
      </div>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Tabs row */}
        {(topTabs || filters || searchPlaceholder) && (
          <div className="flex items-center justify-between gap-3 border-b border-[#E5E0D8] px-5 h-11 flex-shrink-0 bg-white">
            <div className="flex items-center gap-1">
              {topTabs?.map((t, i) => (
                <button key={i}
                  className="relative h-11 px-3 text-[12px] font-medium flex items-center gap-1.5"
                  style={{ color: t.active ? '#1A1A2E' : '#6B6B80' }}
                >
                  {t.label}
                  {typeof t.count === 'number' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                      style={{
                        background: t.active ? '#1A1A2E' : '#E5E0D8',
                        color: t.active ? 'white' : '#6B6B80',
                      }}>{t.count}</span>
                  )}
                  {t.active && (
                    <span className="absolute left-0 right-0 bottom-0 h-[2px]" style={{ background: '#1A1A2E' }} />
                  )}
                </button>
              ))}
            </div>
            {searchPlaceholder && (
              <div className="flex items-center gap-2 px-2.5 h-7 rounded-md bg-[#FBF7F1] border border-[#E5E0D8]" style={{ minWidth: 220 }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <circle cx="5" cy="5" r="3.5" stroke="#999" strokeWidth="1.3" />
                  <line x1="8" y1="8" x2="10.5" y2="10.5" stroke="#999" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <span className="text-[11px] text-[#999]">{searchPlaceholder}</span>
              </div>
            )}
          </div>
        )}

        {/* Filter chips row */}
        {filters && (
          <div className="flex items-center gap-2 px-5 py-2.5 border-b border-[#E5E0D8] bg-white text-[11px]">
            <span className="text-[10px] uppercase tracking-widest text-[#6B6B80] font-semibold mr-1">Filters</span>
            {filters.map((f, i) => (
              <span key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-medium"
                style={{
                  background: f.active ? '#1A1A2E' : 'white',
                  color: f.active ? 'white' : '#4A4A6A',
                  borderColor: f.active ? '#1A1A2E' : '#E5E0D8',
                }}>
                {f.label}
                {f.active && (
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3l6 6M9 3l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </span>
            ))}
            <span className="ml-auto text-[10px] text-[#6B6B80]">More filters ▾</span>
          </div>
        )}

        {/* Content + right panel */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          <div className={`flex-1 min-w-0 ${contentPadding ? 'p-5' : ''}`}>
            {children}
          </div>
          {rightPanel && (
            <motion.div
              key={rightPanelKey}
              initial={{ x: 460, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                x:       { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              }}
              className="border-l border-[#E5E0D8] bg-white flex-shrink-0"
              style={{ width: 460 }}
            >
              {rightPanel}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────
function BillsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="9" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="11" x2="15" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="14" x2="13" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function VendorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 19c1.5-3 4.5-4 7-4s5.5 1 7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function PayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function RecIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 3v4h-4M6 21v-4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function ReportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <line x1="6" y1="20" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="20" x2="18" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
