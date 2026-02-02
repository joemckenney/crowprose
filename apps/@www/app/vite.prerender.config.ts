import { defineConfig } from "vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    vanillaExtractPlugin(),
  ],
  build: {
    ssr: true,
    outDir: "dist/server",
    emptyOutDir: false,
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
