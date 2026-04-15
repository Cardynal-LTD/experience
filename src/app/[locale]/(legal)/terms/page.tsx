import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: April 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using the website, applications, and services (collectively, "Services") operated by DASA DOR LTD, trading as Cardynal.io ("Cardynal," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of the updated terms.
      </p>

      <h2>2. Services Description</h2>
      <p>
        Cardynal provides AI-powered customer service and communication management solutions. Our Services include, but are not limited to, conversation management tools, automation features, analytics, and support capabilities. Services are provided on an "as-is" basis.
      </p>

      <h2>3. User Accounts and Responsibilities</h2>
      <h3>3.1 Account Creation</h3>
      <p>
        To use certain features of our Services, you must create an account. You agree to:
      </p>
      <ul>
        <li>Provide accurate, current, and complete information</li>
        <li>Maintain the confidentiality of your account credentials</li>
        <li>Accept responsibility for all activities under your account</li>
        <li>Notify us immediately of any unauthorized access</li>
      </ul>

      <h3>3.2 Prohibited Conduct</h3>
      <p>
        You agree not to:
      </p>
      <ul>
        <li>Use our Services for illegal or unauthorized purposes</li>
        <li>Transmit viruses, malware, or harmful code</li>
        <li>Engage in harassment, abuse, or discrimination</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Reverse engineer, decompile, or disassemble our Services</li>
        <li>Remove or obscure any proprietary notices</li>
        <li>Use our Services to harm, threaten, or disparage others</li>
      </ul>

      <h2>4. Intellectual Property Rights</h2>
      <h3>4.1 Cardynal's IP</h3>
      <p>
        All content, features, and functionality of our Services, including text, graphics, logos, images, software, and technology, are the exclusive property of Cardynal or our licensors and are protected by copyright, trademark, and other intellectual property laws.
      </p>

      <h3>4.2 User Content License</h3>
      <p>
        By uploading, submitting, or displaying content on our Services, you grant Cardynal a worldwide, non-exclusive, royalty-free license to use, copy, modify, and distribute your content as necessary to provide our Services and improve our products.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, CARDYNAL SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OUR SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
      </p>
      <p>
        In no event shall Cardynal's total liability exceed the amount you paid for our Services in the past twelve months.
      </p>

      <h2>6. Disclaimer of Warranties</h2>
      <p>
        OUR SERVICES ARE PROVIDED ON AN "AS-IS" AND "AS-AVAILABLE" BASIS. CARDYNAL MAKES NO WARRANTIES, EXPRESS OR IMPLIED, REGARDING OUR SERVICES, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
      </p>
      <p>
        We do not guarantee that our Services will be uninterrupted, error-free, or free from viruses or harmful components.
      </p>

      <h2>7. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless Cardynal and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising from:
      </p>
      <ul>
        <li>Your violation of these Terms of Service</li>
        <li>Your violation of applicable laws or regulations</li>
        <li>Your use of our Services</li>
        <li>Any content you upload or transmit</li>
      </ul>

      <h2>8. Termination</h2>
      <h3>8.1 By You</h3>
      <p>
        You may terminate your account at any time by contacting our support team or through your account settings.
      </p>

      <h3>8.2 By Cardynal</h3>
      <p>
        Cardynal may terminate or suspend your account immediately, without notice, if you:
      </p>
      <ul>
        <li>Violate these Terms of Service</li>
        <li>Engage in illegal activity</li>
        <li>Violate intellectual property rights</li>
        <li>Engage in conduct harmful to Cardynal or other users</li>
      </ul>

      <h2>9. Payment and Billing</h2>
      <p>
        If you use a paid version of our Services, you agree to pay the applicable fees as outlined in your subscription agreement. All payments are non-refundable except as required by law. We reserve the right to change pricing with notice.
      </p>

      <h2>10. Data and Privacy</h2>
      <p>
        Your use of our Services is also governed by our Privacy Policy. Please review it to understand our data practices.
      </p>

      <h2>11. Third-Party Services</h2>
      <p>
        Our Services may integrate with third-party services and platforms. Cardynal is not responsible for the availability, accuracy, or content of these third-party services. Use of third-party services is subject to their terms and conditions.
      </p>

      <h2>12. Governing Law</h2>
      <p>
        These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which Cardynal is incorporated, without regard to its conflict of law provisions.
      </p>

      <h2>13. Dispute Resolution</h2>
      <p>
        Any disputes arising from or related to these Terms of Service or our Services shall be resolved through binding arbitration, except where prohibited by law. You agree to waive your right to a jury trial and class action participation.
      </p>

      <h2>14. Entire Agreement</h2>
      <p>
        These Terms of Service constitute the entire agreement between you and Cardynal regarding the use of our Services and supersede all prior agreements, understandings, and negotiations.
      </p>

      <h2>15. Severability</h2>
      <p>
        If any provision of these Terms of Service is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
      </p>

      <h2>16. Contact Us</h2>
      <p>
        If you have questions about these Terms of Service, please contact us at:
      </p>
      <p>
        <strong>DASA DOR LTD</strong> (trading as Cardynal.io)<br />
        Ben Gavriel 7, Jerusalem 93546, Israel<br />
        Email: <a href="mailto:privacy@cardynal.io">privacy@cardynal.io</a>
      </p>
    </article>
  );
}
