import React from 'react';

// High-fidelity Tax Invoice - embedded inside <PdfViewer>.
// Modeled on a real UAE Tax Invoice format (per Art. 59 VAT Executive Regulation).

export default function TaxInvoiceDoc() {
  return (
    <div className="w-full h-full px-4 pt-3 pb-2 font-sans relative overflow-hidden text-[#1A1A2E]"
      style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#1A1A2E]/15 pb-2 mb-2">
        <div className="flex items-start gap-2">
          {/* Vendor logo block */}
          <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
            style={{ background: '#1A1A2E' }}>
            <span className="text-[8px] font-bold text-white tracking-wider">AN</span>
          </div>
          <div>
            <div className="text-[10.5px] font-bold leading-tight">AL NOOR TRADING L.L.C.</div>
            <div className="text-[7px] text-[#4A4A6A] leading-snug">
              Office 412, Al Manara Tower, Business Bay<br />
              Dubai, UAE · P.O. Box 38291
            </div>
            <div className="text-[7px] text-[#4A4A6A] mt-0.5"><span className="font-semibold">TRN:</span> 100xxxxxxxxxxx03</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold tracking-widest">TAX INVOICE</div>
          <div className="text-[6.5px] text-[#6B6B80] tracking-wider">(ORIGINAL FOR RECIPIENT)</div>
          <div className="text-[6.5px] text-[#6B6B80] mt-1 font-mono">Invoice ref:</div>
          <div className="text-[8.5px] font-bold font-mono">INV-2025-00428</div>
        </div>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-1 text-[7px] mb-2 pb-2 border-b border-[#1A1A2E]/15">
        {[
          { l: 'Invoice Date',     v: '26 Aug 2025' },
          { l: 'Place of Supply',  v: 'Dubai, UAE' },
          { l: 'Currency',         v: 'AED' },
          { l: 'Buyer P.O. No.',   v: 'PO-MD2025-0331' },
          { l: 'Delivery Note',    v: 'DN-091233' },
          { l: 'Payment Terms',    v: 'Net 45' },
        ].map(f => (
          <div key={f.l}>
            <div className="text-[6px] uppercase tracking-widest text-[#999]">{f.l}</div>
            <div className="text-[8px] font-medium text-[#1A1A2E]">{f.v}</div>
          </div>
        ))}
      </div>

      {/* Buyer block */}
      <div className="grid grid-cols-2 gap-3 mb-2 text-[7px]">
        <div>
          <div className="text-[6px] uppercase tracking-widest text-[#999] font-semibold">Bill To</div>
          <div className="text-[9px] font-bold text-[#1A1A2E]">Sahara Holdings L.L.C.</div>
          <div className="text-[7px] text-[#4A4A6A] leading-snug">
            8th Floor, One Central, World Trade Centre<br />
            Dubai, UAE · P.O. Box 71244
          </div>
          <div className="text-[7px] text-[#4A4A6A] mt-0.5"><span className="font-semibold">TRN:</span> 100xxxxxxxxxxx99</div>
        </div>
        <div>
          <div className="text-[6px] uppercase tracking-widest text-[#999] font-semibold">Ship To</div>
          <div className="text-[9px] font-bold text-[#1A1A2E]">Sahara Holdings · DXB warehouse</div>
          <div className="text-[7px] text-[#4A4A6A] leading-snug">
            Plot 28, Dubai Investment Park 2<br />
            Jebel Ali, Dubai
          </div>
          <div className="text-[7px] text-[#4A4A6A] mt-0.5">Delivery date: 20 Aug 2025</div>
        </div>
      </div>

      {/* Items table */}
      <table className="w-full text-[7.5px] border border-[#1A1A2E]/20 mb-2">
        <thead>
          <tr style={{ background: '#FBF7F1' }} className="text-[#1A1A2E]">
            <th className="text-left px-1.5 py-1 border-r border-[#1A1A2E]/15 font-semibold">#</th>
            <th className="text-left px-1.5 py-1 border-r border-[#1A1A2E]/15 font-semibold">Description / الوصف</th>
            <th className="text-right px-1.5 py-1 border-r border-[#1A1A2E]/15 font-semibold">HSN</th>
            <th className="text-right px-1.5 py-1 border-r border-[#1A1A2E]/15 font-semibold">Qty</th>
            <th className="text-right px-1.5 py-1 border-r border-[#1A1A2E]/15 font-semibold">Rate</th>
            <th className="text-right px-1.5 py-1 font-semibold">Amount (AED)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-[#1A1A2E]/10">
            <td className="px-1.5 py-1 align-top border-r border-[#1A1A2E]/10">1</td>
            <td className="px-1.5 py-1 align-top border-r border-[#1A1A2E]/10">
              <div>Premium Marble Slabs · Carrara M4</div>
              <div className="text-[6.5px] text-[#6B6B80]" dir="rtl">بلاطات رخامية ممتازة</div>
            </td>
            <td className="px-1.5 py-1 align-top border-r border-[#1A1A2E]/10 font-mono text-right">680221</td>
            <td className="px-1.5 py-1 align-top border-r border-[#1A1A2E]/10 text-right">5.40 m²</td>
            <td className="px-1.5 py-1 align-top border-r border-[#1A1A2E]/10 text-right font-mono">4,250.00</td>
            <td className="px-1.5 py-1 align-top text-right font-mono">22,950.00</td>
          </tr>
          <tr className="border-t border-[#1A1A2E]/10">
            <td className="px-1.5 py-1 align-top border-r border-[#1A1A2E]/10">2</td>
            <td className="px-1.5 py-1 align-top border-r border-[#1A1A2E]/10">
              <div>Outward Freight (local) · DXB</div>
              <div className="text-[6.5px] text-[#6B6B80]" dir="rtl">رسوم شحن داخلي</div>
            </td>
            <td className="px-1.5 py-1 align-top border-r border-[#1A1A2E]/10 font-mono text-right">996721</td>
            <td className="px-1.5 py-1 align-top border-r border-[#1A1A2E]/10 text-right">1</td>
            <td className="px-1.5 py-1 align-top border-r border-[#1A1A2E]/10 text-right font-mono">800.00</td>
            <td className="px-1.5 py-1 align-top text-right font-mono">800.00</td>
          </tr>
        </tbody>
      </table>

      {/* Totals + tax */}
      <div className="grid grid-cols-[1fr_180px] gap-3 mb-2">
        <div className="text-[7px] text-[#4A4A6A]">
          <div className="font-semibold mb-0.5">Amount in words</div>
          <div className="italic">AED Twenty-four Thousand Nine Hundred Thirty-seven and Fifty Fils only</div>
          <div className="mt-1.5 font-semibold">Bank details</div>
          <div>Mashreq Bank · IBAN AE07 0331 ·· 5678 · BIC BOMLAEAD</div>
        </div>
        <div className="border border-[#1A1A2E]/20 text-[8px]">
          <div className="grid grid-cols-2 px-1.5 py-1 border-b border-[#1A1A2E]/10">
            <span>Subtotal</span><span className="text-right font-mono">AED 23,750.00</span>
          </div>
          <div className="grid grid-cols-2 px-1.5 py-1 border-b border-[#1A1A2E]/10">
            <span>VAT (5%)</span><span className="text-right font-mono">AED 1,187.50</span>
          </div>
          <div className="grid grid-cols-2 px-1.5 py-1 font-bold" style={{ background: '#FBF7F1' }}>
            <span>Total</span><span className="text-right font-mono">AED 24,937.50</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
        <div className="text-[6.5px] text-[#6B6B80] leading-snug max-w-[60%]">
          E. & O.E. · Goods once sold cannot be taken back. Subject to Dubai jurisdiction.<br/>
          This is a computer-generated invoice and does not require physical signature.
        </div>
        <div>
          <div className="w-20 h-7 border-t border-[#1A1A2E]/40" />
          <div className="text-[6px] text-[#6B6B80]">For Al Noor Trading L.L.C.</div>
        </div>
      </div>
    </div>
  );
}
