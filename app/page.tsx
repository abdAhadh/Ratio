import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Comparison } from "@/components/comparison";
import { FeatureBookkeeping } from "@/components/feature-bookkeeping";
import { FeatureReporting } from "@/components/feature-reporting";
import { FeatureCompliance } from "@/components/feature-compliance";
import { Testimonial } from "@/components/testimonial";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <Comparison />
        <FeatureBookkeeping />
        <FeatureReporting />
        <FeatureCompliance />
        <Testimonial />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
