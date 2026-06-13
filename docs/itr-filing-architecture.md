# ITR Filing Software — Architecture & Provider Plan

> Status: planning doc (no code yet). India (Income Tax Department / CPC 2.0) context.
> Goal: build software that prepares and **electronically files** Income Tax Returns,
> using Claude as the document-understanding + reasoning layer and a registered
> e-Return Intermediary (ERI) channel for the actual filing.
>
> **Decisions locked:**
> - **Scope:** all ITR forms — **ITR-1 through ITR-7** (individuals + business/professional + firms/companies/trusts).
> - **Filing channel:** **aggregator path** (Path B) — build on a registered ERI's API; do not become an ERI ourselves for v1.
> - **Primary aggregator:** **Quicko Sandbox** (`sandbox.co.in`) — see §2 for why over Surepass.

---

## 1. The core insight: two separate integrations

Building "ITR filing software" means wiring up **two unrelated APIs**, and they are
easy to conflate:

| Layer | Provider | Role | Regulated? |
|---|---|---|---|
| **AI / reasoning** | Anthropic API (Claude) | Read tax docs, structure data, compute a *draft*, explain, answer questions | No — just an API key |
| **Filing pipe** | ERI API (own or via aggregator) | Authenticate user, fetch prefill, validate, **submit ITR**, e-verify | **Yes** — government-controlled access |

Claude **cannot** file a return. The Income Tax Department exposes filing APIs only
to a registered **e-Return Intermediary (ERI)**. Everything about "required access"
lives in the filing layer, not the AI layer.

---

## 2. The filing layer — how to get legal access

There is **no public open API** to file an ITR directly. Two paths:

### Path A — Become an ERI yourself (full control, high barrier)

The Income Tax Department defines three ERI types:

- **Type 1** — file via the Department's own utilities/portal (no custom software).
- **Type 2** — **build your own portal/app and file through the Department's API.** ← this is "ITR filing software".
- **Type 3** — build your own *offline* utility.

To register as a **Type-2 ERI** you typically need:

- A **company registered in India**, generally with **net worth > ₹1 crore**
- Valid **PAN / TAN**
- A **Class II/III Digital Signature Certificate (DSC)** from a licensed CA
- Eligible entity status (company, CA, CS, advocate, etc.)
- Registration on the e-Filing portal → **Others → e-Return Intermediary → Register as New Applicant**
- Integration against the official **ERI API specification** (CPC 2.0): authentication,
  prefill fetch, ITR-rule validation, submission, and e-verification.

This is months of compliance + a security review before the first return can be filed.

### Path B — Build on an aggregator that already holds ERI access (recommended for v1)

These are registered ERIs that resell filing as clean REST APIs. You skip the
₹1cr / DSC / registration barrier; they own the government relationship.

| Provider | Filing scope | Verdict for "all ITR" |
|---|---|---|
| **Quicko Sandbox** — `sandbox.co.in` | Income-Tax **Business APIs** incl. ITR prepare + a **Compliance API** that *files & tracks ITR directly with ITD*, plus a **Report API** that generates the upload-ready ITR JSON. Also PAN/KYC, TDS, GST. | ✅ **Chosen.** Built for business returns, not just salaried — the realistic path to covering ITR-1…7. |
| **Surepass** — `surepass.io` | ITR APIs are oriented to **read / verify / compliance-check** (read incomes & deductions, ITR verification, AIS/TIS). Strong KYC suite. | ⚠️ Weaker for *full e-filing* of business forms — more a data/verification play. Keep as KYC fallback only. |
| **Setu / TechDev / others** | KYC + filing wrappers of varying coverage. | Not evaluated; revisit only if Quicko gaps appear. |

**Why Quicko over Surepass:** for "all ITR forms," the binding constraint is whether
the provider can actually *e-file business returns* (ITR-3/5/6/7), not just salaried
ITR-1/4. Quicko's positioning is explicitly business + direct-to-ITD filing with JSON
report generation; Surepass's ITR surface reads as verification/extraction. Quicko is
the lower-risk pick for full-form coverage.

> ⚠️ **Confirm in Phase 0:** Quicko's public docs (`docs.api.quicko.com`) currently
> block automated fetching, so exact **per-form** e-file support (especially ITR-5/6/7
> for firms/companies/trusts) must be confirmed directly during onboarding. If any form
> isn't API-fileable, fall back to their **Report API** (generate the ITR JSON, user
> uploads to the ITD portal) for that form.

