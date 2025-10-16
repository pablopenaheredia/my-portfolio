module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0614',
        primary: '#e8e6ef',
        color: {
          50: '#EFE9FC',
          100: '#D1C1F6',
          200: '#B498F0',
          300: '#9770EB',
          400: '#7A48E5',
          500: '#5C20DF',
          600: '#511CC7',
          700: '#3B148F',
          800: '#2B0F67',
          900: '#1A093E',
          950: '#090316'
        }
      },
      boxShadow: {
        soft: '0 6px 18px rgba(92,32,223,0.08)',
        'soft-strong': '0 12px 30px rgba(92,32,223,0.10)',
        'focus-color': '0 0 0 4px rgba(92,32,223,0.12)'
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        underline: {
          '0%': { backgroundSize: '0% 2px' },
          '100%': { backgroundSize: '100% 2px' }
        },
        softPulse: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.01)', opacity: '.98' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        underline: 'underline .22s ease forwards',
        'soft-pulse': 'softPulse 3s ease-in-out infinite'
      }
    }
  },
  plugins: [],
};