/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{vue,ts}",
    "!./components/templates/*{vue,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
