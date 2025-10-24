// @ts-check
import { defineConfig } from "eslint/config";
import { configs, gitignore } from "./dist/index.js";

export default defineConfig([
  gitignore(import.meta.url),
  ...configs.typescriptTypeChecking(import.meta.dirname),
  {
    files: ["scripts/**"],
    rules: {
      "no-console": "off",
    },
  },
]);
