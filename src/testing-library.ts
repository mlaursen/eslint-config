import { fixupPluginRules } from "@eslint/compat";
import { type TSESLint } from "@typescript-eslint/utils";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import { BASE_NAME, TEST_FILES } from "./constants";

const testingLibrary: TSESLint.FlatConfig.Config = {
  files: TEST_FILES,
  plugins: {
    // @ts-expect-error There is a bad typing atm
    "testing-library": fixupPluginRules(testingLibraryPlugin),
  },
};

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
    ...testingLibrary,
    name: `${BASE_NAME}/testing-library/react`,
    rules: {
      ...testingLibraryPlugin.configs["flat/react"].rules,
    },
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
    ...testingLibrary,
    name: `${BASE_NAME}/testing-library/dom`,
    rules: {
      ...testingLibraryPlugin.configs["flat/dom"].rules,
    },
  },
];
