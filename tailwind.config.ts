import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Satoshi', 'Inter', 'Arial', 'sans-serif'],
    },
    extend: {
      colors: {
        pumpkin: '#ff6500',
        russet: '#993d00',
        onyx: '#3b3838',
        raisin: '#2b2a2a',
      },
      borderRadius: {
        card: '22px',
        pill: '999px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(255, 101, 0, 0.45)',
        card: '0 18px 38px rgba(0, 0, 0, 0.22)',
      },
    },
  },
} satisfies Config
