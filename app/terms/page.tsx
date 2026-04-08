import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use - Ratio",
  description:
    "Terms of Use for Ratio, the AI-native bookkeeping, reporting, and compliance platform by TidalPeak Labs Private Limited.",
};

export default function TermsOfUse() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden pt-28 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <p className="text-sm text-text-secondary mb-2">
            Last updated: April 2026
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Terms of Use
          </h1>
          <p className="text-text-secondary mb-10 text-lg leading-relaxed">
            These Terms of Use (&quot;Terms&quot;) constitute a legally binding
            agreement between you (&quot;Client,&quot; &quot;you,&quot; or
            &quot;your&quot;) and TidalPeak Labs Private Limited
            (&quot;TidalPeak Labs,&quot; &quot;Ratio,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;), a company incorporated under
            the laws of India with its registered office at Collab Space, Near
            Babai Tiffins, 19th Main Rd, 4th Sector, HSR Layout, Bengaluru,
            Karnataka 560102. By accessing or using the Ratio platform and
            services available at tryratio.io, you agree to be bound by these
            Terms.
          </p>

          <div className="space-y-10 text-navy leading-relaxed">
            {/* 1. Service Description */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                1. Service Description
              </h2>
              <p className="mb-3">
                TidalPeak Labs Private Limited, operating under the brand name
                Ratio, provides an AI-native bookkeeping, reporting, and
                compliance platform designed for Indian Micro, Small, and Medium
                Enterprises (MSMEs). In the course of providing these services,
                Ratio collects, processes, and stores financial and banking data
                on behalf of its clients, including but not limited to banking
                transaction records, payment gateway data, marketplace
                transaction data, and related financial information. We operate
                a hybrid model that combines software platform access with
                managed services delivered by our team of qualified Chartered
                Accountants (CAs).
              </p>
              <p className="mb-3">
                1.1. <strong>Software Access.</strong> Depending on your plan,
                you may use the Ratio accounting software directly, or our team
                may upload processed data to your preferred accounting system
                (such as Tally or Zoho Books).
              </p>
              <p className="mb-3">
                1.2. <strong>Integrations.</strong> Ratio integrates with your
                business systems, including but not limited to marketplace
                accounts (Amazon, Flipkart, etc.), Shopify, Razorpay, bank
                accounts, and other financial platforms. These integrations
                enable real-time ledger reconciliation and data synchronization.
              </p>
              <p className="mb-3">
                1.3. <strong>Scope of Services.</strong> Our services include
                bookkeeping, financial reporting, tax filing, GST compliance,
                TDS compliance, and other regulatory compliance services as
                described in your service agreement or plan.
              </p>
              <p className="mb-3">
                1.4. <strong>Managed Services.</strong> Where applicable, our
                team of CAs will review, prepare, and file returns on your
                behalf. All filings are reviewed for accuracy by qualified
                professionals before submission.
              </p>
              <p>
                1.5. <strong>Communication Channels.</strong> Ratio may
                communicate with clients and collect expense data via WhatsApp
                Business API, Slack, and email integrations.
              </p>
            </section>

            {/* 2. Billing and Payments */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                2. Billing and Payments
              </h2>
              <p className="mb-3">
                2.1. <strong>Pre-Payment Model.</strong> Ratio operates on a
                pre-payment basis. Services will commence only after payment has
                been received and confirmed.
              </p>
              <p className="mb-3">
                2.2. <strong>Billing Cycle.</strong> The default billing cycle is
                monthly. Half-yearly and yearly billing options are available and
                may include applicable discounts as communicated at the time of
                subscription.
              </p>
              <p className="mb-3">
                2.3. <strong>Late Payment.</strong> If payment is not received
                within fourteen (14) days of the due date, Ratio reserves the
                right to suspend all services and revoke access to the software
                platform until payment is received in full.
              </p>
              <p>
                2.4. <strong>Taxes.</strong> All fees are exclusive of applicable
                taxes unless stated otherwise. You are responsible for any taxes,
                duties, or government levies applicable to the services.
              </p>
            </section>

            {/* 3. Client Obligations */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                3. Client Obligations
              </h2>
              <p className="mb-3">
                3.1. <strong>Accurate Data.</strong> You agree to provide
                accurate, complete, and timely financial data and documentation
                required for Ratio to perform its services. This includes
                invoices, bank statements, expense records, and any other
                relevant documents.
              </p>
              <p className="mb-3">
                3.2. <strong>Access Credentials.</strong> You are responsible for
                maintaining the security of your account credentials, API keys,
                and access tokens for any integrated platforms. You must
                promptly notify Ratio if you become aware of any unauthorized
                access.
              </p>
              <p className="mb-3">
                3.3. <strong>Compliance with Laws.</strong> You agree to comply
                with all applicable laws, regulations, and statutory
                requirements relevant to your business operations in India.
              </p>
              <p>
                3.4. <strong>Cooperation.</strong> You agree to cooperate with
                Ratio&apos;s team in a timely manner, including responding to
                queries, approving filings before submission when required, and
                providing requested clarifications.
              </p>
            </section>

            {/* 4. Liability */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                4. Limitation of Liability
              </h2>
              <p className="mb-3">
                4.1. <strong>Filing Accuracy.</strong> While Ratio&apos;s CA team
                reviews all filings for accuracy, Ratio shall not be held liable
                for errors, penalties, or adverse outcomes arising from
                incorrect, incomplete, or delayed data provided by the Client.
                The Client bears responsibility for any penalties resulting from
                filing errors caused by inaccurate source data.
              </p>
              <p className="mb-3">
                4.2. <strong>Liability Cap.</strong> In no event shall
                Ratio&apos;s total aggregate liability to the Client, arising
                out of or in connection with these Terms or the services,
                exceed the total fees paid by the Client to Ratio in the three
                (3) months immediately preceding the event giving rise to the
                claim.
              </p>
              <p className="mb-3">
                4.3. <strong>Exclusion of Damages.</strong> To the maximum
                extent permitted by applicable law, Ratio shall not be liable
                for any indirect, incidental, special, consequential, or
                punitive damages, including but not limited to loss of profits,
                loss of revenue, loss of data, or business interruption,
                regardless of the cause of action or theory of liability.
              </p>
              <p>
                4.4. <strong>Professional Review.</strong> Ratio&apos;s CA team
                exercises professional diligence in reviewing filings and
                reports. However, this review does not constitute a guarantee
                against all possible errors, particularly where source data is
                ambiguous or incomplete.
              </p>
            </section>

            {/* 5. Data Privacy and Security */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                5. Data Privacy and Security
              </h2>
              <p className="mb-3">
                5.1. <strong>Data Storage.</strong> Ratio stores Client
                financial data on its servers. All data processing occurs on
                Ratio&apos;s infrastructure.
              </p>
              <p className="mb-3">
                5.2. <strong>No AI Training on Client Data.</strong> Ratio does
                not use Client data to train its AI models. Your financial data
                is used solely for the purpose of delivering the services
                described in these Terms.
              </p>
              <p className="mb-3">
                5.3. <strong>Encryption and Security.</strong> Ratio employs
                strict encryption standards and data masking protocols to
                protect Client data. All data is encrypted both in transit and
                at rest.
              </p>
              <p>
                5.4. <strong>Data Isolation.</strong> Client data is logically
                isolated on a per-client basis. No Client&apos;s data is
                accessible to or shared with any other client.
              </p>
            </section>

            {/* 6. Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                6. Intellectual Property
              </h2>
              <p className="mb-3">
                6.1. <strong>Ownership.</strong> All software, AI models,
                algorithms, processes, workflows, documentation, and other
                intellectual property associated with the Ratio platform are
                and shall remain the exclusive property of TidalPeak Labs
                Private Limited.
              </p>
              <p className="mb-3">
                6.2. <strong>License.</strong> Subject to these Terms and payment
                of applicable fees, Ratio grants you a limited,
                non-exclusive, non-transferable, revocable license to access
                and use the Ratio platform for your internal business purposes.
              </p>
              <p>
                6.3. <strong>Restrictions.</strong> You may not copy, modify,
                distribute, sell, lease, reverse engineer, decompile, or
                disassemble any part of the Ratio platform, nor may you create
                derivative works based on the platform.
              </p>
            </section>

            {/* 7. Third-Party Integrations */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                7. Third-Party Integrations
              </h2>
              <p className="mb-3">
                7.1. <strong>Third-Party Services.</strong> Ratio integrates
                with various third-party services, including but not limited to
                marketplace platforms, payment gateways, banking APIs, and
                accounting software. These integrations are provided for
                convenience and to enhance the service.
              </p>
              <p className="mb-3">
                7.2. <strong>No Responsibility for Third Parties.</strong> Ratio
                is not responsible for the availability, accuracy, or
                performance of any third-party service. Outages, data
                discrepancies, or service interruptions caused by third-party
                platforms are beyond Ratio&apos;s control.
              </p>
              <p>
                7.3. <strong>Third-Party Terms.</strong> Your use of
                third-party integrations may be subject to the terms and
                conditions of those third-party providers. You are responsible
                for reviewing and complying with such terms.
              </p>
            </section>

            {/* 8. Confidentiality */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                8. Confidentiality
              </h2>
              <p className="mb-3">
                8.1. <strong>Mutual Obligation.</strong> Both parties agree to
                maintain the confidentiality of any proprietary or sensitive
                information disclosed during the course of the engagement.
                This includes, but is not limited to, financial data, business
                strategies, client lists, technical specifications, and pricing
                information.
              </p>
              <p className="mb-3">
                8.2. <strong>Permitted Disclosures.</strong> Confidential
                information may be disclosed where required by law, regulation,
                or court order, provided the disclosing party gives the other
                party reasonable prior notice where legally permissible.
              </p>
              <p>
                8.3. <strong>Survival.</strong> The confidentiality obligations
                under this section shall survive the termination or expiry of
                these Terms for a period of two (2) years.
              </p>
            </section>

            {/* 9. Termination */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
              <p className="mb-3">
                9.1. <strong>Client-Initiated Termination.</strong> You may
                terminate your use of Ratio&apos;s services by providing at
                least fifteen (15) days written notice. Termination requests
                should be sent to{" "}
                <a
                  href="mailto:support@tryratio.io"
                  className="text-accent underline"
                >
                  support@tryratio.io
                </a>
                .
              </p>
              <p className="mb-3">
                9.2. <strong>Billing on Termination.</strong> You are required to
                pay for the full calendar month in which the termination takes
                effect. No pro-rated refunds will be issued for partial months.
              </p>
              <p className="mb-3">
                9.3. <strong>Data Export.</strong> Following termination, you
                will have a period of thirty (30) days to export your data from
                the Ratio platform. Ratio will provide reasonable assistance
                in facilitating data export during this period.
              </p>
              <p className="mb-3">
                9.4. <strong>Data Deletion.</strong> After the thirty (30) day
                export window, all Client data will be permanently deleted from
                Ratio&apos;s servers. This deletion is irreversible.
                Notwithstanding the above, certain financial and tax records may
                be retained for up to 7 years as required under the Income Tax
                Act, 1961.
              </p>
              <p className="mb-3">
                9.5. <strong>Termination by Ratio.</strong> Ratio may suspend or
                terminate your access to the services if you breach these
                Terms, fail to make timely payments, or engage in conduct that
                Ratio reasonably determines to be harmful to its operations or
                other clients.
              </p>
              <p>
                9.6. <strong>Special Requests.</strong> For any special
                requirements related to termination, data retention, or
                transition, please contact us at{" "}
                <a
                  href="mailto:support@tryratio.io"
                  className="text-accent underline"
                >
                  support@tryratio.io
                </a>
                .
              </p>
            </section>

            {/* 10. Governing Law and Jurisdiction */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                10. Governing Law and Jurisdiction
              </h2>
              <p className="mb-3">
                10.1. <strong>Governing Law.</strong> These Terms shall be
                governed by and construed in accordance with the laws of India.
              </p>
              <p>
                10.2. <strong>Jurisdiction.</strong> Subject to the arbitration
                clause below, the courts located in Bengaluru, Karnataka,
                India shall have exclusive jurisdiction over any disputes
                arising out of or in connection with these Terms.
              </p>
            </section>

            {/* 11. Arbitration */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                11. Dispute Resolution and Arbitration
              </h2>
              <p className="mb-3">
                11.1. <strong>Amicable Resolution.</strong> In the event of any
                dispute arising out of or in connection with these Terms, the
                parties shall first attempt to resolve the dispute amicably
                through good faith negotiations.
              </p>
              <p className="mb-3">
                11.2. <strong>Arbitration.</strong> If the dispute is not
                resolved through negotiation within thirty (30) days, it shall
                be referred to and finally resolved by arbitration in
                accordance with the Arbitration and Conciliation Act, 1996 (as
                amended). The seat of arbitration shall be Bengaluru,
                Karnataka, India. The arbitration shall be conducted in
                English by a sole arbitrator mutually appointed by both
                parties.
              </p>
              <p>
                11.3. <strong>Binding Decision.</strong> The arbitral award
                shall be final and binding upon both parties.
              </p>
            </section>

            {/* 12. General Provisions */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                12. General Provisions
              </h2>
              <p className="mb-3">
                12.1. <strong>Amendments.</strong> Ratio reserves the right to
                modify these Terms at any time. Material changes will be
                communicated to you via email or through the platform. Your
                continued use of the services after such notification
                constitutes acceptance of the revised Terms.
              </p>
              <p className="mb-3">
                12.2. <strong>Severability.</strong> If any provision of these
                Terms is found to be invalid or unenforceable, the remaining
                provisions shall continue in full force and effect.
              </p>
              <p className="mb-3">
                12.3. <strong>Entire Agreement.</strong> These Terms, together
                with any service agreement or plan documentation, constitute
                the entire agreement between you and Ratio regarding the
                services.
              </p>
              <p className="mb-3">
                12.4. <strong>Waiver.</strong> The failure of either party to
                enforce any right or provision of these Terms shall not
                constitute a waiver of that right or provision.
              </p>
              <p>
                12.5. <strong>Assignment.</strong> You may not assign or
                transfer your rights or obligations under these Terms without
                Ratio&apos;s prior written consent. Ratio may assign its rights
                and obligations without restriction.
              </p>
            </section>

            {/* Contact */}
            <section className="border-t border-border pt-10">
              <h2 className="text-2xl font-semibold mb-4">
                13. Contact Information
              </h2>
              <p className="mb-3">
                If you have questions about these Terms or need assistance,
                please contact us:
              </p>
              <div className="bg-cream-dark rounded-xl p-6 space-y-2 text-sm">
                <p>
                  <strong>TidalPeak Labs Private Limited</strong>
                </p>
                <p>
                  Collab Space, Near Babai Tiffins, 19th Main Rd, 4th Sector,
                  HSR Layout, Bengaluru, Karnataka 560102
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:support@tryratio.io"
                    className="text-accent underline"
                  >
                    support@tryratio.io
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <a
                    href="https://tryratio.io"
                    className="text-accent underline"
                  >
                    tryratio.io
                  </a>
                </p>
              </div>
              <div className="bg-cream-dark rounded-xl p-6 space-y-2 text-sm mt-4">
                <p>
                  <strong>Grievance Officer</strong>
                </p>
                <p>Abdul Ahadh, Director and Co-founder</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:support@tryratio.io"
                    className="text-accent underline"
                  >
                    support@tryratio.io
                  </a>
                </p>
                <p className="mt-2 text-text-secondary">
                  Grievances will be acknowledged within 30 days and resolved
                  within 30 days of acknowledgment.
                </p>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
