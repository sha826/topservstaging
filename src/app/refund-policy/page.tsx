import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "TopServ Digital's refund policy.",
  alternates: { canonical: "/refund-policy" },
  robots: { index: true, follow: true },
};

export default function RefundPolicyPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-20 md:pt-28">
        <p className="label-mono text-brand">Legal</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Refund Policy</h1>
        <div className="prose prose-invert mt-10 max-w-none">
          <h2>CANCELLATION POLICY</h2>
          <p>
            At TopServ Digital, our services are provided on a subscription or ongoing contractual
            basis. All cancellations require a minimum 30-day written notice. Notice must be
            submitted through email or postal mail and must clearly specify your intention to
            discontinue service.
          </p>
          <p>
            Once your cancellation request is received, your account will continue to be serviced
            for the remainder of your 30-day notice period. You will be responsible for any fees or
            charges incurred during this notice period. Any final charges will be processed in
            accordance with your regular billing schedule.
          </p>

          <h2>REFUND POLICY</h2>
          <p>
            TopServ Digital provides digital marketing and related services, which by nature are
            intangible, customized, and not returnable. Consequently, all sales and payments are
            considered final, and TopServ Digital does not provide refunds for:
          </p>
          <ul>
            <li>Services already delivered or currently underway.</li>
            <li>Subscription fees billed at the start of each service period.</li>
            <li>Any customized or tailored marketing plans, campaigns, or consultations.</li>
          </ul>
          <p>
            In exceptional cases—such as verifiable billing mistakes or service delivery issues
            explicitly documented by both parties—customers may request a refund or account credit.
            These requests must be submitted in writing within 15 days of the billing cycle in
            question. All requests will undergo a thorough review.
          </p>
          <p>
            TopServ Digital reserves the right to approve or deny refund requests entirely at its
            own discretion. In cases where refunds or credits are granted, they will be processed
            within 10-14 business days from the date of approval.
          </p>

          <h2>Chargebacks</h2>
          <p>
            By agreeing to these terms, you explicitly agree not to initiate chargebacks through
            your financial institution without first attempting to resolve any disputes directly
            with TopServ Digital. Initiating a chargeback without first contacting us may result in
            immediate suspension or termination of services, as well as potential legal action to
            recover fees or charges associated with such chargebacks.
          </p>

          <h2>Acceptance of Terms</h2>
          <p>
            By processing payments with TopServ Digital, you acknowledge your understanding,
            acceptance, and agreement to this Cancellation and Refund Policy. We encourage all
            clients to carefully review these policies before initiating service with us.
          </p>

          <h2>UPDATES</h2>
          <p>
            Our privacy policy statement and practices may be updated anytime to comply with
            regulatory requirements and changes in applicable laws, adapt to new protocols, and
            align with the industry’s best practices and business purposes.
          </p>
          <p>Please feel free to contact us if you think we’re not abiding by our privacy policy.</p>
        </div>
      </div>
    </section>
  );
}
