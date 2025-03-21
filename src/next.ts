import { fixupPluginRules } from "@eslint/compat";
import nextPlugin from "@next/eslint-plugin-next";
import { type TSESLint } from "@typescript-eslint/utils";
import { BASE_NAME } from "./constants.js";

/**
 * @example
 * ```ts
 * import { config, configs, gitignore } from "@mlaursen/eslint-config";
 *
 * export default config(gitignore(import.meta.url), ...configs.typescript, ...configs.next);
 * ```
 */
export const next: TSESLint.FlatConfig.ConfigArray = [
  {
    name: `${BASE_NAME}/next`,
    plugins: {
      // @ts-expect-error There is a bad typing atm
      "@next/next": fixupPluginRules(nextPlugin),
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
];
