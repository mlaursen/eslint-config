import { type Linter } from "eslint";
import { jsxA11y } from "./jsxA11y.js";
import { react } from "./react.js";
import { testingLibraryReact } from "./testing-library.js";
import { type TestFramework, testing } from "./testing.js";
import { typescript, typescriptTypeChecking } from "./typescript.js";

/**
 * @example
 * ```ts
 * import { configs, gitignore } from "@mlaursen/eslint-config";
 * import { defineConfig } from "eslint/config";
 *
 * export default defineConfig([
 *   gitignore(import.meta.url),
 *   ...configs.frontend("jest")
 *   // ...configs.frontend("jest", true)
 *   // ...configs.frontend("vitest")
 *   // ...configs.frontend("vitest", true)
 * ]);
 * ```
 */
export const frontend = (
  testFramework: TestFramework,
  reactCompiler?: boolean
): Linter.Config[] => [
  ...typescript,
  ...react(reactCompiler),
  ...jsxA11y,
  ...testing(testFramework),
  ...testingLibraryReact,
];

/**
 * @example
 * ```ts
 * import { configs, gitignore } from "@mlaursen/eslint-config";
 * import { defineConfig } from "eslint/config";
 *
 * export default defineConfig([
 *   gitignore(import.meta.url),
 *   ...configs.frontendTypeChecking(import.meta.dirname, "jest")
 *   // ...configs.frontendTypeChecking(import.meta.dirname, "jest", true)
 *   // ...configs.frontendTypeChecking(import.meta.dirname, "vitest"),
 *   // ...configs.frontendTypeChecking(import.meta.dirname, "vitest", true),
 * ]);
 * ```
 */
export const frontendTypeChecking = (
  tsconfigRootDir: string,
  testFramework: TestFramework,
  reactCompiler?: boolean
): Linter.Config[] => [
  ...typescriptTypeChecking(tsconfigRootDir),
  ...react(reactCompiler),
  ...jsxA11y,
  ...testing(testFramework),
  ...testingLibraryReact,
];
