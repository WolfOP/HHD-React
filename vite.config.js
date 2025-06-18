import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Import the necessary plugins for Vite
// This configuration file sets up Vite with React and Tailwind CSS support
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
         tailwindcss(),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: true,
      mangle: true,
    },
  },
})
