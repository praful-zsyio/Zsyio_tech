import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    define: {
        global: 'window',
    },
    plugins: [
        tailwindcss(),
        react()
    ],
    build: {
        chunkSizeWarningLimit: 1000,
    },
    server: {
        port: 5173,
        host: true, // Listen on all network interfaces
        strictPort: false,
        proxy: {
            // Proxy /api requests to the Django backend in development
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                secure: false,
            },
        },
    }
})