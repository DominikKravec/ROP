/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
    colors: {
      blue: {
        DEFAULT: "#3CACFD",
        100: '#A5D9FF',
        200: '#7DC9FF',
      },
      gray: {
        DEFAULT: "#D9D9D9",
      },
      white: {
        DEFAULT: '#fefeff',
      },
      red: {
        DEFAULT: "#FF0000",
        100: "#FC5E5E",
      },
      pink: {
        DEFAULT: "#FC5E5E",
        100: "#FF55BB",
      },
      yellow: {
        DEFAULT: '#FFDD00',
      },
      green: {
        DEFAULT: '#47A83E',
      },
      primary: '#fefeff',
      secondary: '#1B1B1B',
    },
  },
  plugins: [],
}

