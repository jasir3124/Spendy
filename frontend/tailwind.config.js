/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx,web.jsx,web.tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#240046',
        secondary: '#5A189A',
        accent: '#AF47E8',
        dark: '#1D201F',
        light: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
