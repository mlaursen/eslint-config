import { config } from "typescript-eslint";
import { base } from "./base.js";
import { frontend, frontendTypeChecking } from "./frontend.js";
import { gitignore } from "./gitignore.js";
import { jest, jestDom } from "./jest.js";
import { jsxA11y } from "./jsxA11y.js";
import { next } from "./next.js";
import { react } from "./react.js";
import { testingLibraryDom, testingLibraryReact } from "./testing-library.js";
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
  next,
} as const;

export default {
  config,
  configs,
  gitignore,
};
