import { config } from "typescript-eslint";
import { base } from "./base.js";
import { frontend, frontendTypeChecking } from "./frontend.js";
import { gitignore } from "./gitignore.js";
import { jsxA11y } from "./jsxA11y.js";
import { react } from "./react.js";
import { testingLibraryDom, testingLibraryReact } from "./testing-library.js";
import { jest, jestDom, testing, vitest } from "./testing.js";
import { typescript, typescriptTypeChecking } from "./typescript.js";

export * from "./constants.js";
export { config, gitignore };

export const configs = {
  base,
  jest,
  jestDom,
  react,
  typescript,
  typescriptTypeChecking,
  testingLibraryDom,
  testingLibraryReact,
  frontend,
  frontendTypeChecking,
  jsxA11y,
  testing,
  vitest,
} as const;

export default {
  config,
  configs,
  gitignore,
};