**Required access on Path B** is just: business onboarding/KYC with Quicko →
**API key** → call their endpoints (sandbox first, then live).

### Recommendation

**Path B with Quicko Sandbox.** Reach a compliant, working filing flow in days.
Migrate to your own ERI (Path A) later only if volume/economics justify owning the channel.

---

## 3. The AI layer — connecting Claude

- **Endpoint:** Anthropic API (`api.anthropic.com`), official SDK (`@anthropic-ai/sdk` for this Node/Next.js stack).
- **Model:** `claude-opus-4-8` (Claude Opus 4.8) — 1M context, strong PDF/vision + multi-step reasoning. Use `claude-haiku-4-5` for cheap high-volume classification sub-tasks if needed.
- **Auth:** `ANTHROPIC_API_KEY` as a server-side env var. **Never** call Anthropic from the browser.

What Claude does:

1. **Document understanding (vision/PDF):** Form-16, Form-26AS, AIS/TIS, bank
   statements, capital-gains/broker P&L statements → extracted fields.
2. **Structured output (`output_config.format`):** emit JSON matching the ITR schema
   the filing API expects (income heads, deductions, TDS, etc.).
3. **Tool use:** call deterministic tax-calc functions, the aggregator's
   prefill/validate/file endpoints, and old-vs-new regime comparison.
4. **Explanation/Q&A:** "why do I owe ₹X", "which regime is better for me".

### Non-negotiable guardrail

Claude **prepares and explains**; it is **not** the source of truth for a legal tax
number. Every figure that goes into the filed return must be:

- recomputed by **deterministic** tax-rule code on your backend, and
- run through the **filing API's own validation** before submission.

Treat the LLM output as a *draft to be verified*, never as the final payload.

---

## 4. End-to-end data flow

```
 ┌──────────────┐   upload (PDF/img)
 │   Frontend   │ ───────────────────────────────►  Next.js API route (server)
 └──────────────┘                                        │
                                                         ▼
                                          ┌─────────────────────────────┐
                                          │  Claude Opus 4.8            │
                                          │  • extract from documents   │
                                          │  • structure → ITR JSON     │
                                          │  • draft computation        │
                                          │  • regime comparison        │
                                          └─────────────┬───────────────┘
                                                        │ structured JSON
                                                        ▼
                                          ┌─────────────────────────────┐
                                          │  Backend (deterministic)    │
                                          │  • recompute tax by rules   │
                                          │  • reconcile vs Claude draft │
                                          │  • flag mismatches to user  │
                                          └─────────────┬───────────────┘
                                                        │ validated payload
                                                        ▼
                                          ┌─────────────────────────────┐
                                          │  ERI Aggregator API         │
                                          │  (Quicko Sandbox / Surepass)│
                                          │  prefill → validate → file  │
                                          │  → e-verify                 │
                                          └─────────────┬───────────────┘
                                                        ▼
                                          Income Tax Dept (CPC 2.0)
```

---

## 5. Proposed component breakdown (this Next.js repo)

```
app/
  api/
    itr/
      extract/route.ts        # POST docs → Claude → structured JSON
      compute/route.ts        # deterministic tax calc + regime compare
      determine-form/route.ts # pick ITR-1..7 from the taxpayer's income profile
      file/route.ts           # call Quicko prefill/validate/file/e-verify
lib/
  itr/
    schema/
      common.ts            # shared blocks: personal, TDS, deductions, taxes-paid
      itr1.ts … itr7.ts    # per-form schemas (one module per ITR form)
      index.ts             # form selector → returns the right schema
    tax-rules.ts           # deterministic computation (slabs, deductions, cess)
    anthropic.ts           # Claude client + prompt + output_config.format
    quicko-client.ts       # Quicko Sandbox API wrapper (key from env)
```

Key design choices:

- **Modular per-form schemas.** All-ITR scope means ITR-1…7, which differ a lot
  (ITR-1 salaried vs ITR-3 business vs ITR-6 company vs ITR-7 trust). Model **shared
  blocks once** (personal info, TDS, Chapter VI-A deductions, taxes paid) and a
  **per-form schema module** that composes them. The same schema drives both Claude's
  `output_config.format` *and* backend validation — single source of truth per form.
- **Form determination is its own step.** Which ITR form applies is a rules decision
  (income heads, residential status, turnover, entity type). Claude can *suggest* it;
  deterministic rules in `determine-form` confirm it before extraction targets a schema.
