import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import viteConfiguration from "./vite.config";

export default defineConfig({
  ...viteConfiguration,
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'entry-server.js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  plugins: [
    ...(viteConfiguration.plugins || []),
    dts({
      rollupTypes: true,
    }),
  ],
});
