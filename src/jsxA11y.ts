import { type TSESLint } from "@typescript-eslint/utils";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import { BASE_NAME, JSX_FILES, TEST_FILES } from "./constants";

/**
 * @example
 * ```ts
 * import { config, configs } from "@mlaursen/eslint-config";
 *
 * export default config(...configs.jsxA11y);
 * ```
 */
export const jsxA11y: TSESLint.FlatConfig.ConfigArray = [
  {
    name: `${BASE_NAME}/jsx-a11y`,
    files: JSX_FILES,
    ...jsxA11yPlugin.flatConfigs.recommended,
    rules: {
      // I **only** use autoFocus within dialogs which provide the correct
      // context for screen readers.
      "jsx-a11y/no-autofocus": "off",
    },
  },
  {
    name: `${BASE_NAME}/jsx-a11y/testing`,
    files: TEST_FILES,
    rules: {
      "jsx-a11y/anchor-has-content": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
    },
  },
];
