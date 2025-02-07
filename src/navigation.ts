import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'About',
      links: [
        {
          text: 'Sejarah Kami',
          href: getPermalink('/homes/sejarahKami'),
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
      href: getPermalink('/landing/Essentials')
    },
    // {
    //   text: 'Blog',
    //   links: [
    //     {
    //       text: 'Blog List',
    //       href: getBlogPermalink(),
    //     },
    //     {
    //       text: 'Article',
    //       href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
    //     },
    //     {
    //       text: 'Article (with MDX)',
    //       href: getPermalink('markdown-elements-demo-post', 'post'),
    //     },
    //     {
    //       text: 'Category Page',
    //       href: getPermalink('tutorials', 'category'),
    //     },
    //     {
    //       text: 'Tag Page',
    //       href: getPermalink('astro', 'tag'),
    //     },
    //   ],
    // },
  ],
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
        { text: 'About Us', href: '#' },
        { text: 'Contact', href: '/contact' },
        // { text: 'Donate', href: '/donate' },
      ],
    },
    {
      links: [
        { text: 'Instagram', href: 'https://www.instagram.com/permias.nasional/'},
        { text: 'Facebook', href: 'https://www.facebook.com/permias.nasional' },
        { text: 'LinkedIn', href: 'https://www.linkedin.com/company/permiasnasional' },
        { text: 'YouTube', href: 'https://www.youtube.com/channel/UCHjEGs027y3g--ZH5BCS7tw' },
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
    Made by PERMIAS Nasional based on AstroWind Template · All rights reserved.
  `,
};
