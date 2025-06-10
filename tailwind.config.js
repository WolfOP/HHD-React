import { defineConfig } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default defineConfig({
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#a855f7',
          dark: '#9333ea'
        },
        outer: '#1e1e2f',
        surface: '#2a2a40',
      },
    },
  },
  plugins: [typography],
})
