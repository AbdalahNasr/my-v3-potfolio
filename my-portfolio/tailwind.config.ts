import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-light': 'rgba(149, 76, 233, 0.85)',
        'primary-dark': 'rgba(186, 104, 255, 0.9)',
        'background-light': '#f8f9fa',
        'background-dark': '#121212',
        'surface-light': '#ffffff',
        'surface-dark': '#1e1e1e',
        'text-light': '#2d3748',
        'text-dark': '#e2e8f0'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
export default config