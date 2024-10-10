/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      red: {
        DEFAULT: "#FF0000",
        100: "#FC5E5E",
      },

      blue: {
        DEFAULT: "#3CACFD",
        100: '#A5D9FF',
        200: '#7DC9FF'
      },
      gray: {
        DEFAULT: "#D9D9D9"
      },
      
      white: {
        DEFAULT: '#fefeff',
      },
      primary: '#fefeff'
    }
  },
  plugins: [],
}

