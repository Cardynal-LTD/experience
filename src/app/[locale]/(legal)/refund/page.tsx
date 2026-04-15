import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
};

export default function RefundPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Refund Policy</h1>
      <p className="text-muted-foreground">Last updated: April 2026</p>

      <h2>1. Free Trial</h2>
      <p>
        Cardynal offers a 14-day free trial on all plans. During the trial period, you have full access to the features included in your selected plan. No payment is required to start a trial, and you will not be charged if you cancel before the trial ends.
      </p>

      <h2>2. Subscription Billing</h2>
      <p>
        After your free trial, your subscription will begin and you will be billed according to the plan and billing cycle (monthly or annual) you selected. Subscriptions automatically renew at the end of each billing period unless cancelled prior to the renewal date.
      </p>

      <h2>3. Cancellation</h2>
      <p>
        You may cancel your subscription at any time from your account settings or by contacting our support team. Upon cancellation:
      </p>
      <ul>
        <li>Your access to the Service will continue until the end of your current billing period.</li>
        <li>No further charges will be made after cancellation takes effect.</li>
        <li>You will not receive a prorated refund for the remaining days in the current billing period.</li>
      </ul>

      <h2>4. Refund Eligibility</h2>
      <h3>4.1 Monthly Subscriptions</h3>
      <p>
        Monthly subscriptions are eligible for a full refund if a refund request is submitted within 7 days of the initial charge (first payment after trial) or within 7 days of an unexpected renewal charge. After this 7-day window, monthly charges are non-refundable.
      </p>

      <h3>4.2 Annual Subscriptions</h3>
      <p>
        Annual subscriptions are eligible for a full refund if a refund request is submitted within 14 days of the initial charge or renewal. After the 14-day window, annual charges are non-refundable. If you experience a significant service issue, we may offer a prorated refund or credit at our discretion.
      </p>

      <h3>4.3 Upgrades and Downgrades</h3>
      <p>
        When upgrading your plan, you will be charged the prorated difference for the remainder of your billing period. Downgrades take effect at the start of your next billing cycle. No refund is issued for the difference when downgrading.
      </p>

      <h2>5. How to Request a Refund</h2>
      <p>
        To request a refund, please contact our support team with the following information:
      </p>
      <ul>
        <li>Your account email address</li>
        <li>The date of the charge</li>
        <li>The reason for your refund request</li>
      </ul>
      <p>
        We will review your request and respond within 5 business days. Approved refunds are processed to the original payment method and may take 5-10 business days to appear on your statement.
      </p>

      <h2>6. Exceptions</h2>
      <p>
        Refunds will not be issued in the following cases:
      </p>
      <ul>
        <li>Violation of our Terms of Service leading to account suspension or termination</li>
        <li>Failure to cancel before an automatic renewal (outside the refund window)</li>
        <li>Dissatisfaction with features clearly described in the plan details at the time of purchase</li>
      </ul>

      <h2>7. Service Credits</h2>
      <p>
        In cases of extended service outages or degraded performance exceeding our SLA commitments (Enterprise plan), we may issue service credits to your account. Service credits are applied to future billing and are non-transferable and non-redeemable for cash.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We reserve the right to modify this Refund Policy at any time. Changes will be posted on this page with an updated "Last updated" date. Continued use of the Service after changes constitutes acceptance of the revised policy.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have questions about this Refund Policy or need assistance, please contact us at:
      </p>
      <p>
        <strong>DASA DOR LTD</strong> (trading as Cardynal.io)<br />
        Ben Gavriel 7, Jerusalem 93546, Israel<br />
        Email: <a href="mailto:privacy@cardynal.io">privacy@cardynal.io</a>
      </p>
    </article>
  );
}
