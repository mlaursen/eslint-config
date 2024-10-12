import { type TSESLint } from "@typescript-eslint/utils";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import globals from "globals";
import { JSX_FILES } from "./constants";

export const jsxA11y: TSESLint.FlatConfig.ConfigArray = [
  {
    files: JSX_FILES,
    ...jsxA11yPlugin.flatConfigs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];
