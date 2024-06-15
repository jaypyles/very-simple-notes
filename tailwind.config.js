/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        grayBackground: "#181a1b",
      },
      fontFamily: {
        sans: ['"Montserrat"'],
      },
    },
  },
  plugins: [],
};
