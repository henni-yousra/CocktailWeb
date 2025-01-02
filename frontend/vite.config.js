import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://reverseproxy:80',  // Ensure it points to reverseproxy, not directly to backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: true,
    port: 4000,  // Assuming Vite's frontend server runs on port 4000
  }
  
});
