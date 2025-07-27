import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
        // Region colors
        'region-east-coast-i': '#2563eb',
        'region-east-coast-ii': '#1d4ed8',
        'region-east-coast-iii': '#3b82f6',
        'region-midwest-i': '#059669',
        'region-midwest-ii': '#10b981',
        'region-south': '#f59e42',
        'region-west-coast-i': '#f43f5e',
        'region-west-coast-ii': '#eab308',
      },
      fontFamily: {
        sans: ['var(--aw-font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
      },

      animation: {
        fade: 'fadeInUp 1s both',
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
    }),
  ],
  darkMode: 'class',
  safelist: [
    'bg-region-east-coast-i',
    'bg-region-east-coast-ii',
    'bg-region-east-coast-iii',
    'bg-region-midwest-i',
    'bg-region-midwest-ii',
    'bg-region-south',
    'bg-region-west-coast-i',
    'bg-region-west-coast-ii',
  ],
};
