import { Icons } from "@/components/icons";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Cardynal",
  description: "AI support agent for WhatsApp, web, and email",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://cardynal.io",
  keywords: [
    "AI",
    "Customer Support",
    "WhatsApp",
    "Chatbot",
    "Hebrew",
    "Multilingual",
  ],
  links: {
    email: "support@cardynal.io",
    twitter: "https://twitter.com/cardynalai",
    linkedin: "https://linkedin.com/company/cardynal",
  },
  header: [
    {
      trigger: "Features",
      content: {
        main: {
          icon: <Icons.logo className="h-6 w-6" />,
          title: "AI Support Agent",
          description:
            "Resolve customer conversations automatically, 24/7.",
          href: "#features",
        },
        items: [
          {
            href: "#features",
            title: "AI Agent",
            description:
              "Detects intent, finds answers, handles conversations end-to-end.",
          },
          {
            href: "#features",
            title: "Omnichannel Inbox",
            description:
              "WhatsApp, web, email, Instagram — all in one place.",
          },
          {
            href: "#features",
            title: "Knowledge Base",
            description:
              "Upload your docs, the AI retrieves the right answer via RAG.",
          },
        ],
      },
    },
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "E-commerce",
            href: "#",
            description:
              "Order tracking, returns, product questions — handled automatically.",
          },
          {
            title: "SaaS & Tech",
            href: "#",
            description:
              "Onboarding, billing, technical support — resolved 24/7.",
          },
          {
            title: "Services",
            href: "#",
            description:
              "Appointment booking, availability, FAQs — on autopilot.",
          },
          {
            title: "Healthcare",
            href: "#",
            description:
              "Patient inquiries, scheduling, and follow-ups — in their language.",
          },
          {
            title: "Real Estate",
            href: "#",
            description:
              "Property inquiries, visit scheduling, and lead qualification.",
          },
          {
            title: "Enterprise",
            href: "#",
            description:
              "Custom integrations, SLA guarantees, dedicated support.",
          },
        ],
      },
    },
    {
      href: "#pricing",
      label: "Pricing",
    },
    {
      href: "/blog",
      label: "Blog",
    },
  ],
  pricing: [
    {
      name: "STARTER",
      href: "#",
      price: "$49",
      period: "month",
      yearlyPrice: "$39",
      features: [
        "500 sessions/month",
        "1 AI agent",
        "2 inboxes",
        "5 knowledge sources",
        "WhatsApp included",
      ],
      description: "Perfect for small businesses getting started",
      buttonText: "Try free for 14 days",
      isPopular: false,
    },
    {
      name: "GROWTH",
      href: "#",
      price: "$149",
      period: "month",
      yearlyPrice: "$119",
      features: [
        "2,000 sessions/month",
        "3 AI agents",
        "5 inboxes",
        "20 knowledge sources",
        "Workflows & automations",
        "API access",
      ],
      description: "Ideal for growing teams with multiple channels",
      buttonText: "Try free for 14 days",
      isPopular: true,
    },
    {
      name: "ENTERPRISE",
      href: "#",
      price: "$399",
      period: "month",
      yearlyPrice: "$329",
      features: [
        "Unlimited sessions",
        "Unlimited AI agents",
        "Unlimited inboxes",
        "Custom integrations",
        "Custom LLM",
        "SLA guarantee",
        "Priority support",
      ],
      description: "For large-scale operations with custom needs",
      buttonText: "Contact us",
      isPopular: false,
    },
  ],
  faqs: [
    {
      question: "What is Cardynal exactly?",
      answer: (
        <span>
          Cardynal is an AI support agent that handles customer conversations on
          WhatsApp, web, and email. It understands what your customer needs,
          finds the answer in your docs, and resolves the issue — automatically.
        </span>
      ),
    },
    {
      question: "How fast can I set it up?",
      answer: (
        <span>
          Under 5 minutes. Connect WhatsApp, upload your docs, and your agent is
          live. No code, no developer needed. We offer assisted onboarding if
          you want help.
        </span>
      ),
    },
    {
      question: "What happens when the AI can't answer?",
      answer: (
        <span>
          It escalates to a human. You get a notification and take over the
          conversation in the same inbox. The customer sees no interruption.
        </span>
      ),
    },
    {
      question: "Does it really work in Hebrew?",
      answer: (
        <span>
          Yes. Native Hebrew with proper RTL support — not machine translation.
          Same quality in English and French. Your customers get natural, fluent
          responses in their language.
        </span>
      ),
    },
    {
      question: "What channels are supported?",
      answer: (
        <span>
          WhatsApp (Meta Cloud API or QR code), web chat widget, email,
          Instagram, Telegram, and API. All channels included in every plan — no
          per-message fees.
        </span>
      ),
    },
    {
      question: "How does pricing work?",
      answer: (
        <span>
          Flat monthly fee based on your plan. No per-message charges, no
          per-resolution fees. Start with a 14-day free trial, then pay monthly.
          Cancel anytime.
        </span>
      ),
    },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { href: "#features", text: "Features", icon: null },
        { href: "#pricing", text: "Pricing", icon: null },
        { href: "#how-it-works", text: "How It Works", icon: null },
        { href: "#faq", text: "FAQ", icon: null },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", text: "Our Story", icon: null },
        { href: "/blog", text: "Blog", icon: null },
        { href: "mailto:support@cardynal.io", text: "Contact", icon: null },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy", text: "Privacy Policy", icon: null },
        { href: "/terms", text: "Terms of Service", icon: null },
        { href: "/ai-transparency", text: "AI Transparency", icon: null },
        { href: "/security", text: "Security", icon: null },
        { href: "/refund", text: "Refund Policy", icon: null },
      ],
    },
    {
      title: "Social",
      links: [
        {
          href: "https://twitter.com/cardynalai",
          text: "Twitter",
          icon: <FaTwitter />,
        },
        {
          href: "https://linkedin.com/company/cardynal",
          text: "LinkedIn",
          icon: <FaLinkedin />,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
