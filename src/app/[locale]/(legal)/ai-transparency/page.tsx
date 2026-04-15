import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Transparency",
};

export default function AITransparencyPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>AI Transparency</h1>
      <p className="text-muted-foreground">Last updated: April 2026</p>

      <h2>Our Commitment to Responsible AI</h2>
      <p>
        At Cardynal, we believe that transparency about how AI works is essential to building trust with our users. This page explains how we develop, deploy, and maintain our AI systems responsibly.
      </p>

      <h2>1. How Our AI Works</h2>
      <h3>1.1 AI-Powered Conversation Management</h3>
      <p>
        Cardynal uses machine learning and natural language processing to:
      </p>
      <ul>
        <li>Understand customer intent and sentiment</li>
        <li>Route conversations to appropriate teams</li>
        <li>Generate suggested responses</li>
        <li>Automate responses to common inquiries</li>
        <li>Provide analytics and insights</li>
      </ul>

      <h3>1.2 Model Training</h3>
      <p>
        Our AI models are trained on a combination of:
      </p>
      <ul>
        <li>Industry-standard datasets</li>
        <li>Anonymized customer conversation data (with consent)</li>
        <li>Publicly available information</li>
      </ul>

      <h2>2. Data Handling and Privacy</h2>
      <h3>2.1 Your Data</h3>
      <p>
        We are committed to protecting your data:
      </p>
      <ul>
        <li>Data is encrypted in transit and at rest</li>
        <li>Access is restricted to authorized personnel</li>
        <li>Data is retained only as long as necessary</li>
        <li>You can request data deletion</li>
      </ul>

      <h3>2.2 Training and Improvement</h3>
      <p>
        We use customer data to improve our models with strict safeguards:
      </p>
      <ul>
        <li>Personally identifiable information (PII) is anonymized</li>
        <li>Sensitive data is excluded from training</li>
        <li>You can opt-out of model training</li>
        <li>All processing complies with applicable privacy laws</li>
      </ul>

      <h2>3. Human Oversight</h2>
      <p>
        We maintain human control and oversight over our AI systems:
      </p>
      <ul>
        <li>AI suggestions are reviewed by humans before implementation</li>
        <li>Critical decisions are escalated to human agents</li>
        <li>Our systems are designed to assist, not replace, human judgment</li>
        <li>Users can override AI recommendations at any time</li>
      </ul>

      <h2>4. Limitations and Bias</h2>
      <h3>4.1 What Our AI Cannot Do</h3>
      <p>
        It's important to understand the limitations of our AI:
      </p>
      <ul>
        <li>AI may misunderstand context or intent</li>
        <li>Generated responses may be imperfect or inappropriate</li>
        <li>AI is not suitable for high-risk decisions without human review</li>
        <li>Performance may vary across different languages and cultures</li>
      </ul>

      <h3>4.2 Bias Mitigation</h3>
      <p>
        We take steps to identify and mitigate bias:
      </p>
      <ul>
        <li>We test our models for fairness across demographic groups</li>
        <li>We conduct regular audits for discriminatory patterns</li>
        <li>We implement safeguards to prevent harmful outputs</li>
        <li>We continuously improve our systems based on feedback</li>
      </ul>

      <h2>5. Safety and Security</h2>
      <p>
        We implement security measures to prevent misuse:
      </p>
      <ul>
        <li>Monitoring systems detect unusual behavior</li>
        <li>Content filters prevent harmful outputs</li>
        <li>User access controls limit data exposure</li>
        <li>Regular security audits test our defenses</li>
      </ul>

      <h2>6. Transparency and Disclosure</h2>
      <p>
        When users interact with our AI, we are transparent about:
      </p>
      <ul>
        <li>When responses are AI-generated vs. human-written</li>
        <li>How decisions were made</li>
        <li>The confidence level of AI predictions</li>
        <li>Available options to review or override AI actions</li>
      </ul>

      <h2>7. Responsible Development</h2>
      <h3>7.1 Ethics Review</h3>
      <p>
        Our AI development process includes:
      </p>
      <ul>
        <li>Ethics review before deployment</li>
        <li>Impact assessment on users and society</li>
        <li>Consideration of unintended consequences</li>
        <li>Engagement with stakeholders</li>
      </ul>

      <h3>7.2 Continuous Improvement</h3>
      <p>
        We are committed to ongoing improvement:
      </p>
      <ul>
        <li>Regular model updates and retraining</li>
        <li>Monitoring of real-world performance</li>
        <li>Integration of user feedback</li>
        <li>Research into responsible AI practices</li>
      </ul>

      <h2>8. Compliance</h2>
      <p>
        Our AI systems are designed to comply with:
      </p>
      <ul>
        <li>Applicable data protection regulations</li>
        <li>Consumer protection laws</li>
        <li>Industry-specific requirements</li>
        <li>Accessibility standards</li>
      </ul>

      <h2>9. User Control</h2>
      <p>
        You have control over how our AI is used:
      </p>
      <ul>
        <li>Enable or disable specific features</li>
        <li>Adjust automation levels</li>
        <li>Review and approve AI suggestions</li>
        <li>Access explanations for AI decisions</li>
      </ul>

      <h2>10. Reporting Concerns</h2>
      <p>
        If you have concerns about our AI systems, please contact us at <a href="mailto:support@cardynal.io">support@cardynal.io</a>. We take all feedback seriously and will investigate potential issues.
      </p>

      <h2>11. Future Developments</h2>
      <p>
        As AI technology evolves, we commit to:
      </p>
      <ul>
        <li>Staying informed about emerging best practices</li>
        <li>Updating our systems as new safeguards become available</li>
        <li>Participating in industry dialogue on responsible AI</li>
        <li>Maintaining transparency with our users</li>
      </ul>

      <h2>Questions?</h2>
      <p>
        For more information about our AI systems or to discuss your concerns, please contact us:
      </p>
      <p>
        <strong>DASA DOR LTD</strong> (trading as Cardynal.io)<br />
        Ben Gavriel 7, Jerusalem 93546, Israel<br />
        Email: <a href="mailto:privacy@cardynal.io">privacy@cardynal.io</a>
      </p>
    </article>
  );
}
