import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // Vite's dev + preview servers fall back to index.html for unknown paths,
  // so client-side routes survive a hard refresh.
  appType: 'spa',
});
