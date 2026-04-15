// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  guidesSidebar: [
    'intro',
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
  apiSidebar: [
    'api/overview',
    {
      type: 'category',
      label: 'Authentication',
      items: [
        'api/authentication',
      ],
    },
    {
      type: 'category',
      label: 'Conversations',
      items: [
        'api/conversations/list',
        'api/conversations/create',
        'api/conversations/messages',
      ],
    },
    {
      type: 'category',
      label: 'Contacts',
      items: [
        'api/contacts/list',
        'api/contacts/create',
        'api/contacts/update',
      ],
    },
    {
      type: 'category',
      label: 'Webhooks',
      items: [
        'api/webhooks/overview',
        'api/webhooks/events',
      ],
    },
  ],
};

export default sidebars;
