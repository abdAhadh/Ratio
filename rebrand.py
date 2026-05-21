#!/usr/bin/env python3
"""Rebrand closor-clone → Ratio (US landing).

Strategy: text find-and-replace across index.html AND all .mjs data files
that Framer rehydrates from. Longest matches first to avoid prefix collisions.
Logo image references are also swapped to ERP logos.
"""
import os, re, glob, shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(ROOT, "assets")

# ────────────────────────────────────────────────────────────────────
# 1) Logo file swaps. Each closor brand logo file gets overwritten
#    with the corresponding Ratio ERP logo (so HTML refs don't need
#    rewriting — same path, new content). When the closor file is .png
#    but the replacement is .svg, we add a redirect line via filename
#    rewriting in the HTML instead.
# ────────────────────────────────────────────────────────────────────
LOGO_SWAPS = [
    # (closor basename pattern, replacement source file in assets/)
    ("jAvS7i3euzhzs9QG47ZCnKWs", "erp-netsuite.svg",   ".png"),
    ("fsJ1gOVplaJe3c8baYuNmLdRk", "erp-sap.svg",       ".png"),
    ("iWxq7l9uiHCpn3rJ20znALDue2I", "erp-dynamics365.png", ".png"),
    ("NnTn4flsDXQe6LWvltXVlRps", "erp-sage.svg",        ".png"),
    ("A7BEzgODSPL3agNIiD6fYHUiweE", "icon-quickbooks.svg", ".png"),
    ("ZVex0Mw39oLEoCDbZKzESs2WMU", "icon-salesforce.svg", ".png"),
]

