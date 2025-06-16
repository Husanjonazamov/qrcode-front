import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, 
    allowedHosts: ['7873-185-213-229-3.ngrok-free.app'], 
  },
});