- **All third-party calls are server-side.** API keys (`ANTHROPIC_API_KEY`,
  `QUICKO_API_KEY`) live only in server env, never shipped to the client.
- **Idempotency + audit log** on the `file` step — store every request/response to the
  aggregator for compliance and dispute resolution.

---

## 6. Security, compliance & data-handling

This handles PAN, income, and bank data — treat it as sensitive financial PII.

- **Encryption** at rest and in transit; minimal retention of raw documents.
- **Consent + DPDP Act** alignment for storing/processing user financial data.
- **DSC / e-verification** flow handled by the aggregator (OTP/Aadhaar/net-banking
  e-verify) — do not roll your own.
- **Server-only secrets**, scoped per environment, rotated on exposure.
- **Immutable audit trail** of every filing action (who, what, when, ITD ack number).
- **No LLM as system-of-record** for tax numbers (see §3 guardrail).

---

## 7. Phased delivery

All-ITR is too big to build at once. **Sequence the forms by complexity** and ship
filing form-by-form behind the same pipeline.

| Phase | Scope | Outcome |
|---|---|---|
| **0 — Provider onboarding** | Sign up with Quicko Sandbox; KYC; sandbox API key; **confirm per-form e-file coverage (esp. ITR-5/6/7)**; map endpoints | Confirmed endpoint list + auth + form gaps |
| **1 — Pipeline on ITR-1** | `extract`→`compute`→`determine-form`→`file` end-to-end for **ITR-1** (salaried) in sandbox | Full vertical slice working |
| **2 — ITR-4, then ITR-2** | Add presumptive (ITR-4) and capital-gains/multi-house (ITR-2) schemas + rules | Covers most individual filers |
| **3 — ITR-3** | Business/professional income (P&L, balance sheet blocks) | Covers professionals & traders |
| **4 — ITR-5/6/7** | Firms/LLP, companies, trusts — largest schemas; use **Report API** fallback for any form not API-fileable | Full ITR-1…7 coverage |
| **5 — Production** | Live keys; audit logging; monitoring; DPDP compliance review | Real filings |
| **6 — (optional) Own ERI** | Pursue Type-2 ERI registration if volume justifies owning the channel | Lower per-filing cost, full control |

---

## 8. Open questions

**Resolved**
- ✅ **Target users / scope** — all forms, **ITR-1…7**.
- ✅ **Aggregator** — **Quicko Sandbox** (Path B); Surepass kept only as KYC fallback.

**Still to resolve before Phase 1**
1. **Per-form coverage confirmation** — verify with Quicko which of ITR-5/6/7 are
   directly API-fileable vs Report-API-only (Phase 0 deliverable).
2. **Document set** — which docs will users upload per form? (Form-16, AIS/26AS,
   broker P&L, books of accounts for ITR-3/5/6) — drives the `extract` prompts.
3. **Regime default** — auto-recommend old vs new, or let user choose?
4. **e-Verification UX** — Aadhaar OTP vs net-banking vs DSC — driven by Quicko support
   (DSC is effectively mandatory for companies/audited ITR-6).
5. **Pricing model** — Quicko per-API/per-filing cost vs your end-user pricing.

---

## 9. Sources

- E-Return Intermediary (ERI) — types, eligibility, registration:
  [cleartax.in](https://cleartax.in/s/e-return-intermediary-eri-income-tax) ·
  [incometax.gov.in ERI registration manual](https://www.incometax.gov.in/iec/foportal/help/perform-eri-registration) ·
  [tax2win.in guide](https://tax2win.in/guide/e-return-intermediary)
- Official ERI API specification (CPC 2.0):
  [ERI API Specification v1.1 (PDF)](https://www.incometax.gov.in/iec/foportal/sites/default/files/2021-11/ERI%20API%20Specification_v1.1.pdf)
- Aggregator / tax-API providers:
  [Sandbox by Quicko](https://sandbox.co.in/) ·
  [Quicko Sandbox — Income-Tax Business / ITR API docs](https://docs.api.quicko.com/income-tax-apis/income-tax-business-apis/itr) ·
  [Surepass ITR API](https://surepass.io/income-tax-return/) ·
  [ITR Submission API overview (digiqt)](https://digiqt.com/api-details/india/accounting-tax/itr-submission-api-income-tax-of-india/)
