// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cardynal Docs',
  tagline: 'Everything you need to integrate and use Cardynal',
  favicon: 'img/logo-cardynal.png',

  future: {
    v4: true,
  },

  url: 'https://cardynal.io',
  baseUrl: '/docs/',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Cardynal',
        logo: {
          alt: 'Cardynal',
          src: 'img/logo-cardynal.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'guidesSidebar',
            position: 'left',
            label: 'Guides',
          },
          {
            href: 'https://cardynal.io',
            label: 'Website',
            position: 'right',
          },
          {
            href: 'https://app.cardynal.io',
            label: 'Dashboard',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              { label: 'Getting Started', to: '/getting-started/quickstart' },
              { label: 'Guides', to: '/guides/inbox' },
              { label: 'Channels', to: '/channels/web-chat' },
            ],
          },
          {
            title: 'Product',
            items: [
              { label: 'Website', href: 'https://cardynal.io' },
              { label: 'Dashboard', href: 'https://app.cardynal.io' },
              { label: 'Status', href: 'https://status.cardynal.io' },
            ],
          },
          {
            title: 'Legal',
            items: [
              { label: 'Privacy Policy', href: 'https://cardynal.io/privacy' },
              { label: 'Terms of Service', href: 'https://cardynal.io/terms' },
              { label: 'Security', href: 'https://cardynal.io/security' },
            ],
          },
        ],
        copyright: `Copyright ${new Date().getFullYear()} DASA DOR LTD. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'typescript'],
      },
    }),
};

export default config;
