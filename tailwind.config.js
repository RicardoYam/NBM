/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#6537FF",
        secondary: "#E9E9E9",
        intro: "#383939",
        warning: "#FA646433",
        charcoal: "#383939",
        outlet: "#01021433",
      },
      fontFamily: {
        syne: ["Syne"],
      },
    },
  },
  plugins: [],
};
