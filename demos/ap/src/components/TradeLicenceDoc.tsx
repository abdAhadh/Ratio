import React from 'react';

// Dubai DED Commercial Licence - modeled directly on the user's reference image.
// Two-band header (Govt of Dubai + Dubai Economy), green title bar, bilingual data,
// green section bars for License Members + License Activities, red footer.

const ACTIVITIES: { en: string; ar: string }[] = [
  { en: 'Building Materials Trading',                ar: 'تجارة مواد البناء' },
  { en: 'Tiles & Sanitary Wares Trading',            ar: 'تجارة الأرضيات والأدوات الصحية' },
  { en: 'Marble & Granite Trading',                  ar: 'تجارة الرخام والجرانيت' },
  { en: 'General Trading',                           ar: 'تجارة عامة' },
  { en: 'Cargo Handling Services',                   ar: 'مناولة البضائع' },
  { en: 'Wood & Timber Trading',                     ar: 'تجارة الأخشاب' },
  { en: 'Adhesives & Sealants Trading',              ar: 'تجارة المواد اللاصقة' },
  { en: 'Paints & Varnishes Trading',                ar: 'تجارة الدهانات والورنيشات' },
  { en: 'Hardware & Tools Trading',                  ar: 'تجارة العدد والأدوات' },
  { en: 'Electromechanical Materials Trading',       ar: 'تجارة المواد الكهروميكانيكية' },
  { en: 'Glass & Mirrors Trading',                   ar: 'تجارة الزجاج والمرايا' },
  { en: 'Steel & Metal Products Trading',            ar: 'تجارة المنتجات الفولاذية والمعدنية' },
];

const TEAL = '#0F8A85';
const TEAL_DARK = '#0A6A66';

