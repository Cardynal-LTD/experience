export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Cardynal",
  description:
    "AI customer operations platform — agents, workflows, omnichannel inbox, ticketing, and knowledge base, unified.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://cardynal.io",
  keywords: [
    "AI customer support",
    "AI customer operations",
    "AI helpdesk",
    "WhatsApp customer service",
    "omnichannel inbox",
    "customer service automation",
    "AI support platform",
    "support agency platform",
  ],
  links: {
    email: "support@cardynal.io",
    twitter: "https://twitter.com/cardynalai",
    linkedin: "https://linkedin.com/company/cardynal",
  },
};

export type SiteConfig = typeof siteConfig;
