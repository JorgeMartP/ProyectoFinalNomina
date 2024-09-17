
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
        'white-tm' : '#EEEEEF',
        'purple': '#3f3cbb',
        'bluecurrent': '#0369a1',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'blue-medium' : '#154D78'
      },

    }
    
  },
  darkMode: "class",
  plugins: [nextui(

  )]
}