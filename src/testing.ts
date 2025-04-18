import { type TSESLint } from "@typescript-eslint/utils";
import vitestPlugin from "@vitest/eslint-plugin";
import jestPlugin from "eslint-plugin-jest";
import jestDomPlugin from "eslint-plugin-jest-dom";
import { BASE_NAME, DEV_WARNING_PROD_ERROR, TEST_FILES } from "./constants.js";

export type TestFramework = "jest" | "vitest";

/**
 * @example
 * ```ts
 * import { config, configs } from "@mlaursen/eslint-config";
 *
 * export default config(...configs.vitest);
 * ```
 */
export const vitest: TSESLint.FlatConfig.ConfigArray = [
  {
    name: `${BASE_NAME}/vitest`,
    files: TEST_FILES,
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      "vitest/no-alias-methods": "error",
      "vitest/no-focused-tests": DEV_WARNING_PROD_ERROR,
      "vitest/no-disabled-tests": DEV_WARNING_PROD_ERROR,
      "vitest/no-duplicate-hooks": "error",
      "vitest/no-standalone-expect": "error",
      "vitest/prefer-expect-resolves": "error",
      "vitest/prefer-spy-on": "error",
      "vitest/prefer-vi-mocked": "error",
    },
  },
];

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

/**
 * @example
 * ```ts
 * import { config, configs } from "@mlaursen/eslint-config";
 *
 * export default config(...configs.testing("jest"));
 *
 * // or
 * export default config(...configs.testing("vitest"));
 * ```
 */
export const testing = (
  framework: TestFramework
): TSESLint.FlatConfig.ConfigArray => {
  let config: TSESLint.FlatConfig.ConfigArray;
  switch (framework) {
    case "jest":
      config = jest;
      break;
    case "vitest":
      config = vitest;
      break;
  }

  return [...config, ...jestDom];
};
