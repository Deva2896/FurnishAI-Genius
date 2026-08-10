/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'brand-teal': '#0F766E',
        'brand-teal-light': '#14B8A6',
        'brand-dark': '#0F172A',
        'brand-warm-white': '#FFFCF5',
        'brand-bg': '#F8FAFC'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif']
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(20, 184, 166, 0.6)' },
          '50%': { boxShadow: '0 0 0 12px rgba(20, 184, 166, 0)' }
        },
        'sparkle-spin': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' }
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'check-pop': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-out infinite',
        'sparkle-spin': 'sparkle-spin 3s ease-in-out infinite',
        'scan-line': 'scan-line 1.8s ease-in-out infinite',
        'fade-up': 'fade-up 0.4s ease-out both',
        'pop-in': 'pop-in 0.2s ease-out both',
        'check-pop': 'check-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both'
      },
      boxShadow: {
        'glow-teal': '0 0 24px rgba(20, 184, 166, 0.35)',
        premium: '0 10px 40px -10px rgba(15, 23, 42, 0.25)'
      }
    }
  },
  plugins: []
};
