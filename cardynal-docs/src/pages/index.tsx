import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

type Post = {
  to: string;
  tag: string;
  title: string;
  excerpt: string;
  icon: string;
};

const FEATURED: Post = {
  to: '/getting-started/quickstart',
  tag: 'Getting Started',
  title: 'Launch your AI support workspace in five steps',
  excerpt:
    'A guided walk-through that takes you from signup to a live AI agent answering customer questions on your website.',
  icon: '🚀',
};

const GETTING_STARTED: Post[] = [
  {
    to: '/getting-started/connect-channels',
    tag: 'Getting Started',
    title: 'Connect every channel your customers use',
    excerpt:
      'Web chat, WhatsApp, Gmail, Instagram, Messenger — bring every conversation into a single inbox.',
    icon: '🔌',
  },
  {
    to: '/getting-started/train-your-ai',
    tag: 'Getting Started',
    title: 'Train your AI on your own knowledge',
    excerpt:
      'Upload documents, crawl your help center, or paste content directly so your agent answers with your voice.',
    icon: '📚',
  },
];

const GUIDES: Post[] = [
  {
    to: '/guides/inbox',
    tag: 'Guides',
    title: 'Run a calm, organized support inbox',
    excerpt:
      'Triage incoming conversations, assign teammates, and collaborate in real time.',
    icon: '📥',
  },
  {
    to: '/guides/ai-agent',
    tag: 'Guides',
    title: 'Build a thoughtful AI agent',
    excerpt:
      'Design playbooks, connect tools, set escalation rules, and ship an assistant your customers actually like.',
    icon: '🤖',
  },
  {
    to: '/guides/tickets',
    tag: 'Guides',
    title: 'Track every issue with the ticketing system',
    excerpt:
      'Custom ticket types, SLAs, priorities, and a full audit trail tied back to conversations.',
    icon: '🎫',
  },
  {
    to: '/guides/knowledge-base',
    tag: 'Guides',
    title: 'Curate a knowledge base your team trusts',
    excerpt:
      'Organize sources into folders, scope access per agent, and keep content fresh on a schedule.',
    icon: '🧠',
  },
  {
    to: '/guides/workflows',
    tag: 'Guides',
    title: 'Automate the busywork with workflows',
    excerpt:
      'Drag-and-drop visual flows triggered by events, schedules, or webhooks — no glue code required.',
    icon: '⚙️',
  },
  {
    to: '/guides/analytics',
    tag: 'Guides',
    title: 'Measure what matters with analytics',
    excerpt:
      'Sessions, resolution rate, response times, ticket throughput, and team performance in one place.',
    icon: '📊',
  },
];

const CHANNELS: Post[] = [
  {
    to: '/channels/web-chat',
    tag: 'Channel',
    title: 'Embed the web chat widget',
    excerpt:
      'Drop a single script on your site to start handling conversations from visitors instantly.',
    icon: '💬',
  },
  {
    to: '/channels/whatsapp',
    tag: 'Channel',
    title: 'WhatsApp for support at scale',
    excerpt:
      'Connect a personal number via QR or go official with the WhatsApp Business API.',
    icon: '📱',
  },
  {
    to: '/channels/email',
    tag: 'Channel',
    title: 'Bring Gmail conversations into the inbox',
    excerpt:
      'OAuth into Gmail and treat email threads like every other channel — assigned, tracked, automated.',
    icon: '✉️',
  },
];

const WHITE_LABEL: Post[] = [
  {
    to: '/white-label/overview',
    tag: 'White-label',
    title: 'Make Cardynal your own',
    excerpt:
      'Ship Cardynal under your brand — overview of what white-labeling unlocks for resellers and platforms.',
    icon: '🎨',
  },
  {
    to: '/white-label/branding',
    tag: 'White-label',
    title: 'Customize branding end to end',
    excerpt:
      'Logo, colors, typography, emails, and the dashboard — every touchpoint in your identity.',
    icon: '🖌️',
  },
  {
    to: '/white-label/custom-domain',
    tag: 'White-label',
    title: 'Serve Cardynal on your own domain',
    excerpt:
      'Point a custom domain at your workspace with SSL handled for you.',
    icon: '🌐',
  },
];

function PostCard({post}: {post: Post}) {
  return (
    <Link to={post.to} className={styles.card}>
      <div className={styles.cardIcon} aria-hidden="true">
        {post.icon}
      </div>
      <span className={styles.cardTag}>{post.tag}</span>
      <h3 className={styles.cardTitle}>{post.title}</h3>
      <p className={styles.cardExcerpt}>{post.excerpt}</p>
    </Link>
  );
}

function Section({
  title,
  link,
  linkLabel,
  posts,
}: {
  title: string;
  link?: string;
  linkLabel?: string;
  posts: Post[];
}) {
  return (
    <>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {link && (
          <Link to={link} className={styles.sectionLink}>
            {linkLabel ?? 'View all'} →
          </Link>
        )}
      </div>
      <div className={styles.grid}>
        {posts.map((post) => (
          <PostCard key={post.to} post={post} />
        ))}
      </div>
    </>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Cardynal Docs"
      description="Everything you need to launch and run AI customer support with Cardynal — guides, channel setup, and white-label resources.">
      <main className={styles.page}>
        <header className={styles.hero}>
          <span className={styles.heroEyebrow}>The Cardynal Journal</span>
          <h1 className={styles.heroTitle}>
            Build customer support that feels human, runs on its own.
          </h1>
          <p className={styles.heroSubtitle}>
            Practical guides, channel walkthroughs, and product references to help your team ship great support with Cardynal.
          </p>
        </header>

        <div className={styles.feed}>
          <Link to={FEATURED.to} className={styles.featured}>
            <span className={styles.featuredTag}>Featured · {FEATURED.tag}</span>
            <h2 className={styles.featuredTitle}>{FEATURED.title}</h2>
            <p className={styles.featuredExcerpt}>{FEATURED.excerpt}</p>
            <span className={styles.featuredMeta}>Start the quickstart →</span>
          </Link>

          <Section
            title="Getting started"
            link="/getting-started/quickstart"
            linkLabel="All onboarding"
            posts={GETTING_STARTED}
          />
          <Section
            title="Guides"
            link="/guides/inbox"
            linkLabel="All guides"
            posts={GUIDES}
          />
          <Section
            title="Channels"
            link="/channels/web-chat"
            linkLabel="All channels"
            posts={CHANNELS}
          />
          <Section
            title="White-label"
            link="/white-label/overview"
            linkLabel="White-label resources"
            posts={WHITE_LABEL}
          />
        </div>
      </main>
    </Layout>
  );
}
