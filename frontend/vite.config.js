import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        react()
    ],
    build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('lucide-react')) {
                            return 'vendor-icons';
                        }
                        if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                            return 'vendor-react';
                        }
                        if (id.includes('framer-motion') || id.includes('gsap')) {
                            return 'vendor-animation';
                        }
                        return 'vendor';
                    }
                }
            }
        }
    },
    server: {
        port: 5173,
        strictPort: true,
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