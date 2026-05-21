import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import styles from "@/components/legal-page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Ratio",
  description:
    "Privacy Policy for Ratio, the AI-native bookkeeping, reporting, and compliance platform by TidalPeak Labs Private Limited.",
};

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="Last updated: April 2026">
      <p className={styles.intro}>
        This Privacy Policy describes how TidalPeak Labs Private Limited
        (&quot;TidalPeak Labs,&quot; &quot;Ratio,&quot; &quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;), a company incorporated under the
        laws of India in the state of Karnataka, collects, uses, stores, and
        protects your information when you use the Ratio platform and services
        available at tryratio.io. Our registered office is located at Collab
        Space, Near Babai Tiffins, 19th Main Rd, 4th Sector, HSR Layout,
        Bengaluru, Karnataka 560102.
      </p>

      <div className={styles.noticeBox}>
        <p className={styles.noticeTitle}>
          Important Notice Regarding Financial Data
        </p>
        <p className={styles.noticeBody}>
          TidalPeak Labs Private Limited, operating under the brand name Ratio,
          collects, processes, and stores financial and banking data on behalf
          of its clients. This includes but is not limited to banking
          transaction records, payment gateway data, marketplace transaction
          data, and related financial information necessary for providing
          bookkeeping, reporting, and compliance services.
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.h2}>1. Introduction</h2>
        <p className={styles.p}>
          Ratio is an AI-native bookkeeping, reporting, and compliance platform
          designed for Indian Micro, Small, and Medium Enterprises (MSMEs). We
          are committed to protecting the privacy and security of the data
          entrusted to us by our clients and their employees.
        </p>
        <p className={styles.p}>
          By accessing or using the Ratio platform, you consent to the
          collection, processing, and storage of information as described in
          this Privacy Policy. If you do not agree with this policy, please do
          not use our services.
        </p>
        <p className={styles.p}>
          This policy applies to all users of the Ratio platform, including
          business clients, their authorised representatives, and employees who
          interact with Ratio through integrations such as WhatsApp, Slack, or
          email.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>2. Information We Collect</h2>
        <p className={styles.p}>
          We collect the following categories of information in order to
          provide our services:
        </p>
        <p className={styles.p}>
          2.1. <strong>Business Information.</strong> Company name, GST number,
          PAN, registered address, and business type.
        </p>
        <p className={styles.p}>
          2.2. <strong>Financial Data from Integrated Systems.</strong> Banking
          transaction records, payment gateway records (such as Razorpay),
          marketplace transaction data (such as Amazon, Flipkart, and Shopify),
          point-of-sale (POS) data, invoices, and expense receipts.
        </p>
        <p className={styles.p}>
          2.3. <strong>Employee Expense Data.</strong> Expense receipts and
          related financial documents submitted by client employees via
          WhatsApp, Slack, or email integrations.
        </p>
        <p className={styles.p}>
          2.4. <strong>Contact Information.</strong> Name, email address, and
          phone number of authorised business representatives.
        </p>
        <p className={styles.p}>
          2.5. <strong>Website Analytics Data.</strong> Information collected
          via PostHog, including page views, session data, device information,
          and browsing behaviour on tryratio.io.
        </p>
        <p className={styles.p}>
          2.6. <strong>Cookies.</strong> We currently use essential cookies
          necessary for the functioning of our website. We may introduce
          marketing and retargeting cookies in the future, at which point this
          policy will be updated accordingly.
        </p>
        <p className={styles.p}>
          2.7.{" "}
          <strong>
            Financial Data as Sensitive Personal Data or Information (SPDI).
          </strong>{" "}
          Financial information collected by Ratio, including bank account
          details, payment instrument data, and transaction records, is
          classified as Sensitive Personal Data or Information (SPDI) under the
          Information Technology (Reasonable Security Practices and Procedures
          and Sensitive Personal Data or Information) Rules, 2011. Such data is
          collected only with your written consent, used strictly for the
          stated purpose, and protected with security practices compliant with
          these rules.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>3. How We Collect Information</h2>
        <p className={styles.p}>
          We collect information through the following channels:
        </p>
        <p className={styles.p}>
          3.1. <strong>Direct Collection.</strong> When you sign up for a demo,
          create an account, or communicate with our team, we collect the
          information you provide directly.
        </p>
        <p className={styles.p}>
          3.2. <strong>Integrations.</strong> When you connect your business
          systems to Ratio (such as bank accounts, payment gateways,
          marketplace accounts, and POS systems), we collect financial data
          through these integrations with your explicit authorisation.
        </p>
        <p className={styles.p}>
          3.3. <strong>Expense Collection Bots.</strong> Ratio provides expense
          collection through WhatsApp, Slack, and email integrations. Client
          employees forward expense receipts through these channels, and Ratio
          auto-categorises and extracts relevant data from the submitted
          documents.
        </p>
        <p className={styles.p}>
          3.4. <strong>Website.</strong> We collect analytics data
          automatically when you visit tryratio.io through PostHog and essential
          cookies.
        </p>
        <p className={styles.p}>
          3.5. <strong>WhatsApp Business API.</strong> Ratio uses the WhatsApp
          Business API to communicate with clients and collect expense data
          from client employees. Phone numbers and message metadata may be
          processed by Meta Platforms, Inc., a US-based entity. Users can opt
          out of WhatsApp communications at any time by sending &quot;STOP&quot;
          to the Ratio WhatsApp number. Ratio does not sell or share data
          obtained via WhatsApp with any third party.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>4. How We Use Your Information</h2>
        <p className={styles.p}>
          We use the information we collect for the following purposes:
        </p>
        <p className={styles.p}>
          4.1. <strong>Service Delivery.</strong> To provide bookkeeping,
          financial reporting, tax filing, GST compliance, TDS compliance, and
          other regulatory compliance services.
        </p>
        <p className={styles.p}>
          4.2. <strong>Data Processing and Reconciliation.</strong> To process,
          categorise, and reconcile financial transactions from multiple
          sources.
        </p>
        <p className={styles.p}>
          4.3. <strong>Expense Management.</strong> To auto-categorise and
          extract data from expense receipts submitted by client employees.
        </p>
        <p className={styles.p}>
          4.4. <strong>Communication.</strong> To contact authorised business
          representatives regarding service updates, account matters, and
          support.
        </p>
        <p className={styles.p}>
          4.5. <strong>Platform Improvement.</strong> To analyse website usage
          patterns and improve the Ratio platform and services.
        </p>
        <p className={styles.p}>
          4.6. <strong>Legal Compliance.</strong> To comply with applicable
          laws, regulations, and legal processes.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>5. Data Storage and Security</h2>
        <p className={styles.p}>
          5.1. <strong>Server Location.</strong> All client data is stored on
          Amazon Web Services (AWS) servers located in the Mumbai (Asia
          Pacific) region, India. In compliance with the Reserve Bank of
          India&apos;s directive on storage of payment system data, all
          financial and payment-related data is stored exclusively on servers
          located in India (AWS Mumbai, Asia Pacific region).
        </p>
        <p className={styles.p}>
          5.2. <strong>Encryption.</strong> All data is encrypted both at rest
          and in transit using industry-standard encryption protocols.
        </p>
        <p className={styles.p}>
          5.3. <strong>Per-Client Data Isolation.</strong> Client data is
          logically isolated on a per-client basis. No client&apos;s data is
          accessible to or shared with any other client.
        </p>
        <p className={styles.p}>
          5.4. <strong>Security Measures.</strong> We implement appropriate
          technical and organisational measures to protect your data against
          unauthorised access, alteration, disclosure, or destruction.
        </p>
        <p className={styles.p}>
          5.5. <strong>CERT-In Compliance.</strong> In accordance with CERT-In
          Directions (2022), cybersecurity incidents are reported within 6
          hours of detection. System logs are maintained for a rolling period
          of 180 days within India.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>6. AI and Data Processing</h2>
        <p className={styles.p}>
          6.1. <strong>No AI Training on Client Data.</strong> Ratio does not
          use client data to train any AI models. Your financial data is used
          solely for the purpose of delivering the services you have subscribed
          to.
        </p>
        <p className={styles.p}>
          6.2. <strong>Data Masking.</strong> Before any data is processed
          using AI models, strict encryption and data masking protocols are
          applied. This ensures that AI model providers do not receive
          identifiable client data.
        </p>
        <p className={styles.p}>
          6.3. <strong>On-Server Processing.</strong> All data processing,
          including AI-assisted processing, happens on Ratio&apos;s own
          servers. Client data is not shared with or transmitted to AI model
          providers in any identifiable form.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>7. Cookies and Analytics</h2>
        <p className={styles.p}>
          7.1. <strong>Essential Cookies.</strong> We use essential cookies
          that are necessary for the proper functioning of our website. These
          cookies do not track you for advertising purposes.
        </p>
        <p className={styles.p}>
          7.2. <strong>PostHog Analytics.</strong> We use PostHog to collect
          website analytics data, including page views, session information,
          and general usage patterns. This data helps us understand how
          visitors use our website and improve the user experience.
        </p>
        <p className={styles.p}>
          7.3. <strong>Future Cookies.</strong> We may introduce marketing and
          retargeting cookies in the future. If and when we do, this Privacy
          Policy will be updated, and you will be notified of any changes.
          Appropriate consent mechanisms will be implemented before any such
          cookies are deployed.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>8. Third-Party Services</h2>
        <p className={styles.p}>
          We use the following third-party services in the operation of our
          platform:
        </p>
        <p className={styles.p}>
          8.1. <strong>Amazon Web Services (AWS).</strong> We use AWS for data
          storage and infrastructure. Our servers are located in the AWS Mumbai
          (Asia Pacific) region. AWS is subject to its own privacy and security
          policies.
        </p>
        <p className={styles.p}>
          8.2. <strong>PostHog.</strong> We use PostHog for website analytics
          to understand how visitors interact with our website.
        </p>
        <p className={styles.p}>
          8.3. <strong>AI Model Providers.</strong> We use AI model providers
          for data processing assistance. However, strict guardrails are in
          place: all client data is encrypted and masked before any AI
          processing, and no client data is shared with or used to train AI
          models.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>9. Data Sharing</h2>
        <p className={styles.p}>
          9.1. <strong>No Third-Party Sharing.</strong> Ratio does not sell,
          rent, or share client data with third parties for their own purposes.
        </p>
        <p className={styles.p}>
          9.2. <strong>Service Providers.</strong> Data stored on AWS Mumbai
          servers is subject to AWS&apos;s security and privacy policies.
          However, Ratio maintains full control over client data and does not
          grant third parties access to it.
        </p>
        <p className={styles.p}>
          9.3. <strong>AI Processing Safeguards.</strong> Strict encryption and
          data masking ensures that AI model providers do not receive
          identifiable client data. All processing occurs on Ratio&apos;s own
          infrastructure.
        </p>
        <p className={styles.p}>
          9.4. <strong>Legal Requirements.</strong> We may disclose information
          if required to do so by law, regulation, legal process, or
          governmental request.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>10. Data Retention</h2>
        <p className={styles.p}>
          10.1. <strong>Active Clients.</strong> For active clients, data is
          retained for the duration of the service engagement.
        </p>
        <p className={styles.p}>
          10.2. <strong>After Termination.</strong> Following termination of
          services, clients have a period of thirty (30) days to export their
          data from the Ratio platform. After this 30-day window, all client
          data is permanently deleted from our servers.
        </p>
        <p className={styles.p}>
          10.3. <strong>Special Requests.</strong> For any special requirements
          related to data retention or deletion, please contact us at{" "}
          <a href="mailto:support@tryratio.io" className={styles.link}>
            support@tryratio.io
          </a>
          {" or "}
          <a href="mailto:info@tidalpeaklabs.com" className={styles.link}>
            info@tidalpeaklabs.com
          </a>
          .
        </p>
        <p className={styles.p}>
          10.4. <strong>Regulatory Data Retention.</strong> Notwithstanding the
          above, certain financial and tax records (including GST returns, TDS
          certificates, and ITR filings) may be retained for up to 7 years as
          required under the Income Tax Act, 1961, even after termination of
          services.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>11. Your Rights</h2>
        <p className={styles.p}>
          As a user of the Ratio platform, you have the following rights
          regarding your data:
        </p>
        <p className={styles.p}>
          11.1. <strong>Right to Access.</strong> You may request access to the
          personal and financial data we hold about you or your business.
        </p>
        <p className={styles.p}>
          11.2. <strong>Right to Correction.</strong> You may request
          correction of any inaccurate or incomplete data we hold.
        </p>
        <p className={styles.p}>
          11.3. <strong>Right to Data Export.</strong> You may request an
          export of your data at any time during your active engagement with
          Ratio.
        </p>
        <p className={styles.p}>
          11.4. <strong>Right to Deletion.</strong> You may request deletion of
          your data, subject to any legal obligations that may require us to
          retain certain records.
        </p>
        <p className={styles.p}>
          11.5. <strong>Right to Withdraw Consent.</strong> Where processing is
          based on consent, you have the right to withdraw your consent at any
          time. To exercise any of these rights, please contact us at{" "}
          <a href="mailto:support@tryratio.io" className={styles.link}>
            support@tryratio.io
          </a>
          {" or "}
          <a href="mailto:info@tidalpeaklabs.com" className={styles.link}>
            info@tidalpeaklabs.com
          </a>
          .
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>12. Employee Data</h2>
        <p className={styles.p}>
          12.1. <strong>Scope of Collection.</strong> Ratio collects
          expense-related data from client employees via WhatsApp, Slack, and
          email integrations. This data collection is limited to expense
          receipts and related financial documents that employees forward
          through these channels.
        </p>
        <p className={styles.p}>
          12.2. <strong>Purpose.</strong> Employee expense data is collected
          solely for the purpose of expense management, categorisation, and
          reporting on behalf of the employing business (our client).
        </p>
        <p className={styles.p}>
          12.3. <strong>Data Controller.</strong> The client (employer) remains
          the data controller for employee expense data. Ratio acts as a data
          processor on behalf of the client.
        </p>
        <p className={styles.p}>
          12.4. <strong>Employee Rights.</strong> Employees of our clients who
          have questions about how their expense data is processed should
          contact their employer in the first instance. They may also reach out
          to us at{" "}
          <a href="mailto:support@tryratio.io" className={styles.link}>
            support@tryratio.io
          </a>
          .
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>13. Children&apos;s Privacy</h2>
        <p className={styles.p}>
          Ratio&apos;s services are designed for businesses and are not
          intended for use by individuals under the age of 18. We do not
          knowingly collect personal data from individuals under 18 years of
          age. If we become aware that we have inadvertently collected data
          from an individual under 18, we will take steps to delete such data
          promptly.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>14. Marketing Communications</h2>
        <p className={styles.p}>
          14.1. <strong>Consent-Based Communication.</strong> Ratio only sends
          marketing communications to individuals who have signed up for a demo
          or otherwise provided explicit consent to receive such
          communications.
        </p>
        <p className={styles.p}>
          14.2. <strong>No Unsolicited Marketing.</strong> We do not send
          unsolicited marketing emails or messages. You will only receive
          marketing communications from us if you have voluntarily opted in by
          requesting a demo or subscribing to our communications.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>15. Compliance with Indian Law</h2>
        <p className={styles.p}>
          15.1.{" "}
          <strong>Digital Personal Data Protection Act, 2023.</strong> TidalPeak
          Labs is actively working towards compliance with India&apos;s Digital
          Personal Data Protection Act, 2023 (DPDP Act). This Privacy Policy
          will be updated as compliance measures are implemented and as the
          regulatory framework evolves.
        </p>
        <p className={styles.p}>
          15.2. <strong>Information Technology Act, 2000.</strong> We comply
          with the Information Technology Act, 2000 and the Information
          Technology (Reasonable Security Practices and Procedures and
          Sensitive Personal Data or Information) Rules, 2011, as applicable to
          the collection, storage, and processing of personal and financial
          data.
        </p>
        <p className={styles.p}>
          15.3. <strong>Governing Law.</strong> This Privacy Policy is governed
          by the laws of India. Any disputes arising from this policy shall be
          subject to the exclusive jurisdiction of the courts in Bengaluru,
          Karnataka, India.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>16. Changes to This Policy</h2>
        <p className={styles.p}>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices, services, or applicable laws. Material changes will
          be communicated to active clients via email or through the platform.
        </p>
        <p className={styles.p}>
          We encourage you to review this policy periodically. The &quot;Last
          updated&quot; date at the top of this page indicates when the policy
          was most recently revised.
        </p>
      </section>

      <section className={styles.contactSection}>
        <h2 className={styles.h2}>17. Contact Us</h2>
        <p className={styles.p}>
          If you have questions about this Privacy Policy, wish to exercise your
          data rights, or have any privacy-related concerns, please contact us:
        </p>
        <div className={styles.infoBox}>
          <p>
            <strong>TidalPeak Labs Private Limited</strong>
          </p>
          <p>Operating under the brand name &quot;Ratio&quot;</p>
          <p>
            Collab Space, Near Babai Tiffins, 19th Main Rd, 4th Sector, HSR
            Layout, Bengaluru, Karnataka 560102
          </p>
          <p>CIN: U62099KA2024PTC186394</p>
          <p>GSTIN: 29AAKCT8575C1ZT</p>
          <p>
            Email:{" "}
            <a href="mailto:support@tryratio.io" className={styles.link}>
              support@tryratio.io
            </a>
            {" / "}
            <a href="mailto:info@tidalpeaklabs.com" className={styles.link}>
              info@tidalpeaklabs.com
            </a>
          </p>
          <p>
            Website:{" "}
            <a href="https://tryratio.io" className={styles.link}>
              tryratio.io
            </a>
          </p>
        </div>
        <div className={styles.infoBox}>
          <p>
            <strong>Grievance Officer</strong>
          </p>
          <p>
            Abdul Ahadh, Director and Co-founder, Ratio (TidalPeak Labs Private
            Ltd.)
          </p>
          <p>
            Email:{" "}
            <a href="mailto:support@tryratio.io" className={styles.link}>
              support@tryratio.io
            </a>
            {" / "}
            <a href="mailto:info@tidalpeaklabs.com" className={styles.link}>
              info@tidalpeaklabs.com
            </a>
          </p>
          <p>
            Address: Collab Space, Near Babai Tiffins, 19th Main Rd, 4th
            Sector, HSR Layout, Bengaluru, Karnataka 560102
          </p>
          <p className={styles.infoNote}>
            Any grievance or complaint will be acknowledged within 30 days of
            receipt and resolved within 30 days of acknowledgment, in
            accordance with Rule 5(9) of the Information Technology (Reasonable
            Security Practices and Procedures and Sensitive Personal Data or
            Information) Rules, 2011.
          </p>
        </div>
      </section>
    </LegalPage>
  );
}
