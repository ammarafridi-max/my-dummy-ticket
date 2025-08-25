import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    headers: {
      'X-Robots-Tag': 'index, follow',
    },
  },
  preview: {
    headers: {
      'X-Robots-Tag': 'index, follow',
    },
  },
});
