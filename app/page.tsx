import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Comparison } from "@/components/comparison";
import { FeatureBookkeeping } from "@/components/feature-bookkeeping";
import { FeatureReporting } from "@/components/feature-reporting";
import { FeatureCompliance } from "@/components/feature-compliance";
import { BuiltForSMBs } from "@/components/built-for-smbs";
import { Testimonial } from "@/components/testimonial";
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
        <BuiltForSMBs />
        <Testimonial />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
