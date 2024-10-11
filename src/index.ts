import { base } from "./base";
import { frontend, frontendTypeChecking } from "./frontend";
import { jest, jestDom } from "./jest";
import { testingLibraryDom, testingLibraryReact } from "./testing-library";
import { typescript, typescriptTypeChecking } from "./typescript";

export { config } from "typescript-eslint";

export const configs = {
  base,
  jest,
  jestDom,
  typescript,
  typescriptTypeChecking,
  testingLibraryDom,
  testingLibraryReact,
  frontend,
  frontendTypeChecking,
} as const;
