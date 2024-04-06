import { fileURLToPath } from "node:url";
import { defineConfig } from "@playwright/test";
import type { ConfigOptions } from "@nuxt/test-utils/playwright";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const currentDir = fileURLToPath(new URL(".", import.meta.url));

const userEnvPath = path.resolve(currentDir, "e2e", ".test.env");
const defaultEnvPath = path.resolve(currentDir, "e2e", ".default.test.env");
const envPath = fs.existsSync(userEnvPath) ? userEnvPath : defaultEnvPath;

dotenv.config({ path: envPath });

console.log(`Using env file: ${envPath}`);
console.log(`baseurl: ${process.env.BASE_URL}`);

export default defineConfig<ConfigOptions>({
  fullyParallel: true,
  use: {
    nuxt: {
      rootDir: currentDir,
    },
    baseURL: process.env.BASE_URL || "http://localhost:3000",
  },
});
