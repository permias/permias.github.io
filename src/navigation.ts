import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'About',
      links: [
        {
          text: 'Overview',
          href: getPermalink('/about/'),
        },
        {
          text: 'Our Team',
          href: getPermalink('/about/team'),
        },
        {
          text: 'Chapters',
          href: getPermalink('/about/chapters'),
        },
        {
          text: 'Contact Us',
          href: getPermalink('/contact'),
        },
      ],
    },
    {
      text: 'Resources',
      links: [
        {
          text: 'Features (Anchor Link)',
          href: getPermalink('/#features'),
        },
        {
          text: 'Services',
          href: getPermalink('/services'),
        },
        {
          text: 'Pricing',
          href: getPermalink('/pricing'),
        },
        {
          text: 'Terms',
          href: getPermalink('/terms'),
        },
        {
          text: 'Privacy policy',
          href: getPermalink('/privacy'),
        },
      ],
    },
    {
      text: 'Landing',
      links: [
        {
          text: 'Lead Generation',
          href: getPermalink('/landing/lead-generation'),
        },
        {
          text: 'Long-form Sales',
          href: getPermalink('/landing/sales'),
        },
        {
          text: 'Click-Through',
          href: getPermalink('/landing/click-through'),
        },
        {
          text: 'Product Details (or Services)',
          href: getPermalink('/landing/product'),
        },
        {
          text: 'Coming Soon or Pre-Launch',
          href: getPermalink('/landing/pre-launch'),
        },
        {
          text: 'Subscription',
          href: getPermalink('/landing/subscription'),
        },
      ],
    },
    {
      text: 'Blog',
      links: [
        {
          text: 'Blog List',
          href: getBlogPermalink(),
        },
        {
          text: 'Article',
          href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
        },
        {
          text: 'Article (with MDX)',
          href: getPermalink('markdown-elements-demo-post', 'post'),
        },
        {
          text: 'Category Page',
          href: getPermalink('tutorials', 'category'),
        },
        {
          text: 'Tag Page',
          href: getPermalink('astro', 'tag'),
        },
      ],
    },
  ],
  actions: [{ text: 'Download', href: 'https://github.com/onwidget/astrowind', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      links: [
        { text: 'SIGN UP FOR OUR NEWSLETTER', href: '#' },
        { text: 'info@permiasnasional.com', href: 'mailto::info@permiasnasional.com' },
        { text: '© 2025 PERMIAS NASIONAL', href: '#' }
      ],
    },
    {
      links: [
        { text: 'ABOUT US', href: '/about' },
        { text: 'CONTACT', href: '/contact' },
        { text: 'DONATE', href: '/donate' },
      ],
    },
    {
      links: [
        { text: 'INSTAGRAM', href: 'https://www.instagram.com/permias.nasional/'},
        { text: 'FACEBOOK', href: 'https://www.facebook.com/permias.nasional' },
        { text: 'LINKEDIN', href: 'https://www.linkedin.com/company/permiasnasional' },
        { text: 'YOUTUBE', href: 'https://www.youtube.com/channel/UCHjEGs027y3g--ZH5BCS7tw' },
      ],
    },
  ],
  secondaryLinks: [
    // { text: 'Terms', href: getPermalink('/terms') },
    // { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/permias.nasional/' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/permias.nasional' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/company/permiasnasional' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: 'https://www.youtube.com/channel/UCHjEGs027y3g--ZH5BCS7tw' },
  ],
  footNote: `
    Made by PERMIAS Nasional · All rights reserved.
  `,
};
