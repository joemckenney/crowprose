import { defineConfig } from "vite";
import { resolve } from "node:path";

import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/template.ts"),
      formats: ["es"],
      fileName: "index",
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
});
