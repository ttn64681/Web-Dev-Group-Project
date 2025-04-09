/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'], // e.g. className="font-inter"
        dongle: ['var(--font-dongle)'],
        nunito: ['var(--font-nunito)'],
      },
      colors: {
        'neon-pink': '#F88AFF', // e.g. className="text-neon-pink"
        'neon-pink-subtitle': '#D163D7',
        'neon-cyan': '#6CFEFE',
        'neon-orange': '#F09A35',
        'neon-violet': '#BD11FF',

        'nav-purple': '#28162F',
        'footer-purple': '#A63FAC',

        'purple-dark-transition': '#120818', // background page
        'purple-light-transition': '#29142F',

        'sidebar-white-purple': '#B590C4', // sidebar unhovered text and border
        'form-bg-purple': '#33203A', // form background
        'heart-red': '#FF3284',
        'disabled-purple': '#765178', // disabled icons
      },
    },
  },
  plugins: [],
};
