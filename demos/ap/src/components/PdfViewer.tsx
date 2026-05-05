import React from 'react';

// PDF preview chrome - title bar, zoom controls, paper background.
// Wraps any document body inside a realistic-feeling PDF viewer.

interface PdfViewerProps {
  filename: string;
  pages?: number;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

export default function PdfViewer({
  filename,
  pages = 1,
  width = 360,
  height = 470,
  children,
}: PdfViewerProps) {
  return (
    <div
      className="relative bg-white rounded-xl border border-[#E5E0D8] overflow-hidden flex flex-col"
      style={{ width, height, boxShadow: '0 8px 30px -10px rgba(26,26,46,0.18)' }}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 h-8 border-b border-[#E5E0D8] flex-shrink-0"
        style={{ background: '#FBF7F1' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-rose-500 flex items-center justify-center">
            <span className="text-[7px] font-bold text-white">PDF</span>
          </div>
          <span className="text-[11px] text-[#1A1A2E] font-medium truncate" style={{ maxWidth: 180 }}>{filename}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#6B6B80] font-mono">
          <span>1 / {pages}</span>
          <div className="flex items-center gap-0.5 ml-1">
            <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-[#E5E0D8]">
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                <circle cx="5" cy="5" r="3.5" stroke="#6B6B80" strokeWidth="1" />
                <line x1="2.5" y1="5" x2="7.5" y2="5" stroke="#6B6B80" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="8" y1="8" x2="10.5" y2="10.5" stroke="#6B6B80" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </button>
            <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-[#E5E0D8]">
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                <circle cx="5" cy="5" r="3.5" stroke="#6B6B80" strokeWidth="1" />
                <line x1="2.5" y1="5" x2="7.5" y2="5" stroke="#6B6B80" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="5" y1="2.5" x2="5" y2="7.5" stroke="#6B6B80" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="8" y1="8" x2="10.5" y2="10.5" stroke="#6B6B80" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </button>
            <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-[#E5E0D8]">
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                <path d="M2 8l3-4 2 3 3-4" stroke="#6B6B80" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="px-1.5 h-5 flex items-center justify-center rounded hover:bg-[#E5E0D8] text-[9px]">Reset</button>
          </div>
        </div>
      </div>

      {/* Paper background */}
      <div className="flex-1 overflow-hidden p-3" style={{ background: '#E8E4DC' }}>
        <div
          className="bg-white h-full overflow-hidden relative"
          style={{
            boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
            backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.01) 0%, transparent 50%)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
