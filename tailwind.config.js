/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        zero: "0 2px 4px rgb(56 65 74 / 20%)",
        round: "0 0 7px 2px rgb(56 65 74 / 5%)",
      },
    },
  },
  plugins: [],
};
