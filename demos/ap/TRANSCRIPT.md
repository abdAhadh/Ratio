# Ratio · UAE Accounts Payable Demo - Transcript

A standalone Vite + React + Framer Motion demo modeled on the AR demo. Total runtime ~110 seconds. No voice-over yet - subtitles + BGM only. Drop a `vo.mp3` into `public/` later and rewire `App.tsx` to drive `time` from VO `currentTime` instead of the synthetic clock.

## Scene plan

| # | Title              | Duration | Cumulative | Component |
|---|--------------------|----------|------------|-----------|
| 1 | Welcome            | 5s       | 0–5        | `Scene01Intro.tsx` |
| 2 | Vendor Onboarding  | 14s      | 5–19       | `Scene02VendorMaster.tsx` |
| 3 | Invoice Intake     | 14s      | 19–33      | `Scene03InvoiceIntake.tsx` |
| 4 | Validate & Match   | 14s      | 33–47      | `Scene04Match.tsx` |
| 5 | Smart Insights     | 13s      | 47–60      | `Scene05Insights.tsx` |
| 6 | Approval           | 14s      | 60–74      | `Scene06Approval.tsx` |
| 7 | Payment & PDC      | 18s      | 74–92      | `Scene07PaymentPDC.tsx` |
| 8 | Sync & Reconcile   | 14s      | 92–106     | `Scene08SyncReconcile.tsx` |
| 9 | The Result         | 6s       | 106–112    | `Scene09Result.tsx` |

## Voice-over script (~112 seconds, ~280 words)

Read at ~140 wpm. Pauses indicated with `…`. Timestamps are guidance, not strict.

> **[0:00 - Intro]**  
> This is Ratio. Your AI Accounts Payable Agent, built for the UAE.
>
> **[0:05 - Vendor Onboarding]**  
> Add a new vendor with just their WhatsApp number. Ratio's AI agent reaches out, collects the trade licence and IBAN certificate. The moment they land - TRN verified, IBAN matched, sanctions screened. Live in seconds. Continuously monitored after.
>
> **[0:19 - Invoice Intake]**  
> An invoice arrives via WhatsApp. Bilingual. English and Arabic. Ratio extracts every line item, the TRN, the AED amount, the VAT. PDF on the right. Clean structured data on the left. Accuracy that beats OCR.
>
> **[0:33 - Validate & Match]**  
> Tax-invoice format checked against FTA rules. Duplicates flagged. Ratio fetches the matching purchase order and goods-received note straight from your ERP. Three-way match. Variances within tolerance. Auto-passed.
>
> **[0:47 - Smart Insights]**  
> Before it reaches an approver, Ratio surfaces what your team would have missed. Vendor TRN inactive. Price drift. Trade licence expiring. Possible duplicate. Mishaps caught before they cost you money.
>
> **[1:00 - Approval]**  
> Routed via your Delegation of Authority matrix to the right approver. They open it on their phone. In Singapore, between flights. Full context. Audit trail. One tap. Approved.
>
> **[1:14 - Payment & PDC]**  
> Pay via UAEFTS, IPP for instant transfers, or SWIFT for cross-border. Or issue a post-dated cheque. Ratio tracks the full lifecycle. Issued. Deposited. Cleared. All visible. All on time. Bounce-handling built in.
>
> **[1:32 - Sync & Reconcile]**  
> The ledger entry posts straight to your ERP. No double entry. When the bank confirms the disbursement, Ratio reconciles automatically. And every month-end, vendor statements reconcile in seconds.
>
> **[1:46 - The Result]**  
> Every invoice handled. Every record reconciled. Built for the UAE.

## Subtitle cues (machine-readable)

Lifted directly from `src/App.tsx · SUBTITLE_CUES`. Each line shows `[startSec → endSec]` and the text rendered.

```
[ 0.4 →  4.5]  This is Ratio. Your AI Accounts Payable Agent, built for the UAE.

[ 5.3 →  9.0]  Drop a vendor's trade licence. Ratio extracts every detail.
[ 9.2 → 13.0]  TRN verified on the FTA portal. IBAN matched against the legal name. Sanctions screened.
[13.2 → 16.8]  Live in seconds. Continuously monitored after.

[17.4 → 21.5]  An invoice arrives via WhatsApp. Bilingual. English and Arabic.
[21.7 → 26.0]  Ratio extracts every line item, the TRN, the AED amount, the VAT.
[26.2 → 30.7]  PDF on the right. Clean structured data on the left. Accuracy that beats OCR.

[31.4 → 35.4]  Tax-invoice format checked against FTA rules. Duplicates flagged.
[35.6 → 40.0]  Ratio fetches the matching purchase order and goods-received note straight from your ERP.
[40.2 → 44.7]  Three-way match. Variances within tolerance. Auto-passed.

[45.4 → 49.4]  Before it reaches an approver, Ratio surfaces what your team would have missed.
[49.6 → 53.5]  Vendor TRN inactive. Price drift. Trade licence expiring. Possible duplicate.
[53.7 → 57.7]  Mishaps caught before they cost you money.

[58.3 → 62.5]  Routed via your Delegation of Authority matrix to the right approver.
[62.7 → 67.0]  They open it on their phone. In Singapore, between flights.
[67.2 → 71.7]  Full context. Audit trail. One tap. Approved.

[72.4 → 77.0]  Pay via UAEFTS, IPP for instant transfers, or SWIFT for cross-border.
[77.2 → 82.5]  Or issue a post-dated cheque. Ratio tracks the full lifecycle.
[82.7 → 89.7]  Issued. Deposited. Cleared. All visible. All on time. Bounce-handling built in.

[90.4 → 94.0]  The ledger entry posts straight to your ERP. No double entry.
[94.2 → 98.5]  When the bank confirms the disbursement, Ratio reconciles automatically.
[98.7 →103.5]  And every month-end, vendor statements reconcile in seconds.

[104.3 →109.5] Every invoice handled. Every record reconciled. Built for the UAE.
```

## Sample data used in the demo

| Field        | Value |
|---             |---|
| Buyer entity | Sahara Holdings (mainland Dubai) |
| Vendor       | Al Noor Trading LLC (mainland Dubai) |
| Invoice      | INV-2025-00428 · AED 24,937.50 incl. 5% VAT |
| Line items   | "بلاطات رخامية ممتازة" / Premium marble slabs · "رسوم شحن داخلي" / Outward freight |
| PO / GRN     | PO-MD2025-0331 · GRN-344123 |
| Vendor bank  | Mashreq · IBAN AE07 0331 ·· 5678 |
| Buyer bank   | Emirates NBD · IBAN AE07 0331 ·· 1209 |
| Approver     | Priya S., Finance Manager - currently in Singapore |
| Cost centre  | OPS-DXB |
| PDC scenario | CHQ-001284 · AED 60,000 · deposit 14 Apr |
| ERP set      | Tally Prime · Zoho Books · NetSuite · SAP B1 · QuickBooks |

## Adding a real voice-over later

1. Drop `vo.mp3` into `public/`.
2. In `App.tsx`, replace the synthetic clock (the `requestAnimationFrame` ticker) with the AR-demo pattern: `audio[ref].currentTime` → `setTime`. The structure is intentionally identical to `demos/ar/src/App.tsx` so this swap is one block of code.
3. Tighten the subtitle cues to the actual VO timestamps once recorded.

## Build & run

```sh
cd demos/ap
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # outputs to dist/
```

Standalone deployment lives at its own Vercel project (does not affect `tryratio.io` builds).
