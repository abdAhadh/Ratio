import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { DemoRequest } from "@/components/demo-request";

export const metadata: Metadata = {
  title: "Request Demo | Ratio",
  description:
    "Book a demo of Ratio. See how our AI agents recover invalid retailer deductions and Amazon FBA reimbursements for CPG brands.",
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
