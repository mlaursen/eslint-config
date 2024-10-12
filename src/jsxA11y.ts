import { type TSESLint } from "@typescript-eslint/utils";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import globals from "globals";
import { JSX_FILES, TEST_FILES } from "./constants";

export const jsxA11y: TSESLint.FlatConfig.ConfigArray = [
  {
    files: JSX_FILES,
    ...jsxA11yPlugin.flatConfigs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // I **only** use autoFocus within dialogs which provide the correct
      // context for screen readers.
      "jsx-a11y/no-autofocus": "off",
    },
  },
  {
    files: TEST_FILES,
    rules: {
      "jsx-a11y/anchor-has-content": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
    },
  },
];
