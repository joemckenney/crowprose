import { defineConfig } from "vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  build: {
    ssr: true,
    outDir: "dist/server",
    rollupOptions: {
      input: {
        prerender: "./src/prerender.ts",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
