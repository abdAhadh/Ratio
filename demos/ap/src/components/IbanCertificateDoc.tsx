import React from 'react';

// IBAN Certificate - modeled on the ADIB reference image, branded as Mashreq Bank
// (the vendor's bank used in other scenes). Bilingual layout with QR + digital stamp.

const MASHREQ_ORANGE = '#F58220';
const MASHREQ_NAVY = '#1F3864';

export default function IbanCertificateDoc() {
  return (
    <div className="w-full h-full relative font-sans flex flex-col bg-white text-[#1A1A2E]">
      {/* Header - Mashreq logo top right */}
      <div className="flex items-start justify-end px-4 pt-3 pb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="text-right leading-none">
            <div className="text-[10px] font-bold" dir="rtl" style={{ color: MASHREQ_NAVY }}>مصرف المشرق</div>
            <div className="text-[7px] mt-0.5" dir="rtl" style={{ color: MASHREQ_NAVY }}>المصرف الأكثر تقدماً</div>
          </div>
          {/* Mashreq mark */}
          <div className="flex items-center gap-1">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" fill={MASHREQ_NAVY} />
              <path d="M9 22 L13 14 L16 19 L19 11 L23 22" stroke={MASHREQ_ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <div className="leading-none">
              <div className="text-[12px] font-bold" style={{ color: MASHREQ_NAVY }}>Mashreq</div>
              <div className="text-[6.5px]" style={{ color: '#666' }}>The most progressive bank</div>
            </div>
          </div>
        </div>
      </div>

      {/* Title - bilingual centered */}
      <div className="text-center px-4 pb-3 flex-shrink-0">
        <div className="text-[10px] font-bold" dir="rtl">شهادة رقم الحساب الدولي</div>
        <div className="text-[12px] font-bold tracking-wide" style={{ color: MASHREQ_NAVY }}>IBAN Certificate</div>
      </div>

      {/* Reference / Date / To - two columns mirrored */}
      <div className="px-4 pb-3 grid grid-cols-2 gap-3 text-[7.5px] flex-shrink-0">
        <div className="space-y-0.5">
          <div><span className="font-semibold">Reference No:</span> 4582-IBAN-2026-0314</div>
          <div><span className="font-semibold">Date:</span> 10/03/2026</div>
          <div><span className="font-semibold">To:</span> Sahara Holdings L.L.C.</div>
        </div>
        <div className="space-y-0.5 text-right" dir="rtl">
          <div><span>4582-IBAN-2026-0314</span> <span className="font-semibold">: رقم المرجع</span></div>
          <div><span>10/03/2026</span> <span className="font-semibold">: التاريخ</span></div>
          <div><span>صحارا القابضة ش.ذ.م.م</span> <span className="font-semibold">: إلى</span></div>
        </div>
      </div>

      {/* Body paragraph */}
      <div className="px-4 pb-3 grid grid-cols-2 gap-3 text-[7.5px] flex-shrink-0 leading-relaxed">
        <div>
          We, <span className="font-semibold">Mashreq Bank PSC</span>, hereby certify that the entity:
          <div className="mt-1 font-bold">M/s. AL NOOR TRADING L.L.C.</div>
          maintains an account with us number <span className="font-mono">011285678901</span> and the IBAN Number is:
          <div className="mt-1 font-mono font-bold">AE070330000011285678901</div>
          <div className="mt-1">(Swift Code: <span className="font-mono">BOMLAEAD</span>)</div>
        </div>
        <div className="text-right" dir="rtl">
          <span className="font-semibold">نحن مصرف المشرق ش.م.ع</span> نشهد بأن المنشأة:
          <div className="mt-1 font-bold">السادة/ النور للتجارة ش.ذ.م.م</div>
          يحتفظ لدينا بحساب رقم <span className="font-mono" dir="ltr">011285678901</span> ورقم الحساب الدولي هو:
          <div className="mt-1 font-mono font-bold" dir="ltr">AE070330000011285678901</div>
          <div className="mt-1">(<span className="font-mono" dir="ltr">BOMLAEAD</span> :رمز السويفت)</div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-4 pb-2 grid grid-cols-2 gap-3 text-[6.5px] text-[#444] flex-shrink-0 italic leading-tight">
        <div>This Certificate is being issued at the request of the customer in one original format and should not be considered as a guarantee from the part of the bank.</div>
        <div className="text-right" dir="rtl">تم إصدار هذه الشهادة بناءً على طلب العميل من نسخة أصلية واحدة، ولا تعتبر هذه الشهادة بمثابة ضمان من المصرف.</div>
      </div>

      {/* Yours faithfully */}
      <div className="px-4 pb-2 grid grid-cols-2 gap-3 text-[7px] flex-shrink-0">
        <div>Yours faithfully,</div>
        <div className="text-right" dir="rtl">،مع خالص التحية</div>
      </div>

      {/* For Mashreq Bank */}
      <div className="text-center px-4 pb-2 flex-shrink-0">
        <div className="text-[7.5px] font-semibold" style={{ color: MASHREQ_NAVY }}>For Mashreq Bank PSC</div>
        <div className="text-[7.5px] font-semibold" dir="rtl" style={{ color: MASHREQ_NAVY }}>عن مصرف المشرق ش.م.ع</div>
      </div>

      {/* QR */}
      <div className="flex flex-col items-center pb-2 flex-shrink-0">
        <div className="w-12 h-12 grid grid-cols-7 grid-rows-7 gap-0 bg-white border border-[#1A1A2E]">
          {Array.from({ length: 49 }).map((_, i) => {
            const r = Math.floor(i / 7), c = i % 7;
            const corner = (r < 3 && c < 3) || (r < 3 && c > 3) || (r > 3 && c < 3);
            const innerCorner = (r === 1 && c === 1) || (r === 1 && c === 5) || (r === 5 && c === 1);
            const data = [4,8,11,14,17,19,22,25,28,30,33,36,40,43,46].includes(i);
            const filled = (corner && !((r === 1 || r === 2) && (c === 1 || c === 2 || c === 5 || c === 6) && r * c !== 0)) || innerCorner || data;
            return <div key={i} className={filled ? 'bg-[#1A1A2E]' : 'bg-white'} />;
          })}
        </div>
      </div>

      {/* Digital stamp panel */}
      <div className="mx-auto mb-2 px-3 py-2 flex flex-col items-center gap-0.5 flex-shrink-0"
        style={{ border: `1.5px solid ${MASHREQ_NAVY}`, background: 'white', maxWidth: '70%' }}>
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" fill={MASHREQ_NAVY} />
            <path d="M9 22 L13 14 L16 19 L19 11 L23 22" stroke={MASHREQ_ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <div className="leading-none">
            <div className="text-[10px] font-bold" style={{ color: MASHREQ_NAVY }}>Mashreq</div>
          </div>
        </div>
        <div className="text-[6.5px]" dir="rtl" style={{ color: MASHREQ_NAVY }}>هذا الختم إلكتروني ولا يتطلب أي توقيع</div>
        <div className="text-[6.5px] font-medium" style={{ color: MASHREQ_NAVY }}>This is a digital stamp and does not require a signature</div>
      </div>

      {/* Footer note */}
      <div className="px-4 pb-2 grid grid-cols-2 gap-3 text-[6px] text-[#666] flex-shrink-0 leading-tight italic">
        <div>Note: Any Alteration/Cancellation in this certificate is considered null, void and invalid.</div>
        <div className="text-right" dir="rtl">ملاحظة: أي كشط أو حذف أو شطب أو تعديل في محتوى هذه الرسالة بلغيها.</div>
      </div>
    </div>
  );
}
