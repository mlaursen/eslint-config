import vitestPlugin from "@vitest/eslint-plugin";
import { type Linter } from "eslint";
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
export const vitest: Linter.Config[] = [
  {
    name: `${BASE_NAME}/vitest`,
    files: TEST_FILES,
    plugins: {
      // @ts-expect-error Invalid Linter.Config type
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
export const jest: Linter.Config[] = [
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
export const jestDom: Linter.Config[] = [
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
export const testing = (framework: TestFramework): Linter.Config[] => {
  let config: Linter.Config[];
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
