/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      transitionProperty: {
        'width': 'width',
      },
    },
  },
  plugins: [],
};