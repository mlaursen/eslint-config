import { type TSESLint } from "@typescript-eslint/utils";
import { jest, jestDom } from "./jest";
import { testingLibraryReact } from "./testing-library";
import { typescript, typescriptTypeChecking } from "./typescript";

export const frontend: TSESLint.FlatConfig.ConfigArray = [
  ...typescript,
  ...jest,
  ...jestDom,
  ...testingLibraryReact,
];

export const frontendTypeChecking = (
  tsconfigRootDir: string
): TSESLint.FlatConfig.ConfigArray => [
  ...typescriptTypeChecking(tsconfigRootDir),
  ...jest,
  ...jestDom,
  ...testingLibraryReact,
];
