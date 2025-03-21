import { type TSESLint } from "@typescript-eslint/utils";
import jestPlugin from "eslint-plugin-jest";
import jestDomPlugin from "eslint-plugin-jest-dom";
import { BASE_NAME, TEST_FILES } from "./constants.js";

/**
 * @example
 * ```ts
 * import { config, configs } from "@mlaursen/eslint-config";
 *
 * export default config(...configs.jest);
 * ```
 */
export const jest: TSESLint.FlatConfig.ConfigArray = [
  {
    name: `${BASE_NAME}/jest`,
    files: TEST_FILES,
    ...jestPlugin.configs["flat/recommended"],
  },
];

/**
 * @example
 * ```ts
 * import { config, configs } from "@mlaursen/eslint-config";
 *
 * export default config(...configs.jest, ...configs.jestDom);
 * ```
 */
export const jestDom: TSESLint.FlatConfig.ConfigArray = [
  {
    name: `${BASE_NAME}/jest-dom`,
    files: TEST_FILES,
    ...jestDomPlugin.configs["flat/recommended"],
  },
];
