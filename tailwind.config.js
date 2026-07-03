/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Emerald / forest green from the Sovereign logo
        forest: {
          DEFAULT: '#2f5233',
          50: '#f2f7f2',
          100: '#e0ece0',
          200: '#c2d8c3',
          300: '#96ba98',
          400: '#639768',
          500: '#437a48',
          600: '#2f5233',
          700: '#28472c',
          800: '#213a25',
          900: '#1a2e1d',
          950: '#0d1a10',
        },
        gold: {
          DEFAULT: '#c9a24b',
          100: '#f5ecd4',
          200: '#ecd8a6',
          300: '#e0be6f',
          400: '#d4a94c',
          500: '#c9a24b',
          600: '#a67c34',
          700: '#855d2c',
        },
        blush: {
          DEFAULT: '#f4dcd9',
          50: '#fdf6f5',
          100: '#f9e9e6',
          200: '#f4dcd9',
          300: '#e9bdb7',
        },
        ivory: {
          DEFAULT: '#f8f5ef',
          100: '#faf8f3',
          200: '#f1ece1',
        },
        ink: '#1c1c1a',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 40px -14px rgba(28, 46, 29, 0.22)',
        card: '0 24px 60px -22px rgba(28, 46, 29, 0.32)',
        gold: '0 10px 30px -8px rgba(201, 162, 75, 0.45)',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'slow-zoom': { '0%': { transform: 'scale(1)' }, '100%': { transform: 'scale(1.12)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'slow-zoom': 'slow-zoom 14s ease-out forwards',
        float: 'float 5s ease-in-out infinite',
        shimmer: 'shimmer 1.8s infinite',
      },
    },
  },
  plugins: [],
}
