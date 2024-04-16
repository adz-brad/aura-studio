/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      base: colors.zinc,
      brand: colors.sky,
      green: colors.green,
      red: colors.red,
      yellow: colors.yellow
    },
    extend: {
      fontFamily: {
        brand: ['var(--font-quicksand)'],
        body: ['var(--font-inter)']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'), 
    require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' })
  ],
}
