import path from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],

    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, './src'),
        },
    },

    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (
                        id.includes('node_modules/react') ||
                        id.includes('node_modules/react-dom') ||
                        id.includes('node_modules/react-router')
                    ) {
                        return 'react';
                    }

                    if (
                        id.includes('node_modules/gsap') ||
                        id.includes('node_modules/lenis')
                    ) {
                        return 'animation';
                    }

                    return undefined;
                },
            },
        },
    },
});
