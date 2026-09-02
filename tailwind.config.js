/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#006A4E', // National Heritage Green
          900: '#064e3b',
          950: '#022c22',
        },
        shyamol: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#006A4E',
          900: '#064e3b',
          950: '#022c22',
        },
        surjo: {
          50: '#fff1f2',
          100: '#ffe4e6',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48', // Flag Sunset Red
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        shorisha: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b', // Mustard Golden Field
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
        },
        haor: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7', // Tanguar Haor Water Blue
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        mati: {
          50: '#faf5f0',
          100: '#f4e9de',
          500: '#c27847', // Terracotta Clay
          600: '#a35d31',
          700: '#854724',
        },
        accent: {
          amber: '#f59e0b',
          rose: '#f43f5e',
          emerald: '#10b981',
          sky: '#0ea5e9',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Hind Siliguri', 'Noto Sans Bengali', 'system-ui', 'sans-serif'],
        outfit: ['Outfit', 'Plus Jakarta Sans', 'Hind Siliguri', 'sans-serif'],
        bengali: ['Hind Siliguri', 'Noto Sans Bengali', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(4, 120, 87, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.06), 0 4px 10px -2px rgba(0, 0, 0, 0.02)',
        'elevated': '0 20px 40px -10px rgba(4, 120, 87, 0.18)',
        'glass': '0 8px 32px 0 rgba(15, 23, 42, 0.08)',
        'glass-hover': '0 16px 40px 0 rgba(5, 150, 105, 0.22)',
        'glow-emerald': '0 0 25px -5px rgba(5, 150, 105, 0.45)',
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.45)',
        'glow-crimson': '0 0 25px -5px rgba(225, 29, 72, 0.45)',
        'glow-sky': '0 0 25px -5px rgba(14, 165, 233, 0.45)',
      },
    },
  },
  plugins: [],
}
