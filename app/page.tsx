import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { TrustedByStrip } from "@/components/trusted-by-strip";
import { ProblemSection } from "@/components/problem-section";
import { ProductSection } from "@/components/product-section";
import { ROISection } from "@/components/roi-section";
import { IntegrationsSection } from "@/components/integrations-section";
import { CalculatorSection } from "@/components/calculator-section";
import { FAQSection } from "@/components/faq-section";
import { CTABanner } from "@/components/cta-banner";
import { SiteFooter } from "@/components/site-footer";

/**
 * Page composition:
 *   Nav (fixed) → Hero → Trusted-by → Problem → Product → ROI → Integrations →
 *   Calculator → FAQ → CTA → Footer
 *
 * Problem section sits immediately after the trusted-by strip so the
 * viewer encounters the "why this matters" frame before any product
 * detail. Calculator slots after Integrations so a viewer reads how Ratio
 * recovers money + which systems it plugs into BEFORE seeing the personal
 * "for a brand my size, here's the number" moment that anchors the FAQ.
 */
export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <TrustedByStrip />
        <ProblemSection />
        <ProductSection />
        <ROISection />
        <IntegrationsSection />
        <CalculatorSection />
        <FAQSection />
        <CTABanner />
      </main>
      <SiteFooter />
    </>
  );
}
