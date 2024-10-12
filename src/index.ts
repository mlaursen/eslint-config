import { base } from "./base";
import { frontend, frontendTypeChecking } from "./frontend";
import { jest, jestDom } from "./jest";
import { jsxA11y } from "./jsxA11y";
import { next } from "./next";
import { react } from "./react";
import { testingLibraryDom, testingLibraryReact } from "./testing-library";
import { typescript, typescriptTypeChecking } from "./typescript";

export { config } from "typescript-eslint";
export { gitignore } from "./gitignore";

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