export default function TradeLicenceDoc() {
  return (
    <div className="w-full h-full relative font-sans flex flex-col" style={{ background: 'white' }}>
      {/* Top header band - Govt of Dubai + Dubai Economy */}
      <div className="flex items-center justify-between px-3 pt-2.5 pb-2 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          {/* Govt of Dubai falcon emblem */}
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M16 4 C12 8, 11 12, 13 18 L11 22 L14 21 L13 24 L16 22 L19 24 L18 21 L21 22 L19 18 C21 12, 20 8, 16 4Z"
              fill="#C00B0F" />
            <circle cx="16" cy="14" r="1.4" fill="white" />
          </svg>
          <div className="leading-none">
            <div className="text-[8px] font-bold tracking-wider" style={{ color: '#C00B0F' }}>GOVERNMENT OF DUBAI</div>
            <div className="text-[7px] mt-0.5" dir="rtl" style={{ color: '#C00B0F' }}>حكومة دبي</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="text-right leading-none">
            <div className="text-[8px] font-bold tracking-wider" style={{ color: TEAL_DARK }}>DUBAI ECONOMY</div>
            <div className="text-[7px] mt-0.5" dir="rtl" style={{ color: TEAL_DARK }}>اقتصادية دبي</div>
          </div>
          {/* Dubai Economy mark - abstract shield */}
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <path d="M16 3 L28 9 L28 18 C28 24, 22 28, 16 30 C10 28, 4 24, 4 18 L4 9 Z" fill={TEAL} />
            <path d="M11 16 L16 11 L21 16 L21 22 L11 22 Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Decorative thin line */}
      <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #C00B0F 0%, #C00B0F 50%, ' + TEAL + ' 50%, ' + TEAL + ' 100%)' }} />

      {/* Title band: Commercial License */}
      <div className="relative h-9 flex items-center justify-between px-3 flex-shrink-0"
        style={{ background: TEAL }}>
        <div className="text-white text-[12px] font-bold tracking-wide">Commercial License</div>
        <div className="text-white text-[12px] font-bold" dir="rtl">رخصة تجارية</div>
        {/* Honeycomb-ish texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(60deg, white 0 1px, transparent 1px 6px), repeating-linear-gradient(-60deg, white 0 1px, transparent 1px 6px)' }} />
      </div>

      <div className="flex-1 overflow-hidden flex flex-col text-[#1A1A2E]">
        {/* "License Details" sub-band */}
        <div className="px-3 py-1 flex items-center justify-between flex-shrink-0"
          style={{ background: '#F2F8F7', borderBottom: '1px solid ' + TEAL }}>
          <div className="text-[8px] font-bold tracking-widest" style={{ color: TEAL_DARK }}>LICENSE DETAILS</div>
          <div className="text-[7px] font-bold" dir="rtl" style={{ color: TEAL_DARK }}>تفاصيل الرخصة</div>
        </div>

        {/* Data grid */}
        <div className="px-3 py-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[7.5px] flex-shrink-0">
          {[
            { l: 'License No.',      v: '1208342',                                    ar: 'رقم الرخصة' },
            { l: 'Company Name',     v: 'Al Noor Trading L.L.C.',                     ar: 'اسم الشركة',  arV: 'النور للتجارة ش.ذ.م.م' },
            { l: 'Trade Name',       v: 'Al Noor Trading L.L.C.',                     ar: 'الاسم التجاري' },
            { l: 'Legal Type',       v: 'Limited Liability Company (LLC)',            ar: 'الشكل القانوني', arV: 'ذات مسؤولية محدودة' },
            { l: 'Expiry Date',      v: '14/03/2027',                                 ar: 'تاريخ الانتهاء' },
            { l: 'Issue Date',       v: '15/03/2024',                                 ar: 'تاريخ الإصدار' },
            { l: 'D&B D-U-N-S®',     v: '-',                                          ar: 'الرقم العالمي' },
            { l: 'Main License No.', v: '1208342',                                    ar: 'رقم الرخصة الأم' },
            { l: 'Register No.',     v: '1140973',                                    ar: 'رقم السجل التجاري' },
            { l: 'DCCI No.',         v: '243087',                                     ar: 'عضوية الغرفة' },
          ].map(f => (
            <div key={f.l} className="grid grid-cols-[80px_1fr_70px] items-baseline gap-2">
              <span className="text-[7px] font-semibold text-[#1A1A2E]">{f.l}</span>
              <div>
                <div className="text-[8px] font-medium text-[#1A1A2E]">{f.v}</div>
                {f.arV && <div className="text-[7px] text-[#1A1A2E]" dir="rtl">{f.arV}</div>}
              </div>
              <span className="text-[7px] text-[#1A1A2E] text-right" dir="rtl">{f.ar}</span>
            </div>
          ))}
        </div>

        {/* License Members band */}
        <div className="px-3 py-1 flex items-center justify-between flex-shrink-0 mt-1"
          style={{ background: TEAL }}>
          <div className="text-[8px] font-bold tracking-widest text-white">LICENSE MEMBERS</div>
          <div className="text-[7px] font-bold text-white" dir="rtl">الأطراف</div>
        </div>

        {/* Members table */}
        <div className="px-3 py-1 text-[7px] flex-shrink-0">
          <div className="grid grid-cols-[40px_60px_70px_1fr_70px] gap-2 font-semibold text-[#1A1A2E] py-0.5 border-b border-[#E5E0D8]">
            <span>Share</span><span>Role</span><span>Nationality</span><span>Name</span><span>No.</span>
          </div>
          {[
            { share: '60%', role: 'Manager',  nat: 'UAE',   name: 'Ahmed Al-Mansouri', no: '840852' },
            { share: '40%', role: 'Partner',  nat: 'India', name: 'Rajan Iyer',        no: '912334' },
          ].map((m, i) => (
            <div key={i} className="grid grid-cols-[40px_60px_70px_1fr_70px] gap-2 text-[#1A1A2E] py-0.5 border-b border-[#F0EDE6]">
              <span>{m.share}</span><span>{m.role}</span><span>{m.nat}</span><span>{m.name}</span><span className="font-mono">{m.no}</span>
            </div>
          ))}
        </div>

        {/* UBO consent paragraph */}
        <div className="px-3 py-1 text-[6.5px] text-[#C00B0F] leading-tight flex-shrink-0 italic">
          Beneficiary Owner consent of this license has been signed on 15/03/2024. For more information or to know the Beneficiary Owner please visit any DED service center or DED eServices website.
        </div>

        {/* License Activities band */}
        <div className="px-3 py-1 flex items-center justify-between flex-shrink-0"
          style={{ background: TEAL }}>
          <div className="text-[8px] font-bold tracking-widest text-white">LICENSE ACTIVITIES</div>
          <div className="text-[7px] font-bold text-white" dir="rtl">نشاطات الرخصة</div>
        </div>

        {/* Activities list */}
        <div className="px-3 py-1 grid grid-cols-2 gap-x-3 text-[6.5px] flex-shrink-0">
          {ACTIVITIES.map((a, i) => (
            <div key={i} className="flex items-baseline gap-2 leading-tight py-px">
              <span className="text-[#1A1A2E] flex-1">{a.en}</span>
              <span className="text-[#1A1A2E] text-right" dir="rtl">{a.ar}</span>
            </div>
          ))}
        </div>

        {/* Print Date / Receipt */}
        <div className="px-3 py-1 grid grid-cols-2 text-[7px] text-[#1A1A2E] flex-shrink-0 border-t border-[#E5E0D8] mt-1">
          <div>Print Date: 03/04/2026 14:02</div>
          <div className="text-right">Receipt No.: 0</div>
        </div>
      </div>

      {/* Red footer band */}
      <div className="px-3 py-1.5 flex items-center justify-between flex-shrink-0" style={{ background: '#C00B0F' }}>
        <div className="flex items-center gap-2">
          <svg width="22" height="14" viewBox="0 0 30 20" fill="none">
            <rect width="10" height="20" fill="#C00B0F" />
            <rect x="10" width="20" height="6.66" fill="#1B7A3E" />
            <rect x="10" y="6.66" width="20" height="6.66" fill="white" />
            <rect x="10" y="13.33" width="20" height="6.66" fill="#111" />
          </svg>
          <span className="text-[7.5px] font-bold tracking-widest text-white">THE EMIRATES</span>
        </div>
        <div className="text-[6px] text-white text-right leading-tight max-w-[58%] italic">
          Approved electronic document issued without signature by the Department of Economic Development.<br />
          To verify the license kindly visit www.dubaided.gov.ae
        </div>
      </div>
    </div>
  );
}
