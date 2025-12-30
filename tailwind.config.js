/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Oura-inspired dark theme
        dark: {
          bg: '#0A0A0A',
          card: '#1A2332',
          cardHover: '#1F2937',
          border: '#2D3748',
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
      },
      backgroundImage: {
        'gradient-card': 'linear-gradient(135deg, #1A2332 0%, #0F1419 100%)',
        'gradient-primary': 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
      },
    },
  },
  plugins: [],
}
