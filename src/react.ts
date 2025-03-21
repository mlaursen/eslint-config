import { type TSESLint } from "@typescript-eslint/utils";
import reactPlugin, { type ReactFlatConfig } from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import { BASE_NAME, JSX_FILES } from "./constants.js";

// Why is the typedef optional?
const flat = reactPlugin.configs.flat as Record<
  "recommended" | "jsx-runtime",
  ReactFlatConfig
>;
const reactPlugins = flat.recommended.plugins as TSESLint.FlatConfig.Plugins;
const recommendedRules = flat.recommended.rules;
const jsxRuntimeRules = flat["jsx-runtime"].rules;

/**
 * @example
 * ```ts
 * import { config, configs } from "@mlaursen/eslint-config";
 *
 * export default config(...configs.react);
 * ```
 *
 * Enables:
 * - `eslint-plugin-react` with:
 *   - flat.recommended
 *   - flat['jsx-runtime']
 * - `eslint-plugin-react-hooks` with:
 *   - recommended rules
 */
export const react: TSESLint.FlatConfig.ConfigArray = [
  {
    name: `${BASE_NAME}/react`,
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
  },
];
