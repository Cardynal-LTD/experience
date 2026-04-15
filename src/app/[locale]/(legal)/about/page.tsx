import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>About Cardynal</h1>
      <p className="text-muted-foreground">Last updated: April 2026</p>

      <h2>Our Mission</h2>
      <p>
        Cardynal is dedicated to transforming how businesses manage customer conversations and support operations. We believe that the combination of intelligent automation and human expertise creates the best customer experience.
      </p>

      <h2>Who We Are</h2>
      <p>
        Founded with a vision to simplify complex customer support workflows, Cardynal develops cutting-edge AI-powered solutions that help teams work smarter. Our platform enables businesses of all sizes to scale their customer service operations without losing the personal touch that customers value.
      </p>

      <h2>Our Values</h2>
      <ul>
        <li><strong>Customer-Centric:</strong> We prioritize our customers' needs and build solutions that deliver real value.</li>
        <li><strong>Innovation:</strong> We continuously advance our technology to stay at the forefront of AI and customer service.</li>
        <li><strong>Transparency:</strong> We believe in honest communication about how our AI works and its limitations.</li>
        <li><strong>Responsibility:</strong> We develop AI ethically and consider the impact of our technology on users and society.</li>
        <li><strong>Excellence:</strong> We maintain high standards in our product, service, and support.</li>
      </ul>

      <h2>Our Team</h2>
      <p>
        Our team is composed of experienced professionals from customer service, artificial intelligence, and software development. Together, we are committed to building the future of customer support.
      </p>

      <h2>Contact Us</h2>
      <p>
        Have questions? We'd love to hear from you.
      </p>
      <p>
        <strong>DASA DOR LTD</strong> (trading as Cardynal.io)<br />
        Ben Gavriel 7, Jerusalem 93546, Israel<br />
        Email: <a href="mailto:privacy@cardynal.io">privacy@cardynal.io</a>
      </p>
    </article>
  );
}
