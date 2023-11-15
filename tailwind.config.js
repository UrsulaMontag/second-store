/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      warn: "#B5110F",
      white: "#ffffff",
      black: "#000000",
      dark: "#212121",
      light: "#F6F6F6",
      blueGreen: {
        light: "#83B7A2",
        DEFAULT: "#6D9886",
        dark: "#445F54",
      },
    },
  },
  plugins: [],
};
