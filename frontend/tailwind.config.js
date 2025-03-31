/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base colors - Modern dark / Standard Light theme
        'tf-base-black': '#0A0A0F', // Deeper black for better contrast
        'tf-base-white': '#FFFFFF',
        'tf-base-bg1': {
          DEFAULT: '#13131A', // Slightly warmer dark gray
          lmode: '#FFFFFF', // Light mode
        },
        'tf-base-bg2': {
          DEFAULT: '#1F1F2C', // Subtle purple tint
          lmode: '#F1F5F9', // Light mode
        },
        'tf-base-text': {
          DEFAULT: '#E2E8F0', // Cooler white for better readability
          lmode: '#1F1F2C', // Light mode
        },
        'tf-base-subtext': {
          DEFAULT: '#F7F7FD', // Even lighter gray for subtle secondary text
          lmode: '#1F1F2C', // Light mode
        },

        // Primary accent - Royal Purple
        'tf-accent-primary': '#d56d76', // Light purple (from logo)
        'tf-accent-primary-light': '#e2af4c', // Golden amber (from logo)
        'tf-accent-primary-dark': '#563a69', // Dark purple (from logo)

        // Secondary accents - Professional and modern colors
        'tf-accent-sky': '#3b82f6', // Sky blue
        'tf-accent-light-sky': '#87ceeb', // Light sky blue
        'tf-accent-emerald': '#10b981', // Emerald green
        'tf-accent-amber': '#e2af4c', // Golden amber (from logo)
        'tf-accent-rose': '#c75aad', // Royal purple (from logo)

        'tf-accent-amber-light': '#f3d08c', // Light amber
        'tf-accent-violet': '#563a69', // Royal purple (from logo)
        'tf-accent-violet-light': '#8b6b9c', // Light violet

        // Semantic colors
        'tf-success': '#54e3b1', // Success green
        'tf-warning': '#e2af4c', // Warning amber
        'tf-error': '#dc9748', // Error orange
        'tf-info': '#c75aad', // Info purple

        // Gradients (use with bg-gradient-to-r)
        'tf-gradient-1-from': '#F1983C', // Golden amber
        'tf-gradient-1-to': '#B10B6C', // Red
      },
      animation: {
        pulse: 'pulse 2s ease-in-out infinite',
        gradient: 'gradient 8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'gradient-fast': 'gradient 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'gradient-slow': 'gradient 12s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.2',
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '0.3',
          },
        },
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%',
            'background-size': '200% 100%',
            filter: 'brightness(1.1) saturate(1.1) contrast(1.05)',
            transform: 'scale(1.01)',
          },
          '25%': {
            'background-position': '50% 50%',
            'background-size': '200% 100%',
            filter: 'brightness(1) saturate(1) contrast(1)',
            transform: 'scale(1)',
          },
          '50%': {
            'background-position': '100% 50%',
            'background-size': '200% 100%',
            filter: 'brightness(1.1) saturate(1.1) contrast(1.05)',
            transform: 'scale(1.01)',
          },
          '75%': {
            'background-position': '50% 50%',
            'background-size': '200% 100%',
            filter: 'brightness(1) saturate(1) contrast(1)',
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
};
