/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        'primary': 'Montserrat',
      },
      colors: {
        'primary-100': 'rgba(64, 26, 26, 1.0)',
        'primary-75': 'rgba(64, 26, 26, 0.75)',
        'primary-25': 'rgba(64, 26, 26, 0.25)',
        'white': '#ffffff',
      },

    },
  },
  plugins: [],
}

