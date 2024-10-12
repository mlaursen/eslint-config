import { type TSESLint } from "@typescript-eslint/utils";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import { JSX_FILES } from "./constants";

const { flat } = reactPlugin.configs;
const reactPlugins = flat.recommended.plugins as TSESLint.FlatConfig.Plugins;
const recommendedRules = flat.recommended.rules as TSESLint.FlatConfig.Rules;
const jsxRuntimeRules = flat["jsx-runtime"].rules as TSESLint.FlatConfig.Rules;

/**
 * Enables:
 * - `eslint-plugin-react` with:
 *   - flat.recommended
 *   - flat['jsx-runtime']
 * - `eslint-plugin-react-hooks` with:
 *   - recommended rules
 */
export const react: TSESLint.FlatConfig.ConfigArray = [
  {
    files: JSX_FILES,
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      ...reactPlugins,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...recommendedRules,
      ...jsxRuntimeRules,
      ...reactHooksPlugin.configs.recommended.rules,

      "react-hooks/exhaustive-deps": [
        "error",
        {
          additionalHooks: "(useIsomorphicLayoutEffect)",
        },
      ],
    },
    languageOptions: {
      ...flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
  },
];
