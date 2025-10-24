import { type Linter } from "eslint";
import { BASE_NAME } from "./constants.js";

/**
 * @example
 * ```ts
 * import { configs } from "@mlaursen/eslint-config";
 * import { defineConfig } from "eslint/config";
 *
 * export default defineConfig(configs.scripts);
 * ```
 */
export const scripts: Linter.Config[] = [
  {
    name: `${BASE_NAME}/scripts`,
    files: ["scripts/**"],
    rules: {
      "no-console": "off",
    },
  },
];
