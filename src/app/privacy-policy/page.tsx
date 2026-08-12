import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "TopServ Digital's privacy policy.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-20 md:pt-28">
        <p className="label-mono text-brand">Legal</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Effective Date: [sept 24 , 2025</p>
        <div className="prose prose-invert mt-10 max-w-none">
          <p>
            Welcome to <strong>TopServ Digital</strong> (“Company,” “we,” “our,” “us”). By accessing
            or using our website, <strong>topservdigital.com</strong> (the “Site”), you (“User,”
            “you”) agree to this Privacy Policy and our Terms of Use. Please read this carefully to
            understand how we collect, use, and protect your information.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect:</p>
          <ul>
            <li>
              <strong>Personal Information</strong>: Submitted by you via forms or contact methods
              (for example: name, email address, phone number).
            </li>
            <li>
              <strong>Usage Data</strong>: Automatically collected when you visit our Site (IP
              address, browser type, device information, pages viewed, duration of visit).
            </li>
            <li>
              <strong>Cookies &amp; Tracking Technologies</strong>: We use cookies and similar
              technologies to improve user experience, analyze trends, and monitor site usage.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Provide, maintain, and improve our Services.</li>
            <li>Respond to your inquiries or requests.</li>
            <li>Send you updates, promotional materials, or offers (you can opt out).</li>
            <li>Enhance site security and prevent abuse or fraud.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h2>3. Sharing of Information</h2>
          <p>
            We do <strong>not</strong> sell or rent your personal information. We may share data
            with:
          </p>
          <ul>
            <li>
              <strong>Service Providers</strong>: Those assisting with site operations and service
              delivery.
            </li>
            <li>
              <strong>Legal Authorities</strong>: If required by law, subpoena, or to protect
              rights, property, or safety.
            </li>
            <li>
              <strong>Business Transactions</strong>: If TopServ Digital is involved in a merger,
              acquisition, or asset sale, your data may be transferred as part of that transaction.
            </li>
          </ul>

          <h2>4. Use of the Website</h2>
          <p>You agree to use the Site for lawful purposes only.</p>
          <p>
            <strong>Acceptable Uses</strong> include:
          </p>
          <ul>
            <li>Browsing our Services and related content.</li>
            <li>Submitting legitimate inquiries via contact forms or provided contact methods.</li>
          </ul>
          <p>
            <strong>Prohibited Uses</strong> include:
          </p>
          <ul>
            <li>Spamming or sending unsolicited messages.</li>
            <li>Scraping, harvesting, or mining data without permission.</li>
            <li>Uploading malware or engaging in any malicious activity.</li>
            <li>Attempting any unauthorized access to the Site or its systems.</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <ul>
            <li>
              All content on this Site (logos, branding, images, graphics, text, videos, etc.) is
              owned by <strong>TopServ Digital</strong> or under valid license, and is protected
              under applicable intellectual property laws.
            </li>
            <li>
              You may not copy, reproduce, distribute, publish, create derivative works, or
              otherwise use any content without our prior written permission, except for personal,
              non-commercial informational use related to learning about our Services.
            </li>
          </ul>

          <h2>6. Data Security</h2>
          <p>
            We seek to protect your information using reasonable administrative, technical, and
            physical safeguards. However, no system is absolutely secure, and we cannot guarantee
            100% security.
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            The Site may link to third-party websites. We are not responsible for their privacy
            practices or content. Visiting third-party links is at your own risk.
          </p>

          <h2>8. Children’s Privacy</h2>
          <p>
            Our Services are not directed to children under 13. We do not knowingly collect
            personal data from children under 13. If we become aware of such data being collected,
            we will take steps to delete it.
          </p>

          <h2>9. Your Choices</h2>
          <p>You may:</p>
          <ul>
            <li>Opt out of marketing communications.</li>
            <li>Disable cookies via your browser settings (note: may affect functionality).</li>
          </ul>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this policy periodically. Any changes will be posted here with a revised
            effective date. Continued use of the Site after updates means you accept the revised
            policy.
          </p>

          <h2>11. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us:</p>
          <p>
            <strong>TopServ Digital</strong>
          </p>
          <p>15222 King Road, Unit 403</p>
          <p>Frisco, Texas</p>
          <p>
            Email: <strong>info@topservdigital.com</strong>
          </p>
          <p>
            Phone: <strong>214-429-4245</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
