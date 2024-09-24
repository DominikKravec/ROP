/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      blue: {
        DEFAULT: "#3CACFD",
        100: '#3CACFD',
      }
    }
  },
  plugins: [],
}

