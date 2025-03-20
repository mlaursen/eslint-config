// @ts-check
import { config, configs, gitignore } from "./dist/index.js";

export default config(
  gitignore(import.meta.url),
  ...configs.typescriptTypeChecking(import.meta.dirname),
  {
    files: ["scripts/**"],
    rules: {
      "no-console": "off",
    },
  }
);