# ────────────────────────────────────────────────────────────────────
# 2) Text replacements. Order: LONGEST first so substrings don't break
#    earlier matches. Replacing in .mjs files too because Framer
#    re-hydrates React from inlined data inside those modules.
# ────────────────────────────────────────────────────────────────────
TEXT = [
    # ── Meta + brand ────────────────────────────────────────────────
    ("Closor — AI Workflow Automation for Smarter Teams",
     "Ratio — AI coworker to automate AR"),
    ("Closor is an AI-powered platform that automates workflows, delivers real-time insights, and helps teams work faster, stay aligned, and scale efficiently.",
     "Ratio is an AI coworker for AR that runs collections, cash applications, deductions and disputes — on top of your ERP and bank."),

    # ── Hero copy ──────────────────────────────────────────────────
    ("Get instant answers, explore ideas, and solve problems effortlessly with a seamless AI experience designed for everyday productivity.",
     "AI agents that run collections, cash applications, deductions and disputes, end-to-end. Sits on top of your existing ERP and bank."),
    ("Work Faster with AI That Adapts to You",
     "Your AI coworker to automate AR"),
    ("Smarter Workflows, Simplified", "AI agents for AR"),
    ("BOOK DEMO", "REQUEST DEMO"),
    ("START FREE TRIAL", "SEE THE PRODUCT"),

    # ── Nav ────────────────────────────────────────────────────────
    ("TESTIMONIALS", "OUTCOMES"),
    ("INTEGRATIONS", "INTEGRATIONS"),
    ("PRICING", "INTEGRATIONS"),
    ("CONTACT", "FAQ"),

    # ── Trusted by strip — handle every case variant ─────────────
    ("TRUSTED BY", "SITS ON TOP OF"),
    ("Trusted by", "Sits on top of"),
    ("trusted by", "sits on top of"),
    ("40+ BRANDS", "YOUR STACK"),
    ("40+ Brands", "Your stack"),
    ("40+ brands", "your stack"),
    ("Trusted by clients worldwide", "What finance leaders say"),

    # ── THE PROBLEM section → THE PRODUCT ──────────────────────────
    ("The problem", "The product"),
    ("THE PROBLEM", "THE PRODUCT"),
    ("Points that explains", "Finally, AR software that does the work for you"),
    ("Choose a plan that fits your needs. No hidden fees, no surprises just powerful features to help you grow.",
     "Ratio learns from every customer interaction and gets smarter over time. It personalises every touchpoint, just like your best AR hire would."),

    # 3 problem cards → 3 AR capabilities
    ("Users often receive generic experiences that don’t adapt to their needs, reducing satisfaction and engagement.",
     "Voice, email, or SMS. Ratio picks each customer's preferred channel, follows the cadence you set, and escalates when your contact goes dark."),
    ("Manual processes and lack of integration slow teams down and create unnecessary friction.",
     "Connects to your bank and auto-matches incoming payments to open invoices, across any source. Zero spreadsheet reconciliation."),
    ("Existing tools don’t adapt to user behavior, leading to a one-size-fits-all experience that often misses the mark.",
     "When customers short-pay, Ratio validates the claim against your invoice and contract records, captures the reason, and helps recover what's owed before write-off."),
    ("Complex User Experiences", "Multi-channel collections"),
    ("Inefficient Workflows", "Cash, auto-applied"),
    ("Lack of Personalization", "Recover deductions"),

    # ── GLOBAL DATA section → OUTCOMES intro ──────────────────────
    ("GLOBAL DATA", "OUTCOMES"),
    ("Global Data", "Outcomes"),
    ("What Developers Are Saying", "What you should expect in 60 days"),
    ("Thousands of developers using worldwide", "Numbers that collect more cash, faster and cheaper"),
    ("“The switch to using vertex brought value to the brand insanely. This is good tool to use.”",
     "“Ratio took a finance ops job that used to take 3 people and ran it cleaner with one. DSO dropped 40% in 8 weeks.”"),
    ("Rehan Chatterjee", "Mia Patel"),
    ("CEO Loom", "CFO, Series B SaaS"),

    # ── HOW IT WORKS section ──────────────────────────────────────
    ("Get Started in Just a Few Steps", "How Ratio works"),
    ("1. Sign Up", "1. Connect"),
    ("2. Customize Your Experience", "2. Set guardrails"),
    ("3. Achieve More Effortlessly", "3. Watch DSO drop"),
    ("Create your account in minutes and set up your profile to get started.",
     "Connect your ERP, bank and inbox. Pilot live in one week."),
    ("Add your preferences, tasks, or data, and let the system tailor everything to your needs.",
     "Set credit terms, payment cadence and dispute thresholds. Ratio uses these to run your AR."),
    ("Use powerful tools and insights to streamline your workflow and boost productivity.",
     "Live dashboard shows progress. Ratio escalates only when human judgment is needed."),
    ("Sign Up", "Connect"),
    ("Customize Your Experience", "Set guardrails"),
    ("Achieve More Effortlessly", "Watch DSO drop"),

    # ── FEATURES section ──────────────────────────────────────────
    ("Get Started in with latest features", "Built for finance teams"),
    ("Reduce manual work with intelligent processes that run seamlessly.",
     "Ratio surfaces disputes in Slack with full context, drafts the reply, and follows through until the cash is collected."),
    ("Easily adapt and expand your operations without performance limitations.",
     "Combines payment history with pulled credit reports so finance can set smarter terms — and renegotiate when an account trends risky."),
    ("Enable teams to work together efficiently with shared tools and insights.",
     "Live DSO, aging buckets, and cohort recovery rates. Forecast cash collections by week, customer, and product line."),
    ("Experience consistent speed and stability, even at peak usage.",
     "SOC 2 ready. Customer data encrypted at rest and in transit, used only to improve your own account."),
    ("Easily integrate with your existing tools and systems to create a unified and connected workflow.",
     "Slots on top of NetSuite, SAP, Oracle, Sage, Microsoft Dynamics — no rip and replace."),
    ("Manage all your tools, data, and workflows from one unified platform.",
     "Unified AR view across collections, cash apply, deductions and disputes."),
    ("Turn ideas into action quickly with streamlined workflows.",
     "Cuts the long tail of small accounts your team can't afford to chase manually."),
    ("Leverage real-time analytics and actionable insights to drive smarter and measurable business growth.",
     "Insights that let you re-allocate AR headcount to high-judgment work instead of chase-ups."),
    ("Scalable Infrastructure", "Resolve disputes faster"),
    ("Empower Your Team", "Data-led credit terms"),
    ("Teams Collaboration", "Real-time AR insights"),
    ("Advanced Security", "Security &amp; data"),
    ("Simplify Complex Operations", "Plugs into your stack"),
    ("Reserve Your Spot", "Talk to founders"),
    ("Scale Your Business with Confidence", "Built for finance"),
    ("Designed to scale as you grow", "Built for finance"),

    # ── BRAND FEEDBACKS / testimonials ────────────────────────────
    ("BRAND FEEDBACKS", "TESTIMONIALS"),
    ("Brand feedbacks", "Testimonials"),
    ("Trusted by clients worldwide", "What finance leaders say"),
    ("Super clean design and very easy to use. It didn’t take long to understand the workflow.",
     "Pilot was live by week two. Cash apply went from a 3-day backlog to same-day."),

    # ── PRICING section ──────────────────────────────────────────
    ("Pricing Plans", "Engagement"),
    ("Simple, Transparent Pricing", "Founding-partner pricing"),
    ("Closor Pro", "Pilot"),
    ("Professional Pack", "Production"),
    ("Ideal for professionals who need more power, flexibility, and efficiency.",
     "8-week pilot. Pick one workflow (collections, cash apply, or deductions). See impact before scaling."),
    ("Ideal for professionals who need more power.",
     "Full AR autopilot. Custom plan sized to your invoice volume — no per-seat surprises."),

    # ── Final CTA ────────────────────────────────────────────────
    ("Would you like to connect with us?", "Your next AR hire should be an AI agent"),

    # ── Brand last so it doesn't break IDs ──────────────────────
    # Footer "© 2026 closor rights reserved..."
    ("@ 2026 closor rights reserved.",  "© 2026 Ratio. All rights reserved."),
    ("@ 2026 closor rights reserved",   "© 2026 Ratio. All rights reserved"),
    ("Closor", "Ratio"),
]


