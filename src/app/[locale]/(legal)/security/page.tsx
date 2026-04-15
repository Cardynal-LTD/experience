import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
};

export default function SecurityPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Security</h1>
      <p className="text-muted-foreground">Last updated: April 2026</p>

      <h2>Our Security Commitment</h2>
      <p>
        Cardynal takes the security of your data seriously. We implement comprehensive security measures to protect against unauthorized access, data breaches, and other threats. This page outlines our security practices and commitments.
      </p>

      <h2>1. Encryption</h2>
      <h3>1.1 Data in Transit</h3>
      <p>
        All data transmitted between your devices and our servers is encrypted using:
      </p>
      <ul>
        <li>TLS/SSL encryption (minimum TLS 1.2)</li>
        <li>HTTPS for all web communications</li>
        <li>Encrypted connections for all APIs</li>
      </ul>

      <h3>1.2 Data at Rest</h3>
      <p>
        Your data stored on our servers is encrypted using:
      </p>
      <ul>
        <li>AES-256 encryption for sensitive information</li>
        <li>Secure key management practices</li>
        <li>Encrypted database backups</li>
      </ul>

      <h2>2. Infrastructure Security</h2>
      <h3>2.1 Cloud Infrastructure</h3>
      <p>
        Cardynal runs on secure, enterprise-grade cloud infrastructure:
      </p>
      <ul>
        <li>Hosted on certified data centers with SOC 2 compliance</li>
        <li>Distributed across multiple availability zones for redundancy</li>
        <li>Automatic failover and disaster recovery</li>
        <li>Regular infrastructure security audits</li>
      </ul>

      <h3>2.2 Network Security</h3>
      <p>
        Our network is protected by:
      </p>
      <ul>
        <li>Firewalls and intrusion detection systems</li>
        <li>DDoS protection and mitigation</li>
        <li>Virtual private networks (VPNs) for internal communications</li>
        <li>Regular penetration testing</li>
      </ul>

      <h2>3. Access Control</h2>
      <h3>3.1 Authentication</h3>
      <p>
        We implement strong authentication:
      </p>
      <ul>
        <li>Multi-factor authentication (MFA) available for accounts</li>
        <li>Strong password requirements</li>
        <li>JWT-based session management</li>
        <li>Automatic session timeout</li>
      </ul>

      <h3>3.2 Authorization</h3>
      <p>
        Access to data and systems is controlled through:
      </p>
      <ul>
        <li>Role-based access control (RBAC)</li>
        <li>Principle of least privilege</li>
        <li>Regular access reviews and audits</li>
        <li>Separation of duties</li>
      </ul>

      <h2>4. Data Protection</h2>
      <h3>4.1 User Data</h3>
      <p>
        We protect your data through:
      </p>
      <ul>
        <li>Limited data collection and retention</li>
        <li>Anonymization of unnecessary personal information</li>
        <li>Secure deletion of data when no longer needed</li>
        <li>Regular data protection impact assessments</li>
      </ul>

      <h3>4.2 Backup and Recovery</h3>
      <p>
        We maintain secure backups:
      </p>
      <ul>
        <li>Regular automated backups of critical data</li>
        <li>Encrypted backup storage</li>
        <li>Tested recovery procedures</li>
        <li>Off-site backup locations</li>
      </ul>

      <h2>5. Application Security</h2>
      <h3>5.1 Development Practices</h3>
      <p>
        Our development process includes:
      </p>
      <ul>
        <li>Secure coding practices and guidelines</li>
        <li>Code reviews and security testing</li>
        <li>Static and dynamic analysis tools</li>
        <li>Dependency scanning for vulnerabilities</li>
      </ul>

      <h3>5.2 Vulnerability Management</h3>
      <p>
        We actively manage vulnerabilities:
      </p>
      <ul>
        <li>Regular security scanning of applications and infrastructure</li>
        <li>Prompt patching of identified vulnerabilities</li>
        <li>Security advisories and incident communication</li>
        <li>Responsible disclosure program</li>
      </ul>

      <h2>6. Compliance</h2>
      <h3>6.1 Standards and Certifications</h3>
      <p>
        Cardynal complies with:
      </p>
      <ul>
        <li>SOC 2 Type II compliance</li>
        <li>GDPR (General Data Protection Regulation)</li>
        <li>CCPA (California Consumer Privacy Act)</li>
        <li>Industry-specific regulations</li>
      </ul>

      <h3>6.2 Audits and Assessments</h3>
      <p>
        We conduct regular:
      </p>
      <ul>
        <li>Third-party security audits</li>
        <li>Vulnerability assessments</li>
        <li>Penetration testing</li>
        <li>Compliance audits</li>
      </ul>

      <h2>7. Incident Response</h2>
      <h3>7.1 Detection and Response</h3>
      <p>
        We maintain a comprehensive incident response program:
      </p>
      <ul>
        <li>24/7 monitoring for security incidents</li>
        <li>Rapid incident response procedures</li>
        <li>Forensic analysis capabilities</li>
        <li>Clear escalation procedures</li>
      </ul>

      <h3>7.2 Notification and Communication</h3>
      <p>
        In the event of a data breach:
      </p>
      <ul>
        <li>We will notify affected users promptly</li>
        <li>We will provide details about the incident</li>
        <li>We will offer guidance on protective measures</li>
        <li>We will cooperate with regulatory authorities</li>
      </ul>

      <h2>8. Employee Security</h2>
      <p>
        Our team members are trained and vetted:
      </p>
      <ul>
        <li>Background checks for employees with data access</li>
        <li>Security awareness training</li>
        <li>Confidentiality agreements and NDAs</li>
        <li>Limited access to sensitive data</li>
      </ul>

      <h2>9. Third-Party Security</h2>
      <p>
        We carefully vet our service providers:
      </p>
      <ul>
        <li>Security assessments of vendors</li>
        <li>Data protection agreements in place</li>
        <li>Regular audits of third-party compliance</li>
        <li>Contractual security requirements</li>
      </ul>

      <h2>10. Security for Developers</h2>
      <h3>10.1 API Security</h3>
      <p>
        Our APIs are secured with:
      </p>
      <ul>
        <li>API key authentication</li>
        <li>Rate limiting to prevent abuse</li>
        <li>Request validation and sanitization</li>
        <li>CORS policy enforcement</li>
      </ul>

      <h3>10.2 Integration Security</h3>
      <p>
        When integrating with our platform:
      </p>
      <ul>
        <li>Use HTTPS for all communications</li>
        <li>Validate SSL certificates</li>
        <li>Implement proper error handling</li>
        <li>Secure storage of API keys</li>
      </ul>

      <h2>11. Responsible Disclosure</h2>
      <p>
        If you discover a security vulnerability, please report it responsibly:
      </p>
      <ul>
        <li>Email <a href="mailto:security@cardynal.io">security@cardynal.io</a> with details</li>
        <li>Do not publicly disclose the vulnerability until we've had time to address it</li>
        <li>Allow us 90 days to patch and release a fix</li>
        <li>We appreciate your responsible disclosure</li>
      </ul>

      <h2>12. Future Security Enhancements</h2>
      <p>
        We continuously improve our security posture through:
      </p>
      <ul>
        <li>Adoption of emerging security technologies</li>
        <li>Enhanced monitoring and detection capabilities</li>
        <li>Advanced encryption methods</li>
        <li>Regular security training and awareness</li>
      </ul>

      <h2>Contact and Questions</h2>
      <p>
        For security-related inquiries or to report vulnerabilities, contact us at:
      </p>
      <p>
        <strong>DASA DOR LTD</strong> (trading as Cardynal.io)<br />
        Ben Gavriel 7, Jerusalem 93546, Israel<br />
        Security: <a href="mailto:security@cardynal.io">security@cardynal.io</a><br />
        General: <a href="mailto:privacy@cardynal.io">privacy@cardynal.io</a>
      </p>
    </article>
  );
}
