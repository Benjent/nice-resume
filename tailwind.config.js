/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts}",
    "!./src/components/templates/*{vue,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
