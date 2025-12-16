import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Detect performance mode from environment
const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize for performance
    target: "es2015",
    outDir: "dist",
    assetsDir: "assets",
    minify: isProduction ? "terser" : "esbuild",
    terserOptions: {
      compress: {
        drop_console: isProduction,
        drop_debugger: isProduction,
        pure_funcs: isProduction ? ['console.log', 'console.info', 'console.debug'] : [],
      },
      mangle: isProduction,
      keep_classnames: false,
      keep_fnames: false,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          framer: ['framer-motion'],
          ui: ['@radix-ui/react-*'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: !isProduction,
  },
  esbuild: {
    drop: isProduction ? ['console', 'debugger'] : [],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: []
  }
}));
