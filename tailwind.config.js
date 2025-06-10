import { defineConfig } from 'tailwindcss'
export default defineConfig({
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#a855f7',
          dark: '#9333ea'
        }
      }
    }
  },
  plugins: [],
})
