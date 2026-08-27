/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        sans: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        card: 'var(--card)',
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        accent: 'var(--accent)',
        text: 'var(--text)',
        'text-secondary': 'var(--text-secondary)',
        border: 'var(--border)',

        brand: {
          dark: '#3B0764',
          deep: '#4C1D95',
          purple: '#6D28D9',
          violet: '#7C3AED',
          accent: '#9333EA',
          magenta: '#D946EF',
          pink: '#E879F9',
          light: '#F3E8FF',
          darkBg: '#090D16',
          cardDark: '#131C2E',
        },

        'primary-purple': 'var(--primary)',
        'dark-purple': 'var(--primary-hover)',
        'accent-purple': 'var(--accent)',
        'light-lavender': 'var(--pill-bg)',
        'soft-purple-bg': 'var(--bg)',
        'light-gray': 'var(--surface)',
        'border-gray': 'var(--border)',
        'text-primary': 'var(--text)',
        'text-secondary-var': 'var(--text-secondary)',
        'success-accent': '#22C55E',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 50%, #D946EF 100%)',
        'gradient-purple': 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
        'gradient-dark': 'linear-gradient(135deg, #131C2E 0%, #090D16 100%)',
        'glass-light': 'linear-gradient(135deg, var(--card), var(--surface))',
      },
      boxShadow: {
        'purple-soft': '0 10px 25px -5px var(--shadow)',
        'purple-glow': '0 15px 35px -5px var(--shadow)',
        'brand-glow': '0 0 35px -5px rgba(124, 58, 237, 0.4)',
        'magenta-glow': '0 0 35px -5px rgba(217, 70, 239, 0.4)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.35, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.06)' },
        }
      }
    },
  },
  plugins: [],
}