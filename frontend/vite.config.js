import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),,
    react()],
})

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';

// export default defineConfig({
//     plugins: [
//         tailwindcss(),
//         react(),
//     ],
//     server: {
//         host: 'localhost',
//         port: 5173,
//         proxy: {
//             '/api': {
//                 target: 'http://localhost:8000', // Laravel backend
//                 changeOrigin: true,
//                 secure: false,
//                 rewrite: (path) => path, // Keep /api prefix
//             },
//         },
//     },
// });
