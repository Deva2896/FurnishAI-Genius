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
        'pulse-soft': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(20, 184, 166, 0.45)' },
          '50%': { boxShadow: '0 0 0 8px rgba(20, 184, 166, 0)' }
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'check-pop': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        'pulse-soft': 'pulse-soft 2.2s ease-out infinite',
        'fade-up': 'fade-up 0.3s ease-out both',
        'pop-in': 'pop-in 0.18s ease-out both',
        'check-pop': 'check-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        shimmer: 'shimmer 1.6s ease-in-out infinite'
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.1)',
        raised: '0 4px 16px -4px rgba(15, 23, 42, 0.18)'
      }
    }
  },
  plugins: []
};
