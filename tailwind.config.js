/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f5fb',
          100: '#e1ebf7',
          200: '#c7dbf0',
          300: '#9ec4e5',
          400: '#6ea6d6',
          500: '#4988c5',
          600: '#346ea9',
          700: '#2a5789',
          800: '#264971',
          850: '#1a3353',
          900: '#0e1e35',
          950: '#070f1d',
          darkest: '#040810',
        },
        cyanAccent: {
          DEFAULT: '#00D8F6',
          subtle: '#22d3ee',
          glow: 'rgba(0, 216, 246, 0.15)',
          muted: '#0e7490',
          dark: '#083344',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'glow-cyan-lg': '0 0 50px -10px rgba(6, 182, 212, 0.25)',
        'glow-navy': '0 20px 40px -15px rgba(7, 15, 29, 0.7)',
        'inner-light': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))',
        'grid-pattern': "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
