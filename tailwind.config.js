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
          yellow: '#f3cf23',
          black: '#000000',
          white: '#ffffff',
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        helvetica: ['Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundColor: {
        primary: '#f3cf23',
      },
      textColor: {
        primary: '#000000',
      },
    },
  },
  plugins: [],
}