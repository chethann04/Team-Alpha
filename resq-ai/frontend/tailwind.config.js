/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary:  '#63b3ed',
        mint:     '#68d391',
        darkbg:   '#0b0f19',
        lightbg:  '#f4f6f8',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        clay: '24px',
        '4xl': '32px',
      },
      boxShadow: {
        clay:      '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
        'clay-sm': '4px 4px 8px #bebebe, -4px -4px 8px #ffffff',
        glow:      '0 0 20px rgba(99,179,237,0.3)',
        'glow-lg': '0 0 40px rgba(99,179,237,0.4)',
      },
      animation: {
        'float':     'float 3s ease-in-out infinite',
        'pulse-glow':'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'shimmer':   'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(99,179,237,0.3)' },
          '50%':       { boxShadow: '0 0 30px rgba(99,179,237,0.9)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },
    },
  },
  plugins: [],
};