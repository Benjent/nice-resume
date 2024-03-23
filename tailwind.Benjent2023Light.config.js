/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/components/templates/Benjent2023Light.vue"],
  theme: {
    extend: {
      fontFamily: {
        display: ["League Gothic"],
        body: ["Mulish"],
      },
      colors: {
        primary: "#ed3660",
        secondary: "#5662e8",
        tertiary: "#e8afcf",
        dark: "#1e1e1e",
      },
    },
  },
  plugins: [],
};
