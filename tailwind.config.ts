import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F5F0E8',
        stone: '#EDE8DC',
        'mc-card': '#FAFAF7',
        'mc-blue': '#5B8DB8',
        'mc-gold': '#C9A84C',
        'mc-magic': '#7EC8E3',
        'mc-text': '#2C2416',
        'mc-muted': '#6B5E4A',
        'mc-border': '#D4C9B0'
      },
      fontFamily: {
        minecraft: ['var(--font-minecraft)', 'monospace'],
        retro: ['var(--font-retro)', 'monospace'],
        body: ['var(--font-body)', 'sans-serif']
      },
      boxShadow: {
        pixel: '4px 4px 0px rgba(0,0,0,0.2)',
        'pixel-lg': '6px 6px 0px rgba(0,0,0,0.15)',
        magic: '0 0 20px rgba(126,200,227,0.4)',
        gold: '0 0 20px rgba(201,168,76,0.4)'
      },
      borderRadius: {
        mc: '2px'
      }
    }
  },
  plugins: []
}

export default config
