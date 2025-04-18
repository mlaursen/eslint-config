import { FlatCompat } from "@eslint/eslintrc";
import { type TSESLint } from "@typescript-eslint/utils";

/**
 * @example
 * ```ts
 * import { config, configs, gitignore } from "@mlaursen/eslint-config";
 *
 * export default config(
 *   gitignore(import.meta.url),
 *   ...configs.typescript,
 *   ...configs.next(import.meta.dirname)
 * );
 * ```
 */
export const next = (
  importMetaDirname: string,
  coreVitals = false
): TSESLint.FlatConfig.ConfigArray => {
  const compat = new FlatCompat({
    baseDirectory: importMetaDirname,
  });

  const name =
    "plugin:@next/next" + (coreVitals ? "/core-web-vitals" : "/recommended");

  return [
    ...compat.config({
      extends: [name],
    }),
  ];
};
