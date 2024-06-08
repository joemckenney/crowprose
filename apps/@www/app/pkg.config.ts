import { defineConfig } from "@pkg-tools/config";

export default defineConfig({
  build: {
    entries: ["src/template"],
    clean: false,
    sourcemap: true,
    extensions: "modern",
    rollup: {
      inlineDependencies: true,
      esbuild: {
        target: ["node16"],
        minify: true,
      },
    },
    declaration: "compatible",
  },
});
