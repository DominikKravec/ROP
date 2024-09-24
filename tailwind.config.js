/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      blue: {
        DEFAULT: "#3CACFD",
        100: '#A5D9FF',
        200: '#7DC9FF'
      },
      gray: {
        DEFAULT: "#D9D9D9"
      }
    }
  },
  plugins: [],
}

