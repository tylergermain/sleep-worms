import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#04060a',
        midnight: '#0a0d14',
        deep: '#111827',
        glow: '#a8ff5a',
        'glow-dim': '#6fcc2a',
        lunar: '#f0ede8',
        mist: '#8a8fa8',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['DM Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'worm-crawl': 'wormCrawl 20s linear infinite',
        'fadeUp': 'fadeUp 0.8s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168, 255, 90, 0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(168, 255, 90, 0.7), 0 0 120px rgba(168, 255, 90, 0.3)' },
        },
        wormCrawl: {
          '0%': { transform: 'translateX(-10%) rotate(0deg)' },
          '50%': { transform: 'translateX(10%) rotate(180deg)' },
          '100%': { transform: 'translateX(-10%) rotate(360deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
