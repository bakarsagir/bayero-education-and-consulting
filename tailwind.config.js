/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#f3cf23', // Yellow
          secondary: '#e3bf13', // Slightly darker yellow for hover states
          light: '#ffffff', // White
          dark: '#000000', // Black
          'dark-75': 'rgba(0, 0, 0, 0.75)',
          'dark-50': 'rgba(0, 0, 0, 0.5)',
          'dark-25': 'rgba(0, 0, 0, 0.25)',
          'light-75': 'rgba(255, 255, 255, 0.75)',
          'light-50': 'rgba(255, 255, 255, 0.5)',
          'light-25': 'rgba(255, 255, 255, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}