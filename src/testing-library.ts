import { type Linter } from "eslint";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import { BASE_NAME, TEST_FILES } from "./constants.js";

/**
 * @example
 * ```ts
 * import { configs } from "@mlaursen/eslint-config";
 * import { defineConfig } from "eslint/config";
 *
 * export default defineConfig([
 *   ...configs.react,
 *   ...configs.jest,
 *   ...configs.jestDom,
 *   ...configs.testingLibraryReact
 * ]);
 * ```
 *
 * NOTE: Only choose this or the {@link testingLibraryDom}. Do not use
 * both.
 */
export const testingLibraryReact: Linter.Config[] = [
  {
    name: `${BASE_NAME}/testing-library/react`,
    files: TEST_FILES,
    ...testingLibraryPlugin.configs["flat/react"],
  },
];

/**
 * @example
 * ```ts
 * import { configs, defineConfig } from "@mlaursen/eslint-config";
 *
 * export default defineConfig([
 *   ...configs.jest,
 *   ...configs.jestDom,
 *   ...configs.testingLibraryDom
 * ]);
 * ```
 *
 * NOTE: Only choose this or the {@link testingLibraryReact}. Do not use
 * both.
 */
export const testingLibraryDom: Linter.Config[] = [
  {
    name: `${BASE_NAME}/testing-library/dom`,
    files: TEST_FILES,
    ...testingLibraryPlugin.configs["flat/dom"],
  },
];
