// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  guidesSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/quickstart',
        'getting-started/connect-channels',
        'getting-started/train-your-ai',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/inbox',
        'guides/ai-agent',
        'guides/tickets',
        'guides/knowledge-base',
        'guides/workflows',
        'guides/analytics',
        'guides/team-management',
      ],
    },
    {
      type: 'category',
      label: 'Channels',
      items: [
        'channels/web-chat',
        'channels/whatsapp',
        'channels/email',
        'channels/instagram',
        'channels/messenger',
      ],
    },
    {
      type: 'category',
      label: 'White-label',
      items: [
        'white-label/overview',
        'white-label/branding',
        'white-label/custom-domain',
      ],
    },
  ],
};

export default sidebars;
