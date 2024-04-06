// @vitest-environment nuxt
import { fileURLToPath } from "node:url";
import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    exclude: ["**/node_modules/**", "e2e/**"],
    root: fileURLToPath(new URL("./", import.meta.url)),
  },
});
