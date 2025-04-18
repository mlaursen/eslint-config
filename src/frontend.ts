import { type TSESLint } from "@typescript-eslint/utils";
import { jsxA11y } from "./jsxA11y.js";
import { react } from "./react.js";
import { testingLibraryReact } from "./testing-library.js";
import { type TestFramework, testing } from "./testing.js";
import { typescript, typescriptTypeChecking } from "./typescript.js";

/**
 * @example
 * ```ts
 * import { config, configs, gitignore } from "@mlaursen/eslint-config";
 *
 * export default config(
 *   gitignore(import.meta.url),
 *   ...configs.frontend("jest")
 *   // ...configs.frontend("vitest")
 * );
 * ```
 */
export const frontend = (
  testFramework: TestFramework
): TSESLint.FlatConfig.ConfigArray => [
  ...typescript,
  ...react,
  ...jsxA11y,
  ...testing(testFramework),
  ...testingLibraryReact,
];

/**
 * @example
 * ```ts
 * import { config, configs, gitignore } from "@mlaursen/eslint-config";
 *
 * export default config(
 *   gitignore(import.meta.url),
 *   ...configs.frontendTypeChecking(import.meta.dirname, "jest")
 *   // ...configs.frontendTypeChecking(import.meta.dirname, "vitest"),
 * );
 * ```
 */
export const frontendTypeChecking = (
  tsconfigRootDir: string,
  testFramework: TestFramework
): TSESLint.FlatConfig.ConfigArray => [
  ...typescriptTypeChecking(tsconfigRootDir),
  ...react,
  ...jsxA11y,
  ...testing(testFramework),
  ...testingLibraryReact,
];
