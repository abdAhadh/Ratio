import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { DemoRequest } from "@/components/demo-request";

export const metadata: Metadata = {
  title: "Request Demo | Ratio",
  description:
    "Book a demo of Ratio and see how the AI coworker for accounts receivable runs collections, cash application, deductions and disputes on top of your existing systems.",
};

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <DemoRequest />
      <SiteFooter />
    </>
  );
}