def replace_in_text(text, swaps):
    for old, new in swaps:
        text = text.replace(old, new)
    return text


# Apply text replacements to every text-bearing file in the tree
files = [os.path.join(ROOT, "index.html")]
files += glob.glob(os.path.join(ASSETS, "*.mjs"))
files += glob.glob(os.path.join(ASSETS, "*.html"))
files += glob.glob(os.path.join(ASSETS, "*.json"))
files += glob.glob(os.path.join(ASSETS, "*.js"))
files += glob.glob(os.path.join(ASSETS, "us-scenes", "*.json"))
print(f"Editing {len(files)} files...")
edited = 0
for path in files:
    try:
        with open(path, encoding="utf-8") as f:
            src = f.read()
    except (UnicodeDecodeError, IsADirectoryError):
        continue
    out = replace_in_text(src, TEXT)
    if out != src:
        with open(path, "w", encoding="utf-8") as f:
            f.write(out)
        edited += 1
print(f"  modified {edited} files")

# Logo file swaps — overwrite the closor logo files with our ERP logos.
# Files are referenced via the basename in HTML; we keep the same names
# but copy the content from the ERP logo file. .png filename + .svg
# content is OK because the http.server here serves by extension, so
# we copy raw .svg bytes into a .svg file and rewrite the basename.
print("\nSwapping logo files...")
for closor_base, ratio_file, _ext in LOGO_SWAPS:
    ratio_src = os.path.join(ASSETS, ratio_file)
    if not os.path.exists(ratio_src):
        print(f"  skip {ratio_file} (missing)")
        continue
    # Find all closor variants (different hashes)
    matches = glob.glob(os.path.join(ASSETS, f"{closor_base}*"))
    if not matches:
        print(f"  skip {closor_base} (no closor file)")
        continue
    # Write the ratio logo as a sibling .svg named after the closor base
    ratio_ext = os.path.splitext(ratio_file)[1]
    sibling = os.path.join(ASSETS, f"{closor_base}{ratio_ext}")
    shutil.copy(ratio_src, sibling)
    print(f"  wrote {os.path.basename(sibling)} ← {ratio_file}")
    # Rewrite all .png references for this base → .svg references
    if ratio_ext == ".svg":
        # Update HTML + .mjs to point .png → .svg for this base
        for path in files:
            with open(path, encoding="utf-8", errors="ignore") as f:
                src = f.read()
            patt = re.compile(re.escape(closor_base) + r"(-[a-f0-9]+)?\.png")
            new_src = patt.sub(f"{closor_base}.svg", src)
            if new_src != src:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new_src)

print("\nDone.")
