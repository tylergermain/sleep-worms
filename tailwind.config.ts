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
        cloud: '#f7f5fc',
        mist: '#eee9f8',
        haze: '#e2daf2',
        navy: '#1a2040',
        indigo: '#5b56b5',
        teal: '#3db8b0',
        ink: '#0f1023',
        stone: '#6b6988',
      },
      fontFamily: {
        sans: ['Assistant', 'sans-serif'],
      },
      fontSize: {
        xs: ['11px', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        sm: ['13px', { lineHeight: '1.5' }],
        base: ['15px', { lineHeight: '1.6' }],
        lg: ['18px', { lineHeight: '1.5' }],
        xl: ['22px', { lineHeight: '1.3' }],
        '2xl': ['28px', { lineHeight: '1.2' }],
        '3xl': ['36px', { lineHeight: '1.1' }],
        '4xl': ['48px', { lineHeight: '1.05' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
      letterSpacing: {
        'label': '0.1em',
        'nav': '0.08em',
        'btn': '0.06em',
        'price': '-0.02em',
      },
    },
  },
  plugins: [],
}

export default config
