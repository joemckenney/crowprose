import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import viteConfiguration from "./vite.config";

export default defineConfig({
  ...viteConfiguration,
  plugins: [
    ...(viteConfiguration.plugins || []),
    dts({
      rollupTypes: true,
    }),
  ],
});
