# ITR Filing Software — Architecture & Provider Plan

> Status: planning doc (no code yet). India (Income Tax Department / CPC 2.0) context.
> Goal: build software that prepares and **electronically files** Income Tax Returns,
> using Claude as the document-understanding + reasoning layer and a registered
> e-Return Intermediary (ERI) channel for the actual filing.

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

| Provider | Notes |
|---|---|
| **Sandbox (by Quicko)** — `sandbox.co.in` | Most complete dev-facing "Tax API stack" for India: PAN/KYC, tax computation, prepare & file ITR, plus TDS & GST. Built for startups → enterprise. **Primary candidate.** |
| **Surepass** — `surepass.io` | ITR filing + ITR verification APIs; strong KYC suite. |
| **Setu / TechDev / others** | KYC + filing wrappers of varying coverage. |

**Required access on Path B** is just: business onboarding/KYC with the provider →
**API key** → call their endpoints. Verify exact endpoint names, scopes, and pricing
against the provider's live docs at integration time.

### Recommendation

**Start on Path B (Quicko Sandbox as primary).** Reach a compliant, working filing
flow in days. Migrate to your own ERI (Path A) later only if volume/economics justify
owning the channel.

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
      extract/route.ts     # POST docs → Claude → structured JSON
      compute/route.ts     # deterministic tax calc + regime compare
      file/route.ts        # call aggregator prefill/validate/file/e-verify
lib/
  itr/
    schema.ts              # ITR JSON schema (shared by Claude output + validation)
    tax-rules.ts           # deterministic computation (slabs, deductions, cess)
    anthropic.ts           # Claude client + prompt + output_config.format
    eri-client.ts          # aggregator API wrapper (key from env)
```

Key design choices:

- **One canonical ITR schema** (`lib/itr/schema.ts`) drives both Claude's
  `output_config.format` *and* backend validation — single source of truth.
- **All third-party calls are server-side.** API keys (`ANTHROPIC_API_KEY`,
  `ERI_API_KEY`) live only in server env, never shipped to the client.
- **Idempotency + audit log** on the `file` step — store every request/response to the
  ERI for compliance and dispute resolution.

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

| Phase | Scope | Outcome |
|---|---|---|
| **0 — Provider onboarding** | Sign up with Quicko Sandbox; complete KYC; get sandbox API key; read their ITR API docs | Confirmed endpoint list + auth model |
| **1 — AI extraction** | `extract` route: Form-16/26AS/AIS → structured ITR JSON via Claude | Reliable doc → JSON |
| **2 — Deterministic compute** | `compute` route: tax rules + old/new regime comparison; reconcile vs Claude draft | Trustworthy numbers |
| **3 — Filing (sandbox)** | `file` route against aggregator **sandbox** env: prefill → validate → file → e-verify | End-to-end test filing |
| **4 — Production** | Switch to live keys; audit logging; monitoring; DPDP compliance review | Real filings |
| **5 — (optional) Own ERI** | Pursue Type-2 ERI registration if volume justifies owning the channel | Lower per-filing cost, full control |

---

## 8. Open questions to resolve before Phase 1

1. **Target users** — individuals (ITR-1/2), or also business/professional (ITR-3/4)?
   This decides schema complexity.
2. **Aggregator choice** — confirm Quicko Sandbox vs Surepass after reviewing pricing
   + ITR-form coverage for your target users.
3. **Document set** — which docs will users actually upload? (Form-16 only, or full
   AIS/26AS/broker statements?)
4. **Regime default** — auto-recommend old vs new, or let user choose?
5. **e-Verification UX** — Aadhaar OTP vs net-banking vs DSC — driven by aggregator support.

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
  [Surepass ITR API](https://surepass.io/income-tax-return/) ·
  [ITR Submission API overview (digiqt)](https://digiqt.com/api-details/india/accounting-tax/itr-submission-api-income-tax-of-india/)
