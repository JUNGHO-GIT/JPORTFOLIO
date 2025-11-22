/**
 * @file vite.config.ts
 * @since 2025-11-23
 */

import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";

// ----------------------------------------------------------------------------------------------------
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProd = mode === "production";

  return {
    base: env.VITE_PUBLIC_URL || "/JPORTFOLIO",
    plugins: [
      react(),
      isProd ? (
        viteCompression({
          verbose: false,
          disable: false,
          threshold: 10240,
          algorithm: "brotliCompress",
          ext: ".br",
          deleteOriginFile: false
        })
      ) : (
        null
      )
    ].filter(Boolean),
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env.PUBLIC_URL": JSON.stringify(env.VITE_PUBLIC_URL || "/JPORTFOLIO")
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@interfaces": path.resolve(__dirname, "./src/interfaces"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@schemas": path.resolve(__dirname, "./src/schemas"),
        "@stores": path.resolve(__dirname, "./src/stores"),
        "@exportReacts": path.resolve(__dirname, "./src/exports/ExportReacts"),
        "@exportMuis": path.resolve(__dirname, "./src/exports/ExportMuis"),
        "@exportHooks": path.resolve(__dirname, "./src/exports/ExportHooks"),
        "@exportStores": path.resolve(__dirname, "./src/exports/ExportStores"),
        "@exportLayouts": path.resolve(__dirname, "./src/exports/ExportLayouts"),
        "@exportComponents": path.resolve(__dirname, "./src/exports/ExportComponents"),
        "@exportContainers": path.resolve(__dirname, "./src/exports/ExportContainers"),
        "@exportPages": path.resolve(__dirname, "./src/exports/ExportPages"),
        "@exportSchemas": path.resolve(__dirname, "./src/exports/ExportSchemas"),
        "@exportScripts": path.resolve(__dirname, "./src/exports/ExportScripts"),
        "@exportLibs": path.resolve(__dirname, "./src/exports/ExportLibs"),
        "@exportTypes": path.resolve(__dirname, "./src/exports/ExportTypes")
      }
    },
    css: {
      modules: {
        localsConvention: "camelCase"
      }
    },
    build: {
      outDir: "build",
      assetsDir: "assets",
      sourcemap: false,
      minify: isProd ? "esbuild" : false,
      target: "es2015",
      cssMinify: true,
      chunkSizeWarningLimit: 2048,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks: {
            "react": ["react", "react-dom", "react-router"],
            "mui": ["@mui/material", "@mui/system", "@emotion/react", "@emotion/styled"],
            "vendor": ["axios", "zustand", "moment", "date-fns"]
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split(".") || [];
            const extType = info[info.length - 1];
            return extType === "css" ? (
              `assets/css/[name].[hash][extname]`
            ) : (
              `assets/[name].[hash][extname]`
            );
          },
          chunkFileNames: "assets/js/[name].[hash].js",
          entryFileNames: "assets/js/[name].[hash].js"
        }
      },
      assetsInlineLimit: 4096
    },
    esbuild: isProd ? {
      drop: ["console", "debugger"],
      legalComments: "none"
    } : {},
    server: {
      port: 3000,
      open: true,
      host: true,
      cors: true
    },
    preview: {
      port: 3000,
      open: false
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router"
      ]
    }
  };
});