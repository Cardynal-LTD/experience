import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: April 2026</p>

      <h2>1. Introduction</h2>
      <p>
        DASA DOR LTD, trading as Cardynal.io ("Cardynal," "we," "us," "our," or "Company"), is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise process your information in connection with our website, applications, and services (collectively, the "Services").
      </p>

      <h2>2. Information We Collect</h2>
      <h3>2.1 Information You Provide</h3>
      <p>
        We collect information you provide directly, including:
      </p>
      <ul>
        <li>Account registration information (name, email, password)</li>
        <li>Profile information and preferences</li>
        <li>Communication content (emails, messages, support requests)</li>
        <li>Payment information (processed securely through third-party providers)</li>
        <li>Any other information you choose to provide</li>
      </ul>

      <h3>2.2 Information Collected Automatically</h3>
      <p>
        When you use our Services, we automatically collect:
      </p>
      <ul>
        <li>Device and browser information (type, OS, browser version)</li>
        <li>IP address and location data</li>
        <li>Log data (access times, pages viewed, links clicked)</li>
        <li>Usage analytics and interaction data</li>
        <li>Cookies and similar tracking technologies</li>
      </ul>

      <h3>2.3 Information from Third Parties</h3>
      <p>
        We may receive information from third-party services, analytics providers, and social media platforms when you connect your accounts or authorize integration.
      </p>

      <h2>3. How We Use Your Information</h2>
      <p>
        We use the information we collect for:
      </p>
      <ul>
        <li>Providing and maintaining our Services</li>
        <li>Authenticating your account and preventing fraud</li>
        <li>Processing transactions and sending related information</li>
        <li>Sending transactional and marketing communications</li>
        <li>Responding to your inquiries and providing customer support</li>
        <li>Improving and optimizing our Services</li>
        <li>Conducting analytics and user research</li>
        <li>Complying with legal obligations</li>
        <li>Protecting our rights and the safety of our users</li>
      </ul>

      <h2>4. Cookies and Tracking</h2>
      <p>
        We use cookies and similar technologies to enhance your experience, remember your preferences, and understand how you use our Services. You can control cookie settings through your browser, though disabling cookies may limit functionality.
      </p>

      <h2>5. Data Sharing and Disclosure</h2>
      <h3>5.1 Third-Party Service Providers</h3>
      <p>
        We share information with service providers who assist in operating our website and conducting our business, including hosting providers, payment processors, analytics services, and customer support tools.
      </p>

      <h3>5.2 Legal Compliance</h3>
      <p>
        We may disclose your information when required by law or when we believe in good faith that disclosure is necessary to:
      </p>
      <ul>
        <li>Comply with applicable laws or regulations</li>
        <li>Enforce our Terms of Service</li>
        <li>Protect the rights, privacy, safety, or property of Cardynal, our users, or the public</li>
      </ul>

      <h3>5.3 Business Transfers</h3>
      <p>
        If Cardynal is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will provide notice of any such change.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We retain your information for as long as necessary to provide our Services and fulfill the purposes outlined in this Privacy Policy. You may request deletion of your account and associated data, subject to applicable legal requirements.
      </p>

      <h2>7. Your Privacy Rights</h2>
      <p>
        Depending on your location, you may have the following rights:
      </p>
      <ul>
        <li>Right to access your personal information</li>
        <li>Right to correct inaccurate information</li>
        <li>Right to delete your information</li>
        <li>Right to restrict processing</li>
        <li>Right to data portability</li>
        <li>Right to opt-out of marketing communications</li>
      </ul>

      <h2>8. Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is entirely secure.
      </p>

      <h2>9. Third-Party Links</h2>
      <p>
        Our Services may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing your information.
      </p>

      <h2>10. Children's Privacy</h2>
      <p>
        Our Services are not intended for users under 13 years of age. We do not knowingly collect information from children under 13. If we become aware of such collection, we will take steps to delete such information and terminate the child's account.
      </p>

      <h2>11. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on our website and updating the "Last updated" date.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or our privacy practices, please contact us at:
      </p>
      <p>
        <strong>DASA DOR LTD</strong> (trading as Cardynal.io)<br />
        Ben Gavriel 7, Jerusalem 93546, Israel<br />
        Email: <a href="mailto:privacy@cardynal.io">privacy@cardynal.io</a>
      </p>
    </article>
  );
}
