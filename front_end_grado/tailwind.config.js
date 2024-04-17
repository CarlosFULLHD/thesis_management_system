import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#052915',
        'custom-green-font' : '#18bb47',
        'custom-red': '#2f0412',
        'custom-red-font' : '#f33c58',
        'custom-blue':'#002d61',
        'custom-blue-font': '#0069ee'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
