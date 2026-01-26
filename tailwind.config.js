/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ily-dark': '#141414',
        'ily-blue': '#36bdf2',
        'ily-purple': '#6f42c1',
      },
      backgroundImage: {
        'ily-gradient': 'linear-gradient(to right, #36bdf2, #6f42c1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
        fadeIn: 'fadeIn 0.8s ease-in-out',
      },
    },
  },
  plugins: [],
}