import { type TSESLint } from "@typescript-eslint/utils";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import { BASE_NAME, TEST_FILES } from "./constants.js";

/**
 * @example
 * ```ts
 * import { config, configs } from "@mlaursen/eslint-config";
 *
 * export default config(
 *   ...configs.react,
 *   ...configs.jest,
 *   ...configs.jestDom,
 *   ...configs.testingLibraryReact
 * );
 * ```
 *
 * NOTE: Only choose this or the {@link testingLibraryDom}. Do not use
 * both.
 */
export const testingLibraryReact: TSESLint.FlatConfig.ConfigArray = [
  {
    name: `${BASE_NAME}/testing-library/react`,
    files: TEST_FILES,
    ...testingLibraryPlugin.configs["flat/react"],
  },
];

/**
 * @example
 * ```ts
 * import { config, configs } from "@mlaursen/eslint-config";
 *
 * export default config(
 *   ...configs.jest,
 *   ...configs.jestDom,
 *   ...configs.testingLibraryDom
 * );
 * ```
 *
 * NOTE: Only choose this or the {@link testingLibraryReact}. Do not use
 * both.
 */
export const testingLibraryDom: TSESLint.FlatConfig.ConfigArray = [
  {
    name: `${BASE_NAME}/testing-library/dom`,
    files: TEST_FILES,
    ...testingLibraryPlugin.configs["flat/dom"],
  },
];
