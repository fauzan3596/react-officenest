/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'headerImg': "url('/src/assets/headerBg.png')",
        'contactUsImg': "url('/src/assets/contactusBg.png')",
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}