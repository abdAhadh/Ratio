import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { TrustedByStrip } from "@/components/trusted-by-strip";
import { ProductSection } from "@/components/product-section";
import { ROISection } from "@/components/roi-section";
import { IntegrationsSection } from "@/components/integrations-section";
import { FAQSection } from "@/components/faq-section";
import { CTABanner } from "@/components/cta-banner";
import { SiteFooter } from "@/components/site-footer";

/**
 * Page composition matches the live 8098 reference:
 *   Nav (fixed) → Hero → Trusted-by → Product → ROI → Integrations → FAQ → CTA → Footer
 */
export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <TrustedByStrip />
        <ProductSection />
        <ROISection />
        <IntegrationsSection />
        <FAQSection />
        <CTABanner />
      </main>
      <SiteFooter />
    </>
  );
}
