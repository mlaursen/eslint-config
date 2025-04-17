import { type TSESLint } from "@typescript-eslint/utils";
import { jest, jestDom } from "./jest.js";
import { jsxA11y } from "./jsxA11y.js";
import { react } from "./react.js";
import { testingLibraryReact } from "./testing-library.js";
import { typescript, typescriptTypeChecking } from "./typescript.js";

/**
 * @example
 * ```ts
 * import { config, configs, gitignore } from "@mlaursen/eslint-config";
 *
 * export default config(
 *   gitignore(import.meta.url),
 *   ...configs.frontend
 * );
 * ```
 */
export const frontend: TSESLint.FlatConfig.ConfigArray = [
  ...typescript,
  ...react,
  ...jsxA11y,
  ...jest,
  ...jestDom,
  ...testingLibraryReact,
];

/**
 * @example
 * ```ts
 * import { config, configs, gitignore } from "@mlaursen/eslint-config";
 *
 * export default config(
 *   gitignore(import.meta.url),
 *   ...configs.frontendTypeChecking(import.meta.dirname)
 * );
 * ```
 */
export const frontendTypeChecking = (
  tsconfigRootDir: string
): TSESLint.FlatConfig.ConfigArray => [
  ...typescriptTypeChecking(tsconfigRootDir),
  ...react,
  ...jsxA11y,
  ...jest,
  ...jestDom,
  ...testingLibraryReact,
];
