import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/screens/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      main: '#33EE94',
      'main-dark': '#33EE944D',
      'main-light': '#00B86C',
      black: {
        1: '#000000',
        2: '#1b1b1b',
      },
      gray: {
        1: '#262626',
        2: '#464646',
        3: '#9B9B9B',
        4: '#C0C0C0',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          'Segoe UI',
          'PingFang SC',
          'Microsoft YaHei',
          'Arial',
          'sans-serif',
        ],
        ios: ['-apple-system', 'BlinkMacSystemFont', 'PingFang SC', 'sans-serif'],
        android: ['Roboto', 'Noto Sans', 'sans-serif'],
        windows: ['Segoe UI', 'Microsoft YaHei', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
