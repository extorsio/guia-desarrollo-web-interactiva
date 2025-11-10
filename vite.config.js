// Vite configuration is handled automatically by Astro
// This file can be used for additional Vite configuration if needed
export default {
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['astro'],
        },
      },
    },
  },
};