import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression(),
      {
        name: 'preload-css',
        enforce: 'post',
        transformIndexHtml(html, ctx) {
          if (!ctx.bundle) return html;
          const cssFiles = Object.keys(ctx.bundle).filter(f => f.endsWith('.css'));
          const preloadLinks = cssFiles
            .map(
              file => `<link rel="preload" href="/${file}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="/${file}"></noscript>`
            )
            .join('');
          return html.replace('</head>', `${preloadLinks}</head>`);
        }
      }
  ],
  server: {
    headers: {
      'X-Robots-Tag': 'index, follow',
    },
    allowedHosts: [
      '2208e8b6-a05a-4a4d-ac70-1b4a3be30b79-00-2issp31vfbzwn.sisko.replit.dev',
    ],
  },
  preview: {
    headers: {
      'X-Robots-Tag': 'index, follow',
    },
  },
});