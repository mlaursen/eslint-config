import { type Linter } from "eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import { BASE_NAME, JSX_FILES } from "./constants.js";

// Why is the typedef optional?
const flat = reactPlugin.configs.flat;
const reactPlugins = flat.recommended?.plugins;
const recommendedRules = flat.recommended?.rules;
const jsxRuntimeRules = flat["jsx-runtime"]?.rules;

/**
 * @example
 * ```ts
 * import { configs } from "@mlaursen/eslint-config";
 * import { defineConfig } from "eslint/config";
 *
 * export default defineConfig(configs.react);
 * ```
 *
 * Enables:
 * - `eslint-plugin-react` with:
 *   - flat.recommended
 *   - flat['jsx-runtime']
 * - `eslint-plugin-react-hooks` with:
 *   - recommended rules
 */
export const react: Linter.Config[] = [
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
