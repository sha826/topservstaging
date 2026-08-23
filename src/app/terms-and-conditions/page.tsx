import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "TopServ Digital's terms and conditions.",
  alternates: { canonical: "/terms-and-conditions" },
  robots: { index: true, follow: true },
};

export default function TermsAndConditionsPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-20 md:pt-28">
        <p className="label-mono text-brand">Legal</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Terms &amp; Conditions</h1>
        <p className="mt-3 text-sm text-muted-foreground">Effective Date: September 24, 2025</p>
        <div className="prose prose-invert mt-10 max-w-none">
          <h2>Terms of Use</h2>
          <p>
            Welcome to <strong>TopServ Digital</strong> (“Company,” “we,” “our,” “us”). By
            accessing or using <strong>topservdigital.com</strong> (the “Site”) and our related
            services (collectively, the “Services”), you (“User,” “you”) agree to be bound by these
            Terms of Use and the Privacy Policy. If you do not agree, please do not use our Site.
          </p>

          <h2>1. Definitions</h2>
          <ul>
            <li>
              <strong>Company</strong>: TopServ Digital
            </li>
            <li>
              <strong>User</strong>: Any individual or entity accessing or using the Site or
              Services
            </li>
            <li>
              <strong>Services</strong>: Digital marketing, video marketing, paid advertising, SEO,
              web development, social media marketing, and related services offered through or via
              the Site
            </li>
          </ul>

          <h2>2. Use of the Website</h2>
          <p>
            You agree to use the Site only for lawful, permitted purposes in accordance with these
            Terms.
          </p>
          <p>
            <strong>Acceptable Uses:</strong>
          </p>
          <ul>
            <li>Browsing content to learn about our Services.</li>
            <li>Contacting us via the Site’s contact forms, email, or phone for valid inquiries.</li>
          </ul>
          <p>
            <strong>Prohibited Uses:</strong>
          </p>
          <ul>
            <li>Engaging in spam or unsolicited communications.</li>
            <li>Data scraping, harvesting, or unauthorized data collection.</li>
            <li>Uploading or distributing virus, malware, or harmful code.</li>
            <li>Attempts to gain unauthorized access to systems, networks, or servers.</li>
            <li>Interfering with Site operations or impairing its security.</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <ul>
            <li>
              All content on the Site (including but not limited to text, graphics, logos, videos,
              audio, design, trademarks) is owned by TopServ Digital or licensed to us.
            </li>
            <li>
              You may not copy, reproduce, distribute, alter, transmit, or create derivative works
              without our express written consent.
            </li>
            <li>
              Limited permission is granted for you to view, download, or print materials for
              personal, non-commercial informational use about our Services.
            </li>
          </ul>

          <h2>4. Disclaimer of Warranties</h2>
          <p>
            The Site is provided “as-is” and “as-available.” We do not guarantee that the Site will
            be uninterrupted or error-free. We disclaim all warranties to the maximum extent
            permitted by law.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            To the maximum extent allowed by law, TopServ Digital will NOT be liable for any
            direct, indirect, incidental, consequential, special, or punitive damages arising out
            of or related to your use of the Site or Services.
          </p>

          <h2>6. Third-Party Links</h2>
          <p>
            Site may contain links to third-party sites or services. We are not responsible for
            their content or practices. Your use of such third-party links is at your own risk.
          </p>

          <h2>7. Termination of Use</h2>
          <p>
            We reserve the right, without notice, to suspend or terminate access to the Site or
            Services if you violate these Terms or for any other reason at our discretion.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed according to the laws of the State of
            Texas. Any dispute arising under these Terms shall be resolved in the state or federal
            courts located in or serving Frisco, Texas, unless otherwise required by applicable
            law.
          </p>

          <h2>9. Changes to These Terms</h2>
          <p>
            We may revise these Terms of Use from time to time. Changes will be posted with a
            revised effective date. Continued use after changes means you accept the updated Terms.
          </p>

          <h2>10. Contact Us</h2>
          <p>If you have questions about these Terms of Use, please contact us:</p>
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
