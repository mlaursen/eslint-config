import { type Linter } from "eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import { BASE_NAME, JSX_FILES } from "./constants.js";

/**
 * @example
 * ```ts
 * import { configs } from "@mlaursen/eslint-config";
 * import { defineConfig } from "eslint/config";
 *
 * export default defineConfig(configs.react());
 *
 * // or with react compiler rules enabled
 * export default defineConfig(configs.react(true));
 * ```
 *
 * Enables:
 * - `eslint-plugin-react` with:
 *   - flat.recommended
 *   - flat['jsx-runtime']
 * - `eslint-plugin-react-hooks` with:
 *   - recommended rules
 *   - compiler rules (if `true` is provided)
 *
 * @param reactCompiler enable the react compiler eslint rules
 */
export const react = (reactCompiler?: boolean): Linter.Config[] => {
  return [
    {
      ...reactPlugin.configs.flat.recommended,
      name: `${BASE_NAME}/react`,
      files: JSX_FILES,
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        ...reactPlugin.configs.flat.recommended?.rules,
        ...reactPlugin.configs.flat["jsx-runtime"]?.rules,
      },
    },
    {
      ...reactHooksPlugin.configs.flat.recommended,
      name: `${BASE_NAME}/react-hooks`,
      rules: {
        ...(reactCompiler && reactHooksPlugin.configs.flat.recommended.rules),
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": [
          "error",
          {
            additionalHooks: "(useIsomorphicLayoutEffect)",
          },
        ],
      },
    },
  ];
};
